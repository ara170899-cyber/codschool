"use client";

import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  fontSize?: number;
}

export function CodeEditor({ value, onChange, fontSize = 14 }: CodeEditorProps) {
  return (
    <div className="h-full rounded-lg overflow-hidden border border-gray-800">
      <Editor
        height="100%"
        defaultLanguage="python"
        theme="vs-dark"
        value={value}
        onChange={(v) => onChange(v ?? "")}
        options={{
          fontSize,
          fontFamily: "var(--font-geist-mono), monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          padding: { top: 12 },
          lineNumbersMinChars: 3,
          tabSize: 4,
          insertSpaces: true,
          wordWrap: "on",
          automaticLayout: true,
          scrollbar: {
            alwaysConsumeMouseWheel: false,
          },
        }}
      />
    </div>
  );
}
