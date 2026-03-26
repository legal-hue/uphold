"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, AlertTriangle, XCircle, Clock, Phone, ArrowRight, ExternalLink, Heart, CheckCircle, Circle } from "lucide-react";
import type { TriageResult, Deadline } from "@/lib/types";

interface TriageOutcomeData {
  area: string;
  result: TriageResult;
  score: number;
  message: string;
  deadlines: Deadline[];
  completedAt: string;
}

const resultConfig = {
  strong: {
    icon: ShieldCheck,
    title: "You may have a strong case",
    colour: "text-uphold-success",
    bg: "bg-green-50",
    border: "border-green-200",
    dotColour: "bg-green-500",
    encouragement: "Whatever happens next, you've taken the hardest step. You've started.",
  },
  maybe: {
    icon: AlertTriangle,
    title: "You may have a claim",
    colour: "text-uphold-amber",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dotColour: "bg-amber-500",
    encouragement: "Many successful cases start exactly where you are now. Let's keep going.",
  },
  difficult: {
    icon: XCircle,
    title: "This may be challenging",
    colour: "text-uphold-red",
    bg: "bg-red-50",
    border: "border-red-200",
    dotColour: "bg-red-500",
    encouragement: "Even if this route is difficult, you still have options. Don't give up.",
  },
};

const nextSteps: Record<string, { text: string; link: string | null; external: boolean }[]> = {
  employment: [
    { text: "Contact ACAS for free early conciliation", link: "https://www.acas.org.uk/early-conciliation", external: true },
    { text: "Gather your evidence (emails, contract, payslips)", link: null, external: false },
    { text: "Write down everything that happened with dates", link: null, external: false },
    { text: "Consider speaking to a legal professional", link: null, external: false },
  ],
  housing: [
    { text: "Write to your landlord about the repairs needed", link: null, external: false },
    { text: "Take photos and videos of the disrepair", link: null, external: false },
    { text: "Report to your council's Environmental Health team", link: null, external: false },
    { text: "See your GP if the conditions are affecting your health", link: null, external: false },
  ],
  contract: [
    { text: "Gather all contract documents and correspondence", link: null, external: false },
    { text: "Send a formal letter before action", link: null, external: false },
    { text: "Consider mediation before court action", link: null, external: false },
    { text: "Keep records of any financial losses", link: null, external: false },
  ],
};

function CountdownRing({ days, isUrgent }: { days: number; isUrgent: boolean }) {
  const maxDays = 90;
  const percentage = Math.max(0, Math.min(100, (days / maxDays) * 100));
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (percentage / 100) * circumference;
  const color = isUrgent ? "#C44D4D" : days <= 60 ? "#D4A843" : "#4CAF73";

  return (
    <div className="relative w-28 h-28 mx-auto">
      <svg className="countdown-ring w-full h-full" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#E0E0E0" strokeWidth="6" />
        <circle
          cx="50" cy="50" r="45" fill="none"
          stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-all duration-1000 ease-out"
          style={{ animation: "countdown-ring 1.5s ease-out forwards" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-uphold-neutral-800">{days > 0 ? days : 0}</span>
        <span className="text-xs text-uphold-neutral-400">days left</span>
      </div>
    </div>
  );
}

function InteractiveChecklist({ steps, area }: { steps: typeof nextSteps.employment; area: string }) {
  const storageKey = `uphold_checklist_${area}`;
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) setChecked(JSON.parse(stored));
  }, [storageKey]);

  const toggle = (index: number) => {
    const updated = { ...checked, [index]: !checked[index] };
    setChecked(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const progress = (completedCount / steps.length) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-uphold-neutral-800">Your action plan</h2>
        <span className="text-xs font-semibold text-uphold-green-500">{completedCount}/{steps.length} done</span>
      </div>

      <div className="w-full h-2 bg-uphold-neutral-100 rounded-full overflow-hidden mb-4">
        <div className="h-full bg-uphold-green-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="space-y-2">
        {steps.map((step, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              checked[i]
                ? "border-uphold-green-100 bg-uphold-green-50"
                : "border-uphold-neutral-200 bg-white hover:border-uphold-neutral-400"
            }`}
          >
            <div className="mt-0.5">
              {checked[i] ? (
                <CheckCircle className="w-5 h-5 text-uphold-green-500 animate-scale-in" />
              ) : (
                <Circle className="w-5 h-5 text-uphold-neutral-400" />
              )}
            </div>
            <div className="flex-1">
              {step.external && step.link ? (
                <a
                  href={step.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`font-medium flex items-center gap-1 ${checked[i] ? "text-uphold-neutral-400 line-through" : "text-uphold-green-500 hover:text-uphold-green-700"}`}
                >
                  {step.text}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className={`font-medium ${checked[i] ? "text-uphold-neutral-400 line-through" : "text-uphold-neutral-700"}`}>
                  {step.text}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {completedCount === steps.length && (
        <div className="mt-4 p-4 bg-uphold-green-50 border border-uphold-green-200 rounded-xl text-center animate-scale-in">
          <p className="text-uphold-green-700 font-semibold">
            Well done. You&apos;ve completed all the immediate steps.
          </p>
        </div>
      )}
    </div>
  );
}

export function ResultDisplay() {
  const [outcome, setOutcome] = useState<TriageOutcomeData | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("uphold_latest_triage");
    if (stored) {
      // Deliberate 1.5s pause - makes the result feel considered
      setTimeout(() => {
        setOutcome(JSON.parse(stored));
        setTimeout(() => setRevealed(true), 400);
      }, 1500);
    }
  }, []);

  if (!outcome) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-uphold-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-uphold-neutral-600">Analysing your answers...</p>
      </div>
    );
  }

  const config = resultConfig[outcome.result];
  const Icon = config.icon;
  const steps = nextSteps[outcome.area as keyof typeof nextSteps] || nextSteps.employment;
  const mainDeadline = outcome.deadlines.find((d) => d.ruleId === "et1" || d.ruleId === "limitation");

  return (
    <div className="max-w-xl mx-auto px-4 py-8 md:py-12">
      {/* Result card with animation */}
      <div className={`${config.bg} ${config.border} border-2 rounded-2xl p-6 md:p-8 text-center mb-6 ${revealed ? "animate-scale-in" : "opacity-0"}`}>
        <div className={`w-4 h-4 ${config.dotColour} rounded-full mx-auto mb-4`} />
        <Icon className={`w-12 h-12 ${config.colour} mx-auto mb-3`} />
        <h1 className="text-2xl md:text-3xl font-bold text-uphold-neutral-800 mb-3">
          {config.title}
        </h1>
        <p className="text-uphold-neutral-600 leading-relaxed mb-4">
          {outcome.message}
        </p>
        <p className="text-sm text-uphold-neutral-400 italic">
          {config.encouragement}
        </p>
      </div>

      {/* Countdown ring for main deadline */}
      {mainDeadline && mainDeadline.daysRemaining > 0 && (
        <div className={`mb-6 p-6 rounded-2xl border-2 ${mainDeadline.isUrgent ? "border-red-200 bg-red-50" : "border-uphold-neutral-200 bg-white"} ${revealed ? "animate-fade-in-up stagger-1" : "opacity-0"}`}>
          <h2 className="text-center text-sm font-semibold text-uphold-neutral-600 mb-4 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            {mainDeadline.name}
          </h2>
          <CountdownRing days={mainDeadline.daysRemaining} isUrgent={mainDeadline.isUrgent} />
          <p className="text-center text-sm text-uphold-neutral-600 mt-4 leading-relaxed">
            {mainDeadline.explanation}
          </p>
        </div>
      )}

      {/* Other deadlines */}
      {outcome.deadlines.filter((d) => d !== mainDeadline).map((deadline) => (
        <div
          key={deadline.ruleId}
          className={`mb-4 p-4 rounded-xl border-2 animate-fade-in-up stagger-2 ${
            deadline.isUrgent ? "border-red-300 bg-red-50" : "border-uphold-neutral-200 bg-white"
          }`}
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-sm text-uphold-neutral-800">{deadline.name}</h3>
            {deadline.isUrgent && (
              <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">URGENT</span>
            )}
          </div>
          <p className="text-sm text-uphold-neutral-600 leading-relaxed">{deadline.explanation}</p>
        </div>
      ))}

      {/* Interactive action plan checklist */}
      <div className={`mb-6 ${revealed ? "animate-fade-in-up stagger-3" : "opacity-0"}`}>
        <InteractiveChecklist steps={steps} area={outcome.area} />
      </div>

      {/* Wellbeing check-in */}
      <div className={`bg-uphold-warm-50 rounded-2xl p-6 mb-6 ${revealed ? "animate-fade-in-up stagger-4" : "opacity-0"}`}>
        <div className="flex items-start gap-3">
          <Heart className="w-5 h-5 text-pink-400 mt-0.5" />
          <div>
            <h2 className="font-bold text-uphold-neutral-800 mb-2">How are you feeling?</h2>
            <p className="text-sm text-uphold-neutral-600 mb-3 leading-relaxed">
              Going through this is stressful. That&apos;s completely normal. You&apos;re not alone.
              Over 500,000 people are going through something similar right now.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:116123" className="flex items-center gap-2 text-uphold-green-500 hover:text-uphold-green-700">
                <Phone className="w-4 h-4" />
                Samaritans: 116 123 (free, 24/7)
              </a>
              <a href="tel:03001231100" className="flex items-center gap-2 text-uphold-green-500 hover:text-uphold-green-700">
                <Phone className="w-4 h-4" />
                ACAS Helpline: 0300 123 1100 (free)
              </a>
              <a href="https://www.mind.org.uk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-uphold-green-500 hover:text-uphold-green-700">
                <ExternalLink className="w-4 h-4" />
                Mind - mental health support
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-uphold-neutral-400 text-center p-4 border-t border-uphold-neutral-200">
        This assessment is based on general legal principles and does not constitute legal advice.
        Time limits are approximate. Verify with a legal professional.
      </div>

      {/* Start journey CTA */}
      <div className={`mb-6 ${revealed ? "animate-fade-in-up stagger-4" : "opacity-0"}`}>
        <Link
          href={`/journey/${outcome.area}`}
          className="block w-full bg-uphold-green-500 text-white text-center font-semibold text-lg px-6 py-4 rounded-xl hover:bg-uphold-green-700 transition-colors shadow-lg shadow-uphold-green-500/20"
        >
          Start your guided journey
          <span className="block text-sm font-normal opacity-90 mt-1">
            Step-by-step guidance from here to resolution
          </span>
        </Link>
      </div>

      {/* CTAs */}
      <div className="flex flex-col items-center gap-3 mt-6">
        <Link
          href="/triage"
          className="inline-flex items-center gap-2 text-uphold-green-500 hover:text-uphold-green-700 font-semibold text-sm"
        >
          Start a different assessment
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
