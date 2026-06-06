import { NextRequest } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { notifyOwner } from "@/lib/notify";

function formatAmount(amount: number | null | undefined, currency: string): string {
  if (amount == null) return "unknown";
  const symbol = currency?.toLowerCase() === "gbp" ? "£" : `${currency?.toUpperCase()} `;
  return `${symbol}${(amount / 100).toFixed(2)}`;
}

async function resolveCustomerEmail(
  customer: string | Stripe.Customer | Stripe.DeletedCustomer | null | undefined
): Promise<string> {
  if (!customer) return "unknown";
  if (typeof customer !== "string") {
    return "email" in customer ? customer.email ?? "unknown" : "unknown";
  }
  try {
    const full = await getStripe().customers.retrieve(customer);
    return !full.deleted ? full.email ?? "unknown" : "unknown";
  } catch {
    return "unknown";
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return Response.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const email = invoice.customer_email || (await resolveCustomerEmail(invoice.customer));
        const amount = formatAmount(invoice.amount_due, invoice.currency);
        const attempts = invoice.attempt_count ?? 0;
        const nextAttempt = invoice.next_payment_attempt
          ? new Date(invoice.next_payment_attempt * 1000).toUTCString()
          : "no further automatic attempts";
        console.log(`Payment failed for invoice ${invoice.id} (${email})`);
        await notifyOwner(
          `Upheld: payment failed (${email})`,
          [
            `A subscription payment has failed.`,
            ``,
            `Customer: ${email}`,
            `Amount: ${amount}`,
            `Attempt: ${attempts}`,
            `Next automatic attempt: ${nextAttempt}`,
            `Invoice: ${invoice.id}`,
            ``,
            `Stripe retries failed payments automatically. No action is needed unless retries are exhausted, at which point the subscription will lapse and the customer loses access.`,
          ].join("\n")
        );
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const email = await resolveCustomerEmail(subscription.customer);
        const endedAt = subscription.ended_at
          ? new Date(subscription.ended_at * 1000).toUTCString()
          : "now";
        console.log(`Subscription ${subscription.id} cancelled (${email})`);
        await notifyOwner(
          `Upheld: subscription cancelled (${email})`,
          [
            `A subscription has been cancelled and access has ended.`,
            ``,
            `Customer: ${email}`,
            `Ended: ${endedAt}`,
            `Subscription: ${subscription.id}`,
          ].join("\n")
        );
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const previous = event.data.previous_attributes as
          | Partial<Stripe.Subscription>
          | undefined;
        // Customer scheduled a cancellation (cancel at end of the paid period).
        if (
          subscription.cancel_at_period_end === true &&
          previous?.cancel_at_period_end === false
        ) {
          const email = await resolveCustomerEmail(subscription.customer);
          const endsAt = subscription.cancel_at
            ? new Date(subscription.cancel_at * 1000).toUTCString()
            : "end of current period";
          console.log(`Subscription ${subscription.id} cancellation scheduled (${email})`);
          await notifyOwner(
            `Upheld: cancellation scheduled (${email})`,
            [
              `A customer has scheduled a cancellation. They keep access until the period ends.`,
              ``,
              `Customer: ${email}`,
              `Access ends: ${endsAt}`,
              `Subscription: ${subscription.id}`,
            ].join("\n")
          );
        }
        break;
      }

      default:
        break;
    }
  } catch (err) {
    // Never fail the webhook on a handler error — log and acknowledge so Stripe
    // does not retry indefinitely.
    console.error(`Webhook handler error for ${event.type}:`, err);
  }

  return Response.json({ received: true });
}
