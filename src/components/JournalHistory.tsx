// PATH: src/components/JournalHistory.tsx | VERSION: 3.1.0 | REQ-ID: JOURNAL-HIST-05
import React from 'react';
import { Star, Trash2, Clock, Smile, Moon } from 'lucide-react';
import { SleepEntry } from '../types/journal';
import { useTranslation } from '../i18n/LanguageContext';

interface JournalHistoryProps {
  entries: SleepEntry[]; onDelete: (id: string) => void; onOpenNew: () => void;
}

export const JournalHistory: React.FC<JournalHistoryProps> = ({ entries, onDelete, onOpenNew }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-zinc-950/40 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl mb-6">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
        <div>
          <h2 className="text-sm font-bold text-zinc-100 tracking-wide">{t.panels.tabJournal}</h2>
          <p className="text-xs text-zinc-500">{t.panels.notesTitle}</p>
        </div>
        <button onClick={onOpenNew} className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 cursor-pointer shadow-sm">
          + {t.common.rateSleep}
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-6 text-zinc-500 text-xs font-mono">{t.panels.emptyJournal}</div>
      ) : (
        <div className="space-y-2.5">
          {entries.map(entry => (
            <div key={entry.id} className="p-3.5 rounded-xl border border-white/[0.06] bg-zinc-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-zinc-200 font-mono">{entry.date}</span>
                  <div className="flex items-center text-zinc-400">
                    {Array.from({ length: entry.rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-zinc-300 text-zinc-300" />)}
                  </div>
                  {entry.moonPhasePct !== undefined && (
                    <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1 bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-700">
                      <Moon className="w-2.5 h-2.5 text-zinc-300" /> {entry.moonPhasePct}%
                    </span>
                  )}
                </div>
                {entry.notes && <p className="text-xs text-zinc-300 italic">„{entry.notes}”</p>}
                <div className="flex items-center gap-3 text-[11px] text-zinc-500 font-mono">
                  <span className="flex items-center gap-1 text-zinc-400"><Clock className="w-3 h-3" /> {entry.hoursSlept}h</span>
                  <span className="flex items-center gap-1 text-zinc-400"><Smile className="w-3 h-3" /> {entry.mood}</span>
                </div>
              </div>
              <button onClick={() => onDelete(entry.id)} className="self-end sm:self-auto p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 cursor-pointer" title={t.common.cancel}>
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
