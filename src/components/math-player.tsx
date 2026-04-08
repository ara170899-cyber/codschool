"use client";

import { useState, useCallback } from "react";
import type { MathTopic, MathTask } from "@/types/math";
import { MathAIChat } from "@/components/math-ai-chat";
import { formulaSections } from "@/lib/formula-reference";
import { egeCommonMistakes } from "@/lib/ege-common-mistakes";
import { playSuccessSound } from "@/lib/utils";

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function DifficultyStars({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3].map((i) => (
        <span key={i} className={i <= level ? "text-yellow-400" : "text-gray-600"}>
          ★
        </span>
      ))}
    </span>
  );
}

// Normalize math input: √ → sqrt, π → pi, etc. and try to evaluate
function normalizeMath(s: string): string {
  return s
    .trim()
    .replace(/,/g, ".")
    .replace(/√/g, "sqrt")
    .replace(/π/g, "pi")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/\s+/g, "")
    .toLowerCase();
}

function tryEvaluate(s: string): number | null {
  const normalized = normalizeMath(s);
  try {
    // Strict allowlist: only digits, operators, sqrt, pi, parens, dots
    if (!/^[0-9+\-*/().^sqrtpi ]+$/.test(normalized)) return null;

    // Manual safe evaluation — no Function() or eval()
    const expr = normalized
      .replace(/pi/g, String(Math.PI))
      .replace(/sqrt\(([0-9.]+)\)/g, (_, n) => String(Math.sqrt(parseFloat(n))))
      .replace(/([0-9.]+)\^([0-9.]+)/g, (_, b, e) => String(Math.pow(parseFloat(b), parseFloat(e))));

    // Only evaluate simple arithmetic: digits, +, -, *, /, (, ), .
    if (!/^[0-9+\-*/(). ]+$/.test(expr)) return null;
    // Additional safety: no nested parens deeper than 2
    if ((expr.match(/\(/g) || []).length > 3) return null;

    // Parse with safe arithmetic only
    const result = parseFloat(expr);
    if (!isNaN(result) && isFinite(result)) return result;

    // Try simple a op b patterns
    const match = expr.match(/^([0-9.]+)\s*([+\-*/])\s*([0-9.]+)$/);
    if (match) {
      const [, a, op, b] = match;
      const na = parseFloat(a), nb = parseFloat(b);
      if (op === "+") return na + nb;
      if (op === "-") return na - nb;
      if (op === "*") return na * nb;
      if (op === "/" && nb !== 0) return na / nb;
    }

    return null;
  } catch {
    return null;
  }
}

function checkAnswer(userAnswer: string, task: MathTask): boolean {
  const trimmed = userAnswer.trim();
  const expected = task.answer.trim();

  // Direct string match
  if (trimmed.toLowerCase() === expected.toLowerCase()) return true;

  // Normalized string match
  if (normalizeMath(trimmed) === normalizeMath(expected)) return true;

  // Numeric comparison
  const tolerance = task.tolerance ?? 0.01;
  const userNum = tryEvaluate(trimmed) ?? parseFloat(trimmed.replace(",", "."));
  const expectedNum = tryEvaluate(expected) ?? parseFloat(expected.replace(",", "."));

  if (!isNaN(userNum) && !isNaN(expectedNum)) {
    return Math.abs(userNum - expectedNum) <= tolerance;
  }

  return false;
}

function SuccessAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="animate-bounce text-6xl">
        🎉
      </div>
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ["#10b981", "#f59e0b", "#3b82f6", "#ef4444", "#8b5cf6"][i % 5],
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${0.8 + Math.random() * 0.4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function MathPlayer({ topic }: { topic: MathTopic }) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const [showAIChat, setShowAIChat] = useState(false);
  const [showFormulas, setShowFormulas] = useState(false);
  const [showMistakes, setShowMistakes] = useState(false);
  const [formulaSearch, setFormulaSearch] = useState("");

  const task = topic.tasks[currentTaskIndex];
  const totalTasks = topic.tasks.length;

  const handleCheck = useCallback(() => {
    if (!userAnswer.trim()) return;

    const isCorrect = checkAnswer(userAnswer, task);
    setResult(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setCompletedTasks((prev) => new Set(prev).add(currentTaskIndex));
      playSuccessSound();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    }
  }, [userAnswer, task, currentTaskIndex]);

  const handleNext = useCallback(() => {
    if (currentTaskIndex < totalTasks - 1) {
      setCurrentTaskIndex((prev) => prev + 1);
      setUserAnswer("");
      setResult(null);
      setShowSolution(false);
    }
  }, [currentTaskIndex, totalTasks]);

  const handlePrev = useCallback(() => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex((prev) => prev - 1);
      setUserAnswer("");
      setResult(null);
      setShowSolution(false);
    }
  }, [currentTaskIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !result) {
      handleCheck();
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)]">
      {showSuccess && <SuccessAnimation />}

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
            Задание {topic.taskNumber}
          </span>
          <DifficultyStars level={task.difficulty} />
        </div>
        <h1 className="text-2xl font-bold text-white">{topic.title}</h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-gray-400">
            Задача {currentTaskIndex + 1} из {totalTasks}
          </span>
          <span className="text-sm text-emerald-400">
            ({completedTasks.size} решено)
          </span>
        </div>
        {/* Task dots */}
        <div className="flex gap-1.5 mt-3">
          {topic.tasks.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentTaskIndex(i);
                setUserAnswer("");
                setResult(null);
                setShowSolution(false);
              }}
              className={`w-8 h-2 rounded-full transition-colors ${
                i === currentTaskIndex
                  ? "bg-emerald-400"
                  : completedTasks.has(i)
                    ? "bg-emerald-500/40"
                    : "bg-gray-700"
              }`}
            />
          ))}
        </div>
        {/* Action buttons */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setShowAIChat(!showAIChat)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border transition-colors ${
              showAIChat
                ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                : "bg-gray-800 border-gray-700 text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
          >
            <span>🤖</span> Помощь
          </button>
          <button
            onClick={() => setShowFormulas(!showFormulas)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border transition-colors ${
              showFormulas
                ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
                : "bg-gray-800 border-gray-700 text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
          >
            <span>📋</span> Формулы
          </button>
        </div>
      </div>

      {/* Formula panel (modal overlay) */}
      {showFormulas && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowFormulas(false)}>
          <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <span>📋</span> Справочник формул
              </h2>
              <button onClick={() => setShowFormulas(false)} className="w-8 h-8 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center text-xl">×</button>
            </div>
            <div className="px-5 py-3 border-b border-gray-800">
              <input
                type="text"
                value={formulaSearch}
                onChange={(e) => setFormulaSearch(e.target.value)}
                placeholder="Поиск формулы..."
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {formulaSections
                .map((section) => ({
                  ...section,
                  formulas: formulaSearch.trim()
                    ? section.formulas.filter(
                        (f) =>
                          f.name.toLowerCase().includes(formulaSearch.toLowerCase()) ||
                          f.formula.toLowerCase().includes(formulaSearch.toLowerCase()) ||
                          section.title.toLowerCase().includes(formulaSearch.toLowerCase())
                      )
                    : section.formulas,
                }))
                .filter((s) => s.formulas.length > 0)
                .map((section, si) => (
                  <div key={si}>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                      <span>{section.icon}</span> {section.title}
                    </h3>
                    <div className="space-y-1">
                      {section.formulas.map((f, fi) => (
                        <div key={fi} className="px-3 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                            <span className="text-xs text-gray-500">{f.name}</span>
                            <span className="text-sm font-mono text-blue-300">{f.formula}</span>
                          </div>
                          {f.note && <p className="text-[10px] text-gray-600 mt-0.5">{f.note}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Main content — two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left panel: Theory */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 overflow-y-auto max-h-[70vh]">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">📖</span> Теория
          </h2>
          <div className="text-gray-300 leading-relaxed whitespace-pre-line text-sm">
            {topic.theory}
          </div>

          {/* Common mistakes */}
          {egeCommonMistakes[topic.taskNumber] && (
            <div className="mt-6">
              <button
                onClick={() => setShowMistakes(!showMistakes)}
                className="flex items-center gap-2 text-sm font-semibold text-yellow-400/80 hover:text-yellow-400 transition-colors"
              >
                <span>{showMistakes ? "▼" : "▶"}</span>
                <span>⚠️ Частые ошибки</span>
              </button>
              {showMistakes && (
                <div className="mt-3 space-y-3">
                  {egeCommonMistakes[topic.taskNumber].map((m, i) => (
                    <div
                      key={i}
                      className="rounded-lg bg-red-500/5 border border-red-500/10 p-3"
                    >
                      <div className="flex items-start gap-2 mb-1.5">
                        <span className="text-red-400 text-xs mt-0.5">✗</span>
                        <span className="text-sm text-red-300 line-through decoration-red-500/30">
                          {m.mistake}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 mb-1.5">
                        <span className="text-emerald-400 text-xs mt-0.5">✓</span>
                        <span className="text-sm text-emerald-300">
                          {m.correct}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 pl-4 mt-1">
                        {m.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right panel: Practice */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">✏️</span> Практика
          </h2>

          {/* Task description */}
          <div className="rounded-lg bg-gray-800/50 border border-gray-700 p-4 mb-6">
            <div className="text-gray-200 whitespace-pre-line text-sm leading-relaxed">
              {task.description}
            </div>
          </div>

          {/* Answer input */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Ваш ответ:</label>
            <input
              id="math-answer"
              type="text"
              value={userAnswer}
              onChange={(e) => {
                setUserAnswer(e.target.value);
                if (result) setResult(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Число, дробь или выражение..."
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white text-lg font-mono placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors ${
                result === "correct"
                  ? "border-emerald-500 focus:ring-emerald-500/30"
                  : result === "incorrect"
                    ? "border-red-500 focus:ring-red-500/30"
                    : "border-gray-700 focus:ring-emerald-500/30"
              }`}
              disabled={result === "correct"}
            />
            {/* Math symbol buttons */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[
                { label: "√", insert: "√(" },
                { label: "π", insert: "π" },
                { label: "²", insert: "²" },
                { label: "³", insert: "³" },
                { label: "±", insert: "±" },
                { label: "÷", insert: "÷" },
                { label: "×", insert: "×" },
                { label: "(", insert: "(" },
                { label: ")", insert: ")" },
                { label: ";", insert: ";" },
                { label: "−", insert: "-" },
                { label: ",", insert: "," },
              ].map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  onClick={() => {
                    setUserAnswer((prev) => prev + btn.insert);
                    if (result) setResult(null);
                    document.getElementById("math-answer")?.focus();
                  }}
                  disabled={result === "correct"}
                  className="w-9 h-9 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 text-sm font-mono hover:bg-gray-700 hover:text-white disabled:opacity-30 transition-colors flex items-center justify-center"
                >
                  {btn.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-gray-600 mt-2">
              Можно писать обычные числа: 5, 0.25, -3. Дроби: 1/3. Корень: √(2) или sqrt(2). Пи: π
            </p>
          </div>

          {/* Result message */}
          {result === "correct" && (
            <div className="flex items-center gap-2 text-emerald-400 mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <CheckIcon />
              <span className="font-medium">Верно! +10 XP</span>
            </div>
          )}
          {result === "incorrect" && (
            <div className="text-red-400 mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <span className="font-medium">Неверно.</span>{" "}
              <span className="text-red-400/70">Попробуйте ещё раз или посмотрите решение.</span>
            </div>
          )}

          {/* Check button */}
          {result !== "correct" && (
            <button
              onClick={handleCheck}
              disabled={!userAnswer.trim()}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-700 disabled:text-gray-500 text-white font-medium rounded-lg transition-colors mb-4"
            >
              Проверить
            </button>
          )}

          {/* Solution reveal */}
          <div className="mt-auto">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="text-sm text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-1"
            >
              {showSolution ? "▼" : "▶"} Показать решение
            </button>
            {showSolution && (
              <div className="mt-3 p-4 rounded-lg bg-gray-800/70 border border-gray-700">
                <p className="text-sm text-gray-400 mb-2 font-medium">Решение:</p>
                <div className="text-sm text-gray-300 whitespace-pre-line leading-relaxed">
                  {task.solution}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Ответ: <span className="text-gray-300 font-mono">{task.answer}</span>
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800">
            <button
              onClick={handlePrev}
              disabled={currentTaskIndex === 0}
              className="flex items-center gap-1 px-4 py-2 text-sm text-gray-400 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft /> Предыдущая
            </button>
            <button
              onClick={handleNext}
              disabled={currentTaskIndex === totalTasks - 1}
              className="flex items-center gap-1 px-4 py-2 text-sm text-gray-400 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              Следующая <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* AI Chat */}
      {showAIChat && (
        <MathAIChat
          taskNumber={topic.taskNumber}
          taskTitle={topic.title}
          taskDescription={task.description}
          taskId={task.id}
          userAnswer={userAnswer}
          isCorrect={result === "correct" ? true : result === "incorrect" ? false : null}
        />
      )}
    </div>
  );
}
