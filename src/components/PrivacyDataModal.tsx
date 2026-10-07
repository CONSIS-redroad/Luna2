// PATH: src/components/PrivacyDataModal.tsx | VERSION: 2.1.0 | REQ-ID: PRIVACY-01
import React from 'react';
import { ShieldCheck, Download, Trash2, X, Lock } from 'lucide-react';
import { exportUserDataJSON, clearAllUserData } from '../services/storage';

interface PrivacyModalProps {
  userId: string;
  onDataCleared: () => void;
  onClose: () => void;
}

export const PrivacyDataModal: React.FC<PrivacyModalProps> = ({ userId, onDataCleared, onClose }) => {
  const handleExport = () => {
    const jsonStr = exportUserDataJSON(userId);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `luna_dane_snu_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm('Czy na pewno chcesz bezpowrotnie usunąć wszystkie lokalne wpisy i notatki snu dla tego profilu?')) {
      clearAllUserData(userId);
      onDataCleared();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0f1720] border border-white/20 rounded-2xl shadow-2xl max-w-md w-full p-5 text-white">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#34d399]" />
            <h3 className="font-black text-sm">Prywatność i Twoje Dane Snu</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-[#94a3b8] hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
        </div>

        <div className="my-3 space-y-3 text-xs text-[#cbd5e1]">
          <div className="p-3 bg-[#064e3b]/30 border border-[#10b981]/30 rounded-xl flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#34d399] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Wszystkie Twoje notatki o śnie i nastroju są przechowywane <strong>wyłącznie lokalnie w pamięci tej przeglądarki</strong>. Aplikacja nie przesyła danych na zewnętrzne serwery. Aplikacja ma charakter rekreacyjny i <strong>nie stanowi wyrobu medycznego</strong>.
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <button onClick={handleExport} className="w-full py-2.5 px-3 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors">
              <Download className="w-4 h-4 text-[#38bdf8]" /> Pobierz kopię zapasową (JSON)
            </button>
            <button onClick={handleClear} className="w-full py-2.5 px-3 bg-[#7f1d1d]/30 hover:bg-[#7f1d1d]/50 border border-[#ef4444]/30 text-[#f87171] rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors">
              <Trash2 className="w-4 h-4" /> Usuń wszystkie lokalne dane tego profilu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
