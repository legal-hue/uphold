"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { Quiz, QuizQuestion as QuizQuestionType } from "@/lib/types";
import { calculateScore } from "@/lib/scoring";
import {
  calculateEmploymentDeadlines,
  calculateHousingDeadlines,
  calculateContractDeadlines,
} from "@/lib/deadlines";

function QuizQuestionCard({
  question,
  answer,
  onAnswer,
}: {
  question: QuizQuestionType;
  answer: string | string[] | undefined;
  onAnswer: (value: string | string[]) => void;
}) {
  if (question.type === "date") {
    return (
      <div className="space-y-3">
        <input
          type="date"
          value={(answer as string) || ""}
          onChange={(e) => onAnswer(e.target.value)}
          className="w-full p-4 border-2 border-uphold-neutral-200 rounded-xl text-lg focus:border-uphold-green-500 focus:outline-none transition-colors bg-white"
          max={new Date().toISOString().split("T")[0]}
        />
      </div>
    );
  }

  if (question.type === "text") {
    return (
      <textarea
        value={(answer as string) || ""}
        onChange={(e) => onAnswer(e.target.value)}
        placeholder="Tell us in your own words..."
        className="w-full p-4 border-2 border-uphold-neutral-200 rounded-xl text-base focus:border-uphold-green-500 focus:outline-none transition-colors bg-white min-h-[120px] resize-none"
      />
    );
  }

  const isMultiple = question.type === "multiple";
  const selectedValues = isMultiple
    ? (Array.isArray(answer) ? answer : [])
    : [];

  return (
    <div className="space-y-3">
      {question.options?.map((option) => {
        const isSelected = isMultiple
          ? selectedValues.includes(option.value)
          : answer === option.value;

        return (
          <button
            key={option.value}
            onClick={() => {
              if (isMultiple) {
                if (option.value === "none") {
                  onAnswer(["none"]);
                } else {
                  const newValues = selectedValues.includes(option.value)
                    ? selectedValues.filter((v) => v !== option.value)
                    : [...selectedValues.filter((v) => v !== "none"), option.value];
                  onAnswer(newValues);
                }
              } else {
                onAnswer(option.value);
              }
            }}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-150 flex items-center gap-3 ${
              isSelected
                ? "border-uphold-green-500 bg-uphold-green-50"
                : "border-uphold-neutral-200 bg-white hover:border-uphold-neutral-400"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                isSelected
                  ? "border-uphold-green-500 bg-uphold-green-500"
                  : "border-uphold-neutral-400"
              }`}
            >
              {isSelected && <Check className="w-4 h-4 text-white" />}
            </div>
            <span className="text-uphold-neutral-800">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function QuizFlow({ quiz }: { quiz: Quiz }) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 = intro screen
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  const question = currentIndex >= 0 ? quiz.questions[currentIndex] : null;
  const totalQuestions = quiz.questions.length;
  const progress = currentIndex >= 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  const currentAnswer = question ? answers[question.id] : undefined;
  const canProceed = question
    ? !question.required || (currentAnswer !== undefined && currentAnswer !== "" && (Array.isArray(currentAnswer) ? currentAnswer.length > 0 : true))
    : true;

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      // Skip conditional questions that don't apply
      let nextIndex = currentIndex + 1;
      while (nextIndex < totalQuestions) {
        const nextQ = quiz.questions[nextIndex];
        if (nextQ.conditionalOn) {
          const depAnswer = answers[nextQ.conditionalOn.questionId];
          const requiredValues = Array.isArray(nextQ.conditionalOn.value)
            ? nextQ.conditionalOn.value
            : [nextQ.conditionalOn.value];
          if (!depAnswer || (Array.isArray(depAnswer)
            ? !depAnswer.some((v) => requiredValues.includes(v))
            : !requiredValues.includes(depAnswer as string))) {
            nextIndex++;
            continue;
          }
        }
        break;
      }
      setCurrentIndex(nextIndex < totalQuestions ? nextIndex : totalQuestions);
    } else {
      // Calculate result and navigate
      const { result, score, message } = calculateScore(quiz, answers);
      let deadlines;
      if (quiz.area === "employment") {
        deadlines = calculateEmploymentDeadlines(answers);
      } else if (quiz.area === "housing") {
        deadlines = calculateHousingDeadlines(answers);
      } else {
        deadlines = calculateContractDeadlines(answers);
      }

      const outcome = {
        area: quiz.area,
        result,
        score,
        message,
        answers,
        deadlines,
        completedAt: new Date().toISOString(),
      };

      localStorage.setItem("uphold_latest_triage", JSON.stringify(outcome));
      router.push(`/triage/${quiz.area}/result`);
    }
  };

  // Intro screen
  if (currentIndex === -1) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 md:py-20 text-center">
        <div className="bg-uphold-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">💚</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-uphold-neutral-800 mb-4">
          {quiz.introMessage}
        </h1>
        <p className="text-uphold-neutral-600 mb-8">
          We&apos;ll ask you {totalQuestions} questions to understand your situation.
          Your answers stay on your device.
        </p>
        <button
          onClick={() => setCurrentIndex(0)}
          className="inline-flex items-center gap-2 bg-uphold-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-uphold-green-700 transition-colors text-lg"
        >
          Let&apos;s begin
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="max-w-xl mx-auto px-4 py-8 md:py-12">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-uphold-neutral-400 mb-2">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-uphold-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-uphold-green-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-uphold-neutral-800 mb-2">
          {question.text}
        </h2>
        {question.helpText && (
          <p className="text-sm text-uphold-neutral-400 leading-relaxed">
            {question.helpText}
          </p>
        )}
      </div>

      {/* Answer options */}
      <QuizQuestionCard
        question={question}
        answer={currentAnswer}
        onAnswer={(value) =>
          setAnswers((prev) => ({ ...prev, [question.id]: value }))
        }
      />

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentIndex(Math.max(-1, currentIndex - 1))}
          className="flex items-center gap-2 text-uphold-neutral-600 hover:text-uphold-neutral-800 transition-colors py-3 px-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`flex items-center gap-2 font-semibold py-3 px-6 rounded-xl transition-colors ${
            canProceed
              ? "bg-uphold-green-500 text-white hover:bg-uphold-green-700"
              : "bg-uphold-neutral-200 text-uphold-neutral-400 cursor-not-allowed"
          }`}
        >
          {currentIndex === totalQuestions - 1 ? "See my result" : "Next"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
