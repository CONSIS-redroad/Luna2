// PATH: src/i18n/LanguageContext.tsx | VERSION: 2.9.0 | REQ-ID: I18N-CTX-01
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLang, TranslationSchema } from './types';
import { getDictionary } from './index';

interface LangContextType {
  lang: SupportedLang;
  t: TranslationSchema;
  setLang: (l: SupportedLang) => void;
}

const STORAGE_KEY = 'luna_selected_lang_v1';
const LangContext = createContext<LangContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<SupportedLang>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as SupportedLang;
    return (['pl', 'en', 'de', 'es'].includes(saved)) ? saved : 'pl';
  });

  const setLang = (newLang: SupportedLang) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  };

  const t = getDictionary(lang);

  return (
    <LangContext.Provider value={{ lang, t, setLang }}>
      {children}
    </LangContext.Provider>
  );
};

export function useTranslation(): LangContextType {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider');
  return ctx;
}
