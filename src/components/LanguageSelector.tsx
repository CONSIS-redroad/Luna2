// PATH: src/components/LanguageSelector.tsx | VERSION: 2.9.0 | REQ-ID: UI-LANG-03
import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { SUPPORTED_LANGS, SupportedLang } from '../i18n';

export const LanguageSelector: React.FC = () => {
  const { lang, setLang } = useTranslation();

  return (
    <div className="flex items-center gap-1.5 bg-[#0a0f16]/70 border border-white/15 rounded-xl px-2.5 py-1.5 shadow-md backdrop-blur-md">
      <Globe className="w-3.5 h-3.5 text-[#38bdf8]" />
      <select
        value={lang}
        onChange={e => setLang(e.target.value as SupportedLang)}
        className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer [&>option]:bg-[#0f1720] [&>option]:text-white"
        title="Wybierz język / Select language"
      >
        {SUPPORTED_LANGS.map(l => (
          <option key={l.code} value={l.code} className="bg-[#0f1720] text-white">
            {l.flag} {l.name}
          </option>
        ))}
      </select>
    </div>
  );
};
