// PATH: src/services/storage.ts | VERSION: 2.1.0 | REQ-ID: STORAGE-02
import { SleepEntry } from '../types/journal';

export const SCHEMA_VERSION = 2;

function getKey(userId = 'default'): string {
  return `luna_user_${userId}_entries_v${SCHEMA_VERSION}`;
}

export function migrateStorageIfNeeded(userId = 'default'): void {
  const targetKey = getKey(userId);
  if (localStorage.getItem(targetKey)) return;
  const legacyKeys = ['luna_sleep_journal_entries_v1', 'luna_sleep_entries_v1'];
  for (const lk of legacyKeys) {
    const raw = localStorage.getItem(lk);
    if (raw) {
      try {
        localStorage.setItem(`luna_backup_pre_v2_${Date.now()}`, raw);
        localStorage.setItem(targetKey, raw);
        break;
      } catch (err) {
        console.error('Błąd migracji danych:', err);
      }
    }
  }
}

export function getStoredSleepEntries(userId = 'default'): SleepEntry[] {
  migrateStorageIfNeeded(userId);
  try {
    const raw = localStorage.getItem(getKey(userId));
    return raw ? (JSON.parse(raw) as SleepEntry[]) : [];
  } catch {
    return [];
  }
}

export function saveSleepEntry(entry: SleepEntry, userId = 'default'): SleepEntry[] {
  const current = getStoredSleepEntries(userId);
  const idx = current.findIndex(e => e.date === entry.date);
  const updated = idx >= 0 ? current.map((e, i) => (i === idx ? entry : e)) : [entry, ...current];
  try {
    localStorage.setItem(getKey(userId), JSON.stringify(updated));
  } catch (err) {
    console.error('Błąd zapisu wpisu:', err);
  }
  return updated;
}

export function deleteSleepEntry(id: string, userId = 'default'): SleepEntry[] {
  const updated = getStoredSleepEntries(userId).filter(e => e.id !== id);
  try {
    localStorage.setItem(getKey(userId), JSON.stringify(updated));
  } catch (err) {
    console.error('Błąd usuwania wpisu:', err);
  }
  return updated;
}

export function clearAllUserData(userId = 'default'): void {
  localStorage.removeItem(getKey(userId));
}

export function exportUserDataJSON(userId = 'default'): string {
  const entries = getStoredSleepEntries(userId);
  return JSON.stringify({ schemaVersion: SCHEMA_VERSION, userId, exportedAt: new Date().toISOString(), entries }, null, 2);
}
