"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, ArrowLeft, FileText } from "lucide-react";
import { JourneyMap } from "@/components/journey/JourneyMap";
import { contractJourney } from "@/data/journeys/contract";
import { loadCase, createCase, saveCase } from "@/lib/case";
import type { UserCase, TriageOutcome } from "@/lib/types";
import { PremiumGate } from "@/components/premium/PremiumGate";

export default function ContractJourneyPage() {
  const router = useRouter();
  const [userCase, setUserCase] = useState<UserCase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existing = loadCase("contract");
    if (existing) {
      setUserCase(existing);
      setLoading(false);
      return;
    }

    const triageData = localStorage.getItem("uphold_latest_triage");
    if (triageData) {
      try {
        const outcome: TriageOutcome = JSON.parse(triageData);
        if (outcome.area === "contract") {
          const newCase = createCase(outcome);
          saveCase(newCase);
          setUserCase(newCase);
          setLoading(false);
          return;
        }
      } catch { /* invalid */ }
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-uphold-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-uphold-neutral-600">Loading your journey...</p>
      </div>
    );
  }

  if (!userCase) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <FileText className="w-12 h-12 text-uphold-neutral-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-uphold-neutral-800 mb-3">
          No assessment found
        </h1>
        <p className="text-uphold-neutral-600 mb-6">
          Complete your contract rights check first, then come back here to
          start your guided journey.
        </p>
        <Link
          href="/triage/contract"
          className="inline-flex items-center gap-2 bg-uphold-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-uphold-green-700 transition-colors"
        >
          Check your rights
          <Shield className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const completedCount = Object.values(userCase.stageStatuses).filter(
    (s) => s === "completed"
  ).length;
  const allDone = completedCount === contractJourney.stages.length;

  return (
    <PremiumGate area="contract">
      <div className="max-w-xl mx-auto px-4 py-8 md:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-uphold-neutral-600 hover:text-uphold-neutral-800 text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>

        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-sm font-semibold text-purple-600">Contract</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-uphold-neutral-800 mb-2">
            Your case journey
          </h1>
          <p className="text-uphold-neutral-600">
            {allDone
              ? "You've completed every stage. Well done."
              : "Follow each stage step by step. Take your time."}
          </p>
        </div>

        <JourneyMap
          stages={contractJourney.stages}
          stageStatuses={userCase.stageStatuses}
          currentStageId={userCase.currentStageId}
          area="contract"
        />

        <div className="mt-8 text-xs text-uphold-neutral-400 text-center p-4 border-t border-uphold-neutral-200">
          This journey guide is based on general legal principles and does not
          constitute legal advice.
        </div>
      </div>
    </PremiumGate>
  );
}
