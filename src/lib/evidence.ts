import type { PracticeArea } from "./types";

export interface EvidenceItem {
  id: string;
  date: string;
  title: string;
  description: string;
  type: EvidenceType;
  createdAt: string;
  claimsSupported?: string[];
}

export type EvidenceType =
  | "document"
  | "email"
  | "photo"
  | "witness"
  | "note"
  | "medical"
  | "financial"
  | "screenshot"
  | "voice_recording"
  | "performance_review"
  | "discipline_letter"
  | "text_message";

export const evidenceTypeConfig: Record<
  EvidenceType,
  { label: string; colour: string; bg: string }
> = {
  document: { label: "Document", colour: "text-blue-600", bg: "bg-blue-50" },
  email: { label: "Email / Message", colour: "text-purple-600", bg: "bg-purple-50" },
  photo: { label: "Photo / Video", colour: "text-amber-600", bg: "bg-amber-50" },
  witness: { label: "Witness", colour: "text-green-600", bg: "bg-green-50" },
  note: { label: "Personal Note", colour: "text-gray-600", bg: "bg-gray-50" },
  medical: { label: "Medical", colour: "text-red-600", bg: "bg-red-50" },
  financial: { label: "Financial", colour: "text-emerald-600", bg: "bg-emerald-50" },
  screenshot: { label: "Screenshot", colour: "text-cyan-600", bg: "bg-cyan-50" },
  voice_recording: { label: "Voice Recording", colour: "text-violet-600", bg: "bg-violet-50" },
  performance_review: { label: "Performance Review", colour: "text-orange-600", bg: "bg-orange-50" },
  discipline_letter: { label: "Disciplinary Letter", colour: "text-rose-600", bg: "bg-rose-50" },
  text_message: { label: "Text Message", colour: "text-teal-600", bg: "bg-teal-50" },
};

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function loadEvidence(area: PracticeArea): EvidenceItem[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(`uphold_evidence_${area}`);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function saveEvidence(area: PracticeArea, items: EvidenceItem[]): void {
  localStorage.setItem(`uphold_evidence_${area}`, JSON.stringify(items));
}

export function addEvidence(
  area: PracticeArea,
  item: Omit<EvidenceItem, "id" | "createdAt">
): EvidenceItem[] {
  const items = loadEvidence(area);
  const newItem: EvidenceItem = {
    ...item,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  const updated = [...items, newItem].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  saveEvidence(area, updated);
  return updated;
}

export function removeEvidence(
  area: PracticeArea,
  itemId: string
): EvidenceItem[] {
  const items = loadEvidence(area);
  const updated = items.filter((i) => i.id !== itemId);
  saveEvidence(area, updated);
  return updated;
}
