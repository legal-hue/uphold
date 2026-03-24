import Link from "next/link";
import { Briefcase, Home, FileText, ArrowRight } from "lucide-react";

const areas = [
  {
    icon: Briefcase,
    title: "Something happened at work",
    description: "You were dismissed, treated unfairly, discriminated against, or offered a settlement.",
    href: "/triage/employment",
    colour: "bg-blue-50 border-blue-200 hover:border-blue-400",
    iconColour: "text-blue-600",
  },
  {
    icon: Home,
    title: "Something happened at home",
    description: "Your landlord won't fix damp, mould, heating, or other problems in your home.",
    href: "/triage/housing",
    colour: "bg-amber-50 border-amber-200 hover:border-amber-400",
    iconColour: "text-amber-600",
  },
  {
    icon: FileText,
    title: "Something happened with a contract",
    description: "Someone broke an agreement, won't pay what they owe, or you need a contract reviewed.",
    href: "/triage/contract",
    colour: "bg-purple-50 border-purple-200 hover:border-purple-400",
    iconColour: "text-purple-600",
  },
];

export default function TriagePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-uphold-neutral-800 mb-4">
          What happened to you?
        </h1>
        <p className="text-uphold-neutral-600 text-lg leading-relaxed">
          We&apos;re sorry you&apos;re going through this. Let&apos;s figure out where you stand.
        </p>
      </div>

      <div className="space-y-4">
        {areas.map((area) => (
          <Link
            key={area.title}
            href={area.href}
            className={`group flex items-start gap-5 p-6 rounded-2xl border-2 transition-all duration-200 ${area.colour}`}
          >
            <div className={`mt-1 ${area.iconColour}`}>
              <area.icon className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-uphold-neutral-800 mb-1">{area.title}</h2>
              <p className="text-sm text-uphold-neutral-600 leading-relaxed">{area.description}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-uphold-neutral-400 mt-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>

      <p className="text-center text-xs text-uphold-neutral-400 mt-8">
        This assessment is free and takes about 2 minutes.
        Your answers are stored on your device only.
      </p>
    </div>
  );
}
