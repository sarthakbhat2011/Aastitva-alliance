import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { Sparkles, Compass, ChevronRight, X, Heart, Shield, Zap, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  page: Page;
  onNavigate: (page: Page) => void;
}

type StickmanPose = 'sneak_right' | 'sneak_left' | 'wave' | 'flip' | 'peekaboo' | 'float';

export const StickmanGuide: React.FC<Props> = ({ page, onNavigate }) => {
  const [pose, setPose] = useState<StickmanPose>('sneak_right');
  const [speechOpen, setSpeechOpen] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [dialogue, setDialogue] = useState<string>('');

  // Page-specific contextual commentary
  const pageTips: Record<Page, { title: string; text: string; actionText?: string; targetPage?: Page }> = {
    home: {
      title: "Hey! I live in your screen 👋",
      text: "I'm Aastitva's living screen companion! Scroll around—I'll sneak and play along as you explore our live summit!",
      actionText: "Meet Our Founder",
      targetPage: "founder",
    },
    founder: {
      title: "The Philosophy & Jammu Map 🗺️",
      text: "Check out our founder's school pilgrimage across Jammu's districts! Click any location node on the map!",
      actionText: "Explore Live Summit",
      targetPage: "summit",
    },
    about: {
      title: "Our Institutional Conscience 🏛️",
      text: "We eliminate logistical chaos so teachers and debaters can focus on debate excellence.",
      actionText: "See Founder Page",
      targetPage: "founder",
    },
    offerings: {
      title: "Turnkey Modules ⚡",
      text: "Vetted Executive Boards, sound tech, certificates, trophies—all handled seamlessly!",
      actionText: "Get Institutional Quote",
      targetPage: "contact",
    },
    'how-it-works': {
      title: "7-Step Roadmap 🚀",
      text: "From initial proposal to post-summit dossier—see how we partner with school secretariats.",
      actionText: "View Offerings",
      targetPage: "offerings",
    },
    summit: {
      title: "Aequitas Summit Live! 🔥",
      text: "Live countdown active! View committee lineups, portfolio allocations, or register delegates.",
      actionText: "Register Institution",
      targetPage: "contact",
    },
    sponsors: {
      title: "Sponsorship Alliances 🤝",
      text: "Empower youth leadership and regional academic debate across Jammu & Kashmir.",
      actionText: "Become a Partner",
      targetPage: "contact",
    },
    blog: {
      title: "Delegate & Chair Library 📚",
      text: "Access UN Rules of Procedure, study guides, and debate strategies curated by experts.",
      actionText: "View Summit",
      targetPage: "summit",
    },
    faq: {
      title: "Instant Answers 💡",
      text: "Got questions about venue logistics, chair recruitment, or pricing transparency?",
      actionText: "Contact Us",
      targetPage: "contact",
    },
    contact: {
      title: "Institutional Desk ✉️",
      text: "Send us your event proposal or request a personalized covenant briefing with our founder.",
      actionText: "Back to Home",
      targetPage: "home",
    },
  };

  const currentTip = pageTips[page] || pageTips.home;

  // Random spontaneous stickman banter quotes
  const randomBanter = [
    "Wheee! Loving this sleek interface! ✨",
    "Did you check out the Jammu school pilgrimage map? 📍",
    "Aequitas Summit 2026 is gonna be legendary! 🔥",
    "Click me to see a backflip! 🤸‍♂️",
    "I'm keeping watch over your screen! 👁️",
    "No hidden costs, just honest conversations! 🤝",
  ];

  // Automatic Movement Engine: Automatically switches posture & position every 6 seconds
  useEffect(() => {
    const poses: StickmanPose[] = ['sneak_right', 'wave', 'flip', 'sneak_left', 'peekaboo', 'float'];
    
    const interval = setInterval(() => {
      const nextPose = poses[Math.floor(Math.random() * poses.length)];
      setPose(nextPose);

      // Randomly change banter quote occasionally
      if (Math.random() > 0.5) {
        const quote = randomBanter[Math.floor(Math.random() * randomBanter.length)];
        setDialogue(quote);
      } else {
        setDialogue('');
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // User click trigger: Interactive reaction + confetti + pose flip
  const handleStickmanClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPose('flip');
    setSpeechOpen(true);
    setDialogue("Whoa! You caught me! Here's some gold sparkles! ✨");

    // Launch gold sparkles confetti
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.85, x: 0.88 },
      colors: ['#D4AF37', '#FAF5EF', '#E8A53E'],
    });

    setTimeout(() => {
      setPose('wave');
    }, 1200);
  };

  // If minimized, render a subtle floating stickman badge in bottom corner
  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-4 right-4 z-50 p-2.5 rounded-full bg-[#0D1427]/95 border-2 border-[#D4AF37] text-[#D4AF37] shadow-[0_8px_25px_rgba(212,175,55,0.4)] hover:scale-110 active:scale-95 transition-transform flex items-center gap-1.5 backdrop-blur-md"
        title="Summon Screen Resident Stickman"
      >
        <span className="w-3 h-3 rounded-full bg-[#D4AF37] animate-ping" />
        <span className="text-xs font-serif font-bold">Stickman Guide</span>
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 transition-all duration-700 ease-in-out pointer-events-auto ${
        pose === 'sneak_left'
          ? 'bottom-4 left-4 sm:left-8'
          : pose === 'float'
          ? 'bottom-20 right-4 sm:right-10'
          : 'bottom-4 right-4 sm:right-8'
      }`}
    >
      <div className="relative flex flex-col items-end group">
        {/* Floating Speech Bubble */}
        {speechOpen && (
          <div className="mb-2 max-w-xs sm:max-w-sm rounded-2xl bg-[#0D1427]/95 border border-[#D4AF37]/50 p-3 sm:p-4 shadow-[0_12px_35px_rgba(0,0,0,0.85)] backdrop-blur-md space-y-2 animate-page-enter text-left relative">
            {/* Close / Minimize Controls */}
            <div className="flex items-center justify-between gap-2 border-b border-[#243563]/40 pb-1.5">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3 animate-spin" /> Screen Resident Guide
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMinimized(true)}
                  className="p-1 rounded text-[#C4BBA3] hover:text-[#D4AF37] text-[10px]"
                  title="Park Companion"
                >
                  Park
                </button>
                <button
                  onClick={() => setSpeechOpen(false)}
                  className="p-1 rounded text-[#C4BBA3] hover:text-[#FAF5EF]"
                  title="Close Bubble"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h5 className="text-xs sm:text-sm font-serif font-bold text-[#FAF5EF]">
              {currentTip.title}
            </h5>
            <p className="text-[11px] sm:text-xs text-[#C4BBA3] leading-relaxed">
              {dialogue || currentTip.text}
            </p>

            {currentTip.actionText && currentTip.targetPage && (
              <button
                onClick={() => onNavigate(currentTip.targetPage!)}
                className="mt-1 w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-[#070A14] font-bold text-xs shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-1"
              >
                <span>{currentTip.actionText}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Pointer Arrow */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-[#0D1427] border-b border-r border-[#D4AF37]/50 rotate-45" />
          </div>
        )}

        {/* Living Un-Restrained SVG Stickman Entity */}
        <button
          onClick={handleStickmanClick}
          className={`relative p-2 rounded-2xl bg-[#070A14]/90 border border-[#D4AF37]/60 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-110 active:scale-95 transition-all duration-500 cursor-pointer ${
            pose === 'peekaboo' ? 'translate-y-6 opacity-80' : 'translate-y-0 opacity-100'
          }`}
          title="Living Screen Stickman • Click me!"
        >
          {/* Subtle Stickman Aura Glow */}
          <div className="absolute inset-0 rounded-2xl bg-[#D4AF37]/15 animate-pulse-glow pointer-events-none" />

          <svg
            className={`w-12 h-14 text-[#D4AF37] transition-transform duration-500 ${
              pose === 'flip'
                ? 'rotate-[360deg] scale-125 text-[#FFD700]'
                : pose === 'wave'
                ? 'scale-105'
                : pose === 'float'
                ? '-translate-y-2'
                : ''
            }`}
            viewBox="0 0 100 120"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Head */}
            <circle cx="50" cy="25" r="14" fill="#16203B" stroke="#D4AF37" strokeWidth="6" />

            {/* Animated Eyes / Glasses */}
            <circle cx="44" cy="23" r="2.5" fill="#FAF5EF" />
            <circle cx="56" cy="23" r="2.5" fill="#FAF5EF" />
            <path d="M46.5 23 H53.5" stroke="#FAF5EF" strokeWidth="2" />
            <path d="M44 28 Q50 32 56 28" stroke="#D4AF37" strokeWidth="2.5" fill="none" />

            {/* Torso */}
            <line x1="50" y1="39" x2="50" y2="80" stroke="#D4AF37" strokeWidth="6" />

            {/* Left Arm holding glowing beacon lamp */}
            <line x1="50" y1="48" x2="24" y2="34" stroke="#D4AF37" strokeWidth="5" />
            <circle cx="22" cy="31" r="5" fill="#D4AF37" className="animate-ping" />

            {/* Right Arm Dynamic Poses */}
            {pose === 'wave' || pose === 'flip' ? (
              <path d="M50 48 L76 28 L86 18" stroke="#D4AF37" strokeWidth="5" className="animate-pulse" />
            ) : pose === 'sneak_left' ? (
              <path d="M50 48 L78 40 L85 50" stroke="#D4AF37" strokeWidth="5" />
            ) : (
              <path d="M50 48 L75 55 L82 45" stroke="#D4AF37" strokeWidth="5" />
            )}

            {/* Legs Dynamic Posture */}
            {pose === 'sneak_left' || pose === 'sneak_right' ? (
              <>
                <line x1="50" y1="80" x2="28" y2="110" stroke="#D4AF37" strokeWidth="6" />
                <line x1="50" y1="80" x2="72" y2="110" stroke="#D4AF37" strokeWidth="6" />
              </>
            ) : (
              <>
                <line x1="50" y1="80" x2="34" y2="110" stroke="#D4AF37" strokeWidth="6" />
                <line x1="50" y1="80" x2="66" y2="110" stroke="#D4AF37" strokeWidth="6" />
              </>
            )}
          </svg>

          {/* Micro Status Badge */}
          <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 text-[8px] font-extrabold rounded-full bg-[#D4AF37] text-[#070A14] uppercase tracking-tighter shadow-sm">
            {pose === 'flip' ? 'Flip!' : 'Resident'}
          </span>
        </button>
      </div>
    </div>
  );
};
