interface TheoryPanelProps {
  theory: string;
}

export function TheoryPanel({ theory }: TheoryPanelProps) {
  return (
    <div className="prose prose-invert prose-sm max-w-none">
      {theory.split("\n").map((line, i) => {
        if (line.startsWith("```python")) return <div key={i} className="mt-2" />;
        if (line.startsWith("```")) return <div key={i} className="mb-2" />;
        if (line.startsWith("- ")) {
          return (
            <li key={i} className="text-gray-300 ml-4 list-disc">
              <InlineCode text={line.slice(2)} />
            </li>
          );
        }
        if (line.match(/^\d+\.\s/)) {
          return (
            <li key={i} className="text-gray-300 ml-4 list-decimal">
              <InlineCode text={line.replace(/^\d+\.\s/, "")} />
            </li>
          );
        }
        if (line.trim() === "") return <div key={i} className="h-2" />;
        return (
          <p key={i} className="text-gray-300 leading-relaxed">
            <InlineCode text={line} />
          </p>
        );
      })}
    </div>
  );
}

function InlineCode({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code key={i} className="px-1.5 py-0.5 rounded bg-gray-800 text-emerald-400 text-xs font-mono">
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
