"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Shield, Clock, AlertTriangle } from "lucide-react";
import type { Quiz, QuizQuestion as QuizQuestionType } from "@/lib/types";
import { calculateScore } from "@/lib/scoring";
import {
  calculateEmploymentDeadlines,
  calculateHousingDeadlines,
  calculateContractDeadlines,
} from "@/lib/deadlines";

const microFeedback: Record<string, Record<string, string>> = {
  what_happened: {
    dismissed: "We see a lot of dismissal cases. Let's check your rights.",
    redundancy: "Redundancy has strict rules employers must follow.",
    constructive: "Feeling forced to resign can be grounds for a claim.",
    discrimination: "Discrimination claims don't need 2 years' service.",
    harassment: "Nobody should have to put up with bullying at work.",
    wages: "You have a legal right to be paid what you're owed.",
    settlement: "It's important to understand what you're signing.",
    other: "Let's work out what options you have.",
  },
  still_employed: {
    yes: "Being still employed gives you more options.",
    notice: "Make sure you document everything during your notice period.",
    no: "Don't worry — you can still take action after leaving.",
    suspended: "A suspension doesn't mean you've done anything wrong.",
  },
  length_of_service: {
    under_6_months: "You may still be protected against discrimination.",
    "6_to_2_years": "From January 2027, you'll have full unfair dismissal protection at 6 months.",
    over_2_years: "With 2+ years, you have full unfair dismissal protection.",
  },
  grievance: {
    yes_written: "Having a written grievance strengthens your position.",
    yes_verbal: "A verbal complaint counts — but we'd recommend putting it in writing too.",
    no: "It's not too late to raise one. We can help you draft it.",
    not_sure: "No worries — we'll guide you through this.",
  },
  acas: {
    yes_certificate: "Great — you're ready to file a tribunal claim if needed.",
    yes_ongoing: "ACAS conciliation can lead to a settlement without tribunal.",
    no: "You'll need to contact ACAS before you can go to tribunal. It's free.",
    whats_acas: "ACAS is a free service that helps resolve workplace disputes. We'll explain everything.",
  },
};

function ClaimStrengthMeter({ score, maxScore }: { score: number; maxScore: number }) {
  const percentage = Math.min(100, (score / maxScore) * 100);
  const label = percentage >= 60 ? "Looking strong" : percentage >= 30 ? "Building up" : "Early stages";

  return (
    <div className="bg-white border border-uphold-neutral-200 rounded-xl p-4 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-uphold-green-500" />
          <span className="text-xs font-semibold text-uphold-neutral-600">Claim strength</span>
        </div>
        <span className="text-xs font-bold text-uphold-neutral-800">{label}</span>
      </div>
      <div className="w-full h-3 bg-uphold-neutral-100 rounded-full overflow-hidden">
        <div
          className="h-full strength-meter transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function DeadlinePreview({ dateStr }: { dateStr: string }) {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [deadlineStr, setDeadlineStr] = useState("");

  useEffect(() => {
    if (!dateStr) { setDaysLeft(null); return; }
    const trigger = new Date(dateStr);
    if (isNaN(trigger.getTime())) { setDaysLeft(null); return; }
    const deadline = new Date(trigger);
    deadline.setMonth(deadline.getMonth() + 3);
    deadline.setDate(deadline.getDate() - 1);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    setDaysLeft(days);
    setDeadlineStr(deadline.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }));
  }, [dateStr]);

  if (daysLeft === null) return null;

  const isUrgent = daysLeft <= 30;
  const isPast = daysLeft <= 0;

  return (
    <div className={`mt-4 p-4 rounded-xl border-2 animate-scale-in ${
      isPast ? "bg-red-50 border-red-300" : isUrgent ? "bg-amber-50 border-amber-300" : "bg-uphold-green-50 border-uphold-green-100"
    }`}>
      <div className="flex items-start gap-3">
        {isPast ? (
          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
        ) : (
          <Clock className="w-5 h-5 text-uphold-green-500 mt-0.5" />
        )}
        <div>
          <div className="font-semibold text-sm text-uphold-neutral-800">
            {isPast
              ? "Your deadline may have passed"
              : `${daysLeft} days to take action`}
          </div>
          <div className="text-xs text-uphold-neutral-600 mt-1">
            {isPast
              ? `The standard deadline was ${deadlineStr}. Don't give up — speak to a professional urgently.`
              : `Your ET1 deadline is ${deadlineStr}. Contact ACAS first — it's free.`}
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightBubble({ text }: { text: string }) {
  return (
    <div className="mt-4 flex items-start gap-3 p-3 bg-uphold-green-50 rounded-xl border border-uphold-green-100 animate-fade-in">
      <div className="w-6 h-6 bg-uphold-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
        <Check className="w-3 h-3 text-white" />
      </div>
      <p className="text-sm text-uphold-green-700">{text}</p>
    </div>
  );
}

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
        <DeadlinePreview dateStr={(answer as string) || ""} />
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
  const selectedValues = isMultiple ? (Array.isArray(answer) ? answer : []) : [];

  return (
    <div className="space-y-3">
      {question.options?.map((option, i) => {
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
            style={{ animationDelay: `${i * 0.05}s` }}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 animate-fade-in-up ${
              isSelected
                ? "border-uphold-green-500 bg-uphold-green-50 shadow-sm option-selected"
                : "border-uphold-neutral-200 bg-white hover:border-uphold-neutral-400 hover:shadow-sm"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                isSelected
                  ? "border-uphold-green-500 bg-uphold-green-500 scale-110"
                  : "border-uphold-neutral-400"
              }`}
            >
              {isSelected && <Check className="w-4 h-4 text-white" />}
            </div>
            <span className={`transition-colors ${isSelected ? "text-uphold-neutral-800 font-medium" : "text-uphold-neutral-600"}`}>
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function QuizFlow({ quiz }: { quiz: Quiz }) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const question = currentIndex >= 0 ? quiz.questions[currentIndex] : null;
  const totalQuestions = quiz.questions.length;
  const progress = currentIndex >= 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  const currentAnswer = question ? answers[question.id] : undefined;
  const canProceed = question
    ? !question.required || (currentAnswer !== undefined && currentAnswer !== "" && (Array.isArray(currentAnswer) ? currentAnswer.length > 0 : true))
    : true;

  // Calculate running score for strength meter
  const runningScore = Object.entries(answers).reduce((total, [qId, answer]) => {
    const q = quiz.questions.find((q) => q.id === qId);
    if (!q?.options) return total;
    if (Array.isArray(answer)) {
      return total + answer.reduce((s, v) => {
        const opt = q.options?.find((o) => o.value === v);
        return s + (opt?.score || 0);
      }, 0);
    }
    const opt = q.options.find((o) => o.value === answer);
    return total + (opt?.score || 0);
  }, 0);

  // Get micro-feedback for current answer
  const feedbackText = question && currentAnswer && !Array.isArray(currentAnswer)
    ? microFeedback[question.id]?.[currentAnswer]
    : null;

  const handleNext = () => {
    setDirection("forward");
    if (currentIndex < totalQuestions - 1) {
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
      const { result, score, message } = calculateScore(quiz, answers);
      let deadlines;
      if (quiz.area === "employment") deadlines = calculateEmploymentDeadlines(answers);
      else if (quiz.area === "housing") deadlines = calculateHousingDeadlines(answers);
      else deadlines = calculateContractDeadlines(answers);

      const outcome = { area: quiz.area, result, score, message, answers, deadlines, completedAt: new Date().toISOString() };
      localStorage.setItem("uphold_latest_triage", JSON.stringify(outcome));
      router.push(`/triage/${quiz.area}/result`);
    }
  };

  const handleBack = () => {
    setDirection("back");
    setCurrentIndex(Math.max(-1, currentIndex - 1));
  };

  // Intro screen
  if (currentIndex === -1) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 md:py-20 text-center">
        <div className="w-16 h-16 bg-uphold-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-scale-in border border-uphold-green-100">
          <Shield className="w-8 h-8 text-uphold-green-500" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-uphold-neutral-800 mb-4 animate-fade-in-up stagger-1">
          {quiz.introMessage}
        </h1>
        <p className="text-uphold-neutral-600 mb-3 animate-fade-in-up stagger-2">
          We&apos;ll ask you {totalQuestions} simple questions.
        </p>
        <p className="text-sm text-uphold-neutral-400 mb-8 animate-fade-in-up stagger-2">
          Your answers stay on your device. We don&apos;t store anything.
        </p>

        <div className="space-y-4 animate-fade-in-up stagger-3">
          <button
            onClick={() => setCurrentIndex(0)}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-uphold-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-uphold-green-700 transition-colors text-lg shadow-lg shadow-uphold-green-500/20"
          >
            Let&apos;s begin
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-xs text-uphold-neutral-400">
            Take a breath. You&apos;re doing the right thing by checking.
          </p>
        </div>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="max-w-xl mx-auto px-4 py-8 md:py-12">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-uphold-neutral-400 mb-2">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2.5 bg-uphold-neutral-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-uphold-green-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Claim strength meter */}
      {currentIndex > 0 && (
        <div className="mb-6">
          <ClaimStrengthMeter score={runningScore} maxScore={20} />
        </div>
      )}

      {/* Question with animation */}
      <div
        key={`q-${currentIndex}`}
        className={direction === "forward" ? "animate-slide-in" : "animate-fade-in"}
      >
        <div className="mb-6">
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

        {/* Micro-feedback */}
        {feedbackText && <InsightBubble text={feedbackText} />}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-uphold-neutral-600 hover:text-uphold-neutral-800 transition-colors py-3 px-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`flex items-center gap-2 font-semibold py-3 px-6 rounded-xl transition-all duration-200 ${
            canProceed
              ? "bg-uphold-green-500 text-white hover:bg-uphold-green-700 shadow-md hover:shadow-lg"
              : "bg-uphold-neutral-200 text-uphold-neutral-400 cursor-not-allowed"
          }`}
        >
          {currentIndex === totalQuestions - 1 ? "See my result" : "Next"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Encouragement at halfway */}
      {currentIndex === Math.floor(totalQuestions / 2) && (
        <div className="mt-6 text-center animate-fade-in">
          <p className="text-sm text-uphold-neutral-400">
            You&apos;re halfway there. You&apos;re doing great.
          </p>
        </div>
      )}
    </div>
  );
}
