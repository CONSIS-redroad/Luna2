// PATH: src/services/dateUtils.ts | VERSION: 2.2.0 | REQ-ID: DATE-UTILS-02
export function getTodayDate(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function formatLocalDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatShortDate(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${d}.${m}`;
}

export function formatPolishDisplayDate(isoOrDate: string | Date): string {
  const d = typeof isoOrDate === 'string' ? parseLocalDate(isoOrDate) : isoOrDate;
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export function parseLocalDate(isoString: string): Date {
  const [y, m, d] = isoString.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function getPolishDayName(date: Date): string {
  // Spójne polskie skróty dni tygodnia: 0 = Nd, 1 = Pn, 2 = Wt, itd.
  const days = ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"];
  return days[date.getDay()];
}
