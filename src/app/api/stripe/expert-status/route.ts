import { NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";

// Verify a one-off expert-service payment after returning from checkout.
export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();

  if (!sessionId) {
    return Response.json({ paid: false });
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    return Response.json({
      paid: session.payment_status === "paid",
      service: session.metadata?.service ?? null,
    });
  } catch (err) {
    console.error("Expert status check error:", err);
    return Response.json({ paid: false });
  }
}
