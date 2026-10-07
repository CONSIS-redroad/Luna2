// PATH: src/hooks/useSleepJournal.ts | VERSION: 2.1.0 | REQ-ID: HOOK-04
import { useState, useEffect, useCallback } from 'react';
import { SleepEntry } from '../types/journal';
import { getStoredSleepEntries, saveSleepEntry, deleteSleepEntry } from '../services/storage';

export function useSleepJournal(userId = 'default') {
  const [entries, setEntries] = useState<SleepEntry[]>([]);

  useEffect(() => {
    setEntries(getStoredSleepEntries(userId));
  }, [userId]);

  const addOrUpdateEntry = useCallback((entry: SleepEntry) => {
    const updated = saveSleepEntry(entry, userId);
    setEntries(updated);
  }, [userId]);

  const removeEntry = useCallback((id: string) => {
    const updated = deleteSleepEntry(id, userId);
    setEntries(updated);
  }, [userId]);

  const getEntryForDate = useCallback(
    (d: string) => entries.find(e => e.date === d),
    [entries]
  );

  return { entries, addOrUpdateEntry, removeEntry, getEntryForDate };
}
