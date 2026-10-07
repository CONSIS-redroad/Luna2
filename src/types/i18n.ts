// PATH: src/types/i18n.ts | VERSION: 1.2.0 | REQ-ID: I18N-TYPES-01
export type SupportedLanguage = 'pl' | 'en' | 'de' | 'es' | 'ja';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  flag: string;
}

export type TranslationKey =
  | 'appName'
  | 'appSubtitle'
  | 'bestNightTitle'
  | 'worstNightTitle'
  | 'rateSleepBtn'
  | 'changeLocation'
  | 'tabForecast'
  | 'tabCalendar'
  | 'tabMoonSim'
  | 'tabJournal'
  | 'installBtn'
  | 'nowIndicator';
