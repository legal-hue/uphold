import type { Metadata } from "next";
import { QuizFlow } from "@/components/triage/QuizFlow";
import contractQuiz from "@/data/quizzes/contract.json";
import type { Quiz } from "@/lib/types";

export const metadata: Metadata = {
  title: "Contract Dispute Rights Check | Breach, Non-Delivery & Small Claims",
  description: "Something went wrong with a contract? Check your rights free. Covers breach of contract, non-delivery, and disputes with businesses or individuals. Know your options in 2 minutes.",
  openGraph: {
    title: "Contract Dispute Rights Check | Upheld",
    description: "Check your contract dispute rights free. Breach, non-delivery, small claims and more.",
    url: "https://upheld.co.uk/triage/contract",
  },
};

export default function ContractTriagePage() {
  return <QuizFlow quiz={contractQuiz as Quiz} />;
}
