"use client";

import { CheckCircle, ArrowRight, X } from "lucide-react";
import type { Stage } from "@/lib/types";

interface MilestoneTransitionModalProps {
  completedStage: Stage;
  nextStage: Stage | null;
  onContinue: () => void;
  onDismiss: () => void;
}

export function MilestoneTransitionModal({
  completedStage,
  nextStage,
  onContinue,
  onDismiss,
}: MilestoneTransitionModalProps) {
  const message =
    completedStage.transitionMessage ||
    (nextStage
      ? `You've completed ${completedStage.shortName}. Next up: ${nextStage.name}.`
      : "You've completed this stage. Great work.");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-scale-in">
        <div className="flex justify-end mb-2">
          <button onClick={onDismiss} className="p-1 text-uphold-neutral-400 hover:text-uphold-neutral-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-uphold-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-uphold-green-500" />
          </div>
          <h2 className="text-xl font-bold text-uphold-neutral-800 mb-2">
            Stage complete
          </h2>
          <p className="text-sm text-uphold-neutral-600 leading-relaxed">{message}</p>
        </div>

        <div className="space-y-2">
          {nextStage ? (
            <button
              onClick={onContinue}
              className="w-full flex items-center justify-center gap-2 bg-uphold-green-500 text-white font-semibold py-3 rounded-xl hover:bg-uphold-green-700 transition-colors"
            >
              Next: {nextStage.shortName}
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onContinue}
              className="w-full flex items-center justify-center gap-2 bg-uphold-green-500 text-white font-semibold py-3 rounded-xl hover:bg-uphold-green-700 transition-colors"
            >
              View your journey
            </button>
          )}
          <button
            onClick={onDismiss}
            className="w-full text-sm text-uphold-neutral-500 hover:text-uphold-neutral-700 py-2 transition-colors"
          >
            Stay on this stage
          </button>
        </div>
      </div>
    </div>
  );
}
