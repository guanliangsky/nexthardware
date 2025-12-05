"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { locales, type Locale } from "@/lib/i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get locale from cookie or default to 'en'
    if (typeof window !== "undefined") {
      const savedLocale = document.cookie
        .split("; ")
        .find((row) => row.startsWith("locale="))
        ?.split("=")[1] as Locale;

      if (savedLocale && locales.includes(savedLocale)) {
        setLocaleState(savedLocale);
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    // Save to cookie (expires in 1 year)
    if (typeof window !== "undefined") {
      document.cookie = `locale=${newLocale}; path=/; max-age=${365 * 24 * 60 * 60}`;
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}


