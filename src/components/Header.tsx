// PATH: src/components/Header.tsx | VERSION: 3.1.0 | REQ-ID: UI-HEADER-12
import React from 'react';
import { Settings, Plus, MapPin } from 'lucide-react';
import { GeoLocation } from '../types/location';
import { useTranslation } from '../i18n/LanguageContext';

interface HeaderProps {
  location: GeoLocation;
  onOpenSettings: () => void;
  onOpenQuickRate: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  location, onOpenSettings, onOpenQuickRate
}) => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-4 z-40 max-w-[820px] mx-auto px-4 py-2 rounded-full bg-[#06080d]/65 backdrop-blur-3xl border border-white/[0.08] shadow-2xl flex items-center justify-between transition-all duration-300">
      <div className="flex items-center gap-2.5 pl-2 select-none">
        <span className="w-2 h-2 rounded-full bg-zinc-200 shadow-[0_0_10px_rgba(255,255,255,0.7)]" />
        <span className="font-extrabold text-sm tracking-[0.25em] text-zinc-100">LUNA</span>
        <span className="text-[10px] text-zinc-500 font-mono tracking-wider hidden sm:inline">OBSERVATORY</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-zinc-300 transition-colors cursor-pointer"
          title="Zmień miasto lub parametry"
        >
          <MapPin className="w-3 h-3 text-zinc-400" />
          <span>{location.name}</span>
        </button>

        <button
          onClick={onOpenQuickRate}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.07] hover:bg-white/[0.12] text-zinc-100 text-xs font-semibold border border-white/[0.1] transition-all cursor-pointer shadow-sm"
        >
          <Plus className="w-3.5 h-3.5 text-zinc-300" />
          <span>{t.common.rateSleep}</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.08] transition-all cursor-pointer"
          title={t.common.settings}
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
