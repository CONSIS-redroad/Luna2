// PATH: src/i18n/types.ts | VERSION: 3.3.0 | REQ-ID: I18N-TYPE-04
import { CommonDictionary, SupportedLang, LangOption } from './types/common';

export * from './types/common';

export interface AstroDictionary {
  illumination: string; moonAge: string; days: string;
  phaseNewMoon: string; phaseWaxingCrescent: string; phaseFirstQuarter: string;
  phaseWaxingGibbous: string; phaseFullMoon: string; phaseWaningGibbous: string;
  phaseLastQuarter: string; phaseWaningCrescent: string;
  nightQualityExcellent: string; nightQualityGood: string;
  nightQualityModerate: string; nightQualityPoor: string; nightQualityWorst: string;
}

export interface PanelsDictionary {
  tabForecast: string; tabCalendar: string; tabMoonSim: string; tabJournal: string;
  bestNightTitle: string; worstNightTitle: string; scoreSleep: string; scoreAstro: string;
  notesTitle: string; notesPlaceholder: string; saveSuccess: string; emptyJournal: string;
  nightTemp: string; cloudCover: string; visibility: string;
  userLoggedSleep: string; algorithmSleep: string; sleepScoreCustom: string;
}

export interface TranslationSchema {
  common: CommonDictionary; astro: AstroDictionary; panels: PanelsDictionary;
}
