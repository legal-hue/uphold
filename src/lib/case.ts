import type { UserCase, TriageOutcome, StageStatus, PracticeArea } from "./types";
import { employmentJourney } from "@/data/journeys/employment";
import { housingJourney } from "@/data/journeys/housing";
import { contractJourney } from "@/data/journeys/contract";
import { creativeJourney } from "@/data/journeys/creative";

function getJourney(area: PracticeArea) {
  if (area === "employment") return employmentJourney;
  if (area === "housing") return housingJourney;
  if (area === "contract") return contractJourney;
  if (area === "creative") return creativeJourney;
  return null;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function createCase(triageOutcome: TriageOutcome): UserCase {
  const journey = getJourney(triageOutcome.area);
  if (!journey) {
    throw new Error(`No journey found for area: ${triageOutcome.area}`);
  }

  const stageStatuses: Record<string, StageStatus> = {};
  journey.stages.forEach((stage, i) => {
    stageStatuses[stage.id] = i === 0 ? "in-progress" : "locked";
  });

  return {
    id: generateId(),
    area: triageOutcome.area,
    createdAt: new Date().toISOString(),
    triageOutcome,
    currentStageId: journey.stages[0].id,
    stageStatuses,
    checklistProgress: {},
    deadlines: triageOutcome.deadlines,
    notes: "",
  };
}

export function completeStage(userCase: UserCase, stageId: string): UserCase {
  const journey = getJourney(userCase.area);
  if (!journey) return userCase;

  const stageIndex = journey.stages.findIndex((s) => s.id === stageId);
  if (stageIndex === -1) return userCase;

  const updatedStatuses = { ...userCase.stageStatuses };
  updatedStatuses[stageId] = "completed";

  // Unlock next stage
  const nextStage = journey.stages[stageIndex + 1];
  let nextStageId = userCase.currentStageId;

  if (nextStage) {
    updatedStatuses[nextStage.id] = "in-progress";
    nextStageId = nextStage.id;
  }

  return {
    ...userCase,
    stageStatuses: updatedStatuses,
    currentStageId: nextStageId,
  };
}

export function loadCase(area: PracticeArea): UserCase | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(`uphold_case_${area}`);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function saveCase(userCase: UserCase): void {
  localStorage.setItem(
    `uphold_case_${userCase.area}`,
    JSON.stringify(userCase)
  );
}

export function hasActiveCase(area: PracticeArea): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(`uphold_case_${area}`) !== null;
}
