import React, { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface Props {
  children: ReactNode;
  speed?: number; // negative moves opposite, positive moves along scroll (-50 to 50)
  className?: string;
}

/**
 * ParallaxLayer
 * Uses scroll-linked transform for depth and spatial storytelling.
 */
export const ParallaxLayer: React.FC<Props> = ({
  children,
  speed = 20,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={`relative ${className}`}>
      {children}
    </motion.div>
  );
};
