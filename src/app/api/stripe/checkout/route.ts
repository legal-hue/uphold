import { NextRequest } from "next/server";
import { getStripe, PRICE_ID } from "@/lib/stripe";
import type { PracticeArea } from "@/lib/types";

const VALID_AREAS: PracticeArea[] = ["employment", "housing", "contract", "creative"];

function getReturnOrigin(req: NextRequest): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (configuredUrl) return configuredUrl.replace(/\/$/, "");
  return req.nextUrl.origin;
}

export async function POST(req: NextRequest) {
  try {
    if (!PRICE_ID) {
      return Response.json(
        { error: "Stripe price is not configured" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const area = VALID_AREAS.includes(body.area) ? body.area : "employment";
    const origin = getReturnOrigin(req);

    const session = await getStripe().checkout.sessions.create({
      ui_mode: "elements",
      mode: "subscription",
      billing_address_collection: "auto",
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      client_reference_id: area,
      metadata: { area },
      subscription_data: {
        trial_period_days: 7,
        metadata: { area },
      },
      return_url: `${origin}/triage/${area}/result?session_id={CHECKOUT_SESSION_ID}&upgraded=true`,
      allow_promotion_codes: true,
    });

    if (!session.client_secret) {
      return Response.json(
        { error: "Stripe checkout session did not include a client secret" },
        { status: 500 }
      );
    }

    return Response.json({
      clientSecret: session.client_secret,
      sessionId: session.id,
    });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return Response.json(
      { error: "Could not create checkout session" },
      { status: 500 }
    );
  }
}
