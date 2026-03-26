"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Copy,
  Check,
  Download,
  Eye,
  Pencil,
  Sparkles,
  Loader2,
} from "lucide-react";
import type { DocumentTemplate } from "@/lib/documents";

interface DocumentGeneratorProps {
  template: DocumentTemplate;
  backHref: string;
}

export function DocumentGenerator({
  template,
  backHref,
}: DocumentGeneratorProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [view, setView] = useState<"form" | "preview">("form");
  const [copied, setCopied] = useState(false);
  const [aiDraft, setAiDraft] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [useAi, setUseAi] = useState(false);

  const updateField = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    // Reset AI draft if user changes fields
    if (aiDraft) {
      setAiDraft(null);
      setUseAi(false);
    }
  };

  const allRequiredFilled = template.fields
    .filter((f) => f.required)
    .every((f) => values[f.id]?.trim());

  const templateText = allRequiredFilled ? template.generate(values) : "";
  const generatedText = useAi && aiDraft ? aiDraft : templateText;

  const handleAiDraft = async () => {
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: template.id,
          values,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.document) {
          setAiDraft(data.document);
          setUseAi(true);
          setView("preview");
        }
      }
    } catch {
      // Silently fall back to template version
    } finally {
      setAiLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.id}-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 md:py-12">
      {/* Back */}
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-uphold-neutral-600 hover:text-uphold-neutral-800 text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-uphold-green-500" />
          <span className="text-xs font-semibold text-uphold-green-500 bg-uphold-green-50 px-2 py-1 rounded-full">
            Document Generator
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-uphold-neutral-800 mb-2">
          {template.name}
        </h1>
        <p className="text-uphold-neutral-600">{template.description}</p>
      </div>

      {/* View toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setView("form")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            view === "form"
              ? "bg-uphold-green-500 text-white"
              : "bg-uphold-neutral-100 text-uphold-neutral-600 hover:bg-uphold-neutral-200"
          }`}
        >
          <Pencil className="w-3.5 h-3.5" />
          Fill in details
        </button>
        <button
          onClick={() => setView("preview")}
          disabled={!allRequiredFilled}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            view === "preview"
              ? "bg-uphold-green-500 text-white"
              : allRequiredFilled
              ? "bg-uphold-neutral-100 text-uphold-neutral-600 hover:bg-uphold-neutral-200"
              : "bg-uphold-neutral-100 text-uphold-neutral-400 cursor-not-allowed"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          Preview
        </button>
      </div>

      {/* Form view */}
      {view === "form" && (
        <div className="space-y-5 animate-fade-in">
          {template.fields.map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-semibold text-uphold-neutral-800 mb-1.5">
                {field.label}
                {field.required && (
                  <span className="text-uphold-red ml-1">*</span>
                )}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  value={values[field.id] || ""}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full p-3 border-2 border-uphold-neutral-200 rounded-xl text-sm focus:border-uphold-green-500 focus:outline-none transition-colors bg-white min-h-[120px] resize-none"
                />
              ) : field.type === "date" ? (
                <input
                  type="date"
                  value={values[field.id] || ""}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  className="w-full p-3 border-2 border-uphold-neutral-200 rounded-xl text-sm focus:border-uphold-green-500 focus:outline-none transition-colors bg-white"
                />
              ) : (
                <input
                  type="text"
                  value={values[field.id] || ""}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full p-3 border-2 border-uphold-neutral-200 rounded-xl text-sm focus:border-uphold-green-500 focus:outline-none transition-colors bg-white"
                />
              )}
            </div>
          ))}

          {allRequiredFilled && (
            <div className="space-y-3">
              <button
                onClick={() => setView("preview")}
                className="w-full flex items-center justify-center gap-2 bg-uphold-green-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-uphold-green-700 transition-colors shadow-md animate-scale-in"
              >
                <Eye className="w-4 h-4" />
                Preview your document
              </button>

              <button
                onClick={handleAiDraft}
                disabled={aiLoading}
                className="w-full flex items-center justify-center gap-2 bg-uphold-neutral-800 text-white font-semibold py-3 px-6 rounded-xl hover:bg-uphold-neutral-600 transition-colors shadow-md animate-scale-in"
              >
                {aiLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Drafting with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Enhance with AI
                  </>
                )}
              </button>
              <p className="text-xs text-uphold-neutral-400 text-center">
                AI drafts a more detailed, professionally worded version using your details
              </p>
            </div>
          )}
        </div>
      )}

      {/* Preview view */}
      {view === "preview" && allRequiredFilled && (
        <div className="animate-fade-in">
          {/* AI / Template toggle */}
          {aiDraft && (
            <div className="flex items-center gap-2 mb-4 p-3 bg-uphold-neutral-50 rounded-xl border border-uphold-neutral-200">
              <button
                onClick={() => setUseAi(false)}
                className={`flex-1 text-center py-2 rounded-lg text-sm font-semibold transition-colors ${
                  !useAi
                    ? "bg-white shadow text-uphold-neutral-800"
                    : "text-uphold-neutral-500"
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setUseAi(true)}
                className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  useAi
                    ? "bg-white shadow text-uphold-neutral-800"
                    : "text-uphold-neutral-500"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI Enhanced
              </button>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-uphold-neutral-800 text-white hover:bg-uphold-neutral-600 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy to clipboard
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-uphold-neutral-100 text-uphold-neutral-600 hover:bg-uphold-neutral-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
            {!aiDraft && (
              <button
                onClick={handleAiDraft}
                disabled={aiLoading}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-uphold-neutral-100 text-uphold-neutral-600 hover:bg-uphold-neutral-200 transition-colors"
              >
                {aiLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                {aiLoading ? "Drafting..." : "Enhance with AI"}
              </button>
            )}
          </div>

          {/* Document preview */}
          <div className="bg-white border-2 border-uphold-neutral-200 rounded-2xl p-6 md:p-8">
            <pre className="whitespace-pre-wrap font-sans text-sm text-uphold-neutral-800 leading-relaxed">
              {generatedText}
            </pre>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 p-4 bg-uphold-warm-50 border border-uphold-warm-200 rounded-xl">
            <p className="text-xs text-uphold-neutral-600">
              {useAi
                ? "This document was drafted by AI based on the details you provided and general UK legal principles. Review it carefully and adapt it to your specific situation. It does not constitute legal advice. Consider having it reviewed by a legal professional before sending."
                : "This document is generated as a starting point based on general legal principles. Review it carefully and adapt it to your specific situation. It does not constitute legal advice. Consider having it reviewed by a legal professional before sending."}
            </p>
          </div>

          {/* Edit button */}
          <button
            onClick={() => setView("form")}
            className="mt-4 flex items-center gap-2 text-uphold-green-500 hover:text-uphold-green-700 font-semibold text-sm transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit details
          </button>
        </div>
      )}
    </div>
  );
}
