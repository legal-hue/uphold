import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { DownloadBadges } from "@/components/layout/DownloadBadges";

export function HeroSection() {
  return (
    <section className="blob-bg min-h-[80vh] flex items-center">
      <div className="max-w-4xl mx-auto px-4 py-20 md:py-28 text-center">
        <h1 className="text-5xl md:text-8xl font-bold text-uphold-neutral-800 leading-[1.05] mb-8 animate-fade-in-up tracking-tight">
          Know where you stand.
        </h1>

        <p className="text-lg md:text-xl text-uphold-neutral-600 max-w-xl mx-auto mb-12 leading-relaxed animate-fade-in-up stagger-1">
          Something happened at work, at home, or with a contract? Find out if you have a claim, understand your deadlines, and get a step-by-step plan. For free.
        </p>

        <div className="animate-fade-in-up stagger-2">
          <Link
            href="/triage"
            className="inline-flex items-center gap-3 bg-uphold-green-500 text-white font-semibold text-lg px-10 py-5 rounded-2xl hover:bg-uphold-green-700 transition-all duration-300 hover:scale-105"
          >
            Check your rights, it&apos;s free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <p className="text-sm text-uphold-neutral-500 mt-6 mb-4 animate-fade-in-up stagger-3">
          Free. No sign-up required. Takes 2 minutes.
        </p>

        {/* Trust bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 animate-fade-in-up stagger-3 mb-6">
          <span className="flex items-center gap-1.5 text-xs text-uphold-neutral-500">
            <CheckCircle className="w-3.5 h-3.5 text-uphold-green-500" />
            Built on legal expertise
          </span>
          <span className="flex items-center gap-1.5 text-xs text-uphold-neutral-500">
            <CheckCircle className="w-3.5 h-3.5 text-uphold-green-500" />
            Based on current UK law
          </span>
          <span className="flex items-center gap-1.5 text-xs text-uphold-neutral-500">
            <CheckCircle className="w-3.5 h-3.5 text-uphold-green-500" />
            Your data stays on your device
          </span>
        </div>

        <div className="mt-6 animate-fade-in-up stagger-4">
          <DownloadBadges />
        </div>
      </div>
    </section>
  );
}
