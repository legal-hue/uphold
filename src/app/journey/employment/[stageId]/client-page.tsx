"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Shield } from "lucide-react";
import { StageDetail } from "@/components/journey/StageDetail";
import { PremiumGate } from "@/components/premium/PremiumGate";
import { employmentJourney } from "@/data/journeys/employment";
import { loadCase, saveCase, completeStage } from "@/lib/case";
import type { UserCase } from "@/lib/types";

export default function StagePage() {
  const router = useRouter();
  const params = useParams();
  const stageId = params.stageId as string;

  const [userCase, setUserCase] = useState<UserCase | null>(null);
  const [loading, setLoading] = useState(true);

  const stage = employmentJourney.stages.find((s) => s.id === stageId);
  const stageIndex = employmentJourney.stages.findIndex(
    (s) => s.id === stageId
  );
  const prevStage =
    stageIndex > 0 ? employmentJourney.stages[stageIndex - 1] : null;
  const nextStage =
    stageIndex < employmentJourney.stages.length - 1
      ? employmentJourney.stages[stageIndex + 1]
      : null;

  useEffect(() => {
    const existing = loadCase("employment");
    if (existing) {
      setUserCase(existing);
    }
    setLoading(false);
  }, []);

  const handleComplete = () => {
    if (!userCase || !stage) return;
    const updated = completeStage(userCase, stage.id);
    saveCase(updated);
    setUserCase(updated);

    // Navigate to next stage or back to journey map
    if (nextStage) {
      router.push(`/journey/employment/${nextStage.id}`);
    } else {
      router.push("/journey/employment");
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-uphold-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-uphold-neutral-600">Loading...</p>
      </div>
    );
  }

  if (!stage) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-uphold-neutral-800 mb-3">
          Stage not found
        </h1>
        <Link
          href="/journey/employment"
          className="text-uphold-green-500 hover:text-uphold-green-700 font-semibold"
        >
          Back to journey
        </Link>
      </div>
    );
  }

  if (!userCase) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-uphold-neutral-800 mb-3">
          No case found
        </h1>
        <p className="text-uphold-neutral-600 mb-6">
          Complete your employment rights check first.
        </p>
        <Link
          href="/triage/employment"
          className="inline-flex items-center gap-2 bg-uphold-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-uphold-green-700 transition-colors"
        >
          Check your rights
          <Shield className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const status = userCase.stageStatuses[stage.id] || "locked";

  if (stageIndex > 0) {
    return (
      <PremiumGate area="employment">
        <StageDetail
          stage={stage}
          status={status}
          nextStage={nextStage}
          prevStage={prevStage}
          area="employment"
          caseId={userCase.id}
          deadlines={userCase.deadlines}
          onComplete={handleComplete}
        />
      </PremiumGate>
    );
  }

  return (
    <StageDetail
      stage={stage}
      status={status}
      nextStage={nextStage}
      prevStage={prevStage}
      area="employment"
      caseId={userCase.id}
      deadlines={userCase.deadlines}
      onComplete={handleComplete}
    />
  );
}
