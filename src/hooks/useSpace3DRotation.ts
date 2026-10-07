// PATH: src/hooks/useSpace3DRotation.ts | VERSION: 2.8.0 | REQ-ID: ROT-3D-01
import { useState, useEffect, useRef } from 'react';

export interface SpaceRotation {
  rotX: number; // Obrót wokół osi X (pitch)
  rotY: number; // Obrót wokół osi Y (yaw)
  zoom: number; // Zbliżenie na orbitę
  isDragging: boolean;
}

export function useSpace3DRotation(): SpaceRotation {
  const [rot, setRot] = useState<SpaceRotation>({ rotX: 0, rotY: 0, zoom: 1, isDragging: false });
  const dragRef = useRef({ startX: 0, startY: 0, curX: 0, curY: 0, active: false });

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      // Ignoruj kliknięcia w interaktywne przyciski
      if ((e.target as HTMLElement)?.closest('button, input, select, a')) return;
      dragRef.current = { startX: e.clientX, startY: e.clientY, curX: rot.rotY, curY: rot.rotX, active: true };
      setRot(r => ({ ...r, isDragging: true }));
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.active) return;
      const dx = (e.clientX - dragRef.current.startX) * 0.08;
      const dy = (e.clientY - dragRef.current.startY) * 0.08;
      setRot(r => ({
        ...r,
        rotY: Math.max(-25, Math.min(25, dragRef.current.curX + dx)),
        rotX: Math.max(-20, Math.min(20, dragRef.current.curY - dy)),
      }));
    };

    const onMouseUp = () => {
      dragRef.current.active = false;
      setRot(r => ({ ...r, isDragging: false }));
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [rot.rotX, rot.rotY]);

  return rot;
}
