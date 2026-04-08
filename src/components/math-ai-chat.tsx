"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface MathAIChatProps {
  taskNumber: number;
  taskTitle: string;
  taskDescription: string;
  taskId: string;
  userAnswer: string;
  isCorrect: boolean | null;
}

const QUICK_QUESTIONS = [
  "Не понимаю задачу",
  "Какую формулу использовать?",
  "Где я ошибся?",
  "Объясни теорию",
];

export function MathAIChat({
  taskNumber,
  taskTitle,
  taskDescription,
  taskId,
  userAnswer,
  isCorrect,
}: MathAIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || streaming) return;

    const userMessage = text.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setStreaming(true);

    try {
      const res = await fetch("/api/math-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskNumber,
          taskTitle,
          taskDescription,
          taskId,
          userAnswer,
          isCorrect,
          userMessage,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: err.error || "Ошибка" },
        ]);
        setStreaming(false);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      try {
        while (reader) {
          const { done, value } = await reader.read();
          if (done) break;
          assistantText += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: assistantText,
            };
            return updated;
          });
        }
      } catch {
        reader?.cancel();
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Ошибка подключения к ИИ-ассистенту" },
      ]);
    }

    setStreaming(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 flex items-center justify-center text-2xl transition-all hover:scale-110"
        title="ИИ-репетитор"
      >
        🤖
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[520px] rounded-2xl border border-gray-700 bg-gray-900 shadow-2xl shadow-black/40 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <div>
            <h3 className="text-sm font-semibold text-white">ИИ-Репетитор</h3>
            <p className="text-[10px] text-gray-500">
              Задание {taskNumber} — {taskTitle}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="w-7 h-7 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center transition-colors text-lg"
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-center mt-6 space-y-4">
            <p className="text-sm text-gray-500">
              Привет! Я помогу разобраться с задачей. Выбери вопрос или напиши свой:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="px-3 py-1.5 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/30 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`text-sm rounded-lg px-3 py-2 ${
              msg.role === "user"
                ? "bg-blue-500/10 text-blue-300 ml-8"
                : "bg-gray-800 text-gray-300 mr-8"
            }`}
          >
            <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
          </div>
        ))}
        {messages.length > 0 && !streaming && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="px-2 py-1 text-[10px] rounded-full bg-gray-800 text-gray-500 hover:text-gray-300 hover:bg-gray-700 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-800 p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Задайте вопрос..."
            disabled={streaming}
            className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={streaming || !input.trim()}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors disabled:opacity-50"
          >
            {streaming ? "..." : "\u2192"}
          </button>
        </div>
      </div>
    </div>
  );
}
