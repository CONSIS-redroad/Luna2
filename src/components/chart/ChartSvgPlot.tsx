// PATH: src/components/chart/ChartSvgPlot.tsx | VERSION: 3.3.0 | REQ-ID: CHART-SVG-02
import React from 'react';
import { NightCalculated } from '../../types/moon';
import { formatShortDate, getTodayDate } from '../../services/dateUtils';
import { SleepEntry } from '../../types/journal';

interface Props {
  data: NightCalculated[]; hoveredIdx: number | null;
  onHover: (idx: number | null) => void; onSelect?: (n: NightCalculated) => void;
  getEntry?: (fullDate: string) => SleepEntry | undefined;
}

export const ChartSvgPlot: React.FC<Props> = ({ data, hoveredIdx, onHover, onSelect, getEntry }) => {
  const w = 680, h = 200, pad = { top: 22, right: 30, bottom: 32, left: 40 };
  const innerW = w - pad.left - pad.right, innerH = h - pad.top - pad.bottom;
  const getX = (i: number) => pad.left + (i / Math.max(1, data.length - 1)) * innerW;
  const getY = (val: number) => pad.top + innerH - (val / 100) * innerH;
  const nowIdx = data.findIndex(d => d.date === formatShortDate(getTodayDate()));

  const sleepPts = data.map((d, i) => `${getX(i)},${getY(d.sleep)}`).join(' ');
  const userEntries = data.map((d, i) => {
    const entry = getEntry?.(d.fullDate || '');
    return entry?.ratingScore !== undefined ? { x: getX(i), y: getY(entry.ratingScore), score: entry.ratingScore, date: d.date } : null;
  }).filter((p): p is { x: number; y: number; score: number; date: string } => p !== null);
  const userPolyline = userEntries.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full min-w-[500px] h-auto select-none">
      {[0, 50, 100].map(v => (
        <g key={v}><line x1={pad.left} y1={getY(v)} x2={w - pad.right} y2={getY(v)} stroke="#27272a" strokeWidth="1" strokeDasharray="3,3" />
          <text x={pad.left - 8} y={getY(v) + 4} textAnchor="end" fontSize="10" fill="#71717a" fontFamily="monospace">{v}%</text></g>
      ))}
      <path d={`M ${pad.left},${getY(0)} L ${sleepPts.split(' ').join(' L ')} L ${getX(data.length - 1)},${getY(0)} Z`} fill="rgba(244, 244, 245, 0.04)" />
      <polyline fill="none" stroke="#e4e4e7" strokeWidth="2.5" points={sleepPts} strokeLinecap="round" />
      {userEntries.length > 1 && <polyline fill="none" stroke="#6ee7b7" strokeWidth="2" strokeDasharray="3,3" points={userPolyline} />}
      {userEntries.map(p => (
        <g key={p.date}><circle cx={p.x} cy={p.y} r={5} fill="#10b981" stroke="#09090b" strokeWidth="2" />
          <text x={p.x} y={p.y - 7} textAnchor="middle" fontSize="9" fill="#a7f3d0" fontWeight="bold" fontFamily="monospace">{p.score}%</text></g>
      ))}
      {nowIdx !== -1 && (
        <g><line x1={getX(nowIdx)} y1={pad.top} x2={getX(nowIdx)} y2={h - pad.bottom} stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="2,2" />
          <rect x={getX(nowIdx) - 22} y={pad.top - 16} width="44" height="15" rx="4" fill="#27272a" stroke="#52525b" strokeWidth="1" />
          <text x={getX(nowIdx)} y={pad.top - 5} textAnchor="middle" fontSize="9" fill="#f4f4f5" fontWeight="bold" fontFamily="monospace">TERAZ</text></g>
      )}
      {data.map((d, i) => (
        <g key={d.date} className="cursor-pointer" onClick={() => onSelect?.(d)} onMouseEnter={() => onHover(i)} onMouseLeave={() => onHover(null)}>
          <circle cx={getX(i)} cy={getY(d.sleep)} r={hoveredIdx === i ? 5 : 3.5} fill="#f4f4f5" stroke="#09090b" strokeWidth="2" />
          <text x={getX(i)} y={h - 10} textAnchor="middle" fontSize="11" fill={hoveredIdx === i ? "#ffffff" : "#a1a1aa"} fontFamily="monospace">{d.date} ({d.day})</text></g>
      ))}
    </svg>
  );
};
