"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCompletedVariants } from "@/lib/ege-stats";

export default function VariantsPage() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCompleted(getCompletedVariants());
    setLoaded(true);
  }, []);

  const variants = Array.from({ length: 50 }, (_, i) => i + 1);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Варианты ЕГЭ по математике
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Выберите вариант для прохождения пробного экзамена
          </p>
        </div>
        <Link
          href="/course/ege-math/stats"
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Статистика
        </Link>
      </div>

      {loaded && completed.length > 0 && (
        <p className="text-sm text-gray-500">
          Пройдено вариантов: {completed.length} из 50
        </p>
      )}

      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
        {variants.map((n) => {
          const done = completed.includes(n);
          return (
            <Link
              key={n}
              href={`/course/ege-math/exam?variant=${n}`}
              className={`aspect-square flex items-center justify-center rounded-lg text-sm font-bold transition-all hover:scale-105 border ${
                done
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/30"
                  : "bg-gray-800/60 border-gray-700/50 text-gray-400 hover:bg-gray-700/60 hover:text-white"
              }`}
            >
              {n}
            </Link>
          );
        })}
      </div>

      <div className="flex gap-4 justify-center text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/40" />{" "}
          Пройден
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-gray-800/60 border border-gray-700/50" />{" "}
          Не пройден
        </span>
      </div>
    </div>
  );
}
