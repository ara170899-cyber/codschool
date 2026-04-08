"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getExamHistory,
  getTaskStats,
  getPredictedScore,
  getHeatmapData,
  ExamResult,
  TaskStat,
  HeatmapItem,
} from "@/lib/ege-stats";

export default function StatsPage() {
  const [predicted, setPredicted] = useState(0);
  const [heatmap, setHeatmap] = useState<HeatmapItem[]>([]);
  const [history, setHistory] = useState<ExamResult[]>([]);
  const [taskStats, setTaskStats] = useState<TaskStat[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setPredicted(getPredictedScore());
    setHeatmap(getHeatmapData());
    setHistory(getExamHistory().slice(0, 10));
    setTaskStats(getTaskStats());
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-400">Загрузка статистики...</div>
      </div>
    );
  }

  const hasData = history.length > 0;

  const scoreColor =
    predicted >= 80
      ? "text-emerald-400"
      : predicted >= 60
        ? "text-yellow-400"
        : "text-red-400";

  const scoreBg =
    predicted >= 80
      ? "bg-emerald-500/10 border-emerald-500/30"
      : predicted >= 60
        ? "bg-yellow-500/10 border-yellow-500/30"
        : "bg-red-500/10 border-red-500/30";

  const statusColor = (status: string) => {
    switch (status) {
      case "strong":
        return "bg-emerald-500/30 border-emerald-500/40 text-emerald-300";
      case "medium":
        return "bg-yellow-500/30 border-yellow-500/40 text-yellow-300";
      case "weak":
        return "bg-red-500/30 border-red-500/40 text-red-300";
      default:
        return "bg-gray-800 border-gray-700 text-gray-500";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          Статистика ЕГЭ
        </h1>
        <Link
          href="/course/ege-math/variants"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Начать экзамен
        </Link>
      </div>

      {!hasData ? (
        <div className="bg-gray-800/60 rounded-xl p-12 border border-gray-700/50 text-center">
          <p className="text-gray-400 text-lg mb-4">
            Пока нет данных. Пройдите хотя бы один пробный экзамен.
          </p>
          <Link
            href="/course/ege-math/exam?variant=1"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            Пройти пробный экзамен
          </Link>
        </div>
      ) : (
        <>
          {/* Predicted score */}
          <div
            className={`rounded-xl p-8 border text-center ${scoreBg}`}
          >
            <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider font-semibold">
              Прогнозируемый балл
            </p>
            <p className={`text-6xl font-bold ${scoreColor}`}>
              {predicted}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              на основе {history.length} пробных экзаменов
            </p>
          </div>

          {/* Heatmap */}
          <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50">
            <h2 className="text-lg font-semibold text-white mb-4">
              Тепловая карта заданий
            </h2>
            <div className="grid grid-cols-6 gap-2">
              {heatmap.map((item) => (
                <div
                  key={item.taskNumber}
                  className={`rounded-lg p-3 border text-center ${statusColor(
                    item.status
                  )}`}
                >
                  <div className="text-xs font-bold mb-1">
                    {item.taskNumber}
                  </div>
                  <div className="text-[10px] leading-tight opacity-80">
                    {item.title}
                  </div>
                  <div className="text-sm font-bold mt-1">
                    {item.percentage}%
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-4 justify-center text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-emerald-500/30" /> 70%+
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-yellow-500/30" /> 40-69%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-red-500/30" /> &lt;40%
              </span>
            </div>
          </div>

          {/* Task bar chart */}
          <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50">
            <h2 className="text-lg font-semibold text-white mb-4">
              Статистика по заданиям
            </h2>
            <div className="space-y-2">
              {taskStats.map((stat) => (
                <div key={stat.taskNumber} className="flex items-center gap-3">
                  <div className="w-6 text-xs text-gray-500 text-right font-mono">
                    {stat.taskNumber}
                  </div>
                  <div className="flex-1 bg-gray-900 rounded-full h-5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        stat.percentage >= 70
                          ? "bg-emerald-500/60"
                          : stat.percentage >= 40
                            ? "bg-yellow-500/60"
                            : "bg-red-500/60"
                      }`}
                      style={{ width: `${Math.max(stat.percentage, 2)}%` }}
                    />
                  </div>
                  <div className="w-16 text-xs text-gray-400 text-right">
                    {stat.correct}/{stat.attempts}{" "}
                    <span className="text-gray-600">
                      ({stat.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exam history */}
          <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50">
            <h2 className="text-lg font-semibold text-white mb-4">
              История экзаменов
            </h2>
            <div className="space-y-2">
              {history.map((exam) => {
                const date = new Date(exam.date);
                const dateStr = date.toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });
                const timeStr = date.toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <div
                    key={exam.id}
                    className="flex items-center justify-between px-4 py-3 bg-gray-900/50 rounded-lg border border-gray-700/30"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">
                        {dateStr}, {timeStr}
                      </span>
                      <span className="text-sm text-gray-400">
                        Вариант {exam.variant}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">
                        {exam.primaryScore}/33
                      </span>
                      <span
                        className={`text-lg font-bold ${
                          exam.testScore >= 80
                            ? "text-emerald-400"
                            : exam.testScore >= 60
                              ? "text-yellow-400"
                              : "text-red-400"
                        }`}
                      >
                        {exam.testScore}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
