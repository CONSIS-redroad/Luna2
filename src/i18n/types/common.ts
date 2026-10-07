// PATH: src/i18n/types/common.ts | VERSION: 3.0.0 | REQ-ID: I18N-COMMON-TYPE-01
export type SupportedLang = 'pl' | 'en' | 'de' | 'es';

export interface LangOption {
  code: SupportedLang;
  name: string;
  flag: string;
}

export interface CommonDictionary {
  appName: string;
  appSubtitle: string;
  changeLocation: string;
  nowBadge: string;
  rateSleep: string;
  exportData: string;
  installApp: string;
  close: string;
  save: string;
  cancel: string;
  loading: string;
  scrollExplore: string;
  orbitHint: string;
  panelsLayout: string;
  backgroundSettings: string;
  privacy: string;
  settings: string;
  settingsDesc: string;
  tabGeneral: string;
  tabWallpaper: string;
  tabPanels: string;
  tabData: string;
}
