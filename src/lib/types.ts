export type PracticeArea = 'employment' | 'housing' | 'contract';

export type QuestionType = 'single' | 'multiple' | 'date' | 'text';

export interface QuizOption {
  value: string;
  label: string;
  score: number;
  flag?: 'deadline' | 'urgent';
}

export interface QuizQuestion {
  id: string;
  text: string;
  helpText?: string;
  type: QuestionType;
  options?: QuizOption[];
  required: boolean;
  conditionalOn?: {
    questionId: string;
    value: string | string[];
  };
}

export interface Quiz {
  area: PracticeArea;
  introMessage: string;
  questions: QuizQuestion[];
  scoring: {
    strong: { min: number; message: string };
    maybe: { min: number; message: string };
    difficult: { min: number; message: string };
  };
}

export type TriageResult = 'strong' | 'maybe' | 'difficult';

export interface TriageOutcome {
  area: PracticeArea;
  result: TriageResult;
  score: number;
  answers: Record<string, string | string[]>;
  deadlines: Deadline[];
  completedAt: string;
}

export interface DeadlineRule {
  id: string;
  area: PracticeArea;
  name: string;
  description: string;
  basePeriodDays: number;
  calculationMethod: 'calendar' | 'minus-one-day' | 'working-days';
  triggeredBy: string;
  acasExtension?: boolean;
  warningThresholdDays: number;
}

export interface Deadline {
  ruleId: string;
  name: string;
  triggerDate: string;
  deadlineDate: string;
  daysRemaining: number;
  isUrgent: boolean;
  explanation: string;
}

export type StageStatus = 'locked' | 'available' | 'in-progress' | 'completed';

export interface ChecklistItem {
  id: string;
  text: string;
  helpText?: string;
  required: boolean;
}

export interface Stage {
  id: string;
  number: number;
  name: string;
  shortName: string;
  description: string;
  guidance: string[];
  checklist: ChecklistItem[];
  documentsAvailable: string[];
  estimatedDuration: string;
  tips: string[];
}

export interface Journey {
  area: PracticeArea;
  stages: Stage[];
}

export interface UserCase {
  id: string;
  area: PracticeArea;
  createdAt: string;
  triageOutcome: TriageOutcome;
  currentStageId: string;
  stageStatuses: Record<string, StageStatus>;
  checklistProgress: Record<string, boolean>;
  deadlines: Deadline[];
  notes: string;
}

export interface UpholdStorage {
  version: number;
  cases: UserCase[];
  triageHistory: TriageOutcome[];
  preferences: {
    lastVisited: string;
  };
}
