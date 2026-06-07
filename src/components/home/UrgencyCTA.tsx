import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

export function UrgencyCTA() {
  return (
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
          Every day counts. Check where you stand now. It takes 2 minutes and it&apos;s free.
        </p>
        <Link
          href="/triage"
          className="inline-flex items-center gap-2 bg-uphold-green-500 text-white font-semibold text-lg px-8 py-4 rounded-xl hover:bg-uphold-green-700 transition-colors"
        >
          Check your rights, it&apos;s free
          <ArrowRight className="w-5 h-5" />
        </Link>
        <p className="text-uphold-neutral-500 text-xs mt-4">
          Assessment is free. Full case tools from £79/month with a 7-day free trial.
        </p>
      </div>
    </section>
  );
}
