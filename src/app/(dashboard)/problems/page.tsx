"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllProblems } from "@/lib/problems";
import { Difficulty, ProblemTag } from "@/types/problems";

const SOLVED_KEY = "codeschool_problems_solved";
const PRO_KEY = "codeschool_pro";
const FREE_LIMIT = 5;

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

const allTags: ProblemTag[] = [
  "arrays", "strings", "hash-map", "two-pointers", "sorting",
  "searching", "stack", "queue", "recursion", "dp", "math", "linked-list",
];

export default function ProblemsPage() {
  const problems = getAllProblems();
  const [solved, setSolved] = useState<Set<string>>(new Set());
  const [isPro, setIsPro] = useState(false);
  const [diffFilter, setDiffFilter] = useState<Difficulty | "all">("all");
  const [tagFilter, setTagFilter] = useState<ProblemTag | "all">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SOLVED_KEY);
      if (raw) setSolved(new Set(JSON.parse(raw)));
      setIsPro(localStorage.getItem(PRO_KEY) === "true");
    } catch {}
  }, []);

  const filtered = problems.filter((p) => {
    if (diffFilter !== "all" && p.difficulty !== diffFilter) return false;
    if (tagFilter !== "all" && !p.tags.includes(tagFilter)) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.slug.includes(search.toLowerCase())) return false;
    return true;
  });

  const totalProblems = 70;
  const easySolved = problems.filter((p) => p.difficulty === "easy" && solved.has(p.id)).length;
  const mediumSolved = problems.filter((p) => p.difficulty === "medium" && solved.has(p.id)).length;
  const hardSolved = problems.filter((p) => p.difficulty === "hard" && solved.has(p.id)).length;
  const totalSolved = easySolved + mediumSolved + hardSolved;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Задачи</h1>
        <p className="text-gray-400">
          Решено {totalSolved}/{totalProblems} &nbsp;·&nbsp;
          <span className="text-emerald-400">Easy {easySolved}/25</span> &nbsp;·&nbsp;
          <span className="text-yellow-400">Medium {mediumSolved}/20</span> &nbsp;·&nbsp;
          <span className="text-red-400">Hard {hardSolved}/10</span>
        </p>
      </div>

      {/* Progress bars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-emerald-400 font-medium">Easy</span>
            <span className="text-gray-500">{easySolved}/25</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${(easySolved / 25) * 100}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-yellow-400 font-medium">Medium</span>
            <span className="text-gray-500">{mediumSolved}/20</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500 rounded-full transition-all" style={{ width: `${(mediumSolved / 20) * 100}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-red-400 font-medium">Hard</span>
            <span className="text-gray-500">{hardSolved}/10</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${(hardSolved / 10) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Paywall banner */}
      {!isPro && (
        <div className="mb-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 flex items-center justify-between">
          <div>
            <p className="text-amber-400 font-medium">Бесплатно доступно {FREE_LIMIT} задач</p>
            <p className="text-gray-400 text-sm">Полный доступ ко всем 70+ задачам — 990₽/мес</p>
          </div>
          <Link href="/pricing" className="shrink-0 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-400 transition-colors">
            Получить Pro
          </Link>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Difficulty buttons */}
        <div className="flex rounded-lg border border-gray-800 overflow-hidden">
          {(["all", "easy", "medium", "hard"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDiffFilter(d)}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                diffFilter === d
                  ? d === "all"
                    ? "bg-gray-700 text-white"
                    : d === "easy"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : d === "medium"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {d === "all" ? "Все" : difficultyLabels[d]}
            </button>
          ))}
        </div>

        {/* Tag dropdown */}
        <select
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value as ProblemTag | "all")}
          className="rounded-lg border border-gray-800 bg-gray-900 text-sm text-gray-300 px-3 py-1.5 focus:outline-none focus:border-gray-600"
        >
          <option value="all">Все темы</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>{tagLabels[tag]}</option>
          ))}
        </select>

        {/* Search */}
        <input
          type="text"
          placeholder="Поиск задачи..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] rounded-lg border border-gray-800 bg-gray-900 text-sm text-gray-300 px-3 py-1.5 placeholder-gray-600 focus:outline-none focus:border-gray-600"
        />
      </div>

      {/* Problems table */}
      <div className="rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-900/50">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 w-10"></th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 w-10">#</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Название</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 w-24">Сложность</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Темы</th>
              <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 w-20">%</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((problem, index) => {
              const isSolved = solved.has(problem.id);
              const isLocked = !isPro && index >= FREE_LIMIT;

              return (
                <tr
                  key={problem.id}
                  className={`border-b border-gray-800/50 transition-colors ${
                    isLocked ? "opacity-50" : "hover:bg-gray-900/50"
                  }`}
                >
                  <td className="px-4 py-3">
                    {isSolved ? (
                      <span className="text-emerald-400 text-lg">&#10003;</span>
                    ) : (
                      <span className="text-gray-700 text-lg">&#9675;</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{problem.id}</td>
                  <td className="px-4 py-3">
                    {isLocked ? (
                      <span className="text-sm text-gray-500 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        {problem.title}
                      </span>
                    ) : (
                      <Link
                        href={`/problems/${problem.slug}`}
                        className="text-sm text-white hover:text-emerald-400 transition-colors font-medium"
                      >
                        {problem.title}
                      </Link>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded border ${difficultyColors[problem.difficulty]}`}>
                      {difficultyLabels[problem.difficulty]}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {problem.tags.map((tag) => (
                        <span key={tag} className="text-xs text-gray-500 bg-gray-800 rounded px-1.5 py-0.5">
                          {tagLabels[tag]}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-gray-500">{problem.acceptance}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Задачи не найдены. Попробуйте изменить фильтры.
          </div>
        )}
      </div>
    </div>
  );
}
