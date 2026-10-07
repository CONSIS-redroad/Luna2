// PATH: src/hooks/useI18n.ts | VERSION: 2.9.0 | REQ-ID: I18N-HOOK-02
import { useTranslation } from '../i18n/LanguageContext';

export function useI18n() {
  const { lang, t, setLang } = useTranslation();
  return { currentLang: lang, t, setLang };
}
