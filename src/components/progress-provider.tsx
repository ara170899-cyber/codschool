"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from "react";
import { calculateXP, getLevel, getCurrentStreak, getLevelProgress, type Level } from "@/lib/gamification";

const STORAGE_KEY = "codeschool_progress";
const DATES_KEY = "codeschool_completion_dates";
const EXAMS_KEY = "codeschool_exams";

function getTodayISO(): string {
  return new Date().toISOString().split("T")[0];
}

interface ProgressContextType {
  completedLessons: Set<string>;
  markCompleted: (lessonId: string) => void;
  markExamCompleted: (examId: string) => void;
  isCompleted: (lessonId: string) => boolean;
  completedCount: number;
  xp: number;
  level: Level;
  progress: { current: number; target: number; percentage: number };
  streak: number;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [completionDates, setCompletionDates] = useState<string[]>([]);
  const [completedExams, setCompletedExams] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setCompletedLessons(new Set(JSON.parse(stored)));

    const storedDates = localStorage.getItem(DATES_KEY);
    if (storedDates) setCompletionDates(JSON.parse(storedDates));

    const storedExams = localStorage.getItem(EXAMS_KEY);
    if (storedExams) setCompletedExams(new Set(JSON.parse(storedExams)));

    setHydrated(true);

    // Listen for changes from other tabs
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setCompletedLessons(new Set(JSON.parse(e.newValue)));
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const markCompleted = useCallback((lessonId: string) => {
    setCompletedLessons((prev) => {
      if (prev.has(lessonId)) return prev;
      const next = new Set(prev);
      next.add(lessonId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
      return next;
    });
    setCompletionDates((prev) => {
      const next = [...prev, getTodayISO()];
      localStorage.setItem(DATES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const markExamCompleted = useCallback((examId: string) => {
    setCompletedExams((prev) => {
      if (prev.has(examId)) return prev;
      const next = new Set(prev);
      next.add(examId);
      localStorage.setItem(EXAMS_KEY, JSON.stringify(Array.from(next)));
      return next;
    });
    setCompletionDates((prev) => {
      const next = [...prev, getTodayISO()];
      localStorage.setItem(DATES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isCompleted = useCallback(
    (lessonId: string) => completedLessons.has(lessonId),
    [completedLessons]
  );

  const xp = useMemo(() => calculateXP(Array.from(completedLessons), Array.from(completedExams)), [completedLessons, completedExams]);
  const level = useMemo(() => getLevel(xp), [xp]);
  const progress = useMemo(() => getLevelProgress(xp), [xp]);
  const streak = useMemo(() => getCurrentStreak(completionDates), [completionDates]);

  if (!hydrated) return null;

  return (
    <ProgressContext.Provider value={{
      completedLessons, markCompleted, markExamCompleted, isCompleted,
      completedCount: completedLessons.size, xp, level, progress, streak,
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useLocalProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useLocalProgress must be used within ProgressProvider");
  return ctx;
}
