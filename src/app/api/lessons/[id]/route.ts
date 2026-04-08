import { NextRequest, NextResponse } from "next/server";
import { getLessonById } from "@/lib/lessons";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const lesson = getLessonById(params.id);

  if (!lesson) {
    return NextResponse.json({ error: "Урок не найден" }, { status: 404 });
  }

  return NextResponse.json(lesson);
}
