"use client";

import { useEffect, useState } from "react";
import {
  EGE_ACHIEVEMENTS,
  EgeAchievement,
  loadStats,
  getEarnedAchievements,
  EgePlayerStats,
} from "@/lib/ege-achievements";

export default function AchievementsPage() {
  const [earned, setEarned] = useState<Set<string>>(new Set());
  const [stats, setStats] = useState<EgePlayerStats | null>(null);

  useEffect(() => {
    setEarned(new Set(getEarnedAchievements()));
    setStats(loadStats());
  }, []);

  // Find next unearned achievement with progress
  const nextAch = EGE_ACHIEVEMENTS.find(
    (a) => !earned.has(a.id) && a.progress && stats
  );
  const nextProgress = nextAch?.progress && stats ? nextAch.progress(stats) : null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">🏆 Достижения</h1>
        <p className="text-gray-400">
          Получено {earned.size} из {EGE_ACHIEVEMENTS.length}
        </p>
      </div>

      {/* Next achievement progress */}
      {nextAch && nextProgress && (
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{nextAch.icon}</span>
            <div>
              <p className="text-sm text-yellow-400 font-semibold">
                Следующее достижение
              </p>
              <p className="text-white font-bold">{nextAch.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500 rounded-full transition-all"
                style={{
                  width: `${Math.round((nextProgress.current / nextProgress.target) * 100)}%`,
                }}
              />
            </div>
            <span className="text-sm text-gray-400 min-w-[60px] text-right">
              {nextProgress.current}/{nextProgress.target}
            </span>
          </div>
        </div>
      )}

      {/* Achievements grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {EGE_ACHIEVEMENTS.map((ach) => {
          const isEarned = earned.has(ach.id);
          const progress = ach.progress && stats ? ach.progress(stats) : null;

          return (
            <AchievementCard
              key={ach.id}
              achievement={ach}
              isEarned={isEarned}
              progress={progress}
            />
          );
        })}
      </div>
    </div>
  );
}

function AchievementCard({
  achievement,
  isEarned,
  progress,
}: {
  achievement: EgeAchievement;
  isEarned: boolean;
  progress: { current: number; target: number } | null;
}) {
  return (
    <div
      className={`rounded-xl border p-4 transition-all ${
        isEarned
          ? "border-yellow-500/30 bg-yellow-500/5"
          : "border-gray-800 bg-gray-900/50 opacity-50"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`text-3xl ${isEarned ? "" : "grayscale"}`}
        >
          {achievement.icon}
        </span>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-bold text-sm ${
              isEarned ? "text-white" : "text-gray-500"
            }`}
          >
            {achievement.title}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {achievement.description}
          </p>

          {/* Progress bar for unearned */}
          {!isEarned && progress && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-600 rounded-full"
                  style={{
                    width: `${Math.round((progress.current / progress.target) * 100)}%`,
                  }}
                />
              </div>
              <span className="text-[10px] text-gray-600">
                {progress.current}/{progress.target}
              </span>
            </div>
          )}

          {isEarned && (
            <div className="mt-1.5 text-[10px] text-yellow-500/70 font-semibold uppercase tracking-wider">
              Получено
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
