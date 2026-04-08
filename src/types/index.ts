export interface Lesson {
  id: string;
  module: number;
  title: string;
  theory: string;
  task: string;
  starterCode: string;
  tests: Test[];
  hints: string[];
}

export interface Test {
  input: string;
  expected: string;
  hidden?: boolean;
}

export interface TestResult {
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  hidden?: boolean;
}

export interface GradeResult {
  passed: number;
  failed: number;
  total: number;
  details: TestResult[];
}

export interface Profile {
  id: string;
  name: string;
  role: "student" | "teacher" | "admin";
  avatarUrl?: string;
  createdAt: string;
}

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  status: "started" | "completed" | "skipped";
  attempts: number;
  code?: string;
  completedAt?: string;
  createdAt: string;
}

export interface Badge {
  id: string;
  userId: string;
  badgeType: string;
  earnedAt: string;
}

export interface Module {
  id: number;
  title: string;
  icon: string;
  lessons: string[];
}
