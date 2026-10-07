// PATH: src/components/MoonVisual.tsx | VERSION: 2.1.0 | REQ-ID: MOON-VISUAL-02
import React from 'react';
import { Sparkles } from 'lucide-react';

interface MoonVisualProps {
  phase: number; // 0..1 cykl synodyczny
  size?: number;
  showLabels?: boolean;
}

export const MoonVisual: React.FC<MoonVisualProps> = ({ phase, size = 160, showLabels = true }) => {
  const norm = ((phase % 1) + 1) % 1; // 0..1
  const r = size / 2;
  const isWaxing = norm <= 0.5;
  // Iluminacja geometryczna tarczy:
  const illuminationFraction = 0.5 * (1 - Math.cos(2 * Math.PI * norm));
  const illumPct = Math.round(illuminationFraction * 100);

  // Kształt terminatora cienia:
  // p: -1 (nów) -> 0 (kwadra) -> +1 (pełnia)
  const p = Math.cos(2 * Math.PI * norm);
  const rx = Math.max(0.1, Math.abs(r * p));
  const sweep = (isWaxing && p <= 0) || (!isWaxing && p > 0) ? 1 : 0;
  const shadowPath = isWaxing
    ? `M ${r} 0 A ${r} ${r} 0 0 0 ${r} ${size} A ${rx} ${r} 0 0 ${sweep} ${r} 0`
    : `M ${r} 0 A ${r} ${r} 0 0 1 ${r} ${size} A ${rx} ${r} 0 0 ${sweep} ${r} 0`;

  return (
    <div className="flex flex-col items-center justify-center p-3 select-none">
      <div className="relative rounded-full shadow-2xl" style={{ width: size, height: size, background: '#111822' }}>
        <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: `0 0 ${Math.round(illumPct * 0.35)}px rgba(226, 211, 169, ${illumPct * 0.004})` }} />
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-full overflow-hidden">
          <defs>
            <radialGradient id={`moonLit-${size}`} cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fffcf2" /><stop offset="50%" stopColor="#e8dfcb" /><stop offset="100%" stopColor="#b3a58b" />
            </radialGradient>
          </defs>
          <circle cx={r} cy={r} r={r} fill={`url(#moonLit-${size})`} />
          <g fill="#8f846e" opacity="0.38">
            <circle cx={r * 0.7} cy={r * 0.6} r={r * 0.16} /><circle cx={r * 1.3} cy={r * 0.8} r={r * 0.22} /><circle cx={r * 0.9} cy={r * 1.3} r={r * 0.18} />
          </g>
          {illumPct < 99 && <path d={shadowPath} fill="#0b1016" opacity="0.94" />}
        </svg>
      </div>
      {showLabels && (
        <div className="mt-2 text-center">
          <span className="text-xs font-bold text-[#38bdf8] flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" /> Iluminacja: {illumPct}%
          </span>
        </div>
      )}
    </div>
  );
};
