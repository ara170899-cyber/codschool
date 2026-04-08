export type Difficulty = "easy" | "medium" | "hard";
export type ProblemTag = "arrays" | "strings" | "hash-map" | "two-pointers" | "sorting" | "searching" | "stack" | "queue" | "recursion" | "dp" | "math" | "linked-list";

export interface TestCase {
  input: string;
  expected: string;
  hidden?: boolean;
}

export interface Problem {
  id: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  tags: ProblemTag[];
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode: string;
  testCases: TestCase[];
  hints: string[];
  solution: string;
  acceptance: number;
}
