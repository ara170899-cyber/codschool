"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import Link from "next/link";
import { generateVariant, VariantTask } from "@/lib/ege-variants";
import {
  calculatePrimaryScore,
  primaryToTestScore,
  saveExamResult,
  getTaskPoints,
  getTaskTitle,
} from "@/lib/ege-stats";

const EXAM_DURATION = 235 * 60; // 3h 55m in seconds

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function normalizeAnswer(answer: string): string {
  return answer.trim().replace(/,/g, ".").toLowerCase();
}

function checkAnswer(userAnswer: string, correctAnswer: string, tolerance?: number): boolean {
  const ua = normalizeAnswer(userAnswer);
  const ca = normalizeAnswer(correctAnswer);

  if (ua === ca) return true;

  const uaNum = parseFloat(ua);
  const caNum = parseFloat(ca);

  if (!isNaN(uaNum) && !isNaN(caNum)) {
    if (tolerance) {
      return Math.abs(uaNum - caNum) <= tolerance;
    }
    return uaNum === caNum;
  }

  return false;
}

function ExamContent() {
  const searchParams = useSearchParams();
  const variantNumber = parseInt(searchParams.get("variant") || "1", 10);

  const [variant, setVariant] = useState<VariantTask[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [finished, setFinished] = useState(false);
  const [results, setResults] = useState<{
    primaryScore: number;
    testScore: number;
    taskResults: Record<number, boolean>;
  } | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setVariant(generateVariant(variantNumber));
  }, [variantNumber]);

  useEffect(() => {
    if (finished) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [finished]);

  useEffect(() => {
    if (timeLeft === 0 && !finished) {
      handleFinish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const handleFinish = useCallback(() => {
    if (finished) return;
    setFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const taskResults: Record<number, boolean> = {};
    const correctAnswers: Record<number, string> = {};

    for (const vt of variant) {
      correctAnswers[vt.taskNumber] = vt.task.answer;
      const userAnswer = answers[vt.taskNumber] || "";
      taskResults[vt.taskNumber] = checkAnswer(userAnswer, vt.task.answer, vt.task.tolerance);
    }

    const primaryScore = calculatePrimaryScore(taskResults);
    const testScore = primaryToTestScore(primaryScore);

    setResults({ primaryScore, testScore, taskResults });

    saveExamResult({
      id: `${Date.now()}-${variantNumber}`,
      date: new Date().toISOString(),
      variant: variantNumber,
      answers,
      correctAnswers,
      primaryScore,
      testScore,
      taskResults,
      timeSpentSeconds: EXAM_DURATION - timeLeft,
    });
  }, [finished, variant, answers, variantNumber, timeLeft]);

  const setAnswer = (taskNumber: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [taskNumber]: value }));
  };

  const isTimeLow = timeLeft < 30 * 60;

  if (variant.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-400">Загрузка варианта...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Пробный ЕГЭ по математике
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Вариант {variantNumber}
          </p>
        </div>
        {!finished && (
          <div
            className={`text-3xl font-mono font-bold px-4 py-2 rounded-lg ${
              isTimeLow
                ? "bg-red-500/20 text-red-400 animate-pulse"
                : "bg-gray-800 text-white"
            }`}
          >
            {formatTime(timeLeft)}
          </div>
        )}
      </div>

      {/* Answer fields or Results */}
      {!finished ? (
        <>
          <div className="grid gap-3">
            {variant.map((vt) => (
              <div
                key={vt.taskNumber}
                className="flex items-center gap-4 bg-gray-800/60 rounded-lg px-4 py-3 border border-gray-700/50"
              >
                <div className="flex items-center gap-3 min-w-[180px]">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      vt.taskNumber <= 11
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {vt.taskNumber}
                  </span>
                  <div>
                    <span className="text-sm text-gray-300">
                      {getTaskTitle(vt.taskNumber)}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      ({getTaskPoints(vt.taskNumber)} б.)
                    </span>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Ответ..."
                  value={answers[vt.taskNumber] || ""}
                  onChange={(e) => setAnswer(vt.taskNumber, e.target.value)}
                  className="flex-1 bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={handleFinish}
              className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Завершить экзамен
            </button>
          </div>
        </>
      ) : results ? (
        <div className="space-y-6">
          {/* Score cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50 text-center">
              <p className="text-gray-400 text-sm mb-1">Первичный балл</p>
              <p className="text-4xl font-bold text-white">
                {results.primaryScore}
                <span className="text-lg text-gray-500"> / 33</span>
              </p>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50 text-center">
              <p className="text-gray-400 text-sm mb-1">Тестовый балл</p>
              <p
                className={`text-4xl font-bold ${
                  results.testScore >= 80
                    ? "text-emerald-400"
                    : results.testScore >= 60
                      ? "text-yellow-400"
                      : "text-red-400"
                }`}
              >
                {results.testScore}
                <span className="text-lg text-gray-500"> / 100</span>
              </p>
            </div>
          </div>

          {/* Per-task results */}
          <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50">
            <h2 className="text-lg font-semibold text-white mb-4">
              Результаты по заданиям
            </h2>
            <div className="grid gap-2">
              {variant.map((vt) => {
                const correct = results.taskResults[vt.taskNumber];
                return (
                  <div
                    key={vt.taskNumber}
                    className={`flex items-center justify-between px-4 py-2 rounded-lg ${
                      correct
                        ? "bg-emerald-500/10 border border-emerald-500/20"
                        : "bg-red-500/10 border border-red-500/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-lg ${
                          correct ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {correct ? "+" : "-"}
                      </span>
                      <span className="text-sm text-gray-300">
                        Задание {vt.taskNumber}: {getTaskTitle(vt.taskNumber)}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({getTaskPoints(vt.taskNumber)} б.)
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">
                        Ваш: {answers[vt.taskNumber] || "—"}
                      </span>
                      {!correct && (
                        <span className="text-emerald-400">
                          Верный: {vt.task.answer}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <Link
              href={`/course/ege-math/exam?variant=${variantNumber + 1}`}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
            >
              Следующий вариант
            </Link>
            <Link
              href="/course/ege-math/stats"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              Статистика
            </Link>
            <Link
              href="/course/ege-math/variants"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              Все варианты
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function ExamPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-gray-400">Загрузка...</div>
        </div>
      }
    >
      <ExamContent />
    </Suspense>
  );
}
