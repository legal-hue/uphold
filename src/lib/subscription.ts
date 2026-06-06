const SUBSCRIPTION_KEY = "upheld_subscription";

export interface Subscription {
  active: boolean;
  trial: boolean;
  startedAt: string;
  expiresAt: string;
  provider?: "local" | "stripe" | "revenuecat";
  customerId?: string;
  subscriptionId?: string;
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

export function activateSubscription(options: {
  trial?: boolean;
  expiresAt?: string;
  provider?: Subscription["provider"];
  customerId?: string | null;
  subscriptionId?: string | null;
} = {}): void {
  const now = new Date();
  const defaultExpiry = new Date(now);
  defaultExpiry.setDate(defaultExpiry.getDate() + 7);

  const sub: Subscription = {
    active: true,
    trial: options.trial ?? true,
    startedAt: now.toISOString(),
    expiresAt: options.expiresAt ?? defaultExpiry.toISOString(),
    provider: options.provider ?? "local",
    customerId: options.customerId ?? undefined,
    subscriptionId: options.subscriptionId ?? undefined,
  };
  localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(sub));
}

export function deactivateSubscription(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SUBSCRIPTION_KEY);
}
