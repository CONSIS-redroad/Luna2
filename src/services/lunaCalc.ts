// PATH: src/services/lunaCalc.ts | VERSION: 1.0.0 | REQ-ID: CALC-01
import { CONFIG } from '../config/constants';
import { NightCalculated, NightInput } from '../types/moon';

export const clamp = (val: number, min = 0, max = 100): number =>
  Math.max(min, Math.min(max, val));

export function getMoonPhaseName(phase: number): string {
  if (phase < 0.05) return "Nów";
  if (phase < 0.45) return "Sierp przybywający";
  if (phase < 0.55) return "Kwadra";
  if (phase < 0.90) return "Przybywający garb";
  if (phase <= 1.00 && phase > 0.90) return "Pełnia";
  return "Księżyc";
}

export function calculateNight(input: NightInput): NightCalculated {
  const effectiveBlocking = Math.max(input.clouds, input.fog);
  const temperaturePenalty =
    input.temp > CONFIG.temperature.max || input.temp < CONFIG.temperature.min
      ? CONFIG.temperature.penalty
      : 0;

  const sleep = clamp(
    Math.round(
      100 -
      input.phase * (1 - effectiveBlocking) * CONFIG.sleep.phaseWeight -
      input.phase * CONFIG.sleep.fullMoonPenalty -
      temperaturePenalty
    )
  );

  const observation = clamp(
    Math.round((1 - effectiveBlocking) * (1 - input.phase) * 100)
  );

  return {
    ...input,
    effectiveBlocking,
    blockingPct: Math.round(effectiveBlocking * 100),
    phasePct: Math.round(input.phase * 100),
    sleep,
    observation,
    temperaturePenalty,
    phaseName: getMoonPhaseName(input.phase),
  };
}

export const buildForecast = (ds: readonly NightInput[]): NightCalculated[] =>
  ds.map(calculateNight);
