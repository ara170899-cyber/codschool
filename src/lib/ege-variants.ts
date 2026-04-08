import { allMathTopics } from "@/lib/ege-math";
import { MathTask } from "@/types/math";

export interface VariantTask {
  taskNumber: number;
  task: MathTask;
}

export function generateVariant(variantNumber: number): VariantTask[] {
  const result: VariantTask[] = [];

  for (let taskNumber = 1; taskNumber <= 18; taskNumber++) {
    const topic = allMathTopics.find((t) => t.taskNumber === taskNumber);

    if (!topic || topic.tasks.length === 0) {
      result.push({
        taskNumber,
        task: {
          id: `placeholder-${taskNumber}`,
          description: `Задание ${taskNumber} (нет задач в банке)`,
          answer: "0",
          solution: "Нет решения",
          difficulty: 1,
        },
      });
      continue;
    }

    const index = (variantNumber * taskNumber) % topic.tasks.length;
    result.push({
      taskNumber,
      task: topic.tasks[index],
    });
  }

  return result;
}
