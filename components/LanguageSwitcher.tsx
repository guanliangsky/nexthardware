"use client";

import { useState } from "react";
import { locales, localeNames, type Locale } from "@/lib/i18n";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
    // Reload page to apply translations
    window.location.reload();
  };

  const currentLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : "en";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors rounded-md hover:bg-slate-100"
        aria-label="Switch language"
      >
        <span>{localeNames[currentLocale]}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 rounded-md shadow-lg z-20">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  currentLocale === locale
                    ? 'bg-slate-100 text-slate-900 font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {localeNames[locale]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

