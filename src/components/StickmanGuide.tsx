import React, { useState } from 'react';
import { Page } from '../types';
import { Sparkles, MessageCircle, X, ChevronRight, Compass, Heart, Award } from 'lucide-react';

interface Props {
  page: Page;
  onNavigate: (page: Page) => void;
}

export const StickmanGuide: React.FC<Props> = ({ page, onNavigate }) => {
  const [animationState, setAnimationState] = useState<'idle' | 'wave' | 'jump' | 'spin'>('idle');
  const [clickCount, setClickCount] = useState(0);

  // Page specific guidance content
  const pageTips: Record<Page, { title: string; text: string; actionText?: string; targetPage?: Page }> = {
    home: {
      title: "Welcome to Aastitva Alliance!",
      text: "I'm your interactive event guide! We turn event proposals into complete reality. Check out our live summit countdown below!",
      actionText: "Meet Our Founder",
      targetPage: "founder",
    },
    founder: {
      title: "Meet The Founder & Philosophy",
      text: "Aastitva translates to existence. Explore our founder's journey, Jammu government school pilgrimage, and interactive reach map!",
      actionText: "Explore Live Summit",
      targetPage: "summit",
    },
    about: {
      title: "Our Institutional Mission",
      text: "Discover how we eliminate operational bottlenecks for schools so secretariats can focus on academic debate.",
      actionText: "See Founder Page",
      targetPage: "founder",
    },
    offerings: {
      title: "Turnkey Event Infrastructure",
      text: "From vetted Executive Boards to venue sourcing, sound tech, and delegate handbooks, we cover it all.",
      actionText: "Get Institutional Quote",
      targetPage: "contact",
    },
    'how-it-works': {
      title: "4-Step Blueprint",
      text: "See how we partner with school management from initial consultation to post-summit reporting.",
      actionText: "View Offerings",
      targetPage: "offerings",
    },
    summit: {
      title: "Aequitas Summit 2026",
      text: "Our inaugural summit is live! View committee lineups, real-time seat tracking, and registration forms.",
      actionText: "Register Institution",
      targetPage: "contact",
    },
    sponsors: {
      title: "Sponsorship & Alliances",
      text: "Support regional youth empowerment in Jammu & Northern India with institutional partner packages.",
      actionText: "Become a Partner",
      targetPage: "contact",
    },
    blog: {
      title: "Academic & MUN Library",
      text: "Access UN Rules of Procedure, chairing handbooks, and delegate preparation guides curated by experts.",
      actionText: "View Summit",
      targetPage: "summit",
    },
    faq: {
      title: "Frequently Asked Questions",
      text: "Got questions about venue logistics, chair recruitment, or pricing transparency? Find instant answers!",
      actionText: "Contact Us",
      targetPage: "contact",
    },
    contact: {
      title: "Institutional Partnership Desk",
      text: "Send us your event proposal or request a personalized covenant briefing directly with our founder.",
      actionText: "Back to Home",
      targetPage: "home",
    },
  };

  const currentTip = pageTips[page] || pageTips.home;

  const handleStickmanClick = () => {
    const states: ('wave' | 'jump' | 'spin')[] = ['wave', 'jump', 'spin'];
    const nextState = states[clickCount % states.length];
    setAnimationState(nextState);
    setClickCount((prev) => prev + 1);

    setTimeout(() => {
      setAnimationState('idle');
    }, 1200);
  };

  return (
    <div className="w-full mb-6 z-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl bg-gradient-to-r from-[#0D1427]/90 via-[#16203B]/80 to-[#0D1427]/90 border border-[#D4AF37]/35 shadow-[0_8px_30px_rgba(0,0,0,0.5)] p-3 sm:p-4 backdrop-blur-md overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute -top-12 -left-12 w-44 h-44 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-[#52459E]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
            {/* Interactive Stickman Character & Speech Bubble */}
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              {/* Animated Interactive SVG Stickman */}
              <button
                onClick={handleStickmanClick}
                className="relative group shrink-0 p-2 rounded-2xl bg-[#070A14] border border-[#D4AF37]/40 shadow-inner hover:scale-105 active:scale-95 transition-transform duration-300 cursor-pointer text-left"
                title="Click me for a trick!"
              >
                {/* Stickman Glow Aura */}
                <div className="absolute inset-0 rounded-2xl bg-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <svg
                  className={`w-12 h-14 text-[#D4AF37] transition-all duration-500 ${
                    animationState === 'jump'
                      ? 'animate-bounce text-[#FFD700]'
                      : animationState === 'spin'
                      ? 'rotate-[360deg] scale-110'
                      : animationState === 'wave'
                      ? 'scale-105'
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

                  {/* Glasses / Eyes */}
                  <circle cx="45" cy="23" r="2.5" fill="#FAF5EF" />
                  <circle cx="55" cy="23" r="2.5" fill="#FAF5EF" />
                  <path d="M47.5 23 H52.5" stroke="#FAF5EF" strokeWidth="2" />
                  <path d="M44 28 Q50 32 56 28" stroke="#D4AF37" strokeWidth="2.5" fill="none" />

                  {/* Body / Torso */}
                  <line x1="50" y1="39" x2="50" y2="80" stroke="#D4AF37" strokeWidth="6" />

                  {/* Left Arm holding glowing torch/beacon */}
                  <line x1="50" y1="48" x2="26" y2="35" stroke="#D4AF37" strokeWidth="5" />
                  <circle cx="24" cy="32" r="5" fill="#D4AF37" className="animate-pulse" />

                  {/* Right Arm (Waving or Pointing) */}
                  {animationState === 'wave' ? (
                    <path d="M50 48 L76 30 L84 20" stroke="#D4AF37" strokeWidth="5" className="animate-pulse" />
                  ) : (
                    <path d="M50 48 L75 55 L82 45" stroke="#D4AF37" strokeWidth="5" />
                  )}

                  {/* Legs */}
                  <line x1="50" y1="80" x2="32" y2="110" stroke="#D4AF37" strokeWidth="6" />
                  <line x1="50" y1="80" x2="68" y2="110" stroke="#D4AF37" strokeWidth="6" />
                </svg>

                {/* Micro Click Indicator */}
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 text-[8px] font-bold rounded-full bg-[#D4AF37] text-[#070A14] uppercase tracking-tighter">
                  {animationState !== 'idle' ? animationState : 'Click!'}
                </span>
              </button>

              {/* Guide Speech Text */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 animate-spin" /> Aastitva Page Navigator
                  </span>
                  <span className="text-[10px] text-[#9E93C4] hidden xs:inline">
                    Interactive Guide
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-serif font-bold text-[#FAF5EF] flex items-center gap-1.5">
                  {currentTip.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-[#C4BBA3] leading-tight line-clamp-2 sm:line-clamp-none">
                  {currentTip.text}
                </p>
              </div>
            </div>

            {/* Guide Action Button & Close Toggle */}
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0 w-full sm:w-auto justify-end pt-1 sm:pt-0 border-t sm:border-t-0 border-[#243563]/40">
              {currentTip.actionText && currentTip.targetPage && (
                <button
                  onClick={() => onNavigate(currentTip.targetPage!)}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-[#070A14] font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-1.5"
                >
                  <span>{currentTip.actionText}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={handleStickmanClick}
                className="px-2.5 py-1.5 rounded-xl bg-[#16203B] hover:bg-[#243563] text-[#D4AF37] text-xs font-semibold border border-[#D4AF37]/30 transition-colors inline-flex items-center gap-1"
                title="Trigger Stickman Animation"
              >
                <Compass className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Animate</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
