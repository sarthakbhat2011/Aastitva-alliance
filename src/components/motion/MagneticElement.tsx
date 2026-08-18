import React, { useRef, useState, ReactNode } from 'react';
import { motion } from 'motion/react';

interface Props {
  children: ReactNode;
  strength?: number; // 0 to 1, default 0.35
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

/**
 * MagneticElement
 * Attracts elements towards the user's cursor when hovered with smooth spring physics.
 */
export const MagneticElement: React.FC<Props> = ({
  children,
  strength = 0.35,
  className = '',
  onClick,
  disabled = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current || (typeof window !== 'undefined' && window.innerWidth < 768)) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = (clientX - centerX) * strength;
    const distanceY = (clientY - centerY) * strength;

    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: 'spring',
        stiffness: 160,
        damping: 14,
        mass: 0.1,
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
