const SUBSCRIPTION_KEY = "upheld_subscription";

export interface Subscription {
  active: boolean;
  startedAt: string;
  expiresAt: string;
}

export function getSubscription(): Subscription | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(SUBSCRIPTION_KEY);
  if (!stored) return null;
  try {
    const sub = JSON.parse(stored) as Subscription;
    if (new Date(sub.expiresAt) < new Date()) {
      localStorage.removeItem(SUBSCRIPTION_KEY);
      return null;
    }
    return sub;
  } catch {
    return null;
  }
}

export function isSubscribed(): boolean {
  return getSubscription()?.active === true;
}

export function activateSubscription(): void {
  const now = new Date();
  const expires = new Date(now);
  expires.setMonth(expires.getMonth() + 1);
  const sub: Subscription = {
    active: true,
    startedAt: now.toISOString(),
    expiresAt: expires.toISOString(),
  };
  localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(sub));
}
