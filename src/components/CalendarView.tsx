// PATH: src/components/CalendarView.tsx | VERSION: 3.3.0 | REQ-ID: CALENDAR-07
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Moon } from 'lucide-react';
import { calculateMoonPhaseForDate } from '../services/astronomy';
import { getTodayDate, formatLocalDate } from '../services/dateUtils';
import { detectMainPhase, getMainPhaseLabel } from '../services/calendarPhases';
import { CalendarDayCell } from './CalendarDayCell';
import { CalendarPhaseLegend } from './CalendarPhaseLegend';
import { useTranslation } from '../i18n/LanguageContext';
import { SleepEntry } from '../types/journal';

interface CalendarProps {
  onSelectDate: (dateStr: string, phasePct: number) => void;
  getEntry: (dateStr: string) => SleepEntry | undefined;
}

export const CalendarView: React.FC<CalendarProps> = ({ onSelectDate, getEntry }) => {
  const { lang, t } = useTranslation();
  const [curr, setCurr] = useState<Date>(() => getTodayDate());
  const todayStr = formatLocalDate(getTodayDate());
  const y = curr.getFullYear(), m = curr.getMonth();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const firstDay = (new Date(y, m, 1).getDay() + 6) % 7;
  const monthTitle = new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric' }).format(curr);

  return (
    <div className="bg-zinc-950/40 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl mb-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Moon className="w-4 h-4 text-zinc-300" />
          <h2 className="text-sm font-bold text-zinc-100 capitalize tracking-wide">{monthTitle}</h2>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setCurr(new Date(y, m - 1, 1))} className="p-1.5 rounded-lg border border-white/[0.08] bg-zinc-900/40 hover:bg-zinc-800 text-zinc-300 cursor-pointer"><ChevronLeft className="w-3.5 h-3.5" /></button>
          <button onClick={() => setCurr(getTodayDate())} className="px-2.5 py-1 text-xs rounded-lg bg-zinc-800/80 border border-zinc-700 font-semibold text-zinc-200 cursor-pointer">{t.common.nowBadge}</button>
          <button onClick={() => setCurr(new Date(y, m + 1, 1))} className="p-1.5 rounded-lg border border-white/[0.08] bg-zinc-900/40 hover:bg-zinc-800 text-zinc-300 cursor-pointer"><ChevronRight className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
        {["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"].map(d => <div key={d} className="font-semibold text-zinc-500 py-1 text-[11px]">{d}</div>)}
        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dObj = new Date(y, m, i + 1);
          const iso = formatLocalDate(dObj);
          const { phase, illumination } = calculateMoonPhaseForDate(dObj);
          const mainPhaseType = detectMainPhase(phase);
          const label = getMainPhaseLabel(mainPhaseType, t.astro);
          return (
            <CalendarDayCell
              key={iso} dayNum={i + 1} isoDate={iso} phase={phase} illumination={illumination}
              isToday={iso === todayStr} entry={getEntry(iso)} mainPhaseType={mainPhaseType} mainPhaseLabel={label} onSelect={onSelectDate}
            />
          );
        })}
      </div>
      <CalendarPhaseLegend />
    </div>
  );
};
