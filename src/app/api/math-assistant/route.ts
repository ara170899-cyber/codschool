import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { sanitizeMessage, sanitizeString, validateTaskNumber, parseBody, safeErrorMessage } from "@/lib/security";
import { getAllTasksForType } from "@/lib/ege-math";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await parseBody(req);
    if (!body) {
      return new Response(JSON.stringify({ error: "Некорректный запрос" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userMessage = sanitizeMessage(body.userMessage);
    if (!userMessage) {
      return new Response(
        JSON.stringify({ error: "Сообщение не передано" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const taskNumber = validateTaskNumber(body.taskNumber) ?? 0;
    const taskTitle = sanitizeString(body.taskTitle, 200);
    const taskDescription = sanitizeString(body.taskDescription, 2000);
    const userAnswer = sanitizeString(body.userAnswer, 500);
    const taskId = sanitizeString(body.taskId, 100);

    // Look up correct answer SERVER-SIDE — never trust client
    let correctAnswer = "";
    if (taskNumber) {
      const tasks = getAllTasksForType(taskNumber);
      const found = tasks.find((t) => t.id === taskId);
      correctAnswer = found?.answer ?? "";
    }
    const isCorrect = userAnswer && correctAnswer ? userAnswer.trim() === correctAnswer.trim() : null;

    const systemPrompt = `Ты — репетитор по математике, готовишь школьника к ЕГЭ 2026 (профильный уровень).

Задание №${taskNumber || "?"}: ${taskTitle}
Задача: ${taskDescription}
Ответ ученика: ${userAnswer || "не введён"}
Правильный ответ: ${correctAnswer}
Верно: ${isCorrect === null ? "ещё не проверено" : isCorrect ? "да" : "нет"}

ПРАВИЛА:
- НИКОГДА не давай готовый ответ сразу
- Если ученик ошибся — спроси "Какую формулу ты использовал?" или "Покажи ход решения"
- Объясняй на пальцах, простым языком
- Давай подсказки постепенно
- Будь ободряющим
- Отвечай кратко (3-5 предложений)
- Отвечай на русском`;

    const stream = client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 512,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              controller.enqueue(new TextEncoder().encode(event.delta.text));
            }
          }
        } catch {
          // Stream error — close gracefully
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: safeErrorMessage(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
