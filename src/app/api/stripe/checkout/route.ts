import { NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
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
    const origin = getReturnOrigin(req);

    const session = await getStripe().checkout.sessions.create({
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
      metadata: { area, product: "case_unlock" },
      payment_intent_data: { metadata: { area, product: "case_unlock" } },
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
