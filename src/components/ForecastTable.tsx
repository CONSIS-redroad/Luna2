// PATH: src/components/ForecastTable.tsx | VERSION: 3.1.0 | REQ-ID: UI-TABLE-06
import React from 'react';
import { NightCalculated } from '../types/moon';
import { MoonVisual } from './MoonVisual';
import { useTranslation } from '../i18n/LanguageContext';

interface TableProps {
  data: NightCalculated[]; isRealWeather?: boolean; onRateNight: (night: NightCalculated) => void;
}

export const ForecastTable: React.FC<TableProps> = ({ data, isRealWeather = false, onRateNight }) => {
  const { t } = useTranslation();
  const dateRange = data.length > 0 ? `${data[0].date} – ${data[data.length - 1].date}` : '';

  return (
    <div className="bg-zinc-950/40 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-zinc-100 tracking-wide">{t.panels.tabForecast}</h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-900/60 border border-zinc-800 text-zinc-400">
            {isRealWeather ? 'Open-Meteo' : 'Rezerwa'}
          </span>
        </div>
        <span className="text-xs text-zinc-500 font-mono">{dateRange}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse min-w-[560px]">
          <thead>
            <tr className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider border-b border-white/[0.06]">
              <th className="py-2.5 px-3">Data</th>
              <th className="py-2.5 px-3">Faza</th>
              <th className="py-2.5 px-3">{t.panels.cloudCover}</th>
              <th className="py-2.5 px-3">{t.panels.nightTemp}</th>
              <th className="py-2.5 px-3 text-zinc-200">{t.panels.scoreSleep}</th>
              <th className="py-2.5 px-3 text-right">{t.common.rateSleep}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {data.map(night => (
              <tr key={night.date} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-2.5 px-3 font-semibold text-zinc-200">{night.date} ({night.day})</td>
                <td className="py-2.5 px-3 flex items-center gap-2">
                  <div className="scale-70 -my-3"><MoonVisual phase={night.phase} size={28} showLabels={false} /></div>
                  <span className="text-xs font-mono text-zinc-300">{night.phasePct}%</span>
                </td>
                <td className="py-2.5 px-3 font-mono text-zinc-400">{night.blockingPct}%</td>
                <td className="py-2.5 px-3 font-mono text-zinc-400">{night.temp}°C</td>
                <td className="py-2.5 px-3 font-mono font-bold text-zinc-100 text-sm">{night.sleep}%</td>
                <td className="py-2.5 px-3 text-right">
                  <button onClick={() => onRateNight(night)} className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 transition-colors cursor-pointer">
                    {t.common.rateSleep}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
