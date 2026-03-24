import { QuizFlow } from "@/components/triage/QuizFlow";
import housingQuiz from "@/data/quizzes/housing.json";
import type { Quiz } from "@/lib/types";

export default function HousingTriagePage() {
  return <QuizFlow quiz={housingQuiz as Quiz} />;
}
