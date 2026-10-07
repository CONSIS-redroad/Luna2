// PATH: src/services/astronomy.ts | VERSION: 2.9.0 | REQ-ID: ASTRO-04
import { formatLocalDate, getPolishDayName } from './dateUtils';
import { AstroDictionary } from '../i18n/types';

export function calculateMoonPhaseForDate(date: Date): { phase: number; illumination: number; ageDays: number } {
  const synodicMonth = 29.53058867;
  const refNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14, 0)).getTime();
  const diffDays = (date.getTime() - refNewMoon) / (1000 * 60 * 60 * 24);
  const phaseCycle = ((diffDays % synodicMonth) + synodicMonth) % synodicMonth;
  const normalizedPhase = phaseCycle / synodicMonth;
  const illuminationFraction = 0.5 * (1 - Math.cos(2 * Math.PI * normalizedPhase));

  return {
    phase: normalizedPhase,
    illumination: Math.round(illuminationFraction * 100),
    ageDays: Math.round(phaseCycle * 10) / 10,
  };
}

export function getLocalizedPhaseName(phase: number, dict: AstroDictionary): string {
  if (phase < 0.03 || phase > 0.97) return dict.phaseNewMoon;
  if (phase < 0.22) return dict.phaseWaxingCrescent;
  if (phase < 0.28) return dict.phaseFirstQuarter;
  if (phase < 0.47) return dict.phaseWaxingGibbous;
  if (phase < 0.53) return dict.phaseFullMoon;
  if (phase < 0.72) return dict.phaseWaningGibbous;
  if (phase < 0.78) return dict.phaseLastQuarter;
  return dict.phaseWaningCrescent;
}

export { getPolishDayName, formatLocalDate as formatISODate };
