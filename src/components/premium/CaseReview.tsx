"use client";

import { Shield, AlertTriangle, Lightbulb, Target } from "lucide-react";
import { SwotAnalysis } from "@/lib/swot";

interface CaseReviewProps {
  analysis: SwotAnalysis;
  area: string;
}

const sections = [
  {
    key: "strengths" as const,
    title: "Factors that typically support cases like this",
    icon: Shield,
    colour: "text-uphold-green-500",
    bg: "bg-uphold-green-50",
    border: "border-uphold-green-100",
    dot: "bg-uphold-green-500",
  },
  {
    key: "weaknesses" as const,
    title: "What needs attention",
    icon: AlertTriangle,
    colour: "text-uphold-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
    dot: "bg-uphold-amber-500",
  },
  {
    key: "opportunities" as const,
    title: "Options typically available in cases like this",
    icon: Lightbulb,
    colour: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
    dot: "bg-blue-500",
  },
  {
    key: "threats" as const,
    title: "Key risks to be aware of",
    icon: Target,
    colour: "text-uphold-red",
    bg: "bg-red-50",
    border: "border-red-100",
    dot: "bg-uphold-red",
  },
];

export function CaseReview({ analysis, area }: CaseReviewProps) {
  const areaLabel =
    area === "employment"
      ? "Employment"
      : area === "housing"
        ? "Housing"
        : "Contract";

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-uphold-green-50 text-uphold-green-700 text-sm font-medium px-4 py-2 rounded-full mb-4 border border-uphold-green-100">
          <Shield className="w-4 h-4" />
          Premium
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-uphold-neutral-800 mb-2">
          Legal Factors Review
        </h2>
        <p className="text-sm text-uphold-neutral-600">
          {areaLabel} — the legal factors courts typically consider in cases with these characteristics
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800 leading-relaxed">
        <strong>This is legal information, not legal advice.</strong> It explains what courts and tribunals generally consider in cases like this. Every case is different. For advice specific to your situation, consult a qualified solicitor or barrister.
      </div>

      {sections.map((section) => {
        const items = analysis[section.key];
        if (!items || items.length === 0) return null;

        return (
          <div
            key={section.key}
            className={`rounded-2xl border ${section.border} ${section.bg} p-5`}
          >
            <div className="flex items-center gap-2 mb-4">
              <section.icon className={`w-5 h-5 ${section.colour}`} />
              <h3 className="font-bold text-uphold-neutral-800">
                {section.title}
              </h3>
            </div>
            <div className="space-y-3">
              {items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${section.dot} mt-2 flex-shrink-0`}
                  />
                  <p className="text-sm text-uphold-neutral-700 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <p className="text-xs text-uphold-neutral-400 text-center leading-relaxed mt-6">
        For advice specific to your situation, consult a qualified solicitor or barrister.
      </p>
    </div>
  );
}
