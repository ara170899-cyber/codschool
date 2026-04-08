"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "./breadcrumbs";
import { Lesson, GradeResult, TestResult } from "@/types";
import { CodeEditor } from "./code-editor";
import { Terminal } from "./terminal";
import { TheoryPanel } from "./theory-panel";
import { TaskPanel } from "./task-panel";
import { TestResults } from "./test-results";
import { AIChat } from "./ai-chat";
import { runPythonInBrowser } from "@/lib/pyodide-runner";
import { useLocalProgress } from "@/hooks/use-local-progress";
import { XPBar } from "./xp-bar";
import { CheatsheetPanel } from "./cheatsheet-panel";
import { CommonMistakes } from "./common-mistakes";
import { TextbookPanel } from "./textbook-panel";
import { softMatch, playSuccessSound } from "@/lib/utils";

function getCodeStorageKey(lessonId: string): string {
  return `codeschool_code_${lessonId}`;
}

interface ModuleInfo {
  lessonIndex: number;
  totalInModule: number;
  moduleName: string;
}

interface LessonPlayerProps {
  lesson: Lesson;
  nextLessonId?: string;
  prevLessonId?: string;
  moduleInfo?: ModuleInfo;
  nextLessonModule?: number;
}

type LeftTab = "theory" | "reference";
type MobileTab = "theory" | "code" | "ai";

export function LessonPlayer({ lesson, nextLessonId, prevLessonId, moduleInfo, nextLessonModule }: LessonPlayerProps) {
  const router = useRouter();
  const { markCompleted, isCompleted: checkCompleted, level, progress: lvlProgress, streak } = useLocalProgress();

  // Load saved code from localStorage or use starterCode
  const [code, setCode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(getCodeStorageKey(lesson.id));
      if (saved !== null) return saved;
    }
    return lesson.starterCode;
  });
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);
  const [gradeResult, setGradeResult] = useState<GradeResult | null>(null);
  const [hintIndex, setHintIndex] = useState(-1);
  const [loading, setLoading] = useState<"run" | "check" | null>(null);
  const [showAI, setShowAI] = useState(false);
  const [completed, setCompleted] = useState(checkCompleted(lesson.id));
  const [showSuccess, setShowSuccess] = useState(false);
  const [isModuleComplete, setIsModuleComplete] = useState(false);
  const [leftTab, setLeftTab] = useState<LeftTab>("theory");
  const [mobileTab, setMobileTab] = useState<MobileTab>("theory");
  const [fontSize, setFontSize] = useState(14);
  const [shakeTerminal, setShakeTerminal] = useState(false);

  // Auto-save code to localStorage on every change
  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
    try {
      localStorage.setItem(getCodeStorageKey(lesson.id), newCode);
    } catch {}
  }, [lesson.id]);

  // Reset code to starterCode
  function handleReset() {
    const confirmed = window.confirm("Сбросить код к начальному? Ваш код будет потерян.");
    if (!confirmed) return;
    setCode(lesson.starterCode);
    try {
      localStorage.removeItem(getCodeStorageKey(lesson.id));
    } catch {}
    setOutput("");
    setGradeResult(null);
    setIsError(false);
  }

  // Font size controls
  function decreaseFontSize() {
    setFontSize((prev) => Math.max(12, prev - 1));
  }
  function increaseFontSize() {
    setFontSize((prev) => Math.min(24, prev + 1));
  }

  async function handleRun() {
    setLoading("run");
    setGradeResult(null);
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
  }

  async function handleCheck() {
    setLoading("check");
    setOutput("Проверка...");
    setIsError(false);

    try {
      const details: TestResult[] = [];
      for (const test of lesson.tests) {
        const result = await runPythonInBrowser(code, test.input);
        if (result.stderr) {
          details.push({ passed: false, input: test.input, expected: test.expected.trim(), actual: result.stderr.trim(), hidden: test.hidden });
          continue;
        }
        const actual = result.stdout.trim();
        const expected = test.expected.trim();
        details.push({ passed: softMatch(actual, expected), input: test.input, expected, actual, hidden: test.hidden });
      }

      const passed = details.filter((d) => d.passed).length;
      const failed = details.filter((d) => !d.passed).length;
      const grade: GradeResult = { passed, failed, total: lesson.tests.length, details };

      setGradeResult(grade);
      setOutput("");
      setIsError(false);

      if (failed === 0) {
        // Success
        setCompleted(true);
        markCompleted(lesson.id);
        playSuccessSound();

        // Check if this is the last lesson of the module
        const isLastInModule = nextLessonModule !== undefined && nextLessonModule !== lesson.module;
        const isVeryLastLesson = !nextLessonId;
        setIsModuleComplete(isLastInModule || isVeryLastLesson);

        setShowSuccess(true);
        if (nextLessonId) {
          setTimeout(() => { router.push(`/lesson/${nextLessonId}`); }, isLastInModule ? 3500 : 2000);
        }
      } else {
        // Failed — shake the terminal area
        setShakeTerminal(true);
        setTimeout(() => setShakeTerminal(false), 500);
      }
    } catch {
      setOutput("Ошибка проверки");
      setIsError(true);
    }
    setLoading(null);
  }

  function handleHint() {
    if (hintIndex < lesson.hints.length - 1) setHintIndex(hintIndex + 1);
  }

  // Keyboard shortcuts: Ctrl/Cmd+Enter = Run, Ctrl/Cmd+Shift+Enter = Check
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key === "Enter") {
        e.preventDefault();
        if (e.shiftKey) {
          handleCheck();
        } else {
          handleRun();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, loading, lesson.tests]);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Курсы", href: "/" },
    { label: "Python", href: "/" },
    ...(moduleInfo
      ? [{ label: `Модуль ${lesson.module}`, href: "/" }]
      : []),
    { label: lesson.title },
  ];

  const testResultsSummary = gradeResult
    ? `Пройдено ${gradeResult.passed}/${gradeResult.total}. ${gradeResult.details
        .filter((d) => !d.passed && !d.hidden)
        .map((d) => `Ввод: ${d.input}, ожидалось: ${d.expected}, получено: ${d.actual}`)
        .join("; ")}`
    : undefined;

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col overflow-hidden">
      {/* Success overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="rounded-2xl bg-gray-900 border border-emerald-500/30 p-8 text-center max-w-sm mx-4">
            {isModuleComplete ? (
              <>
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-xl font-bold text-white mb-2">Модуль пройден!</h2>
                <p className="text-emerald-400 text-sm font-medium mb-1">+50 XP бонус за модуль!</p>
                <p className="text-gray-400 text-sm">
                  {nextLessonId ? "Переход к следующему модулю..." : "Поздравляем! Вы прошли все уроки!"}
                </p>
                {/* Confetti particles */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 rounded-full animate-ping"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        backgroundColor: ["#10b981", "#f59e0b", "#3b82f6", "#ef4444", "#8b5cf6", "#ec4899"][i % 6],
                        animationDelay: `${Math.random() * 0.5}s`,
                        animationDuration: `${0.8 + Math.random() * 0.4}s`,
                      }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-xl font-bold text-white mb-2">Урок пройден!</h2>
                <p className="text-gray-400 text-sm">
                  {nextLessonId ? "Переход к следующему уроку..." : "Поздравляем! Вы прошли все уроки!"}
                </p>
              </>
            )}
            <button
              onClick={() => { setShowSuccess(false); if (nextLessonId) router.push(`/lesson/${nextLessonId}`); }}
              className="mt-4 px-6 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500 transition-colors"
            >
              {nextLessonId ? "Далее →" : "К курсам"}
            </button>
          </div>
        </div>
      )}

      {/* Top bar: breadcrumbs + title + module info + XP + actions */}
      <div className="flex flex-col px-3 sm:px-4 py-2 border-b border-gray-800 bg-gray-900/80 shrink-0 gap-1">
        {/* Breadcrumbs row */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Title + XP + actions row */}
        <div className="flex items-center gap-3">
        {/* Title + module info */}
        <div className="flex flex-col min-w-0 shrink">
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-semibold text-white truncate">{lesson.title}</h1>
            {completed && <span className="text-emerald-400 text-xs shrink-0">✅</span>}
          </div>
          {moduleInfo && (
            <span className="text-[11px] text-gray-500">
              Урок {moduleInfo.lessonIndex} из {moduleInfo.totalInModule} · Модуль: {moduleInfo.moduleName}
            </span>
          )}
        </div>

        {/* XP bar — grows to fill space */}
        <div className="hidden sm:block flex-1 min-w-0">
          <XPBar level={level} progress={lvlProgress} streak={streak} />
        </div>

        {/* Font size controls */}
        <div className="hidden sm:flex items-center gap-0.5 shrink-0">
          <button onClick={decreaseFontSize} disabled={fontSize <= 12}
            className="px-1.5 py-1 rounded text-xs text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-colors"
            title="Уменьшить шрифт">A-</button>
          <span className="text-[10px] text-gray-500 w-5 text-center">{fontSize}</span>
          <button onClick={increaseFontSize} disabled={fontSize >= 24}
            className="px-1.5 py-1 rounded text-xs text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-colors"
            title="Увеличить шрифт">A+</button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button onClick={handleReset}
            className="hidden sm:inline-flex px-2 py-1.5 text-gray-500 text-xs hover:text-gray-300 transition-colors"
            title="Сбросить код">Сбросить</button>
          <button onClick={handleRun} disabled={loading !== null} title="Ctrl+Enter"
            className="px-3 py-1.5 rounded-lg bg-gray-700 text-white text-xs sm:text-sm font-medium hover:bg-gray-600 disabled:opacity-50 transition-colors">
            {loading === "run" ? "..." : "▶ Run"}
          </button>
          <button onClick={handleCheck} disabled={loading !== null} title="Ctrl+Shift+Enter"
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs sm:text-sm font-medium hover:bg-emerald-500 disabled:opacity-50 transition-colors">
            {loading === "check" ? "..." : "✓ Check"}
          </button>
          <button onClick={handleHint} disabled={hintIndex >= lesson.hints.length - 1}
            className="hidden sm:inline-flex px-3 py-1.5 rounded-lg bg-yellow-600/20 text-yellow-400 text-xs font-medium hover:bg-yellow-600/30 disabled:opacity-50 transition-colors">
            💡
          </button>
          <button onClick={() => setShowAI(!showAI)}
            className={`hidden sm:inline-flex px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${showAI ? "bg-purple-600 text-white" : "bg-purple-600/20 text-purple-400 hover:bg-purple-600/30"}`}>
            🤖
          </button>
        </div>
        </div>
      </div>

      {/* Mobile tab bar */}
      <div className="flex sm:hidden border-b border-gray-800 shrink-0">
        {(["theory", "code", "ai"] as MobileTab[]).map((tab) => (
          <button key={tab} onClick={() => setMobileTab(tab)}
            className={`flex-1 py-2 text-xs font-medium transition-colors ${mobileTab === tab ? "text-emerald-400 border-b-2 border-emerald-400" : "text-gray-500"}`}>
            {tab === "theory" ? "📖 Теория" : tab === "code" ? "💻 Код" : "🤖 AI"}
          </button>
        ))}
      </div>

      {/* ========== DESKTOP LAYOUT ========== */}
      <div className="flex-1 hidden sm:flex overflow-hidden">

        {/* LEFT PANEL: Theory / Reference tabs */}
        <div className="w-80 border-r border-gray-800 flex flex-col shrink-0">
          {/* Tab switcher */}
          <div className="flex border-b border-gray-800 shrink-0">
            <button onClick={() => setLeftTab("theory")}
              className={`flex-1 py-2 text-xs font-medium transition-colors ${leftTab === "theory" ? "text-emerald-400 border-b-2 border-emerald-400" : "text-gray-500 hover:text-gray-300"}`}>
              📝 Урок
            </button>
            <button onClick={() => setLeftTab("reference")}
              className={`flex-1 py-2 text-xs font-medium transition-colors ${leftTab === "reference" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-500 hover:text-gray-300"}`}>
              📖 Справка
            </button>
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {leftTab === "theory" && (
              <>
                <TheoryPanel theory={lesson.theory} />
                <TaskPanel task={lesson.task} />
                {hintIndex >= 0 && (
                  <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
                    <h3 className="text-sm font-semibold text-yellow-400 mb-2">
                      Подсказка {hintIndex + 1}/{lesson.hints.length}
                    </h3>
                    <p className="text-sm text-gray-300">{lesson.hints[hintIndex]}</p>
                  </div>
                )}
                <CommonMistakes lessonId={lesson.id} />
              </>
            )}
            {leftTab === "reference" && (
              <>
                <TextbookPanel module={lesson.module} />
                <CheatsheetPanel module={lesson.module} />
              </>
            )}
          </div>

          {/* Prev/Next navigation + shortcuts hint */}
          <div className="border-t border-gray-800 px-4 py-3 shrink-0 space-y-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => prevLessonId && router.push(`/lesson/${prevLessonId}`)}
                disabled={!prevLessonId}
                className="flex-1 py-2 rounded-lg bg-gray-800 text-gray-300 text-xs font-medium hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Предыдущий
              </button>
              <button
                onClick={() => nextLessonId && router.push(`/lesson/${nextLessonId}`)}
                disabled={!nextLessonId}
                className="flex-1 py-2 rounded-lg bg-gray-800 text-gray-300 text-xs font-medium hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Следующий →
              </button>
            </div>
            <p className="text-[10px] text-gray-600 text-center">
              Ctrl+Enter = Запуск · Ctrl+Shift+Enter = Проверка
            </p>
          </div>
        </div>

        {/* CENTER: Editor + Terminal (single scroll context) */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 min-h-0">
            <CodeEditor value={code} onChange={handleCodeChange} fontSize={fontSize} />
          </div>
          <div className={`h-48 border-t border-gray-800 shrink-0 overflow-auto ${shakeTerminal ? "animate-shake" : ""}`}>
            {gradeResult ? (
              <div className="p-4">
                <TestResults result={gradeResult} />
              </div>
            ) : (
              <Terminal output={output} isError={isError} />
            )}
          </div>
        </div>

      </div>

      {/* AI Chat — floating widget */}
      {showAI && (
        <div className="fixed bottom-4 right-4 z-40 w-80 h-[28rem] rounded-xl border border-gray-700 bg-gray-900 shadow-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-800 bg-gray-900 shrink-0">
            <span className="text-sm font-semibold text-white">🤖 ИИ-помощник</span>
            <button onClick={() => setShowAI(false)} className="text-gray-400 hover:text-white text-sm">✕</button>
          </div>
          <div className="flex-1 min-h-0">
            <AIChat lessonTitle={lesson.title} task={lesson.task} userCode={code} testResults={testResultsSummary} />
          </div>
        </div>
      )}

      {/* ========== MOBILE LAYOUT ========== */}
      <div className="flex-1 flex flex-col sm:hidden overflow-hidden">
        {mobileTab === "theory" && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <TextbookPanel module={lesson.module} />
            <TheoryPanel theory={lesson.theory} />
            <TaskPanel task={lesson.task} />
            {hintIndex >= 0 && (
              <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
                <h3 className="text-sm font-semibold text-yellow-400 mb-2">Подсказка {hintIndex + 1}/{lesson.hints.length}</h3>
                <p className="text-sm text-gray-300">{lesson.hints[hintIndex]}</p>
              </div>
            )}
            <CommonMistakes lessonId={lesson.id} />
            <CheatsheetPanel module={lesson.module} />
            <button onClick={handleHint} disabled={hintIndex >= lesson.hints.length - 1}
              className="w-full py-2 rounded-lg bg-yellow-600/20 text-yellow-400 text-sm font-medium disabled:opacity-50">
              💡 Подсказка
            </button>
            {/* Mobile prev/next */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => prevLessonId && router.push(`/lesson/${prevLessonId}`)}
                disabled={!prevLessonId}
                className="flex-1 py-2 rounded-lg bg-gray-800 text-gray-300 text-xs font-medium hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Предыдущий
              </button>
              <button
                onClick={() => nextLessonId && router.push(`/lesson/${nextLessonId}`)}
                disabled={!nextLessonId}
                className="flex-1 py-2 rounded-lg bg-gray-800 text-gray-300 text-xs font-medium hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Следующий →
              </button>
            </div>
          </div>
        )}

        {mobileTab === "code" && (
          <>
            {/* Mobile code toolbar */}
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-800 bg-gray-900/60 shrink-0">
              <div className="flex items-center gap-1">
                <button onClick={decreaseFontSize} disabled={fontSize <= 12}
                  className="px-1.5 py-1 rounded text-xs text-gray-400 hover:text-white disabled:opacity-30 transition-colors">A-</button>
                <span className="text-[10px] text-gray-500 w-5 text-center">{fontSize}</span>
                <button onClick={increaseFontSize} disabled={fontSize >= 24}
                  className="px-1.5 py-1 rounded text-xs text-gray-400 hover:text-white disabled:opacity-30 transition-colors">A+</button>
              </div>
              <button onClick={handleReset}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                Сбросить
              </button>
            </div>
            <div className="flex-1 min-h-0">
              <CodeEditor value={code} onChange={handleCodeChange} fontSize={fontSize} />
            </div>
            <div className={`h-40 border-t border-gray-800 shrink-0 overflow-auto ${shakeTerminal ? "animate-shake" : ""}`}>
              {gradeResult ? (
                <div className="p-3"><TestResults result={gradeResult} /></div>
              ) : (
                <Terminal output={output} isError={isError} />
              )}
            </div>
          </>
        )}

        {mobileTab === "ai" && (
          <div className="flex-1">
            <AIChat lessonTitle={lesson.title} task={lesson.task} userCode={code} testResults={testResultsSummary} />
          </div>
        )}
      </div>
    </div>
  );
}
