// PATH: src/services/calendarPhases.ts | VERSION: 3.1.0 | REQ-ID: CAL-PHASE-01
import { calculateMoonPhaseForDate } from './astronomy';
import { AstroDictionary } from '../i18n/types';

export type MainPhaseType = 'new' | 'firstQuarter' | 'full' | 'lastQuarter' | null;

export interface DayPhaseInfo {
  dayNumber: number;
  dateIso: string;
  phase: number;
  illumination: number;
  mainPhase: MainPhaseType;
  badgeLabel?: string;
}

export function detectMainPhase(phase: number): MainPhaseType {
  if (phase < 0.035 || phase > 0.965) return 'new';
  if (phase >= 0.22 && phase <= 0.28) return 'firstQuarter';
  if (phase >= 0.47 && phase <= 0.53) return 'full';
  if (phase >= 0.72 && phase <= 0.78) return 'lastQuarter';
  return null;
}

export function getMainPhaseLabel(type: MainPhaseType, dict: AstroDictionary): string | undefined {
  if (type === 'new') return dict.phaseNewMoon;
  if (type === 'firstQuarter') return dict.phaseFirstQuarter;
  if (type === 'full') return dict.phaseFullMoon;
  if (type === 'lastQuarter') return dict.phaseLastQuarter;
  return undefined;
}
