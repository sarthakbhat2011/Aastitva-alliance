import React from 'react';
import { Sparkles, ShieldCheck, Compass, Target } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface Props {
  onOpenRegister?: () => void;
}

export const AastitvaEmblemHologram: React.FC<Props> = ({ onOpenRegister }) => {
  return (
    <div
      onMouseEnter={() => sounds.playHover()}
      onClick={() => {
        sounds.playChime();
        onOpenRegister && onOpenRegister();
      }}
      className="relative w-full h-72 sm:h-96 rounded-3xl bg-gradient-to-b from-[#0D1427]/90 via-[#070A14] to-[#0D1427]/90 border-2 border-[#D4AF37]/50 p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-2xl overflow-hidden group cursor-pointer animate-levitate-zerog"
    >
      {/* Background Rotating Geometric Seal */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
        <div className="w-64 h-64 border border-[#D4AF37] rounded-full animate-rotate-gentle" />
        <div className="w-48 h-48 border border-dashed border-[#D4AF37] rounded-full animate-spin-slow" />
      </div>

      {/* Central Holographic Emblem Core */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#D4AF37] via-[#FFF5DC] to-[#B89220] p-0.5 shadow-[0_0_40px_rgba(212,175,55,0.6)] group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
        <div className="w-full h-full rounded-[22px] bg-[#070A14] flex flex-col items-center justify-center text-[#D4AF37] space-y-1">
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#D4AF37] animate-pulse" />
        </div>
      </div>

      <div className="space-y-1 z-10 font-jakarta">
        <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-widest block">
          Aastitva Alliance Sovereign Seal
        </span>
        <h4 className="text-xl sm:text-2xl font-cormorant font-bold text-[#FAF5EF]">
          Collapsing The Distance
        </h4>
        <p className="text-xs text-[#C4BBA3] max-w-xs mx-auto">
          "Giving events the infrastructure to become fully what they were always meant to be."
        </p>
      </div>

      <span className="px-3.5 py-1.5 rounded-full bg-[#16203B] text-[#D4AF37] text-[11px] font-mono border border-[#D4AF37]/40 shadow-md group-hover:bg-[#D4AF37] group-hover:text-[#070A14] transition-colors">
        ✦ Click to Open Registration Gate
      </span>
    </div>
  );
};
