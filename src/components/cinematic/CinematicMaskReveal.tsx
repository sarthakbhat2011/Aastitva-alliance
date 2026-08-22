import React from 'react';
import { motion } from 'motion/react';

interface CinematicMaskRevealProps {
  children: React.ReactNode;
  variant?: 'curtain-wipe' | 'gold-trace-sweep' | 'iris-expand' | 'anamorphic-split';
  delay?: number;
  duration?: number;
  className?: string;
}

export const CinematicMaskReveal: React.FC<CinematicMaskRevealProps> = ({
  children,
  variant = 'gold-trace-sweep',
  delay = 0.1,
  duration = 0.85,
  className = '',
}) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const getVariants = () => {
    if (isMobile) {
      return {
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: Math.min(duration, 0.45), delay: delay * 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      };
    }

    switch (variant) {
      case 'curtain-wipe':
        return {
          hidden: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', opacity: 0 },
          visible: {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            opacity: 1,
            transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
          },
        };
      case 'iris-expand':
        return {
          hidden: { clipPath: 'circle(0% at 50% 50%)', opacity: 0 },
          visible: {
            clipPath: 'circle(100% at 50% 50%)',
            opacity: 1,
            transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
          },
        };
      case 'anamorphic-split':
        return {
          hidden: { clipPath: 'inset(45% 0% 45% 0%)', opacity: 0, scale: 0.96 },
          visible: {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            scale: 1,
            transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
          },
        };
      case 'gold-trace-sweep':
      default:
        return {
          hidden: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', opacity: 0, y: 15 },
          visible: {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            opacity: 1,
            y: 0,
            transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
          },
        };
    }
  };

  const variants = getVariants();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: isMobile ? '-10px' : '-40px' }}
        variants={variants}
        className="w-full relative"
      >
        {children}
        {/* Cinematic Shimmer Laser Edge (Desktop Only) */}
        {!isMobile && variant === 'gold-trace-sweep' && (
          <motion.div
            initial={{ left: '-10%', opacity: 0 }}
            whileInView={{ left: '110%', opacity: [0, 1, 0] }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: duration * 1.1, delay, ease: 'easeInOut' }}
            className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent pointer-events-none transform -skew-x-12"
          />
        )}
      </motion.div>
    </div>
  );
};
