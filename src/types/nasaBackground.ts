// PATH: src/types/nasaBackground.ts | VERSION: 1.2.0 | REQ-ID: NASA-TYPES-01
export interface NasaImageMeta {
  id: string;
  title: string;
  mission: string;
  url: string;
  thumbnail: string;
  description: string;
}

export interface BackgroundSettings {
  imageId: string;
  blur: number; // 0..20 px
  opacity: number; // 0.1..0.8
  enableParticles: boolean;
}
