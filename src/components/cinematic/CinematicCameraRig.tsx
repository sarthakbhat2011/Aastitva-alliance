import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface CinematicCameraRigProps {
  children: React.ReactNode;
  foregroundElement?: React.ReactNode;
  backgroundGlow?: string; // color or CSS gradient
  className?: string;
  depthIntensity?: number;
}

export const CinematicCameraRig: React.FC<CinematicCameraRigProps> = ({
  children,
  foregroundElement,
  backgroundGlow,
  className = '',
  depthIntensity = 1.0,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // Layer 1: Background Matte (Slow Drift)
  const bgY = useTransform(smooth, [0, 1], [-20 * depthIntensity, 35 * depthIntensity]);

  // Layer 2: Midground Subject (Medium Drift)
  const midY = useTransform(smooth, [0, 1], [30 * depthIntensity, -25 * depthIntensity]);
  const midScale = useTransform(smooth, [0, 0.5, 1], [0.97, 1.0, 0.98]);

  // Layer 3: Foreground Cinematic Camera Prop (Fast Drift passing camera)
  const fgY = useTransform(smooth, [0, 1], [80 * depthIntensity, -90 * depthIntensity]);
  const fgOpacity = useTransform(smooth, [0, 0.3, 0.7, 1], [0.2, 0.9, 0.9, 0.1]);

  return (
    <div ref={targetRef} className={`relative overflow-visible ${className}`}>
      {/* Background Matte Layer */}
      {backgroundGlow && (
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 pointer-events-none -z-10 blur-3xl opacity-20"
        >
          <div className="w-full h-full" style={{ background: backgroundGlow }} />
        </motion.div>
      )}

      {/* Midground Focal Content */}
      <motion.div style={{ y: midY, scale: midScale }} className="relative z-10 w-full">
        {children}
      </motion.div>

      {/* Foreground Camera Prop (Passes right in front of the lens) */}
      {foregroundElement && (
        <motion.div
          style={{ y: fgY, opacity: fgOpacity }}
          className="absolute top-10 right-4 sm:right-12 pointer-events-none z-30"
        >
          {foregroundElement}
        </motion.div>
      )}
    </div>
  );
};
