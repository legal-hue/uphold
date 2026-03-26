import { Capacitor } from "@capacitor/core";

// RevenueCat product ID - must match what you create in App Store Connect
export const PRODUCT_ID = "upheld_premium_monthly";
export const ENTITLEMENT_ID = "premium";

// Check if running as native app (not web)
export function isNativeApp(): boolean {
  return Capacitor.isNativePlatform();
}

// Initialise RevenueCat - call this once on app startup
export async function initPurchases(): Promise<void> {
  if (!isNativeApp()) return;

  const { Purchases } = await import("@revenuecat/purchases-capacitor");

  await Purchases.configure({
    // Replace with your actual RevenueCat API key after setup
    apiKey: process.env.NEXT_PUBLIC_REVENUECAT_API_KEY || "test_iqDwBuoFYfydpFkClWhKEQYBFwx",
  });
}

// Check if user has active premium subscription
export async function checkPremiumStatus(): Promise<boolean> {
  if (!isNativeApp()) {
    // On web, fall back to localStorage subscription
    const { isSubscribed } = await import("./subscription");
    return isSubscribed();
  }

  try {
    const { Purchases } = await import("@revenuecat/purchases-capacitor");
    const { customerInfo } = await Purchases.getCustomerInfo();
    return customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
  } catch {
    return false;
  }
}

// Get available subscription packages
export async function getOfferings() {
  if (!isNativeApp()) return null;

  try {
    const { Purchases } = await import("@revenuecat/purchases-capacitor");
    const offerings = await Purchases.getOfferings();
    return offerings.current;
  } catch {
    return null;
  }
}

// Purchase the premium subscription
export async function purchasePremium(): Promise<boolean> {
  if (!isNativeApp()) {
    // On web, activate local subscription (replace with Stripe later)
    const { activateSubscription } = await import("./subscription");
    activateSubscription();
    return true;
  }

  try {
    const { Purchases } = await import("@revenuecat/purchases-capacitor");
    const offerings = await Purchases.getOfferings();

    if (!offerings.current?.availablePackages?.length) {
      console.error("No packages available");
      return false;
    }

    // Find the monthly package
    const monthly = offerings.current.availablePackages.find(
      (pkg) => pkg.packageType === "MONTHLY"
    ) || offerings.current.availablePackages[0];

    const { customerInfo } = await Purchases.purchasePackage({
      aPackage: monthly,
    });

    return customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err.code === "PURCHASE_CANCELLED") {
      // User cancelled - not an error
      return false;
    }
    console.error("Purchase failed:", error);
    return false;
  }
}

// Restore previous purchases (required by Apple)
export async function restorePurchases(): Promise<boolean> {
  if (!isNativeApp()) return false;

  try {
    const { Purchases } = await import("@revenuecat/purchases-capacitor");
    const { customerInfo } = await Purchases.restorePurchases();
    return customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
  } catch {
    return false;
  }
}
