// PATH: src/components/AuthModal.tsx | VERSION: 2.1.0 | REQ-ID: UI-AUTH-04
import React from 'react';
import { User, Check, X, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { LOCAL_PROFILES } from '../services/mockAuthService';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { user, switchProfile, createGuest } = useAuth();

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0f1720] border border-white/20 rounded-2xl shadow-2xl max-w-sm w-full p-5 text-white">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="font-black text-sm flex items-center gap-2">
            <User className="w-4 h-4 text-[#38bdf8]" /> Profile lokalne (offline)
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-[#94a3b8] hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
        </div>

        <div className="py-3 space-y-2.5">
          <p className="text-xs text-[#94a3b8]">Wybierz profil do zapisu notatek snu. Każdy profil ma całkowicie oddzielny magazyn w pamięci przeglądarki:</p>
          <div className="space-y-2">
            {LOCAL_PROFILES.map(prof => {
              const active = prof.id === user.id;
              return (
                <button key={prof.id} onClick={() => { switchProfile(prof.id); onClose(); }} className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${active ? 'border-[#38bdf8] bg-[#38bdf8]/20 shadow-md' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                  <div>
                    <p className="font-black text-xs text-white">{prof.name}</p>
                    <p className="text-[10px] text-[#94a3b8]">{prof.id === 'usr_local_primary' ? 'Klucz: luna_user_primary' : 'Klucz: luna_user_demo (testowy)'}</p>
                  </div>
                  {active && <Check className="w-4 h-4 text-[#38bdf8]" />}
                </button>
              );
            })}
          </div>
          <button onClick={() => { createGuest(); onClose(); }} className="w-full py-2 rounded-xl text-xs text-[#94a3b8] hover:text-white hover:bg-white/10 font-bold border border-white/10 cursor-pointer">
            + Utwórz tymczasowy profil Gościa
          </button>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-[#34d399]">
          <Shield className="w-3.5 h-3.5 shrink-0" /> Prywatne dane lokalne · Bez chmury
        </div>
      </div>
    </div>
  );
};
