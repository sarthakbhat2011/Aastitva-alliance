import React, { JSX } from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'flip-3d' | 'origami' | 'blur-in' | 'mask-reveal' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  staggerChildren?: number;
  once?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance = 40,
  className = '',
  staggerChildren = 0,
  once = true,
}) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: isMobile ? 24 : distance, scale: 0.98 };
      case 'down':
        return { opacity: 0, y: isMobile ? -24 : -distance, scale: 0.98 };
      case 'left':
        return isMobile ? { opacity: 0, y: 20, scale: 0.98 } : { opacity: 0, x: distance, scale: 0.98 };
      case 'right':
        return isMobile ? { opacity: 0, y: 20, scale: 0.98 } : { opacity: 0, x: -distance, scale: 0.98 };
      case 'zoom':
        return { opacity: 0, scale: isMobile ? 0.95 : 0.90, filter: isMobile ? 'none' : 'blur(4px)' };
      case 'flip-3d':
        return isMobile ? { opacity: 0, y: 20, scale: 0.98 } : { opacity: 0, rotateX: 25, y: 35, scale: 0.94, filter: 'blur(4px)' };
      case 'origami':
        return isMobile ? { opacity: 0, y: 20, scale: 0.98 } : { opacity: 0, rotateY: -20, x: -25, scale: 0.95 };
      case 'blur-in':
        return isMobile ? { opacity: 0, y: 16 } : { opacity: 0, filter: 'blur(12px)', scale: 0.96 };
      case 'mask-reveal':
        return { opacity: 0, clipPath: 'inset(10% 0 10% 0)', y: 20 };
      case 'none':
        return { opacity: 0 };
      default:
        return { opacity: 0, y: isMobile ? 24 : distance, scale: 0.98 };
    }
  };

  const variants = {
    hidden: getInitialPosition(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      filter: 'blur(0px)',
      clipPath: 'inset(0% 0 0% 0)',
      transition: {
        duration: isMobile ? Math.min(duration, 0.55) : duration,
        delay: isMobile ? delay * 0.7 : delay,
        ease: [0.16, 1, 0.3, 1], // Custom smooth cubic-bezier
        staggerChildren: staggerChildren > 0 ? staggerChildren : undefined,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: isMobile ? '-20px' : '-50px' }}
      variants={variants}
      style={{ perspective: 1200 }}
      className={`gpu-accelerated ${className}`}
    >
      {children}
    </motion.div>
  );
};
