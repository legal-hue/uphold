import Link from "next/link";
import { Home, ArrowLeft, Bell } from "lucide-react";

export default function HousingTriagePage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-12 md:py-20 text-center">
      <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-amber-100">
        <Home className="w-8 h-8 text-amber-600" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-uphold-neutral-800 mb-4">
        Housing disrepair assessment
      </h1>
      <p className="text-uphold-neutral-600 mb-3 leading-relaxed">
        We&apos;re building a guided assessment for housing disrepair, deposit disputes, and tenant rights.
      </p>
      <p className="text-sm text-uphold-neutral-400 mb-8">
        This will be available soon. In the meantime, here are some immediate steps you can take.
      </p>

      <div className="bg-white border border-uphold-neutral-200 rounded-2xl p-6 text-left mb-8 space-y-4">
        <h2 className="font-bold text-uphold-neutral-800">What you can do now</h2>
        <ul className="space-y-3 text-sm text-uphold-neutral-600">
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-uphold-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">1</span>
            <span><strong>Report the problem to your landlord in writing</strong> — email or letter. Keep a copy.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-uphold-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">2</span>
            <span><strong>Take photos and videos</strong> of the disrepair with dates.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-uphold-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">3</span>
            <span><strong>Contact your council&apos;s Environmental Health team</strong> if your landlord doesn&apos;t respond.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-uphold-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">4</span>
            <span><strong>See your GP</strong> if the conditions are affecting your health — this creates evidence.</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Link
          href="/triage/employment"
          className="inline-flex items-center gap-2 bg-uphold-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-uphold-green-700 transition-colors"
        >
          Try the employment assessment instead
        </Link>
        <Link href="/" className="inline-flex items-center gap-2 text-uphold-neutral-600 hover:text-uphold-neutral-800 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
