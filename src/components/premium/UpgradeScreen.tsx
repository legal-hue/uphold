"use client";

import { useState } from "react";
import { Shield, FileText, Map, FolderSearch, CheckCircle, ArrowRight, RotateCcw, Loader2, ChevronDown, X } from "lucide-react";
import { activateSubscription } from "@/lib/subscription";
import { purchasePremium, restorePurchases, isNativeApp } from "@/lib/purchases";
import { useRouter } from "next/navigation";

interface UpgradeScreenProps {
  area: string;
  onClose?: () => void;
}

const comparisonRows = [
  { feature: "Know where you stand", free: true, premium: true },
  { feature: "Deadline calculator", free: true, premium: true },
  { feature: "Full Case Assessment", free: false, premium: true },
  { feature: "Step-by-step journey", free: false, premium: true },
  { feature: "Pre-populated letters & documents", free: false, premium: true },
  { feature: "Evidence builder", free: false, premium: true },
  { feature: "AI-enhanced document drafting", free: false, premium: true },
  { feature: "All three practice areas", free: false, premium: true },
];

const faqs = [
  {
    q: "Can I cancel before being charged?",
    a: "Yes. You have 7 full days to try everything. Cancel anytime before the trial ends and you will not be charged. You can cancel in your App Store or Play Store settings.",
  },
  {
    q: "Does this replace a solicitor?",
    a: "No. Upheld helps you understand your rights and build your case so you go into any professional meeting better prepared. For personal legal advice, always consult a qualified solicitor or barrister.",
  },
  {
    q: "Is my information safe?",
    a: "Your case information stays on your device. We do not store your answers on our servers.",
  },
  {
    q: "What if my situation is complicated?",
    a: "Upheld works best for the most common scenarios. If your situation is unusual, we will tell you and signpost you to specialist help.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-uphold-neutral-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left py-4 gap-3"
      >
        <span className="text-sm font-semibold text-uphold-neutral-800">{q}</span>
        <ChevronDown className={`w-4 h-4 text-uphold-neutral-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <p className="text-sm text-uphold-neutral-600 pb-4 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export function UpgradeScreen({ area, onClose }: UpgradeScreenProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async () => {
    setLoading(true);
    setError("");
    try {
      const success = await purchasePremium();
      if (success) {
        // Also set local subscription as fallback
        activateSubscription();
        router.push(`/triage/${area}/result?upgraded=true`);
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    setRestoring(true);
    setError("");
    try {
      const success = await restorePurchases();
      if (success) {
        activateSubscription();
        router.push(`/triage/${area}/result?upgraded=true`);
        router.refresh();
      } else {
        setError("No previous subscription found.");
      }
    } catch {
      setError("Could not restore purchases. Please try again.");
    } finally {
      setRestoring(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-12 md:py-20">

        {/* Header */}
        <div className="text-center mb-8">
          {onClose && (
            <div className="flex justify-end mb-2">
              <button onClick={onClose} className="p-1 text-uphold-neutral-400 hover:text-uphold-neutral-600">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
          <div className="inline-flex items-center gap-2 bg-uphold-green-50 text-uphold-green-700 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-uphold-green-100">
            <Shield className="w-4 h-4" />
            Your assessment is complete
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-uphold-neutral-800 mb-4">
            Now take action, with everything you need
          </h1>
          <p className="text-uphold-neutral-600 leading-relaxed max-w-md mx-auto">
            Most people who know their rights get better outcomes. Upheld gives you the tools solicitors use, in plain English, on your phone.
          </p>
        </div>

        {/* Free vs Premium comparison table */}
        <div className="bg-white rounded-2xl border border-uphold-neutral-200 overflow-hidden mb-8">
          <div className="grid grid-cols-3 text-xs font-semibold text-center bg-uphold-neutral-50 border-b border-uphold-neutral-200">
            <div className="py-3 px-2 text-uphold-neutral-500 text-left pl-4">Feature</div>
            <div className="py-3 px-2 text-uphold-neutral-500">Free</div>
            <div className="py-3 px-2 text-uphold-green-600">Premium</div>
          </div>
          {comparisonRows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 items-center text-sm border-b border-uphold-neutral-100 last:border-0 ${i % 2 === 0 ? "" : "bg-uphold-neutral-50/50"}`}
            >
              <div className="py-3 px-4 text-uphold-neutral-700">{row.feature}</div>
              <div className="py-3 px-2 text-center">
                {row.free
                  ? <CheckCircle className="w-4 h-4 text-uphold-green-500 mx-auto" />
                  : <span className="text-uphold-neutral-300 text-lg leading-none">—</span>}
              </div>
              <div className="py-3 px-2 text-center">
                {row.premium
                  ? <CheckCircle className="w-4 h-4 text-uphold-green-500 mx-auto" />
                  : <span className="text-uphold-neutral-300 text-lg leading-none">—</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Risk reversal callout */}
        <div className="bg-uphold-green-50 border border-uphold-green-100 rounded-xl p-4 mb-6 flex items-start gap-3">
          <Shield className="w-5 h-5 text-uphold-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-uphold-neutral-800">Try it free for 7 days, no risk</p>
            <p className="text-xs text-uphold-neutral-600 mt-1">Cancel before your trial ends and you will not be charged. No questions asked. Your case information stays on your device.</p>
          </div>
        </div>

        {/* Pricing card */}
        <div className="bg-white rounded-2xl border-2 border-uphold-green-500 p-6 mb-6">
          <div className="bg-uphold-green-50 text-uphold-green-700 text-sm font-semibold text-center py-2 px-4 rounded-lg mb-4 border border-uphold-green-100">
            7-day free trial
          </div>

          <div className="flex items-baseline justify-between mb-1">
            <span className="text-sm font-medium text-uphold-neutral-600">Upheld Premium</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-uphold-neutral-800">£29.99</span>
              <span className="text-sm text-uphold-neutral-500">/month</span>
            </div>
          </div>
          <p className="text-xs text-uphold-neutral-500 mb-5">7 days free, then £29.99/month. Cancel anytime.</p>

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-uphold-green-500 text-white font-semibold py-4 rounded-xl hover:bg-uphold-green-700 transition-colors text-lg disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Start free trial
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-xs text-uphold-neutral-400 text-center mt-3">
            No charge for 7 days. Cancel anytime before the trial ends.
          </p>

          {error && (
            <p className="text-xs text-uphold-red text-center mt-2">{error}</p>
          )}
        </div>

        {isNativeApp() && (
          <button
            onClick={handleRestore}
            disabled={restoring}
            className="w-full flex items-center justify-center gap-2 text-sm text-uphold-neutral-500 hover:text-uphold-neutral-700 py-2 mb-6"
          >
            <RotateCcw className="w-4 h-4" />
            {restoring ? "Restoring..." : "Restore previous purchase"}
          </button>
        )}

        {/* FAQ */}
        <div className="mb-8">
          <h2 className="text-base font-bold text-uphold-neutral-800 mb-2">Common questions</h2>
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>

        <p className="text-xs text-uphold-neutral-400 text-center leading-relaxed">
          Upheld provides legal information to help you understand your rights and navigate the process. It does not provide personal legal advice and using the app does not create a solicitor-client or barrister-client relationship. For advice specific to your circumstances, we recommend consulting a qualified solicitor or barrister.
        </p>

        {onClose && (
          <button
            onClick={onClose}
            className="w-full mt-4 text-sm text-uphold-neutral-500 hover:text-uphold-neutral-700 py-2"
          >
            Maybe later
          </button>
        )}
      </div>
    </div>
  );
}
