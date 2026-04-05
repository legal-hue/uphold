"use client";

import { useState } from "react";
import { Shield, Phone, FileText, BookOpen, Mic, CheckCircle, ArrowRight, Send } from "lucide-react";

const services = [
  {
    icon: Phone,
    title: "Strategy call",
    duration: "30 minutes",
    price: "£75",
    description: "Talk through your situation with a qualified barrister. Get a clear picture of where you stand, what your options are, and what to do next.",
    includes: [
      "Review of your triage results before the call",
      "Plain-English assessment of your position",
      "Recommended next steps",
      "Follow-up summary email",
    ],
    value: "strategy_call",
    popular: false,
  },
  {
    icon: FileText,
    title: "Document review",
    duration: "48-hour turnaround",
    price: "£150",
    description: "Send one document — a grievance letter, letter before action, or witness statement — and receive detailed written feedback from a barrister.",
    includes: [
      "Line-by-line review of your document",
      "Written feedback on legal accuracy and tone",
      "Suggested redrafts for weak sections",
      "Return within 48 hours",
    ],
    value: "document_review",
    popular: true,
  },
  {
    icon: BookOpen,
    title: "Case review",
    duration: "Written report",
    price: "£250",
    description: "A thorough review of your case. We assess your position, identify strengths and risks, and give you a written action plan with recommended steps.",
    includes: [
      "Review of all documents and evidence provided",
      "Written case assessment (strengths, risks, deadlines)",
      "Recommended strategy and sequencing",
      "Signposting to further support if needed",
    ],
    value: "case_review",
    popular: false,
  },
  {
    icon: Mic,
    title: "Hearing preparation",
    duration: "60 minutes",
    price: "£350",
    description: "Prepare for your employment tribunal or court hearing. Walk through your evidence, witness questions, and what to expect on the day.",
    includes: [
      "Review of your bundle and witness statement",
      "Practice cross-examination questions",
      "Guidance on tribunal procedure and etiquette",
      "Written preparation notes to keep",
    ],
    value: "hearing_prep",
    popular: false,
  },
];

const areas = [
  { value: "employment", label: "Employment (unfair dismissal, discrimination, wages)" },
  { value: "housing", label: "Housing disrepair" },
  { value: "contract", label: "Contract dispute" },
  { value: "creative", label: "Creator / commercial dispute" },
  { value: "other", label: "Other" },
];

export default function ExpertPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", area: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !form.name || !form.email || !form.area) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/expert-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, service: selected }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again or email legal@karensafo.com directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-uphold-green-50 text-uphold-green-700 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-uphold-green-100">
            <Shield className="w-4 h-4" />
            Expert support
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-uphold-neutral-800 mb-4">
            Get barrister-level guidance
          </h1>
          <p className="text-uphold-neutral-600 leading-relaxed max-w-xl mx-auto">
            Upheld is built by a qualified barrister. When you need more than a guided journey, you can book direct support, a document review, or hearing preparation.
          </p>
        </div>

        {/* Trust signals */}
        <div className="grid grid-cols-3 gap-4 mb-12 text-center">
          {[
            { label: "Qualified barrister", sub: "Called to the Bar" },
            { label: "Employment, housing", sub: "and contract law" },
            { label: "Plain English", sub: "No jargon" },
          ].map((t) => (
            <div key={t.label} className="bg-white border border-uphold-neutral-200 rounded-xl p-4">
              <div className="text-sm font-semibold text-uphold-neutral-800">{t.label}</div>
              <div className="text-xs text-uphold-neutral-500 mt-1">{t.sub}</div>
            </div>
          ))}
        </div>

        {/* Service cards */}
        <div className="space-y-4 mb-12">
          {services.map((s) => (
            <button
              key={s.value}
              onClick={() => setSelected(s.value)}
              className={`w-full text-left rounded-2xl border-2 p-5 transition-all duration-200 relative ${
                selected === s.value
                  ? "border-uphold-green-500 bg-uphold-green-50/50 shadow-sm"
                  : "border-uphold-neutral-200 bg-white hover:border-uphold-neutral-400"
              }`}
            >
              {s.popular && (
                <span className="absolute top-4 right-4 text-xs font-semibold bg-uphold-green-500 text-white px-2.5 py-1 rounded-full">
                  Most popular
                </span>
              )}
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  selected === s.value ? "bg-uphold-green-500" : "bg-uphold-neutral-100"
                }`}>
                  <s.icon className={`w-5 h-5 ${selected === s.value ? "text-white" : "text-uphold-neutral-600"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3 className="font-bold text-uphold-neutral-800">{s.title}</h3>
                    <span className="text-sm text-uphold-neutral-500">{s.duration}</span>
                    <span className="font-semibold text-uphold-green-600 ml-auto">{s.price}</span>
                  </div>
                  <p className="text-sm text-uphold-neutral-600 mt-1 leading-relaxed">{s.description}</p>
                  {selected === s.value && (
                    <ul className="mt-3 space-y-1.5">
                      {s.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-uphold-neutral-700">
                          <CheckCircle className="w-4 h-4 text-uphold-green-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Enquiry form */}
        {sent ? (
          <div className="bg-uphold-green-50 border border-uphold-green-100 rounded-2xl p-8 text-center">
            <div className="w-12 h-12 bg-uphold-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-uphold-neutral-800 mb-2">Enquiry received</h3>
            <p className="text-sm text-uphold-neutral-600">
              We will be in touch within one working day to confirm your booking and payment details.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-uphold-neutral-200 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-uphold-neutral-800 mb-1">
              {selected
                ? `Book: ${services.find((s) => s.value === selected)?.title}`
                : "Select a service above to continue"}
            </h2>
            {selected && (
              <p className="text-sm text-uphold-neutral-500 mb-5">
                Fill in your details and we will confirm your booking within one working day.
              </p>
            )}

            <form onSubmit={handleSubmit} className={`space-y-4 ${!selected ? "opacity-40 pointer-events-none" : ""}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-uphold-neutral-700 mb-1">Your name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="First and last name"
                    className="w-full border-2 border-uphold-neutral-200 rounded-xl px-4 py-3 text-sm focus:border-uphold-green-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-uphold-neutral-700 mb-1">Email address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full border-2 border-uphold-neutral-200 rounded-xl px-4 py-3 text-sm focus:border-uphold-green-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-uphold-neutral-700 mb-1">Practice area</label>
                <select
                  required
                  value={form.area}
                  onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))}
                  className="w-full border-2 border-uphold-neutral-200 rounded-xl px-4 py-3 text-sm focus:border-uphold-green-500 focus:outline-none transition-colors bg-white"
                >
                  <option value="">Select area</option>
                  {areas.map((a) => (
                    <option key={a.value} value={a.value}>{a.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-uphold-neutral-700 mb-1">
                  Brief description of your situation
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="A few sentences about what happened and what you need help with..."
                  rows={4}
                  className="w-full border-2 border-uphold-neutral-200 rounded-xl px-4 py-3 text-sm focus:border-uphold-green-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={submitting || !selected}
                className="w-full flex items-center justify-center gap-2 bg-uphold-green-500 text-white font-semibold py-3.5 rounded-xl hover:bg-uphold-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending…" : "Send enquiry"}
                {!submitting && <Send className="w-4 h-4" />}
              </button>

              <p className="text-xs text-uphold-neutral-400 text-center">
                We will reply within one working day with confirmation and payment details. No upfront payment required.
              </p>
            </form>
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-uphold-neutral-400 text-center mt-8 leading-relaxed">
          Expert guidance is provided by a qualified barrister on a self-employed basis. It is not a regulated legal services engagement and does not constitute formal legal advice within the meaning of the Legal Services Act 2007. For regulated legal advice, consult an SRA-authorised solicitor or a barrister with a full practising certificate.
        </p>

      </div>
    </div>
  );
}
