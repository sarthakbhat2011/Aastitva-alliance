import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export type ShotType =
  | 'establishing-shot' // Camera gently dollies back, expanding the frame
  | 'tracking-shot'    // Smooth horizontal/diagonal camera panning
  | 'lens-focus'        // Depth of field pull (blur & scale into focus)
  | 'theatrical-prop'  // Staged entrance from beyond the camera frame
  | 'montage'          // Sequential rhythmic cadence
  | 'cinematic-wipe'   // Smooth spatial reveal
  | 'reflective-calm'; // Deliberate stillness with soft micro-ambient breathing

interface CinematicSceneProps {
  children: React.ReactNode;
  shotType?: ShotType;
  className?: string;
  intensity?: number; // 0.5 to 2.0
  cameraTilt?: boolean;
}

export const CinematicScene: React.FC<CinematicSceneProps> = ({
  children,
  shotType = 'establishing-shot',
  className = '',
  intensity = 1.0,
  cameraTilt = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  // Dynamic Camera Transforms based on Shot Type
  // 1. Establishing Shot: Camera dollies back and settles
  const estScale = useTransform(smoothProgress, [0, 0.45, 1], [0.94, 1.0, 0.98]);
  const estOpacity = useTransform(smoothProgress, [0, 0.25, 0.85, 1], [0.35, 1, 1, 0.6]);
  const estY = useTransform(smoothProgress, [0, 0.5, 1], [40 * intensity, 0, -30 * intensity]);

  // 2. Tracking Shot: Panning horizontally and vertically
  const trackX = useTransform(smoothProgress, [0, 0.5, 1], [-25 * intensity, 0, 25 * intensity]);
  const trackY = useTransform(smoothProgress, [0, 0.5, 1], [30 * intensity, 0, -20 * intensity]);
  const trackRotate = useTransform(smoothProgress, [0, 0.5, 1], [-1.2 * intensity, 0, 1.2 * intensity]);

  // 3. Lens Focus: Starts blurred/scaled and pulls into crisp focus
  const lensBlur = useTransform(smoothProgress, [0, 0.35, 0.8, 1], ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(4px)']);
  const lensScale = useTransform(smoothProgress, [0, 0.4, 1], [0.95, 1.0, 0.98]);

  // 4. Theatrical Prop: Rotates and slides onto the stage
  const propY = useTransform(smoothProgress, [0, 0.45, 1], [55 * intensity, 0, -25 * intensity]);
  const propRotateX = useTransform(smoothProgress, [0, 0.4, 1], [cameraTilt ? 8 : 0, 0, cameraTilt ? -4 : 0]);

  // 5. Reflective Calm: Minimal, whisper-soft camera presence
  const calmScale = useTransform(smoothProgress, [0, 0.5, 1], [0.99, 1.0, 0.995]);
  const calmY = useTransform(smoothProgress, [0, 0.5, 1], [10 * intensity, 0, -10 * intensity]);

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const getStyle = () => {
    if (isMobile) {
      // Directed vertical portrait camera flow for mobile
      switch (shotType) {
        case 'tracking-shot':
          return {
            y: trackY,
          };
        case 'lens-focus':
          return {
            scale: lensScale,
            opacity: estOpacity,
          };
        case 'theatrical-prop':
          return {
            y: propY,
          };
        case 'reflective-calm':
          return {
            scale: calmScale,
            y: calmY,
          };
        case 'establishing-shot':
        default:
          return {
            scale: estScale,
            opacity: estOpacity,
            y: estY,
          };
      }
    }

    // Standard Desktop Wide-Shot Cinema Rig (100% locked & preserved)
    switch (shotType) {
      case 'tracking-shot':
        return {
          x: trackX,
          y: trackY,
          rotateZ: cameraTilt ? trackRotate : 0,
        };
      case 'lens-focus':
        return {
          filter: lensBlur,
          scale: lensScale,
        };
      case 'theatrical-prop':
        return {
          y: propY,
          rotateX: propRotateX,
          transformPerspective: 1200,
        };
      case 'reflective-calm':
        return {
          scale: calmScale,
          y: calmY,
        };
      case 'establishing-shot':
      default:
        return {
          scale: estScale,
          opacity: estOpacity,
          y: estY,
        };
    }
  };

  return (
    <div ref={containerRef} className={`relative overflow-visible ${className}`}>
      <motion.div style={getStyle()} className="gpu-accelerated w-full">
        {children}
      </motion.div>
    </div>
  );
};
