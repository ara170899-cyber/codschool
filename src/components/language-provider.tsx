"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { type Locale, translations, detectLocaleFromTimezone } from "@/lib/i18n";

const STORAGE_KEY = "codeschool_locale";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ru");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && translations[saved]) {
      setLocaleState(saved);
    } else {
      const detected = detectLocaleFromTimezone();
      setLocaleState(detected);
      localStorage.setItem(STORAGE_KEY, detected);
    }
    setHydrated(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
  }, []);

  const t = useCallback((key: string): string => {
    return translations[locale]?.[key] ?? translations["ru"]?.[key] ?? key;
  }, [locale]);

  if (!hydrated) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Fallback for components outside provider
    return {
      locale: "ru" as Locale,
      setLocale: () => {},
      t: (key: string) => translations["ru"]?.[key] ?? key,
    };
  }
  return ctx;
}
