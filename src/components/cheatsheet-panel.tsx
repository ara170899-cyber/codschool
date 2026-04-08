"use client";

import { useState } from "react";
import { cheatsheets } from "@/lib/cheatsheets";

interface CheatsheetPanelProps {
  module: number;
}

export function CheatsheetPanel({ module }: CheatsheetPanelProps) {
  const [open, setOpen] = useState(false);
  const sheet = cheatsheets[module];

  if (!sheet) return null;

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm">📋</span>
          <span className="text-sm font-semibold text-gray-200">
            Шпаргалка: {sheet.title}
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
        <div className="px-4 pb-4 space-y-2">
          <div className="h-px bg-gray-800 -mx-4 mb-3" />
          {sheet.items.map((item, i) => (
            <div key={i} className="flex items-start gap-3 group">
              <code className="shrink-0 px-2 py-1 rounded bg-gray-800 text-emerald-400 text-xs font-mono whitespace-pre leading-relaxed">
                {item.code}
              </code>
              <span className="text-xs text-gray-400 pt-1 leading-relaxed">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
