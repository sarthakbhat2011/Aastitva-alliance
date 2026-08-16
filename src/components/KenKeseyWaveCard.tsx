import React from 'react';
import { Quote, Sparkles, Waves } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const KenKeseyWaveCard: React.FC = () => {
  return (
    <div
      onMouseEnter={() => sounds.playHover()}
      className="relative rounded-3xl bg-gradient-to-br from-[#16203B] via-[#0D1427] to-[#070A14] border-2 border-[#D4AF37]/50 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] font-jakarta text-left space-y-4 overflow-hidden animate-wave-roll group cursor-default"
    >
      {/* Background Animated SVG Waves */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#D4AF37"
            fillOpacity="1"
            d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,149,864,165.3C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="p-2.5 rounded-2xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 w-fit">
          <Quote className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest px-3 py-1 rounded-full bg-[#070A14] border border-[#D4AF37]/30 flex items-center gap-1.5">
          <Waves className="w-3.5 h-3.5 animate-pulse" />
          <span>The Waves of Existence</span>
        </span>
      </div>

      <blockquote className="text-sm sm:text-lg lg:text-xl font-cormorant italic text-[#FAF5EF] leading-relaxed relative z-10">
        "It isn't by getting out of the world that we become enlightened, but by getting into the world...by getting so tuned in that we can ride the waves of our existence and never get tossed because we become the waves."
      </blockquote>

      <div className="flex items-center justify-between border-t border-[#D4AF37]/20 pt-3 text-xs font-jakarta relative z-10">
        <span className="text-[#D4AF37] font-semibold">
          — Ken Kesey, <em>Kesey's Garage Sale</em>
        </span>
        <span className="text-[11px] text-[#C4BBA3] hidden sm:inline">
          Foundational Philosophical Epigraph
        </span>
      </div>

      <p className="text-xs sm:text-sm text-[#DDD6FE] leading-relaxed pt-2 border-t border-[#D4AF37]/15">
        We exist to collapse that distance, to give events and the people behind them the infrastructure to become fully what they were always meant to be.
      </p>
    </div>
  );
};
