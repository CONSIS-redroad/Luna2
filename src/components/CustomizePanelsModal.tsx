// PATH: src/components/CustomizePanelsModal.tsx | VERSION: 2.9.0 | REQ-ID: PANEL-MODAL-02
import React from 'react';
import { X, Eye, EyeOff, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { PanelConfig, PanelId } from '../types/panelLayout';
import { useTranslation } from '../i18n/LanguageContext';
import { getPanelLocalizedTitle } from './PanelContainer';

interface ModalProps {
  panels: PanelConfig[];
  onToggleVisibility: (id: PanelId) => void;
  onReset: () => void;
  onClose: () => void;
}

export const CustomizePanelsModal: React.FC<ModalProps> = ({
  panels, onToggleVisibility, onReset, onClose
}) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0f1720] border border-white/20 rounded-2xl shadow-2xl max-w-md w-full p-5 text-white">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#38bdf8]" />
            <h3 className="font-black text-sm">{t.common.panelsLayout}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-[#94a3b8] cursor-pointer"><X className="w-4 h-4" /></button>
        </div>

        <div className="space-y-2 my-4 max-h-60 overflow-y-auto pr-1">
          {panels.map(panel => (
            <div key={panel.id} className="flex items-center justify-between p-2.5 rounded-xl border border-white/10 bg-white/5">
              <span className={`text-xs font-bold ${panel.isVisible ? 'text-white' : 'text-[#64748b] line-through'}`}>
                {getPanelLocalizedTitle(panel.id, t)}
              </span>
              <button
                onClick={() => onToggleVisibility(panel.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                  panel.isVisible ? 'bg-[#059669]/20 text-[#4ade80] border border-[#059669]/40' : 'bg-white/10 text-[#94a3b8]'
                }`}
              >
                {panel.isVisible ? <><Eye className="w-3.5 h-3.5" /></> : <><EyeOff className="w-3.5 h-3.5" /></>}
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <button onClick={onReset} className="flex items-center gap-1.5 text-xs font-bold text-[#f59e0b] hover:text-[#fbbf24] cursor-pointer">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button onClick={onClose} className="px-4 py-1.5 bg-[#38bdf8] hover:bg-[#0284c7] text-[#070b10] rounded-xl font-black text-xs cursor-pointer">
            {t.common.close}
          </button>
        </div>
      </div>
    </div>
  );
};
