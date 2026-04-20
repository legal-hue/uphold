import Link from "next/link";
import { Briefcase, Home, FileText, Palette, ArrowRight } from "lucide-react";

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
  {
    icon: Palette,
    title: "I'm a creator and haven't been paid",
    href: "/triage/creative",
    colour: "border-pink-200 hover:border-pink-400 bg-pink-50/50 hover:bg-pink-50",
    iconColour: "text-pink-600 bg-pink-100",
  },
];

export function AreaOptions() {
  return (
    <section id="situations" className="py-14 md:py-20">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-uphold-neutral-800 text-center mb-8">
          What happened?
        </h2>
        <div className="space-y-4">
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
  );
}
