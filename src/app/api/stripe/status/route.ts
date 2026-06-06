import { NextRequest } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

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

function activeResponse(subscription: Stripe.Subscription, customerId?: unknown) {
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
    // Re-verification path: look the subscription up directly by id.
    // Used on every app load to refresh expiry once a trial converts to paid,
    // and to revoke access if it has lapsed or been cancelled.
    if (subscriptionId) {
      const subscription =
        await getStripe().subscriptions.retrieve(subscriptionId);
      if (isLiveStatus(subscription.status)) {
        return activeResponse(subscription);
      }
      return Response.json({ subscribed: false, status: subscription.status });
    }

    // Initial path: resolve the subscription from the completed checkout session.
    const session = await getStripe().checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    });

    const subscription = session.subscription;
    if (
      subscription &&
      typeof subscription !== "string" &&
      isLiveStatus(subscription.status)
    ) {
      return activeResponse(subscription, session.customer);
    }

    return Response.json({ subscribed: false });
  } catch (err) {
    console.error("Stripe status check error:", err);
    return Response.json({ subscribed: false });
  }
}
