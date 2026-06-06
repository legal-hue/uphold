import type { Metadata } from "next";
import { Suspense } from "react";
import { ResultDisplay } from "@/components/triage/ResultDisplay";

export const metadata: Metadata = {
  title: "Your Creator Rights Result",
  robots: { index: false, follow: false },
};

export default function CreativeResultPage() {
  return <Suspense><ResultDisplay /></Suspense>;
}
