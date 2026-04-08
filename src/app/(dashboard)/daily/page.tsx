"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CodeEditor } from "@/components/code-editor";
import { Terminal } from "@/components/terminal";
import { runPythonInBrowser } from "@/lib/pyodide-runner";
import { getTodayChallenge, getChallengeByDate, DailyChallenge } from "@/lib/daily-challenges";

const DAILY_KEY = "codeschool_daily_results";

interface DailyResult {
  date: string;
  challengeId: string;
  challengeTitle: string;
  timeSeconds: number;
  passed: boolean;
}

function getDateStr(offset = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split("T")[0];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[.,!?;:'"()\u2014\u2013\-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function softMatch(actual: string, expected: string): boolean {
  if (actual.trim() === expected.trim()) return true;
  const normActual = normalize(actual);
  const normExpected = normalize(expected);
  if (normActual === normExpected) return true;
  const aLines = actual.trim().split("\n").map(normalize);
  const eLines = expected.trim().split("\n").map(normalize);
  if (aLines.length !== eLines.length) return false;
  return aLines.every((line, i) => line === eLines[i]);
}

function loadResults(): DailyResult[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(DAILY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveResult(result: DailyResult) {
  const results = loadResults();
  const existing = results.findIndex((r) => r.date === result.date);
  if (existing >= 0) {
    results[existing] = result;
  } else {
    results.push(result);
  }
  localStorage.setItem(DAILY_KEY, JSON.stringify(results));
}

function calculateStreak(): number {
  const results = loadResults().filter((r) => r.passed);
  if (results.length === 0) return 0;

  const passedDates = new Set(results.map((r) => r.date));
  let streak = 0;
  const d = new Date();

  // Check today first
  const today = d.toISOString().split("T")[0];
  if (!passedDates.has(today)) {
    // Maybe streak is still active from yesterday
    d.setDate(d.getDate() - 1);
  }

  while (true) {
    const dateStr = d.toISOString().split("T")[0];
    if (passedDates.has(dateStr)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

const difficultyLabels: Record<number, { text: string; color: string }> = {
  1: { text: "Легко", color: "text-green-400 bg-green-400/10 border-green-400/20" },
  2: { text: "Средне", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
  3: { text: "Сложно", color: "text-red-400 bg-red-400/10 border-red-400/20" },
};

export default function DailyChallengePage() {
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState<"run" | "check" | null>(null);
  const [hintIndex, setHintIndex] = useState(-1);
  const [completed, setCompleted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [streak, setStreak] = useState(0);
  const [pastResults, setPastResults] = useState<(DailyResult | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const todayStr = getDateStr();

  useEffect(() => {
    const ch = getTodayChallenge();
    setChallenge(ch);
    setCode(ch.starterCode);

    // Check if already completed today
    const results = loadResults();
    const todayResult = results.find((r) => r.date === todayStr);
    if (todayResult?.passed) {
      setCompleted(true);
      setElapsedSeconds(todayResult.timeSeconds);
    }

    setStreak(calculateStreak());

    // Load past 7 days
    const past: (DailyResult | null)[] = [];
    for (let i = 1; i <= 7; i++) {
      const dateStr = getDateStr(-i);
      const result = results.find((r) => r.date === dateStr);
      if (result) {
        past.push(result);
      } else {
        const pastChallenge = getChallengeByDate(dateStr);
        past.push({ date: dateStr, challengeId: pastChallenge.id, challengeTitle: pastChallenge.title, timeSeconds: 0, passed: false });
      }
    }
    setPastResults(past);
  }, [todayStr]);

  // Timer
  useEffect(() => {
    if (completed) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [completed]);

  const handleRun = useCallback(async () => {
    if (!challenge) return;
    setLoading("run");
    setOutput("Загрузка Python...");
    setIsError(false);

    try {
      const result = await runPythonInBrowser(code);
      if (result.stderr) {
        setOutput(result.stderr);
        setIsError(true);
      } else {
        setOutput(result.stdout || "(нет вывода)");
        setIsError(false);
      }
    } catch {
      setOutput("Ошибка запуска Python");
      setIsError(true);
    }
    setLoading(null);
  }, [challenge, code]);

  const handleCheck = useCallback(async () => {
    if (!challenge) return;
    setLoading("check");
    setOutput("Проверка...");
    setIsError(false);

    try {
      let allPassed = true;
      const lines: string[] = [];

      for (let i = 0; i < challenge.tests.length; i++) {
        const test = challenge.tests[i];
        const result = await runPythonInBrowser(code, test.input);

        if (result.stderr) {
          allPassed = false;
          lines.push(`Тест ${i + 1}: ОШИБКА - ${result.stderr}`);
          continue;
        }

        const actual = result.stdout.trim();
        const expected = test.expected.trim();
        const passed = softMatch(actual, expected);

        if (passed) {
          lines.push(`Тест ${i + 1}: OK`);
        } else {
          allPassed = false;
          lines.push(`Тест ${i + 1}: НЕВЕРНО\n  Ввод: ${test.input}\n  Ожидалось: ${expected}\n  Получено: ${actual}`);
        }
      }

      if (allPassed) {
        setCompleted(true);
        saveResult({
          date: todayStr,
          challengeId: challenge.id,
          challengeTitle: challenge.title,
          timeSeconds: elapsedSeconds,
          passed: true,
        });
        setStreak(calculateStreak());
        setOutput(`Все тесты пройдены! Время: ${formatTime(elapsedSeconds)}`);
        setIsError(false);
      } else {
        setOutput(lines.join("\n\n"));
        setIsError(true);
      }
    } catch {
      setOutput("Ошибка проверки");
      setIsError(true);
    }
    setLoading(null);
  }, [challenge, code, elapsedSeconds, todayStr]);

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400">Загрузка...</div>
      </div>
    );
  }

  const diff = difficultyLabels[challenge.difficulty];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl sm:text-2xl font-bold">Задача дня</h1>
              {streak > 0 && (
                <span className="text-sm bg-orange-500/10 text-orange-400 border border-orange-400/20 rounded-full px-3 py-0.5">
                  {streak} {streak === 1 ? "день" : streak < 5 ? "дня" : "дней"} подряд 🔥
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm">{formatDate(todayStr)}</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Timer */}
            <div className={`font-mono text-lg px-3 py-1 rounded-lg border ${completed ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" : "border-gray-700 bg-gray-900 text-gray-300"}`}>
              {formatTime(elapsedSeconds)}
            </div>
            {completed && (
              <span className="text-emerald-400 font-semibold text-sm">Решено!</span>
            )}
          </div>
        </div>

        {/* Challenge info */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-lg font-semibold">{challenge.title}</h2>
            <span className={`text-xs px-2 py-0.5 rounded border ${diff.color}`}>{diff.text}</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{challenge.description}</p>

          {/* Hints */}
          {hintIndex >= 0 && (
            <div className="mt-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3">
              <p className="text-sm text-yellow-300">
                Подсказка {hintIndex + 1}/{challenge.hints.length}: {challenge.hints[hintIndex]}
              </p>
            </div>
          )}
        </div>

        {/* Editor + Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Code Editor */}
          <div className="h-[400px]">
            <CodeEditor value={code} onChange={setCode} />
          </div>

          {/* Terminal */}
          <div className="h-[400px]">
            <Terminal output={output} isError={isError} />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={handleRun}
            disabled={loading !== null}
            className="px-5 py-2.5 rounded-lg bg-gray-700 text-white text-sm font-medium hover:bg-gray-600 disabled:opacity-50 transition-colors"
          >
            {loading === "run" ? "Запуск..." : "▶ Запустить"}
          </button>
          <button
            onClick={handleCheck}
            disabled={loading !== null || completed}
            className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500 disabled:opacity-50 transition-colors"
          >
            {loading === "check" ? "Проверка..." : "✓ Проверить"}
          </button>
          <button
            onClick={() => {
              if (hintIndex < challenge.hints.length - 1) setHintIndex(hintIndex + 1);
            }}
            disabled={hintIndex >= challenge.hints.length - 1}
            className="px-4 py-2.5 rounded-lg bg-yellow-600/20 text-yellow-400 text-sm font-medium hover:bg-yellow-600/30 disabled:opacity-50 transition-colors"
          >
            💡 Подсказка
          </button>
        </div>

        {/* Past 7 days */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
          <h3 className="text-base font-semibold mb-4">Последние 7 дней</h3>
          <div className="grid grid-cols-7 gap-2">
            {pastResults.map((result, i) => {
              if (!result) return <div key={i} />;
              return (
                <div
                  key={result.date}
                  className={`rounded-lg border p-3 text-center ${
                    result.passed
                      ? "border-emerald-500/30 bg-emerald-500/10"
                      : "border-gray-700 bg-gray-800/50"
                  }`}
                >
                  <p className="text-xs text-gray-400 mb-1">{formatDate(result.date)}</p>
                  <p className="text-lg">{result.passed ? "✅" : "—"}</p>
                  {result.passed && result.timeSeconds > 0 && (
                    <p className="text-xs text-emerald-400 mt-1">{formatTime(result.timeSeconds)}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
