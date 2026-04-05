import Link from "next/link";
import { Briefcase, Home, FileText, Palette, ArrowRight, Shield } from "lucide-react";

const areas = [
  {
    icon: Briefcase,
    title: "Something happened at work",
    desc: "Dismissal, discrimination, harassment, unpaid wages, settlement agreements",
    href: "/triage/employment",
    colour: "border-blue-200 hover:border-blue-400 bg-blue-50/50 hover:bg-blue-50",
    iconColour: "text-blue-600 bg-blue-100",
  },
  {
    icon: Home,
    title: "Something happened at home",
    desc: "Disrepair, damp, mould, landlord not responding, housing conditions",
    href: "/triage/housing",
    colour: "border-amber-200 hover:border-amber-400 bg-amber-50/50 hover:bg-amber-50",
    iconColour: "text-amber-600 bg-amber-100",
  },
  {
    icon: FileText,
    title: "Something happened with a contract",
    desc: "Breach of agreement, non-delivery, disputes with a business or individual",
    href: "/triage/contract",
    colour: "border-purple-200 hover:border-purple-400 bg-purple-50/50 hover:bg-purple-50",
    iconColour: "text-purple-600 bg-purple-100",
  },
  {
    icon: Palette,
    title: "I'm a creator and haven't been paid",
    desc: "Unpaid fees, copyright theft, contract disputes, freelancer rights",
    href: "/triage/creative",
    colour: "border-pink-200 hover:border-pink-400 bg-pink-50/50 hover:bg-pink-50",
    iconColour: "text-pink-600 bg-pink-100",
  },
];

export default function TriagePage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-10">
        <div className="w-14 h-14 bg-uphold-green-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-uphold-green-100">
          <Shield className="w-7 h-7 text-uphold-green-500" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-uphold-neutral-800 mb-3">
          What happened?
        </h1>
        <p className="text-uphold-neutral-600">
          Choose the area that best fits your situation. Takes 2 minutes. Free.
        </p>
      </div>

      <div className="space-y-4">
        {areas.map((area) => (
          <Link
            key={area.href}
            href={area.href}
            className={`group flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 ${area.colour}`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${area.iconColour}`}>
              <area.icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-uphold-neutral-800">{area.title}</p>
              <p className="text-xs text-uphold-neutral-500 mt-0.5 leading-relaxed">{area.desc}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-uphold-neutral-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </Link>
        ))}
      </div>

      <p className="text-xs text-uphold-neutral-400 text-center mt-8">
        No sign-up. No data stored. Your answers stay on your device.
      </p>
    </div>
  );
}
