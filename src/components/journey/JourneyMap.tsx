"use client";

import { CheckCircle, Lock, Circle, MapPin } from "lucide-react";
import Link from "next/link";
import type { Stage, StageStatus } from "@/lib/types";

interface JourneyMapProps {
  stages: Stage[];
  stageStatuses: Record<string, StageStatus>;
  currentStageId: string;
  area: string;
}

const statusConfig: Record<
  StageStatus,
  {
    icon: typeof CheckCircle;
    ring: string;
    bg: string;
    text: string;
    line: string;
  }
> = {
  completed: {
    icon: CheckCircle,
    ring: "ring-uphold-green-500 bg-uphold-green-500",
    bg: "bg-uphold-green-50 border-uphold-green-200",
    text: "text-uphold-green-700",
    line: "bg-uphold-green-500",
  },
  "in-progress": {
    icon: MapPin,
    ring: "ring-uphold-green-500 bg-white",
    bg: "bg-white border-uphold-green-500 shadow-md shadow-uphold-green-500/10",
    text: "text-uphold-neutral-800",
    line: "bg-uphold-neutral-200",
  },
  available: {
    icon: Circle,
    ring: "ring-uphold-neutral-400 bg-white",
    bg: "bg-white border-uphold-neutral-200 hover:border-uphold-green-500 hover:shadow-sm",
    text: "text-uphold-neutral-800",
    line: "bg-uphold-neutral-200",
  },
  locked: {
    icon: Lock,
    ring: "ring-uphold-neutral-200 bg-uphold-neutral-50",
    bg: "bg-uphold-neutral-50 border-uphold-neutral-200",
    text: "text-uphold-neutral-400",
    line: "bg-uphold-neutral-200",
  },
};

function StageNode({
  stage,
  status,
  isCurrent,
  area,
}: {
  stage: Stage;
  status: StageStatus;
  isCurrent: boolean;
  area: string;
}) {
  const config = statusConfig[status];
  const Icon = config.icon;
  const isClickable = status !== "locked";

  const content = (
    <div
      className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 ${config.bg} ${
        isClickable ? "cursor-pointer" : "cursor-default"
      } ${isCurrent ? "scale-[1.02]" : ""}`}
    >
      {/* Stage number circle */}
      <div
        className={`w-12 h-12 rounded-full ring-2 flex items-center justify-center flex-shrink-0 transition-all ${config.ring}`}
      >
        {status === "completed" ? (
          <Icon className="w-6 h-6 text-white" />
        ) : status === "in-progress" ? (
          <Icon className="w-6 h-6 text-uphold-green-500" />
        ) : status === "locked" ? (
          <Icon className="w-5 h-5 text-uphold-neutral-400" />
        ) : (
          <span className="text-sm font-bold text-uphold-neutral-600">
            {stage.number}
          </span>
        )}
      </div>

      {/* Stage info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className={`font-bold ${config.text}`}>{stage.name}</h3>
          {isCurrent && (
            <span className="text-xs font-semibold bg-uphold-green-500 text-white px-2 py-0.5 rounded-full">
              You are here
            </span>
          )}
        </div>
        <p
          className={`text-sm mt-0.5 ${
            status === "locked"
              ? "text-uphold-neutral-400"
              : "text-uphold-neutral-600"
          }`}
        >
          {status === "locked" ? "Complete the previous stage to unlock" : stage.description}
        </p>
        {status !== "locked" && (
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-uphold-neutral-400">
              {stage.estimatedDuration}
            </span>
            <span className="text-xs text-uphold-neutral-400">
              {stage.checklist.length} steps
            </span>
          </div>
        )}
      </div>

      {/* Arrow for clickable */}
      {isClickable && (
        <div className="flex-shrink-0">
          <svg
            className={`w-5 h-5 ${
              status === "completed"
                ? "text-uphold-green-500"
                : "text-uphold-neutral-400"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      )}
    </div>
  );

  if (isClickable) {
    return (
      <Link href={`/journey/${area}/${stage.id}`}>
        {content}
      </Link>
    );
  }

  return content;
}

function ConnectingLine({ status }: { status: StageStatus }) {
  const config = statusConfig[status];
  return (
    <div className="flex justify-start pl-9 py-0">
      <div className={`w-0.5 h-6 ${config.line} transition-colors`} />
    </div>
  );
}

export function JourneyMap({
  stages,
  stageStatuses,
  currentStageId,
  area,
}: JourneyMapProps) {
  const completedCount = Object.values(stageStatuses).filter(
    (s) => s === "completed"
  ).length;
  const progress = (completedCount / stages.length) * 100;

  return (
    <div>
      {/* Progress summary */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-uphold-neutral-600">
            Your progress
          </span>
          <span className="text-sm font-bold text-uphold-green-500">
            {completedCount} of {stages.length} stages
          </span>
        </div>
        <div className="w-full h-3 bg-uphold-neutral-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-uphold-green-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stage list */}
      <div>
        {stages.map((stage, i) => {
          const status = stageStatuses[stage.id] || "locked";
          const isCurrent = stage.id === currentStageId;

          return (
            <div key={stage.id}>
              <div
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
              >
                <StageNode
                  stage={stage}
                  status={status}
                  isCurrent={isCurrent}
                  area={area}
                />
              </div>
              {i < stages.length - 1 && (
                <ConnectingLine status={status} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
