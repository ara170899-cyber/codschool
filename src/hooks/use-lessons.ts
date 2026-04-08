"use client";

import { lessons } from "@/lib/lessons";
import { Lesson } from "@/types";

export function useLessons() {
  function getAll(): Lesson[] {
    return lessons;
  }

  function getById(id: string): Lesson | undefined {
    return lessons.find((l) => l.id === id);
  }

  function getByModule(module: number): Lesson[] {
    return lessons.filter((l) => l.module === module);
  }

  return { lessons, getAll, getById, getByModule };
}
