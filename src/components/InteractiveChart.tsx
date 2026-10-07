// PATH: src/components/InteractiveChart.tsx | VERSION: 3.3.0 | REQ-ID: UI-CHART-10
import React, { useState } from 'react';
import { NightCalculated } from '../types/moon';
import { SleepEntry } from '../types/journal';
import { useTranslation } from '../i18n/LanguageContext';
import { useChartTimelinePan } from '../hooks/useChartTimelinePan';
import { ChartTimelineControls } from './chart/ChartTimelineControls';
import { ChartSvgPlot } from './chart/ChartSvgPlot';

interface ChartProps {
  data: NightCalculated[]; onSelectNight?: (n: NightCalculated) => void;
  getEntry?: (fullDate: string) => SleepEntry | undefined;
}

export const InteractiveChart: React.FC<ChartProps> = ({ data, onSelectNight, getEntry }) => {
  const { t } = useTranslation();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { startIndex, visibleData, stepPrev, stepNext, resetToDefault, panProps } = useChartTimelinePan(data, 7);

  const canPrev = startIndex > 0;
  const canNext = startIndex + 7 < data.length;

  return (
    <div className="bg-zinc-950/40 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-white/[0.08]">
        <h2 className="text-sm font-bold text-zinc-100 tracking-wide">{t.panels.scoreSleep}</h2>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-zinc-200"><span className="w-2.5 h-2.5 bg-zinc-200 rounded-sm" /> {t.panels.algorithmSleep}</span>
          <span className="flex items-center gap-1.5 text-emerald-400"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" /> {t.panels.userLoggedSleep}</span>
        </div>
      </div>

      <div {...panProps} className="w-full overflow-x-auto cursor-grab active:cursor-grabbing touch-pan-x py-1">
        <ChartSvgPlot data={visibleData} hoveredIdx={hoveredIdx} onHover={setHoveredIdx} onSelect={onSelectNight} getEntry={getEntry} />
      </div>

      <ChartTimelineControls
        visibleData={visibleData} canPrev={canPrev} canNext={canNext}
        onPrev={stepPrev} onNext={stepNext} onReset={resetToDefault}
      />
    </div>
  );
};
