import { NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";

function getReturnUrl(req: NextRequest): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  const origin = configured ? configured.replace(/\/$/, "") : req.nextUrl.origin;
  return `${origin}/`;
}

export async function POST(req: NextRequest) {
  try {
    const { customerId } = await req.json();

    if (!customerId || typeof customerId !== "string") {
      return Response.json(
        { error: "A customer id is required" },
        { status: 400 }
      );
    }

    const session = await getStripe().billingPortal.sessions.create({
      customer: customerId,
      return_url: getReturnUrl(req),
    });

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("Stripe billing portal error:", err);
    return Response.json(
      { error: "Could not open the billing portal" },
      { status: 500 }
    );
  }
}
