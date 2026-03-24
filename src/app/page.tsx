import Link from "next/link";
import { Briefcase, Home, FileText, MessageCircle, Shield, Clock, ArrowRight, CheckCircle } from "lucide-react";

const areas = [
  {
    icon: Briefcase,
    title: "At Work",
    description: "Dismissed, discriminated against, owed wages, or treated unfairly by your employer.",
    href: "/triage/employment",
    examples: "Unfair dismissal, harassment, redundancy, settlement agreements",
  },
  {
    icon: Home,
    title: "At Home",
    description: "Damp, mould, broken heating, or a landlord who won't make repairs.",
    href: "/triage/housing",
    examples: "Housing disrepair, deposit disputes, eviction threats",
  },
  {
    icon: FileText,
    title: "With a Contract",
    description: "Someone broke an agreement, won't pay, or you need a contract reviewed.",
    href: "/triage/contract",
    examples: "Breach of contract, unpaid invoices, faulty services",
  },
];

const steps = [
  {
    icon: MessageCircle,
    title: "Tell us what happened",
    description: "Answer a few simple questions about your situation. No jargon, no sign-up needed.",
  },
  {
    icon: Shield,
    title: "Get your result",
    description: "We'll assess whether you have a claim and show you your key deadlines.",
  },
  {
    icon: Clock,
    title: "Navigate your case",
    description: "Follow a step-by-step plan to build your case, create documents, and know what to do next.",
  },
];

const stats = [
  { value: "515,000", label: "people waiting for tribunal hearings" },
  { value: "12.4m", label: "UK workers affected by rights violations yearly" },
  { value: "1 in 3", label: "tribunal cases are self-represented" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-uphold-green-50 border-b border-uphold-green-100">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-uphold-neutral-800 leading-tight mb-6">
            Know where you stand.
          </h1>
          <p className="text-lg md:text-xl text-uphold-neutral-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Something happened at work, at home, or with a contract?
            Find out if you have a claim, understand your deadlines,
            and get a step-by-step plan — for free.
          </p>
          <Link
            href="/triage"
            className="inline-flex items-center gap-2 bg-uphold-green-500 text-white font-semibold text-lg px-8 py-4 rounded-xl hover:bg-uphold-green-700 transition-colors shadow-lg shadow-uphold-green-500/20"
          >
            Check your rights now
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-sm text-uphold-neutral-400">Free. No sign-up required. Takes 2 minutes.</p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-uphold-neutral-800 text-white py-6">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-uphold-green-500">{stat.value}</div>
              <div className="text-sm text-uphold-neutral-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What happened to you */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            What happened to you?
          </h2>
          <p className="text-center text-uphold-neutral-600 mb-12 max-w-xl mx-auto">
            Select your situation and we&apos;ll help you understand your rights.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {areas.map((area) => (
              <Link
                key={area.title}
                href={area.href}
                className="group bg-white border-2 border-uphold-neutral-200 rounded-2xl p-6 hover:border-uphold-green-500 hover:shadow-lg transition-all duration-200"
              >
                <area.icon className="w-10 h-10 text-uphold-green-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-uphold-neutral-800 mb-2">{area.title}</h3>
                <p className="text-uphold-neutral-600 text-sm leading-relaxed mb-4">{area.description}</p>
                <p className="text-xs text-uphold-neutral-400">{area.examples}</p>
                <div className="mt-4 flex items-center gap-1 text-uphold-green-500 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Start here <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-uphold-warm-50 py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            How Uphold works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.title} className="text-center">
                <div className="w-14 h-14 bg-uphold-green-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-uphold-neutral-800 mb-2">{step.title}</h3>
                <p className="text-sm text-uphold-neutral-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            What you get
          </h2>
          <p className="text-center text-uphold-neutral-600 mb-12 max-w-xl mx-auto">
            Everything you need to understand and act on your rights.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              "Instant assessment of your situation",
              "Key deadlines calculated automatically",
              "Step-by-step case navigation",
              "Document generator (grievance letters, ET1, notices)",
              "Evidence checklist tailored to your case",
              "Timeline builder for your events",
              "Plain English — no legal jargon",
              "Works on your phone",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 py-2">
                <CheckCircle className="w-5 h-5 text-uphold-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-uphold-neutral-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-uphold-green-500 py-16 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Don&apos;t wait. Time limits apply.
          </h2>
          <p className="text-uphold-green-100 mb-8 max-w-lg mx-auto">
            Employment tribunal claims must be filed within 3 months.
            The sooner you check, the more options you have.
          </p>
          <Link
            href="/triage"
            className="inline-flex items-center gap-2 bg-white text-uphold-green-700 font-semibold text-lg px-8 py-4 rounded-xl hover:bg-uphold-green-50 transition-colors"
          >
            Check your rights now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
