"use client";

import { useState } from "react";
import { formulaSections } from "@/lib/formula-reference";

export default function FormulasPage() {
  const [search, setSearch] = useState("");
  const [openSections, setOpenSections] = useState<Set<number>>(new Set([0]));

  const toggleSection = (index: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenSections(new Set(formulaSections.map((_, i) => i)));
  };

  const collapseAll = () => {
    setOpenSections(new Set());
  };

  const normalizedSearch = search.toLowerCase().trim();

  const filteredSections = formulaSections
    .map((section, sectionIndex) => {
      if (!normalizedSearch) return { section, sectionIndex, formulas: section.formulas };

      const formulas = section.formulas.filter(
        (f) =>
          f.name.toLowerCase().includes(normalizedSearch) ||
          f.formula.toLowerCase().includes(normalizedSearch) ||
          (f.note && f.note.toLowerCase().includes(normalizedSearch)) ||
          section.title.toLowerCase().includes(normalizedSearch)
      );

      return { section, sectionIndex, formulas };
    })
    .filter((s) => s.formulas.length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Справочник формул</h1>
        <p className="text-gray-400">
          Все формулы для ЕГЭ по математике (профильный уровень) в одном месте
        </p>
      </div>

      {/* Search + controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value.trim()) {
                expandAll();
              }
            }}
            placeholder="Поиск формулы..."
            className="w-full px-4 py-2.5 pl-10 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <div className="flex gap-2">
          <button
            onClick={expandAll}
            className="px-3 py-2 text-xs rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors border border-gray-700"
          >
            Развернуть все
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-2 text-xs rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors border border-gray-700"
          >
            Свернуть все
          </button>
        </div>
      </div>

      {/* Results count */}
      {normalizedSearch && (
        <p className="text-sm text-gray-500 mb-4">
          Найдено:{" "}
          {filteredSections.reduce((acc, s) => acc + s.formulas.length, 0)}{" "}
          формул в {filteredSections.length} разделах
        </p>
      )}

      {/* Sections */}
      <div className="space-y-3">
        {filteredSections.map(({ section, sectionIndex, formulas }) => {
          const isOpen = openSections.has(sectionIndex) || !!normalizedSearch;

          return (
            <div
              key={sectionIndex}
              className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden"
            >
              {/* Section header */}
              <button
                onClick={() => toggleSection(sectionIndex)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{section.icon}</span>
                  <h2 className="text-base font-semibold text-white">
                    {section.title}
                  </h2>
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">
                    {formulas.length}
                  </span>
                </div>
                <span
                  className={`text-gray-500 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </button>

              {/* Formulas */}
              {isOpen && (
                <div className="border-t border-gray-800">
                  <div className="divide-y divide-gray-800/50">
                    {formulas.map((f, fi) => (
                      <div
                        key={fi}
                        className="px-5 py-3 hover:bg-gray-800/30 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                          <span className="text-sm text-gray-400 shrink-0">
                            {f.name}
                          </span>
                          <span className="text-sm font-mono text-blue-300 font-medium">
                            {f.formula}
                          </span>
                        </div>
                        {f.note && (
                          <p className="text-xs text-gray-600 mt-1">{f.note}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredSections.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">Ничего не найдено</p>
          <p className="text-sm">Попробуйте другой запрос</p>
        </div>
      )}
    </div>
  );
}
