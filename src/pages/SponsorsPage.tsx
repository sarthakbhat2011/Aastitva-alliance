import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from '../types';
import { sounds } from '../utils/soundEffects';
import { VioletNebulaCanvas } from '../components/VioletNebulaCanvas';
import { Astitva3DCanvas } from '../components/Astitva3DCanvas';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Instagram,
  Copy,
  Check,
  Building,
  Users,
  Calendar,
  Layers,
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Download,
  ExternalLink,
  Volume2,
  VolumeX,
  SlidersHorizontal,
  LayoutGrid,
  FileText,
  QrCode,
  Globe,
  Share2,
  MapPin,
  Clock,
  Eye,
  Zap,
  Star,
  Activity,
} from 'lucide-react';

interface Props {
  onNavigate?: (page: Page) => void;
  onOpenRegister?: () => void;
  isStandalone?: boolean;
}

// -------------------------------------------------------------
// 3D INTERACTIVE TILT CARD
// -------------------------------------------------------------
const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}> = ({ children, className = '', glowColor = 'rgba(212,175,55,0.25)', onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -7;
    const rY = ((x - centerX) / centerX) * 7;

    setRotateX(rX);
    setRotateY(rY);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.5,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`relative overflow-hidden transition-shadow duration-300 hover:shadow-[0_12px_45px_${glowColor}] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.12), transparent 65%)`,
          opacity: glare.opacity,
        }}
      />
      <div style={{ transform: 'translateZ(18px)' }}>{children}</div>
    </motion.div>
  );
};

// -------------------------------------------------------------
// MULTI-DIRECTIONAL STAGGERED ENTRANCE BOX
// -------------------------------------------------------------
const AnimatedBox: React.FC<{
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'top' | 'bottom' | 'zoom' | 'flip';
  delay?: number;
  className?: string;
}> = ({ children, direction = 'bottom', delay = 0, className = '' }) => {
  const getInitial = () => {
    switch (direction) {
      case 'left':
        return { opacity: 0, x: -70, rotateY: 12 };
      case 'right':
        return { opacity: 0, x: 70, rotateY: -12 };
      case 'top':
        return { opacity: 0, y: -50, rotateX: 12 };
      case 'bottom':
        return { opacity: 0, y: 50, rotateX: -12 };
      case 'zoom':
        return { opacity: 0, scale: 0.85 };
      case 'flip':
        return { opacity: 0, rotateY: 40, scale: 0.9 };
      default:
        return { opacity: 0, y: 40 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SponsorsPage: React.FC<Props> = ({
  onNavigate,
  onOpenRegister,
  isStandalone = false,
}) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [viewMode, setViewMode] = useState<'deck' | 'continuous'>('deck');
  const [soundEnabled, setSoundEnabled] = useState(sounds.isEnabled());
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Interactive Features State
  const [tierFilter, setTierFilter] = useState<'all' | 'title' | 'platinum' | 'gold' | 'silver' | 'bronze'>('all');
  const [activationFilter, setActivationFilter] = useState<'all' | 'floor' | 'digital' | 'vip'>('all');
  const [checkedDeliverables, setCheckedDeliverables] = useState<Set<number>>(new Set([1, 2, 3, 4, 5, 6]));

  const totalSlides = 16;
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Update browser document title
  useEffect(() => {
    document.title = 'Offer Sponsorships | Aequitas Summit 2026 • Official Corporate & Brand Proposal';
  }, []);

  // Ensure scroll is unlocked
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.body.style.touchAction = 'auto';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, []);

  // Scroll to top on slide change in deck view
  useEffect(() => {
    if (viewMode === 'deck') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentSlide, viewMode]);

  // Keyboard arrow listener for deck navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'deck') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, viewMode]);

  const goToNextSlide = () => {
    if (currentSlide < totalSlides) {
      sounds.playTap();
      setDirection('forward');
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 1) {
      sounds.playTap();
      setDirection('backward');
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const jumpToSlide = (slideNum: number) => {
    sounds.playTap();
    setDirection(slideNum > currentSlide ? 'forward' : 'backward');
    setCurrentSlide(slideNum);
    if (viewMode === 'continuous' && slideRefs.current[slideNum - 1]) {
      slideRefs.current[slideNum - 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopy = (text: string, fieldId: string) => {
    sounds.playTap();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2200);
    }
  };

  const handleSoundToggle = () => {
    const updated = sounds.toggleSound();
    setSoundEnabled(updated);
  };

  const toggleDeliverable = (num: number) => {
    sounds.playTap();
    setCheckedDeliverables((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  // Slide Metadata for Continuation Headings
  const SLIDE_TITLES: { [key: number]: string } = {
    1: 'Sponsorship Proposal Cover',
    2: 'A Brand Residency with Next Gen',
    3: 'Why Sponsor Aequitas Summit 2026',
    4: 'Five-Star Venue: Radisson Blu Jammu',
    5: 'Audience Demographics & Reach',
    6: 'Three Reasons Brands Choose Us',
    7: 'Sponsorship Tiers Overview',
    8: 'Bronze Partner Breakdown (₹10,000)',
    9: 'Silver Partner Breakdown (₹20,000)',
    10: 'Gold Partner Breakdown (₹35,000)',
    11: 'Platinum Partner Breakdown (₹40k–50k)',
    12: 'Title Partner Breakdown (₹75k–1L)',
    13: 'Ground Activations Matrix',
    14: 'Post-Summit ROI & Deliverables',
    15: 'Payment & Remittance Terminal',
    16: 'Official Partnership Contacts',
  };

  // Slide Transition Variants for 3D Spatial Flip
  const slideVariants = {
    enter: (dir: 'forward' | 'backward') => ({
      x: dir === 'forward' ? 80 : -80,
      opacity: 0,
      scale: 0.94,
      rotateY: dir === 'forward' ? 12 : -12,
      filter: 'blur(4px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir: 'forward' | 'backward') => ({
      x: dir === 'forward' ? -80 : 80,
      opacity: 0,
      scale: 0.94,
      rotateY: dir === 'forward' ? -12 : 12,
      filter: 'blur(4px)',
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  // Interactive Tier Quick-Jump Dock for Tier Slides (8-12)
  const renderTierQuickDock = (activeSlideNum: number) => {
    const tierSlides = [
      { num: 8, name: 'Bronze', cost: '₹10k', color: '#CD7F32' },
      { num: 9, name: 'Silver', cost: '₹20k', color: '#C0C0C0' },
      { num: 10, name: 'Gold', cost: '₹35k', color: '#D4AF37' },
      { num: 11, name: 'Platinum', cost: '₹40k–50k', color: '#E5E4E2' },
      { num: 12, name: 'Title', cost: '₹75k–1L', color: '#FFD700' },
    ];

    return (
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap pb-2">
        <span className="text-[10px] font-mono uppercase text-[#A39B88] tracking-widest mr-1">
          Tier Switcher:
        </span>
        {tierSlides.map((t) => {
          const isActive = t.num === activeSlideNum;
          return (
            <button
              key={t.name}
              onClick={() => jumpToSlide(t.num)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
                isActive
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8A53E] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105'
                  : 'bg-[#180C34]/80 text-[#C4BBA3] border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:text-white'
              }`}
            >
              <span>{t.name}</span>
              <span className="opacity-75 text-[9px]">({t.cost})</span>
            </button>
          );
        })}
      </div>
    );
  };

  /* -------------------------------------------------------------
     RENDER SLIDE CONTENT (VERBATIM TEXT WITH FULL 3D ANIMATIONS)
  ------------------------------------------------------------- */
  const renderSlideContent = (slideNum: number) => {
    switch (slideNum) {
      /* ---------------------------------------------------------
         SLIDE 1: COVER
      --------------------------------------------------------- */
      case 1:
        return (
          <div className="text-center py-4 sm:py-8 space-y-5 sm:space-y-7 max-w-4xl mx-auto">
            {/* Top Emblems */}
            <AnimatedBox direction="top" delay={0.05}>
              <div className="flex items-center justify-center gap-3">
                <img
                  src="/aequitas-logo.png"
                  alt="Aequitas Crest"
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.45)] bg-black object-cover"
                />
                <span className="text-[#D4AF37] font-playfair text-xl opacity-75">×</span>
                <img
                  src="/astitva-logo.png"
                  alt="Aastitva Alliances"
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-[#D4AF37]/80 shadow-[0_0_25px_rgba(168,85,247,0.45)] bg-[#1e1442] object-cover"
                />
              </div>
            </AnimatedBox>

            {/* Main Proposal Header */}
            <AnimatedBox direction="zoom" delay={0.12}>
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold text-[#FAF5EF] tracking-wider uppercase drop-shadow-md">
                  AEQUITAS SUMMIT 2026
                </h1>
                <div className="inline-block px-4 py-1 rounded-full bg-[#180C34]/80 border border-[#D4AF37]/40 shadow-inner">
                  <p className="font-mono text-xs sm:text-sm text-[#D4AF37] tracking-[0.25em] uppercase font-bold">
                    VERITAS | AEQUITAS | VOX
                  </p>
                </div>
              </div>
            </AnimatedBox>

            {/* Central Badge */}
            <AnimatedBox direction="left" delay={0.18}>
              <div className="py-1">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-extrabold tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5DC] via-[#D4AF37] to-[#FAF5EF]">
                  SPONSORSHIP PROPOSAL
                </h2>
                <p className="text-sm sm:text-lg text-[#C4BBA3] font-mono mt-3 tracking-wide">
                  29–30 October 2026 | Radisson Blu Hotel, Jammu
                </p>
              </div>
            </AnimatedBox>

            {/* Complementary 3D Planetary Core Visual - Seamless with zero rectangular borders */}
            <AnimatedBox direction="zoom" delay={0.24}>
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto my-2 overflow-visible flex items-center justify-center [mask-image:radial-gradient(circle_at_center,black_55%,transparent_98%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_55%,transparent_98%)]">
                <Astitva3DCanvas variant="emblem" className="w-full h-full" />
                <div className="absolute inset-0 rounded-full bg-radial from-[#A855F7]/25 via-[#D4AF37]/15 to-transparent blur-2xl pointer-events-none" />
              </div>
            </AnimatedBox>

            {/* Footer Attribution */}
            <AnimatedBox direction="bottom" delay={0.3}>
              <div className="pt-2 border-t border-[#D4AF37]/25 max-w-sm mx-auto">
                <p className="text-xs sm:text-sm font-mono text-[#D4AF37] tracking-widest uppercase font-semibold">
                  Presented by Aastitva Alliances
                </p>
              </div>
            </AnimatedBox>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 2: VISION & CORE PITCH
      --------------------------------------------------------- */
      case 2:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <AnimatedBox direction="left" delay={0.05}>
              <div className="space-y-3 border-b border-[#D4AF37]/25 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#C084FC] text-xs font-mono font-bold tracking-wider uppercase">
                  <Building className="w-3.5 h-3.5 text-[#C084FC]" />
                  <span>Executive Vision</span>
                </div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FAF5EF] leading-tight">
                  A Brand Residency with <br className="hidden sm:inline" />
                  the Next Generation.
                </h2>
              </div>
            </AnimatedBox>

            <AnimatedBox direction="right" delay={0.15}>
              <TiltCard className="p-5 sm:p-8 rounded-2xl bg-[#0F0824]/90 border border-[#D4AF37]/35 shadow-xl backdrop-blur-md space-y-4">
                <p className="text-base sm:text-xl text-[#FAF5EF] leading-relaxed font-sans font-light">
                  Aequitas Summit 2026 is Jammu's premier Model United Nations summit, hosted at the
                  Radisson Blu Hotel, bringing together 200+ high-intent delegates from across India for
                  two days of debate, strategy, and public engagement.
                </p>
              </TiltCard>
            </AnimatedBox>

            <AnimatedBox direction="bottom" delay={0.25}>
              <TiltCard className="p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-[#D4AF37]/20 via-[#7C3AED]/20 to-[#D4AF37]/20 border border-[#D4AF37]/50 text-center shadow-lg">
                <p className="text-base sm:text-2xl font-serif italic font-semibold text-[#FFF5DC] tracking-wide">
                  "From boards to wearables , your brand is in the delegate's hand, bag, and day."
                </p>
              </TiltCard>
            </AnimatedBox>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 3: WHY SPONSOR
      --------------------------------------------------------- */
      case 3:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <AnimatedBox direction="top" delay={0.05}>
              <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
                  Strategic Return on Investment
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF5EF]">
                  Why sponsor Aequitas Summit 2026
                </h2>
                <p className="text-sm font-serif italic text-[#C084FC]">
                  Way More than any advertitsement
                </p>
              </div>
            </AnimatedBox>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                { title: 'Captive Audience', desc: '14–22 age group, high disposable family income' },
                { title: 'Premium Association', desc: 'Hosted at Radisson Blu, Jammu' },
                { title: 'Tangible Touchpoints', desc: 'Lanyards, kits, backdrops, standees, social channels' },
                { title: 'Zero Clutter', desc: 'Exclusive sponsorship slots — no competing brands in your tier' },
                { title: 'Long-Tail Reach', desc: 'Photo/video content circulated weeks post-event' },
                { title: 'Direct Access', desc: 'Opportunity for product sampling, brochure distribution, announcements' },
                { title: 'CSR & Youth Alignment', desc: 'Support educational excellence & student leadership' },
                { title: 'Custom Activations', desc: 'Stalls, branded awards, committee naming rights' },
              ].map((item, idx) => {
                const direction = idx % 2 === 0 ? 'left' : 'right';
                return (
                  <AnimatedBox key={item.title} direction={direction} delay={0.08 * idx}>
                    <TiltCard className="p-4 sm:p-5 rounded-2xl bg-[#0F0824]/85 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all group flex items-start gap-3.5 h-full">
                      <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 font-mono text-xs font-bold group-hover:scale-110 transition-transform">
                        {(idx + 1).toString().padStart(2, '0')}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm sm:text-base font-serif font-bold text-[#FAF5EF] group-hover:text-[#D4AF37] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#C4BBA3] leading-relaxed">{item.desc}</p>
                      </div>
                    </TiltCard>
                  </AnimatedBox>
                );
              })}
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 4: THE VENUE
      --------------------------------------------------------- */
      case 4:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <AnimatedBox direction="top" delay={0.05}>
              <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
                  Five-Star Event Architecture
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF5EF]">
                  Radisson Blu Hotel, Jammu
                </h2>
                <p className="text-xs sm:text-sm text-[#C4BBA3] font-mono">
                  Radisson Blu Hotel, Jammu — Jammu & Kashmir's landmark hospitality address.
                </p>
              </div>
            </AnimatedBox>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Grand Ballroom & Committee Halls', desc: 'Fully air-conditioned luxury spaces with premium seating for 200+ delegates.', dir: 'left' },
                { title: 'Delegate Lounge & Dining', desc: 'Five-star catering, networking zones, dedicated executive dining areas.', dir: 'right' },
                { title: 'Audiovisual & Tech Infrastructure', desc: 'Integrated acoustics, projector systems, broadcast-grade lighting setup.', dir: 'bottom' },
                { title: 'Security & Protocol', desc: 'Complete CCTV surveillance, verified security detail, secure parking.', dir: 'top' },
              ].map((item, idx) => (
                <AnimatedBox key={item.title} direction={item.dir as any} delay={0.1 * idx}>
                  <TiltCard className="p-5 sm:p-6 rounded-2xl bg-[#0F0824]/90 border border-[#D4AF37]/35 hover:border-[#D4AF37] transition-all space-y-2 h-full">
                    <div className="flex items-center gap-2 text-[#D4AF37]">
                      <Sparkles className="w-4 h-4" />
                      <h4 className="text-sm sm:text-base font-serif font-bold text-[#FAF5EF]">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#C4BBA3] leading-relaxed">{item.desc}</p>
                  </TiltCard>
                </AnimatedBox>
              ))}
            </div>

            <AnimatedBox direction="zoom" delay={0.4}>
              <TiltCard className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#180C34] via-[#0F0824] to-[#180C34] border border-[#D4AF37]/50 text-center shadow-lg">
                <p className="text-xs sm:text-sm text-[#D4AF37] font-mono uppercase tracking-wider font-bold">
                  ✦ Five-Star Association Guarantee ✦
                </p>
                <p className="text-xs sm:text-sm text-[#FAF5EF] mt-1.5 font-light">
                  "Sponsoring Aequitas places your brand alongside five-star luxury standards, ensuring
                  maximum aspirational credibility."
                </p>
              </TiltCard>
            </AnimatedBox>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 5: AUDIENCE PROFILE
      --------------------------------------------------------- */
      case 5:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <AnimatedBox direction="top" delay={0.05}>
              <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
                  Audience Intelligence
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF5EF]">
                  Who you are reaching
                </h2>
              </div>
            </AnimatedBox>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'Age Group', value: '14–22 years', desc: 'School & university students across classes 9–12 and undergraduate programs', dir: 'left' },
                { label: 'Institutions', value: 'Elite Schools & Colleges', desc: 'Jammu, Delhi NCR, Punjab, HP, Chandigarh, and leading Northern universities', dir: 'top' },
                { label: 'Geography', value: 'Jammu & Northern India', desc: '70% J&K residents; 30% travelling delegates from metropolitan hubs', dir: 'right' },
                { label: 'Profile', value: 'Future Leaders & Achievers', desc: 'High achievers, debaters, future civil servants, entrepreneurs, lawyers', dir: 'left' },
                { label: 'Spending Power', value: 'Upper-Middle & Affluent', desc: 'Delegates self-fund ₹2,000+ delegate fees; high family disposable income', dir: 'bottom' },
                { label: 'Digital Footprint', value: 'Active Gen-Z Audience', desc: 'Heavy Instagram & LinkedIn users; high propensity to share summit content', dir: 'right' },
              ].map((item, idx) => (
                <AnimatedBox key={item.label} direction={item.dir as any} delay={0.07 * idx}>
                  <TiltCard className="p-5 rounded-2xl bg-[#0F0824]/90 border border-[#D4AF37]/35 hover:border-[#D4AF37] transition-all space-y-2 h-full">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
                      {item.label}
                    </span>
                    <h4 className="text-base sm:text-lg font-serif font-bold text-[#FAF5EF]">
                      {item.value}
                    </h4>
                    <p className="text-xs text-[#C4BBA3] leading-relaxed">{item.desc}</p>
                  </TiltCard>
                </AnimatedBox>
              ))}
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 6: THREE REASONS
      --------------------------------------------------------- */
      case 6:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <AnimatedBox direction="top" delay={0.05}>
              <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
                  Corporate Alignment
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF5EF]">
                  Three reasons brands choose us
                </h2>
              </div>
            </AnimatedBox>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  num: '01',
                  title: 'Venue credibility',
                  points: [
                    'Radisson Blu is synonymous with five-star luxury.',
                    'Associating with Aequitas automatically confers prestige and aspirational value on your brand.',
                  ],
                  dir: 'left',
                },
                {
                  num: '02',
                  title: 'Trackable engagement',
                  points: [
                    'Not just passive impressions.',
                    'QR codes on kits, direct sampling at registration, active social tags, and measurable footfall at stalls.',
                  ],
                  dir: 'bottom',
                },
                {
                  num: '03',
                  title: 'Two full days of presence',
                  points: [
                    'Delegates spend 16+ hours inside the venue over two days.',
                    'Continuous, repeated exposure beats single-touchpoint advertising every time.',
                  ],
                  dir: 'right',
                },
              ].map((item, idx) => (
                <AnimatedBox key={item.title} direction={item.dir as any} delay={0.12 * idx}>
                  <TiltCard className="p-6 rounded-2xl bg-[#0F0824]/90 border border-[#D4AF37]/35 hover:border-[#D4AF37] transition-all space-y-4 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8C6D1F] text-black font-mono font-bold flex items-center justify-center text-sm shadow-md">
                        {item.num}
                      </div>
                      <h4 className="text-lg font-serif font-bold text-[#FAF5EF]">
                        {item.title}
                      </h4>
                      <ul className="space-y-2">
                        {item.points.map((pt, pIdx) => (
                          <li key={pIdx} className="text-xs text-[#C4BBA3] leading-relaxed flex items-start gap-2">
                            <span className="text-[#D4AF37] text-sm mt-0.5">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TiltCard>
                </AnimatedBox>
              ))}
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 7: SPONSORSHIP TIERS OVERVIEW
      --------------------------------------------------------- */
      case 7:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-5xl mx-auto text-left">
            <AnimatedBox direction="top" delay={0.05}>
              <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
                  Corporate Partnership Matrix
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF5EF]">
                  Sponsorship Tiers
                </h2>
                <p className="text-xs sm:text-sm text-[#C4BBA3]">
                  Interactive Matrix: Select any tier to highlight benefits or jump to its deep-dive breakdown.
                </p>
              </div>
            </AnimatedBox>

            {/* Interactive Tier Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap pb-1">
              {['all', 'title', 'platinum', 'gold', 'silver', 'bronze'].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    sounds.playTap();
                    setTierFilter(t as any);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-mono uppercase font-bold transition-all cursor-pointer ${
                    tierFilter === t
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8A53E] text-black shadow-md scale-105'
                      : 'bg-[#180C34]/80 text-[#C4BBA3] border border-[#D4AF37]/30 hover:text-white'
                  }`}
                >
                  {t === 'all' ? 'View All (5 Tiers)' : `${t} Tier`}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Bronze', cost: '₹10,000', slots: 'Open', best: 'Firms wanting visibility at accessible cost', slideNum: 8, key: 'bronze', dir: 'left' },
                { name: 'Silver', cost: '₹20,000', slots: '3 slots', best: 'Firms wanting brand placement on essentials', slideNum: 9, key: 'silver', dir: 'bottom' },
                { name: 'Gold', cost: '₹35,000', slots: '2 slots', best: 'Brands seeking physical presence & verbal credit', slideNum: 10, key: 'gold', dir: 'top' },
                { name: 'Platinum', cost: '₹40,000–₹50,000', slots: '2 slots', best: 'Brands wanting exclusive category ownership', slideNum: 11, key: 'platinum', dir: 'right' },
                { name: 'Title Partner', cost: '₹75,000–₹1,00,000', slots: '1 slot only', best: 'The summit headline brand', slideNum: 12, key: 'title', dir: 'zoom' },
              ].map((tier, idx) => {
                const isSelected = tierFilter === 'all' || tierFilter === tier.key;
                return (
                  <AnimatedBox key={tier.name} direction={tier.dir as any} delay={0.08 * idx}>
                    <TiltCard
                      onClick={() => jumpToSlide(tier.slideNum)}
                      className={`p-5 rounded-2xl transition-all cursor-pointer h-full flex flex-col justify-between border ${
                        isSelected
                          ? 'bg-[#0F0824]/95 border-[#D4AF37] shadow-[0_8px_30px_rgba(212,175,55,0.25)]'
                          : 'bg-[#0F0824]/50 border-[#D4AF37]/20 opacity-50'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] font-bold border border-[#D4AF37]/30">
                            {tier.slots}
                          </span>
                          <span className="text-[10px] font-mono text-[#A39B88]">Slide {tier.slideNum}</span>
                        </div>
                        <h3 className="text-xl font-serif font-bold text-[#FAF5EF]">{tier.name}</h3>
                        <p className="text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5DC] to-[#D4AF37]">
                          {tier.cost}
                        </p>
                        <p className="text-xs text-[#C4BBA3] leading-relaxed">
                          <span className="text-[#D4AF37] font-semibold">Best For: </span>
                          {tier.best}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs text-[#D4AF37] font-mono font-bold">
                        <span>Inspect Breakdown</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </TiltCard>
                  </AnimatedBox>
                );
              })}
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 8: BRONZE
      --------------------------------------------------------- */
      case 8:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <AnimatedBox direction="top" delay={0.05}>
              <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
                {renderTierQuickDock(8)}
                <span className="text-xs font-mono text-[#CD7F32] uppercase tracking-widest font-bold">
                  Sponsorship Tier Breakdown
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF5EF]">
                    Bronze Partner
                  </h2>
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-[#CD7F32]">
                    ₹10,000
                  </span>
                </div>
                <p className="text-xs font-mono text-[#C4BBA3]">Slots: Open</p>
              </div>
            </AnimatedBox>

            <AnimatedBox direction="left" delay={0.12}>
              <TiltCard className="p-4 sm:p-5 rounded-2xl bg-[#0F0824]/90 border border-[#CD7F32]/40">
                <span className="text-[10px] font-mono uppercase text-[#CD7F32] font-bold block mb-1">
                  Target Match:
                </span>
                <p className="text-sm text-[#FAF5EF]">
                  <strong className="text-white">Best for:</strong> Local businesses, startups, and service providers wanting visibility among students and families without high commitment.
                </p>
              </TiltCard>
            </AnimatedBox>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
                Deliverables & Inclusions:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Logo on event website (sponsor section with hyperlinked URL)',
                  'Logo on common sponsor backdrop (displayed in Radisson Blu main hall)',
                  'Logo on delegate handbook (inside pages, distributed to all 200+ delegates)',
                  '1 dedicated social media mention (Instagram post/reel thanking Bronze partners)',
                  'Flyer/brochure insertion into delegate kit bag (material provided by sponsor)',
                  'Certificate of Appreciation presented at the closing ceremony',
                ].map((inc, i) => (
                  <AnimatedBox key={i} direction={i % 2 === 0 ? 'left' : 'right'} delay={0.08 * i}>
                    <TiltCard className="p-3.5 rounded-xl bg-[#0F0824]/85 border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all flex items-start gap-2.5 h-full">
                      <CheckCircle2 className="w-4 h-4 text-[#CD7F32] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#C4BBA3] leading-relaxed">{inc}</span>
                    </TiltCard>
                  </AnimatedBox>
                ))}
              </div>
            </div>

            <AnimatedBox direction="bottom" delay={0.35}>
              <TiltCard className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#CD7F32]/15 via-[#180C34] to-[#CD7F32]/15 border border-[#CD7F32]/40">
                <p className="text-xs sm:text-sm text-[#FAF5EF]">
                  <strong className="text-[#CD7F32]">Why it works:</strong> At ₹10,000, cost per delegate is just ₹50 — cheaper than digital ad clicks, with physical, five-star credibility.
                </p>
              </TiltCard>
            </AnimatedBox>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 9: SILVER
      --------------------------------------------------------- */
      case 9:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <AnimatedBox direction="top" delay={0.05}>
              <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
                {renderTierQuickDock(9)}
                <span className="text-xs font-mono text-[#C0C0C0] uppercase tracking-widest font-bold">
                  Sponsorship Tier Breakdown
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF5EF]">
                    Silver Partner
                  </h2>
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-[#C0C0C0]">
                    ₹20,000
                  </span>
                </div>
                <p className="text-xs font-mono text-[#C4BBA3]">Slots: 3 only</p>
              </div>
            </AnimatedBox>

            <AnimatedBox direction="left" delay={0.12}>
              <TiltCard className="p-4 sm:p-5 rounded-2xl bg-[#0F0824]/90 border border-[#C0C0C0]/40">
                <span className="text-[10px] font-mono uppercase text-[#C0C0C0] font-bold block mb-1">
                  Target Match:
                </span>
                <p className="text-sm text-[#FAF5EF]">
                  <strong className="text-white">Best for:</strong> Coaching institutes, food/beverage brands, apparel labels, and education consultancies seeking repeat visibility.
                </p>
              </TiltCard>
            </AnimatedBox>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
                Deliverables & Inclusions:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Everything in Bronze, PLUS:',
                  'Logo on delegate lanyards (co-branded — worn by every delegate for two full days)',
                  'Medium logo on main stage backdrop (prominent during ceremonies & keynote addresses)',
                  '2 dedicated social media posts (including 1 story highlight reel and sponsor spotlight)',
                  'Product display / coupon distribution right at the registration desk',
                  'Verbal recognition in the opening ceremony by the Secretary-General',
                  '2 complimentary delegate passes (value: ₹4,000+)',
                ].map((inc, i) => (
                  <AnimatedBox key={i} direction={i % 2 === 0 ? 'left' : 'right'} delay={0.08 * i}>
                    <TiltCard className="p-3.5 rounded-xl bg-[#0F0824]/85 border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all flex items-start gap-2.5 h-full">
                      <CheckCircle2 className="w-4 h-4 text-[#C0C0C0] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#C4BBA3] leading-relaxed">{inc}</span>
                    </TiltCard>
                  </AnimatedBox>
                ))}
              </div>
            </div>

            <AnimatedBox direction="bottom" delay={0.35}>
              <TiltCard className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#C0C0C0]/15 via-[#180C34] to-[#C0C0C0]/15 border border-[#C0C0C0]/40">
                <p className="text-xs sm:text-sm text-[#FAF5EF]">
                  <strong className="text-[#C0C0C0]">Why it works:</strong> Lanyard branding means every single photograph taken at the event features your logo prominently.
                </p>
              </TiltCard>
            </AnimatedBox>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 10: GOLD
      --------------------------------------------------------- */
      case 10:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <AnimatedBox direction="top" delay={0.05}>
              <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
                {renderTierQuickDock(10)}
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
                  Sponsorship Tier Breakdown
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF5EF]">
                    Gold Partner
                  </h2>
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-[#D4AF37]">
                    ₹35,000
                  </span>
                </div>
                <p className="text-xs font-mono text-[#C4BBA3]">Slots: 2 only</p>
              </div>
            </AnimatedBox>

            <AnimatedBox direction="left" delay={0.12}>
              <TiltCard className="p-4 sm:p-5 rounded-2xl bg-[#0F0824]/90 border border-[#D4AF37]/45">
                <span className="text-[10px] font-mono uppercase text-[#D4AF37] font-bold block mb-1">
                  Target Match:
                </span>
                <p className="text-sm text-[#FAF5EF]">
                  <strong className="text-white">Best for:</strong> Universities, tech platforms, national retail brands, and financial products targeting young adults.
                </p>
              </TiltCard>
            </AnimatedBox>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
                Deliverables & Inclusions:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Everything in Silver, PLUS:',
                  'Branded stall/kiosk space in the Radisson Blu pre-function area (both days)',
                  'Large logo on main stage backdrop (primary tier placement)',
                  'Naming rights for 1 Committee (e.g., "[Your Brand] UN General Assembly")',
                  '1 branded award presented at the closing ceremony (e.g., "[Brand] Best Delegate Award")',
                  '3-minute address slot during opening or closing ceremony to pitch your brand directly',
                  '3 dedicated social media posts + 1 reel (collaborator post reaching 5,000+ views)',
                  'Full-page advertisement in the delegate handbook (back cover or inside front)',
                  '3 complimentary delegate passes (value: ₹6,000+)',
                ].map((inc, i) => (
                  <AnimatedBox key={i} direction={i % 2 === 0 ? 'left' : 'right'} delay={0.07 * i}>
                    <TiltCard className="p-3.5 rounded-xl bg-[#0F0824]/85 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all flex items-start gap-2.5 h-full">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#C4BBA3] leading-relaxed">{inc}</span>
                    </TiltCard>
                  </AnimatedBox>
                ))}
              </div>
            </div>

            <AnimatedBox direction="bottom" delay={0.35}>
              <TiltCard className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#D4AF37]/20 via-[#180C34] to-[#D4AF37]/20 border border-[#D4AF37]/50">
                <p className="text-xs sm:text-sm text-[#FAF5EF]">
                  <strong className="text-[#D4AF37]">Why it works:</strong> The kiosk space in the lobby gives direct footfall. Delegates pass your stall at least 6–8 times a day.
                </p>
              </TiltCard>
            </AnimatedBox>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 11: PLATINUM
      --------------------------------------------------------- */
      case 11:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <AnimatedBox direction="top" delay={0.05}>
              <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
                {renderTierQuickDock(11)}
                <span className="text-xs font-mono text-[#E5E4E2] uppercase tracking-widest font-bold">
                  Sponsorship Tier Breakdown
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF5EF]">
                    Platinum Partner
                  </h2>
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-[#E5E4E2]">
                    ₹40,000 – ₹50,000
                  </span>
                </div>
                <p className="text-xs font-mono text-[#C4BBA3]">Slots: 2 only (Co-presenting partner)</p>
              </div>
            </AnimatedBox>

            <AnimatedBox direction="left" delay={0.12}>
              <TiltCard className="p-4 sm:p-5 rounded-2xl bg-[#0F0824]/90 border border-[#E5E4E2]/40">
                <span className="text-[10px] font-mono uppercase text-[#E5E4E2] font-bold block mb-1">
                  Target Match:
                </span>
                <p className="text-sm text-[#FAF5EF]">
                  <strong className="text-white">Best for:</strong> Major regional/national brands looking for commanding brand presence and exclusive category ownership.
                </p>
              </TiltCard>
            </AnimatedBox>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
                Deliverables & Inclusions:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Everything in Gold, PLUS:',
                  '"Powered by [Your Brand]" or "In Association with [Your Brand]" on all branding',
                  'Exclusive category ownership — no competitor from your sector allowed at any tier',
                  'Prime kiosk location (closest to ballroom entrance — highest footfall)',
                  '5-minute keynote address slot during the Opening Ceremony',
                  'Logo on delegate certificates (every single participant receives one)',
                  'Logo on delegate kit bags (printed on the bag itself — high-value takeaway)',
                  'Joint press release mention distributed to local media & publications',
                  '4 complimentary delegate passes (value: ₹8,000+)',
                  'Access to delegate email database for post-event outreach (opt-in compliant)',
                ].map((inc, i) => (
                  <AnimatedBox key={i} direction={i % 2 === 0 ? 'left' : 'right'} delay={0.06 * i}>
                    <TiltCard className="p-3.5 rounded-xl bg-[#0F0824]/85 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all flex items-start gap-2.5 h-full">
                      <CheckCircle2 className="w-4 h-4 text-[#E5E4E2] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#C4BBA3] leading-relaxed">{inc}</span>
                    </TiltCard>
                  </AnimatedBox>
                ))}
              </div>
            </div>

            <AnimatedBox direction="bottom" delay={0.35}>
              <TiltCard className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#E5E4E2]/20 via-[#180C34] to-[#E5E4E2]/20 border border-[#E5E4E2]/50">
                <p className="text-xs sm:text-sm text-[#FAF5EF]">
                  <strong className="text-[#E5E4E2]">Why it works:</strong> The printed bag and certificate placements guarantee that your brand lives in delegates' homes for years.
                </p>
              </TiltCard>
            </AnimatedBox>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 12: TITLE
      --------------------------------------------------------- */
      case 12:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <AnimatedBox direction="top" delay={0.05}>
              <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
                {renderTierQuickDock(12)}
                <span className="text-xs font-mono text-[#FFD700] uppercase tracking-widest font-bold">
                  Sponsorship Tier Breakdown
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF5EF]">
                    Title Partner
                  </h2>
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-[#FFD700]">
                    ₹75,000 – ₹1,00,000
                  </span>
                </div>
                <p className="text-xs font-mono text-[#C4BBA3]">Slots: 1 only — Sole Headline Sponsor</p>
              </div>
            </AnimatedBox>

            <AnimatedBox direction="left" delay={0.12}>
              <TiltCard className="p-4 sm:p-5 rounded-2xl bg-[#0F0824]/90 border border-[#FFD700]/50 shadow-[0_0_30px_rgba(255,215,0,0.2)]">
                <span className="text-[10px] font-mono uppercase text-[#FFD700] font-bold block mb-1">
                  Target Match:
                </span>
                <p className="text-sm text-[#FAF5EF]">
                  <strong className="text-white">Best for:</strong> A market leader wanting complete ownership of Jammu's most prestigious youth leadership event of 2026.
                </p>
              </TiltCard>
            </AnimatedBox>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFD700] font-bold block">
                Deliverables & Inclusions:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Everything in Platinum, PLUS:',
                  'Event officially titled: "[Your Brand] Aequitas Summit 2026" on ALL materials, media, and announcements',
                  'Largest, most prominent logo on EVERY asset: lanyards, stage, kits, certificates, website, media',
                  '7-minute opening address + opportunity to present the Best Overall Delegation trophy',
                  'Exclusive VIP seating & dinner invitation at Radisson Blu with Executive Secretariat',
                  '6 complimentary delegate passes (value: ₹12,000+)',
                  'Custom activation of your choice — branded lounge, selfie zone, workshop session, or product launch',
                  'Complete post-event content package: high-resolution branded photos & video reel for your marketing',
                  'First right of refusal for Aequitas Summit 2027',
                ].map((inc, i) => (
                  <AnimatedBox key={i} direction={i % 2 === 0 ? 'left' : 'right'} delay={0.06 * i}>
                    <TiltCard className="p-3.5 rounded-xl bg-[#0F0824]/90 border border-[#FFD700]/40 hover:border-[#FFD700] transition-all flex items-start gap-2.5 h-full">
                      <Star className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5 fill-current" />
                      <span className="text-xs text-[#FAF5EF] leading-relaxed font-medium">{inc}</span>
                    </TiltCard>
                  </AnimatedBox>
                ))}
              </div>
            </div>

            <AnimatedBox direction="bottom" delay={0.35}>
              <TiltCard className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FFD700]/25 via-[#180C34] to-[#FFD700]/25 border border-[#FFD700]/60 text-center shadow-lg">
                <p className="text-xs sm:text-sm text-[#FAF5EF]">
                  <strong className="text-[#FFD700]">The Ultimate Position:</strong> You don't sponsor the summit — the summit happens under your name.
                </p>
              </TiltCard>
            </AnimatedBox>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 13: GROUND ACTIVATIONS
      --------------------------------------------------------- */
      case 13:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-5xl mx-auto text-left">
            <AnimatedBox direction="top" delay={0.05}>
              <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
                  On-Ground Experience
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF5EF]">
                  How your brand shows up on the ground
                </h2>
                <p className="text-xs sm:text-sm text-[#C4BBA3]">
                  Interactive Matrix: Filter activations by touchpoint category.
                </p>
              </div>
            </AnimatedBox>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { id: 'all', label: 'All Activations (9)' },
                { id: 'floor', label: 'Summit Floor & Lobby' },
                { id: 'digital', label: 'Digital, Wearables & Print' },
                { id: 'vip', label: 'Ceremony & Executive' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    sounds.playTap();
                    setActivationFilter(f.id as any);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    activationFilter === f.id
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8A53E] text-black shadow-md scale-105'
                      : 'bg-[#180C34]/80 text-[#C4BBA3] border border-[#D4AF37]/30 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { item: 'Delegate Lanyard', placement: 'Around every neck', visibility: 'Both days, every photo', category: 'digital', dir: 'left' },
                { item: 'Main Stage Backdrop', placement: 'Grand Ballroom stage', visibility: 'Ceremonies, keynotes, speeches', category: 'floor', dir: 'top' },
                { item: 'Delegate Kit Bag', placement: 'Handed at check-in', visibility: 'Taken home; long-tail life', category: 'digital', dir: 'right' },
                { item: 'Kiosk / Stall', placement: 'Pre-function foyer', visibility: 'Direct footfall, sampling, leads', category: 'floor', dir: 'left' },
                { item: 'Delegate Handbook', placement: 'Inside kit bag', visibility: 'Used throughout summit sessions', category: 'digital', dir: 'bottom' },
                { item: 'Social Media', placement: 'Instagram, LinkedIn', visibility: 'Pre, during & post event reach', category: 'digital', dir: 'right' },
                { item: 'Certificates', placement: 'Presented to all 200+', visibility: 'Permanent framed keepsake', category: 'vip', dir: 'left' },
                { item: 'Stage Announcement', placement: 'Ceremony podium', visibility: 'Verbal credit before full audience', category: 'vip', dir: 'bottom' },
                { item: 'Awards Naming', placement: 'Closing ceremony', visibility: 'Prestige association with winners', category: 'vip', dir: 'right' },
              ].filter((act) => {
                if (activationFilter === 'all') return true;
                return act.category === activationFilter;
              }).map((act, idx) => (
                <AnimatedBox key={act.item} direction={act.dir as any} delay={0.06 * idx}>
                  <TiltCard className="p-4 sm:p-5 rounded-2xl bg-[#0F0824]/90 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all space-y-2 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/15">
                        <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">
                          Activation #{idx + 1}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      </div>
                      <h4 className="text-base font-serif font-bold text-[#FAF5EF] mt-2">
                        {act.item}
                      </h4>
                      <p className="text-xs text-[#C4BBA3] mt-1">
                        <span className="text-white font-medium">Placement: </span>
                        {act.placement}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#D4AF37]/15">
                      <p className="text-xs text-[#D4AF37] font-mono font-medium">
                        ✦ {act.visibility}
                      </p>
                    </div>
                  </TiltCard>
                </AnimatedBox>
              ))}
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 14: POST-SUMMIT DELIVERABLES
      --------------------------------------------------------- */
      case 14:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <AnimatedBox direction="top" delay={0.05}>
              <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
                  Post-Event Accountability
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF5EF]">
                  What you receive after the summit
                </h2>
                <p className="text-xs sm:text-sm text-[#C4BBA3]">
                  Interactive Checklist: Click any item to inspect verification status.
                </p>
              </div>
            </AnimatedBox>

            {/* Compliance Guarantee Banner */}
            <AnimatedBox direction="zoom" delay={0.1}>
              <TiltCard className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-[#180C34] to-emerald-500/20 border border-emerald-400/40 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    100% Guaranteed Post-Event Compliance
                  </span>
                  <p className="text-xs text-[#FAF5EF]">
                    Every deliverable is backed by photographic evidence and quantitative metrics.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-xl bg-emerald-500 text-black font-mono font-bold text-xs shrink-0">
                  {checkedDeliverables.size}/6 Verified
                </span>
              </TiltCard>
            </AnimatedBox>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                { title: 'Post-Event Impact Report', desc: 'Detailed PDF with event photos, delegate count, social impressions, and brand placement documentation.', dir: 'left' },
                { title: 'High-Resolution Photo Library', desc: 'Access to all event photography featuring your stall, branding, and delegates using your products.', dir: 'top' },
                { title: 'Social Media Analytics', desc: 'Screenshots and reach metrics for all posts and stories mentioning your brand.', dir: 'right' },
                { title: 'Certificate of Partnership', desc: 'Framed formal memento recognizing your brand as an official partner of Aequitas Summit 2026.', dir: 'left' },
                { title: 'Delegate Database Access', desc: 'Opt-in compliant contact list (email & phone) for eligible sponsorship tiers.', dir: 'bottom' },
                { title: 'First Right of Refusal', desc: 'Priority renewal rights for Aequitas Summit 2027 before slots open to other brands.', dir: 'right' },
              ].map((del, idx) => {
                const isChecked = checkedDeliverables.has(idx + 1);
                return (
                  <AnimatedBox key={del.title} direction={del.dir as any} delay={0.08 * idx}>
                    <TiltCard
                      onClick={() => toggleDeliverable(idx + 1)}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer h-full ${
                        isChecked
                          ? 'bg-[#0F0824]/90 border-emerald-400/40'
                          : 'bg-[#0F0824]/40 border-gray-600/30 opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked ? 'bg-emerald-500 text-black font-bold' : 'bg-gray-800 text-gray-400'
                        }`}>
                          {isChecked ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-serif font-bold text-[#FAF5EF]">
                            {del.title}
                          </h4>
                          <p className="text-xs text-[#C4BBA3] leading-relaxed">{del.desc}</p>
                        </div>
                      </div>
                    </TiltCard>
                  </AnimatedBox>
                );
              })}
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 15: PAYMENT TERMINAL
      --------------------------------------------------------- */
      case 15:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <AnimatedBox direction="top" delay={0.05}>
              <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
                  Sponsorship Remittance
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF5EF]">
                  Drop a hint & we’ll catch you!
                </h2>
                <p className="text-xs sm:text-sm text-[#C4BBA3]">
                  Lock in your tier with instant digital settlement or direct NEFT/RTGS wire transfer.
                </p>
              </div>
            </AnimatedBox>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Left: PhonePe QR Card */}
              <AnimatedBox direction="left" delay={0.15}>
                <TiltCard className="p-6 rounded-3xl bg-[#0F0824]/95 border border-[#D4AF37]/45 text-center space-y-4 shadow-xl">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#180C34] border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-xs font-bold uppercase">
                    Scan with PhonePe / Any UPI App
                  </div>

                  <div className="w-56 h-56 mx-auto bg-white p-3 rounded-2xl shadow-2xl border-4 border-[#D4AF37]/60 flex items-center justify-center">
                    <img
                      src="/payment-qr.jpg"
                      alt="Aastitva Official Payment QR"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <p className="text-xs font-mono text-[#FAF5EF]">
                    Accepted: UPI, PhonePe, GPay, Paytm, RuPay
                  </p>
                </TiltCard>
              </AnimatedBox>

              {/* Right: Bank Details Card */}
              <AnimatedBox direction="right" delay={0.25}>
                <TiltCard className="p-6 rounded-3xl bg-[#0F0824]/95 border border-[#D4AF37]/45 space-y-4 shadow-xl">
                  <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest font-bold block pb-2 border-b border-[#D4AF37]/20">
                    Official Banking Remittance Coordinates
                  </span>

                  <div className="space-y-3 font-mono text-xs">
                    {[
                      { label: 'Bank Name', value: 'The Jammu and Kashmir Bank', copyVal: 'The Jammu and Kashmir Bank', id: 'bank' },
                      { label: 'Account Number', value: '0116040100017669', copyVal: '0116040100017669', id: 'ac' },
                      { label: 'IFSC Code', value: 'JAKA0GNGYAL', copyVal: 'JAKA0GNGYAL', id: 'ifsc' },
                      { label: 'Branch', value: 'Gangyal, Jammu', copyVal: 'Gangyal, Jammu', id: 'branch' },
                    ].map((row) => (
                      <div key={row.label} className="p-2.5 rounded-xl bg-[#180C34]/80 border border-[#D4AF37]/25 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] text-[#A39B88] uppercase block">{row.label}</span>
                          <span className="text-[#FAF5EF] font-bold text-xs sm:text-sm">{row.value}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(row.copyVal, row.id)}
                          className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/40 text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          {copiedField === row.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-[11px] font-mono text-[#A39B88] italic">
                    *After remitting, please send transaction UTR receipt to corporate desk for prompt sponsorship ledger reconciliation.
                  </div>
                </TiltCard>
              </AnimatedBox>
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 16: CONTACTS
      --------------------------------------------------------- */
      case 16:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <AnimatedBox direction="top" delay={0.05}>
              <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4 text-center sm:text-left">
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
                  Executive Partnership Desk
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF5EF]">
                  Partner with Aequitas Summit 2026
                </h2>
                <p className="text-xs sm:text-sm text-[#C4BBA3]">
                  Direct lines to the Secretariat for custom brand activations, tier locks, and institutional agreements.
                </p>
              </div>
            </AnimatedBox>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Contact 1 */}
              <AnimatedBox direction="left" delay={0.15}>
                <TiltCard className="p-6 rounded-3xl bg-[#0F0824]/95 border border-[#D4AF37]/40 space-y-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold">
                      <Phone className="w-5 h-5 animate-bounce" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#D4AF37] font-bold block">
                        Direct Secretariat Line 01
                      </span>
                      <a href="tel:+918899346704" className="text-lg sm:text-xl font-mono font-bold text-white hover:text-emerald-400 transition-colors">
                        +91 88993 46704
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-[#C4BBA3]">
                    Available for phone consultations, custom tier structures, and immediate reservation.
                  </p>

                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href="tel:+918899346704"
                      className="flex-1 py-2 rounded-xl bg-[#180C34] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/40 font-mono text-xs font-bold text-center transition-all cursor-pointer"
                    >
                      Call Now
                    </a>
                    <a
                      href="https://wa.me/918899346704?text=Hello%20Aequitas%20Summit%20Team%2C%20we%20are%20interested%20in%20discussing%20sponsorship%20opportunities."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold text-center transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>WhatsApp</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </TiltCard>
              </AnimatedBox>

              {/* Contact 2 */}
              <AnimatedBox direction="right" delay={0.25}>
                <TiltCard className="p-6 rounded-3xl bg-[#0F0824]/95 border border-[#D4AF37]/40 space-y-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center font-bold">
                      <Phone className="w-5 h-5 animate-bounce" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#D4AF37] font-bold block">
                        Direct Secretariat Line 02
                      </span>
                      <a href="tel:+919548499951" className="text-lg sm:text-xl font-mono font-bold text-white hover:text-purple-300 transition-colors">
                        +91 95484 99951
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-[#C4BBA3]">
                    Available for institutional relations, delegate packages, and partner deliverables coordination.
                  </p>

                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href="tel:+919548499951"
                      className="flex-1 py-2 rounded-xl bg-[#180C34] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/40 font-mono text-xs font-bold text-center transition-all cursor-pointer"
                    >
                      Call Now
                    </a>
                    <a
                      href="https://wa.me/919548499951?text=Hello%20Aequitas%20Summit%20Team%2C%20we%20are%20interested%20in%20discussing%20sponsorship%20opportunities."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-mono text-xs font-bold text-center transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>WhatsApp</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </TiltCard>
              </AnimatedBox>
            </div>

            {/* Email & Instagram */}
            <AnimatedBox direction="bottom" delay={0.35}>
              <TiltCard className="p-5 sm:p-6 rounded-3xl bg-[#0F0824]/90 border border-[#D4AF37]/35 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#A39B88] uppercase block">Official Email</span>
                    <a href="mailto:aastitvaalliancespr@gmail.com" className="text-xs sm:text-sm font-mono font-bold text-white hover:text-[#D4AF37]">
                      aastitvaalliancespr@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-pink-500/15 border border-pink-500/40 text-pink-400 flex items-center justify-center">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#A39B88] uppercase block">Official Instagram</span>
                    <a
                      href="https://www.instagram.com/alliancesby_aastitva_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-mono font-bold text-white hover:text-pink-400 flex items-center gap-1"
                    >
                      <span>@alliancesby_aastitva_</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </TiltCard>
            </AnimatedBox>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#05020D] text-[#FAF5EF] flex flex-col justify-between overflow-x-hidden font-sans selection:bg-[#D4AF37] selection:text-[#070A14]">
      {/* 1. Deep Violet Procedural Nebula Starfield Background */}
      <VioletNebulaCanvas />

      {/* 2. Atmospheric Amethyst & Radiant Gold Center Halo */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[1100px] h-[550px] bg-gradient-to-b from-[#8B5CF6]/15 via-[#D4AF37]/10 to-transparent blur-[160px] pointer-events-none z-0" />

      {/* 3. Corporate Header with Controls */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between border-b border-[#D4AF37]/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (onNavigate) onNavigate('home');
              else window.location.href = '/';
            }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#8B5CF6]/30 to-[#D4AF37]/30 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform shadow-sm">
              <span className="font-serif font-bold text-sm">✦</span>
            </div>
            <div className="text-left">
              <span className="font-serif font-bold text-xs sm:text-sm text-white block">
                AEQUITAS 2026
              </span>
              <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-wider block">
                Sponsorship Proposal
              </span>
            </div>
          </button>
        </div>

        {/* View Mode & Audio Controls */}
        <div className="flex items-center gap-2">
          {/* Deck Mode vs Continuous Mode Toggle */}
          <div className="flex items-center p-0.5 rounded-xl bg-[#0D061A]/90 border border-[#D4AF37]/30 shadow-inner">
            <button
              onClick={() => {
                sounds.playTap();
                setViewMode('deck');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'deck'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8A53E] text-black shadow-md'
                  : 'text-[#C4BBA3] hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3 h-3" />
              <span className="hidden sm:inline">Interactive Slides</span>
              <span className="sm:hidden">Deck</span>
            </button>
            <button
              onClick={() => {
                sounds.playTap();
                setViewMode('continuous');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'continuous'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8A53E] text-black shadow-md'
                  : 'text-[#C4BBA3] hover:text-white'
              }`}
            >
              <FileText className="w-3 h-3" />
              <span className="hidden sm:inline">Continuous Stream</span>
              <span className="sm:hidden">Stream</span>
            </button>
          </div>

          {/* Sound Synthesizer */}
          <button
            onClick={handleSoundToggle}
            className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_12px_#D4AF37]'
                : 'bg-[#180C34] text-[#C4BBA3] border-[#D4AF37]/30 hover:text-white'
            }`}
            title={soundEnabled ? 'Synthesizer FX Active' : 'Enable Futuristic Audio FX'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* 4. MAIN CONTENT CONTAINER */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8 flex-1">
        {viewMode === 'deck' ? (
          /* ========================================================
             VIEW MODE A: INTERACTIVE SLIDE DECK (CONTINUATION MODEL)
             ======================================================== */
          <div className="space-y-6">
            {/* Top Navigation & Slide Progress Bar */}
            <div className="p-3 sm:p-4 rounded-2xl bg-[#0D061A]/85 border border-[#D4AF37]/30 backdrop-blur-xl shadow-lg space-y-3">
              <div className="flex items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#180C34] text-[#D4AF37] font-bold border border-[#D4AF37]/40 text-[10px] sm:text-xs">
                    SLIDE {currentSlide.toString().padStart(2, '0')} / {totalSlides.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[#C4BBA3] hidden md:inline truncate max-w-md">
                    {SLIDE_TITLES[currentSlide]}
                  </span>
                </div>

                {/* Arrow Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={goToPrevSlide}
                    disabled={currentSlide === 1}
                    className="p-1.5 rounded-xl bg-[#180C34] hover:bg-[#D4AF37] text-[#FAF5EF] hover:text-black border border-[#D4AF37]/30 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="text-[11px] font-mono text-[#D4AF37] px-1">
                    {Math.round((currentSlide / totalSlides) * 100)}%
                  </span>

                  <button
                    onClick={goToNextSlide}
                    disabled={currentSlide === totalSlides}
                    className="p-1.5 rounded-xl bg-[#180C34] hover:bg-[#D4AF37] text-[#FAF5EF] hover:text-black border border-[#D4AF37]/30 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Line */}
              <div className="w-full h-1.5 rounded-full bg-[#180C34] overflow-hidden border border-[#D4AF37]/20">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#D4AF37] via-[#C084FC] to-[#D4AF37]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentSlide / totalSlides) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Quick Jump Mini Pills */}
              <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none py-0.5">
                {Array.from({ length: totalSlides }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => jumpToSlide(num)}
                    className={`h-6 px-2 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer shrink-0 ${
                      currentSlide === num
                        ? 'bg-[#D4AF37] text-black shadow-[0_0_10px_#D4AF37]'
                        : 'bg-[#180C34] text-[#C4BBA3] hover:text-white border border-[#D4AF37]/20'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Slide Display with 3D Spatial Transitions */}
            <div style={{ perspective: 1200 }} className="relative overflow-visible">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="bg-[#0B061A]/90 border border-[#D4AF37]/35 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.9)] relative min-h-[500px] flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle top indicator */}
                  <div className="flex items-center justify-between border-b border-[#D4AF37]/15 pb-2 text-xs font-mono text-[#A39B88]">
                    <span>AEQUITAS SUMMIT 2026 // PROPOSAL DOSSIER</span>
                    <span className="text-[#D4AF37] font-semibold">{SLIDE_TITLES[currentSlide]}</span>
                  </div>

                  {/* Render Core Content with Multi-Directional Staggered Entrances */}
                  <div className="py-4">
                    {renderSlideContent(currentSlide)}
                  </div>

                  {/* Bottom Navigation Toolbar */}
                  <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs font-mono">
                    <button
                      onClick={goToPrevSlide}
                      disabled={currentSlide === 1}
                      className="px-3 py-1.5 rounded-xl bg-[#180C34] hover:bg-[#D4AF37] text-[#FAF5EF] hover:text-black border border-[#D4AF37]/30 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Previous Slide</span>
                    </button>

                    <span className="text-[#C4BBA3] text-[11px] hidden sm:inline">
                      Use Left/Right Keyboard Arrows to Navigate
                    </span>

                    <button
                      onClick={goToNextSlide}
                      disabled={currentSlide === totalSlides}
                      className="px-4 py-1.5 rounded-xl shimmer-btn text-black font-bold disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>Next Slide</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CONTINUATION CONDUIT (Narrative Bridge to Next Slide) */}
            {currentSlide < totalSlides && (
              <AnimatedBox direction="bottom" delay={0.2}>
                <TiltCard
                  onClick={goToNextSlide}
                  className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#180C34]/90 via-[#2E1065]/80 to-[#180C34]/90 border border-[#D4AF37]/45 shadow-lg backdrop-blur-md cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                    <div className="space-y-1">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                          Phase Progression Pipeline
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#FAF5EF] font-serif font-bold">
                        Continue to Slide {(currentSlide + 1).toString().padStart(2, '0')}: {SLIDE_TITLES[currentSlide + 1]}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37] group-hover:bg-[#E8A53E] text-black font-mono font-bold text-xs shadow-md transition-all">
                      <span>Proceed to Next Phase</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </TiltCard>
              </AnimatedBox>
            )}
          </div>
        ) : (
          /* ========================================================
             VIEW MODE B: CONTINUOUS STREAM VIEW (ALL 16 SLIDES)
             ======================================================== */
          <div className="space-y-12 sm:space-y-16 py-4">
            <div className="p-4 rounded-2xl bg-[#0F0824]/90 border border-[#D4AF37]/40 text-center space-y-1 shadow-lg backdrop-blur-md">
              <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
                Continuous Executive Stream Mode Active
              </span>
              <p className="text-xs text-[#C4BBA3]">
                Scroll continuously to review the complete 16-slide Aequitas Summit 2026 Sponsorship Proposal.
              </p>
            </div>

            {Array.from({ length: totalSlides }, (_, i) => i + 1).map((num) => (
              <div
                key={`cont-${num}`}
                ref={(el) => (slideRefs.current[num - 1] = el)}
                className="bg-[#0B061A]/90 border border-[#D4AF37]/35 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.9)] relative space-y-6 overflow-hidden"
              >
                {/* Slide Top Indicator */}
                <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3 text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#180C34] text-[#D4AF37] font-bold border border-[#D4AF37]/30 text-[10px]">
                    SLIDE {num.toString().padStart(2, '0')} // 16
                  </span>
                  <span className="text-[#C4BBA3] text-[11px]">{SLIDE_TITLES[num]}</span>
                </div>

                {/* Content */}
                {renderSlideContent(num)}

                {/* Bottom Conduit to next slide */}
                {num < totalSlides && (
                  <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between text-[11px] font-mono text-[#A39B88]">
                    <span>Continuing to Slide {(num + 1).toString().padStart(2, '0')}</span>
                    <button
                      onClick={() => jumpToSlide(num + 1)}
                      className="text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Jump to Slide {(num + 1).toString().padStart(2, '0')}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 5. FLOATING DIRECT CONTACT CALLOUT */}
      <aside aria-label="Corporate Sponsorship Contacts" className="sticky bottom-3 z-30 max-w-4xl w-full mx-auto px-3 sm:px-6 pointer-events-auto">
        <div className="p-3 sm:p-4 rounded-2xl bg-[#0A0518]/95 border border-[#D4AF37]/50 shadow-[0_10px_35px_rgba(0,0,0,0.9)] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-left">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-wider font-bold block">
                Have Sponsorship Questions? Direct Corporate Desk:
              </span>
              <div className="flex items-center gap-3 font-mono font-bold text-[#FAF5EF] text-xs sm:text-sm flex-wrap">
                <a href="tel:+918899346704" className="hover:text-emerald-400 flex items-center gap-1">
                  <span>+91 88993 46704</span>
                </a>
                <span className="text-[#241344] hidden sm:inline">|</span>
                <a href="tel:+919548499951" className="hover:text-purple-300 flex items-center gap-1">
                  <span>+91 95484 99951</span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <a
              href="https://wa.me/918899346704?text=Hello%20Aequitas%20Summit%20Team%2C%20we%20are%20interested%20in%20discussing%20sponsorship%20opportunities."
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-[11px] shadow-sm flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>WhatsApp Us</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            {isStandalone && (
              <a
                href="/"
                className="px-3 py-1.5 rounded-xl bg-[#180C34] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/40 font-mono text-[11px] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Main Portal</span>
              </a>
            )}
          </div>
        </div>
      </aside>

      {/* 6. Footer Legal & Attribution */}
      <footer className="relative z-10 py-6 text-center text-xs font-mono text-[#A39B88] border-t border-[#D4AF37]/15 mt-8">
        <p>
          Aequitas Summit 2026 © Presented by Aastitva Alliances • Radisson Blu Hotel, Jammu
        </p>
      </footer>
    </div>
  );
};
