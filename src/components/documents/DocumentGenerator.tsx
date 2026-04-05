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
import { SpeechToText } from "@/components/layout/SpeechToText";

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
  const [showSample, setShowSample] = useState(false);
  const [savedVersion, setSavedVersion] = useState<string | null>(null);

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

  const handleSaveVersion = () => {
    const key = `uphold_doc_${template.id}`;
    const version = {
      savedAt: new Date().toISOString(),
      text: generatedText,
      ai: useAi,
    };
    localStorage.setItem(key, JSON.stringify(version));
    setSavedVersion(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async (format: "txt" | "docx" = "txt") => {
    const filename = `${template.id}-${new Date().toISOString().split("T")[0]}`;

    if (format === "docx") {
      try {
        const { Document, Packer, Paragraph, TextRun } = await import("docx");
        const paragraphs = generatedText.split("\n").map((line) => {
          const isHeading = line === line.toUpperCase() && line.trim().length > 3 && !line.startsWith(" ");
          return new Paragraph({
            children: [
              new TextRun({
                text: line,
                bold: isHeading,
                size: isHeading ? 28 : 24,
                font: "Arial",
              }),
            ],
            spacing: { after: line.trim() === "" ? 200 : 80 },
          });
        });

        const doc = new Document({
          sections: [{ children: paragraphs }],
        });

        const blob = await Packer.toBlob(doc);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}.docx`;
        a.click();
        URL.revokeObjectURL(url);
      } catch {
        // Fallback to txt if docx fails
        handleDownload("txt");
      }
    } else {
      const blob = new Blob([generatedText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
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
        <p className="text-uphold-neutral-600 mb-3">{template.description}</p>
        <button
          onClick={() => setShowSample(!showSample)}
          className="text-sm text-uphold-green-500 hover:text-uphold-green-700 font-semibold transition-colors flex items-center gap-1"
        >
          <Eye className="w-3.5 h-3.5" />
          {showSample ? "Hide" : "See what this document looks like"}
        </button>
        {showSample && (
          <div className="mt-3 bg-uphold-neutral-50 border border-uphold-neutral-200 rounded-xl p-4 animate-fade-in">
            <p className="text-xs font-semibold text-uphold-neutral-400 mb-2 uppercase tracking-wide">Sample preview</p>
            <pre className="whitespace-pre-wrap font-sans text-xs text-uphold-neutral-500 leading-relaxed line-clamp-10 overflow-hidden">
              {template.generate(
                Object.fromEntries(
                  template.fields.map((f) => [
                    f.id,
                    f.placeholder || `[${f.label}]`,
                  ])
                )
              )}
            </pre>
            <p className="text-xs text-uphold-neutral-400 mt-2 italic">Fill in your details below to generate your personalised version.</p>
          </div>
        )}
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
                <div>
                  <div className="flex justify-end mb-1.5">
                    <SpeechToText
                      currentValue={values[field.id] || ""}
                      onResult={(text) => updateField(field.id, text)}
                    />
                  </div>
                  <textarea
                    value={values[field.id] || ""}
                    onChange={(e) => updateField(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full p-3 border-2 border-uphold-neutral-200 rounded-xl text-sm focus:border-uphold-green-500 focus:outline-none transition-colors bg-white min-h-[120px] resize-none"
                  />
                </div>
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
                Our AI rewrites this letter using your details, stronger language, more specific facts, more likely to get a response
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

          {/* Save version */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleSaveVersion}
              className="text-xs text-uphold-green-500 hover:text-uphold-green-700 font-semibold transition-colors"
            >
              {savedVersion ? `Saved at ${savedVersion}` : "Save version to device"}
            </button>
            {savedVersion && <span className="text-xs text-uphold-neutral-400">Progress saved</span>}
          </div>

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
              onClick={() => handleDownload("docx")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-uphold-neutral-100 text-uphold-neutral-600 hover:bg-uphold-neutral-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Word (.docx)
            </button>
            <button
              onClick={() => handleDownload("txt")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-uphold-neutral-100 text-uphold-neutral-600 hover:bg-uphold-neutral-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Text
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
