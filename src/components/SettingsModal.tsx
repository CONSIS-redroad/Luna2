// PATH: src/components/SettingsModal.tsx | VERSION: 3.1.0 | REQ-ID: SET-MODAL-02
import React, { useState } from 'react';
import { X, Settings, Globe, Image, LayoutGrid, Database } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { GeoLocation } from '../types/location';
import { BackgroundSettings } from '../types/nasaBackground';
import { PanelConfig, PanelId } from '../types/panelLayout';
import { SettingsGeneralSection } from './settings/SettingsGeneralSection';
import { SettingsWallpaperSection } from './settings/SettingsWallpaperSection';
import { SettingsPanelsSection } from './settings/SettingsPanelsSection';
import { SettingsDataSection } from './settings/SettingsDataSection';

type SettingsTab = 'general' | 'wallpaper' | 'panels' | 'data';

interface Props {
  location: GeoLocation; onSelectLocation: (l: GeoLocation) => void;
  bgSettings: BackgroundSettings; onChangeBgSettings: (s: BackgroundSettings) => void;
  panels: PanelConfig[]; onTogglePanelVisibility: (id: PanelId) => void; onResetPanels: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<Props> = ({
  location, onSelectLocation, bgSettings, onChangeBgSettings, panels, onTogglePanelVisibility, onResetPanels, onClose
}) => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<SettingsTab>('general');
  const tabs = [
    { id: 'general' as const, label: t.common.tabGeneral, icon: Globe },
    { id: 'wallpaper' as const, label: t.common.tabWallpaper, icon: Image },
    { id: 'panels' as const, label: t.common.tabPanels, icon: LayoutGrid },
    { id: 'data' as const, label: t.common.tabData, icon: Database },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#090c12]/90 backdrop-blur-2xl border border-white/[0.1] rounded-2xl shadow-2xl max-w-lg w-full p-5 text-zinc-100 flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-zinc-300" />
            <h3 className="font-bold text-sm tracking-wide text-zinc-100">{t.common.settings}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
        </div>

        <div className="flex gap-1 my-3 p-1 rounded-xl bg-zinc-900/60 border border-white/[0.06]">
          {tabs.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)} className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${tab === item.id ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}>
              <item.icon className="w-3.5 h-3.5" /> <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="my-2 min-h-[260px]">
          {tab === 'general' && <SettingsGeneralSection location={location} onSelectLocation={onSelectLocation} />}
          {tab === 'wallpaper' && <SettingsWallpaperSection settings={bgSettings} onChange={onChangeBgSettings} />}
          {tab === 'panels' && <SettingsPanelsSection panels={panels} onToggleVisibility={onTogglePanelVisibility} onReset={onResetPanels} />}
          {tab === 'data' && <SettingsDataSection />}
        </div>
      </div>
    </div>
  );
};
