export const XP_PER_LESSON = 10;
export const XP_PER_EXAM = 25;

export interface Level {
  name: string;
  minXP: number;
  maxXP: number;
  icon: string;
}

export const LEVELS: Level[] = [
  { name: "Новичок", minXP: 0, maxXP: 50, icon: "🌱" },
  { name: "Ученик", minXP: 50, maxXP: 150, icon: "📖" },
  { name: "Практикант", minXP: 150, maxXP: 400, icon: "⚙️" },
  { name: "Кодер", minXP: 400, maxXP: 800, icon: "💻" },
  { name: "Джун", minXP: 800, maxXP: 1500, icon: "🚀" },
  { name: "Мидл", minXP: 1500, maxXP: Infinity, icon: "⭐" },
];

export function calculateXP(
  completedLessons: string[],
  completedExams: string[] = []
): number {
  return completedLessons.length * XP_PER_LESSON + completedExams.length * XP_PER_EXAM;
}

export function getLevel(xp: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

export function getNextLevel(xp: number): Level | null {
  const current = getLevel(xp);
  const idx = LEVELS.indexOf(current);
  if (idx < LEVELS.length - 1) {
    return LEVELS[idx + 1];
  }
  return null;
}

export function getLevelProgress(xp: number): {
  current: number;
  target: number;
  percentage: number;
} {
  const level = getLevel(xp);
  const next = getNextLevel(xp);

  if (!next) {
    return { current: xp, target: xp, percentage: 100 };
  }

  const current = xp - level.minXP;
  const target = next.minXP - level.minXP;
  const percentage = Math.min(Math.round((current / target) * 100), 100);

  return { current, target, percentage };
}

/**
 * Calculate the current streak from an array of ISO date strings (YYYY-MM-DD).
 * A streak counts consecutive days ending at today (or yesterday).
 */
export function getCurrentStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  const uniqueDays = Array.from(new Set(dates)).sort().reverse();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const mostRecent = new Date(uniqueDays[0] + "T00:00:00");

  // Streak only counts if last activity was today or yesterday
  if (mostRecent < yesterday) return 0;

  let streak = 0;
  let expectedDate = mostRecent.getTime() === today.getTime() ? today : yesterday;

  for (const dateStr of uniqueDays) {
    const d = new Date(dateStr + "T00:00:00");
    d.setHours(0, 0, 0, 0);

    if (d.getTime() === expectedDate.getTime()) {
      streak++;
      expectedDate = new Date(expectedDate);
      expectedDate.setDate(expectedDate.getDate() - 1);
    } else if (d < expectedDate) {
      break;
    }
  }

  return streak;
}
