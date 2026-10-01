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
} from 'lucide-react';

interface Props {
  onNavigate?: (page: Page) => void;
  onOpenRegister?: () => void;
  isStandalone?: boolean;
}

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

  /* -------------------------------------------------------------
     RENDER SLIDE CONTENT
  ------------------------------------------------------------- */
  const renderSlideContent = (slideNum: number) => {
    switch (slideNum) {
      /* ---------------------------------------------------------
         SLIDE 1: COVER
      --------------------------------------------------------- */
      case 1:
        return (
          <div className="text-center py-6 sm:py-12 space-y-6 sm:space-y-8 max-w-4xl mx-auto">
            {/* Top Emblems */}
            <div className="flex items-center justify-center gap-3">
              <img
                src="/aequitas-logo.png"
                alt="Aequitas Crest"
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.45)] bg-black object-cover"
              />
              <span className="text-[#D4AF37] font-playfair text-xl opacity-75">×</span>
              <img
                src="/astitva-logo.png"
                alt="Aastitva Alliance"
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-[#D4AF37]/80 shadow-[0_0_25px_rgba(168,85,247,0.45)] bg-[#1e1442] object-cover"
              />
            </div>

            {/* Main Proposal Header */}
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

            {/* Central Badge */}
            <div className="py-2">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-extrabold tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5DC] via-[#D4AF37] to-[#FAF5EF]">
                SPONSORSHIP PROPOSAL
              </h2>
              <p className="text-sm sm:text-lg text-[#C4BBA3] font-mono mt-3 tracking-wide">
                29–30 October 2026 | Radisson Blu Hotel, Jammu
              </p>
            </div>

            {/* Complementary 3D Planetary Core Visual */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto my-2">
              <Astitva3DCanvas variant="emblem" className="w-full h-full" />
              <div className="absolute inset-0 rounded-full bg-radial from-[#A855F7]/15 to-transparent blur-xl pointer-events-none" />
            </div>

            {/* Footer Attribution */}
            <div className="pt-2 border-t border-[#D4AF37]/25 max-w-sm mx-auto">
              <p className="text-xs sm:text-sm font-mono text-[#D4AF37] tracking-widest uppercase font-semibold">
                Presented by Aastitva Alliances
              </p>
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 2: VISION & CORE PITCH
      --------------------------------------------------------- */
      case 2:
        return (
          <div className="py-6 sm:py-12 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
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

            <div className="p-5 sm:p-8 rounded-2xl bg-[#0F0824]/90 border border-[#D4AF37]/30 shadow-xl backdrop-blur-md space-y-4">
              <p className="text-base sm:text-xl text-[#FAF5EF] leading-relaxed font-sans font-light">
                Aequitas Summit 2026 is Jammu's premier Model United Nations summit, hosted at the
                Radisson Blu Hotel, bringing together 200+ high-intent delegates from across India for
                two days of debate, strategy, and public engagement.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#D4AF37]/15 via-[#7C3AED]/15 to-[#D4AF37]/15 border border-[#D4AF37]/45 text-center">
              <p className="text-base sm:text-2xl font-serif italic font-semibold text-[#FFF5DC] tracking-wide">
                "From boards to wearables , your brand is in the delegate's hand, bag, and day."
              </p>
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 3: WHY SPONSOR
      --------------------------------------------------------- */
      case 3:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-mono font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>Value Proposition</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FAF5EF]">
                Why sponsor Aequitas Summit 2026
              </h2>
              <p className="text-sm sm:text-lg font-serif italic text-[#D4AF37]">
                Way More than any advertitsement
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {[
                {
                  text: '200+ delegates — senior secondary students, ages 14–22',
                  icon: Users,
                  color: 'text-amber-400',
                },
                {
                  text: 'High-intent audience — future decision-makers, early brand loyalists',
                  icon: TrendingUp,
                  color: 'text-purple-400',
                },
                {
                  text: 'Two full days — 8 AM to 8 PM, Day 1 | 8 AM to 7 PM, Day 2',
                  icon: Calendar,
                  color: 'text-sky-400',
                },
                {
                  text: 'Seven committees — continuous engagement.',
                  icon: Layers,
                  color: 'text-emerald-400',
                },
                {
                  text: 'Premium venue — Radisson Blu Hotel, Jammu',
                  icon: Building,
                  color: 'text-[#D4AF37]',
                },
                {
                  text: 'Multi-city reach — delegates from Jammu and other Indian states',
                  icon: Globe,
                  color: 'text-indigo-400',
                },
                {
                  text: 'Multi-channel exposure — on-ground, digital, and post-event',
                  icon: Share2,
                  color: 'text-rose-400',
                },
                {
                  text: 'You are sponsoring an academic event with high potential.',
                  icon: ShieldCheck,
                  color: 'text-emerald-300',
                },
              ].map((item, idx) => {
                const IconC = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0E0720]/85 border border-[#241344] hover:border-[#D4AF37]/50 transition-all flex items-start gap-3 shadow-md"
                  >
                    <div className="p-2 rounded-lg bg-[#180C34] shrink-0 mt-0.5">
                      <IconC className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <p className="text-xs sm:text-sm text-[#FAF5EF] font-sans leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 4: VENUE SPOTLIGHT (RADISSON BLU HOTEL, JAMMU)
      --------------------------------------------------------- */
      case 4:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Building className="w-3.5 h-3.5" />
                <span>Five-Star Diplomatic Destination</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FAF5EF]">
                Radisson Blu Hotel, Jammu
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Luxury Venue Specifications */}
              <div className="space-y-3.5">
                {[
                  '—40,000 sq ft of indoor and outdoor event space',
                  "—Jammu's largest pillar-less banquet hall",
                  '—12,000 sq ft lawn for outdoor engagement',
                  '—Professional AV, Wi-Fi, and conference infrastructure',
                  '—Capacity of up to 1,200 guests',
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[#0F0824]/90 border border-[#D4AF37]/30 flex items-center gap-3 text-xs sm:text-sm text-[#FAF5EF] shadow-sm font-sans"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              {/* Venue Architectural Showcase */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/45 shadow-[0_15px_45px_rgba(0,0,0,0.8)] aspect-video md:aspect-auto md:h-full min-h-[220px]">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000"
                  alt="Radisson Blu Hotel, Jammu"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070414] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-[#070414]/90 border border-[#D4AF37]/40 backdrop-blur-md">
                  <p className="text-[11px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider">
                    Radisson Blu Hotel • Prestige Venue in Jammu
                  </p>
                  <p className="text-[10px] text-[#C4BBA3]">
                    Radisson Square, Narwal Bypass, Jammu, J&amp;K
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#D4AF37]/10 via-[#7C3AED]/20 to-[#D4AF37]/10 border border-[#D4AF37]/40 text-center">
              <p className="text-base sm:text-2xl font-serif italic font-bold text-[#FFF5DC]">
                "Your brand , in a five-star environment."
              </p>
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 5: WHO YOU ARE REACHING (DEMOGRAPHICS)
      --------------------------------------------------------- */
      case 5:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/35 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                <span>Audience Demographics</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FAF5EF]">
                Who you are reaching
              </h2>
            </div>

            {/* Demographics Matrix Table */}
            <div className="rounded-2xl border border-[#D4AF37]/35 overflow-hidden bg-[#0C061D]/90 shadow-2xl backdrop-blur-md">
              <table className="w-full text-left text-xs sm:text-sm">
                <tbody>
                  {[
                    { label: 'Age', value: '15–22years' },
                    {
                      label: 'Education',
                      value: 'Senior secondary, grades 6–12, college goers, teachers, professionals',
                    },
                    { label: 'Location', value: 'Jammu + out-of-state delegates' },
                    {
                      label: 'Profile',
                      value: 'Academically driven, socially active, digitally native',
                    },
                    {
                      label: 'Spending influence',
                      value: 'High — fashion, stationery, food, tech, education',
                    },
                    {
                      label: 'Digital behaviour',
                      value: 'Instagram, WhatsApp, YouTube — active creators and sharers',
                    },
                  ].map((row, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-[#241344] transition-colors ${
                        idx % 2 === 0 ? 'bg-[#0E0720]/80' : 'bg-[#140A2C]/60'
                      }`}
                    >
                      <td className="py-3.5 sm:py-4 px-4 sm:px-6 font-mono font-bold text-[#D4AF37] w-1/3 sm:w-1/4 border-r border-[#241344]">
                        {row.label}
                      </td>
                      <td className="py-3.5 sm:py-4 px-4 sm:px-6 text-[#FAF5EF] font-sans">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-[#D4AF37]/15 via-[#7C3AED]/15 to-[#D4AF37]/15 border border-[#D4AF37]/30 text-center">
              <p className="text-base sm:text-xl font-serif italic text-[#FFF5DC]">
                "The households of Jammu's next decade."
              </p>
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 6: THREE REASONS BRANDS CHOOSE US
      --------------------------------------------------------- */
      case 6:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Competitive Edge</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FAF5EF]">
                Three reasons brands choose us
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Reason One */}
              <div className="p-6 rounded-2xl bg-[#0D071F]/90 border border-[#D4AF37]/35 shadow-xl flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="px-3 py-1 rounded-full bg-[#1F0E42] text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] font-mono font-bold uppercase tracking-widest inline-block">
                    REASON ONE
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#FAF5EF]">
                    Venue credibility
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed">
                    Radisson Blu Jammu.Your brand sits in a premium environment.
                  </p>
                </div>
                <div className="h-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-transparent" />
              </div>

              {/* Reason Two */}
              <div className="p-6 rounded-2xl bg-[#0D071F]/90 border border-[#7C3AED]/45 shadow-xl flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="px-3 py-1 rounded-full bg-[#1F0E42] text-[#C084FC] border border-[#7C3AED]/40 text-[10px] font-mono font-bold uppercase tracking-widest inline-block">
                    REASON TWO
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#FAF5EF]">
                    Trackable engagement
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed">
                    Mystery QR Boards, delegate kits, photo booth, and quiz activations give your
                    brand measurable touchpoints ,not just a thank-you post.
                  </p>
                </div>
                <div className="h-1 rounded-full bg-gradient-to-r from-[#A855F7] to-transparent" />
              </div>

              {/* Reason Three */}
              <div className="p-6 rounded-2xl bg-[#0D071F]/90 border border-[#38BDF8]/35 shadow-xl flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="px-3 py-1 rounded-full bg-[#1F0E42] text-[#38BDF8] border border-[#38BDF8]/40 text-[10px] font-mono font-bold uppercase tracking-widest inline-block">
                    REASON THREE
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#FAF5EF]">
                    Two full days of presence
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed">
                    Day 1: 8 AM – 8 PM. Day 2: 8 AM – 7 PM. Your brand is is present for 23 hours of
                    live engagement.
                  </p>
                </div>
                <div className="h-1 rounded-full bg-gradient-to-r from-[#38BDF8] to-transparent" />
              </div>
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 7: SPONSORSHIP TIERS OVERVIEW
      --------------------------------------------------------- */
      case 7:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-mono font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>Investment Packages</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FAF5EF]">
                Sponsorship Tiers
              </h2>
            </div>

            <div className="rounded-2xl border border-[#D4AF37]/35 overflow-hidden bg-[#0C061D]/90 shadow-2xl backdrop-blur-md">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#1C0E3C] border-b border-[#D4AF37]/30 text-[#D4AF37] font-mono text-[11px] sm:text-xs uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4 sm:px-6">TIER</th>
                      <th className="py-3 px-4 sm:px-6">INVESTMENT</th>
                      <th className="py-3 px-4 sm:px-6">BEST FOR</th>
                      <th className="py-3 px-3 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        tier: 'Title Partner',
                        investment: '₹75,000–1,00,000',
                        bestFor: 'Headline brands, naming rights',
                        color: 'text-amber-400 font-bold',
                        slide: 12,
                      },
                      {
                        tier: 'Platinum Partner',
                        investment: '₹40,000–50,000',
                        bestFor: 'Jewellery, universities, national brands',
                        color: 'text-purple-300 font-bold',
                        slide: 11,
                      },
                      {
                        tier: 'Gold Partner',
                        investment: '₹30,000',
                        bestFor: 'Stationery, EdTech, national brands',
                        color: 'text-yellow-400 font-bold',
                        slide: 10,
                      },
                      {
                        tier: 'Silver Partner',
                        investment: '₹20,000',
                        bestFor: 'Fashion, F&B, EdTech, universities',
                        color: 'text-slate-200 font-bold',
                        slide: 9,
                      },
                      {
                        tier: 'Bronze Partner',
                        investment: '₹10,000',
                        bestFor: 'Local brands, first-time sponsors',
                        color: 'text-amber-600 font-bold',
                        slide: 8,
                      },
                    ].map((row, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-[#241344] transition-colors hover:bg-[#1D0F40]/60 ${
                          idx % 2 === 0 ? 'bg-[#0E0720]/80' : 'bg-[#140A2C]/60'
                        }`}
                      >
                        <td className={`py-4 px-4 sm:px-6 ${row.color}`}>{row.tier}</td>
                        <td className="py-4 px-4 sm:px-6 font-mono text-white font-semibold">
                          {row.investment}
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-[#C4BBA3]">{row.bestFor}</td>
                        <td className="py-4 px-3 text-right">
                          <button
                            onClick={() => jumpToSlide(row.slide)}
                            className="px-2.5 py-1 rounded-lg bg-[#2B1055] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#070A14] border border-[#D4AF37]/35 text-[10px] font-mono font-bold transition-all cursor-pointer whitespace-nowrap"
                          >
                            Details →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-[#D4AF37]/15 via-[#7C3AED]/20 to-[#D4AF37]/15 border border-[#D4AF37]/45 text-center">
              <p className="text-base sm:text-xl font-serif font-bold text-[#FFF5DC]">
                "All tiers are limited. First-come, first-confirmed."
              </p>
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 8: BRONZE PARTNER
      --------------------------------------------------------- */
      case 8:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <div className="space-y-1 border-b border-[#D4AF37]/25 pb-4">
              <span className="text-[10px] font-mono text-[#D4AF37] tracking-[0.2em] uppercase font-bold">
                SPONSORSHIP TIER
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-amber-500">
                Bronze Partner
              </h2>
              <p className="text-xl sm:text-2xl font-mono text-white font-bold pt-1">
                Investment: ₹10,000
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#0E0720]/90 border border-amber-600/30 space-y-4 shadow-xl">
                <h3 className="text-sm font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                  Your brand gets:
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-[#FAF5EF]">
                  {[
                    '—Instagram Stories featuring your brand',
                    '—Token of Gratitude at opening and closing ceremony',
                    '—Dedicated Instagram post',
                    '—Mystery QR Boards placed across venue — scanning leads directly to your brand',
                    '—Access to our delegate network',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[#140A2C]/90 border border-[#D4AF37]/30 space-y-5 shadow-xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold block">
                      BEST FOR
                    </span>
                    <p className="text-xs sm:text-sm text-[#FAF5EF]">
                      Local businesses, cafés, jewellery boutiques, coaching centres, first-time sponsors.
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-[#241344]">
                    <span className="text-[10px] font-mono text-[#C084FC] uppercase tracking-widest font-bold block">
                      WHY IT WORKS
                    </span>
                    <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed">
                      QR Boards are not passive. They are active delegates scan, visit, and remember.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => jumpToSlide(15)}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs font-mono transition-all shadow-md cursor-pointer text-center"
                >
                  Confirm Bronze Tier (₹10,000) →
                </button>
              </div>
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 9: SILVER PARTNER
      --------------------------------------------------------- */
      case 9:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <div className="space-y-1 border-b border-[#D4AF37]/25 pb-4">
              <span className="text-[10px] font-mono text-[#D4AF37] tracking-[0.2em] uppercase font-bold">
                SPONSORSHIP TIER
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-200">
                Silver Partner
              </h2>
              <p className="text-xl sm:text-2xl font-mono text-white font-bold pt-1">
                Investment: ₹20,000
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#0E0720]/90 border border-slate-400/35 space-y-4 shadow-xl">
                <h3 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Everything in Bronze, plus:
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-[#FAF5EF]">
                  {[
                    '—Instagram Reels featuring your brand',
                    '—Branded Photo Booth — delegates photograph themselves, share on social media, your brand travels with every post',
                    '—Discount coupons inserted into every delegate kit',
                    '—Brand mention on official website',
                    '—Brand mention in official brochure',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-slate-300 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[#140A2C]/90 border border-[#D4AF37]/30 space-y-5 shadow-xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold block">
                      BEST FOR
                    </span>
                    <p className="text-xs sm:text-sm text-[#FAF5EF]">
                      Fashion brands, F&amp;B outlets, EdTech platforms, universities, lifestyle brands.
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-[#241344]">
                    <span className="text-[10px] font-mono text-[#C084FC] uppercase tracking-widest font-bold block">
                      WHY IT WORKS
                    </span>
                    <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed">
                      The Photo Booth turns 200 delegates into 200 content creators for your brand.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => jumpToSlide(15)}
                  className="w-full py-2.5 rounded-xl bg-slate-200 hover:bg-white text-black font-bold text-xs font-mono transition-all shadow-md cursor-pointer text-center"
                >
                  Confirm Silver Tier (₹20,000) →
                </button>
              </div>
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 10: GOLD PARTNER
      --------------------------------------------------------- */
      case 10:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <div className="space-y-1 border-b border-[#D4AF37]/25 pb-4">
              <span className="text-[10px] font-mono text-[#D4AF37] tracking-[0.2em] uppercase font-bold">
                SPONSORSHIP TIER
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-yellow-400">
                Gold Partner
              </h2>
              <p className="text-xl sm:text-2xl font-mono text-white font-bold pt-1">
                Investment: 35,000
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#0E0720]/90 border border-yellow-500/40 space-y-4 shadow-xl">
                <h3 className="text-sm font-mono font-bold text-yellow-400 uppercase tracking-wider">
                  Everything in Silver, plus:
                </h3>
                <ul className="space-y-3.5 text-xs sm:text-sm text-[#FAF5EF]">
                  {[
                    '—Short brand presentation on projector during opening or closing ceremony',
                    '—Branded stationery inside every delegate kit',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[#140A2C]/90 border border-[#D4AF37]/30 space-y-5 shadow-xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold block">
                      BEST FOR
                    </span>
                    <p className="text-xs sm:text-sm text-[#FAF5EF]">
                      Stationery brands, EdTech platforms, universities, book publishers.
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-[#241344]">
                    <span className="text-[10px] font-mono text-[#C084FC] uppercase tracking-widest font-bold block">
                      WHY IT WORKS
                    </span>
                    <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed">
                      Branded stationery enters the delegate's bag, goes home with them, and is used
                      for weeks after the summit.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => jumpToSlide(15)}
                  className="w-full py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs font-mono transition-all shadow-md cursor-pointer text-center"
                >
                  Confirm Gold Tier (₹35,000) →
                </button>
              </div>
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 11: PLATINUM PARTNER
      --------------------------------------------------------- */
      case 11:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <div className="space-y-1 border-b border-[#D4AF37]/25 pb-4">
              <span className="text-[10px] font-mono text-[#D4AF37] tracking-[0.2em] uppercase font-bold">
                SPONSORSHIP TIER
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-purple-300">
                Platinum Partner
              </h2>
              <p className="text-xl sm:text-2xl font-mono text-white font-bold pt-1">
                Investment: ₹40,000–50,000
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#0E0720]/90 border border-purple-400/40 space-y-4 shadow-xl">
                <h3 className="text-sm font-mono font-bold text-purple-300 uppercase tracking-wider">
                  Everything in Gold, plus:
                </h3>
                <ul className="space-y-3.5 text-xs sm:text-sm text-[#FAF5EF]">
                  {[
                    '—Branded Quiz — interactive session with 200+ delegates',
                    '—On-ground stall at the venue',
                    '—Branded wearable — lanyard, wristband, or badge for delegates',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[#140A2C]/90 border border-[#D4AF37]/30 space-y-5 shadow-xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold block">
                      BEST FOR
                    </span>
                    <p className="text-xs sm:text-sm text-[#FAF5EF]">
                      Jewellery brands, universities, headline sponsors, national FMCG brands.
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-[#241344]">
                    <span className="text-[10px] font-mono text-[#C084FC] uppercase tracking-widest font-bold block">
                      WHY IT WORKS
                    </span>
                    <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed">
                      Wearables turn every delegate into a walking billboard for your brand — for 23
                      hours across two days.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => jumpToSlide(15)}
                  className="w-full py-2.5 rounded-xl bg-purple-400 hover:bg-purple-300 text-black font-bold text-xs font-mono transition-all shadow-md cursor-pointer text-center"
                >
                  Confirm Platinum Tier (₹40,000–50,000) →
                </button>
              </div>
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 12: TITLE PARTNER
      --------------------------------------------------------- */
      case 12:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <div className="space-y-1 border-b border-[#D4AF37]/25 pb-4">
              <span className="text-[10px] font-mono text-[#D4AF37] tracking-[0.2em] uppercase font-bold">
                SPONSORSHIP TIER
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-amber-400">
                Title Partner
              </h2>
              <p className="text-xl sm:text-2xl font-mono text-white font-bold pt-1">
                Investment: ₹75,000–1,00,000
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#0E0720]/90 border border-amber-400/50 space-y-4 shadow-xl">
                <h3 className="text-sm font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Everything in Platinum, plus:
                </h3>
                <ul className="space-y-3.5 text-xs sm:text-sm text-[#FAF5EF]">
                  {[
                    '—Event naming rights — "Aequitas Summit 2026, co-presented your brand"',
                    '—Logo on all materials — stage backdrop, certificates, delegate kits, website, brochure, social media',
                    '—Priority branding on all digital and print assets',
                    '—First right of access for Aequitas Summit 2027',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[#140A2C]/90 border border-[#D4AF37]/30 space-y-5 shadow-xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold block">
                      BEST FOR
                    </span>
                    <p className="text-xs sm:text-sm text-[#FAF5EF]">
                      Headline brands seeking market leadership, universities building regional presence,
                      jewellery houses positioning as youth-facing.
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-[#241344]">
                    <span className="text-[10px] font-mono text-[#C084FC] uppercase tracking-widest font-bold block">
                      WHY IT WORKS
                    </span>
                    <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed">
                      Naming rights make your brand inseparable from the summit. Every mention of the
                      event carries your name.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => jumpToSlide(15)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-black font-extrabold text-xs font-mono transition-all shadow-lg cursor-pointer text-center"
                >
                  Secure Exclusive Title Rights (₹75k–1L) →
                </button>
              </div>
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 13: HOW YOUR BRAND SHOWS UP ON THE GROUND
      --------------------------------------------------------- */
      case 13:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                <span>On-Ground Brand Touchpoints</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FAF5EF]">
                How your brand shows up on the ground
              </h2>
            </div>

            <div className="rounded-2xl border border-[#D4AF37]/35 overflow-hidden bg-[#0C061D]/90 shadow-2xl backdrop-blur-md">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#1C0E3C] border-b border-[#D4AF37]/30 text-[#D4AF37] font-mono text-[11px] sm:text-xs uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6">ACTIVATION</th>
                      <th className="py-3.5 px-4 sm:px-6">HOW IT WORKS</th>
                      <th className="py-3.5 px-4 sm:px-6">TIER</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        activation: 'Mystery QR Boards',
                        howItWorks: 'Placed at key points. Delegates scan → land on your brand page.',
                        tier: 'Bronze+',
                        badge: 'bg-amber-600/30 text-amber-300 border-amber-500/40',
                      },
                      {
                        activation: 'Photo Booth',
                        howItWorks: 'Branded backdrop. Delegates pose, share, tag.',
                        tier: 'Silver+',
                        badge: 'bg-slate-400/30 text-slate-200 border-slate-400/40',
                      },
                      {
                        activation: 'Delegate Kit Inserts',
                        howItWorks: 'Coupons, stationery, samples — inside every kit.',
                        tier: 'Silver+',
                        badge: 'bg-slate-400/30 text-slate-200 border-slate-400/40',
                      },
                      {
                        activation: 'Projector Presentation',
                        howItWorks:
                          '200+ delegates, undivided attention, opening/closing ceremony.',
                        tier: 'Gold+',
                        badge: 'bg-yellow-500/30 text-yellow-300 border-yellow-500/40',
                      },
                      {
                        activation: 'Branded Stationery',
                        howItWorks: 'Inside every delegate kit. Taken home, used for weeks.',
                        tier: 'Gold+',
                        badge: 'bg-yellow-500/30 text-yellow-300 border-yellow-500/40',
                      },
                      {
                        activation: 'Quiz Activation',
                        howItWorks: 'Branded quiz. Delegates engage with your brand directly.',
                        tier: 'Platinum+',
                        badge: 'bg-purple-500/30 text-purple-300 border-purple-500/40',
                      },
                      {
                        activation: 'On-Ground Stall',
                        howItWorks: 'Face-to-face with 300+ delegates and their families.',
                        tier: 'Platinum+',
                        badge: 'bg-purple-500/30 text-purple-300 border-purple-500/40',
                      },
                      {
                        activation: 'Wearables',
                        howItWorks: 'Lanyards, wristbands, badges — worn for the full event.',
                        tier: 'Platinum+',
                        badge: 'bg-purple-500/30 text-purple-300 border-purple-500/40',
                      },
                      {
                        activation: 'Naming Rights',
                        howItWorks: '"Presented by [Brand]" on every asset.',
                        tier: 'Title',
                        badge: 'bg-amber-400/30 text-amber-200 border-amber-400/50 font-bold',
                      },
                    ].map((row, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-[#241344] transition-colors ${
                          idx % 2 === 0 ? 'bg-[#0E0720]/80' : 'bg-[#140A2C]/60'
                        }`}
                      >
                        <td className="py-3 px-4 sm:px-6 font-semibold text-[#FAF5EF]">
                          {row.activation}
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-[#C4BBA3]">{row.howItWorks}</td>
                        <td className="py-3 px-4 sm:px-6">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${row.badge}`}
                          >
                            {row.tier}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 14: WHAT YOU RECEIVE AFTER THE SUMMIT
      --------------------------------------------------------- */
      case 14:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-left">
            <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/35 text-sky-300 text-xs font-mono font-bold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                <span>Accountability & Analytics</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FAF5EF]">
                What you receive after the summit
              </h2>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-[#0F0824]/90 border border-[#D4AF37]/35 shadow-xl space-y-4">
              {[
                '—Post-event report with photos and engagement summary',
                '—QR scan data (Bronze and above)',
                '—Social media reach summary',
                '—Delegate feedback snapshot',
                '—Brand mention in post-event thank-you post',
                '—Naming rights recognition in all post-event communication (Title Partner)',
              ].map((bullet, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#FAF5EF]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-[#D4AF37]/15 via-[#7C3AED]/15 to-[#D4AF37]/15 border border-[#D4AF37]/35 text-center">
              <p className="text-base sm:text-2xl font-serif italic font-bold text-[#FFF5DC]">
                "We deliver proof."
              </p>
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 15: REMITTANCE & BANK DETAILS
      --------------------------------------------------------- */
      case 15:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-center">
            <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
                <QrCode className="w-3.5 h-3.5" />
                <span>Instant Financial Settlement</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FAF5EF]">
                Drop a hint &amp; we’ll catch you!
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Official PhonePe / UPI QR Code */}
              <div className="p-6 rounded-2xl bg-white text-black shadow-2xl flex flex-col items-center justify-center space-y-3">
                <div className="p-2 border-2 border-dashed border-[#5F259F]/40 rounded-xl w-full max-w-[240px]">
                  <img
                    src="/payment-qr.jpg"
                    alt="Official Payment QR"
                    className="w-full h-auto rounded-lg object-contain mx-auto shadow-sm"
                  />
                </div>
                <div className="text-center space-y-1">
                  <span className="text-[11px] font-mono text-[#5F259F] font-bold uppercase tracking-wider block">
                    PhonePe / UPI Corporate Gateway
                  </span>
                  <p className="text-[10px] text-gray-600">
                    Scan via PhonePe, GPay, Paytm, or any Corporate UPI App
                  </p>
                </div>
              </div>

              {/* Bank Account Details */}
              <div className="p-6 rounded-2xl bg-[#0E0720]/95 border border-[#D4AF37]/45 text-left space-y-4 shadow-xl">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
                    Official Banking Credentials
                  </span>
                  <h3 className="text-lg font-serif font-bold text-white">
                    Direct NEFT / RTGS / IMPS
                  </h3>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#140A2C] border border-[#241344] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#C4BBA3] block">Account Number</span>
                      <span className="font-mono text-sm sm:text-base font-bold text-white tracking-wider">
                        0116040100017669
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy('0116040100017669', 'acc')}
                      className="p-2 rounded-lg bg-[#2B1055] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#070A14] transition-colors cursor-pointer"
                      title="Copy Account Number"
                    >
                      {copiedField === 'acc' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-[#140A2C] border border-[#241344] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#C4BBA3] block">IFSC Code</span>
                      <span className="font-mono text-sm sm:text-base font-bold text-white tracking-wider">
                        JAKA0GNGYAL{' '}
                        <span className="text-xs text-amber-400 font-normal">(that’s a zero)</span>
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy('JAKA0GNGYAL', 'ifsc')}
                      className="p-2 rounded-lg bg-[#2B1055] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#070A14] transition-colors cursor-pointer"
                      title="Copy IFSC Code"
                    >
                      {copiedField === 'ifsc' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#241344] space-y-1">
                  <p className="text-xs text-[#C4BBA3] font-mono">
                    Call or text on this number for any related issues:
                  </p>
                  <a
                    href="tel:+918899346704"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-[#D4AF37] hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>+91 88993 46704</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      /* ---------------------------------------------------------
         SLIDE 16: CONTACT & CONCLUSION
      --------------------------------------------------------- */
      case 16:
        return (
          <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto text-center">
            <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FAF5EF]">
                Partner with Aequitas Summit 2026
              </h2>
              <p className="text-sm sm:text-base text-[#D4AF37] font-mono">
                29–30 October 2026 | Radisson Blu Hotel, Jammu
              </p>
              <div className="inline-block px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/35 text-rose-300 font-mono text-xs font-bold uppercase mt-2">
                Limited sponsorship slots. First-come, first-confirmed.
              </div>
            </div>

            {/* Core Reach Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0D071F]/95 border border-[#D4AF37]/45 shadow-2xl max-w-2xl mx-auto space-y-6 text-left">
              <div className="flex items-center gap-3 pb-3 border-b border-[#D4AF37]/20">
                <div className="w-10 h-10 rounded-xl bg-[#2B1055] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] font-bold">
                  ✦
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider block">
                    Direct Secretariat Contact Desk
                  </span>
                  <p className="text-xs text-[#C4BBA3]">Official Brand Partnership &amp; Corporate Relations</p>
                </div>
              </div>

              {/* Official Contacts Demanded by User */}
              <div className="space-y-3">
                <span className="text-[10.5px] font-mono text-[#FAF5EF] uppercase tracking-wider font-bold block">
                  Official Phone &amp; WhatsApp Contacts:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Contact 1 */}
                  <div className="p-3.5 rounded-xl bg-[#140A2C] border border-[#D4AF37]/35 space-y-2">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
                      Lead Sponsorship Desk
                    </span>
                    <a
                      href="tel:+918899346704"
                      className="text-sm font-mono font-bold text-white hover:text-[#D4AF37] flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>+91 88993 46704</span>
                    </a>
                    <a
                      href="https://wa.me/918899346704?text=Hello%20Aequitas%20Summit%20Team%2C%20we%20are%20interested%20in%20discussing%20sponsorship%20opportunities."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline font-mono"
                    >
                      <span>Chat on WhatsApp →</span>
                    </a>
                  </div>

                  {/* Contact 2 */}
                  <div className="p-3.5 rounded-xl bg-[#140A2C] border border-[#D4AF37]/35 space-y-2">
                    <span className="text-[10px] font-mono text-purple-300 font-bold uppercase block">
                      Directorate Desk
                    </span>
                    <a
                      href="tel:+919548499951"
                      className="text-sm font-mono font-bold text-white hover:text-[#D4AF37] flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>+91 95484 99951</span>
                    </a>
                    <a
                      href="https://wa.me/919548499951?text=Hello%20Aequitas%20Summit%20Team%2C%20we%20are%20interested%20in%20discussing%20sponsorship%20opportunities."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-purple-300 hover:underline font-mono"
                    >
                      <span>Chat on WhatsApp →</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Email & Instagram Channels */}
              <div className="space-y-2.5 pt-2 border-t border-[#241344]">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <a
                    href="mailto:aastitvaalliancespr@gmail.com"
                    className="font-mono text-[#FAF5EF] hover:text-[#D4AF37] hover:underline break-all"
                  >
                    aastitvaalliancespr@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Phone className="w-4 h-4 text-[#C084FC] shrink-0" />
                  <span className="font-mono text-[#C4BBA3]">
                    Additional Line: 9596372727
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                  <a
                    href="https://www.instagram.com/alliancesby_aastitva_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[#FAF5EF] hover:text-[#D4AF37] hover:underline"
                  >
                    @alliancesby_aastitva_
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Official Motto */}
            <div className="pt-4 border-t border-[#D4AF37]/20">
              <p className="font-mono text-xs text-[#D4AF37] tracking-[0.25em] uppercase font-bold">
                AEQUITAS SUMMIT 2026 | VERITAS | AEQUITAS | VOX
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#06030F] text-[#FAF5EF] font-sans relative overflow-x-hidden selection:bg-[#D4AF37] selection:text-[#070A14] flex flex-col justify-between">
      {/* 1. Deep Violet Real-Life Nebula Galactic Canvas */}
      <VioletNebulaCanvas />

      {/* 2. Atmospheric Center Violet Spotlight */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[1200px] h-[550px] bg-gradient-to-b from-[#7C3AED]/20 via-[#4C1D95]/15 to-transparent blur-[160px] pointer-events-none z-0" />

      {/* 3. Executive Proposal Portal Topbar */}
      <header className="sticky top-0 z-40 bg-[#070314]/95 border-b border-[#D4AF37]/30 backdrop-blur-xl px-3 sm:px-8 py-2.5 sm:py-3.5 select-none shadow-2xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Brand & Page Designation */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate('home');
                } else {
                  window.location.href = '/';
                }
              }}
              className="flex items-center gap-2 text-left cursor-pointer focus:outline-none"
            >
              <img
                src="/aequitas-logo.png"
                alt="Aequitas Crest"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#D4AF37] bg-black object-cover"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-serif font-bold text-xs sm:text-base text-white tracking-wide truncate">
                    Offer Sponsorships
                  </span>
                  <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] font-mono font-bold text-[8px] sm:text-[9px] uppercase tracking-wider shrink-0">
                    Oct 29–30, 2026
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#C4BBA3] font-mono truncate">
                  Aequitas Summit 2026 • Official Corporate Proposal Deck
                </p>
              </div>
            </button>
          </div>

          {/* Right Controls: Mode Toggle & Audio */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* View Mode Toggle: Slide Deck vs Continuous Stream */}
            <div className="flex items-center p-0.5 rounded-xl bg-[#140A2C] border border-[#D4AF37]/30 text-xs font-mono">
              <button
                onClick={() => {
                  sounds.playTap();
                  setViewMode('deck');
                }}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer text-[10.5px] ${
                  viewMode === 'deck'
                    ? 'bg-[#D4AF37] text-[#070A14] font-bold shadow-sm'
                    : 'text-[#C4BBA3] hover:text-white'
                }`}
                title="Browse slide-by-slide with executive transitions"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span className="hidden sm:inline">Slide Deck</span>
              </button>
              <button
                onClick={() => {
                  sounds.playTap();
                  setViewMode('continuous');
                }}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer text-[10.5px] ${
                  viewMode === 'continuous'
                    ? 'bg-[#D4AF37] text-[#070A14] font-bold shadow-sm'
                    : 'text-[#C4BBA3] hover:text-white'
                }`}
                title="Continuous uninterrupted reading flow"
              >
                <LayoutGrid className="w-3 h-3" />
                <span className="hidden sm:inline">Continuous Stream</span>
              </button>
            </div>

            {/* Sound FX Toggle */}
            <button
              onClick={handleSoundToggle}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer min-h-[34px] min-w-[34px] flex items-center justify-center ${
                soundEnabled
                  ? 'bg-[#D4AF37] text-[#070A14] border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                  : 'bg-[#140A2C] text-[#C4BBA3] border-[#D4AF37]/30 hover:text-[#FAF5EF]'
              }`}
              title={soundEnabled ? 'Sound FX Enabled' : 'Enable Sound FX'}
              aria-label="Toggle Sound Effects"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* 4. MAIN PROPOSAL CONTAINER */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-8 flex flex-col justify-center">
        {/* ========================================================
            VIEW MODE A: SLIDE DECK VIEW (WITH CONTINUATION HANDOFF)
           ======================================================== */}
        {viewMode === 'deck' ? (
          <div className="space-y-4 sm:space-y-6">
            {/* Slide Progress Stepper Header */}
            <div className="bg-[#0C061D]/90 border border-[#D4AF37]/30 rounded-2xl p-3.5 sm:p-5 backdrop-blur-md shadow-lg space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                  <span className="text-[#D4AF37] font-bold text-xs tracking-wider uppercase">
                    Slide {currentSlide.toString().padStart(2, '0')} of {totalSlides}
                  </span>
                </div>
                <div className="text-[#C4BBA3] text-[11px] truncate max-w-sm">
                  {SLIDE_TITLES[currentSlide]}
                </div>
                <div className="text-[10px] text-[#A39B88] font-mono hidden md:block">
                  Use [←] / [→] keys to navigate
                </div>
              </div>

              {/* Linear Progress Bar */}
              <div className="w-full h-1.5 sm:h-2 rounded-full bg-[#180C34] border border-[#D4AF37]/20 overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#D4AF37] via-[#C084FC] to-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.6)]"
                  initial={{ width: '6%' }}
                  animate={{ width: `${(currentSlide / totalSlides) * 100}%` }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                />
              </div>

              {/* Clickable Quick Jump Pills */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
                {Array.from({ length: totalSlides }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => jumpToSlide(num)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-all shrink-0 cursor-pointer ${
                      currentSlide === num
                        ? 'bg-[#D4AF37] text-black font-bold shadow-md scale-105'
                        : num < currentSlide
                        ? 'bg-[#180C34] text-purple-300 border border-purple-500/30 hover:border-purple-400'
                        : 'bg-[#0E0720]/60 text-[#A39B88] hover:text-white border border-transparent'
                    }`}
                  >
                    {num.toString().padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>

            {/* Slide Body Card with Animated Transitions */}
            <div className="bg-[#0B061A]/90 border border-[#D4AF37]/35 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.9)] relative overflow-hidden min-h-[460px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`slide-${currentSlide}`}
                  initial={{ opacity: 0, x: direction === 'forward' ? 24 : -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction === 'forward' ? -24 : 24 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex-1"
                >
                  {renderSlideContent(currentSlide)}
                </motion.div>
              </AnimatePresence>

              {/* CONTINUATION HAND-OFF CARD (Seamless narrative link to the next slide) */}
              {currentSlide < totalSlides && (
                <div className="mt-8 pt-4 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                  <div className="text-left text-[#C4BBA3] flex items-center gap-2">
                    <span className="text-[#D4AF37] font-bold">Next Insight:</span>
                    <span className="text-[#FAF5EF]">
                      Slide {(currentSlide + 1).toString().padStart(2, '0')} — {SLIDE_TITLES[currentSlide + 1]}
                    </span>
                  </div>
                  <button
                    onClick={goToNextSlide}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-black font-extrabold shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>Continue to Slide {(currentSlide + 1).toString().padStart(2, '0')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Master Bottom Navigation Bar */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={goToPrevSlide}
                disabled={currentSlide === 1}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border text-xs sm:text-sm font-mono font-bold transition-all min-h-[42px] cursor-pointer ${
                  currentSlide === 1
                    ? 'opacity-30 border-white/10 text-white/30 cursor-not-allowed'
                    : 'bg-[#140A2C] border-[#D4AF37]/40 text-[#FAF5EF] hover:border-[#D4AF37] hover:bg-[#2B1055] active:scale-95'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Slide</span>
              </button>

              <div className="text-center font-mono text-[11px] text-[#A39B88]">
                <span>{currentSlide}</span> / <span>{totalSlides}</span>
              </div>

              {currentSlide < totalSlides ? (
                <button
                  type="button"
                  onClick={goToNextSlide}
                  className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#FFF5DC] to-[#D4AF37] text-[#070A14] font-mono font-extrabold text-xs sm:text-sm shadow-[0_0_18px_rgba(212,175,55,0.45)] hover:brightness-110 active:scale-95 transition-all min-h-[42px] cursor-pointer"
                >
                  <span>Next Slide</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => jumpToSlide(15)}
                  className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-extrabold text-xs sm:text-sm shadow-lg active:scale-95 transition-all min-h-[42px] cursor-pointer"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Sponsorship Terminal</span>
                </button>
              )}
            </div>
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
                className="bg-[#0B061A]/90 border border-[#D4AF37]/35 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.9)] relative space-y-6"
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
