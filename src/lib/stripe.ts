import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
    if (!secretKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(secretKey, {
      apiVersion: "2026-03-25.dahlia",
    });
  }
  return _stripe;
}

export const PRICE_ID = process.env.STRIPE_PRICE_ID?.trim() || "";
