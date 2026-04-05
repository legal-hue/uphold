"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Palette } from "lucide-react";
import { JourneyMap } from "@/components/journey/JourneyMap";
import { creativeJourney } from "@/data/journeys/creative";
import { loadCase, createCase, saveCase } from "@/lib/case";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import type { UserCase, TriageOutcome } from "@/lib/types";

export default function CreativeJourneyPage() {
  const router = useRouter();
  const [userCase, setUserCase] = useState<UserCase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existing = loadCase("creative");
    if (existing) {
      setUserCase(existing);
      setLoading(false);
      return;
    }

    const triageData = localStorage.getItem("uphold_latest_triage");
    if (triageData) {
      try {
        const outcome: TriageOutcome = JSON.parse(triageData);
        if (outcome.area === "creative") {
          const newCase = createCase(outcome);
          saveCase(newCase);
          setUserCase(newCase);
          setLoading(false);
          return;
        }
      } catch {
        // Invalid data
      }
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
        <Palette className="w-12 h-12 text-uphold-neutral-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-uphold-neutral-800 mb-3">No assessment found</h1>
        <p className="text-uphold-neutral-600 mb-6">
          Complete your creative rights check first, then come back here to start your guided journey.
        </p>
        <Link
          href="/triage/creative"
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
  const allDone = completedCount === creativeJourney.stages.length;

  return (
    <div className="max-w-xl mx-auto px-4 py-8 md:py-12">
      <Breadcrumb items={[{ label: "Creative Journey" }]} />

      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
            <Palette className="w-4 h-4 text-pink-600" />
          </div>
          <span className="text-sm font-semibold text-pink-600">Creative Economy</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-uphold-neutral-800 mb-2">
          Your case journey
        </h1>
        <p className="text-uphold-neutral-600">
          {allDone
            ? "You've completed every stage. Your rights have been upheld."
            : "Follow each stage step by step. You deserve to be paid."}
        </p>
      </div>

      <JourneyMap
        stages={creativeJourney.stages}
        stageStatuses={userCase.stageStatuses}
        currentStageId={userCase.currentStageId}
        area="creative"
      />

      <div className="mt-8 text-xs text-uphold-neutral-400 text-center p-4 border-t border-uphold-neutral-200">
        This journey guide is based on general legal principles and does not constitute legal advice. Consider seeking professional advice for your specific situation.
      </div>
    </div>
  );
}
