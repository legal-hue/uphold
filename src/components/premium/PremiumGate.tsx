"use client";

import { useEffect, useState } from "react";
import { Lock, Shield, ArrowRight } from "lucide-react";
import { isSubscribed } from "@/lib/subscription";
import { UpgradeScreen } from "./UpgradeScreen";

interface PremiumGateProps {
  children: React.ReactNode;
  area?: string;
}

export function PremiumGate({ children, area = "employment" }: PremiumGateProps) {
  const [premium, setPremium] = useState<boolean | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    setPremium(isSubscribed());
  }, []);

  // Still loading
  if (premium === null) return null;

  // Subscribed - show the content
  if (premium) return <>{children}</>;

  // Not subscribed - show gate
  if (showUpgrade) {
    return <UpgradeScreen area={area} onClose={() => setShowUpgrade(false)} />;
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 bg-uphold-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Lock className="w-8 h-8 text-uphold-green-500" />
      </div>
      <h1 className="text-2xl font-bold text-uphold-neutral-800 mb-3">
        This is a premium feature
      </h1>
      <p className="text-uphold-neutral-600 mb-8 leading-relaxed max-w-sm mx-auto">
        Upgrade to Upheld Premium to access your full Legal Case Review, guided journey, document generator, and evidence builder.
      </p>
      <button
        onClick={() => setShowUpgrade(true)}
        className="inline-flex items-center gap-2 bg-uphold-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-uphold-green-700 transition-colors"
      >
        <Shield className="w-5 h-5" />
        View Premium
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
