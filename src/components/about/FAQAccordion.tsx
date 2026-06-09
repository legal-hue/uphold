"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is Upheld a law firm?",
    a: "No. Upheld is a legal information tool, not a law firm. We help you understand your rights, organise your case, and navigate the process, but we cannot give you personal legal advice or represent you. For advice specific to your situation, consult a qualified solicitor or barrister.",
  },
  {
    q: "Who built Upheld?",
    a: "Upheld was built with legal expertise in employment, housing, and civil law. Every assessment and piece of guidance is based on current UK law.",
  },
  {
    q: "Is my information private?",
    a: "Yes. Your answers and case information are stored on your device only, we do not collect, store, or share them. There are no accounts and no sign-up required.",
  },
  {
    q: "Can I use Upheld if I am still employed?",
    a: "Yes. Upheld covers situations where you are still employed as well as those where you have already left. Many people use it while still in their job, particularly when raising a grievance.",
  },
  {
    q: "Are the deadline calculations accurate?",
    a: "We calculate deadlines based on the standard rules for each type of claim. Individual circumstances, such as ACAS early conciliation, can extend them. Always verify your specific deadline with a legal professional.",
  },
  {
    q: "How much does Upheld Premium cost?",
    a: "Two options: a one-off £79 payment that unlocks the full toolkit for a single case, or ongoing cover at £29.99 per month with a 7-day free trial, which you can cancel anytime.",
  },
  {
    q: "What if my situation is complicated or unusual?",
    a: "Upheld works best for the most common legal scenarios. If your situation does not fit neatly into the questions, we will tell you and point you towards specialist help such as ACAS, Citizens Advice, or a specialist solicitor.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-uphold-neutral-200">
      {faqs.map((faq, i) => (
        <div key={faq.q}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between text-left py-5 gap-4"
          >
            <span className="font-semibold text-uphold-neutral-800">{faq.q}</span>
            <ChevronDown
              className={`w-5 h-5 text-uphold-neutral-400 flex-shrink-0 transition-transform duration-200 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === i && (
            <p className="text-sm text-uphold-neutral-600 pb-5 leading-relaxed animate-fade-in">
              {faq.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
