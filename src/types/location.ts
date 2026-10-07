// PATH: src/types/location.ts | VERSION: 2.1.0 | REQ-ID: LOC-TYPES-02
export interface GeoLocation {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  tempOffset: number;
  cloudModifier: number;
}
