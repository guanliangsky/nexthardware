import { en } from "./translations/en";
import { zh } from "./translations/zh";
import type { Locale } from "./i18n";

/**
 * Get translations for a given locale
 * This is NOT a React hook - it's a regular function that can be used in both
 * client and server components.
 */
export function getTranslations(locale: Locale = "en") {
  const translations = {
    en,
    zh,
  };

  return translations[locale] || translations.en;
}

/**
 * @deprecated Use getTranslations instead. This alias is kept for backward compatibility
 * but will be removed in a future version.
 */
export function useTranslations(locale: Locale = "en") {
  return getTranslations(locale);
}



