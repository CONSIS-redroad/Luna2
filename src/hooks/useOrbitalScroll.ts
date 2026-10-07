// PATH: src/hooks/useOrbitalScroll.ts | VERSION: 2.8.0 | REQ-ID: ORBIT-04
import { useState, useEffect } from 'react';

export interface OrbitalState {
  progress: number;
  x: number;
  y: number;
  scale: number;
}

export function useOrbitalScroll(): OrbitalState {
  const [orbit, setOrbit] = useState<OrbitalState>({
    progress: 0, x: 0, y: 0, scale: 1,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = Math.max(1, window.innerHeight * 1.2);
      const p = Math.min(1, Math.max(0, scrollY / maxScroll));

      // Kinowy przelot w bliskiej odległości od Księżyca przy scrollowaniu
      const x = p * 80; // Łagodne przesunięcie orbitalne
      const y = -p * 220; // Wznoszenie się ponad horyzont
      const scale = 1 - p * 0.28; // Księżyc pozostaje potężny nawet przy scrollu (72% wielkości początkowej)

      setOrbit({ progress: p, x, y, scale });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return orbit;
}
