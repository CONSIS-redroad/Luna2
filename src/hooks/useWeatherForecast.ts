// PATH: src/hooks/useWeatherForecast.ts | VERSION: 2.1.0 | REQ-ID: WEATHER-HOOK-01
import { useState, useEffect, useMemo } from 'react';
import { GeoLocation } from '../types/location';
import { NightCalculated } from '../types/moon';
import { buildForecast } from '../services/lunaCalc';
import { fetch5DayForecast } from '../services/weatherService';

export function useWeatherForecast(loc: GeoLocation) {
  const [forecast, setForecast] = useState<NightCalculated[]>([]);
  const [isRealWeather, setIsRealWeather] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch5DayForecast(loc).then(({ dataset, isRealData }) => {
      if (!active) return;
      setForecast(buildForecast(dataset));
      setIsRealWeather(isRealData);
      setLoading(false);
    });
    return () => { active = false; };
  }, [loc]);

  const best = useMemo(() => forecast.length ? forecast.reduce((b, c) => (c.sleep > b.sleep ? c : b)) : null, [forecast]);
  const worst = useMemo(() => forecast.length ? forecast.reduce((w, c) => (c.sleep < w.sleep ? c : w)) : null, [forecast]);

  return { forecast, isRealWeather, loading, best, worst };
}
