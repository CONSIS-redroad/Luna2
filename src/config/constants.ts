// PATH: src/config/constants.ts | VERSION: 1.0.0 | REQ-ID: CONFIG-01
import { MoonConfig, NightInput } from '../types/moon';

export const CONFIG: MoonConfig = Object.freeze({
  location: "Gdańsk",
  sleep: {
    phaseWeight: 75,
    fullMoonPenalty: 15,
  },
  temperature: {
    min: 6,
    max: 16,
    penalty: 5,
  },
});

export const INITIAL_DATASET: readonly NightInput[] = Object.freeze([
  { date: "01.10", day: "Czw", phase: 0.72, clouds: 0.00, fog: 0.00, temp: 9, fullDate: "2026-10-01" },
  { date: "02.10", day: "Pią", phase: 0.63, clouds: 0.40, fog: 0.10, temp: 9, fullDate: "2026-10-02" },
  { date: "03.10", day: "Sob", phase: 0.50, clouds: 0.80, fog: 0.20, temp: 10, fullDate: "2026-10-03" },
  { date: "04.10", day: "Nie", phase: 0.40, clouds: 0.30, fog: 0.90, temp: 10, fullDate: "2026-10-04" },
  { date: "05.10", day: "Pon", phase: 0.29, clouds: 0.75, fog: 0.30, temp: 12, fullDate: "2026-10-05" },
]);

export const MOON_PHASE_NAMES: Record<string, string> = {
  new: "Nów",
  waxing_crescent: "Młody Księżyc (Sierp przybywający)",
  first_quarter: "Pierwsza kwadra",
  waxing_gibbous: "Przybywający garb",
  full: "Pełnia",
  waning_gibbous: "Ubywający garb",
  last_quarter: "Ostatnia kwadra",
  waning_crescent: "Stary Księżyc (Sierp ubywający)",
};
