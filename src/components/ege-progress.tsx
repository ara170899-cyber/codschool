"use client";

import { useEffect, useState } from "react";
import {
  loadStats,
  EgePlayerStats,
  getEarnedAchievements,
  EGE_ACHIEVEMENTS,
} from "@/lib/ege-achievements";

const TASK_TYPES = 18;

function getHeatmapColor(index: number, solvedTypes: number): string {
  if (index < solvedTypes) return "bg-emerald-500";
  if (index === solvedTypes) return "bg-emerald-500/30";
  return "bg-gray-700";
}

function predictScore(stats: EgePlayerStats): number {
  // Simple prediction: based on best exam score, tasks solved, and mastery
  if (stats.bestScore > 0) {
    const base = stats.bestScore;
    const bonus = Math.min(stats.totalTasksSolved * 0.1, 10);
    return Math.min(100, Math.round(base + bonus));
  }
  // No exams taken yet, estimate from practice
  const fromTasks = Math.min(stats.totalTasksSolved * 0.5, 60);
  const fromTypes = stats.taskTypesFullySolved * 3;
  return Math.min(100, Math.round(fromTasks + fromTypes));
}

export function EgeProgress() {
  const [stats, setStats] = useState<EgePlayerStats | null>(null);
  const [recentAchievement, setRecentAchievement] = useState<string | null>(null);

  useEffect(() => {
    const s = loadStats();
    setStats(s);

    const earned = getEarnedAchievements();
    if (earned.length > 0) {
      const lastId = earned[earned.length - 1];
      const ach = EGE_ACHIEVEMENTS.find((a) => a.id === lastId);
      if (ach) setRecentAchievement(`${ach.icon} ${ach.title}`);
    }
  }, []);

  if (!stats) return null;

  const predicted = predictScore(stats);

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/80 p-4 mb-6">
      <div className="flex items-center gap-6 flex-wrap">
        {/* Predicted score */}
        <div className="text-center min-w-[80px]">
          <div className="text-3xl font-bold text-white">{predicted}</div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wider">Прогноз</div>
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-gray-700 hidden sm:block" />

        {/* Today / Streak */}
        <div className="flex gap-4 text-sm">
          <div className="text-center">
            <div className="text-lg font-semibold text-emerald-400">{stats.todaySolved}</div>
            <div className="text-[10px] text-gray-500">Сегодня</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-orange-400">
              {stats.streakDays > 0 ? `${stats.streakDays}🔥` : "0"}
            </div>
            <div className="text-[10px] text-gray-500">Стрик</div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-gray-700 hidden sm:block" />

        {/* Mini heatmap */}
        <div>
          <div className="flex gap-1 flex-wrap max-w-[130px]">
            {Array.from({ length: TASK_TYPES }).map((_, i) => (
              <div
                key={i}
                className={`w-3.5 h-3.5 rounded-sm ${getHeatmapColor(i, stats.taskTypesFullySolved)}`}
                title={`Задание ${i + 1}`}
              />
            ))}
          </div>
          <div className="text-[10px] text-gray-500 mt-1">
            {stats.taskTypesFullySolved}/{TASK_TYPES} типов
          </div>
        </div>

        {/* Recent achievement */}
        {recentAchievement && (
          <>
            <div className="w-px h-10 bg-gray-700 hidden sm:block" />
            <div className="text-sm text-yellow-400/80">
              {recentAchievement}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
