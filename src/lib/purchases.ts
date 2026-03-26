import { Capacitor } from "@capacitor/core";
import { activateSubscription, isSubscribed } from "./subscription";

export const PRODUCT_ID = "upheld_premium_monthly";
export const ENTITLEMENT_ID = "premium";

export function isNativeApp(): boolean {
  return Capacitor.isNativePlatform();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let purchasesModule: any = null;

async function getPurchases() {
  if (!isNativeApp()) return null;
  if (purchasesModule) return purchasesModule;

  try {
    const moduleName = "@revenuecat/purchases-capacitor";
    purchasesModule = await import(/* @vite-ignore */ moduleName);
    return purchasesModule;
  } catch {
    return null;
  }
}

export async function initPurchases(): Promise<void> {
  const mod = await getPurchases();
  if (!mod) return;

  try {
    await mod.Purchases.configure({
      apiKey: process.env.NEXT_PUBLIC_REVENUECAT_API_KEY || "",
      appUserID: null,
    });
  } catch (e) {
    console.error("RevenueCat init error:", e);
  }
}

export async function checkPremiumStatus(): Promise<boolean> {
  const mod = await getPurchases();
  if (!mod) return isSubscribed();

  try {
    const { customerInfo } = await mod.Purchases.getCustomerInfo();
    const entitlement = customerInfo.entitlements.active[ENTITLEMENT_ID];
    if (entitlement) {
      activateSubscription();
      return true;
    }
  } catch {
    // Fall back to local check
  }

  return isSubscribed();
}

export async function getOfferings() {
  const mod = await getPurchases();
  if (!mod) return null;

  try {
    const { offerings } = await mod.Purchases.getOfferings();
    return offerings.current;
  } catch {
    return null;
  }
}

export async function purchasePremium(): Promise<boolean> {
  const mod = await getPurchases();

  if (mod) {
    try {
      const { offerings } = await mod.Purchases.getOfferings();
      const pkg = offerings.current?.availablePackages?.[0];
      if (pkg) {
        const { customerInfo } = await mod.Purchases.purchasePackage({
          aPackage: pkg,
        });
        if (customerInfo.entitlements.active[ENTITLEMENT_ID]) {
          activateSubscription();
          return true;
        }
      }
    } catch (e: unknown) {
      const err = e as { userCancelled?: boolean };
      if (err.userCancelled) return false;
      throw e;
    }
  }

  // Web fallback: activate localStorage subscription
  activateSubscription();
  return true;
}

export async function restorePurchases(): Promise<boolean> {
  const mod = await getPurchases();

  if (mod) {
    try {
      const { customerInfo } = await mod.Purchases.restorePurchases();
      if (customerInfo.entitlements.active[ENTITLEMENT_ID]) {
        activateSubscription();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  return isSubscribed();
}
