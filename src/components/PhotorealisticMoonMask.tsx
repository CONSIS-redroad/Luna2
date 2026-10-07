// PATH: src/components/PhotorealisticMoonMask.tsx | VERSION: 2.8.0 | REQ-ID: MOON-MASK-04
import React from 'react';
import { OrbitalState } from '../hooks/useOrbitalScroll';
import { SpaceRotation } from '../hooks/useSpace3DRotation';

interface Props {
  imageUrl: string;
  phase: number;
  illumination: number;
  orbit: OrbitalState;
  spaceRot: SpaceRotation;
}

export const PhotorealisticMoonMask: React.FC<Props> = ({ imageUrl, phase, illumination, orbit, spaceRot }) => {
  const isWaxing = phase <= 0.5;
  const curveX = (illumination / 100 - 0.5) * 98;

  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[145vmin] h-[145vmin] max-w-[1550px] max-h-[1550px] pointer-events-none z-10 select-none transition-transform duration-200 ease-out will-change-transform"
      style={{
        transform: `translate3d(calc(-50% + ${orbit.x}px), calc(-50% + ${orbit.y}px), 0) rotateX(${spaceRot.rotX * 0.4}deg) rotateY(${spaceRot.rotY * 0.4}deg) scale(${orbit.scale})`,
      }}
    >
      <svg className="absolute w-full h-full inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="smoothTerminatorBlur">
            <feGaussianBlur stdDeviation="3.8" />
          </filter>
          <mask id="equilibratedMoonMask">
            <rect width="100" height="100" fill="black" />
            <path
              d={isWaxing
                ? `M 50,0.5 A 49.5,49.5 0 0,1 50,99.5 C ${50 + curveX},99.5 ${50 + curveX},0.5 50,0.5 Z`
                : `M 50,0.5 A 49.5,49.5 0 0,0 50,99.5 C ${50 - curveX},99.5 ${50 - curveX},0.5 50,0.5 Z`}
              fill="white"
              filter="url(#smoothTerminatorBlur)"
            />
          </mask>
        </defs>
      </svg>

      {/* 1. Wyrównany kontrast: ciemna strona w aksamitnym świetle popielatym z widoczną fakturą kraterów */}
      <img
        src={imageUrl}
        alt="Księżyc popielaty"
        className="absolute inset-0 w-full h-full object-cover rounded-full filter brightness-[0.45] contrast-[1.05] saturate-[0.80]"
      />

      {/* 2. Oświetlona strona z miękkim przejściem terminatora bez agresywnego kontrastu */}
      <img
        src={imageUrl}
        alt="Księżyc oświetlony"
        style={{ mask: 'url(#equilibratedMoonMask)', WebkitMask: 'url(#equilibratedMoonMask)' }}
        className="absolute inset-0 w-full h-full object-cover rounded-full filter brightness-[1.08] contrast-[1.06] drop-shadow-[0_0_50px_rgba(255,255,255,0.3)]"
      />

      {/* 3. Atmosferyczna poświata tarczy w bliskiej odległości */}
      <div className="absolute -inset-12 rounded-full bg-radial from-white/10 via-transparent to-transparent blur-3xl pointer-events-none" />
    </div>
  );
};
