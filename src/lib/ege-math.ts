import { MathTask, MathTopic } from "@/types/math";
import { egeMathTasks1 } from "./ege-math-tasks-1";
import { egeMathTasks2 } from "./ege-math-tasks-2";
import { egeMathTasks3 } from "./ege-math-tasks-3";
import { egeBankPart1 } from "./ege-bank-part1";
import { egeBankPart2 } from "./ege-bank-part2";
import { egeBankPart3 } from "./ege-bank-part3";

export const allMathTopics: MathTopic[] = [
  ...egeMathTasks1,
  ...egeMathTasks2,
  ...egeMathTasks3,
];

const bankTasks: Record<number, MathTask[]> = {
  ...egeBankPart1,
  ...egeBankPart2,
  ...egeBankPart3,
};

export function getMathTopicByNumber(taskNumber: number): MathTopic | undefined {
  return allMathTopics.find((t) => t.taskNumber === taskNumber);
}

export function getAllTasksForType(taskNumber: number): MathTask[] {
  const topic = getMathTopicByNumber(taskNumber);
  const originalTasks = topic?.tasks ?? [];
  const additional = bankTasks[taskNumber] ?? [];
  return [...originalTasks, ...additional];
}
