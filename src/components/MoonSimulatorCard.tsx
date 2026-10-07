// PATH: src/components/MoonSimulatorCard.tsx | VERSION: 3.1.0 | REQ-ID: MOON-SIM-05
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { MoonVisual } from './MoonVisual';
import { getLocalizedPhaseName } from '../services/astronomy';
import { useTranslation } from '../i18n/LanguageContext';

export const MoonSimulatorCard: React.FC = () => {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<number>(0.72);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPhase(p => (p + 0.01 > 1 ? 0 : Math.round((p + 0.01) * 100) / 100));
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-zinc-950/40 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl mb-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.08]">
        <div>
          <h2 className="text-sm font-bold text-zinc-100 tracking-wide">{t.panels.tabMoonSim}</h2>
          <p className="text-xs text-zinc-500 font-mono">{t.common.orbitHint}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsPlaying(!isPlaying)} className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-850 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold border border-zinc-750 cursor-pointer shadow-sm">
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button onClick={() => setPhase(0.72)} className="p-1.5 rounded-lg border border-white/[0.08] bg-zinc-900/40 hover:bg-zinc-800 text-zinc-400 cursor-pointer" title="Reset">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-around gap-6 py-2">
        <MoonVisual phase={phase} size={170} showLabels={false} />
        <div className="w-full max-w-sm space-y-3">
          <div className="p-3.5 bg-zinc-900/40 rounded-xl border border-white/[0.06]">
            <p className="text-sm font-bold text-zinc-200">{getLocalizedPhaseName(phase, t.astro)}</p>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">{Math.round(phase * 100)}% {t.astro.illumination}</p>
          </div>
          <input type="range" min="0" max="1" step="0.01" value={phase} onChange={e => { setIsPlaying(false); setPhase(parseFloat(e.target.value)); }} className="w-full accent-zinc-300 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
