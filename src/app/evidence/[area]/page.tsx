import EvidencePageClient from "./client-page";

export function generateStaticParams() {
  return [{ area: "employment" }, { area: "housing" }, { area: "contract" }];
}

export default function EvidencePage() {
  return <EvidencePageClient />;
}
