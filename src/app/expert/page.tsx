"use client";

import { useState } from "react";
import { Shield, Phone, FileText, BookOpen, Mic, CheckCircle, ArrowRight, Send, AlertTriangle } from "lucide-react";

// Update this when the company is incorporated
const COMPANY_NAME = "[Company Name]";

const services = [
  {
    icon: Phone,
    title: "Strategy call",
    duration: "30 minutes",
    price: "£75",
    description: "Talk through your situation with an experienced legal adviser. Get a clear picture of where you stand, what your options are, and what to do next.",
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
    description: "Send one document — a grievance letter, letter before action, or witness statement — and receive detailed written feedback.",
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
    description: "A thorough review of your case. We assess your position, identify strengths and risks, and give you a written action plan with recommended next steps.",
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

const CLIENT_NOTICE = `Client Information Notice — ${COMPANY_NAME}

1. Status. ${COMPANY_NAME} is not a regulated law firm. It is not authorised by the Bar Standards Board as a legal practice or by the Solicitors Regulation Authority. Legal services are provided by a qualified lawyer who does not hold a current practising certificate issued by the Bar Standards Board and is therefore an unregistered barrister within the meaning of the Legal Services Act 2007. In providing services to you, they are not acting as a practising barrister.

2. Regulatory protections. Because ${COMPANY_NAME} is not a regulated legal services provider, you are not subject to the same regulatory safeguards as you would be if instructing a regulated law firm. In particular, the Legal Ombudsman, which can adjudicate on complaints about poor service by practising barristers and solicitors, cannot consider any complaint against ${COMPANY_NAME} or the lawyer providing services to you. If you have a complaint that cannot be resolved internally, you may contact the Bar Standards Board, which can investigate whether the lawyer has failed to comply with the conduct rules that apply to unregistered barristers.

3. Professional indemnity insurance. Please confirm with us before instructing whether professional indemnity insurance is held in respect of the services to be provided.

4. Legal advice privilege. There is a substantial risk that you will not be able to rely on legal advice privilege in respect of any legal advice provided by ${COMPANY_NAME}. This means that advice given may not be protected from disclosure in legal proceedings in the way that advice from a regulated law firm would be.

5. Scope of services. ${COMPANY_NAME} can provide legal advice and assist with document preparation. It cannot exercise rights of audience in court on your behalf.

By submitting an enquiry and proceeding to instruct ${COMPANY_NAME}, you confirm that you have read and understood this notice.`;

export default function ExpertPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", area: "", message: "" });
  const [noticeAccepted, setNoticeAccepted] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !form.name || !form.email || !form.area || !noticeAccepted) return;
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
            Expert legal support
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-uphold-neutral-800 mb-4">
            Get expert legal guidance
          </h1>
          <p className="text-uphold-neutral-600 leading-relaxed max-w-xl mx-auto">
            When you need more than a guided journey, {COMPANY_NAME} offers direct legal support — document review, strategy calls, and hearing preparation.
          </p>
        </div>

        {/* Regulatory notice banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-10 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>{COMPANY_NAME} is not a regulated law firm</strong> and is not authorised by the Bar Standards Board or the Solicitors Regulation Authority. The Legal Ombudsman cannot consider complaints about these services. Please read the{" "}
            <button
              onClick={() => setShowNotice(true)}
              className="underline font-medium hover:text-amber-900"
            >
              Client Information Notice
            </button>{" "}
            before instructing.
          </p>
        </div>

        {/* Trust signals */}
        <div className="grid grid-cols-3 gap-4 mb-12 text-center">
          {[
            { label: "Qualified lawyer", sub: "Legally trained adviser" },
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
              We will be in touch within one working day to confirm your booking and payment details. A copy of the Client Information Notice will be sent to your email.
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

              {/* Client notice checkbox */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={noticeAccepted}
                  onChange={(e) => setNoticeAccepted(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-uphold-green-500 flex-shrink-0"
                />
                <span className="text-sm text-uphold-neutral-600">
                  I have read and understood the{" "}
                  <button
                    type="button"
                    onClick={() => setShowNotice(true)}
                    className="text-uphold-green-600 underline hover:text-uphold-green-800"
                  >
                    Client Information Notice
                  </button>
                  , including that {COMPANY_NAME} is not a regulated law firm and the Legal Ombudsman cannot consider complaints about these services.
                </span>
              </label>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={submitting || !selected || !noticeAccepted}
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
      </div>

      {/* Client Information Notice modal */}
      {showNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] flex flex-col">
            <div className="p-6 border-b border-uphold-neutral-200">
              <h3 className="font-bold text-uphold-neutral-800">Client Information Notice</h3>
              <p className="text-xs text-uphold-neutral-500 mt-1">{COMPANY_NAME}</p>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <pre className="text-xs text-uphold-neutral-700 leading-relaxed whitespace-pre-wrap font-sans">
                {CLIENT_NOTICE}
              </pre>
            </div>
            <div className="p-6 border-t border-uphold-neutral-200">
              <button
                onClick={() => { setShowNotice(false); setNoticeAccepted(true); }}
                className="w-full bg-uphold-green-500 text-white font-semibold py-3 rounded-xl hover:bg-uphold-green-700 transition-colors"
              >
                I have read and understood this notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
