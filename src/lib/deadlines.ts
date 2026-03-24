import type { Deadline } from "./types";

export function calculateEmploymentDeadlines(
  answers: Record<string, string | string[]>
): Deadline[] {
  const deadlines: Deadline[] = [];
  const eventDate = answers.when_happened as string;

  if (!eventDate) return deadlines;

  const trigger = new Date(eventDate);
  if (isNaN(trigger.getTime())) return deadlines;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // ET1 deadline: 3 months minus 1 day from the date of the act
  const et1Deadline = new Date(trigger);
  et1Deadline.setMonth(et1Deadline.getMonth() + 3);
  et1Deadline.setDate(et1Deadline.getDate() - 1);

  const et1DaysRemaining = Math.ceil(
    (et1Deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  deadlines.push({
    ruleId: "et1",
    name: "Employment Tribunal Claim (ET1)",
    triggerDate: eventDate,
    deadlineDate: et1Deadline.toISOString().split("T")[0],
    daysRemaining: et1DaysRemaining,
    isUrgent: et1DaysRemaining <= 30,
    explanation:
      et1DaysRemaining > 0
        ? `You have ${et1DaysRemaining} days to file your ET1 claim (by ${formatDate(et1Deadline)}). You must contact ACAS first.`
        : `Your ET1 deadline may have passed on ${formatDate(et1Deadline)}. Contact a legal professional urgently — there may still be options.`,
  });

  // ACAS early conciliation: should be started ASAP (before ET1 deadline)
  const acasAnswer = answers.acas as string;
  if (acasAnswer === "no" || acasAnswer === "whats_acas") {
    const acasUrgency = et1DaysRemaining <= 30;
    deadlines.push({
      ruleId: "acas",
      name: "ACAS Early Conciliation",
      triggerDate: eventDate,
      deadlineDate: et1Deadline.toISOString().split("T")[0],
      daysRemaining: et1DaysRemaining,
      isUrgent: acasUrgency,
      explanation:
        "You must contact ACAS for early conciliation before you can file a tribunal claim. Call 0300 123 1100 (Mon-Fri, 8am-6pm) or start online at acas.org.uk. This is free.",
    });
  }

  return deadlines;
}

export function calculateHousingDeadlines(
  answers: Record<string, string | string[]>
): Deadline[] {
  const deadlines: Deadline[] = [];
  const eventDate = answers.when_happened as string;
  if (!eventDate) return deadlines;

  const trigger = new Date(eventDate);
  if (isNaN(trigger.getTime())) return deadlines;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 6-year limitation for housing disrepair
  const limitationDeadline = new Date(trigger);
  limitationDeadline.setFullYear(limitationDeadline.getFullYear() + 6);

  const daysRemaining = Math.ceil(
    (limitationDeadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  deadlines.push({
    ruleId: "limitation",
    name: "Limitation Period for Disrepair Claim",
    triggerDate: eventDate,
    deadlineDate: limitationDeadline.toISOString().split("T")[0],
    daysRemaining,
    isUrgent: daysRemaining <= 90,
    explanation: `You have until ${formatDate(limitationDeadline)} to bring a disrepair claim (6-year limitation). However, the sooner you notify your landlord in writing, the stronger your position.`,
  });

  return deadlines;
}

export function calculateContractDeadlines(
  answers: Record<string, string | string[]>
): Deadline[] {
  const deadlines: Deadline[] = [];
  const eventDate = answers.when_happened as string;
  if (!eventDate) return deadlines;

  const trigger = new Date(eventDate);
  if (isNaN(trigger.getTime())) return deadlines;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const limitationDeadline = new Date(trigger);
  limitationDeadline.setFullYear(limitationDeadline.getFullYear() + 6);

  const daysRemaining = Math.ceil(
    (limitationDeadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  deadlines.push({
    ruleId: "limitation",
    name: "Limitation Period for Breach of Contract",
    triggerDate: eventDate,
    deadlineDate: limitationDeadline.toISOString().split("T")[0],
    daysRemaining,
    isUrgent: daysRemaining <= 90,
    explanation: `You have until ${formatDate(limitationDeadline)} to bring a breach of contract claim (6-year limitation under the Limitation Act 1980).`,
  });

  return deadlines;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
