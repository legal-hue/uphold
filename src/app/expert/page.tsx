import type { Metadata } from "next";
import { Suspense } from "react";
import ExpertClient from "@/components/expert/ExpertClient";

export const metadata: Metadata = {
  title: "Expert Legal Help | Strategy Calls, Document Review & Hearing Prep",
  description: "Need more than a guided journey? Book a strategy call, document review, or hearing preparation with a qualified legal adviser. Employment, housing, and contract law.",
  openGraph: {
    title: "Expert Legal Help | Upheld",
    description: "Strategy calls, document review, and hearing preparation with a qualified legal adviser.",
    url: "https://upheld.co.uk/expert",
  },
};

export default function ExpertPage() {
  return (
    <Suspense>
      <ExpertClient />
    </Suspense>
  );
}
