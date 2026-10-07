// PATH: src/components/settings/SettingsDataSection.tsx | VERSION: 3.0.0 | REQ-ID: SET-DAT-02
import React from 'react';
import { Download, Trash2, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { exportUserDataJSON, clearAllUserData } from '../../services/storage';

export const SettingsDataSection: React.FC = () => {
  const { user } = useAuth();

  const handleExport = () => {
    const jsonStr = exportUserDataJSON(user.id);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `luna_dane_snu_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm('Czy na pewno chcesz wyczyścić wszystkie wpisy z pamięci przeglądarki?')) {
      clearAllUserData(user.id);
      window.location.reload();
    }
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-zinc-400" />
          <div>
            <p className="font-bold text-zinc-200">{user.name}</p>
            <p className="text-[11px] text-zinc-500">{user.email || 'Profil lokalny (Local-First)'}</p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-bold text-[10px] border border-zinc-700">Aktywny</span>
      </div>

      <div className="space-y-2">
        <button
          onClick={handleExport}
          className="w-full py-2.5 px-3 rounded-xl border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" /> Eksportuj kopię dziennika (JSON)
        </button>

        <button
          onClick={handleClear}
          className="w-full py-2 px-3 rounded-xl border border-rose-950 bg-rose-950/20 hover:bg-rose-950/40 text-rose-400 font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" /> Wyczyść dane profilu
        </button>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 pt-2 border-t border-zinc-800/80">
        <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
        <span>100% prywatności. Żadne dane snu nie opuszczają Twojego urządzenia.</span>
      </div>
    </div>
  );
};
