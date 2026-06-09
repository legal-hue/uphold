import { NextRequest } from "next/server";
import { getStripe, PRICE_ID } from "@/lib/stripe";
import type { PracticeArea } from "@/lib/types";

const VALID_AREAS: PracticeArea[] = ["employment", "housing", "contract", "creative"];

// One-off price to unlock the full case toolkit (in pence, GBP).
const UNLOCK_AMOUNT = 7900;

function getReturnOrigin(req: NextRequest): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (configuredUrl) return configuredUrl.replace(/\/$/, "");
  return req.nextUrl.origin;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const area = VALID_AREAS.includes(body.area) ? body.area : "employment";
    const plan = body.plan === "oneoff" ? "oneoff" : "subscription";
    const origin = getReturnOrigin(req);
    const returnUrl = `${origin}/triage/${area}/result?session_id={CHECKOUT_SESSION_ID}&upgraded=true`;

    let session;
    if (plan === "oneoff") {
      // One-off: pay once, unlock the full toolkit for this case forever.
      session = await getStripe().checkout.sessions.create({
        ui_mode: "elements",
        mode: "payment",
        billing_address_collection: "auto",
        line_items: [
          {
            price_data: {
              currency: "gbp",
              product_data: {
                name: "Upheld full case toolkit",
                description:
                  "One-off unlock: full case assessment, guided journey, document generator, and evidence builder.",
              },
              unit_amount: UNLOCK_AMOUNT,
            },
            quantity: 1,
          },
        ],
        client_reference_id: area,
        metadata: { area, plan },
        payment_intent_data: { metadata: { area, plan } },
        return_url: returnUrl,
        allow_promotion_codes: true,
      });
    } else {
      // Subscription: ongoing cover, £29.99/month with a 7-day free trial.
      if (!PRICE_ID) {
        return Response.json(
          { error: "Stripe subscription price is not configured" },
          { status: 500 }
        );
      }
      session = await getStripe().checkout.sessions.create({
        ui_mode: "elements",
        mode: "subscription",
        billing_address_collection: "auto",
        line_items: [{ price: PRICE_ID, quantity: 1 }],
        client_reference_id: area,
        metadata: { area, plan },
        subscription_data: { trial_period_days: 7, metadata: { area } },
        return_url: returnUrl,
        allow_promotion_codes: true,
      });
    }

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
