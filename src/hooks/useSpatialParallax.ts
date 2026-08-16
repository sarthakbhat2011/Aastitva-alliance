import { useState, useEffect, useRef } from 'react';

interface SpatialCoords {
  x: number; // normalized -1 to 1
  y: number; // normalized -1 to 1
  rawX: number;
  rawY: number;
}

export function useSpatialParallax(damping = 0.05) {
  const [coords, setCoords] = useState<SpatialCoords>({ x: 0, y: 0, rawX: 0, rawY: 0 });
  const targetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const reqIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth) * 2 - 1;
      const normY = (e.clientY / innerHeight) * 2 - 1;
      targetRef.current = { x: normX, y: normY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * damping;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * damping;

      setCoords({
        x: currentRef.current.x,
        y: currentRef.current.y,
        rawX: (currentRef.current.x + 1) * 0.5 * window.innerWidth,
        rawY: (currentRef.current.y + 1) * 0.5 * window.innerHeight,
      });

      reqIdRef.current = requestAnimationFrame(animate);
    };

    reqIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, [damping]);

  return coords;
}
