"use client";

import { useEffect, useState, useCallback } from "react";
import { allMathTopics } from "@/lib/ege-math";
import { MathTask } from "@/types/math";
import {
  loadStats,
  saveStats,
  updateStreak,
  checkAndUnlockAchievements,
  EgeAchievement,
} from "@/lib/ege-achievements";

const DAILY_KEY = "ege-daily-variant";
const TASKS_COUNT = 5;
const TIME_LIMIT = 15 * 60; // 15 minutes in seconds

interface DailyTask {
  taskNumber: number;
  task: MathTask;
}

interface DailyResult {
  date: string;
  score: number;
  total: number;
  answers: string[];
}

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function getDailyResult(): DailyResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DAILY_KEY);
    if (!raw) return null;
    const result = JSON.parse(raw) as DailyResult;
    return result.date === getTodayKey() ? result : null;
  } catch {
    return null;
  }
}

function generateDailyTasks(): DailyTask[] {
  // Pick 5 random types from 1-18
  const availableTypes = allMathTopics.filter((t) => t.tasks.length > 0);
  const shuffled = [...availableTypes].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, TASKS_COUNT);

  return selected.map((topic) => {
    const randomTask =
      topic.tasks[Math.floor(Math.random() * topic.tasks.length)];
    return { taskNumber: topic.taskNumber, task: randomTask };
  });
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function DailyPage() {
  const [alreadyDone, setAlreadyDone] = useState<DailyResult | null>(null);
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [score, setScore] = useState(0);
  const [newAchievements, setNewAchievements] = useState<EgeAchievement[]>([]);

  useEffect(() => {
    const result = getDailyResult();
    if (result) {
      setAlreadyDone(result);
    }
  }, []);

  const startVariant = useCallback(() => {
    const daily = generateDailyTasks();
    setTasks(daily);
    setAnswers(new Array(daily.length).fill(""));
    setStarted(true);
    setTimeLeft(TIME_LIMIT);
  }, []);

  // Timer
  useEffect(() => {
    if (!started || finished) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, finished, timeLeft]);

  const handleSubmit = useCallback(() => {
    let correct = 0;
    tasks.forEach((dt, i) => {
      const userAnswer = answers[i].trim().replace(",", ".");
      const correctAnswer = dt.task.answer.trim().replace(",", ".");
      const tolerance = dt.task.tolerance ?? 0;

      const numUser = parseFloat(userAnswer);
      const numCorrect = parseFloat(correctAnswer);

      if (!isNaN(numUser) && !isNaN(numCorrect)) {
        if (Math.abs(numUser - numCorrect) <= tolerance) correct++;
      } else if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        correct++;
      }
    });

    setScore(correct);
    setFinished(true);

    // Save result
    const result: DailyResult = {
      date: getTodayKey(),
      score: correct,
      total: tasks.length,
      answers,
    };
    localStorage.setItem(DAILY_KEY, JSON.stringify(result));

    // Update stats
    const stats = loadStats();
    stats.totalTasksSolved += correct;
    stats.todaySolved += correct;
    stats.streakDays = updateStreak();
    saveStats(stats);

    const unlocked = checkAndUnlockAchievements(stats);
    if (unlocked.length > 0) setNewAchievements(unlocked);
  }, [tasks, answers]);

  // Already completed today
  if (alreadyDone) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Уже решено сегодня
          </h1>
          <p className="text-gray-400 mb-4">
            Результат: {alreadyDone.score}/{alreadyDone.total} правильно
          </p>
          <p className="text-sm text-gray-500">
            Приходите завтра за новым мини-вариантом
          </p>
        </div>
      </div>
    );
  }

  // Not started
  if (!started) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-8 text-center">
          <div className="text-5xl mb-4">⚡</div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Ежедневный мини-вариант
          </h1>
          <p className="text-gray-400 mb-6">
            5 случайных задач из разных типов. Время: 15 минут.
          </p>
          <button
            onClick={startVariant}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            Начать
          </button>
        </div>
      </div>
    );
  }

  // Finished
  if (finished) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 text-center mb-6">
          <div className="text-5xl mb-4">
            {score === tasks.length ? "🎉" : score >= 3 ? "👍" : "💪"}
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Результат</h1>
          <div className="text-5xl font-bold text-emerald-400 mb-2">
            {score}/{tasks.length}
          </div>
          <p className="text-gray-400">
            {score === tasks.length
              ? "Отлично! Все задачи решены верно!"
              : score >= 3
              ? "Хороший результат, продолжай!"
              : "Есть над чем поработать"}
          </p>
        </div>

        {/* New achievements */}
        {newAchievements.length > 0 && (
          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 mb-6">
            <p className="text-yellow-400 font-semibold mb-2">
              Новые достижения:
            </p>
            {newAchievements.map((a) => (
              <div key={a.id} className="flex items-center gap-2 text-white">
                <span className="text-xl">{a.icon}</span>
                <span className="font-semibold">{a.title}</span>
                <span className="text-gray-500 text-sm">
                  — {a.description}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Answers breakdown */}
        <div className="space-y-3">
          {tasks.map((dt, i) => {
            const userAnswer = answers[i].trim().replace(",", ".");
            const correctAnswer = dt.task.answer.trim().replace(",", ".");
            const tolerance = dt.task.tolerance ?? 0;
            const numUser = parseFloat(userAnswer);
            const numCorrect = parseFloat(correctAnswer);
            let isCorrect = false;
            if (!isNaN(numUser) && !isNaN(numCorrect)) {
              isCorrect = Math.abs(numUser - numCorrect) <= tolerance;
            } else {
              isCorrect =
                userAnswer.toLowerCase() === correctAnswer.toLowerCase();
            }

            return (
              <div
                key={i}
                className={`rounded-lg border p-4 ${
                  isCorrect
                    ? "border-emerald-500/20 bg-emerald-500/5"
                    : "border-red-500/20 bg-red-500/5"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">
                    Задание {dt.taskNumber}
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      isCorrect ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {isCorrect ? "Верно" : "Неверно"}
                  </span>
                </div>
                <p className="text-white text-sm mb-1">{dt.task.description}</p>
                <div className="flex gap-4 text-xs mt-2">
                  <span className="text-gray-400">
                    Ваш ответ:{" "}
                    <span className="text-white">{answers[i] || "—"}</span>
                  </span>
                  <span className="text-gray-400">
                    Правильный:{" "}
                    <span className="text-emerald-400">{dt.task.answer}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // In progress
  return (
    <div className="max-w-2xl mx-auto">
      {/* Timer bar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Мини-вариант</h1>
        <div
          className={`text-lg font-mono font-bold ${
            timeLeft <= 60 ? "text-red-400" : "text-gray-300"
          }`}
        >
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress */}
      <div className="h-1 bg-gray-800 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all"
          style={{ width: `${((TIME_LIMIT - timeLeft) / TIME_LIMIT) * 100}%` }}
        />
      </div>

      {/* Tasks */}
      <div className="space-y-6">
        {tasks.map((dt, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-800 bg-gray-900 p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              <span className="text-xs text-gray-500">
                Тип {dt.taskNumber}
              </span>
            </div>
            <p className="text-white text-sm mb-3">{dt.task.description}</p>
            <input
              type="text"
              value={answers[i]}
              onChange={(e) => {
                const next = [...answers];
                next[i] = e.target.value;
                setAnswers(next);
              }}
              placeholder="Ваш ответ"
              className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full mt-8 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
      >
        Завершить и проверить
      </button>
    </div>
  );
}
