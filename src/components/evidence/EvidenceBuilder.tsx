"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Calendar,
  FileText,
  Mail,
  Camera,
  Users,
  StickyNote,
  Heart,
  DollarSign,
  X,
} from "lucide-react";
import type { PracticeArea } from "@/lib/types";
import {
  loadEvidence,
  addEvidence,
  removeEvidence,
  evidenceTypeConfig,
  type EvidenceItem,
  type EvidenceType,
} from "@/lib/evidence";

const typeIcons: Record<EvidenceType, typeof FileText> = {
  document: FileText,
  email: Mail,
  photo: Camera,
  witness: Users,
  note: StickyNote,
  medical: Heart,
  financial: DollarSign,
};

interface EvidenceBuilderProps {
  area: PracticeArea;
}

function AddEvidenceForm({
  onAdd,
  onCancel,
}: {
  onAdd: (item: Omit<EvidenceItem, "id" | "createdAt">) => void;
  onCancel: () => void;
}) {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<EvidenceType>("document");

  const canSubmit = date && title.trim();

  const handleSubmit = () => {
    if (!canSubmit) return;
    onAdd({ date, title: title.trim(), description: description.trim(), type });
    setDate("");
    setTitle("");
    setDescription("");
    setType("document");
  };

  return (
    <div className="bg-white border-2 border-uphold-green-500 rounded-2xl p-5 animate-scale-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-uphold-neutral-800">Add evidence</h3>
        <button
          onClick={onCancel}
          className="p-1 text-uphold-neutral-400 hover:text-uphold-neutral-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Type selector */}
        <div>
          <label className="block text-sm font-semibold text-uphold-neutral-800 mb-2">
            Type of evidence
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(evidenceTypeConfig) as EvidenceType[]).map((t) => {
              const config = evidenceTypeConfig[t];
              const Icon = typeIcons[t];
              return (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border-2 text-sm transition-all ${
                    type === t
                      ? "border-uphold-green-500 bg-uphold-green-50"
                      : "border-uphold-neutral-200 hover:border-uphold-neutral-400"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${config.colour}`} />
                  <span className="text-uphold-neutral-700">{config.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-semibold text-uphold-neutral-800 mb-1.5">
            Date <span className="text-uphold-red">*</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            className="w-full p-3 border-2 border-uphold-neutral-200 rounded-xl text-sm focus:border-uphold-green-500 focus:outline-none transition-colors bg-white"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-uphold-neutral-800 mb-1.5">
            Title <span className="text-uphold-red">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Email from manager about performance"
            className="w-full p-3 border-2 border-uphold-neutral-200 rounded-xl text-sm focus:border-uphold-green-500 focus:outline-none transition-colors bg-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-uphold-neutral-800 mb-1.5">
            Notes (optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What does this evidence show? Why is it important?"
            className="w-full p-3 border-2 border-uphold-neutral-200 rounded-xl text-sm focus:border-uphold-green-500 focus:outline-none transition-colors bg-white min-h-[80px] resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`w-full flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-xl transition-colors ${
            canSubmit
              ? "bg-uphold-green-500 text-white hover:bg-uphold-green-700 shadow-md"
              : "bg-uphold-neutral-200 text-uphold-neutral-400 cursor-not-allowed"
          }`}
        >
          <Plus className="w-4 h-4" />
          Add to timeline
        </button>
      </div>
    </div>
  );
}

function TimelineItem({
  item,
  onDelete,
}: {
  item: EvidenceItem;
  onDelete: () => void;
}) {
  const config = evidenceTypeConfig[item.type];
  const Icon = typeIcons[item.type];
  const formattedDate = new Date(item.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex gap-4 animate-fade-in-up">
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}
        >
          <Icon className={`w-5 h-5 ${config.colour}`} />
        </div>
        <div className="w-0.5 flex-1 bg-uphold-neutral-200 mt-2" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-uphold-neutral-400">
                {formattedDate}
              </span>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.bg} ${config.colour}`}
              >
                {config.label}
              </span>
            </div>
            <h4 className="font-semibold text-uphold-neutral-800 text-sm">
              {item.title}
            </h4>
            {item.description && (
              <p className="text-xs text-uphold-neutral-600 mt-1 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
          <button
            onClick={onDelete}
            className="p-1 text-uphold-neutral-400 hover:text-uphold-red transition-colors flex-shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function EvidenceBuilder({ area }: EvidenceBuilderProps) {
  const [items, setItems] = useState<EvidenceItem[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setItems(loadEvidence(area));
  }, [area]);

  const handleAdd = (item: Omit<EvidenceItem, "id" | "createdAt">) => {
    const updated = addEvidence(area, item);
    setItems(updated);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    const updated = removeEvidence(area, id);
    setItems(updated);
  };

  const areaLabel =
    area === "employment"
      ? "Employment"
      : area === "housing"
      ? "Housing"
      : "Contract";

  return (
    <div className="max-w-xl mx-auto px-4 py-8 md:py-12">
      {/* Back */}
      <Link
        href={`/journey/${area}`}
        className="inline-flex items-center gap-2 text-uphold-neutral-600 hover:text-uphold-neutral-800 text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to journey
      </Link>

      {/* Header */}
      <div className="mb-6 animate-fade-in-up">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-5 h-5 text-uphold-green-500" />
          <span className="text-xs font-semibold text-uphold-green-500 bg-uphold-green-50 px-2 py-1 rounded-full">
            {areaLabel}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-uphold-neutral-800 mb-2">
          Evidence Timeline
        </h1>
        <p className="text-uphold-neutral-600">
          Log everything that happened, in date order. The stronger your
          evidence, the stronger your case.
        </p>
      </div>

      {/* Stats */}
      {items.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-uphold-green-50 rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-uphold-green-700">
              {items.length}
            </div>
            <div className="text-xs text-uphold-neutral-600">items</div>
          </div>
          <div className="bg-uphold-green-50 rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-uphold-green-700">
              {new Set(items.map((i) => i.type)).size}
            </div>
            <div className="text-xs text-uphold-neutral-600">types</div>
          </div>
          <div className="bg-uphold-green-50 rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-uphold-green-700">
              {items.length > 0
                ? Math.ceil(
                    (new Date(items[items.length - 1].date).getTime() -
                      new Date(items[0].date).getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) || 1
                : 0}
            </div>
            <div className="text-xs text-uphold-neutral-600">day span</div>
          </div>
        </div>
      )}

      {/* Add button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 bg-uphold-green-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-uphold-green-700 transition-colors shadow-md mb-6"
        >
          <Plus className="w-4 h-4" />
          Add evidence
        </button>
      )}

      {/* Add form */}
      {showForm && (
        <div className="mb-6">
          <AddEvidenceForm
            onAdd={handleAdd}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Timeline */}
      {items.length > 0 ? (
        <div>
          <h2 className="text-sm font-bold text-uphold-neutral-800 mb-4">
            Your timeline ({items.length} items)
          </h2>
          {items.map((item) => (
            <TimelineItem
              key={item.id}
              item={item}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      ) : (
        !showForm && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-uphold-neutral-400 mx-auto mb-4" />
            <h3 className="font-bold text-uphold-neutral-800 mb-2">
              No evidence logged yet
            </h3>
            <p className="text-sm text-uphold-neutral-600 max-w-sm mx-auto">
              Start by adding the first thing that happened. Include dates,
              emails, photos, witness details — anything that supports your
              account.
            </p>
          </div>
        )
      )}

      {/* Tips */}
      {items.length > 0 && items.length < 3 && (
        <div className="mt-6 p-4 bg-uphold-warm-50 border border-uphold-warm-200 rounded-xl">
          <p className="text-xs text-uphold-neutral-600">
            Aim for at least 5-10 evidence items. Include emails,
            documents, photos, and notes of conversations. The more detailed
            your timeline, the stronger your position.
          </p>
        </div>
      )}
    </div>
  );
}
