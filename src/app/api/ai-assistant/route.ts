import { NextRequest } from "next/server";
import { askAssistant } from "@/lib/anthropic";
import { sanitizeMessage, sanitizeCode, parseBody, safeErrorMessage } from "@/lib/security";

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
      return new Response(JSON.stringify({ error: "Сообщение не передано" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const stream = await askAssistant({
      lessonTitle: typeof body.lessonTitle === "string" ? body.lessonTitle.slice(0, 200) : "",
      task: typeof body.task === "string" ? body.task.slice(0, 1000) : "",
      userCode: sanitizeCode(body.userCode),
      testResults: typeof body.testResults === "string" ? body.testResults.slice(0, 2000) : undefined,
      userMessage,
    });

    return new Response(stream, {
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
