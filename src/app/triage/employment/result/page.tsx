import type { Metadata } from "next";
import { ResultDisplay } from "@/components/triage/ResultDisplay";

export const metadata: Metadata = {
  title: "Your Employment Rights Result",
  robots: { index: false, follow: false },
};

export default function EmploymentResultPage() {
  return <ResultDisplay />;
}
