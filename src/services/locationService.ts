// PATH: src/services/locationService.ts | VERSION: 2.1.0 | REQ-ID: LOC-SERVICE-02
import { GeoLocation } from '../types/location';

export const GLOBAL_CITIES: GeoLocation[] = [
  { id: 'gda', name: 'Gdańsk', country: 'Polska', lat: 54.35, lon: 18.65, tempOffset: 0, cloudModifier: 0 },
  { id: 'waw', name: 'Warszawa', country: 'Polska', lat: 52.23, lon: 21.01, tempOffset: 2, cloudModifier: -0.05 },
  { id: 'krk', name: 'Kraków', country: 'Polska', lat: 50.06, lon: 19.94, tempOffset: 1, cloudModifier: -0.1 },
  { id: 'wro', name: 'Wrocław', country: 'Polska', lat: 51.11, lon: 17.03, tempOffset: 3, cloudModifier: -0.1 },
  { id: 'poz', name: 'Poznań', country: 'Polska', lat: 52.41, lon: 16.93, tempOffset: 2, cloudModifier: -0.05 },
  { id: 'zak', name: 'Zakopane', country: 'Polska', lat: 49.30, lon: 19.95, tempOffset: -4, cloudModifier: 0.1 },
  { id: 'lon', name: 'Londyn', country: 'Wielka Brytania', lat: 51.51, lon: -0.13, tempOffset: 2, cloudModifier: 0.15 },
  { id: 'par', name: 'Paryż', country: 'Francja', lat: 48.85, lon: 2.35, tempOffset: 4, cloudModifier: -0.05 },
  { id: 'rom', name: 'Rzym', country: 'Włochy', lat: 41.90, lon: 12.50, tempOffset: 8, cloudModifier: -0.25 },
  { id: 'ber', name: 'Berlin', country: 'Niemcy', lat: 52.52, lon: 13.40, tempOffset: 2, cloudModifier: 0 },
  { id: 'nyc', name: 'Nowy Jork', country: 'USA', lat: 40.71, lon: -74.01, tempOffset: 5, cloudModifier: -0.1 },
  { id: 'tyo', name: 'Tokio', country: 'Japonia', lat: 35.68, lon: 139.69, tempOffset: 7, cloudModifier: -0.05 },
  { id: 'rey', name: 'Reykjavik', country: 'Islandia', lat: 64.14, lon: -21.94, tempOffset: -5, cloudModifier: 0.2 },
];

export function searchCities(query: string): GeoLocation[] {
  const q = query.trim().toLowerCase();
  if (!q) return GLOBAL_CITIES;
  return GLOBAL_CITIES.filter(c => c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q));
}
