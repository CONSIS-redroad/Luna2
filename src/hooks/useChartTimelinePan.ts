// PATH: src/hooks/useChartTimelinePan.ts | VERSION: 3.2.0 | REQ-ID: CHART-PAN-02
import { useState, useRef, useMemo } from 'react';
import { NightCalculated } from '../types/moon';

export function useChartTimelinePan(data: NightCalculated[], windowSize = 7) {
  const defaultStart = useMemo(() => {
    if (data.length <= windowSize) return 0;
    return Math.min(Math.max(0, 6), data.length - windowSize);
  }, [data.length, windowSize]);

  const [startIndex, setStartIndex] = useState<number>(defaultStart);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragThreshold = 25;

  const handleTouchStart = (e: React.TouchEvent) => { isDragging.current = true; startX.current = e.touches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const diff = startX.current - e.touches[0].clientX;
    if (Math.abs(diff) > dragThreshold) {
      setStartIndex(prev => Math.max(0, Math.min(data.length - windowSize, prev + (diff > 0 ? 1 : -1))));
      startX.current = e.touches[0].clientX;
    }
  };
  const handleTouchEnd = () => { isDragging.current = false; };

  const handleMouseDown = (e: React.MouseEvent) => { isDragging.current = true; startX.current = e.clientX; };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const diff = startX.current - e.clientX;
    if (Math.abs(diff) > dragThreshold) {
      setStartIndex(prev => Math.max(0, Math.min(data.length - windowSize, prev + (diff > 0 ? 1 : -1))));
      startX.current = e.clientX;
    }
  };
  const handleMouseUp = () => { isDragging.current = false; };

  const stepPrev = () => setStartIndex(prev => Math.max(0, prev - 1));
  const stepNext = () => setStartIndex(prev => Math.min(data.length - windowSize, prev + 1));
  const resetToDefault = () => setStartIndex(defaultStart);

  const visibleData = useMemo(() => data.slice(startIndex, startIndex + windowSize), [data, startIndex, windowSize]);

  return {
    startIndex, visibleData, stepPrev, stepNext, resetToDefault,
    panProps: {
      onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd,
      onMouseDown: handleMouseDown, onMouseMove: handleMouseMove, onMouseUp: handleMouseUp,
    }
  };
}
