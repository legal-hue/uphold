import { NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";

// One-off prices for paid expert services (amounts in pence, GBP).
const EXPERT_SERVICES: Record<string, { name: string; amount: number }> = {
  strategy_call: { name: "Strategy call", amount: 15000 },
  hearing_prep: { name: "Hearing preparation", amount: 35000 },
  document_review: { name: "Document review", amount: 15000 },
  case_review: { name: "Case review", amount: 25000 },
};

function getReturnOrigin(req: NextRequest): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (configuredUrl) return configuredUrl.replace(/\/$/, "");
  return req.nextUrl.origin;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const service = EXPERT_SERVICES[body.service];
    if (!service) {
      return Response.json({ error: "Unknown service" }, { status: 400 });
    }

    const origin = getReturnOrigin(req);

    const session = await getStripe().checkout.sessions.create({
      ui_mode: "elements",
      mode: "payment",
      billing_address_collection: "auto",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: { name: `Upheld: ${service.name}` },
            unit_amount: service.amount,
          },
          quantity: 1,
        },
      ],
      metadata: { service: body.service },
      payment_intent_data: { metadata: { service: body.service } },
      return_url: `${origin}/expert?service=${body.service}&paid=true&session_id={CHECKOUT_SESSION_ID}`,
    });

    if (!session.client_secret) {
      return Response.json(
        { error: "Stripe session did not include a client secret" },
        { status: 500 }
      );
    }

    return Response.json({
      clientSecret: session.client_secret,
      sessionId: session.id,
    });
  } catch (err) {
    console.error("Expert checkout error:", err);
    return Response.json({ error: "Could not start payment" }, { status: 500 });
  }
}
