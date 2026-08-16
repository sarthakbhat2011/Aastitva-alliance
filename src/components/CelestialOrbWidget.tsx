import React, { useState } from 'react';
import { Sparkles, Terminal, X, Zap, Cpu, Play } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { MagneticElement } from './motion/MagneticElement';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  onOpenRegister: () => void;
  onOpenOS?: () => void;
}

export const CelestialOrbWidget: React.FC<Props> = ({ onOpenRegister, onOpenOS }) => {
  const [minimized, setMinimized] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (minimized) {
    return (
      <MagneticElement strength={0.4} className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => {
            sounds.playTap();
            setMinimized(false);
          }}
          className="p-3.5 rounded-full bg-[#0D1427]/95 border-2 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-110 active:scale-95 transition-all group backdrop-blur-xl cursor-pointer"
          title="Open Aastitva OS Quick Portal"
        >
          <Zap className="w-5 h-5 text-[#D4AF37] animate-pulse" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
        </button>
      </MagneticElement>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2 font-jakarta select-none"
    >
      {/* Interactive Futuristic XP Tooltip Card */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className={`px-4 py-3 rounded-2xl bg-[#0D1427]/95 border-2 border-[#D4AF37]/60 text-left shadow-[0_15px_40px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-300 ${
            hovered ? 'opacity-100 -translate-y-1 scale-102' : 'opacity-90'
          }`}
        >
          <div className="flex items-center justify-between gap-3 pb-1.5 border-b border-[#D4AF37]/25">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#D4AF37]">
              <Cpu className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span>Aastitva OS Quick-Hub</span>
            </div>
            <button
              onClick={() => {
                sounds.playTap();
                setMinimized(true);
              }}
              className="p-1 rounded text-[#C4BBA3] hover:text-rose-400 cursor-pointer"
              title="Minimize Quick-Hub"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-[#C4BBA3] mt-1.5 leading-snug max-w-[210px]">
            Quick launcher for <strong>Aequitas 2026</strong> summit gate and futuristic OS desktop.
          </p>

          <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-[#D4AF37]/20">
            <MagneticElement strength={0.3}>
              <button
                onClick={() => {
                  sounds.playChime();
                  onOpenRegister();
                }}
                className="px-3 py-1 rounded-xl shimmer-btn text-[#070A14] text-[10px] font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Register ✦
              </button>
            </MagneticElement>
            {onOpenOS && (
              <MagneticElement strength={0.3}>
                <button
                  onClick={() => {
                    sounds.playTap();
                    onOpenOS();
                  }}
                  className="px-2.5 py-1 rounded-xl bg-[#16203B] text-[#D4AF37] border border-[#D4AF37]/35 text-[10px] font-mono font-bold hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#070A14] transition-all cursor-pointer"
                >
                  OS Desktop
                </button>
              </MagneticElement>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Holographic Glowing XP Core Badge (Interactive Click Target) */}
      <MagneticElement strength={0.35}>
        <button
          onClick={() => {
            sounds.playChime();
            onOpenRegister();
          }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#16203B] via-[#0D1427] to-[#070A14] border-2 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:shadow-[0_0_40px_rgba(212,175,55,0.8)] hover:scale-110 active:scale-95 transition-all cursor-pointer relative overflow-hidden backdrop-blur-xl flex items-center justify-center group"
        >
          <Sparkles className="w-6 h-6 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        </button>
      </MagneticElement>
    </div>
  );
};
