import { NextRequest } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

// One-off unlock: access never expires once paid.
const LIFETIME_EXPIRY = "2099-12-31T00:00:00.000Z";

function getSubscriptionExpiry(subscription: Stripe.Subscription): string {
  const periodEnd =
    subscription.status === "trialing"
      ? subscription.trial_end
      : subscription.items.data[0]?.current_period_end;
  const fallbackEnd = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
  return new Date((periodEnd ?? fallbackEnd) * 1000).toISOString();
}

function isLiveStatus(status: Stripe.Subscription.Status): boolean {
  return status === "active" || status === "trialing";
}

function subscriptionResponse(
  subscription: Stripe.Subscription,
  customerId?: unknown
) {
  return Response.json({
    subscribed: true,
    status: subscription.status,
    customerId:
      customerId ??
      (typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer?.id),
    subscriptionId: subscription.id,
    expiresAt: getSubscriptionExpiry(subscription),
  });
}

export async function POST(req: NextRequest) {
  const { sessionId, subscriptionId } = await req.json();

  if (!sessionId && !subscriptionId) {
    return Response.json({ subscribed: false });
  }

  try {
    // Re-verification path (subscription only): refresh expiry on app load and
    // revoke if it has lapsed or been cancelled.
    if (subscriptionId) {
      const subscription =
        await getStripe().subscriptions.retrieve(subscriptionId);
      if (isLiveStatus(subscription.status)) {
        return subscriptionResponse(subscription);
      }
      return Response.json({ subscribed: false, status: subscription.status });
    }

    // Initial path: resolve access from the completed checkout session.
    const session = await getStripe().checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    });

    if (session.mode === "subscription") {
      const subscription = session.subscription;
      if (
        subscription &&
        typeof subscription !== "string" &&
        isLiveStatus(subscription.status)
      ) {
        return subscriptionResponse(subscription, session.customer);
      }
      return Response.json({ subscribed: false });
    }

    // One-off payment: permanent access once paid.
    if (session.payment_status === "paid") {
      return Response.json({
        subscribed: true,
        oneOff: true,
        customerId:
          typeof session.customer === "string" ? session.customer : undefined,
        expiresAt: LIFETIME_EXPIRY,
      });
    }

    return Response.json({ subscribed: false });
  } catch (err) {
    console.error("Stripe status check error:", err);
    return Response.json({ subscribed: false });
  }
}
