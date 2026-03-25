"use client";

import { useParams } from "next/navigation";
import { DocumentGenerator } from "@/components/documents/DocumentGenerator";
import { getTemplateById } from "@/lib/documents";
import Link from "next/link";
import { FileText } from "lucide-react";

export default function DocumentPage() {
  const params = useParams();
  const templateId = params.templateId as string;
  const template = getTemplateById(templateId);

  if (!template) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <FileText className="w-12 h-12 text-uphold-neutral-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-uphold-neutral-800 mb-3">
          Document not found
        </h1>
        <Link
          href="/"
          className="text-uphold-green-500 hover:text-uphold-green-700 font-semibold"
        >
          Go home
        </Link>
      </div>
    );
  }

  const backHref =
    template.area === "employment"
      ? `/journey/employment/${template.stageId}`
      : template.area === "housing"
      ? `/journey/housing/${template.stageId}`
      : `/journey/contract/${template.stageId}`;

  return <DocumentGenerator template={template} backHref={backHref} />;
}
