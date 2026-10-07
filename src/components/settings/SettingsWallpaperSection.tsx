// PATH: src/components/settings/SettingsWallpaperSection.tsx | VERSION: 3.0.0 | REQ-ID: SET-WALL-02
import React from 'react';
import { NASA_IMAGES } from '../../config/nasaImages';
import { BackgroundSettings } from '../../types/nasaBackground';

interface Props {
  settings: BackgroundSettings;
  onChange: (s: BackgroundSettings) => void;
}

export const SettingsWallpaperSection: React.FC<Props> = ({ settings, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-900/40">
        <span className="text-xs font-bold text-zinc-300">Pył kosmiczny (cząsteczki)</span>
        <button
          onClick={() => onChange({ ...settings, enableParticles: !settings.enableParticles })}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            settings.enableParticles ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-500'
          }`}
        >
          {settings.enableParticles ? 'Włączone' : 'Wyłączone'}
        </button>
      </div>

      <div>
        <label className="text-xs font-bold text-zinc-400 block mb-2">Astrofotografia tła NASA</label>
        <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
          {NASA_IMAGES.map(img => (
            <button
              key={img.id}
              onClick={() => onChange({ ...settings, imageId: img.id })}
              className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                settings.imageId === img.id
                  ? 'border-zinc-400 bg-zinc-800/90 text-white'
                  : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div className="w-full h-16 rounded-lg overflow-hidden bg-black">
                <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-bold truncate">{img.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
