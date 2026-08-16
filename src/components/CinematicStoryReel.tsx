import React, { useState } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Play, Film, Award, Shield, Target, Compass, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const CinematicStoryReel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const scenes = [
    {
      id: 1,
      act: 'ACT I • THE PHILOSOPHY',
      title: 'Existence vs. The Void',
      quote: '"Aastitva translates to existence, the state of truly being, fully and completely."',
      narration: 'Every event an organiser dreams of already exists somewhere in a proposal, a conversation, a hope. What is missing is everything standing between that idea and its full existence.',
      tag: 'Foundational Truth',
      bgGradient: 'from-amber-950/40 via-[#0D1427] to-[#070A14]',
      borderAccent: 'border-[#D4AF37]',
      icon: Target,
    },
    {
      id: 2,
      act: 'ACT II • THE WAVE RIDER',
      title: 'Ken Kesey Epigraph',
      quote: '"...by getting so tuned in that we can ride the waves of our existence and never get tossed because we become the waves."',
      narration: 'We exist to collapse that distance, to give events and the people behind them the infrastructure to become fully what they were always meant to be.',
      tag: 'Kesey’s Garage Sale',
      bgGradient: 'from-blue-950/40 via-[#0D1427] to-[#070A14]',
      borderAccent: 'border-blue-400',
      icon: Compass,
    },
    {
      id: 3,
      act: 'ACT III • THE CORRIDORS',
      title: 'Corridors of Debate',
      quote: '"Organisers, brimming with ambition, were often reduced to juggling logistics, sacrificing the creative soul of their event."',
      narration: 'Ideas were being built, but rarely allowed to fully exist. Ideas were abundant. Existence was rare. Aastitva Alliance was born to fill that void.',
      tag: 'Origin of Aastitva',
      bgGradient: 'from-rose-950/40 via-[#0D1427] to-[#070A14]',
      borderAccent: 'border-rose-400',
      icon: Sparkles,
    },
    {
      id: 4,
      act: 'ACT IV • THE CONSCIENCE',
      title: 'Grassroots Jammu Outreach',
      quote: '"Existence isn’t a privilege reserved for the schools that can already afford it. It should be something every student gets a chance at."',
      narration: 'Personally visiting government schools across Jammu to understand where the real gaps were. Not just for well-resourced institutions, but those least likely to see the inside of a hall.',
      tag: 'Jammu District Tour',
      bgGradient: 'from-emerald-950/40 via-[#0D1427] to-[#070A14]',
      borderAccent: 'border-emerald-400',
      icon: Shield,
    },
    {
      id: 5,
      act: 'ACT V • THE COVENANT',
      title: 'Radical Transparency',
      quote: '"This is a promise: no hidden costs, no vague promises, just honest conversations from day one."',
      narration: 'Our new & visionary approach operates without bureaucracy, middlemen opacity, or corporate apathy. A founder offering self as a personal covenant.',
      tag: 'Founder’s Covenant',
      bgGradient: 'from-purple-950/40 via-[#0D1427] to-[#070A14]',
      borderAccent: 'border-purple-400',
      icon: Award,
    },
  ];

  const handleNext = () => {
    sounds.playTap();
    setCurrentSlide((prev) => (prev + 1) % scenes.length);
  };

  const handlePrev = () => {
    sounds.playTap();
    setCurrentSlide((prev) => (prev - 1 + scenes.length) % scenes.length);
  };

  const current = scenes[currentSlide];
  const IconComp = current.icon;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden font-jakarta text-left p-6 sm:p-12 bg-gradient-to-br from-[#070A14] via-[#0D1427] to-[#050811] border-2 border-[#D4AF37]/50 shadow-[0_25px_90px_rgba(0,0,0,0.95)]">
      {/* Widescreen Movie Letterbox HUD Top Bar */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#D4AF37]/20 flex-wrap">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-[#D4AF37] animate-pulse" />
          <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
            Aastitva Cinematic Chronicle • Scene 0{currentSlide + 1} / 0{scenes.length}
          </span>
        </div>

        {/* Scene Dots */}
        <div className="flex items-center gap-1.5">
          {scenes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                sounds.playTap();
                setCurrentSlide(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? 'w-8 bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]'
                  : 'w-2 bg-[#16203B] hover:bg-[#D4AF37]/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Dynamic 3D Cinematic Flashcard Stage */}
      <div className="py-8 sm:py-12 relative min-h-[320px] flex items-center">
        <div
          key={current.id}
          className={`w-full p-6 sm:p-10 rounded-3xl bg-gradient-to-br ${current.bgGradient} border-2 ${current.borderAccent} shadow-2xl backdrop-blur-2xl space-y-5 animate-cinematic-3d-flip relative overflow-hidden`}
        >
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <span className="px-3.5 py-1 rounded-full bg-[#070A14]/80 text-[#D4AF37] text-xs font-mono font-bold uppercase tracking-wider border border-[#D4AF37]/30 shadow-inner">
              {current.act}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#16203B]/80 text-[#FAF5EF] text-[10px] font-mono border border-[#D4AF37]/20">
              {current.tag}
            </span>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl sm:text-4xl font-cormorant font-bold text-[#FAF5EF]">
              {current.title}
            </h3>

            <p className="text-base sm:text-xl font-cormorant italic text-[#D4AF37] leading-relaxed">
              {current.quote}
            </p>

            <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed pt-1">
              {current.narration}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Controls (Dolly Trackers) */}
      <div className="flex items-center justify-between gap-4 pt-2 border-t border-[#D4AF37]/20">
        <button
          onClick={handlePrev}
          onMouseEnter={() => sounds.playHover()}
          className="px-4 py-2.5 rounded-xl bg-[#16203B] text-[#FAF5EF] hover:text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-mono font-bold flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Scene</span>
        </button>

        <span className="text-[11px] font-mono text-[#C4BBA3] hidden sm:inline">
          Use arrows to step through the chronological story
        </span>

        <button
          onClick={handleNext}
          onMouseEnter={() => sounds.playHover()}
          className="px-5 py-2.5 rounded-xl shimmer-btn text-[#070A14] font-bold text-xs shadow-lg flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all"
        >
          <span>Next Scene</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
