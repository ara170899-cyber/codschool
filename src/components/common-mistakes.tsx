"use client";

import { useState } from "react";
import { commonMistakes } from "@/lib/common-mistakes";

interface CommonMistakesProps {
  lessonId: string;
}

export function CommonMistakes({ lessonId }: CommonMistakesProps) {
  const [open, setOpen] = useState(false);
  const mistakes = commonMistakes[lessonId];

  if (!mistakes || mistakes.length === 0) return null;

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm">⚠️</span>
          <span className="text-sm font-semibold text-gray-200">
            Частые ошибки ({mistakes.length})
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-4">
          <div className="h-px bg-gray-800 -mx-4 mb-3" />
          {mistakes.map((mistake, i) => (
            <div key={i} className="space-y-2">
              {i > 0 && <div className="h-px bg-gray-800" />}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="rounded-md bg-red-500/5 border border-red-500/20 p-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                      Неправильно
                    </span>
                  </div>
                  <pre className="text-xs font-mono text-red-400 whitespace-pre-wrap leading-relaxed">
                    {mistake.wrong}
                  </pre>
                </div>
                <div className="rounded-md bg-emerald-500/5 border border-emerald-500/20 p-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      Правильно
                    </span>
                  </div>
                  <pre className="text-xs font-mono text-emerald-400 whitespace-pre-wrap leading-relaxed">
                    {mistake.right}
                  </pre>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed pl-1">
                {mistake.explanation}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
