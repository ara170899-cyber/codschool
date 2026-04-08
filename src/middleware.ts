import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

// ========== RATE LIMITER ==========
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMITS: Record<string, { limit: number; window: number }> = {
  "/api/ai-assistant": { limit: 20, window: 60_000 },      // 20/min — costs money
  "/api/math-assistant": { limit: 20, window: 60_000 },     // 20/min — costs money
  "/api/run-code": { limit: 30, window: 60_000 },           // 30/min
  "/api/": { limit: 60, window: 60_000 },                   // default 60/min
};

function getRateLimit(path: string) {
  for (const [prefix, config] of Object.entries(RATE_LIMITS)) {
    if (path.startsWith(prefix)) return config;
  }
  return { limit: 120, window: 60_000 };
}

function checkRateLimit(ip: string, path: string): boolean {
  const { limit, window } = getRateLimit(path);
  const key = `${ip}:${path.split("/").slice(0, 3).join("/")}`;
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + window });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

// Clean up old entries every 5 minutes
if (typeof globalThis !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    rateLimitMap.forEach((entry, key) => {
      if (now > entry.resetAt) rateLimitMap.delete(key);
    });
  }, 300_000);
}

// ========== AUTH ROUTES ==========
const AUTH_REQUIRED_API = ["/api/ai-assistant", "/api/math-assistant", "/api/run-code", "/api/check-code"];
// All app routes require auth — only landing, auth pages, and pricing are public
const PUBLIC_ROUTES = ["/", "/login", "/register", "/pricing", "/community"];
const isPublicRoute = (path: string) => PUBLIC_ROUTES.includes(path);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  // Rate limit API routes
  if (pathname.startsWith("/api/")) {
    if (!checkRateLimit(ip, pathname)) {
      return NextResponse.json(
        { error: "Слишком много запросов. Попробуйте позже." },
        { status: 429 }
      );
    }
  }

  // Update Supabase session
  const response = await updateSession(request);

  // Check auth for protected API routes (fail closed — reject if no session)
  if (AUTH_REQUIRED_API.some((r) => pathname.startsWith(r))) {
    const hasSession = request.cookies.getAll().some((c) => c.name.includes("auth-token") || c.name.includes("sb-"));
    if (!hasSession) {
      return NextResponse.json(
        { error: "Требуется авторизация" },
        { status: 401 }
      );
    }
  }

  // All non-public pages require authentication
  if (!pathname.startsWith("/api/") && !isPublicRoute(pathname)) {
    const hasSession = request.cookies.getAll().some((c) => c.name.includes("auth-token") || c.name.includes("sb-"));
    if (!hasSession) {
      return NextResponse.redirect(new URL("/register", request.url));
    }
  }

  // Security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("X-DNS-Prefetch-Control", "off");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
