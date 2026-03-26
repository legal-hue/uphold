"use client";

import { useState } from "react";
import { Shield, FileText, Map, FolderSearch, CheckCircle, ArrowRight, RotateCcw, Loader2 } from "lucide-react";
import { activateSubscription } from "@/lib/subscription";
import { purchasePremium, restorePurchases, isNativeApp } from "@/lib/purchases";
import { useRouter } from "next/navigation";

interface UpgradeScreenProps {
  area: string;
  onClose?: () => void;
}

const features = [
  {
    icon: Shield,
    title: "Case Assessment",
    desc: "A detailed review of your case highlighting what strengthens your position, what needs attention, and the key risks and opportunities ahead.",
  },
  {
    icon: Map,
    title: "Step-by-step case journey",
    desc: "GPS-style navigation guiding you through every stage from first steps to resolution, with checklists at each stage.",
  },
  {
    icon: FileText,
    title: "Pre-populated documents",
    desc: "Grievance letters, repair notices, pre-action letters, and without prejudice correspondence auto-filled with your details.",
  },
  {
    icon: FolderSearch,
    title: "Evidence builder",
    desc: "Organise your documents, emails, photos, and witness details into a clear timeline ready for your case.",
  },
];

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
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-uphold-green-50 text-uphold-green-700 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-uphold-green-100">
            <Shield className="w-4 h-4" />
            Your assessment is complete
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-uphold-neutral-800 mb-4">
            Get your full Case Assessment
          </h1>
          <p className="text-uphold-neutral-600 leading-relaxed max-w-md mx-auto">
            You have seen where you stand. Now get the detailed review, tools, and guidance to take your case forward with confidence.
          </p>
        </div>

        <div className="space-y-4 mb-10">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex items-start gap-4 bg-white rounded-xl p-4 border border-uphold-neutral-200"
            >
              <div className="w-10 h-10 bg-uphold-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <f.icon className="w-5 h-5 text-uphold-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-uphold-neutral-800 text-sm">
                  {f.title}
                </h3>
                <p className="text-xs text-uphold-neutral-600 mt-0.5 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border-2 border-uphold-green-500 p-6 mb-6">
          <div className="bg-uphold-green-50 text-uphold-green-700 text-sm font-semibold text-center py-2 px-4 rounded-lg mb-4 border border-uphold-green-100">
            Start with a 7-day free trial
          </div>

          <div className="flex items-baseline justify-between mb-1">
            <span className="text-sm font-medium text-uphold-neutral-600">
              Upheld Premium
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-uphold-neutral-800">
                £40
              </span>
              <span className="text-sm text-uphold-neutral-500">/month</span>
            </div>
          </div>
          <p className="text-xs text-uphold-neutral-500 mb-5">
            7 days free, then £40/month. Cancel anytime.
          </p>

          <div className="space-y-2 mb-6">
            {[
              "Full Case Assessment of your situation",
              "Pre-populated letters and legal documents",
              "Step-by-step journey through your entire case",
              "Evidence builder and case timeline",
              "Deadline tracking and reminders",
              "All three practice areas included",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-uphold-green-500 flex-shrink-0" />
                <span className="text-sm text-uphold-neutral-700">{item}</span>
              </div>
            ))}
          </div>

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
                Start 7-day free trial
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-xs text-uphold-neutral-400 text-center mt-3">
            No charge for 7 days. Cancel before the trial ends and you won&apos;t pay a thing.
          </p>

          {error && (
            <p className="text-xs text-uphold-red text-center mt-2">{error}</p>
          )}
        </div>

        {isNativeApp() && (
          <button
            onClick={handleRestore}
            disabled={restoring}
            className="w-full flex items-center justify-center gap-2 text-sm text-uphold-neutral-500 hover:text-uphold-neutral-700 py-2"
          >
            <RotateCcw className="w-4 h-4" />
            {restoring ? "Restoring..." : "Restore previous purchase"}
          </button>
        )}

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
