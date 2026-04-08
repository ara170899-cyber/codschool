/**
 * Input validation and sanitization utilities
 */

const MAX_CODE_LENGTH = 10_000; // 10KB max code
const MAX_MESSAGE_LENGTH = 2_000; // 2KB max chat message
const MAX_ANSWER_LENGTH = 500; // 500 chars max answer

/**
 * Sanitize string input — trim, limit length, remove null bytes
 */
export function sanitizeString(input: unknown, maxLength: number): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/\0/g, "") // remove null bytes
    .trim()
    .slice(0, maxLength);
}

/**
 * Validate and sanitize code input
 */
export function sanitizeCode(code: unknown): string {
  return sanitizeString(code, MAX_CODE_LENGTH);
}

/**
 * Validate and sanitize chat message
 */
export function sanitizeMessage(message: unknown): string {
  return sanitizeString(message, MAX_MESSAGE_LENGTH);
}

/**
 * Validate and sanitize answer input
 */
export function sanitizeAnswer(answer: unknown): string {
  return sanitizeString(answer, MAX_ANSWER_LENGTH);
}

/**
 * Validate lesson ID — only alphanumeric, hyphens, underscores
 */
export function validateLessonId(id: unknown): string | null {
  if (typeof id !== "string") return null;
  const cleaned = id.trim();
  if (!/^[a-zA-Z0-9_-]+$/.test(cleaned)) return null;
  if (cleaned.length > 100) return null;
  return cleaned;
}

/**
 * Validate task number
 */
export function validateTaskNumber(n: unknown): number | null {
  const num = typeof n === "string" ? parseInt(n, 10) : typeof n === "number" ? n : NaN;
  if (isNaN(num) || num < 1 || num > 18) return null;
  return num;
}

/**
 * Safe error message — never expose stack traces
 */
export function safeErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    // Only return message, never stack
    const msg = err.message;
    // Don't expose file paths or internal details
    if (msg.includes("/") || msg.includes("\\") || msg.includes("node_modules")) {
      return "Внутренняя ошибка сервера";
    }
    return msg;
  }
  return "Внутренняя ошибка сервера";
}

/**
 * Parse and validate JSON body with size limit
 */
export async function parseBody(request: Request, maxSize: number = 50_000): Promise<Record<string, unknown> | null> {
  try {
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > maxSize) {
      return null;
    }

    const body = await request.json();
    if (typeof body !== "object" || body === null) return null;
    return body as Record<string, unknown>;
  } catch {
    return null;
  }
}
