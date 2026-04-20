import type { Metadata } from "next";
import { ResultDisplay } from "@/components/triage/ResultDisplay";

export const metadata: Metadata = {
  title: "Your Housing Rights Result",
  robots: { index: false, follow: false },
};

export default function HousingResultPage() {
  return <ResultDisplay />;
}
