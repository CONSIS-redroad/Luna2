// PATH: src/components/settings/SettingsGeneralSection.tsx | VERSION: 3.0.0 | REQ-ID: SET-GEN-01
import React from 'react';
import { MapPin } from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';
import { SUPPORTED_LANGS, SupportedLang } from '../../i18n';
import { GeoLocation } from '../../types/location';
import { GLOBAL_CITIES } from '../../services/locationService';

interface Props {
  location: GeoLocation;
  onSelectLocation: (loc: GeoLocation) => void;
}

export const SettingsGeneralSection: React.FC<Props> = ({ location, onSelectLocation }) => {
  const { lang, setLang } = useTranslation();

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-bold text-zinc-400 block mb-2">Język interfejsu / Interface Language</label>
        <div className="grid grid-cols-2 gap-2">
          {SUPPORTED_LANGS.map(l => (
            <button
              key={l.code}
              onClick={() => setLang(l.code as SupportedLang)}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                lang === l.code
                  ? 'border-zinc-400 bg-zinc-800/80 text-white shadow-sm'
                  : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              <span>{l.name}</span>
              <span className="text-base">{l.flag}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-zinc-800/80">
        <label className="text-xs font-bold text-zinc-400 block mb-2 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-zinc-400" /> Miasto obserwacji
        </label>
        <div className="grid grid-cols-3 gap-2">
          {GLOBAL_CITIES.map(c => (
            <button
              key={c.name}
              onClick={() => onSelectLocation(c)}
              className={`py-2 px-2 rounded-xl border text-xs font-bold truncate transition-all cursor-pointer ${
                location.name === c.name
                  ? 'border-zinc-400 bg-zinc-800/80 text-white'
                  : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
