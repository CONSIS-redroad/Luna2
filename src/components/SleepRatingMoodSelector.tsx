// PATH: src/components/SleepRatingMoodSelector.tsx | VERSION: 3.1.0 | REQ-ID: MOOD-SELECT-02
import React from 'react';

export type MoodId = 'calm' | 'energized' | 'tired' | 'restless';

interface MoodProps {
  current: MoodId;
  onSelect: (m: MoodId) => void;
}

const MOODS: Array<{ id: MoodId; label: string; icon: string }> = [
  { id: 'calm', label: 'Spokój', icon: '😌' },
  { id: 'energized', label: 'Energia', icon: '⚡' },
  { id: 'tired', label: 'Zmęczenie', icon: '🥱' },
  { id: 'restless', label: 'Niepokój', icon: '🌪️' },
];

export const SleepRatingMoodSelector: React.FC<MoodProps> = ({ current, onSelect }) => {
  return (
    <div>
      <label className="font-semibold text-zinc-400 block mb-1 text-[11px]">Nastrój po przebudzeniu:</label>
      <div className="grid grid-cols-4 gap-1.5">
        {MOODS.map(m => (
          <button
            type="button"
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={`py-1.5 px-1 rounded-xl border text-center font-medium text-[11px] transition-all cursor-pointer ${
              current === m.id
                ? 'border-zinc-500 bg-zinc-800 text-zinc-100 shadow-sm'
                : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
            }`}
          >
            <span className="block text-sm">{m.icon}</span> {m.label}
          </button>
        ))}
      </div>
    </div>
  );
};
