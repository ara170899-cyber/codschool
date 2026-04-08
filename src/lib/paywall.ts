import { lessons } from "@/lib/lessons";

/** Modules 0-8 are free (first ~30 lessons) */
export const FREE_MODULE_LIMIT = 8;

/** Features that require Pro subscription */
export type PaidFeature = "ai-assistant" | "certificate" | "daily-challenges" | "coding-battles";

const PAID_FEATURES = new Set<PaidFeature>([
  "ai-assistant",
  "certificate",
  "daily-challenges",
  "coding-battles",
] as const);

/** Returns true if the module is available for free */
export function isModuleFree(moduleId: number): boolean {
  return moduleId <= FREE_MODULE_LIMIT;
}

/** Returns true if the lesson is available for free (based on its module) */
export function isLessonFree(lessonId: string): boolean {
  const lesson = lessons.find((l) => l.id === lessonId);
  if (!lesson) return false;
  return isModuleFree(lesson.module);
}

/** Returns true if the feature requires a Pro subscription */
export function isPaidFeature(feature: string): boolean {
  return PAID_FEATURES.has(feature as PaidFeature);
}

/** Check localStorage for subscription status (client-side only) */
export function hasProSubscription(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("codeschool_pro") === "true";
}
