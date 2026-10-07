// PATH: src/components/CalendarPhaseLegend.tsx | VERSION: 3.1.0 | REQ-ID: CAL-LEGEND-01
import React from 'react';
import { useTranslation } from '../i18n/LanguageContext';

export const CalendarPhaseLegend: React.FC = () => {
  const { t } = useTranslation();
  const phases = [
    { label: t.astro.phaseNewMoon, icon: '🌑' },
    { label: t.astro.phaseFirstQuarter, icon: '🌓' },
    { label: t.astro.phaseFullMoon, icon: '🌕' },
    { label: t.astro.phaseLastQuarter, icon: '🌗' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-white/[0.08] text-[11px] text-zinc-400 font-medium">
      {phases.map(p => (
        <span key={p.label} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/40 border border-white/[0.06]">
          <span className="text-xs">{p.icon}</span>
          <span>{p.label}</span>
        </span>
      ))}
    </div>
  );
};
