import { Shield } from "lucide-react";

export function FounderSection() {
  return (
    <section className="py-16 md:py-20 bg-uphold-neutral-800 text-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="w-5 h-5 text-uphold-green-500" />
          <span className="text-sm font-semibold text-uphold-green-500 uppercase tracking-wide">Who built this</span>
        </div>

        <blockquote className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-8">
          &ldquo;I built Upheld because I kept seeing the same thing: people with valid claims who gave up before they started, not because they had a weak case, but because they didn&apos;t know what they had.&rdquo;
        </blockquote>

        <div className="flex items-start gap-4 pt-6 border-t border-uphold-neutral-600">
          <div className="w-12 h-12 bg-uphold-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
            K
          </div>
          <div>
            <p className="font-semibold text-white">Qualified Lawyer</p>
            <p className="text-sm text-uphold-neutral-400 mt-0.5">Employment &amp; Civil Law · Human Rights</p>
            <p className="text-sm text-uphold-neutral-400 mt-2 leading-relaxed max-w-lg">
              Upheld is built on real legal knowledge, not generic advice. Every question, every deadline, every document template is grounded in current UK law, because you deserve tools that actually work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
