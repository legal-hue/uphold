"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Circle,
  Clock,
  Lightbulb,
  FileText,
  Lock,
  Shield,
} from "lucide-react";
import type { Stage, StageStatus, Deadline } from "@/lib/types";

interface StageDetailProps {
  stage: Stage;
  status: StageStatus;
  nextStage: Stage | null;
  prevStage: Stage | null;
  area: string;
  caseId: string;
  deadlines: Deadline[];
  onComplete: () => void;
}

function GuidanceSection({ guidance }: { guidance: string[] }) {
  return (
    <div className="space-y-4">
      {guidance.map((paragraph, i) => (
        <p
          key={i}
          className="text-uphold-neutral-600 leading-relaxed"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function StageChecklist({
  items,
  progress,
  onToggle,
}: {
  items: Stage["checklist"];
  progress: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const completedCount = Object.values(progress).filter(Boolean).length;
  const totalRequired = items.filter((i) => i.required).length;
  const requiredCompleted = items
    .filter((i) => i.required)
    .filter((i) => progress[i.id]).length;
  const allRequiredDone = requiredCompleted >= totalRequired;
  const percentage = (completedCount / items.length) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-uphold-neutral-800">
          Checklist
        </h2>
        <span className="text-xs font-semibold text-uphold-green-500">
          {completedCount}/{items.length} done
        </span>
      </div>

      <div className="w-full h-2 bg-uphold-neutral-100 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-uphold-green-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="space-y-2">
        {items.map((item) => {
          const isDone = progress[item.id] || false;
          return (
            <button
              key={item.id}
              onClick={() => onToggle(item.id)}
              className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                isDone
                  ? "border-uphold-green-100 bg-uphold-green-50"
                  : "border-uphold-neutral-200 bg-white hover:border-uphold-neutral-400"
              }`}
            >
              <div className="mt-0.5">
                {isDone ? (
                  <CheckCircle className="w-5 h-5 text-uphold-green-500 animate-scale-in" />
                ) : (
                  <Circle className="w-5 h-5 text-uphold-neutral-400" />
                )}
              </div>
              <div className="flex-1">
                <span
                  className={`font-medium block ${
                    isDone
                      ? "text-uphold-neutral-400 line-through"
                      : "text-uphold-neutral-700"
                  }`}
                >
                  {item.text}
                  {item.required && !isDone && (
                    <span className="text-uphold-red text-xs ml-1">*</span>
                  )}
                </span>
                {item.helpText && !isDone && (
                  <span className="text-xs text-uphold-neutral-400 mt-1 block">
                    {item.helpText}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {allRequiredDone && (
        <div className="mt-4 p-3 bg-uphold-green-50 border border-uphold-green-200 rounded-xl text-center animate-scale-in">
          <p className="text-sm text-uphold-green-700 font-semibold">
            All required steps completed. You can move to the next stage.
          </p>
        </div>
      )}
    </div>
  );
}

function DeadlineReminder({ deadlines }: { deadlines: Deadline[] }) {
  if (deadlines.length === 0) return null;

  const urgentDeadline = deadlines.find((d) => d.isUrgent);
  const mainDeadline = urgentDeadline || deadlines[0];

  return (
    <div
      className={`p-4 rounded-xl border-2 ${
        mainDeadline.isUrgent
          ? "border-red-300 bg-red-50"
          : "border-uphold-neutral-200 bg-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <Clock
          className={`w-5 h-5 mt-0.5 ${
            mainDeadline.isUrgent ? "text-red-500" : "text-uphold-green-500"
          }`}
        />
        <div>
          <h3 className="font-semibold text-sm text-uphold-neutral-800">
            {mainDeadline.name}
          </h3>
          <p className="text-sm text-uphold-neutral-600 mt-1">
            {mainDeadline.daysRemaining > 0
              ? `${mainDeadline.daysRemaining} days remaining`
              : "Deadline may have passed"}
          </p>
          <p className="text-xs text-uphold-neutral-400 mt-1">
            {mainDeadline.explanation}
          </p>
        </div>
      </div>
    </div>
  );
}

function TipsSection({ tips }: { tips: string[] }) {
  return (
    <div className="bg-uphold-warm-50 rounded-xl p-5 border border-uphold-warm-200">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-uphold-amber" />
        <h3 className="font-bold text-sm text-uphold-neutral-800">Tips</h3>
      </div>
      <ul className="space-y-2">
        {tips.map((tip, i) => (
          <li key={i} className="text-sm text-uphold-neutral-600 flex items-start gap-2">
            <span className="text-uphold-amber mt-1 flex-shrink-0">-</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StageDetail({
  stage,
  status,
  nextStage,
  prevStage,
  area,
  caseId,
  deadlines,
  onComplete,
}: StageDetailProps) {
  const storageKey = `uphold_journey_${caseId}_stage_${stage.id}`;
  const [checklistProgress, setChecklistProgress] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setChecklistProgress(JSON.parse(stored));
    }
  }, [storageKey]);

  const toggleChecklist = (id: string) => {
    const updated = { ...checklistProgress, [id]: !checklistProgress[id] };
    setChecklistProgress(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const requiredItems = stage.checklist.filter((i) => i.required);
  const allRequiredDone = requiredItems.every(
    (i) => checklistProgress[i.id]
  );

  if (status === "locked") {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <Lock className="w-12 h-12 text-uphold-neutral-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-uphold-neutral-800 mb-2">
          Stage locked
        </h1>
        <p className="text-uphold-neutral-600 mb-6">
          Complete the previous stage to unlock this one.
        </p>
        <Link
          href={`/journey/${area}`}
          className="inline-flex items-center gap-2 text-uphold-green-500 hover:text-uphold-green-700 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to journey
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 md:py-12">
      {/* Back to journey */}
      <Link
        href={`/journey/${area}`}
        className="inline-flex items-center gap-2 text-uphold-neutral-600 hover:text-uphold-neutral-800 text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to journey map
      </Link>

      {/* Stage header */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-uphold-green-500 bg-uphold-green-50 px-2 py-1 rounded-full">
            Stage {stage.number} of 7
          </span>
          <span className="text-xs text-uphold-neutral-400">
            {stage.estimatedDuration}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-uphold-neutral-800 mb-2">
          {stage.name}
        </h1>
        <p className="text-uphold-neutral-600">{stage.description}</p>
      </div>

      {/* Deadline reminder */}
      {deadlines.length > 0 && (
        <div className="mb-6 animate-fade-in-up stagger-1">
          <DeadlineReminder deadlines={deadlines} />
        </div>
      )}

      {/* Guidance */}
      <div className="mb-8 animate-fade-in-up stagger-2">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-uphold-green-500" />
          <h2 className="text-lg font-bold text-uphold-neutral-800">
            What you need to know
          </h2>
        </div>
        <GuidanceSection guidance={stage.guidance} />
      </div>

      {/* Checklist */}
      <div className="mb-8 animate-fade-in-up stagger-3">
        <StageChecklist
          items={stage.checklist}
          progress={checklistProgress}
          onToggle={toggleChecklist}
        />
      </div>

      {/* Documents available */}
      {stage.documentsAvailable.length > 0 && (
        <div className="mb-8 animate-fade-in-up stagger-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-uphold-green-500" />
            <h3 className="font-bold text-sm text-uphold-neutral-800">
              Available documents
            </h3>
          </div>
          <div className="space-y-2">
            {stage.documentsAvailable.map((doc) => (
              <div
                key={doc}
                className="flex items-center gap-3 p-3 bg-uphold-neutral-50 rounded-xl border border-uphold-neutral-200"
              >
                <FileText className="w-4 h-4 text-uphold-neutral-400" />
                <span className="text-sm text-uphold-neutral-600">{doc}</span>
                <span className="text-xs text-uphold-neutral-400 ml-auto">
                  Coming soon
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mb-8">
        <TipsSection tips={stage.tips} />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-uphold-neutral-200">
        {prevStage ? (
          <Link
            href={`/journey/${area}/${prevStage.id}`}
            className="flex items-center gap-2 text-uphold-neutral-600 hover:text-uphold-neutral-800 transition-colors py-3 px-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">{prevStage.shortName}</span>
          </Link>
        ) : (
          <div />
        )}

        {status !== "completed" && allRequiredDone && (
          <button
            onClick={onComplete}
            className="flex items-center gap-2 bg-uphold-green-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-uphold-green-700 transition-colors shadow-md"
          >
            Complete stage
            <CheckCircle className="w-4 h-4" />
          </button>
        )}

        {status === "completed" && nextStage && (
          <Link
            href={`/journey/${area}/${nextStage.id}`}
            className="flex items-center gap-2 bg-uphold-green-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-uphold-green-700 transition-colors shadow-md"
          >
            Next: {nextStage.shortName}
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}

        {status === "completed" && !nextStage && (
          <div className="flex items-center gap-2 text-uphold-green-500 font-semibold py-3 px-4">
            <CheckCircle className="w-5 h-5" />
            Journey complete
          </div>
        )}
      </div>
    </div>
  );
}
