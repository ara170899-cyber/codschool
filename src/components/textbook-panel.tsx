"use client";

import { useState, useMemo } from "react";
import { getTextbook } from "@/lib/textbook";

interface TextbookPanelProps {
  module: number;
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("```") && !inCodeBlock) {
      inCodeBlock = true;
      codeLines = [];
      continue;
    }

    if (line === "```" && inCodeBlock) {
      inCodeBlock = false;
      elements.push(
        <pre key={`code-${i}`} className="my-3 rounded-lg bg-gray-950 border border-gray-800 p-3 font-mono text-sm text-emerald-300 overflow-x-auto whitespace-pre">
          {codeLines.join("\n")}
        </pre>
      );
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (line.startsWith("# ")) {
      elements.push(<h1 key={i} className="text-2xl font-bold text-white mt-6 mb-3">{line.slice(2)}</h1>);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="text-xl font-bold text-emerald-400 mt-6 mb-2">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="text-lg font-semibold text-white mt-4 mb-2">{line.slice(4)}</h3>);
    } else if (line.startsWith("| ")) {
      elements.push(<p key={i} className="text-gray-400 text-sm font-mono">{line}</p>);
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="text-gray-300 ml-4 list-disc text-sm leading-relaxed">
          <InlineCode text={line.slice(2)} />
        </li>
      );
    } else if (line.match(/^\d+\.\s/)) {
      elements.push(
        <li key={i} className="text-gray-300 ml-4 list-decimal text-sm leading-relaxed">
          <InlineCode text={line.replace(/^\d+\.\s/, "")} />
        </li>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(
        <p key={i} className="text-gray-300 text-sm leading-relaxed">
          <InlineCode text={line} />
        </p>
      );
    }
  }

  return elements;
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

export function TextbookPanel({ module }: TextbookPanelProps) {
  const [open, setOpen] = useState(false);
  const book = getTextbook(module);

  const rendered = useMemo(() => {
    if (!book) return null;
    return renderContent(book.content);
  }, [book]);

  if (!book) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full py-2 rounded-lg border border-blue-500/20 bg-blue-500/5 text-blue-400 text-sm font-medium hover:bg-blue-500/10 transition-colors"
      >
        📖 Открыть учебник
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-gray-950/95" onClick={() => setOpen(false)}>
          <div className="h-full max-w-3xl mx-auto flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 shrink-0">
              <h2 className="text-lg font-bold text-white">{book.title}</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white text-xl leading-none"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="max-w-none pb-20">
                {rendered}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
