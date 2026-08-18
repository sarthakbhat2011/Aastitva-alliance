import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { useSpatialParallax } from '../../hooks/useSpatialParallax';

export interface SpatialFloatingElementProps {
  children?: React.ReactNode;
  className?: string;
  preset?: 'gentle' | 'wave' | 'deep-drift' | 'orbital' | 'crossing' | 'card-float';
  speed?: number; // multiplier, default 1
  amplitudeX?: number; // px, default based on preset
  amplitudeY?: number; // px, default based on preset
  rotationAngle?: number; // deg, default based on preset
  depthLayer?: 'foreground' | 'midground' | 'background' | 'deep-background';
  parallaxFactor?: number; // mouse parallax intensity, default based on layer
  delay?: number;
  interactive?: boolean;
  passBehind?: boolean; // sets z-index lower than surrounding cards
}

export const SpatialFloatingElement: React.FC<SpatialFloatingElementProps> = ({
  children,
  className = '',
  preset = 'gentle',
  speed = 1,
  amplitudeX,
  amplitudeY,
  rotationAngle,
  depthLayer = 'midground',
  parallaxFactor,
  delay = 0,
  interactive = true,
  passBehind = false,
}) => {
  const coords = useSpatialParallax(0.04);

  // Derive presets with refined, subtle, and silky smooth spatial micro-movements
  const presetConfig = useMemo(() => {
    switch (preset) {
      case 'wave':
        return {
          ampX: amplitudeX ?? 6,
          ampY: amplitudeY ?? 8,
          rot: rotationAngle ?? 0.8,
          duration: 9.5 / speed,
          ease: 'easeInOut',
        };
      case 'deep-drift':
        return {
          ampX: amplitudeX ?? 10,
          ampY: amplitudeY ?? 12,
          rot: rotationAngle ?? 1.2,
          duration: 16 / speed,
          ease: 'easeInOut',
        };
      case 'orbital':
        return {
          ampX: amplitudeX ?? 7,
          ampY: amplitudeY ?? 7,
          rot: rotationAngle ?? 2.0,
          duration: 12 / speed,
          ease: 'linear',
        };
      case 'crossing':
        return {
          ampX: amplitudeX ?? 18,
          ampY: amplitudeY ?? 6,
          rot: rotationAngle ?? 1.0,
          duration: 20 / speed,
          ease: 'easeInOut',
        };
      case 'card-float':
        return {
          ampX: amplitudeX ?? 3.5,
          ampY: amplitudeY ?? 5.0,
          rot: rotationAngle ?? 0.5,
          duration: 7.5 / speed,
          ease: 'easeInOut',
        };
      case 'gentle':
      default:
        return {
          ampX: amplitudeX ?? 4.0,
          ampY: amplitudeY ?? 6.0,
          rot: rotationAngle ?? 0.6,
          duration: 8.0 / speed,
          ease: 'easeInOut',
        };
    }
  }, [preset, speed, amplitudeX, amplitudeY, rotationAngle]);

  // Derive depth factor for parallax (subtle, soft cursor reactivity)
  const computedParallax = useMemo(() => {
    if (parallaxFactor !== undefined) return parallaxFactor;
    switch (depthLayer) {
      case 'foreground':
        return 7;
      case 'midground':
        return 4.5;
      case 'background':
        return 2.5;
      case 'deep-background':
        return 1.2;
    }
  }, [depthLayer, parallaxFactor]);

  // Derive z-index class
  const zIndexClass = useMemo(() => {
    if (passBehind) return 'z-0';
    switch (depthLayer) {
      case 'foreground':
        return 'z-30';
      case 'midground':
        return 'z-10';
      case 'background':
        return 'z-[2] pointer-events-none';
      case 'deep-background':
        return 'z-[-1] pointer-events-none';
    }
  }, [depthLayer, passBehind]);

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const ampMultiplier = isMobile ? 0.35 : 1.0;
  const rotMultiplier = isMobile ? 0.4 : 1.0;

  // Floating keyframe animations (soft, controlled organic breathing)
  const keyframeX = [
    0,
    presetConfig.ampX * 0.75 * ampMultiplier,
    -presetConfig.ampX * 0.6 * ampMultiplier,
    presetConfig.ampX * 0.35 * ampMultiplier,
    0,
  ];

  const keyframeY = [
    0,
    -presetConfig.ampY * ampMultiplier,
    presetConfig.ampY * 0.45 * ampMultiplier,
    -presetConfig.ampY * 0.6 * ampMultiplier,
    0,
  ];

  const keyframeRotate = [
    0,
    presetConfig.rot * rotMultiplier,
    -presetConfig.rot * 0.7 * rotMultiplier,
    presetConfig.rot * 0.3 * rotMultiplier,
    0,
  ];

  const keyframeScale = [1, 1.006, 0.996, 1.003, 1];

  return (
    <motion.div
      className={`gpu-accelerated ${zIndexClass} ${className}`}
      animate={{
        x: keyframeX,
        y: keyframeY,
        rotate: keyframeRotate,
        scale: keyframeScale,
      }}
      transition={{
        duration: presetConfig.duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay: delay,
      }}
      style={
        interactive
          ? {
              transform: `translate3d(${coords.x * computedParallax}px, ${
                coords.y * computedParallax
              }px, 0)`,
              transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
};
