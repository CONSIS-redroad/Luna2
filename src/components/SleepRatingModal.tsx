// PATH: src/components/SleepRatingModal.tsx | VERSION: 3.3.0 | REQ-ID: UI-RATE-08
import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { SleepEntry, SleepQualityRating } from '../types/journal';
import { formatPolishDisplayDate } from '../services/dateUtils';
import { useTranslation } from '../i18n/LanguageContext';
import { SleepRatingMoodSelector, MoodId } from './SleepRatingMoodSelector';

interface ModalProps {
  date: string; initialEntry?: SleepEntry; forecastSleepScore?: number; moonPhasePct?: number;
  onClose: () => void; onSave: (entry: SleepEntry) => void;
}

export const SleepRatingModal: React.FC<ModalProps> = ({
  date, initialEntry, forecastSleepScore = 75, moonPhasePct, onClose, onSave
}) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState<SleepQualityRating>(initialEntry?.rating || 4);
  const [customScore, setCustomScore] = useState<number>(initialEntry?.ratingScore ?? (initialEntry?.rating ? initialEntry.rating * 20 : 70));
  const [hours, setHours] = useState<number>(initialEntry?.hoursSlept || 7.5);
  const [mood, setMood] = useState<MoodId>((initialEntry?.mood as MoodId) || 'calm');
  const [notes, setNotes] = useState<string>(initialEntry?.notes || '');

  const handleStar = (s: SleepQualityRating) => { setRating(s); setCustomScore(s * 20); };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: initialEntry?.id || 'entry_' + date.replace(/\./g, '_'),
      date, dayLabel: 'Noc', rating, ratingScore: customScore, hoursSlept: hours, mood, notes,
      lunaSleepForecast: forecastSleepScore, moonPhasePct, timestamp: Date.now(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#090c12]/95 border border-white/[0.08] rounded-2xl shadow-2xl max-w-md w-full p-5 text-zinc-100">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <h3 className="font-bold text-sm">{t.common.rateSleep}: <span className="text-zinc-300 font-mono">{formatPolishDisplayDate(date)}</span></h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="my-3 space-y-3 text-xs">
          <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/40 border border-white/[0.06]">
            <div className="flex items-center gap-1">{([1, 2, 3, 4, 5] as SleepQualityRating[]).map(s => (
              <button type="button" key={s} onClick={() => handleStar(s)} className="p-1 hover:scale-110 transition-transform cursor-pointer"><Star className={`w-4 h-4 ${s <= rating ? 'fill-zinc-200 text-zinc-200' : 'text-zinc-700'}`} /></button>
            ))}</div>
            <div className="text-right"><span className="text-[11px] text-zinc-400 font-mono">Ocena: </span><span className="text-sm font-bold text-zinc-100 font-mono">{customScore}%</span></div>
          </div>
          <div><div className="flex justify-between text-[11px] text-zinc-400 mb-1 font-mono"><span>Precyzyjna skala:</span><span>Algorytm: {forecastSleepScore}%</span></div>
            <input type="range" min="10" max="100" step="1" value={customScore} onChange={e => setCustomScore(parseInt(e.target.value))} className="w-full accent-zinc-300 cursor-pointer" /></div>
          <SleepRatingMoodSelector current={mood} onSelect={setMood} />
          <input type="range" min="3" max="12" step="0.5" value={hours} onChange={e => setHours(parseFloat(e.target.value))} className="w-full accent-zinc-300 cursor-pointer" />
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} placeholder={t.panels.notesPlaceholder} className="w-full p-2.5 rounded-xl border border-white/[0.06] bg-zinc-900/40 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500" />
          <button type="submit" className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl font-bold text-xs border border-zinc-700 shadow-sm cursor-pointer transition-colors">{t.common.save}</button>
        </form>
      </div>
    </div>
  );
};
