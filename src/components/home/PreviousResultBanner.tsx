"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export function PreviousResultBanner() {
  const [hasResult, setHasResult] = useState(false);
  const [hasCase, setHasCase] = useState(false);
  const [area, setArea] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("uphold_latest_triage");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setArea(data.area || "employment");
        setHasResult(true);
      } catch { /* ignore */ }
    }
    const areas = ["employment", "housing", "contract"];
    for (const a of areas) {
      if (localStorage.getItem(`uphold_case_${a}`) !== null) {
        setHasCase(true);
        if (!stored) setArea(a);
        break;
      }
    }
  }, []);

  if (!hasResult) return null;

  return (
    <div className="bg-uphold-green-50 border-b border-uphold-green-100">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <p className="text-sm text-uphold-neutral-600">
          {hasCase ? "You have an active case journey." : "You have a previous assessment result."}
        </p>
        <Link
          href={hasCase ? `/journey/${area}` : `/triage/${area}/result`}
          className="text-sm font-semibold text-uphold-green-500 hover:text-uphold-green-700 flex items-center gap-1"
        >
          {hasCase ? "Continue journey" : "View result"} <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
