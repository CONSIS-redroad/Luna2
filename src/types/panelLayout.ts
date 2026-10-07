// PATH: src/types/panelLayout.ts | VERSION: 2.4.0 | REQ-ID: PANEL-TYPES-01
export type PanelId = 'summary' | 'chart' | 'forecast' | 'calendar' | 'moonSim' | 'journal';

export interface PanelConfig {
  id: PanelId;
  title: string;
  isCollapsed: boolean;
  isVisible: boolean;
}

export const DEFAULT_PANELS: PanelConfig[] = [
  { id: 'summary', title: 'Podsumowanie nocy', isCollapsed: false, isVisible: true },
  { id: 'chart', title: 'Wykres jakości nocy (WJN)', isCollapsed: false, isVisible: true },
  { id: 'forecast', title: 'Prognoza 5 nocy & Pogoda', isCollapsed: false, isVisible: true },
  { id: 'calendar', title: 'Kalendarz faz Księżyca', isCollapsed: false, isVisible: true },
  { id: 'moonSim', title: 'Symulator 3D tarczy', isCollapsed: false, isVisible: true },
  { id: 'journal', title: 'Dziennik snu & Notatki', isCollapsed: false, isVisible: true },
];
