// PATH: src/components/ParticleCanvasOverlay.tsx | VERSION: 1.2.0 | REQ-ID: PARTICLES-01
import React, { useEffect, useRef } from 'react';

export const ParticleCanvasOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (cvs.width = window.innerWidth);
    let height = (cvs.height = window.innerHeight);

    const onResize = () => {
      width = cvs.width = window.innerWidth;
      height = cvs.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.2,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.35 - 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(238, 226, 197, ${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};
