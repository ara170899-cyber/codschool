"use client";

import { useAuth } from "@/hooks/use-auth";
import { useLocalProgress } from "@/hooks/use-local-progress";
import { ProgressBar } from "@/components/progress-bar";
import { badgeDefinitions } from "@/lib/badges";
import { lessons } from "@/lib/lessons";
import Link from "next/link";
import { pluralize } from "@/lib/utils";

const TOTAL_LESSONS = lessons.length;

export default function ProfilePage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { isCompleted, completedCount, xp, level, streak } = useLocalProgress();

  if (authLoading) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <p className="text-gray-500 text-center">Загрузка...</p>
      </div>
    );
  }

  const percentage = TOTAL_LESSONS > 0 ? Math.round((completedCount / TOTAL_LESSONS) * 100) : 0;

  // Calculate earned badges from localStorage completedLessons
  const completedIds = lessons.filter((l) => isCompleted(l.id)).map((l) => l.id);
  const earnedBadges = badgeDefinitions.filter((badge) =>
    badge.condition(completedIds)
  );

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* User info */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {user?.user_metadata?.name || "Ученик"}
          </h1>
          <p className="text-sm text-gray-500">{user?.email || "Гость"}</p>
        </div>
        <div className="flex items-center gap-3">
          {streak > 0 && (
            <span className="px-3 py-1.5 rounded-lg bg-gray-800 text-sm">
              🔥 {streak} {pluralize(streak, "день", "дня", "дней")}
            </span>
          )}
          {user && (
            <button
              onClick={signOut}
              className="px-4 py-2 rounded-lg border border-gray-700 text-gray-400 text-sm hover:bg-gray-800 transition-colors"
            >
              Выйти
            </button>
          )}
        </div>
      </div>

      {/* Level + XP */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-3xl">{level.icon}</span>
          <div>
            <p className="text-lg font-bold text-emerald-400">{level.name}</p>
            <p className="text-sm text-gray-500">{xp} XP</p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Прогресс</h2>
          <span className="text-sm text-emerald-400 font-medium">
            {completedCount} / {TOTAL_LESSONS} уроков
          </span>
        </div>
        <ProgressBar progress={percentage} />
        <p className="text-sm text-gray-500">{percentage}% пройдено</p>

        {/* Lesson list */}
        <div className="space-y-1 pt-2 max-h-96 overflow-y-auto">
          {lessons.map((lesson) => {
            const done = isCompleted(lesson.id);
            return (
              <Link key={lesson.id} href={`/lesson/${lesson.id}`}
                className="flex items-center gap-3 text-sm py-1 hover:bg-gray-800/50 px-2 rounded transition-colors">
                <span className={done ? "text-emerald-400" : "text-gray-600"}>
                  {done ? "✅" : "○"}
                </span>
                <span className={done ? "text-gray-300" : "text-gray-500"}>
                  {lesson.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Certificate */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Сертификат</h2>
          <p className="text-sm text-gray-400 mt-1">
            {completedCount >= 50
              ? "Ваш сертификат готов!"
              : `Пройдите ещё ${50 - completedCount} уроков для получения`}
          </p>
        </div>
        <Link
          href="/certificate"
          className="px-5 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-sm hover:bg-emerald-500/20 transition-colors whitespace-nowrap"
        >
          Открыть
        </Link>
      </div>

      {/* Badges */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <h2 className="text-lg font-semibold text-white mb-1">Достижения</h2>
        <p className="text-sm text-gray-500 mb-4">{earnedBadges.length} из {badgeDefinitions.length} получено</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {badgeDefinitions.map((badge) => {
            const earned = earnedBadges.some((b) => b.type === badge.type);
            return (
              <div
                key={badge.type}
                className={`rounded-lg border p-3 text-center transition-colors ${
                  earned
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-gray-800 bg-gray-800/30 opacity-40"
                }`}
              >
                <div className="text-2xl mb-1">{badge.icon}</div>
                <div className={`text-xs font-medium ${earned ? "text-white" : "text-gray-500"}`}>
                  {badge.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset onboarding */}
      <div className="text-center pt-4">
        <button
          onClick={() => {
            localStorage.removeItem("codeschool_onboarding_done");
            window.location.href = "/courses";
          }}
          className="text-sm text-gray-500 hover:text-emerald-400 transition-colors"
        >
          Пройти обучение заново
        </button>
      </div>
    </div>
  );
}
