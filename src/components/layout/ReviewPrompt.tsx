"use client";

import { useState, useEffect } from "react";
import { Star, X, MessageCircle } from "lucide-react";

interface ReviewPromptProps {
  trigger: string; // unique key like "triage_complete" or "stage_complete"
  delay?: number; // ms before showing (default 3000)
}

const STORAGE_KEY = "upheld_review_state";

interface ReviewState {
  dismissed: boolean;
  reviewed: boolean;
  promptCount: number;
  lastPrompt: string | null;
}

function getReviewState(): ReviewState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return { dismissed: false, reviewed: false, promptCount: 0, lastPrompt: null };
}

function saveReviewState(state: ReviewState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function ReviewPrompt({ trigger, delay = 3000 }: ReviewPromptProps) {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovering, setHovering] = useState(0);
  const [step, setStep] = useState<"rate" | "thanks" | "feedback" | "sent">("rate");
  const [feedbackText, setFeedbackText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const state = getReviewState();

    // Don't show if already reviewed or dismissed twice
    if (state.reviewed || state.promptCount >= 2) return;
    // Don't show the same trigger twice
    if (state.lastPrompt === trigger) return;

    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [trigger, delay]);

  const handleRate = (stars: number) => {
    setRating(stars);
    const state = getReviewState();

    if (stars >= 4) {
      // Good rating, mark as reviewed, show thanks
      saveReviewState({ ...state, reviewed: true, promptCount: state.promptCount + 1, lastPrompt: trigger });
      setStep("thanks");
    } else {
      // Lower rating, ask for feedback
      saveReviewState({ ...state, promptCount: state.promptCount + 1, lastPrompt: trigger });
      setStep("feedback");
    }
  };

  const handleDismiss = () => {
    const state = getReviewState();
    saveReviewState({ ...state, dismissed: true, promptCount: state.promptCount + 1, lastPrompt: trigger });
    setShow(false);
  };

  const handleClose = () => setShow(false);

  const handleFeedbackSubmit = async () => {
    if (!feedbackText.trim()) return;
    setSubmitting(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, text: feedbackText, trigger }),
      });
    } catch { /* non-blocking */ }
    setStep("sent");
    setSubmitting(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/30 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative animate-scale-in">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-uphold-neutral-400 hover:text-uphold-neutral-600"
        >
          <X className="w-5 h-5" />
        </button>

        {step === "rate" && (
          <div className="text-center">
            <div className="w-12 h-12 bg-uphold-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-uphold-green-500" />
            </div>
            <h3 className="text-lg font-bold text-uphold-neutral-800 mb-2">
              How is Upheld so far?
            </h3>
            <p className="text-sm text-uphold-neutral-600 mb-5">
              Your feedback helps us improve the app for everyone.
            </p>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRate(star)}
                  onMouseEnter={() => setHovering(star)}
                  onMouseLeave={() => setHovering(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= (hovering || rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-uphold-neutral-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              onClick={handleDismiss}
              className="text-sm text-uphold-neutral-400 hover:text-uphold-neutral-600"
            >
              Not now
            </button>
          </div>
        )}

        {step === "thanks" && (
          <div className="text-center">
            <div className="w-12 h-12 bg-uphold-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            </div>
            <h3 className="text-lg font-bold text-uphold-neutral-800 mb-2">
              Thank you!
            </h3>
            <p className="text-sm text-uphold-neutral-600 mb-5">
              We are glad Upheld is helping. If you have a moment, a review on the App Store means the world to us and helps others find the app.
            </p>
            <button
              onClick={handleClose}
              className="w-full bg-uphold-green-500 text-white font-semibold py-3 rounded-xl hover:bg-uphold-green-700 transition-colors"
            >
              Will do
            </button>
            <button
              onClick={handleClose}
              className="mt-2 text-sm text-uphold-neutral-400 hover:text-uphold-neutral-600"
            >
              Maybe later
            </button>
          </div>
        )}

        {step === "feedback" && (
          <div>
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-lg font-bold text-uphold-neutral-800 mb-2 text-center">
              How can we do better?
            </h3>
            <p className="text-sm text-uphold-neutral-600 mb-4 text-center">
              We are sorry the experience has not been great. Tell us what happened and we will improve it.
            </p>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="What could we do better?"
              className="w-full border-2 border-uphold-neutral-200 rounded-xl px-4 py-3 text-sm text-uphold-neutral-800 placeholder:text-uphold-neutral-400 resize-none focus:border-uphold-green-500 focus:outline-none transition-colors min-h-[100px]"
              autoFocus
            />
            <button
              onClick={handleFeedbackSubmit}
              disabled={!feedbackText.trim() || submitting}
              className="mt-3 w-full bg-uphold-neutral-800 text-white font-semibold py-3 rounded-xl hover:bg-uphold-neutral-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending…" : "Send feedback"}
            </button>
            <button
              onClick={handleClose}
              className="mt-2 w-full text-sm text-uphold-neutral-400 hover:text-uphold-neutral-600"
            >
              No thanks
            </button>
          </div>
        )}

        {step === "sent" && (
          <div className="text-center">
            <div className="w-12 h-12 bg-uphold-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-uphold-green-500" />
            </div>
            <h3 className="text-lg font-bold text-uphold-neutral-800 mb-2">
              Thank you
            </h3>
            <p className="text-sm text-uphold-neutral-600 mb-5">
              We have received your feedback and will use it to improve Upheld.
            </p>
            <button
              onClick={handleClose}
              className="w-full bg-uphold-green-500 text-white font-semibold py-3 rounded-xl hover:bg-uphold-green-700 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
