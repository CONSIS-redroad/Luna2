// PATH: src/components/DynamicPanelsList.tsx | VERSION: 3.3.0 | REQ-ID: DYNAMIC-PANELS-03
import React, { useState } from 'react';
import { PanelConfig, PanelId } from '../types/panelLayout';
import { NightCalculated } from '../types/moon';
import { SleepEntry } from '../types/journal';
import { PanelContainer } from './PanelContainer';
import { SummaryCards } from './SummaryCards';
import { InteractiveChart } from './InteractiveChart';
import { ForecastTable } from './ForecastTable';
import { CalendarView } from './CalendarView';
import { MoonSimulatorCard } from './MoonSimulatorCard';
import { JournalHistory } from './JournalHistory';
import { getTodayDate, formatShortDate } from '../services/dateUtils';

interface Props {
  panels: PanelConfig[]; forecast: NightCalculated[]; isRealWeather: boolean;
  best: NightCalculated | null; worst: NightCalculated | null;
  entries: SleepEntry[]; todayStr: string;
  onToggleCollapse: (id: PanelId) => void; onToggleVisibility: (id: PanelId) => void;
  onMoveStep: (id: PanelId, dir: 'up' | 'down') => void; onReorder: (src: PanelId, tgt: PanelId) => void;
  onRateNight: (n: { date: string; sleepScore?: number; phasePct?: number }) => void;
  onDeleteJournal: (id: string) => void; getEntryForDate: (d: string) => SleepEntry | undefined;
}

export const DynamicPanelsList: React.FC<Props> = ({
  panels, forecast, isRealWeather, best, worst, entries, todayStr,
  onToggleCollapse, onToggleVisibility, onMoveStep, onReorder, onRateNight, onDeleteJournal, getEntryForDate
}) => {
  const [draggedId, setDraggedId] = useState<PanelId | null>(null);
  const visiblePanels = panels.filter(p => p.isVisible);
  const todayIdx = forecast.findIndex(d => d.date === formatShortDate(getTodayDate()));
  const futureForecast = todayIdx !== -1 ? forecast.slice(todayIdx) : forecast;

  const renderContent = (id: PanelId) => {
    switch (id) {
      case 'summary': return best && worst ? <SummaryCards bestNight={best} worstNight={worst} /> : null;
      case 'chart': return <InteractiveChart data={forecast} onSelectNight={n => onRateNight({ date: n.fullDate || todayStr, sleepScore: n.sleep, phasePct: n.phasePct })} getEntry={getEntryForDate} />;
      case 'forecast': return <ForecastTable data={futureForecast} isRealWeather={isRealWeather} onRateNight={n => onRateNight({ date: n.fullDate || todayStr, sleepScore: n.sleep, phasePct: n.phasePct })} />;
      case 'calendar': return <CalendarView onSelectDate={(date, p) => onRateNight({ date, phasePct: p })} getEntry={getEntryForDate} />;
      case 'moonSim': return <MoonSimulatorCard />;
      case 'journal': return <JournalHistory entries={entries} onDelete={onDeleteJournal} onOpenNew={() => onRateNight({ date: todayStr, phasePct: 50 })} />;
    }
  };

  return (
    <div className="space-y-4">
      {visiblePanels.map((p, idx) => (
        <PanelContainer
          key={p.id} config={p} canMoveUp={idx > 0} canMoveDown={idx < visiblePanels.length - 1}
          onToggleCollapse={() => onToggleCollapse(p.id)} onHide={() => onToggleVisibility(p.id)}
          onMoveUp={() => onMoveStep(p.id, 'up')} onMoveDown={() => onMoveStep(p.id, 'down')}
          onDragStart={() => setDraggedId(p.id)} onDragOver={e => e.preventDefault()}
          onDrop={() => { if (draggedId) { onReorder(draggedId, p.id); setDraggedId(null); } }}
        >
          {renderContent(p.id)}
        </PanelContainer>
      ))}
    </div>
  );
};
