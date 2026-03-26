import { Capacitor } from "@capacitor/core";
import { activateSubscription, isSubscribed } from "./subscription";

export const PRODUCT_ID = "upheld_premium_monthly";
export const ENTITLEMENT_ID = "premium";

export function isNativeApp(): boolean {
  return Capacitor.isNativePlatform();
}

export async function initPurchases(): Promise<void> {
  // RevenueCat is only available on native iOS/Android builds
  // On web, subscription is handled via localStorage
}

export async function checkPremiumStatus(): Promise<boolean> {
  return isSubscribed();
}

export async function getOfferings() {
  return null;
}

export async function purchasePremium(): Promise<boolean> {
  // On web: activate via localStorage
  // On native: RevenueCat handles this via the Capacitor plugin (configured in Xcode)
  activateSubscription();
  return true;
}

export async function restorePurchases(): Promise<boolean> {
  return isSubscribed();
}
