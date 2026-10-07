// PATH: src/types/moon.ts | VERSION: 1.0.0 | REQ-ID: LUNA-TYPES-01
export interface NightInput {
  date: string;
  day: string;
  phase: number; // 0 (nów) do 1 (pełnia)
  clouds: number; // 0.00 - 1.00
  fog: number; // 0.00 - 1.00
  temp: number; // stopnie C
  fullDate?: string; // YYYY-MM-DD
}

export interface NightCalculated extends NightInput {
  effectiveBlocking: number;
  blockingPct: number;
  phasePct: number;
  sleep: number;
  observation: number;
  temperaturePenalty: number;
  phaseName: string;
}

export interface MoonConfig {
  location: string;
  sleep: {
    phaseWeight: number;
    fullMoonPenalty: number;
  };
  temperature: {
    min: number;
    max: number;
    penalty: number;
  };
}
