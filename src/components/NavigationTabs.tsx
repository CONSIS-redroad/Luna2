// PATH: src/components/NavigationTabs.tsx | VERSION: 2.9.0 | REQ-ID: UI-NAV-05
import React from 'react';
import { Calendar, LineChart, BookOpen, Orbit } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

export type ActiveTab = 'forecast' | 'calendar' | 'journal' | 'moonSim';

interface NavTabsProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  journalCount: number;
}

export const NavigationTabs: React.FC<NavTabsProps> = ({ activeTab, onChangeTab, journalCount }) => {
  const { t } = useTranslation();
  const tabs = [
    { id: 'forecast' as const, label: t.panels.tabForecast, icon: LineChart },
    { id: 'calendar' as const, label: t.panels.tabCalendar, icon: Calendar },
    { id: 'moonSim' as const, label: t.panels.tabMoonSim, icon: Orbit },
    { id: 'journal' as const, label: `${t.panels.tabJournal} (${journalCount})`, icon: BookOpen },
  ];

  return (
    <nav className="flex items-center gap-2 p-1.5 bg-[#0f1720]/85 backdrop-blur-xl border border-white/15 rounded-2xl mb-6 overflow-x-auto shadow-xl">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-white/25 to-white/15 text-white border border-white/30 shadow-md'
                : 'text-[#94a3b8] hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-[#38bdf8]' : 'text-[#64748b]'}`} />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};
