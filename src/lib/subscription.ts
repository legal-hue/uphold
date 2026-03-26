const SUBSCRIPTION_KEY = "upheld_subscription";

export interface Subscription {
  active: boolean;
  trial: boolean;
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

export function isOnTrial(): boolean {
  const sub = getSubscription();
  return sub?.active === true && sub?.trial === true;
}

export function trialDaysRemaining(): number {
  const sub = getSubscription();
  if (!sub || !sub.trial) return 0;
  const now = new Date();
  const expires = new Date(sub.expiresAt);
  const diff = expires.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function activateSubscription(): void {
  // Start with 7-day free trial
  // In production, this would be called after Apple IAP or Stripe confirms
  const now = new Date();
  const trialEnd = new Date(now);
  trialEnd.setDate(trialEnd.getDate() + 7);
  const sub: Subscription = {
    active: true,
    trial: true,
    startedAt: now.toISOString(),
    expiresAt: trialEnd.toISOString(),
  };
  localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(sub));
}
