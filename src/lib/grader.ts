import { Test, TestResult, GradeResult } from "@/types";
import { runPython } from "./piston";

export async function gradeCode(code: string, tests: Test[]): Promise<GradeResult> {
  const details: TestResult[] = [];

  for (const test of tests) {
    try {
      const result = await runPython(code, test.input);

      if (result.stderr) {
        details.push({
          passed: false,
          input: test.input,
          expected: test.expected,
          actual: result.stderr.trim(),
          hidden: test.hidden,
        });
        continue;
      }

      const actual = result.stdout.trim();
      const expected = test.expected.trim();
      const passed = actual === expected;

      details.push({
        passed,
        input: test.input,
        expected,
        actual,
        hidden: test.hidden,
      });
    } catch (err) {
      details.push({
        passed: false,
        input: test.input,
        expected: test.expected,
        actual: err instanceof Error ? err.message : "Ошибка выполнения",
        hidden: test.hidden,
      });
    }
  }

  const passed = details.filter((d) => d.passed).length;
  const failed = details.filter((d) => !d.passed).length;

  return { passed, failed, total: tests.length, details };
}
