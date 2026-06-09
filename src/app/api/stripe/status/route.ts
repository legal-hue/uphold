import { NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";

// One-off unlock: access never expires once paid.
const LIFETIME_EXPIRY = "2099-12-31T00:00:00.000Z";

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();

  if (!sessionId) {
    return Response.json({ subscribed: false });
  }

  try {
    // The case unlock is a one-off payment. Access is granted once the
    // checkout session is paid, and never expires.
    const session = await getStripe().checkout.sessions.retrieve(sessionId);

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
