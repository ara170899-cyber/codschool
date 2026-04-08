"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "./language-provider";
import { type Locale, localeNames, localeFlags } from "@/lib/i18n";

const locales: Locale[] = ["ru", "en", "fr", "es"];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
      >
        <span>{localeFlags[locale]}</span>
        <span className="hidden sm:inline text-xs">{localeNames[locale]}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-40 rounded-lg border border-gray-800 bg-gray-900 shadow-xl z-50 py-1">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => { setLocale(l); setOpen(false); }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                l === locale ? "text-emerald-400 bg-emerald-500/5" : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <span>{localeFlags[l]}</span>
              <span>{localeNames[l]}</span>
              {l === locale && <span className="ml-auto text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
