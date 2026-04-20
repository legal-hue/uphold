import type { Metadata } from "next";
import { QuizFlow } from "@/components/triage/QuizFlow";
import housingQuiz from "@/data/quizzes/housing.json";
import type { Quiz } from "@/lib/types";

export const metadata: Metadata = {
  title: "Housing Disrepair Rights Check | Damp, Mould & Landlord Repairs",
  description: "Damp, mould, or repairs your landlord won't fix? Check your housing disrepair rights free. Find out what your landlord owes you and what steps to take next.",
  openGraph: {
    title: "Housing Disrepair Rights Check | Upheld",
    description: "Check your housing disrepair rights free. Know what your landlord is legally required to fix.",
    url: "https://upheld.co.uk/triage/housing",
  },
};

export default function HousingTriagePage() {
  return <QuizFlow quiz={housingQuiz as Quiz} />;
}
