import { MessageCircle, Shield, ArrowRight } from "lucide-react";

const steps = [
  { num: "1", title: "Tell us what happened", desc: "Simple questions, one at a time. No jargon.", icon: MessageCircle },
  { num: "2", title: "See where you stand", desc: "Instant assessment with your key deadlines.", icon: Shield },
  { num: "3", title: "Get your plan", desc: "Step-by-step guidance tailored to your situation.", icon: ArrowRight },
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Three steps. Two minutes.
        </h2>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={step.num} className={`flex items-center gap-6 p-6 rounded-2xl bg-white border border-uphold-neutral-200 animate-fade-in-up stagger-${i + 1}`}>
              <div className="w-12 h-12 bg-uphold-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <step.icon className="w-6 h-6 text-uphold-green-500" />
              </div>
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
  );
}
