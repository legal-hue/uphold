"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Mic, MicOff } from "lucide-react";

interface SpeechToTextProps {
  onResult: (text: string) => void;
  currentValue?: string;
}

export function SpeechToText({ onResult, currentValue = "" }: SpeechToTextProps) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    setSupported(!!(window.SpeechRecognition || window.webkitSpeechRecognition));
  }, []);

  const toggleListening = useCallback(() => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    setError(null);
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

    recognition.onerror = (event: Event & { error?: string }) => {
      setListening(false);
      if (event.error === "not-allowed") {
        setError("Microphone access denied. Please allow microphone in your browser settings.");
      } else if (event.error === "network") {
        setError("Network error. Speech recognition requires an internet connection.");
      } else {
        setError("Could not start recording. Please try again.");
      }
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }, [listening, currentValue, onResult]);

  if (!supported) return null;

  return (
    <div>
    {error && (
      <p className="text-xs text-red-500 mb-1 text-right">{error}</p>
    )}
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
    </div>
  );
}
