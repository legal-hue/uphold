"use client";

import { useParams } from "next/navigation";
import { EvidenceBuilder } from "@/components/evidence/EvidenceBuilder";
import type { PracticeArea } from "@/lib/types";
import Link from "next/link";

const validAreas = ["employment", "housing", "contract"];

export default function EvidencePage() {
  const params = useParams();
  const area = params.area as string;

  if (!validAreas.includes(area)) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-uphold-neutral-800 mb-3">
          Area not found
        </h1>
        <Link
          href="/"
          className="text-uphold-green-500 hover:text-uphold-green-700 font-semibold"
        >
          Go home
        </Link>
      </div>
    );
  }

  return <EvidenceBuilder area={area as PracticeArea} />;
}
