import type { Metadata } from "next";
import { Suspense } from "react";
import { ResultDisplay } from "@/components/triage/ResultDisplay";

export const metadata: Metadata = {
  title: "Your Contract Dispute Result",
  robots: { index: false, follow: false },
};

export default function ContractResultPage() {
  return <Suspense><ResultDisplay /></Suspense>;
}
