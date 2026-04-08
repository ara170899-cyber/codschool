// ========== PLURALIZATION ==========

/**
 * Russian pluralization: 1 день, 2 дня, 5 дней
 */
export function pluralize(n: number, one: string, few: string, many: string): string {
  const abs = Math.abs(n) % 100;
  const lastDigit = abs % 10;
  if (abs >= 11 && abs <= 19) return many;
  if (lastDigit === 1) return one;
  if (lastDigit >= 2 && lastDigit <= 4) return few;
  return many;
}

// ========== SOUND ==========

export function playSuccessSound() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 800;
    gain.gain.value = 0.1;
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.stop(ctx.currentTime + 0.3);
  } catch {
    // Audio not supported
  }
}

// ========== SOFT MATCH ==========

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[.,!?;:'"()—–\-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function softMatch(actual: string, expected: string): boolean {
  if (actual.trim() === expected.trim()) return true;
  const normActual = normalize(actual);
  const normExpected = normalize(expected);
  if (normActual === normExpected) return true;
  const aLines = actual.trim().split("\n").map(normalize);
  const eLines = expected.trim().split("\n").map(normalize);
  if (aLines.length !== eLines.length) return false;
  return aLines.every((line, i) => line === eLines[i]);
}

// ========== INLINE CODE RENDERER ==========

import React from "react";

export function InlineCode({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return React.createElement(
    React.Fragment,
    null,
    ...parts.map((part, i) =>
      part.startsWith("`") && part.endsWith("`")
        ? React.createElement("code", {
            key: i,
            className: "px-1.5 py-0.5 rounded bg-gray-800 text-emerald-400 text-xs font-mono",
          }, part.slice(1, -1))
        : React.createElement("span", { key: i }, part)
    )
  );
}

// ========== PRICING CONFIG ==========

export const PRICING = {
  monthly: 990,
  lifetime: 6990,
  currency: "₽",
  freeModuleLimit: 8,
} as const;

export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("ru-RU")} ${PRICING.currency}`;
}
