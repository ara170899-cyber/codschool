"use client";

import { Level } from "@/lib/gamification";
import { pluralize } from "@/lib/utils";

interface XPBarProps {
  level: Level;
  progress: { current: number; target: number; percentage: number };
  streak: number;
}

export function XPBar({ level, progress, streak }: XPBarProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-800 bg-gray-900 px-4 py-2">
      {/* Level badge */}
      <div className="flex items-center gap-1.5 whitespace-nowrap">
        <span className="text-lg">{level.icon}</span>
        <span className="text-sm font-semibold text-emerald-400">
          {level.name}
        </span>
      </div>

      {/* XP progress bar */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-800">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
        <span className="whitespace-nowrap text-xs text-gray-400">
          {progress.current}
          {progress.target !== progress.current && (
            <span> / {progress.target}</span>
          )}{" "}
          XP
        </span>
      </div>

      {/* Streak */}
      {streak > 0 && (
        <div className="flex items-center gap-1 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1">
          <span className="text-sm">🔥</span>
          <span className="text-sm font-medium text-white">
            {streak} {pluralize(streak, "день", "дня", "дней")}
          </span>
        </div>
      )}
    </div>
  );
}
