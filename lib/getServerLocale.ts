import { cookies } from 'next/headers';
import { locales, type Locale } from './i18n';

/**
 * Get the locale from cookies in server components
 * Falls back to 'en' if no valid locale is found
 */
export async function getServerLocale(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const locale = cookieStore.get('locale')?.value as Locale;
    return (locale && locales.includes(locale)) ? locale : 'en';
  } catch (error) {
    // If cookies() fails (e.g., in middleware), default to 'en'
    return 'en';
  }
}

