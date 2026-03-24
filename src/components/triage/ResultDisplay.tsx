"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, AlertTriangle, XCircle, Clock, Phone, ArrowRight, ExternalLink } from "lucide-react";
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
  },
  maybe: {
    icon: AlertTriangle,
    title: "You may have a claim",
    colour: "text-uphold-amber",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  difficult: {
    icon: XCircle,
    title: "This may be difficult to pursue",
    colour: "text-uphold-red",
    bg: "bg-red-50",
    border: "border-red-200",
  },
};

const nextSteps = {
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

export function ResultDisplay() {
  const [outcome, setOutcome] = useState<TriageOutcomeData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("uphold_latest_triage");
    if (stored) {
      setOutcome(JSON.parse(stored));
    }
  }, []);

  if (!outcome) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <p className="text-uphold-neutral-600">Loading your result...</p>
      </div>
    );
  }

  const config = resultConfig[outcome.result];
  const Icon = config.icon;
  const steps = nextSteps[outcome.area as keyof typeof nextSteps] || nextSteps.employment;

  return (
    <div className="max-w-xl mx-auto px-4 py-8 md:py-12">
      {/* Result card */}
      <div className={`${config.bg} ${config.border} border-2 rounded-2xl p-6 md:p-8 text-center mb-8`}>
        <Icon className={`w-16 h-16 ${config.colour} mx-auto mb-4`} />
        <h1 className="text-2xl md:text-3xl font-bold text-uphold-neutral-800 mb-3">
          {config.title}
        </h1>
        <p className="text-uphold-neutral-600 leading-relaxed">
          {outcome.message}
        </p>
      </div>

      {/* Deadlines */}
      {outcome.deadlines.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-uphold-neutral-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-uphold-green-500" />
            Your key deadlines
          </h2>
          <div className="space-y-3">
            {outcome.deadlines.map((deadline) => (
              <div
                key={deadline.ruleId}
                className={`p-4 rounded-xl border-2 ${
                  deadline.isUrgent
                    ? "border-red-300 bg-red-50"
                    : "border-uphold-neutral-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-uphold-neutral-800">{deadline.name}</h3>
                  {deadline.isUrgent && (
                    <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                      URGENT
                    </span>
                  )}
                </div>
                <p className="text-sm text-uphold-neutral-600 leading-relaxed">
                  {deadline.explanation}
                </p>
                {deadline.daysRemaining > 0 && (
                  <div className="mt-2 text-sm font-semibold text-uphold-neutral-800">
                    {deadline.daysRemaining} days remaining
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next steps */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-uphold-neutral-800 mb-4">
          What to do next
        </h2>
        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-uphold-neutral-200">
              <div className="w-6 h-6 bg-uphold-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                {i + 1}
              </div>
              <div className="flex-1">
                {step.external && step.link ? (
                  <a
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-uphold-green-500 hover:text-uphold-green-700 font-medium flex items-center gap-1"
                  >
                    {step.text}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-uphold-neutral-700">{step.text}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support */}
      <div className="bg-uphold-warm-50 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-uphold-neutral-800 mb-3">
          Need to talk to someone?
        </h2>
        <p className="text-sm text-uphold-neutral-600 mb-4">
          Going through a legal dispute can be stressful. You don&apos;t have to face this alone.
        </p>
        <div className="space-y-2 text-sm">
          <a href="tel:03001231100" className="flex items-center gap-2 text-uphold-green-500 hover:text-uphold-green-700">
            <Phone className="w-4 h-4" />
            ACAS Helpline: 0300 123 1100 (free)
          </a>
          <a href="tel:116123" className="flex items-center gap-2 text-uphold-green-500 hover:text-uphold-green-700">
            <Phone className="w-4 h-4" />
            Samaritans: 116 123 (free, 24/7)
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-uphold-neutral-400 text-center p-4 border-t border-uphold-neutral-200">
        This assessment is based on the information you provided and general legal principles.
        It is not a guarantee of any outcome and does not constitute legal advice.
        Time limits are approximate — always verify deadlines with a legal professional.
      </div>

      {/* CTA */}
      <div className="text-center mt-6">
        <Link
          href="/triage"
          className="inline-flex items-center gap-2 text-uphold-green-500 hover:text-uphold-green-700 font-semibold"
        >
          Start a different assessment
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
