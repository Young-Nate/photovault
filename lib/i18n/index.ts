import { Locale, defaultLocale } from "./config";
import type enTranslations from "./translations/en.json";

export type Translations = typeof enTranslations;

const translationCache: Partial<Record<Locale, Translations>> = {};

export async function getTranslations(locale: Locale): Promise<Translations> {
  if (translationCache[locale]) {
    return translationCache[locale]!;
  }

  try {
    const translations = await import(`./translations/${locale}.json`);
    translationCache[locale] = translations.default || translations;
    return translationCache[locale]!;
  } catch {
    if (locale !== defaultLocale) {
      return getTranslations(defaultLocale);
    }
    throw new Error(`Could not load translations for locale: ${locale}`);
  }
}

// Synchronous version using require() for server components
export function getTranslationsSync(locale: Locale): Translations {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(`./translations/${locale}.json`);
  } catch {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(`./translations/${defaultLocale}.json`);
  }
}
