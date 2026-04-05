import { Shield, Scale, Lock, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FAQAccordion } from "@/components/about/FAQAccordion";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">

      {/* Mission */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-uphold-green-50 text-uphold-green-700 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-uphold-green-100">
          <Shield className="w-4 h-4" />
          Built by a practising barrister
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-uphold-neutral-800 mb-5">
          The legal system shouldn&apos;t only work for people who can afford it
        </h1>
        <p className="text-lg text-uphold-neutral-600 leading-relaxed max-w-2xl mx-auto">
          Upheld was built because 77% of employers have legal representation at tribunal. Most employees and tenants do not.
          That is not a fair fight. We built Upheld to change that.
        </p>
      </div>

      {/* How it differs */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-uphold-neutral-800 mb-6">How Upheld is different</h2>
        <div className="space-y-4">
          {[
            {
              icon: Shield,
              title: "Built on actual law, not just general guidance",
              text: "Every assessment is based on current UK legislation and case law, not generic advice. The questions are designed by a barrister who works in these areas.",
            },
            {
              icon: Scale,
              title: "We tell you the difficult truth",
              text: "If your case is weak, we will tell you, and explain what would strengthen it. We do not give false hope or bury important information.",
            },
            {
              icon: Lock,
              title: "Your information never leaves your device",
              text: "No accounts. No data collection. Your answers are stored locally on your phone or browser. We cannot see them and we do not sell them.",
            },
            {
              icon: CheckCircle,
              title: "Focused on outcomes, not just information",
              text: "Knowing your rights matters. But so does the letter you send, the evidence you collect, and the deadline you must not miss. Upheld covers all of it.",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4 bg-white border border-uphold-neutral-200 rounded-2xl p-5">
              <div className="w-10 h-10 bg-uphold-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-uphold-green-500" />
              </div>
              <div>
                <h3 className="font-bold text-uphold-neutral-800 mb-1">{item.title}</h3>
                <p className="text-sm text-uphold-neutral-600 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Important information */}
      <div className="bg-uphold-warm-50 rounded-2xl p-6 md:p-8 mb-14">
        <h2 className="text-lg font-bold text-uphold-neutral-800 mb-4">Important information</h2>
        <div className="space-y-3 text-sm text-uphold-neutral-600 leading-relaxed">
          <p>
            <strong>Upheld provides legal information, not legal advice.</strong> We help you
            understand your rights and navigate the process, but we are not a law firm and
            cannot represent you.
          </p>
          <p>
            For advice specific to your situation, you should consult a qualified solicitor
            or barrister. Many offer free initial consultations.
          </p>
          <p>
            The assessments on this platform are based on general legal principles and the
            information you provide. They are not a guarantee of any outcome.
          </p>
          <p>
            Deadline calculations are approximate. Always verify time limits with a legal
            professional, as individual circumstances may affect them.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-uphold-neutral-800 mb-2">Questions about Upheld</h2>
        <FAQAccordion />
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/triage"
          className="inline-flex items-center gap-2 bg-uphold-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-uphold-green-700 transition-colors"
        >
          Check your rights, it&apos;s free
          <ArrowRight className="w-4 h-4" />
        </Link>
        <p className="text-xs text-uphold-neutral-400 mt-3">No sign-up. No data stored. Takes 2 minutes.</p>
      </div>
    </div>
  );
}
