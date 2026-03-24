import type { Quiz, TriageResult, QuizOption } from "./types";

export function calculateScore(
  quiz: Quiz,
  answers: Record<string, string | string[]>
): { result: TriageResult; score: number; message: string } {
  let totalScore = 0;

  for (const question of quiz.questions) {
    const answer = answers[question.id];
    if (!answer || !question.options) continue;

    if (Array.isArray(answer)) {
      for (const val of answer) {
        const option = question.options.find((o: QuizOption) => o.value === val);
        if (option) totalScore += option.score;
      }
    } else {
      const option = question.options.find((o: QuizOption) => o.value === answer);
      if (option) totalScore += option.score;
    }
  }

  if (totalScore >= quiz.scoring.strong.min) {
    return { result: "strong", score: totalScore, message: quiz.scoring.strong.message };
  } else if (totalScore >= quiz.scoring.maybe.min) {
    return { result: "maybe", score: totalScore, message: quiz.scoring.maybe.message };
  } else {
    return { result: "difficult", score: totalScore, message: quiz.scoring.difficult.message };
  }
}
