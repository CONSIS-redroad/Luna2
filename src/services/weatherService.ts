// PATH: src/services/weatherService.ts | VERSION: 3.2.0 | REQ-ID: WEATHER-EXTENDED-01
import { GeoLocation } from '../types/location';
import { NightInput } from '../types/moon';
import { getTodayDate, addDays, formatLocalDate, formatShortDate, getPolishDayName, parseLocalDate } from './dateUtils';
import { calculateMoonPhaseForDate } from './astronomy';

export interface WeatherFetchResult {
  dataset: NightInput[];
  isRealData: boolean;
}

export async function fetch5DayForecast(loc: GeoLocation): Promise<WeatherFetchResult> {
  const today = getTodayDate();
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&daily=temperature_2m_min,cloudcover_mean&timezone=auto&past_days=7&forecast_days=14`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const temps: number[] = data.daily?.temperature_2m_min || [];
    const clouds: number[] = data.daily?.cloudcover_mean || [];
    const times: string[] = data.daily?.time || [];

    const totalDays = times.length || 21;
    const dataset: NightInput[] = Array.from({ length: totalDays }).map((_, i) => {
      const d = times[i] ? parseLocalDate(times[i]) : addDays(today, i - 7);
      const moon = calculateMoonPhaseForDate(d);
      return {
        date: formatShortDate(d),
        day: getPolishDayName(d),
        phase: moon.phase,
        clouds: Math.round(clouds[i] ?? 30) / 100,
        fog: 0,
        temp: Math.round(temps[i] ?? 10),
        fullDate: formatLocalDate(d),
      };
    });
    return { dataset, isRealData: true };
  } catch {
    const fallback: NightInput[] = Array.from({ length: 21 }).map((_, i) => {
      const d = addDays(today, i - 7);
      const moon = calculateMoonPhaseForDate(d);
      return {
        date: formatShortDate(d),
        day: getPolishDayName(d),
        phase: moon.phase,
        clouds: Math.max(0, Math.min(1, 0.2 + (i % 5) * 0.15 + loc.cloudModifier)),
        fog: 0,
        temp: Math.round(9 + loc.tempOffset + (i % 2 === 0 ? 1 : -1)),
        fullDate: formatLocalDate(d),
      };
    });
    return { dataset: fallback, isRealData: false };
  }
}
