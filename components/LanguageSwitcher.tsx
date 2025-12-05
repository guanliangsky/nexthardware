"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";
import { locales, localeNames, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const t = useTranslations(locale);

  const switchLanguage = (newLocale: Locale) => {
    setLocale(newLocale);
    // Refresh page to apply language change
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => switchLanguage("en")}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          locale === "en"
            ? "bg-slate-900 text-white"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
        }`}
        aria-label={t.accessibility?.switchLanguage || "Switch language"}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage("zh")}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          locale === "zh"
            ? "bg-slate-900 text-white"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
        }`}
        aria-label={t.accessibility?.switchLanguage || "切换语言"}
      >
        中文
      </button>
    </div>
  );
}


