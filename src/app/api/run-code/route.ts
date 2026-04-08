import { NextRequest, NextResponse } from "next/server";
import { runPython } from "@/lib/piston";
import { sanitizeCode, parseBody, safeErrorMessage } from "@/lib/security";

export async function POST(req: NextRequest) {
  try {
    const body = await parseBody(req);
    if (!body) {
      return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
    }

    const code = sanitizeCode(body.code);
    if (!code) {
      return NextResponse.json({ error: "Код не передан" }, { status: 400 });
    }

    const stdin = typeof body.stdin === "string" ? body.stdin.slice(0, 1000) : "";

    const result = await runPython(code, stdin);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: safeErrorMessage(err) },
      { status: 500 }
    );
  }
}
