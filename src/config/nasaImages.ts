// PATH: src/config/nasaImages.ts | VERSION: 2.6.0 | REQ-ID: NASA-CONFIG-05
import { NasaImageMeta, BackgroundSettings } from '../types/nasaBackground';

export const NASA_IMAGES: NasaImageMeta[] = [
  {
    id: 'lro_full_moon',
    title: 'Tarcza Księżyca w Pełni (Ultra HD)',
    mission: 'Fot. Mike Petrucci (Unsplash License)',
    url: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=2400&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=300&q=80',
    description: 'Prawdziwa fotografia tarczy Księżyca w wysokiej rozdzielczości z kraterami.',
  },
  {
    id: 'lunar_surface',
    title: 'Faktura Kraterów Księżycowych',
    mission: 'Fot. Pedro Lastra (Unsplash License)',
    url: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=2400&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=300&q=80',
    description: 'Zbliżenie na powierzchnię i topografię kraterów.',
  },
  {
    id: 'crescent_deep_space',
    title: 'Srebrzysty Sierp w Głębokim Kosmosie',
    mission: 'Fot. Ganapathy Kumar (Unsplash License)',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2400&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=300&q=80',
    description: 'Nocne ujęcie Księżyca na tle gwiazd.',
  },
  {
    id: 'apollo11_earthrise',
    title: 'Horyzont Kosmiczny i Ziemia',
    mission: 'Fot. NASA Archive (Unsplash License)',
    url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=2400&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=300&q=80',
    description: 'Archiwalne ujęcie z misji kosmicznej.',
  },
];

export const DEFAULT_BG_SETTINGS: BackgroundSettings = {
  imageId: 'lro_full_moon',
  blur: 0,
  opacity: 0.65,
  enableParticles: true,
};
