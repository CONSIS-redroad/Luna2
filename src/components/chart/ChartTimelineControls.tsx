// PATH: src/components/chart/ChartTimelineControls.tsx | VERSION: 3.2.0 | REQ-ID: CHART-CTRL-01
import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { NightCalculated } from '../../types/moon';

interface Props {
  visibleData: NightCalculated[];
  canPrev: boolean; canNext: boolean;
  onPrev: () => void; onNext: () => void; onReset: () => void;
}

export const ChartTimelineControls: React.FC<Props> = ({
  visibleData, canPrev, canNext, onPrev, onNext, onReset
}) => {
  const rangeStr = visibleData.length > 0 ? `${visibleData[0].date} – ${visibleData[visibleData.length - 1].date}` : '';

  return (
    <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px] select-none">
      <div className="flex items-center gap-1.5 text-zinc-500 font-mono">
        <span className="text-zinc-300 font-semibold">{rangeStr}</span>
        <span className="hidden sm:inline">· Przeciągnij palcem/myszką</span>
      </div>

      <div className="flex items-center gap-1">
        <button onClick={onPrev} disabled={!canPrev} className="p-1 rounded-md border border-white/[0.06] bg-zinc-900/60 hover:bg-zinc-800 disabled:opacity-20 text-zinc-300 cursor-pointer" title="Wcześniejsze dni">
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <button onClick={onReset} className="px-2 py-0.5 rounded-md border border-white/[0.08] bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 text-[10px] font-mono flex items-center gap-1 cursor-pointer">
          <RotateCcw className="w-3 h-3 text-zinc-400" /> Domyślny (-1d / +5d)
        </button>
        <button onClick={onNext} disabled={!canNext} className="p-1 rounded-md border border-white/[0.06] bg-zinc-900/60 hover:bg-zinc-800 disabled:opacity-20 text-zinc-300 cursor-pointer" title="Późniejsze dni">
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
