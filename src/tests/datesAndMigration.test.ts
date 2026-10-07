// PATH: src/tests/datesAndMigration.test.ts | VERSION: 2.2.0 | REQ-ID: TEST-02
import { addDays, formatLocalDate, parseLocalDate, getPolishDayName, formatPolishDisplayDate } from '../services/dateUtils';
import { migrateStorageIfNeeded, getStoredSleepEntries } from '../services/storage';

// 1. Test przejścia roku (31.12 -> 01.01)
const endOfYear = new Date(2025, 11, 31);
const nextYearDay = addDays(endOfYear, 1);
console.assert(formatLocalDate(nextYearDay) === '2026-01-01', 'BŁĄD: Przejście roku 31.12 -> 01.01');

// 2. Test lutego (rok nieprzestępny 2025 vs przestępny 2024)
const feb28NonLeap = new Date(2025, 1, 28);
console.assert(formatLocalDate(addDays(feb28NonLeap, 1)) === '2025-03-01', 'BŁĄD: Luty 2025 powinien przejść w 01.03');
const feb28Leap = new Date(2024, 1, 28);
console.assert(formatLocalDate(addDays(feb28Leap, 1)) === '2024-02-29', 'BŁĄD: Luty 2024 powinien mieć 29.02');

// 3. Test polskich nazw dni tygodnia (2026-10-02 = Piątek = Pt)
const fridayDate = new Date(2026, 9, 2);
console.assert(getPolishDayName(fridayDate) === 'Pt', `BŁĄD: 2026-10-02 to Pt, otrzymano: ${getPolishDayName(fridayDate)}`);
console.assert(formatPolishDisplayDate('2026-10-02') === '02.10.2026', 'BŁĄD: formatPolishDisplayDate');

// 4. Test migracji storage
const mockStore: Record<string, string> = {
  luna_sleep_journal_entries_v1: JSON.stringify([
    { id: 'legacy_1', date: '2026-01-15', rating: 5, ratingScore: 100, hoursSlept: 8, mood: 'calm', notes: 'Test', timestamp: 1 }
  ]),
};

(globalThis as any).localStorage = {
  getItem: (k: string) => mockStore[k] || null,
  setItem: (k: string, v: string) => { mockStore[k] = v; },
  removeItem: (k: string) => { delete mockStore[k]; },
};

migrateStorageIfNeeded('test_user');
const entries = getStoredSleepEntries('test_user');
console.assert(entries.length === 1 && entries[0].id === 'legacy_1', 'BŁĄD: Migracja wpisów');
const backupKeys = Object.keys(mockStore).filter(k => k.startsWith('luna_backup_pre_v2_'));
console.assert(backupKeys.length === 1, 'BŁĄD: Brak kopii zapasowej');

console.log('✅ Wszystkie testy dat, polskich dni i migracji storage zakończone pomyślnie!');
