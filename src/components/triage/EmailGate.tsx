"use client";

import { useState } from "react";
import { Mail, ArrowRight, X, Shield } from "lucide-react";

interface EmailGateProps {
  area: string;
  onContinue: () => void;
}

export function EmailGate({ area, onContinue }: EmailGateProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const areaLabel =
    area === "employment"
      ? "employment rights"
      : area === "housing"
      ? "housing rights"
      : area === "creative"
      ? "creator rights"
      : "contract disputes";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      await fetch("/api/email-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), area }),
      });
    } catch {
      // Non-blocking, don't stop the user seeing their result
    } finally {
      onContinue();
    }
  };

  const handleSkip = () => {
    onContinue();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative animate-scale-in">
        <button
          onClick={handleSkip}
          className="absolute top-3 right-3 text-uphold-neutral-400 hover:text-uphold-neutral-600"
          aria-label="Skip"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 bg-uphold-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-uphold-green-500" />
        </div>

        <h3 className="text-lg font-bold text-uphold-neutral-800 mb-2 text-center">
          Your result is ready
        </h3>
        <p className="text-sm text-uphold-neutral-600 mb-5 text-center">
          Get practical updates on {areaLabel}, new features, and free guides —
          straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center gap-2 border-2 border-uphold-neutral-200 rounded-xl px-4 py-3 focus-within:border-uphold-green-500 transition-colors bg-white">
            <Mail className="w-4 h-4 text-uphold-neutral-400 flex-shrink-0" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 text-sm outline-none text-uphold-neutral-800 placeholder:text-uphold-neutral-400 bg-transparent"
              autoFocus
            />
          </div>
          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}
          <button
            type="submit"
            disabled={!email.trim() || submitting}
            className="w-full flex items-center justify-center gap-2 bg-uphold-green-500 text-white font-semibold py-3 rounded-xl hover:bg-uphold-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Just a moment…" : "Show my result"}
            {!submitting && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <button
          onClick={handleSkip}
          className="mt-3 w-full text-sm text-uphold-neutral-400 hover:text-uphold-neutral-600 transition-colors"
        >
          Skip, just show my result
        </button>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-uphold-neutral-400">
          <Shield className="w-3 h-3" />
          <span>No spam. Unsubscribe any time.</span>
        </div>
      </div>
    </div>
  );
}
