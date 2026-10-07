// PATH: src/components/HeroLandingView.tsx | VERSION: 3.0.0 | REQ-ID: HERO-VIEW-07
import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { calculateMoonPhaseForDate, getLocalizedPhaseName } from '../services/astronomy';
import { getTodayDate, formatPolishDisplayDate } from '../services/dateUtils';
import { useTranslation } from '../i18n/LanguageContext';

interface HeroProps { cityName: string; onExplore: () => void; }

export const HeroLandingView: React.FC<HeroProps> = ({ cityName, onExplore }) => {
  const { t } = useTranslation();
  const today = getTodayDate();
  const { phase, illumination } = calculateMoonPhaseForDate(today);
  const phaseName = getLocalizedPhaseName(phase, t.astro);
  const displayDate = formatPolishDisplayDate(today);

  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-between py-10 px-4 text-center select-none relative z-20 pointer-events-none">
      <div className="pt-2 pointer-events-auto flex flex-col sm:flex-row items-center gap-2">
        <span className="text-[11px] uppercase tracking-[0.3em] text-zinc-300 font-semibold px-4 py-1.5 rounded-full bg-[#07090e]/75 border border-zinc-800 backdrop-blur-xl shadow-xl">
          {cityName} · {displayDate}
        </span>
        <span className="text-[11px] text-zinc-400 font-medium px-3 py-1 rounded-full bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
          {t.common.orbitHint}
        </span>
      </div>

      <div className="my-auto py-10 flex flex-col items-center justify-center">
        <h1 className="text-7xl sm:text-9xl font-extrabold tracking-[0.2em] text-zinc-100 drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]">
          LUNA
        </h1>
        <div className="mt-5 px-5 py-2 rounded-full bg-[#080b10]/80 backdrop-blur-2xl border border-zinc-800 shadow-2xl inline-flex items-center gap-3">
          <span className="text-xs sm:text-sm text-zinc-300 font-semibold">{phaseName}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
          <strong className="text-xs sm:text-sm text-zinc-100 tracking-wide font-mono">{illumination}% {t.astro.illumination}</strong>
        </div>
      </div>

      <button
        onClick={onExplore}
        className="pointer-events-auto group flex flex-col items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer pb-2"
      >
        <span className="tracking-widest uppercase text-[10px] flex items-center gap-1.5 text-zinc-400 group-hover:text-zinc-200">
          <Sparkles className="w-3 h-3 text-zinc-400" /> {t.common.scrollExplore}
        </span>
        <div className="w-8 h-8 rounded-full border border-zinc-800 bg-zinc-900/60 backdrop-blur-md flex items-center justify-center group-hover:border-zinc-600 transition-all animate-bounce">
          <ChevronDown className="w-3.5 h-3.5 text-zinc-300" />
        </div>
      </button>
    </section>
  );
};
