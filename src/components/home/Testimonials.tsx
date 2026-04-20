import { Users } from "lucide-react";

const testimonials = [
  { quote: "I didn't think I had a case. Upheld showed me I did, and what to do next.", who: "Sarah, unfair dismissal" },
  { quote: "My landlord ignored my complaints for months. Upheld helped me write a letter that finally got things moving.", who: "James, housing disrepair" },
  { quote: "I was terrified of the tribunal process. The step-by-step guide made it feel manageable.", who: "Priya, discrimination claim" },
];

export function Testimonials() {
  return (
    <section className="bg-uphold-green-50 py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Users className="w-5 h-5 text-uphold-green-500" />
          <span className="text-sm font-medium text-uphold-neutral-600">What people like you have done</span>
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
  );
}
