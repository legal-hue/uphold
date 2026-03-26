import DocumentPageClient from "./client-page";

export function generateStaticParams() {
  return [
    { templateId: "grievance-letter" },
    { templateId: "section-11-notice" },
    { templateId: "pre-action-letter" },
  ];
}

export default function DocumentPage() {
  return <DocumentPageClient />;
}
