"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getProblemBySlug } from "@/lib/problems";
import { Difficulty, ProblemTag } from "@/types/problems";
import { runPythonInBrowser } from "@/lib/pyodide-runner";
import { softMatch } from "@/lib/utils";
import dynamic from "next/dynamic";

const CodeEditor = dynamic(() => import("@/components/code-editor").then((m) => m.CodeEditor), { ssr: false });

const SOLVED_KEY = "codeschool_problems_solved";

const difficultyColors: Record<Difficulty, string> = {
  easy: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  hard: "text-red-400 bg-red-400/10 border-red-400/20",
};

const difficultyLabels: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

const tagLabels: Record<ProblemTag, string> = {
  arrays: "Массивы",
  strings: "Строки",
  "hash-map": "Хеш-таблица",
  "two-pointers": "Два указателя",
  sorting: "Сортировка",
  searching: "Поиск",
  stack: "Стек",
  queue: "Очередь",
  recursion: "Рекурсия",
  dp: "Динамика",
  math: "Математика",
  "linked-list": "Связный список",
};

interface TestResult {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  hidden?: boolean;
}

export default function ProblemPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const problem = getProblemBySlug(slug);

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState<"result" | "tests">("result");
  const [results, setResults] = useState<TestResult[]>([]);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<"run" | "submit" | null>(null);
  const [revealedHints, setRevealedHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode);
      try {
        const raw = localStorage.getItem(SOLVED_KEY);
        if (raw) {
          const solvedSet: string[] = JSON.parse(raw);
          setIsSolved(solvedSet.includes(problem.id));
        }
      } catch {}
    }
  }, [problem]);

  const markSolved = useCallback(() => {
    if (!problem) return;
    try {
      const raw = localStorage.getItem(SOLVED_KEY);
      const arr: string[] = raw ? JSON.parse(raw) : [];
      if (!arr.includes(problem.id)) {
        arr.push(problem.id);
        localStorage.setItem(SOLVED_KEY, JSON.stringify(arr));
      }
      setIsSolved(true);
    } catch {}
  }, [problem]);

  const runTests = useCallback(async (submitMode: boolean) => {
    if (!problem || running) return;
    setRunning(true);
    setMode(submitMode ? "submit" : "run");
    setActiveTab("result");
    setResults([]);
    setSuccess(false);

    const testsToRun = submitMode
      ? problem.testCases
      : problem.testCases.filter((t) => !t.hidden);

    const newResults: TestResult[] = [];

    for (const tc of testsToRun) {
      try {
        const { stdout, stderr } = await runPythonInBrowser(code, tc.input);
        const output = stderr ? `Error: ${stderr}` : stdout;
        const passed = !stderr && softMatch(output, tc.expected);
        newResults.push({
          input: tc.input,
          expected: tc.expected,
          actual: output,
          passed,
          hidden: tc.hidden,
        });
      } catch (err) {
        newResults.push({
          input: tc.input,
          expected: tc.expected,
          actual: `Error: ${err}`,
          passed: false,
          hidden: tc.hidden,
        });
      }
    }

    setResults(newResults);
    setRunning(false);

    if (submitMode && newResults.every((r) => r.passed)) {
      setSuccess(true);
      markSolved();
    }
  }, [problem, running, code, markSolved]);

  if (!problem) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Задача не найдена</h2>
          <Link href="/problems" className="text-emerald-400 hover:underline">Вернуться к списку задач</Link>
        </div>
      </div>
    );
  }

  const passedCount = results.filter((r) => r.passed).length;
  const totalCount = results.length;

  return (
    <div className="flex flex-col lg:flex-row gap-0 -m-6 h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* LEFT PANEL — Problem description (independent scroll) */}
      <div className="lg:w-[45%] border-r border-gray-800 overflow-y-auto p-6 h-full">
        {/* Back link */}
        <Link href="/problems" className="text-sm text-gray-500 hover:text-gray-300 transition-colors mb-4 inline-block">
          ← Все задачи
        </Link>

        {/* Title */}
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-2xl font-bold text-white">{problem.id}. {problem.title}</h1>
          {isSolved && <span className="text-emerald-400 text-lg" title="Решено">&#10003;</span>}
        </div>

        {/* Difficulty + tags */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className={`text-xs font-medium px-2.5 py-1 rounded border ${difficultyColors[problem.difficulty]}`}>
            {difficultyLabels[problem.difficulty]}
          </span>
          {problem.tags.map((tag) => (
            <span key={tag} className="text-xs text-gray-400 bg-gray-800 rounded px-2 py-1">
              {tagLabels[tag]}
            </span>
          ))}
          <span className="text-xs text-gray-500 ml-auto">Принято: {problem.acceptance}%</span>
        </div>

        {/* Description */}
        <div className="prose prose-invert prose-sm max-w-none mb-6">
          {problem.description.split("\n").map((line, i) => (
            <p key={i} className="text-gray-300 mb-2 leading-relaxed">
              {line.split(/(`[^`]+`)/).map((part, j) =>
                part.startsWith("`") && part.endsWith("`") ? (
                  <code key={j} className="px-1.5 py-0.5 rounded bg-gray-800 text-emerald-400 text-xs font-mono">
                    {part.slice(1, -1)}
                  </code>
                ) : (
                  <span key={j}>{part}</span>
                )
              )}
            </p>
          ))}
        </div>

        {/* Examples */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Примеры</h3>
          {problem.examples.map((ex, i) => (
            <div key={i} className="mb-4 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
              <div className="text-sm mb-2">
                <span className="text-gray-500 font-medium">Вход: </span>
                <code className="text-gray-300 font-mono text-xs">{ex.input}</code>
              </div>
              <div className="text-sm mb-2">
                <span className="text-gray-500 font-medium">Выход: </span>
                <code className="text-emerald-400 font-mono text-xs">{ex.output}</code>
              </div>
              {ex.explanation && (
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Объяснение: </span>
                  {ex.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Constraints */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Ограничения</h3>
          <ul className="space-y-1">
            {problem.constraints.map((c, i) => (
              <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                <span className="text-gray-600 mt-0.5">•</span>
                <code className="font-mono text-xs">{c}</code>
              </li>
            ))}
          </ul>
        </div>

        {/* Hints */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
            Подсказки ({revealedHints}/{problem.hints.length})
          </h3>
          {problem.hints.map((hint, i) => (
            <div key={i} className="mb-2">
              {i < revealedHints ? (
                <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-3 text-sm text-gray-300">
                  {hint}
                </div>
              ) : i === revealedHints ? (
                <button
                  onClick={() => setRevealedHints(revealedHints + 1)}
                  className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Показать подсказку {i + 1} →
                </button>
              ) : null}
            </div>
          ))}
        </div>

        {/* Solution */}
        <div className="mb-6">
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            {showSolution ? "Скрыть решение ▲" : "Показать решение ▼"}
          </button>
          {showSolution && (
            <div className="mt-3 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
              <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap overflow-x-auto">{problem.solution}</pre>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL — Editor + Results (fixed height, no page scroll) */}
      <div className="lg:w-[55%] flex flex-col h-full overflow-hidden">
        {/* Code editor */}
        <div className="flex-1 border-b border-gray-800 min-h-[300px]">
          <div className="h-full">
            <CodeEditor
              value={code}
              onChange={(val: string) => setCode(val)}
            />
          </div>
        </div>

        {/* Bottom panel */}
        <div className="h-[280px] flex flex-col bg-gray-950">
          {/* Tabs + buttons */}
          <div className="flex items-center justify-between border-b border-gray-800 px-4">
            <div className="flex">
              <button
                onClick={() => setActiveTab("result")}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "result"
                    ? "border-emerald-400 text-emerald-400"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                Результат
              </button>
              <button
                onClick={() => setActiveTab("tests")}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "tests"
                    ? "border-emerald-400 text-emerald-400"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                Тесты
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => runTests(false)}
                disabled={running}
                className="px-4 py-1.5 text-sm font-medium rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {running && mode === "run" ? "..." : "▶ Run"}
              </button>
              <button
                onClick={() => runTests(true)}
                disabled={running}
                className="px-4 py-1.5 text-sm font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors disabled:opacity-50"
              >
                {running && mode === "submit" ? "..." : "Submit"}
              </button>
            </div>
          </div>

          {/* Results content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "result" && (
              <>
                {/* Success animation */}
                {success && (
                  <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center animate-pulse">
                    <div className="text-3xl mb-2">&#127881;</div>
                    <p className="text-emerald-400 font-bold text-lg">Все тесты пройдены!</p>
                    <p className="text-gray-400 text-sm mt-1">Задача решена. +10 XP</p>
                  </div>
                )}

                {results.length === 0 && !running && (
                  <p className="text-gray-500 text-sm">Нажмите Run или Submit, чтобы запустить тесты.</p>
                )}

                {running && (
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                    Выполнение...
                  </div>
                )}

                {results.length > 0 && !running && (
                  <>
                    <div className="mb-3 flex items-center gap-3">
                      <span className={`text-sm font-medium ${passedCount === totalCount ? "text-emerald-400" : "text-red-400"}`}>
                        {passedCount}/{totalCount} тестов пройдено
                      </span>
                    </div>
                    <div className="space-y-2">
                      {results.map((r, i) => (
                        <div key={i} className={`rounded-lg border p-3 ${
                          r.passed
                            ? "border-emerald-500/20 bg-emerald-500/5"
                            : "border-red-500/20 bg-red-500/5"
                        }`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={r.passed ? "text-emerald-400" : "text-red-400"}>
                              {r.passed ? "✓" : "✗"}
                            </span>
                            <span className="text-sm text-gray-300 font-medium">
                              Тест {i + 1} {r.hidden ? "(скрытый)" : ""}
                            </span>
                          </div>
                          {!r.hidden && (
                            <div className="text-xs font-mono space-y-1">
                              <div><span className="text-gray-500">Вход:     </span><span className="text-gray-400">{r.input.replace(/\n/g, " ↵ ")}</span></div>
                              <div><span className="text-gray-500">Ожидание: </span><span className="text-gray-400">{r.expected}</span></div>
                              <div><span className="text-gray-500">Получено: </span><span className={r.passed ? "text-emerald-400" : "text-red-400"}>{r.actual}</span></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            {activeTab === "tests" && (
              <div className="space-y-2">
                {problem.testCases.map((tc, i) => (
                  <div key={i} className="rounded-lg border border-gray-800 bg-gray-900/50 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-gray-300 font-medium">Тест {i + 1}</span>
                      {tc.hidden && <span className="text-xs text-gray-600 bg-gray-800 rounded px-1.5 py-0.5">скрытый</span>}
                    </div>
                    {tc.hidden ? (
                      <p className="text-xs text-gray-600 font-mono">Скрытый тест — данные не показываются</p>
                    ) : (
                      <div className="text-xs font-mono space-y-1">
                        <div><span className="text-gray-500">Вход: </span><span className="text-gray-400">{tc.input.replace(/\n/g, " ↵ ")}</span></div>
                        <div><span className="text-gray-500">Выход: </span><span className="text-emerald-400">{tc.expected}</span></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
