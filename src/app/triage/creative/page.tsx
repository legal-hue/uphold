import { QuizFlow } from "@/components/triage/QuizFlow";
import creativeQuiz from "@/data/quizzes/creative.json";
import type { Quiz } from "@/lib/types";

export default function CreativeTriagePage() {
  return <QuizFlow quiz={creativeQuiz as Quiz} />;
}
