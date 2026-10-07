// PATH: src/components/settings/SettingsPanelsSection.tsx | VERSION: 3.0.0 | REQ-ID: SET-PAN-01
import React from 'react';
import { Eye, EyeOff, RotateCcw } from 'lucide-react';
import { PanelConfig, PanelId } from '../../types/panelLayout';
import { useTranslation } from '../../i18n/LanguageContext';
import { getPanelLocalizedTitle } from '../PanelContainer';

interface Props {
  panels: PanelConfig[];
  onToggleVisibility: (id: PanelId) => void;
  onReset: () => void;
}

export const SettingsPanelsSection: React.FC<Props> = ({ panels, onToggleVisibility, onReset }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      <p className="text-xs text-zinc-400">
        Włącz lub wyłącz widoczność poszczególnych modułów obserwatorium:
      </p>
      <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
        {panels.map(p => (
          <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/40">
            <span className={`text-xs font-bold ${p.isVisible ? 'text-zinc-200' : 'text-zinc-500 line-through'}`}>
              {getPanelLocalizedTitle(p.id, t)}
            </span>
            <button
              onClick={() => onToggleVisibility(p.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                p.isVisible ? 'bg-zinc-800 text-zinc-200 border border-zinc-700' : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
              }`}
            >
              {p.isVisible ? <><Eye className="w-3.5 h-3.5" /> Widoczny</> : <><EyeOff className="w-3.5 h-3.5" /> Ukryty</>}
            </button>
          </div>
        ))}
      </div>
      <div className="pt-2 border-t border-zinc-800 flex justify-end">
        <button onClick={onReset} className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer">
          <RotateCcw className="w-3.5 h-3.5" /> Resetuj domyślny układ
        </button>
      </div>
    </div>
  );
};
