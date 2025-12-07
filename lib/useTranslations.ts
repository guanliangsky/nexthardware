import { en } from "./translations/en";
import { zh } from "./translations/zh";
import type { Locale } from "./i18n";

export function useTranslations(locale: Locale = "en") {
  const translations = {
    en,
    zh,
  };

  return translations[locale] || translations.en;
}


