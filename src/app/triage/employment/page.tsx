import { QuizFlow } from "@/components/triage/QuizFlow";
import employmentQuiz from "@/data/quizzes/employment.json";
import type { Quiz } from "@/lib/types";

export default function EmploymentTriagePage() {
  return <QuizFlow quiz={employmentQuiz as Quiz} />;
}
