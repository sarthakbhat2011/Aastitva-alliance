import React from 'react';
import { motion } from 'motion/react';

export interface ViewportTraverserProps {
  children?: React.ReactNode;
  className?: string;
  direction?: 'left-to-right' | 'right-to-left' | 'diagonal-up' | 'diagonal-down';
  duration?: number; // seconds, default 28
  delay?: number;
  startY?: string; // CSS top offset, e.g. '20%', '65%'
  passBehind?: boolean; // z-index lower than cards
  opacityRange?: [number, number]; // [min, max] opacity
}

export const ViewportTraverser: React.FC<ViewportTraverserProps> = ({
  children,
  className = '',
  direction = 'left-to-right',
  duration = 32,
  delay = 0,
  startY = '35%',
  passBehind = true,
  opacityRange = [0.15, 0.45],
}) => {
  const getVariants = () => {
    switch (direction) {
      case 'right-to-left':
        return {
          initial: { x: '115vw', y: 0, opacity: 0 },
          animate: {
            x: ['115vw', '50vw', '-15vw'],
            y: [0, -35, 20],
            opacity: [0, opacityRange[1], 0],
          },
        };
      case 'diagonal-up':
        return {
          initial: { x: '-15vw', y: '40vh', opacity: 0 },
          animate: {
            x: ['-15vw', '45vw', '115vw'],
            y: ['40vh', '0vh', '-35vh'],
            opacity: [0, opacityRange[1], 0],
          },
        };
      case 'diagonal-down':
        return {
          initial: { x: '115vw', y: '-25vh', opacity: 0 },
          animate: {
            x: ['115vw', '50vw', '-15vw'],
            y: ['-25vh', '15vh', '45vh'],
            opacity: [0, opacityRange[1], 0],
          },
        };
      case 'left-to-right':
      default:
        return {
          initial: { x: '-15vw', y: 0, opacity: 0 },
          animate: {
            x: ['-15vw', '50vw', '115vw'],
            y: [0, 45, -25],
            opacity: [0, opacityRange[1], 0],
          },
        };
    }
  };

  const variants = getVariants();
  const zClass = passBehind ? 'z-[1] pointer-events-none' : 'z-20 pointer-events-none';

  return (
    <div
      className={`fixed ${zClass} overflow-hidden pointer-events-none select-none`}
      style={{ top: startY, left: 0, width: '100vw', height: '1px' }}
      aria-hidden="true"
    >
      <motion.div
        className={`inline-block gpu-accelerated ${className}`}
        initial={variants.initial}
        animate={variants.animate}
        transition={{
          duration: duration,
          delay: delay,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
