// PATH: src/i18n/index.ts | VERSION: 2.9.0 | REQ-ID: I18N-INDEX-01
import { SupportedLang, LangOption, TranslationSchema } from './types';
import { pl } from './locales/pl';
import { en } from './locales/en';
import { de } from './locales/de';
import { es } from './locales/es';

export const SUPPORTED_LANGS: LangOption[] = [
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export const DICTIONARIES: Record<SupportedLang, TranslationSchema> = {
  pl,
  en,
  de,
  es,
};

export function getDictionary(lang: SupportedLang): TranslationSchema {
  return DICTIONARIES[lang] || DICTIONARIES.pl;
}

export * from './types';
