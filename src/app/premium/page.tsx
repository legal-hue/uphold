import type { Metadata } from "next";
import Link from "next/link";
import { Shield, CheckCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Upheld Premium | Full Case Toolkit for a One-Off £79",
  description:
    "Upheld Premium gives you the full case assessment, step-by-step guided journey, document generator, and evidence builder for employment, housing, contract, and creator disputes. A single one-off payment of £79. No subscription.",
  openGraph: {
    title: "Upheld Premium",
    description:
      "Full case assessment, guided journey, document generator, and evidence builder. One-off £79, no subscription.",
    url: "https://upheld.co.uk/premium",
  },
};

const comparisonRows = [
  { feature: "Know where you stand", free: true, premium: true },
  { feature: "Deadline calculator", free: true, premium: true },
  { feature: "Full Case Assessment", free: false, premium: true },
  { feature: "Step-by-step guided journey", free: false, premium: true },
  { feature: "Pre-populated letters and documents", free: false, premium: true },
  { feature: "Evidence builder", free: false, premium: true },
  { feature: "AI-enhanced document drafting", free: false, premium: true },
  { feature: "All four practice areas", free: false, premium: true },
];

const faqs = [
  {
    q: "Is this a subscription?",
    a: "No. It is a single one-off payment of £79 that unlocks the full toolkit for your case. There is no monthly fee and nothing to cancel.",
  },
  {
    q: "Does this replace a solicitor?",
    a: "No. Upheld helps you understand your rights and build your case so you go into any professional meeting better prepared. For personal legal advice, always consult a qualified solicitor or barrister.",
  },
  {
    q: "Is my information safe?",
    a: "Your case information stays on your device. We do not store your answers on our servers.",
  },
];

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-uphold-green-50 text-uphold-green-700 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-uphold-green-100">
            <Shield className="w-4 h-4" />
            Upheld Premium
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-uphold-neutral-800 mb-4">
            Everything you need to take action on your case
          </h1>
          <p className="text-uphold-neutral-600 leading-relaxed max-w-xl mx-auto">
            Most people who know their rights get better outcomes. Premium gives you the
            tools to assess your case, follow a clear plan, and produce the documents you
            need, in plain English, on your phone.
          </p>
        </div>

        {/* Price card */}
        <div className="bg-white rounded-2xl border-2 border-uphold-green-500 p-6 mb-10 max-w-md mx-auto">
          <div className="bg-uphold-green-50 text-uphold-green-700 text-sm font-semibold text-center py-2 px-4 rounded-lg mb-4 border border-uphold-green-100">
            One-off payment
          </div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-sm font-medium text-uphold-neutral-600">Upheld full case toolkit</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-uphold-neutral-800">£79</span>
              <span className="text-sm text-uphold-neutral-500">one-off</span>
            </div>
          </div>
          <p className="text-xs text-uphold-neutral-500 mb-5">
            A single payment of £79. No subscription, no recurring charges.
          </p>
          <Link
            href="/#situations"
            className="w-full flex items-center justify-center gap-2 bg-uphold-green-500 text-white font-semibold py-4 rounded-xl hover:bg-uphold-green-700 transition-colors text-lg"
          >
            Unlock full access
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-xs text-uphold-neutral-400 text-center mt-3">
            Begin with a free check of your situation, then unlock the full toolkit for £79.
          </p>
        </div>

        {/* Comparison table */}
        <div className="bg-white rounded-2xl border border-uphold-neutral-200 overflow-hidden mb-12">
          <div className="grid grid-cols-3 text-xs font-semibold text-center bg-uphold-neutral-50 border-b border-uphold-neutral-200">
            <div className="py-3 px-2 text-uphold-neutral-500 text-left pl-4">Feature</div>
            <div className="py-3 px-2 text-uphold-neutral-500">Free</div>
            <div className="py-3 px-2 text-uphold-green-600">Premium</div>
          </div>
          {comparisonRows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 items-center text-sm border-b border-uphold-neutral-100 last:border-0 ${
                i % 2 === 0 ? "" : "bg-uphold-neutral-50/50"
              }`}
            >
              <div className="py-3 px-4 text-uphold-neutral-700">{row.feature}</div>
              <div className="py-3 px-2 text-center">
                {row.free ? (
                  <CheckCircle className="w-4 h-4 text-uphold-green-500 mx-auto" />
                ) : (
                  <span className="text-uphold-neutral-300 text-lg leading-none">–</span>
                )}
              </div>
              <div className="py-3 px-2 text-center">
                {row.premium ? (
                  <CheckCircle className="w-4 h-4 text-uphold-green-500 mx-auto" />
                ) : (
                  <span className="text-uphold-neutral-300 text-lg leading-none">–</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-uphold-neutral-800 mb-4">Common questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white border border-uphold-neutral-200 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-uphold-neutral-800 mb-2">{faq.q}</h3>
                <p className="text-sm text-uphold-neutral-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="text-center">
          <Link
            href="/#situations"
            className="inline-flex items-center gap-2 bg-uphold-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-uphold-green-700 transition-colors text-lg"
          >
            Unlock full access
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-xs text-uphold-neutral-400 mt-4 max-w-md mx-auto leading-relaxed">
            Upheld provides legal information to help you understand your rights and navigate
            the process. It does not provide personal legal advice and using the app does not
            create a solicitor-client or barrister-client relationship.
          </p>
        </div>
      </div>
    </div>
  );
}
