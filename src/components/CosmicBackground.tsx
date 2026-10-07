// PATH: src/components/CosmicBackground.tsx | VERSION: 2.8.0 | REQ-ID: BG-RENDER-08
import React from 'react';
import { BackgroundSettings } from '../types/nasaBackground';
import { NASA_IMAGES } from '../config/nasaImages';
import { ParticleCanvasOverlay } from './ParticleCanvasOverlay';
import { PhotorealisticMoonMask } from './PhotorealisticMoonMask';
import { useParallax3D } from '../hooks/useParallax3D';
import { useOrbitalScroll } from '../hooks/useOrbitalScroll';
import { useSpace3DRotation } from '../hooks/useSpace3DRotation';
import { calculateMoonPhaseForDate } from '../services/astronomy';
import { getTodayDate } from '../services/dateUtils';

interface CosmicBgProps { settings: BackgroundSettings; }

export const CosmicBackground: React.FC<CosmicBgProps> = ({ settings }) => {
  const currentImg = NASA_IMAGES.find(i => i.id === settings.imageId) || NASA_IMAGES[0];
  const { scrollY, mouseOffset } = useParallax3D();
  const orbit = useOrbitalScroll();
  const spaceRot = useSpace3DRotation();
  const todayMoon = calculateMoonPhaseForDate(getTodayDate());

  const bgTranslateY = scrollY * 0.18;
  const bgScale = 1.08 + Math.min(0.12, scrollY * 0.0002);

  return (
    <div className={`fixed inset-0 z-0 overflow-hidden bg-[#070b10] perspective-1000 ${spaceRot.isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
      {/* 1. Trójwymiarowa przestrzeń kosmiczna z możliwością obracania perspektywy */}
      <div
        className="absolute -inset-16 transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `translate3d(${mouseOffset.x + spaceRot.rotY * 4}px, ${bgTranslateY + mouseOffset.y - spaceRot.rotX * 4}px, 0) rotateX(${spaceRot.rotX * 0.3}deg) rotateY(${spaceRot.rotY * 0.3}deg) scale(${bgScale})`,
          backgroundImage: `radial-gradient(ellipse at 50% 45%, rgba(30,41,59,0.35) 0%, rgba(7,11,16,0.96) 80%)`,
        }}
      />

      {/* 2. Cząsteczki pyłu kosmicznego */}
      {settings.enableParticles && <ParticleCanvasOverlay />}

      {/* 3. Potężny Księżyc (2x większy, 145vmin) w bliskiej odległości z wyrównanym kontrastem */}
      <PhotorealisticMoonMask
        imageUrl={currentImg.url}
        phase={todayMoon.phase}
        illumination={todayMoon.illumination}
        orbit={orbit}
        spaceRot={spaceRot}
      />

      {/* 4. Subtelna winieta głębi */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#070b10]/25 to-[#04070a]/80 pointer-events-none" />
    </div>
  );
};
