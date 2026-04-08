import { NextRequest, NextResponse } from "next/server";
import { getLessonById } from "@/lib/lessons";
import { gradeCode } from "@/lib/grader";
import { sanitizeCode, validateLessonId, parseBody, safeErrorMessage } from "@/lib/security";

export async function POST(req: NextRequest) {
  try {
    const body = await parseBody(req);
    if (!body) {
      return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
    }

    const code = sanitizeCode(body.code);
    const lessonId = validateLessonId(body.lessonId);

    if (!code || !lessonId) {
      return NextResponse.json({ error: "Код и lessonId обязательны" }, { status: 400 });
    }

    const lesson = getLessonById(lessonId);
    if (!lesson) {
      return NextResponse.json({ error: "Урок не найден" }, { status: 404 });
    }

    const result = await gradeCode(code, lesson.tests);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: safeErrorMessage(err) },
      { status: 500 }
    );
  }
}
