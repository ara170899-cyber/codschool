export interface EgePlayerStats {
  totalTasksSolved: number;
  examsTaken: number;
  bestScore: number;
  streakDays: number;
  taskTypesFullySolved: number; // types where >80% correct
  variantsCompleted: number;
  probabilityTasksSolved: number;
  geometryTasksSolved: number;
  part1Mastered: boolean; // >80% по всем заданиям 1-11
  todaySolved: number;
}

export interface EgeAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (stats: EgePlayerStats) => boolean;
  progress?: (stats: EgePlayerStats) => { current: number; target: number };
}

export const EGE_ACHIEVEMENTS: EgeAchievement[] = [
  {
    id: "first-step",
    title: "Первый шаг",
    description: "Решить 1 задачу",
    icon: "👣",
    condition: (s) => s.totalTasksSolved >= 1,
    progress: (s) => ({ current: Math.min(s.totalTasksSolved, 1), target: 1 }),
  },
  {
    id: "ten",
    title: "Десяточка",
    description: "Решить 10 задач",
    icon: "🔟",
    condition: (s) => s.totalTasksSolved >= 10,
    progress: (s) => ({ current: Math.min(s.totalTasksSolved, 10), target: 10 }),
  },
  {
    id: "fifty",
    title: "Полтинник",
    description: "Решить 50 задач",
    icon: "5️⃣",
    condition: (s) => s.totalTasksSolved >= 50,
    progress: (s) => ({ current: Math.min(s.totalTasksSolved, 50), target: 50 }),
  },
  {
    id: "hundred",
    title: "Сотня",
    description: "Решить 100 задач",
    icon: "💯",
    condition: (s) => s.totalTasksSolved >= 100,
    progress: (s) => ({ current: Math.min(s.totalTasksSolved, 100), target: 100 }),
  },
  {
    id: "first-variant",
    title: "Первый вариант",
    description: "Сдать пробный экзамен",
    icon: "📋",
    condition: (s) => s.examsTaken >= 1,
    progress: (s) => ({ current: Math.min(s.examsTaken, 1), target: 1 }),
  },
  {
    id: "five-variants",
    title: "5 вариантов",
    description: "Сдать 5 пробных экзаменов",
    icon: "📝",
    condition: (s) => s.examsTaken >= 5,
    progress: (s) => ({ current: Math.min(s.examsTaken, 5), target: 5 }),
  },
  {
    id: "ten-variants",
    title: "10 вариантов",
    description: "Сдать 10 пробных экзаменов",
    icon: "🗂️",
    condition: (s) => s.examsTaken >= 10,
    progress: (s) => ({ current: Math.min(s.examsTaken, 10), target: 10 }),
  },
  {
    id: "part1-master",
    title: "Часть 1 мастер",
    description: ">80% по всем заданиям 1-11",
    icon: "🎯",
    condition: (s) => s.part1Mastered,
  },
  {
    id: "score-70",
    title: "70 баллов",
    description: "Набрать 70+ баллов на экзамене",
    icon: "🥉",
    condition: (s) => s.bestScore >= 70,
    progress: (s) => ({ current: Math.min(s.bestScore, 70), target: 70 }),
  },
  {
    id: "score-80",
    title: "80 баллов",
    description: "Набрать 80+ баллов на экзамене",
    icon: "🥈",
    condition: (s) => s.bestScore >= 80,
    progress: (s) => ({ current: Math.min(s.bestScore, 80), target: 80 }),
  },
  {
    id: "score-90",
    title: "90 баллов",
    description: "Набрать 90+ баллов на экзамене",
    icon: "🥇",
    condition: (s) => s.bestScore >= 90,
    progress: (s) => ({ current: Math.min(s.bestScore, 90), target: 90 }),
  },
  {
    id: "score-100",
    title: "Стобалльник",
    description: "Набрать 100 баллов на экзамене",
    icon: "👑",
    condition: (s) => s.bestScore >= 100,
    progress: (s) => ({ current: Math.min(s.bestScore, 100), target: 100 }),
  },
  {
    id: "streak-7",
    title: "Неделя подряд",
    description: "Заниматься 7 дней подряд",
    icon: "🔥",
    condition: (s) => s.streakDays >= 7,
    progress: (s) => ({ current: Math.min(s.streakDays, 7), target: 7 }),
  },
  {
    id: "streak-30",
    title: "Месяц подряд",
    description: "Заниматься 30 дней подряд",
    icon: "🌋",
    condition: (s) => s.streakDays >= 30,
    progress: (s) => ({ current: Math.min(s.streakDays, 30), target: 30 }),
  },
  {
    id: "probability",
    title: "Вероятник",
    description: "Решить 20 задач по вероятности",
    icon: "🎲",
    condition: (s) => s.probabilityTasksSolved >= 20,
    progress: (s) => ({ current: Math.min(s.probabilityTasksSolved, 20), target: 20 }),
  },
  {
    id: "geometry",
    title: "Геометр",
    description: "Решить 20 задач по планиметрии",
    icon: "📐",
    condition: (s) => s.geometryTasksSolved >= 20,
    progress: (s) => ({ current: Math.min(s.geometryTasksSolved, 20), target: 20 }),
  },
];

const STATS_KEY = "ege-player-stats";
const STREAK_KEY = "ege-streak";
const EARNED_KEY = "ege-achievements-earned";

export function getDefaultStats(): EgePlayerStats {
  return {
    totalTasksSolved: 0,
    examsTaken: 0,
    bestScore: 0,
    streakDays: 0,
    taskTypesFullySolved: 0,
    variantsCompleted: 0,
    probabilityTasksSolved: 0,
    geometryTasksSolved: 0,
    part1Mastered: false,
    todaySolved: 0,
  };
}

export function loadStats(): EgePlayerStats {
  if (typeof window === "undefined") return getDefaultStats();
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return getDefaultStats();
    return { ...getDefaultStats(), ...JSON.parse(raw) };
  } catch {
    return getDefaultStats();
  }
}

export function saveStats(stats: EgePlayerStats): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function updateStreak(): number {
  if (typeof window === "undefined") return 0;
  const today = new Date().toISOString().slice(0, 10);
  const raw = localStorage.getItem(STREAK_KEY);
  let streak = { lastDate: "", count: 0 };
  try {
    if (raw) streak = JSON.parse(raw);
  } catch { /* ignore */ }

  if (streak.lastDate === today) return streak.count;

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (streak.lastDate === yesterday) {
    streak.count += 1;
  } else {
    streak.count = 1;
  }
  streak.lastDate = today;
  localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
  return streak.count;
}

export function getEarnedAchievements(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(EARNED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function checkAndUnlockAchievements(stats: EgePlayerStats): EgeAchievement[] {
  const earned = new Set(getEarnedAchievements());
  const newlyEarned: EgeAchievement[] = [];

  for (const ach of EGE_ACHIEVEMENTS) {
    if (!earned.has(ach.id) && ach.condition(stats)) {
      earned.add(ach.id);
      newlyEarned.push(ach);
    }
  }

  if (newlyEarned.length > 0) {
    localStorage.setItem(EARNED_KEY, JSON.stringify(Array.from(earned)));
  }

  return newlyEarned;
}
