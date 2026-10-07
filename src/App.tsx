// PATH: src/App.tsx | VERSION: 3.0.0 | REQ-ID: APP-MAIN-10
import React, { useState, useRef } from 'react';
import { useAuth } from './hooks/useAuth';
import { useSleepJournal } from './hooks/useSleepJournal';
import { useWeatherForecast } from './hooks/useWeatherForecast';
import { usePanelLayout } from './hooks/usePanelLayout';
import { getTodayDate, formatLocalDate } from './services/dateUtils';
import { GLOBAL_CITIES } from './services/locationService';
import { DEFAULT_BG_SETTINGS } from './config/nasaImages';
import { GeoLocation } from './types/location';
import { Header } from './components/Header';
import { HeroLandingView } from './components/HeroLandingView';
import { DynamicPanelsList } from './components/DynamicPanelsList';
import { SleepRatingModal } from './components/SleepRatingModal';
import { CosmicBackground } from './components/CosmicBackground';
import { SettingsModal } from './components/SettingsModal';
import { PWAReloadPrompt } from './components/PWAReloadPrompt';
import { LanguageProvider } from './i18n/LanguageContext';

export default function App() {
  const { user } = useAuth();
  const panelsRef = useRef<HTMLDivElement>(null);
  const [loc, setLoc] = useState<GeoLocation>(GLOBAL_CITIES[0]);
  const [bgSettings, setBgSettings] = useState(DEFAULT_BG_SETTINGS);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [rateNight, setRateNight] = useState<{ date: string; sleepScore?: number; phasePct?: number } | null>(null);

  const { panels, toggleCollapse, toggleVisibility, reorderPanels, movePanelStep, resetLayout } = usePanelLayout();
  const { entries, addOrUpdateEntry, removeEntry, getEntryForDate } = useSleepJournal(user.id);
  const { forecast, isRealWeather, best, worst } = useWeatherForecast(loc);
  const todayStr = formatLocalDate(getTodayDate());

  return (
    <LanguageProvider>
      <main className="max-w-[1040px] mx-auto px-4 py-4 text-zinc-100 min-h-screen relative z-10 font-sans selection:bg-zinc-700 selection:text-white">
        <CosmicBackground settings={bgSettings} />
        <Header location={loc} onOpenSettings={() => setSettingsOpen(true)} onOpenQuickRate={() => setRateNight({ date: todayStr, sleepScore: 78, phasePct: 50 })} />
        <HeroLandingView cityName={loc.name} onExplore={() => panelsRef.current?.scrollIntoView({ behavior: 'smooth' })} />
        <div ref={panelsRef} className="pt-8 scroll-mt-20">
          <DynamicPanelsList panels={panels} forecast={forecast} isRealWeather={isRealWeather} best={best} worst={worst} entries={entries} todayStr={todayStr} onToggleCollapse={toggleCollapse} onToggleVisibility={toggleVisibility} onMoveStep={movePanelStep} onReorder={reorderPanels} onRateNight={setRateNight} onDeleteJournal={removeEntry} getEntryForDate={getEntryForDate} />
        </div>
        {settingsOpen && <SettingsModal location={loc} onSelectLocation={setLoc} bgSettings={bgSettings} onChangeBgSettings={setBgSettings} panels={panels} onTogglePanelVisibility={toggleVisibility} onResetPanels={resetLayout} onClose={() => setSettingsOpen(false)} />}
        {rateNight && <SleepRatingModal date={rateNight.date} initialEntry={getEntryForDate(rateNight.date)} forecastSleepScore={rateNight.sleepScore} moonPhasePct={rateNight.phasePct} onClose={() => setRateNight(null)} onSave={addOrUpdateEntry} />}
        <PWAReloadPrompt />
      </main>
    </LanguageProvider>
  );
}
