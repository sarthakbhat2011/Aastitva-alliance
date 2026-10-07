import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, X, ArrowRight, Layers, ExternalLink } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { Page } from '../types';

interface Props {
  onNavigate: (page: Page) => void;
}

export const BlogCornerWidget: React.FC<Props> = ({ onNavigate }) => {
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);

  // Auto show with smooth entrance after a slight delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 right-4 sm:right-6 z-40 select-none font-sans">
      <AnimatePresence mode="wait">
        {minimized ? (
          <motion.button
            key="minimized-blogs-pill"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              sounds.playTap();
              setMinimized(false);
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0B1224]/95 border-2 border-[#D4AF37]/60 text-[#D4AF37] shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.3)] backdrop-blur-xl cursor-pointer"
            title="Open Blogs Section"
          >
            <BookOpen className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-white">
              Blogs Section
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </motion.button>
        ) : (
          <motion.div
            key="expanded-blogs-card"
            initial={{ opacity: 0, y: 25, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="w-72 sm:w-80 rounded-2xl bg-gradient-to-b from-[#16203B]/98 via-[#0D1427]/98 to-[#070A14]/98 border-2 border-[#D4AF37]/60 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(212,175,55,0.25)] backdrop-blur-2xl p-4 text-left overflow-hidden relative group"
          >
            {/* Ambient Cosmic Core Halo */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#D4AF37]/20 rounded-full blur-2xl pointer-events-none group-hover:bg-[#D4AF37]/35 transition-all" />

            {/* Header row */}
            <div className="flex items-center justify-between gap-2 border-b border-[#D4AF37]/20 pb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="p-1 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
                  <BookOpen className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37]">
                  AASTITVA ARCHIVES
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sounds.playTap();
                    setMinimized(true);
                  }}
                  className="p-1 rounded-md text-[#C4BBA3] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Minimize"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div
              onClick={() => {
                sounds.playTap();
                onNavigate('blogs');
              }}
              className="pt-3 space-y-2.5 cursor-pointer"
            >
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[9px] font-mono text-[#D4AF37] font-semibold">
                <Sparkles className="w-2.5 h-2.5" />
                <span>4 NEW DISPATCHES POSTED</span>
              </div>

              <h4 className="text-base font-playfair font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                BLOGS SECTION
              </h4>

              <p className="text-[11px] text-[#C4BBA3] leading-relaxed line-clamp-2">
                In-depth analytical essays on media literacy, CV strategy, Indian MUN ecosystems, and skills for the future.
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playTap();
                  onNavigate('blogs');
                }}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#EAE0C8] via-[#E8A53E] to-[#D4AF37] text-[#050811] font-bold text-xs shadow-md hover:brightness-110 active:scale-98 transition-all flex items-center justify-between cursor-pointer mt-1"
              >
                <span>Read Articles Line-by-Line</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
