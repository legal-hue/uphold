"use client";

import { useState, useRef, useCallback } from "react";
import { Mic, MicOff } from "lucide-react";

interface SpeechToTextProps {
  onResult: (text: string) => void;
  currentValue?: string;
}

export function SpeechToText({ onResult, currentValue = "" }: SpeechToTextProps) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const toggleListening = useCallback(() => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-GB";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join(" ");

      const combined = currentValue
        ? currentValue.trim() + " " + transcript.trim()
        : transcript.trim();

      onResult(combined);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }, [listening, currentValue, onResult]);

  // Check if speech recognition is supported
  if (
    typeof window === "undefined" ||
    (!window.SpeechRecognition && !window.webkitSpeechRecognition)
  ) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
        listening
          ? "bg-red-100 text-red-600 border border-red-200 animate-pulse"
          : "bg-uphold-neutral-100 text-uphold-neutral-500 hover:bg-uphold-neutral-200 border border-uphold-neutral-200"
      }`}
      title={listening ? "Stop recording" : "Speak instead of typing"}
    >
      {listening ? (
        <>
          <MicOff className="w-3.5 h-3.5" />
          Stop
        </>
      ) : (
        <>
          <Mic className="w-3.5 h-3.5" />
          Speak
        </>
      )}
    </button>
  );
}
