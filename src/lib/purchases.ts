import { Capacitor } from "@capacitor/core";
import {
  activateSubscription,
  deactivateSubscription,
  getSubscription,
  isSubscribed,
} from "./subscription";

const STRIPE_KEY = "upheld_stripe";

interface StoredStripe {
  customerId?: string;
  subscriptionId?: string;
  sessionId?: string;
}

function getStoredStripe(): StoredStripe | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STRIPE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as StoredStripe;
  } catch {
    return null;
  }
}

export const PRODUCT_ID = "upheld_premium_monthly";
export const ENTITLEMENT_ID = "premium";

export function isNativeApp(): boolean {
  return Capacitor.isNativePlatform();
}

export async function initPurchases(): Promise<void> {
  // RevenueCat is only available on native iOS/Android builds.
  // On web, subscription is handled via Stripe + localStorage. Re-verify any
  // existing Stripe subscription so the local expiry follows the real billing
  // period once the trial converts to paid (and access is revoked if cancelled).
  if (!isNativeApp()) {
    await refreshStripeSubscription();
  }
}

/**
 * Re-check a stored Stripe subscription against the live billing state.
 *
 * The local subscription record is seeded at checkout with the trial end as its
 * expiry. Without this refresh a paying customer would be locked out the moment
 * the 7-day trial window elapsed, because nothing else updates the local expiry.
 */
export async function refreshStripeSubscription(): Promise<void> {
  const sub = getSubscription();
  const stored = getStoredStripe();
  if (sub?.provider !== "stripe" || !stored?.subscriptionId) return;

  try {
    const res = await fetch("/api/stripe/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscriptionId: stored.subscriptionId }),
    });
    if (!res.ok) return;
    const data = await res.json();

    if (data.subscribed) {
      activateSubscription({
        trial: data.status === "trialing",
        expiresAt: data.expiresAt,
        provider: "stripe",
        customerId:
          typeof data.customerId === "string" ? data.customerId : stored.customerId,
        subscriptionId: stored.subscriptionId,
      });
    } else if (data.status) {
      // Stripe confirmed the subscription is no longer live (cancelled, unpaid,
      // etc.). Only revoke on a definitive answer, never on a network blip.
      deactivateSubscription();
      localStorage.removeItem(STRIPE_KEY);
    }
  } catch {
    // Network error: leave the local subscription untouched.
  }
}

export async function checkPremiumStatus(): Promise<boolean> {
  return isSubscribed();
}

export async function getOfferings() {
  return null;
}

/**
 * On native: RevenueCat handles this via the Capacitor plugin.
 * On web: the embedded Stripe Elements form handles subscription checkout.
 */
export async function purchasePremium(area?: string): Promise<boolean> {
  if (isNativeApp()) {
    activateSubscription({ provider: "revenuecat" });
    return true;
  }

  void area;
  return false;
}

/**
 * After returning from Stripe Checkout, verify the session and activate locally.
 */
export async function verifyStripeSession(sessionId: string): Promise<boolean> {
  try {
    const res = await fetch("/api/stripe/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    });
    const data = await res.json();
    if (data.subscribed) {
      activateSubscription({
        trial: data.status === "trialing",
        expiresAt: data.expiresAt,
        provider: "stripe",
        customerId: typeof data.customerId === "string" ? data.customerId : null,
        subscriptionId:
          typeof data.subscriptionId === "string" ? data.subscriptionId : null,
      });
      if (typeof window !== "undefined") {
        localStorage.setItem(
          STRIPE_KEY,
          JSON.stringify({
            customerId: data.customerId,
            subscriptionId: data.subscriptionId,
            sessionId,
          })
        );
      }
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export async function restorePurchases(): Promise<boolean> {
  return isSubscribed();
}

/**
 * The case unlock is a one-off payment, so there is no subscription to manage
 * or cancel. This stays false unless a recurring subscription is ever stored
 * (kept for forward compatibility).
 */
export function canManageStripeBilling(): boolean {
  if (isNativeApp()) return false;
  const sub = getSubscription();
  return sub?.provider === "stripe" && !!getStoredStripe()?.subscriptionId;
}

/**
 * Open the Stripe billing portal so a web customer can update or cancel.
 * Returns an error message on failure, or null on success (the browser
 * navigates away to Stripe).
 */
export async function openBillingPortal(): Promise<string | null> {
  const stored = getStoredStripe();
  if (!stored?.customerId) {
    return "No subscription found on this device.";
  }

  try {
    const res = await fetch("/api/stripe/portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId: stored.customerId }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.url) {
      return data.error || "Could not open the billing portal.";
    }
    window.location.href = data.url;
    return null;
  } catch {
    return "Could not reach the billing portal. Please try again.";
  }
}
