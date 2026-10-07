// PATH: src/components/CalendarDayCell.tsx | VERSION: 3.3.0 | REQ-ID: CAL-CELL-03
import React from 'react';
import { FileText } from 'lucide-react';
import { MoonVisual } from './MoonVisual';
import { MainPhaseType } from '../services/calendarPhases';
import { SleepEntry } from '../types/journal';

interface CellProps {
  dayNum: number; isoDate: string; phase: number; illumination: number;
  isToday: boolean; entry?: SleepEntry; mainPhaseType: MainPhaseType;
  mainPhaseLabel?: string; onSelect: (iso: string, illum: number) => void;
}

export const CalendarDayCell: React.FC<CellProps> = ({
  dayNum, isoDate, phase, illumination, isToday, entry, mainPhaseType, mainPhaseLabel, onSelect
}) => {
  const isMajor = !!mainPhaseType;
  const userScore = entry?.ratingScore ?? (entry?.rating ? entry.rating * 20 : undefined);

  return (
    <button
      onClick={() => onSelect(isoDate, illumination)}
      className={`relative p-1.5 sm:p-2 rounded-xl border flex flex-col items-center justify-between min-h-[86px] transition-all cursor-pointer backdrop-blur-md ${
        isToday ? 'bg-zinc-800/80 border-zinc-400 shadow-md ring-1 ring-zinc-400/30'
        : entry ? 'bg-zinc-900/70 border-zinc-600/80 hover:border-zinc-400 shadow-sm'
        : isMajor ? 'bg-zinc-900/40 border-zinc-700/80 hover:border-zinc-500'
        : 'bg-zinc-950/20 border-white/[0.06] hover:bg-white/[0.04] hover:border-zinc-700'
      }`}
    >
      <div className="w-full flex items-center justify-between text-[11px] font-mono leading-none">
        <span className={`font-bold ${isToday ? 'text-white' : 'text-zinc-400'}`}>{dayNum}</span>
        {entry?.notes && <span title="Zawiera notatkę o śnie"><FileText className="w-3 h-3 text-zinc-400" /></span>}
      </div>
      <div className="scale-65 -my-2.5"><MoonVisual phase={phase} size={28} showLabels={false} /></div>
      <div className="w-full flex flex-col items-center gap-0.5">
        {userScore !== undefined ? (
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-zinc-800/90 border border-zinc-600 text-zinc-200 font-mono" title={`Zapisany sen: ${userScore}%`}>
            ★ {userScore}%
          </span>
        ) : mainPhaseLabel ? (
          <span className="text-[9px] font-extrabold uppercase tracking-tighter text-zinc-300 px-1 py-0.5 rounded bg-zinc-800 border border-zinc-700 truncate max-w-full">
            {mainPhaseLabel}
          </span>
        ) : (
          <span className="text-[10px] text-zinc-500 font-mono">{illumination}%</span>
        )}
      </div>
    </button>
  );
};
