import { QuizFlow } from "@/components/triage/QuizFlow";
import contractQuiz from "@/data/quizzes/contract.json";
import type { Quiz } from "@/lib/types";

export default function ContractTriagePage() {
  return <QuizFlow quiz={contractQuiz as Quiz} />;
}
