import { Shield, Heart, Scale, Lock } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-uphold-neutral-800 mb-6 text-center">
        About Upheld
      </h1>

      <p className="text-lg text-uphold-neutral-600 text-center mb-12 leading-relaxed max-w-2xl mx-auto">
        We believe everyone should be able to understand their legal rights -
        not just those who can afford a solicitor.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {[
          {
            icon: Shield,
            title: "Your rights, explained simply",
            text: "No legal jargon. No confusing forms. Just clear, step-by-step guidance in plain English.",
          },
          {
            icon: Heart,
            title: "Built with empathy",
            text: "We know you might be going through the worst time. Every screen is designed to make you feel supported.",
          },
          {
            icon: Scale,
            title: "Levelling the playing field",
            text: "77% of employers have lawyers. Most employees don't. We help close that gap.",
          },
          {
            icon: Lock,
            title: "Your data stays yours",
            text: "Your answers are stored on your device only. We don't sell data or share it with anyone.",
          },
        ].map((item) => (
          <div key={item.title} className="bg-white border border-uphold-neutral-200 rounded-2xl p-6">
            <item.icon className="w-8 h-8 text-uphold-green-500 mb-3" />
            <h3 className="font-bold text-uphold-neutral-800 mb-2">{item.title}</h3>
            <p className="text-sm text-uphold-neutral-600 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="bg-uphold-warm-50 rounded-2xl p-6 md:p-8 mb-12">
        <h2 className="text-xl font-bold text-uphold-neutral-800 mb-4">Important information</h2>
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

      <div className="text-center">
        <Link
          href="/triage"
          className="inline-flex items-center gap-2 bg-uphold-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-uphold-green-700 transition-colors"
        >
          Check your rights now
        </Link>
      </div>
    </div>
  );
}
