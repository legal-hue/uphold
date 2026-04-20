import type { Metadata } from "next";
import { QuizFlow } from "@/components/triage/QuizFlow";
import employmentQuiz from "@/data/quizzes/employment.json";
import type { Quiz } from "@/lib/types";

export const metadata: Metadata = {
  title: "Employment Rights Check | Unfair Dismissal, Discrimination & Wages",
  description: "Think you have an employment claim? Check your rights free. Covers unfair dismissal, discrimination, harassment, unpaid wages, and settlement agreements. Know your deadlines in 2 minutes.",
  openGraph: {
    title: "Employment Rights Check | Upheld",
    description: "Check your employment rights free. Unfair dismissal, discrimination, wages, and more.",
    url: "https://upheld.co.uk/triage/employment",
  },
};

export default function EmploymentTriagePage() {
  return <QuizFlow quiz={employmentQuiz as Quiz} />;
}
