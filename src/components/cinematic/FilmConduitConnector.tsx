import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface FilmConduitConnectorProps {
  label?: string;
  glyph?: string;
  className?: string;
  direction?: 'down' | 'cross-right' | 'pulse';
}

export const FilmConduitConnector: React.FC<FilmConduitConnectorProps> = ({
  label,
  glyph = '✦',
  className = '',
  direction = 'down',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ['0%', '100%']);
  const beamY = useTransform(scrollYProgress, [0, 1], ['-20%', '120%']);
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.2, 0.85, 0.2]);

  return (
    <div ref={ref} className={`relative flex flex-col items-center justify-center py-6 select-none ${className}`}>
      {/* Central Radiant Conduit Line */}
      <div className="relative w-px h-20 sm:h-28 bg-[#D4AF37]/20 overflow-hidden">
        {/* Animated Light Filament */}
        <motion.div
          style={{ height: lineHeight }}
          className="w-full bg-gradient-to-b from-[#D4AF37] via-[#FFF5DC] to-transparent shadow-[0_0_12px_rgba(212,175,55,0.8)]"
        />

        {/* Traveling Laser Beam */}
        <motion.div
          style={{ top: beamY }}
          className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-[#FFF5DC] to-transparent"
        />
      </div>

      {/* Center Cinematic Node Token */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="my-1.5 flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1427]/90 border border-[#D4AF37]/45 text-[#D4AF37] shadow-lg backdrop-blur-md"
      >
        <span className="text-[10px] text-[#D4AF37] animate-pulse">{glyph}</span>
        {label && (
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#C4BBA3]">
            {label}
          </span>
        )}
      </motion.div>

      {/* Lower Extension Line with subtle downward particle beacon */}
      <div className="relative w-px h-10 sm:h-14 bg-gradient-to-b from-[#D4AF37]/50 via-[#D4AF37]/20 to-transparent flex flex-col items-center">
        <motion.div
          animate={{ y: [0, 24, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-1 h-1 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]"
        />
      </div>
    </div>
  );
};
