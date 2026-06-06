import type { Metadata } from "next";
import { Suspense } from "react";
import { ResultDisplay } from "@/components/triage/ResultDisplay";

export const metadata: Metadata = {
  title: "Your Employment Rights Result",
  robots: { index: false, follow: false },
};

export default function EmploymentResultPage() {
  return <Suspense><ResultDisplay /></Suspense>;
}
