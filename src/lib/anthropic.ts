import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

interface AskAssistantParams {
  lessonTitle: string;
  task: string;
  userCode: string;
  testResults?: string;
  userMessage: string;
}

const SYSTEM_PROMPT = `Ты ИИ-ассистент школы программирования Python.

ПРАВИЛА:
- НИКОГДА не давай полное решение
- Объясняй концепции и направляй к ответу
- Если ошибка — объясни что она значит и как проверить гипотезу
- Давай подсказки постепенно: сначала наводку, потом конкретнее
- Отвечай кратко (3-5 предложений)
- Отвечай на русском языке
- Если ученик просит "дай ответ" — откажи мягко и предложи подсказку`;

interface GetPersonalizedAdviceParams {
  completedLessons: string[];
  currentLesson: string;
  userCode: string;
  errorHistory: string[];
}

export async function getPersonalizedAdvice({
  completedLessons,
  currentLesson,
  userCode,
  errorHistory,
}: GetPersonalizedAdviceParams): Promise<ReadableStream> {
  const weakAreas = analyzeWeakAreas(errorHistory);

  const systemPrompt = `Ты — персональный Python-ментор ученика.

КОНТЕКСТ УЧЕНИКА:
- Пройдено уроков: ${completedLessons.length}
- Пройденные темы: ${completedLessons.join(", ") || "пока нет"}
- Текущий урок: ${currentLesson}
- Слабые области (на основе ошибок): ${weakAreas.length > 0 ? weakAreas.join(", ") : "пока не выявлены"}

ПРАВИЛА:
- Адаптируй объяснения к уровню ученика (${completedLessons.length < 5 ? "начинающий" : completedLessons.length < 15 ? "продолжающий" : "продвинутый"})
- Учитывай, какие темы ученик уже знает, не объясняй их заново
- Если у ученика есть слабые области — предлагай дополнительные упражнения по ним
- Будь ободряющим и поддерживающим
- Хвали за прогресс
- Если ученик застрял — напомни, что ошибки это нормальная часть обучения
- Отвечай на русском языке
- Давай конкретные советы, а не общие фразы`;

  const userMessage = `Код ученика:
\`\`\`python
${userCode}
\`\`\`

${errorHistory.length > 0 ? `Последние ошибки:\n${errorHistory.slice(-5).join("\n")}` : ""}

Дай персонализированный совет по текущему коду и прогрессу ученика.`;

  const stream = client.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });

  return new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
          controller.enqueue(new TextEncoder().encode(event.delta.text));
        }
      }
      controller.close();
    },
  });
}

function analyzeWeakAreas(errorHistory: string[]): string[] {
  const areaKeywords: Record<string, string[]> = {
    "синтаксис": ["SyntaxError", "IndentationError", "invalid syntax"],
    "типы данных": ["TypeError", "cannot convert", "unsupported operand"],
    "переменные": ["NameError", "not defined", "undefined"],
    "индексы и срезы": ["IndexError", "out of range", "index"],
    "циклы": ["while", "for", "infinite loop", "range"],
    "функции": ["return", "argument", "parameter", "def"],
    "строки": ["string", "str", "encode", "decode"],
    "списки": ["list", "append", "sort", "pop"],
    "словари": ["dict", "KeyError", "key"],
    "файлы": ["FileNotFoundError", "open", "read", "write"],
  };

  const weakAreas: string[] = [];
  const joined = errorHistory.join(" ").toLowerCase();

  for (const [area, keywords] of Object.entries(areaKeywords)) {
    if (keywords.some((kw) => joined.includes(kw.toLowerCase()))) {
      weakAreas.push(area);
    }
  }

  return weakAreas;
}

export async function askAssistant({
  lessonTitle,
  task,
  userCode,
  testResults,
  userMessage,
}: AskAssistantParams): Promise<ReadableStream> {
  const contextMessage = `Урок: "${lessonTitle}"
Задание: ${task}
Код ученика:
\`\`\`python
${userCode}
\`\`\`
${testResults ? `Результат проверки: ${testResults}` : ""}

Вопрос ученика: ${userMessage}`;

  const stream = client.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 512,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: contextMessage }],
  });

  return new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
          controller.enqueue(new TextEncoder().encode(event.delta.text));
        }
      }
      controller.close();
    },
  });
}
