export interface ExamResult {
  id: string;
  date: string;
  variant: number;
  answers: Record<number, string>;
  correctAnswers: Record<number, string>;
  primaryScore: number;
  testScore: number;
  taskResults: Record<number, boolean>;
  timeSpentSeconds: number;
}

export interface TaskStat {
  taskNumber: number;
  title: string;
  attempts: number;
  correct: number;
  percentage: number;
}

export interface HeatmapItem {
  taskNumber: number;
  title: string;
  percentage: number;
  status: "strong" | "medium" | "weak";
}

const STORAGE_KEY = "ege-exam-results";

const TASK_TITLES: Record<number, string> = {
  1: "Планиметрия",
  2: "Векторы",
  3: "Стереометрия",
  4: "Вероятность",
  5: "Уравнения",
  6: "Окружности",
  7: "Производная",
  8: "Прикладная",
  9: "Вычисления",
  10: "Текстовые",
  11: "Графики",
  12: "Макс/Мин",
  13: "Уравнения (ч2)",
  14: "Стереометрия (ч2)",
  15: "Неравенства",
  16: "Финансовая",
  17: "Планиметрия (ч2)",
  18: "Теория чисел",
};

const TASK_POINTS: Record<number, number> = {
  1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1,
  12: 2, 13: 3, 14: 3, 15: 3, 16: 3, 17: 4, 18: 4,
};

export function getTaskPoints(taskNumber: number): number {
  return TASK_POINTS[taskNumber] ?? 1;
}

export function getTaskTitle(taskNumber: number): string {
  return TASK_TITLES[taskNumber] ?? `Задание ${taskNumber}`;
}

export function calculatePrimaryScore(taskResults: Record<number, boolean>): number {
  let score = 0;
  for (let i = 1; i <= 18; i++) {
    if (taskResults[i]) {
      score += getTaskPoints(i);
    }
  }
  return score;
}

export function primaryToTestScore(primary: number): number {
  return Math.min(100, Math.round((primary * 100) / 33));
}

export function saveExamResult(result: ExamResult): void {
  const history = getExamHistory();
  history.unshift(result);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }
}

export function getExamHistory(): ExamResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getTaskStats(): TaskStat[] {
  const history = getExamHistory();
  const stats: TaskStat[] = [];

  for (let i = 1; i <= 18; i++) {
    let attempts = 0;
    let correct = 0;

    for (const exam of history) {
      if (exam.taskResults[i] !== undefined) {
        attempts++;
        if (exam.taskResults[i]) correct++;
      }
    }

    stats.push({
      taskNumber: i,
      title: getTaskTitle(i),
      attempts,
      correct,
      percentage: attempts > 0 ? Math.round((correct / attempts) * 100) : 0,
    });
  }

  return stats;
}

export function getPredictedScore(): number {
  const stats = getTaskStats();
  let predictedPrimary = 0;

  for (const stat of stats) {
    if (stat.attempts > 0) {
      predictedPrimary += (stat.percentage / 100) * getTaskPoints(stat.taskNumber);
    }
  }

  return primaryToTestScore(Math.round(predictedPrimary));
}

export function getHeatmapData(): HeatmapItem[] {
  const stats = getTaskStats();

  return stats.map((stat) => ({
    taskNumber: stat.taskNumber,
    title: stat.title,
    percentage: stat.percentage,
    status:
      stat.attempts === 0
        ? "weak" as const
        : stat.percentage >= 70
          ? "strong" as const
          : stat.percentage >= 40
            ? "medium" as const
            : "weak" as const,
  }));
}

export function getCompletedVariants(): number[] {
  const history = getExamHistory();
  return Array.from(new Set(history.map((r) => r.variant)));
}
