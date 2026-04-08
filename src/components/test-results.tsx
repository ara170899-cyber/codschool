import { GradeResult } from "@/types";

interface TestResultsProps {
  result: GradeResult;
}

export function TestResults({ result }: TestResultsProps) {
  const allPassed = result.failed === 0;

  return (
    <div className="space-y-3">
      <div className={`text-sm font-semibold ${allPassed ? "text-emerald-400" : "text-red-400"}`}>
        {allPassed
          ? `Все тесты пройдены (${result.passed}/${result.total})`
          : `Пройдено ${result.passed}/${result.total}`}
      </div>

      {result.details.map((test, i) => (
        <div
          key={i}
          className={`rounded-lg border p-3 text-sm ${
            test.passed
              ? "border-emerald-500/20 bg-emerald-500/5"
              : "border-red-500/20 bg-red-500/5"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span>{test.passed ? "✅" : "❌"}</span>
            <span className="text-gray-400">Тест {i + 1}</span>
          </div>
          {!test.hidden && !test.passed && (
            <div className="mt-2 space-y-1 font-mono text-xs">
              {test.input && (
                <div className="text-gray-500">
                  Ввод: <pre className="inline-block text-gray-300 whitespace-pre">{test.input}</pre>
                </div>
              )}
              <div className="text-gray-500">
                Ожидалось:
                <pre className="text-emerald-400 whitespace-pre mt-0.5">{test.expected}</pre>
              </div>
              <div className="text-gray-500">
                Получено:
                <pre className="text-red-400 whitespace-pre mt-0.5">{test.actual}</pre>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
