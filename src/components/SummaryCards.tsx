// PATH: src/components/SummaryCards.tsx | VERSION: 3.1.0 | REQ-ID: UI-SUMMARY-06
import React from 'react';
import { Moon, Sparkles } from 'lucide-react';
import { NightCalculated } from '../types/moon';
import { useTranslation } from '../i18n/LanguageContext';

interface SummaryCardsProps {
  bestNight: NightCalculated; worstNight: NightCalculated;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ bestNight, worstNight }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-zinc-950/40 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl flex items-center gap-4.5">
        <div className="w-12 h-12 rounded-xl bg-zinc-900/60 border border-white/[0.08] text-zinc-200 flex items-center justify-center shrink-0">
          <Moon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-0.5 font-mono">
            {t.panels.bestNightTitle}
          </p>
          <p className="text-3xl font-extrabold text-zinc-100 font-mono leading-tight">
            {bestNight.sleep}%
          </p>
          <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5 font-medium">
            <span className="font-bold text-zinc-200">{bestNight.date} ({bestNight.day})</span>
            <span>· {t.astro.nightQualityExcellent}</span>
          </p>
        </div>
      </div>

      <div className="bg-zinc-950/40 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl flex items-center gap-4.5">
        <div className="w-12 h-12 rounded-xl bg-zinc-900/60 border border-white/[0.08] text-zinc-400 flex items-center justify-center shrink-0">
          <Sparkles className="w-6 h-6 text-zinc-400" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-0.5 font-mono">
            {t.panels.worstNightTitle}
          </p>
          <p className="text-3xl font-extrabold text-zinc-300 font-mono leading-tight">
            {worstNight.sleep}%
          </p>
          <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5 font-medium">
            <span className="font-bold text-zinc-200">{worstNight.date} ({worstNight.day})</span>
            <span>· {t.astro.nightQualityWorst}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
