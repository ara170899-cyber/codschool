"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { LessonProgress } from "@/types";

export function useProgress(userId?: string) {
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { data } = await supabase
      .from("lesson_progress")
      .select("*")
      .eq("user_id", userId);

    if (data) {
      setProgress(
        data.map((row) => ({
          id: row.id,
          userId: row.user_id,
          lessonId: row.lesson_id,
          status: row.status,
          attempts: row.attempts,
          code: row.code,
          completedAt: row.completed_at,
          createdAt: row.created_at,
        }))
      );
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  async function markCompleted(lessonId: string, code: string) {
    if (!userId) return;

    const supabase = createClient();
    await supabase.from("lesson_progress").upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        status: "completed",
        code,
        completed_at: new Date().toISOString(),
        attempts: (progress.find((p) => p.lessonId === lessonId)?.attempts ?? 0) + 1,
      },
      { onConflict: "user_id,lesson_id" }
    );

    await fetchProgress();
  }

  async function incrementAttempts(lessonId: string, code: string) {
    if (!userId) return;

    const supabase = createClient();
    const existing = progress.find((p) => p.lessonId === lessonId);

    await supabase.from("lesson_progress").upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        status: existing?.status ?? "started",
        code,
        attempts: (existing?.attempts ?? 0) + 1,
      },
      { onConflict: "user_id,lesson_id" }
    );

    await fetchProgress();
  }

  function isCompleted(lessonId: string): boolean {
    return progress.some((p) => p.lessonId === lessonId && p.status === "completed");
  }

  function completedCount(): number {
    return progress.filter((p) => p.status === "completed").length;
  }

  return { progress, loading, markCompleted, incrementAttempts, isCompleted, completedCount };
}
