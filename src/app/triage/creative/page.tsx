import type { Metadata } from "next";
import { QuizFlow } from "@/components/triage/QuizFlow";
import creativeQuiz from "@/data/quizzes/creative.json";
import type { Quiz } from "@/lib/types";

export const metadata: Metadata = {
  title: "Creator Rights Check | Unpaid Fees, Copyright & Freelancer Disputes",
  description: "Creator or freelancer who hasn't been paid? Check your rights free. Covers unpaid fees, copyright theft, and contract disputes. Know where you stand in 2 minutes.",
  openGraph: {
    title: "Creator Rights Check | Upheld",
    description: "Check your rights as a creator or freelancer. Unpaid fees, copyright, and contract disputes.",
    url: "https://upheld.co.uk/triage/creative",
  },
};

export default function CreativeTriagePage() {
  return <QuizFlow quiz={creativeQuiz as Quiz} />;
}
