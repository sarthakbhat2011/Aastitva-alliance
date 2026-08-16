import React, { useRef, useState, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface Props {
  children: ReactNode;
  className?: string;
  maxTilt?: number; // degrees, default 10
  glare?: boolean;
  scale?: number; // default 1.02
  onClick?: () => void;
  onMouseEnter?: () => void;
}

/**
 * PerspectiveCard
 * Delivers realistic 3D perspective tilt and dynamic specular glare based on mouse coordinates.
 */
export const PerspectiveCard: React.FC<Props> = ({
  children,
  className = '',
  maxTilt = 10,
  glare = true,
  scale = 1.02,
  onClick,
  onMouseEnter,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse coordinates normalized from -0.5 to 0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 220,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 220,
    damping: 20,
  });

  // Glare position calculation
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 220, damping: 20 });
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 220, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onMouseEnter && onMouseEnter();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{ perspective: 1100 }}
      className={`relative inline-block w-full ${className}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full rounded-inherit gpu-accelerated"
      >
        {children}

        {/* Dynamic Specular Light Glare Overlay */}
        {glare && isHovered && (
          <motion.div
            className="absolute inset-0 rounded-inherit pointer-events-none z-20 overflow-hidden"
            style={{
              background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255, 255, 255, 0.14) 0%, rgba(212, 175, 55, 0.08) 35%, transparent 70%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
};
