// PATH: src/types/journal.ts | VERSION: 1.0.0 | REQ-ID: JOURNAL-TYPES-01
export type SleepQualityRating = 1 | 2 | 3 | 4 | 5;

export interface SleepEntry {
  id: string;
  date: string; // YYYY-MM-DD
  dayLabel: string;
  rating: SleepQualityRating;
  ratingScore: number; // 0-100 dla porównania z WJN
  hoursSlept: number;
  mood: 'energized' | 'calm' | 'tired' | 'restless';
  notes: string;
  lunaSleepForecast?: number;
  moonPhasePct?: number;
  timestamp: number;
}
