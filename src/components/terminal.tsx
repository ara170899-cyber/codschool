"use client";

interface TerminalProps {
  output: string;
  isError?: boolean;
}

export function Terminal({ output, isError }: TerminalProps) {
  return (
    <div className="h-full rounded-lg border border-gray-800 bg-gray-950 p-4 overflow-auto font-mono text-sm">
      {output ? (
        <pre className={`whitespace-pre-wrap ${isError ? "text-red-400" : "text-gray-300"}`}>
          {output}
        </pre>
      ) : (
        <p className="text-gray-600">Нажмите ▶ Run, чтобы запустить код</p>
      )}
    </div>
  );
}
