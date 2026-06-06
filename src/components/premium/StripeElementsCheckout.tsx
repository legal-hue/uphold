"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  loadStripe,
  type StripeCheckoutElementsSdk,
  type StripeCheckoutSession,
  type StripePaymentElement,
} from "@stripe/stripe-js";
import { Loader2, LockKeyhole, ShieldCheck } from "lucide-react";

interface StripeElementsCheckoutProps {
  area: string;
}

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

function displayAmount(amount?: { amount: string } | null): string | null {
  return amount?.amount || null;
}

export function StripeElementsCheckout({ area }: StripeElementsCheckoutProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const checkoutRef = useRef<StripeCheckoutElementsSdk | null>(null);
  const paymentElementRef = useRef<StripePaymentElement | null>(null);
  const [session, setSession] = useState<StripeCheckoutSession | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [elementVisible, setElementVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const mountPaymentElement = async () => {
      setLoading(true);
      setElementVisible(false);
      setError("");

      if (!stripePublishableKey) {
        setError("Stripe publishable key is not configured.");
        setLoading(false);
        return;
      }

      const stripe = await loadStripe(stripePublishableKey);
      if (!stripe) {
        setError("Stripe could not be loaded. Please refresh and try again.");
        setLoading(false);
        return;
      }

      const clientSecret = fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ area }),
      })
        .then(async (res) => {
          const data = await res.json().catch(() => ({}));
          if (!res.ok || !data.clientSecret) {
            throw new Error(data.error || "Could not start checkout.");
          }
          return data.clientSecret as string;
        });

      try {
        const checkout = stripe.initCheckoutElementsSdk({
          clientSecret,
          elementsOptions: {
            appearance: {
              theme: "stripe",
              variables: {
                colorPrimary: "#3D8B5E",
                colorText: "#2A2A2A",
                colorDanger: "#C44D4D",
                borderRadius: "12px",
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
              },
            },
          },
        });

        checkoutRef.current = checkout;
        checkout.on("change", (updatedSession) => {
          if (!cancelled) setSession(updatedSession);
        });

        const actionsResult = await checkout.loadActions();
        if (cancelled) return;

        if (actionsResult.type === "error") {
          throw new Error(actionsResult.error.message);
        }

        setSession(actionsResult.actions.getSession());

        const element = checkout.createPaymentElement({
          layout: "accordion",
        });
        paymentElementRef.current = element;

        if (!containerRef.current) return;
        setElementVisible(true);
        element.mount(containerRef.current);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Could not initialise Stripe checkout."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void mountPaymentElement();

    return () => {
      cancelled = true;
      paymentElementRef.current?.destroy();
      paymentElementRef.current = null;
      checkoutRef.current = null;
    };
  }, [area]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const checkout = checkoutRef.current;
    const trimmedEmail = email.trim();

    if (!checkout) {
      setError("Checkout is still loading. Please wait a moment.");
      return;
    }

    if (!trimmedEmail) {
      setError("Enter the email address you want linked to your subscription.");
      return;
    }

    setSubmitting(true);
    try {
      const actionsResult = await checkout.loadActions();
      if (actionsResult.type === "error") {
        throw new Error(actionsResult.error.message);
      }

      const emailResult = await actionsResult.actions.updateEmail(trimmedEmail);
      if (emailResult.type === "error") {
        throw new Error(emailResult.error.message);
      }

      const confirmResult = await actionsResult.actions.confirm({
        email: trimmedEmail,
      });

      if (confirmResult.type === "error") {
        throw new Error(confirmResult.error.message);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Payment could not be confirmed."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const dueToday = displayAmount(session?.total.total);
  const dueAfterTrial = displayAmount(session?.recurring?.dueNext.total);

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="rounded-xl border border-uphold-neutral-200 bg-uphold-neutral-50 p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-uphold-green-500" />
          <div>
            <p className="text-sm font-semibold text-uphold-neutral-800">
              Secure payment by Stripe
            </p>
            <p className="mt-1 text-xs leading-relaxed text-uphold-neutral-600">
              Your card details go directly to Stripe and are not stored by
              Upheld.
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-uphold-neutral-700">
          Email for receipts and subscription updates
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-xl border-2 border-uphold-neutral-200 px-4 py-3 text-sm transition-colors focus:border-uphold-green-500 focus:outline-none"
        />
      </div>

      {(loading || elementVisible) && (
        <div className="min-h-36 rounded-xl border border-uphold-neutral-200 bg-white p-4">
          {loading && (
            <div className="flex items-center justify-center gap-2 py-10 text-sm text-uphold-neutral-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading secure payment form...
            </div>
          )}
          <div ref={containerRef} />
        </div>
      )}

      {(dueToday || dueAfterTrial) && (
        <div className="rounded-xl bg-uphold-green-50 p-4 text-sm text-uphold-neutral-700">
          {dueToday && (
            <div className="flex items-center justify-between gap-4">
              <span>Due today</span>
              <span className="font-semibold text-uphold-neutral-800">{dueToday}</span>
            </div>
          )}
          {dueAfterTrial && (
            <div className="mt-1 flex items-center justify-between gap-4">
              <span>After trial</span>
              <span className="font-semibold text-uphold-neutral-800">
                {dueAfterTrial}/month
              </span>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-uphold-red">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || submitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-uphold-green-500 py-4 text-lg font-semibold text-white transition-colors hover:bg-uphold-green-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Confirming...
          </>
        ) : (
          <>
            <LockKeyhole className="h-5 w-5" />
            Start free trial
          </>
        )}
      </button>
    </form>
  );
}
