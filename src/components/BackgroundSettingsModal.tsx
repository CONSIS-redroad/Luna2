// PATH: src/components/BackgroundSettingsModal.tsx | VERSION: 2.1.0 | REQ-ID: BG-MODAL-03
import React from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import { BackgroundSettings } from '../types/nasaBackground';
import { NASA_IMAGES } from '../config/nasaImages';

interface BgModalProps {
  settings: BackgroundSettings;
  onChange: (s: BackgroundSettings) => void;
  onClose: () => void;
}

export const BackgroundSettingsModal: React.FC<BgModalProps> = ({ settings, onChange, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0f1720] border border-white/20 rounded-2xl shadow-2xl max-w-lg w-full p-5 text-white">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#38bdf8]" />
            <h3 className="font-black text-sm">Zdjęcia Tła Kosmosu (Unsplash)</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-[#94a3b8] hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
        </div>

        <div className="my-3 space-y-3">
          <label className="text-xs font-bold text-[#94a3b8] block">Wybierz fotografię w tle:</label>
          <div className="grid grid-cols-2 gap-2.5 max-h-48 overflow-y-auto pr-1">
            {NASA_IMAGES.map(img => (
              <button
                key={img.id}
                onClick={() => onChange({ ...settings, imageId: img.id })}
                className={`p-2 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${settings.imageId === img.id ? 'border-[#38bdf8] bg-[#38bdf8]/20 shadow-lg' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
              >
                <img src={img.thumbnail} alt={img.title} className="w-full h-16 object-cover rounded-lg" />
                <span className="text-xs font-black text-white line-clamp-1">{img.title}</span>
                <span className="text-[10px] text-[#94a3b8] line-clamp-1">{img.mission}</span>
              </button>
            ))}
          </div>

          <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#cbd5e1]">Rozmycie: {settings.blur}px</span>
              <input type="range" min="0" max="12" value={settings.blur} onChange={e => onChange({ ...settings, blur: parseInt(e.target.value) })} className="accent-[#38bdf8] w-36 cursor-pointer" />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#cbd5e1]">Jasność: {Math.round(settings.opacity * 100)}%</span>
              <input type="range" min="0.2" max="0.8" step="0.05" value={settings.opacity} onChange={e => onChange({ ...settings, opacity: parseFloat(e.target.value) })} className="accent-[#38bdf8] w-36 cursor-pointer" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer pt-1 font-semibold text-[#cbd5e1]">
              <input type="checkbox" checked={settings.enableParticles} onChange={e => onChange({ ...settings, enableParticles: e.target.checked })} className="rounded accent-[#38bdf8]" />
              Włącz animację pyłu kosmicznego
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
