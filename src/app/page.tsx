"use client";

import Link from "next/link";
import { Briefcase, Home, FileText, ArrowRight, Shield, Users, Clock, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

const areas = [
  {
    icon: Briefcase,
    title: "Something happened at work",
    href: "/triage/employment",
    colour: "border-blue-200 hover:border-blue-400 bg-blue-50/50 hover:bg-blue-50",
    iconColour: "text-blue-600 bg-blue-100",
  },
  {
    icon: Home,
    title: "Something happened at home",
    href: "/triage/housing",
    colour: "border-amber-200 hover:border-amber-400 bg-amber-50/50 hover:bg-amber-50",
    iconColour: "text-amber-600 bg-amber-100",
  },
  {
    icon: FileText,
    title: "Something happened with a contract",
    href: "/triage/contract",
    colour: "border-purple-200 hover:border-purple-400 bg-purple-50/50 hover:bg-purple-50",
    iconColour: "text-purple-600 bg-purple-100",
  },
];

const testimonials = [
  { quote: "I didn't think I had a case. Uphold showed me I did — and what to do next.", who: "Sarah, unfair dismissal" },
  { quote: "My landlord ignored my complaints for months. Uphold helped me write a letter that finally got things moving.", who: "James, housing disrepair" },
  { quote: "I was terrified of the tribunal process. The step-by-step guide made it feel manageable.", who: "Priya, discrimination claim" },
];

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [displayed, setDisplayed] = useState("0");
  useEffect(() => {
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    const duration = 1500;
    const steps = 30;
    const increment = num / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setDisplayed(target);
        clearInterval(timer);
      } else {
        if (target.includes("m")) setDisplayed(current.toFixed(1) + "m");
        else if (target.includes(",")) setDisplayed(Math.round(current).toLocaleString());
        else setDisplayed(Math.round(current).toString());
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{displayed}{suffix}</span>;
}

export default function HomePage() {
  return (
    <div>
      {/* Hero — stripped back, immediate */}
      <section className="blob-bg min-h-[70vh] flex items-center">
        <div className="max-w-3xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-uphold-green-50 text-uphold-green-700 text-sm font-medium px-4 py-2 rounded-full mb-8 border border-uphold-green-100">
              <Shield className="w-4 h-4" />
              Free. No sign-up. 2 minutes.
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-uphold-neutral-800 leading-tight mb-6 animate-fade-in-up stagger-1">
            Something happened?<br />
            <span className="text-uphold-green-500">Let&apos;s figure it out.</span>
          </h1>

          <p className="text-lg md:text-xl text-uphold-neutral-600 max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in-up stagger-2">
            Find out if you have a claim, see your deadlines, and get a clear plan — all in 2 minutes.
          </p>

          <div className="space-y-4 max-w-md mx-auto animate-fade-in-up stagger-3">
            {areas.map((area) => (
              <Link
                key={area.title}
                href={area.href}
                className={`group flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 ${area.colour}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${area.iconColour}`}>
                  <area.icon className="w-6 h-6" />
                </div>
                <span className="flex-1 text-left font-semibold text-uphold-neutral-800">{area.title}</span>
                <ArrowRight className="w-5 h-5 text-uphold-neutral-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="bg-uphold-neutral-800 text-white py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-uphold-green-500">
              <AnimatedCounter target="515,000" />
            </div>
            <div className="text-xs md:text-sm text-uphold-neutral-400 mt-1">waiting for tribunal</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-uphold-green-500">
              <AnimatedCounter target="12.4m" />
            </div>
            <div className="text-xs md:text-sm text-uphold-neutral-400 mt-1">workers affected yearly</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-uphold-green-500">
              1 in 3
            </div>
            <div className="text-xs md:text-sm text-uphold-neutral-400 mt-1">go to tribunal alone</div>
          </div>
        </div>
      </section>

      {/* How it works — visual, minimal */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Three steps. Two minutes.
          </h2>

          <div className="space-y-6">
            {[
              { num: "1", title: "Tell us what happened", desc: "Simple questions, one at a time. No jargon.", icon: "💬" },
              { num: "2", title: "See where you stand", desc: "Instant assessment with your key deadlines.", icon: "🛡️" },
              { num: "3", title: "Get your plan", desc: "Step-by-step guidance tailored to your situation.", icon: "🗺️" },
            ].map((step, i) => (
              <div key={step.num} className={`flex items-center gap-6 p-6 rounded-2xl bg-white border border-uphold-neutral-200 animate-fade-in-up stagger-${i + 1}`}>
                <div className="text-4xl">{step.icon}</div>
                <div>
                  <div className="text-sm text-uphold-green-500 font-semibold mb-1">Step {step.num}</div>
                  <h3 className="text-lg font-bold text-uphold-neutral-800">{step.title}</h3>
                  <p className="text-sm text-uphold-neutral-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-uphold-green-50 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Users className="w-5 h-5 text-uphold-green-500" />
            <span className="text-sm font-medium text-uphold-neutral-600">People we&apos;ve helped</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.who} className="bg-white rounded-2xl p-6 border border-uphold-green-100">
                <p className="text-uphold-neutral-700 text-sm leading-relaxed mb-4 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-xs text-uphold-neutral-400 font-medium">{t.who}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get — compact */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Everything you need</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              "Instant claim assessment",
              "Deadline calculator",
              "Step-by-step guidance",
              "Document generator",
              "Evidence checklist",
              "Timeline builder",
              "Plain English only",
              "100% free to start",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 py-2">
                <CheckCircle className="w-4 h-4 text-uphold-green-500 flex-shrink-0" />
                <span className="text-sm text-uphold-neutral-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency CTA */}
      <section className="bg-uphold-neutral-800 py-12 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-uphold-red" />
            <span className="text-uphold-red font-semibold text-sm">Time limits apply</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Employment claims must be filed within 3 months
          </h2>
          <p className="text-uphold-neutral-400 mb-8 max-w-lg mx-auto">
            Every day counts. Check where you stand now — it takes 2 minutes and it&apos;s free.
          </p>
          <Link
            href="/triage"
            className="inline-flex items-center gap-2 bg-uphold-green-500 text-white font-semibold text-lg px-8 py-4 rounded-xl hover:bg-uphold-green-700 transition-colors animate-pulse-soft"
          >
            Check your rights now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
