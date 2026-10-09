import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Page, SummitConfig, CountdownTime } from '../types';
import { COMMITTEES } from '../data';
import { Astitva3DCanvas } from '../components/Astitva3DCanvas';
import { DiplomaticCommandConsole } from '../components/DiplomaticCommandConsole';
import { ScrollReveal } from '../components/ScrollReveal';
import { OptimizedImage } from '../components/OptimizedImage';
import { GlobalRegistrationModal } from '../components/GlobalRegistrationModal';
import { sounds } from '../utils/soundEffects';
import { MagneticElement } from '../components/motion/MagneticElement';
import { TextReveal } from '../components/motion/TextReveal';
import { SpatialFloatingElement } from '../components/motion/SpatialFloatingElement';
import { PerspectiveCard } from '../components/motion/PerspectiveCard';
import { CinematicScene } from '../components/cinematic/CinematicScene';
import { CinematicMaskReveal } from '../components/cinematic/CinematicMaskReveal';
import { FilmConduitConnector } from '../components/cinematic/FilmConduitConnector';
import {
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  Users,
  Award,
  Play,
  X,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Landmark,
  Layers,
  FileText,
  Send,
  Zap,
  Maximize2,
  ChevronLeft,
  Quote,
  Camera,
  HeartHandshake,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface Props {
  summitConfig: SummitConfig;
  countdown: CountdownTime;
  onNavigate?: (page: Page) => void;
}

export const SummitPage: React.FC<Props> = ({ summitConfig, countdown, onNavigate = () => {} }) => {
  const [globalModalOpen, setGlobalModalOpen] = useState(false);
  const [modalPreselectedCommittee, setModalPreselectedCommittee] = useState<string>('');
  const [activeVenuePhoto, setActiveVenuePhoto] = useState<number | null>(null);
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  // Verified Official Radisson Blu Hotel, Jammu Venue Assets (Local High-Resolution Imagery)
  const venuePhotos = [
    {
      id: 1,
      title: 'Radisson Blu Hotel, Jammu • Facade & Architecture',
      tag: 'Grand Facade & Grounds',
      highlight: '5-Star Landmark • Narwal Bala Bypass',
      desc: 'Upscale five-star landmark on Narwal Bala Bypass, featuring state-of-the-art conference facilities, diplomatic suites, and expansive landscaped lawns for open-air concourses.',
      image: '/images/venue/radisson-blu-facade.png',
    },
    {
      id: 2,
      title: 'Grand Foyer & Executive Atrium Lounge',
      tag: 'Grand Executive Atrium',
      highlight: 'Double-Height Assembly Lounge',
      desc: 'Magnificent double-height architectural lobby with artisan woodwork, ambient chandelier illumination, and dedicated registration suites for delegates and faculty.',
      image: '/images/venue/radisson-blu-foyer-atrium.jpg',
    },
    {
      id: 3,
      title: 'Diplomatic Entrance & Porte-Cochère',
      tag: 'VIP Arrival Concourse',
      highlight: 'High-Security Convoy Reception',
      desc: 'Dedicated VIP arrival concourse and valet reception configured for high-level security, executive board arrivals, and international delegations.',
      image: '/images/venue/radisson-blu-entrance.png',
    },
    {
      id: 4,
      title: 'Illuminated Convention Wing & Lawns',
      tag: 'Convention Wing & Lawns',
      highlight: 'Over 40,000 Sq Ft Capacity',
      desc: 'Stunning evening panorama of the Radisson Blu summit complex hosting over 40,000 sq ft of indoor ballrooms, committee rooms, and banqueting facilities.',
      image: '/images/venue/radisson-blu-exterior-twilight.png',
    },
  ];

  const handleOpenQuickRegister = (commCode?: string) => {
    sounds.playTap();
    if (commCode) {
      setModalPreselectedCommittee(commCode);
    }
    setGlobalModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    sounds.playTap();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen font-sans pb-24 text-left">
      {/* ========================================================================= */}
      {/* 1. HERO — "NOW PLAYING" NETFLIX-STYLE LIVE SUMMIT (PDF Page 5 Section 1)  */}
      {/* ========================================================================= */}
      <CinematicScene shotType="establishing-shot" intensity={0.9}>
        <ScrollReveal direction="zoom" delay={0.05}>
          <section className="relative min-h-[72vh] sm:min-h-[82vh] flex items-center pb-12 px-4 sm:px-8 overflow-hidden">
            {/* Background Cinematic Atmosphere */}
            <div className="absolute inset-0 z-0">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600"
                alt="Aequitas Summit Backdrop"
                className="w-full h-full object-cover opacity-20 filter brightness-75 contrast-125"
                priority={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090614] via-[#0D0822]/90 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
              <div className="lg:col-span-7 space-y-6 text-left">
                {/* Netflix-Style "Now Playing" Status Header Badge */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-4 py-1.5 rounded-full bg-rose-600/35 text-rose-200 border border-rose-500/60 font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(225,29,72,0.4)] font-jakarta">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    <span>NOW PLAYING // REAL-TIME SUMMIT</span>
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-[#581C87]/40 border border-[#C084FC]/40 text-[#E9D5FF] font-mono font-bold text-xs uppercase tracking-wider font-jakarta">
                    Academic Event Management + Network Organisation
                  </span>
                </div>

                <CinematicMaskReveal variant="gold-trace-sweep" duration={0.85}>
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-cormorant font-extrabold gold-gradient-text leading-none tracking-tight">
                    <TextReveal text={summitConfig.name} duration={0.6} />
                  </h1>
                </CinematicMaskReveal>

                <p className="text-base sm:text-xl text-[#DDD6FE] max-w-2xl font-light leading-relaxed font-jakarta">
                  {summitConfig.tagline}
                </p>

                {/* Quick Conference Matrix HUD */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <SpatialFloatingElement preset="card-float" speed={0.9} delay={0}>
                    <div className="p-3.5 rounded-2xl bg-[#140C2C]/90 border border-[#A855F7]/35 backdrop-blur-md">
                      <div className="flex items-center gap-2 text-[10px] text-[#D4AF37] font-mono uppercase font-bold">
                        <Calendar className="w-3.5 h-3.5" /> Date & Venue
                      </div>
                      <p className="text-xs font-bold text-[#FAF5EF] mt-1 font-jakarta">{summitConfig.dates || 'October 29-30, 2026'}</p>
                    </div>
                  </SpatialFloatingElement>

                  <SpatialFloatingElement preset="card-float" speed={1.1} delay={0.25}>
                    <div className="p-3.5 rounded-2xl bg-[#140C2C]/90 border border-[#A855F7]/35 backdrop-blur-md">
                      <div className="flex items-center gap-2 text-[10px] text-[#D4AF37] font-mono uppercase font-bold">
                        <Landmark className="w-3.5 h-3.5" /> Academic Format
                      </div>
                      <p className="text-xs font-bold text-[#FAF5EF] mt-1 font-jakarta">6 Model UN Councils</p>
                    </div>
                  </SpatialFloatingElement>

                  <SpatialFloatingElement preset="card-float" speed={0.95} delay={0.5} className="col-span-2 sm:col-span-1">
                    <div className="p-3.5 rounded-2xl bg-[#140C2C]/90 border border-[#A855F7]/35 backdrop-blur-md">
                      <div className="flex items-center gap-2 text-[10px] text-[#D4AF37] font-mono uppercase font-bold">
                        <Users className="w-3.5 h-3.5" /> Delegate Cap
                      </div>
                      <p className="text-xs font-bold text-emerald-400 mt-1 font-jakarta">By Delegation Application</p>
                    </div>
                  </SpatialFloatingElement>
                </div>

                {/* PDF Specified Action Buttons: "Register Now" and "View Agenda" */}
                <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 pt-2 relative z-20 w-full">
                  <MagneticElement strength={0.35} className="w-full sm:w-auto">
                    <button
                      onClick={() => handleOpenQuickRegister()}
                      className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-2xl shimmer-btn text-[#070A14] font-extrabold text-sm shadow-[0_10px_35px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 min-touch cursor-pointer btn-sheen-sweep min-h-[44px]"
                    >
                      <Sparkles className="w-4 h-4 fill-current" />
                      <span>Register Now</span>
                    </button>
                  </MagneticElement>

                  <MagneticElement strength={0.3} className="w-full sm:w-auto">
                    <button
                      onClick={() => scrollToSection('councils-agenda')}
                      className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-2xl bg-[#1C103B] hover:bg-[#2A1654] border border-[#A855F7]/50 text-[#E9D5FF] font-bold text-sm flex items-center justify-center gap-2 shadow-lg smooth-button-hover group min-touch font-jakarta cursor-pointer min-h-[44px]"
                    >
                      <FileText className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                      <span>View Agenda</span>
                    </button>
                  </MagneticElement>
                </div>
              </div>

              {/* 3D Celestial Planet Globe Orbiting Core (Compact, bounded & layered safely on mobile) */}
              <div className="lg:col-span-5 w-full h-[250px] sm:h-[450px] max-w-[280px] sm:max-w-none mx-auto relative z-10 flex items-center justify-center mt-4 sm:mt-0">
                <SpatialFloatingElement preset="orbital" speed={0.65} depthLayer="midground">
                  <Astitva3DCanvas variant="summit" onOpenRegister={() => handleOpenQuickRegister()} />
                </SpatialFloatingElement>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </CinematicScene>

      {/* ========================================================================= */}
      {/* 2. FULL-WIDTH LIVE COUNTDOWN — POWERED BY AASTITVA ALLIANCES (PDF Page 5 S2)*/}
      {/* ========================================================================= */}
      <CinematicScene shotType="theatrical-prop" intensity={0.9} cameraTilt={true}>
        <ScrollReveal direction="up" delay={0.1}>
          <section id="summit-clock-banner" className="bg-gradient-to-r from-[#D4AF37] via-[#FFF5DC] to-[#D4AF37] text-[#070A14] py-7 px-4 sm:px-8 shadow-2xl relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="space-y-0.5">
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#78350F] flex items-center justify-center md:justify-start gap-1 font-jakarta">
                  <Sparkles className="w-3 h-3 text-[#78350F] fill-current" />
                  <span>LIVE COUNTDOWN • POWERED BY AASTITVA ALLIANCES</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-cormorant font-bold text-[#070A14]">
                  Countdown to Opening Gavel
                </h3>
              </div>

              {/* Glowing Digital Digits (Responsive for narrow mobile screens) */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-4 md:gap-6 font-mono font-bold text-xl sm:text-3xl md:text-4xl w-full sm:w-auto">
                <div className="bg-[#070A14] text-[#D4AF37] px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-xl flex flex-col items-center min-w-[50px] sm:min-w-[65px]">
                  <span>{countdown.days}</span>
                  <span className="text-[8px] sm:text-[9px] font-sans font-semibold text-[#C4BBA3] uppercase tracking-wider">Days</span>
                </div>
                <span className="text-[#070A14] font-black text-sm sm:text-xl">:</span>
                <div className="bg-[#070A14] text-[#FAF5EF] px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-xl flex flex-col items-center min-w-[50px] sm:min-w-[65px]">
                  <span>{countdown.hours.toString().padStart(2, '0')}</span>
                  <span className="text-[8px] sm:text-[9px] font-sans font-semibold text-[#C4BBA3] uppercase tracking-wider">Hours</span>
                </div>
                <span className="text-[#070A14] font-black text-sm sm:text-xl">:</span>
                <div className="bg-[#070A14] text-[#FAF5EF] px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-xl flex flex-col items-center min-w-[50px] sm:min-w-[65px]">
                  <span>{countdown.minutes.toString().padStart(2, '0')}</span>
                  <span className="text-[8px] sm:text-[9px] font-sans font-semibold text-[#C4BBA3] uppercase tracking-wider">Mins</span>
                </div>
                <span className="text-[#070A14] font-black text-sm sm:text-xl">:</span>
                <div className="bg-[#070A14] text-emerald-400 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-xl flex flex-col items-center min-w-[50px] sm:min-w-[65px]">
                  <span>{countdown.seconds.toString().padStart(2, '0')}</span>
                  <span className="text-[8px] sm:text-[9px] font-sans font-semibold text-[#C4BBA3] uppercase tracking-wider">Secs</span>
                </div>
              </div>

              <MagneticElement strength={0.3}>
                <button
                  onClick={() => handleOpenQuickRegister()}
                  className="px-6 py-3 rounded-xl bg-[#070A14] text-[#FAF5EF] hover:text-[#D4AF37] border border-[#D4AF37]/50 font-bold text-xs uppercase tracking-wider shadow-xl min-touch font-jakarta cursor-pointer"
                >
                  Register Seat Now →
                </button>
              </MagneticElement>
            </div>
          </section>
        </ScrollReveal>
      </CinematicScene>

      {/* Seamless Film Conduit */}
      <FilmConduitConnector label="SCENE 03 // EXECUTIVE BOARD & COMMITTEES" />

      {/* ========================================================================= */}
      {/* 3. EXECUTIVE BOARD REVEAL & COMMITTEES (PDF Page 4 & 5 Section 3)          */}
      {/* ========================================================================= */}
      <div id="councils-agenda" className="max-w-7xl mx-auto px-4 sm:px-8 pt-12 space-y-16">
        <CinematicScene shotType="tracking-shot" intensity={0.85}>
          <ScrollReveal direction="up" delay={0.1}>
            <section className="space-y-8 text-left font-jakarta">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="px-4 py-1 rounded-full bg-[#581C87]/40 border border-[#C084FC]/40 text-[#E9D5FF] text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 font-jakarta">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> Executive Board Reveal
                </span>
                <CinematicMaskReveal variant="gold-trace-sweep" duration={0.8}>
                  <h2 className="text-3xl sm:text-5xl font-cormorant font-bold gold-gradient-text">
                    Executive Board & Committee Agendas
                  </h2>
                </CinematicMaskReveal>
                <p className="text-xs sm:text-sm text-[#DDD6FE] leading-relaxed">
                  We source, vet, and allocate experienced Executive Board chairs, judges, and rapporteurs who know UN Rules of Procedure inside out—ensuring rigorous academic debate, unbiased assessment, and procedural excellence.
                </p>
              </div>

              {/* 6 Committees Reveal Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {COMMITTEES.map((comm) => (
                  <PerspectiveCard key={comm.id} maxTilt={6} scale={1.01}>
                    <div className="p-6 rounded-3xl bg-[#140C2C]/90 border border-[#A855F7]/30 shadow-xl space-y-4 hover:border-[#D4AF37] transition-all flex flex-col justify-between h-full animate-aura-pulse">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-3 py-1 rounded-full bg-[#581C87]/40 text-[#D4AF37] font-mono font-bold text-xs border border-[#C084FC]/30">
                            {comm.code}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-[#FAF5EF] font-cormorant">
                          {comm.name}
                        </h4>
                        <p className="text-xs text-[#DDD6FE] leading-relaxed line-clamp-3">
                          {comm.agenda}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#A855F7]/20 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#E9D5FF] flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#D4AF37]" /> EB Vetted by Aastitva
                        </span>
                        <button
                          onClick={() => handleOpenQuickRegister(comm.code)}
                          className="text-xs text-[#D4AF37] font-bold hover:underline cursor-pointer flex items-center gap-1"
                        >
                          Apply Council ↗
                        </button>
                      </div>
                    </div>
                  </PerspectiveCard>
                ))}
              </div>
            </section>
          </ScrollReveal>
        </CinematicScene>

        {/* 6-Council Interactive Agenda Command Console */}
        <DiplomaticCommandConsole onOpenRegister={(code) => handleOpenQuickRegister(code)} />

        {/* Seamless Film Conduit */}
        <FilmConduitConnector label="SCENE 04 // VENUE PREVIEW & PARTNERSHIP" />

        {/* ========================================================================= */}
        {/* 4. VENUE PREVIEW — RADISSON BLU HOTEL JAMMU SPOTLIGHT & GALLERY          */}
        {/* ========================================================================= */}
        <CinematicScene shotType="lens-focus" intensity={0.85}>
          <ScrollReveal direction="up" delay={0.1}>
            <section className="space-y-8 text-left font-jakarta">
              {/* Section Header */}
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="px-4 py-1.5 rounded-full bg-[#581C87]/40 border border-[#C084FC]/50 text-[#E9D5FF] text-xs font-mono font-bold uppercase tracking-widest inline-flex items-center gap-2 shadow-sm">
                  <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>OFFICIAL FIVE-STAR VENUE &amp; ACCOMMODATION PARTNER</span>
                </span>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-cormorant font-bold gold-gradient-text">
                  Radisson Blu Hotel, Jammu
                </h2>
                <p className="text-xs sm:text-base text-[#DDD6FE] leading-relaxed max-w-2xl mx-auto">
                  The official five-star home of Aequitas Summit 2026. Featuring over 40,000 sq ft of majestic convention halls, acoustic committee chambers, and luxury residential delegate rooms.
                </p>
              </div>

              {/* ENLARGED PAGE-CENTRIC SPOTLIGHT STAGE */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#D4AF37]/50 bg-[#0A0618] shadow-[0_25px_80px_rgba(0,0,0,0.85)] group">
                {/* Main Hero Image Container (Large cinematic height) */}
                <div className="relative h-80 sm:h-[460px] md:h-[540px] lg:h-[600px] w-full overflow-hidden bg-black">
                  <OptimizedImage
                    src={venuePhotos[spotlightIndex].image}
                    alt={venuePhotos[spotlightIndex].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070A14] via-[#070A14]/30 to-black/50 pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

                  {/* Top Header Floating Badges */}
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between gap-3 pointer-events-none">
                    <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#070A14]/85 border border-[#D4AF37]/40 backdrop-blur-md shadow-lg pointer-events-auto">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-[#FAF5EF] uppercase tracking-wider">
                        {venuePhotos[spotlightIndex].highlight}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        sounds.playTap();
                        setActiveVenuePhoto(venuePhotos[spotlightIndex].id);
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-[#1C103B] border border-[#D4AF37]/60 text-[#D4AF37] text-xs font-mono font-bold backdrop-blur-md shadow-lg transition-all pointer-events-auto cursor-pointer"
                      title="Inspect in Fullscreen Lightbox"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Fullscreen Zoom</span>
                    </button>
                  </div>

                  {/* Carousel Left / Right Arrows */}
                  <div className="absolute inset-y-0 left-3 sm:left-5 flex items-center">
                    <button
                      onClick={() => {
                        sounds.playTap();
                        setSpotlightIndex((prev) => (prev - 1 + venuePhotos.length) % venuePhotos.length);
                      }}
                      className="p-2.5 sm:p-3.5 rounded-full bg-[#070A14]/80 hover:bg-[#1C103B] text-[#D4AF37] border border-[#D4AF37]/40 backdrop-blur-md transition-all shadow-xl hover:scale-110 cursor-pointer"
                      aria-label="Previous Perspective"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute inset-y-0 right-3 sm:right-5 flex items-center">
                    <button
                      onClick={() => {
                        sounds.playTap();
                        setSpotlightIndex((prev) => (prev + 1) % venuePhotos.length);
                      }}
                      className="p-2.5 sm:p-3.5 rounded-full bg-[#070A14]/80 hover:bg-[#1C103B] text-[#D4AF37] border border-[#D4AF37]/40 backdrop-blur-md transition-all shadow-xl hover:scale-110 cursor-pointer"
                      aria-label="Next Perspective"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Bottom Information Glass Overlay */}
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 p-4 sm:p-6 rounded-2xl bg-[#070A14]/85 border border-[#D4AF37]/40 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-1.5 max-w-2xl text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-xs font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
                          PERSPECTIVE 0{spotlightIndex + 1} OF 0{venuePhotos.length} // {venuePhotos[spotlightIndex].tag}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-2xl font-cormorant font-bold text-[#FAF5EF]">
                        {venuePhotos[spotlightIndex].title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#DDD6FE] leading-relaxed">
                        {venuePhotos[spotlightIndex].desc}
                      </p>
                    </div>

                    {/* Quick Indicator Dots */}
                    <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                      {venuePhotos.map((v, idx) => (
                        <button
                          key={v.id}
                          onClick={() => {
                            sounds.playTap();
                            setSpotlightIndex(idx);
                          }}
                          className={`transition-all rounded-full cursor-pointer ${
                            spotlightIndex === idx
                              ? 'w-8 h-2.5 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)]'
                              : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
                          }`}
                          aria-label={`View ${v.title}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CURATED PERSPECTIVE THUMBNAILS MATRIX */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-2">
                {venuePhotos.map((venue, idx) => {
                  const isActive = spotlightIndex === idx;
                  return (
                    <div
                      key={venue.id}
                      onClick={() => {
                        sounds.playTap();
                        setSpotlightIndex(idx);
                      }}
                      className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                        isActive
                          ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/60 shadow-[0_0_20px_rgba(212,175,55,0.35)] scale-[1.02]'
                          : 'border-[#A855F7]/30 hover:border-[#D4AF37]/60 bg-[#140C2C]/70'
                      }`}
                    >
                      <div className="relative h-28 sm:h-36 w-full overflow-hidden bg-black">
                        <OptimizedImage
                          src={venue.image}
                          alt={venue.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 border border-white/10 text-[9px] font-mono text-[#D4AF37] font-bold">
                          0{idx + 1}
                        </span>
                      </div>
                      <div className="p-2.5 sm:p-3 bg-[#0E0820]/95 text-left space-y-0.5">
                        <h4 className="text-xs font-bold text-[#FAF5EF] truncate group-hover:text-[#D4AF37] transition-colors">
                          {venue.tag}
                        </h4>
                        <p className="text-[10px] text-[#C4BBA3] truncate">
                          {venue.highlight}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* RADISSON BLU FACTSHEET / CONVENTION ATTRIBUTES RIBBON */}
              <div className="p-4 sm:p-6 rounded-2xl bg-[#0E0820]/80 border border-[#D4AF37]/30 backdrop-blur-md grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider block font-bold">Category</span>
                  <p className="text-sm sm:text-base font-bold text-[#FAF5EF]">5-Star Luxury Flagship</p>
                  <p className="text-[11px] text-[#DDD6FE]/70">Radisson Hotel Group</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider block font-bold">Convention Space</span>
                  <p className="text-sm sm:text-base font-bold text-[#FAF5EF]">40,000+ Sq Ft</p>
                  <p className="text-[11px] text-[#DDD6FE]/70">Ballrooms &amp; Lawns</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider block font-bold">Location</span>
                  <p className="text-sm sm:text-base font-bold text-[#FAF5EF]">Narwal Bala Bypass</p>
                  <p className="text-[11px] text-[#DDD6FE]/70">Jammu, J&amp;K (Prime Concourse)</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider block font-bold">Residential Stay</span>
                  <p className="text-sm sm:text-base font-bold text-[#FAF5EF]">Delegate Accommodation</p>
                  <p className="text-[11px] text-[#DDD6FE]/70">Luxury Rooms &amp; Dining</p>
                </div>
              </div>
            </section>
          </ScrollReveal>
        </CinematicScene>



        {/* ========================================================================= */}
        {/* 6. REGISTRATION PORTAL REDIRECT GATEWAY                                   */}
        {/* ========================================================================= */}
        <CinematicScene shotType="lens-focus" intensity={0.9}>
          <ScrollReveal direction="up" delay={0.1}>
            <section className="relative p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#1C103B] via-[#120B29]/95 to-[#0A0618] border-2 border-[#A855F7]/40 shadow-[0_20px_70px_rgba(12,4,32,0.95)] overflow-hidden text-center font-jakarta space-y-8">
              {/* Atmospheric Glows */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#A855F7]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto space-y-5">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#581C87]/40 border border-[#C084FC]/50 text-[#E9D5FF] text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#D4AF37]" />
                  <span>Official Allocation Gateway • Radisson Blu Hotel Jammu</span>
                </div>

                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-[#FAF5EF] leading-tight">
                  Enter The Official <span className="gold-gradient-text">Registration Portal</span>
                </h2>

                <p className="text-xs sm:text-base text-[#DDD6FE] leading-relaxed max-w-2xl mx-auto">
                  Access the complete interactive registration console to select your residential accommodation track, specify committee &amp; portfolio preferences, and secure your verified delegate seat.
                </p>

                {/* Delegate Feature Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 pb-2 text-left">
                  <div className="p-4 rounded-2xl bg-[#0F0A24]/90 border border-[#A855F7]/30 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#FAF5EF]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Dual Delegate Tracks</span>
                    </div>
                    <p className="text-[11px] text-[#C4BBA3]/80">
                      With Accommodation (₹4,999) or Non-Residential Delegate (₹1,999).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0F0A24]/90 border border-[#A855F7]/30 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#FAF5EF]">
                      <Landmark className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>6 Historic Councils</span>
                    </div>
                    <p className="text-[11px] text-[#C4BBA3]/80">
                      BRICS Summit, UNHRC, UN Women, Lok Sabha, CC (Citizen Council), and IPC.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0F0A24]/90 border border-[#A855F7]/30 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#FAF5EF]">
                      <ShieldCheck className="w-4 h-4 text-[#A855F7] shrink-0" />
                      <span>Live Sync &amp; Allocation</span>
                    </div>
                    <p className="text-[11px] text-[#C4BBA3]/80">
                      Instant Secretariat record &amp; verified delegate allotment letter.
                    </p>
                  </div>
                </div>

                {/* Redirecting Portal Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <MagneticElement strength={0.35}>
                    <a
                      href="/register"
                      onClick={() => sounds.playTap()}
                      className="px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F3C969] to-[#D4AF37] text-[#070A14] font-extrabold text-sm sm:text-base shadow-[0_0_35px_rgba(212,175,55,0.45)] hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-3 cursor-pointer group"
                    >
                      <Sparkles className="w-5 h-5 fill-current text-[#070A14]" />
                      <span>Launch Registration Portal</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </MagneticElement>

                  <button
                    type="button"
                    onClick={() => handleOpenQuickRegister()}
                    className="px-6 py-4 rounded-2xl bg-[#1C103B]/80 hover:bg-[#2A1654] border border-[#A855F7]/40 text-[#FAF5EF] text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Quick Registration Modal</span>
                    <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>
              </div>
            </section>
          </ScrollReveal>
        </CinematicScene>

        {/* ========================================================================= */}
        {/* 7. POST-EVENT SECTION (PDF Page 5 Section 7) — RESERVED POST-SUMMIT HUB   */}
        {/* ========================================================================= */}
        <CinematicScene shotType="establishing-shot" intensity={0.95}>
          <ScrollReveal direction="zoom" delay={0.1}>
            <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#120B29] via-[#090614] to-[#120B29] border border-[#A855F7]/30 shadow-2xl text-left font-jakarta space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#A855F7]/20 pb-6">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-[#D4AF37] font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Post-Summit Archive & Testimonial Deck
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-cormorant font-bold text-[#FAF5EF]">
                    Post-Event Chronicle & Case Study
                  </h3>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-[#581C87]/40 border border-[#C084FC]/40 text-[#E9D5FF] text-xs font-semibold self-start sm:self-auto">
                  Reserved Post-Summit Space
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#180F33]/80 border border-[#A855F7]/25 space-y-2">
                  <span className="text-xl sm:text-2xl font-bold font-cormorant text-[#FAF5EF]">Delegate Roll</span>
                  <p className="text-xs text-[#E9D5FF] font-semibold">Verified Attendance</p>
                  <p className="text-[11px] text-[#DDD6FE]">Official participant directory, institutional delegations, and faculty advisors.</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#180F33]/80 border border-[#A855F7]/25 space-y-2">
                  <span className="text-xl sm:text-2xl font-bold font-cormorant text-[#FAF5EF]">Proceedings</span>
                  <p className="text-xs text-[#E9D5FF] font-semibold">Simultaneous Committees</p>
                  <p className="text-[11px] text-[#DDD6FE]">Full documentation, passed resolutions, and executive chair reports.</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#180F33]/80 border border-[#A855F7]/25 space-y-2">
                  <span className="text-xl sm:text-2xl font-bold font-cormorant text-[#FAF5EF]">Case Study</span>
                  <p className="text-xs text-[#E9D5FF] font-semibold">Verified Transparency</p>
                  <p className="text-[11px] text-[#DDD6FE]">Post-event recap with official photography, awards list, and institutional report.</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#140C2C]/90 border-l-4 border-[#D4AF37] text-xs sm:text-sm text-[#DDD6FE] italic">
                "Following the conclusion of the Aequitas Summit, this section will host high-resolution conference photos, recorded speeches, delegate feedback quotes, and the complete institutional case study."
              </div>
            </section>
          </ScrollReveal>
        </CinematicScene>
      </div>

      {/* Lightbox Modal for Venue Preview */}
      {activeVenuePhoto !== null &&
        createPortal(
          <div
            onClick={() => setActiveVenuePhoto(null)}
            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 overflow-hidden animate-page-enter"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full rounded-3xl bg-[#0D0820] border-2 border-[#D4AF37]/60 p-5 sm:p-7 shadow-[0_20px_80px_rgba(0,0,0,0.95)] space-y-4 my-auto font-jakarta"
            >
              {(() => {
                const venue = venuePhotos.find((v) => v.id === activeVenuePhoto);
                if (!venue) return null;

                return (
                  <>
                    <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
                          Radisson Blu Hotel, Jammu // {venue.highlight}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-cormorant font-bold text-[#FAF5EF]">
                          {venue.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => setActiveVenuePhoto(null)}
                        className="p-2 rounded-full bg-rose-600/30 text-rose-100 hover:bg-rose-600/60 border border-rose-500/40 transition-colors cursor-pointer"
                        aria-label="Close Lightbox"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="relative h-[360px] sm:h-[500px] md:h-[580px] w-full rounded-2xl overflow-hidden bg-black border border-[#D4AF37]/30">
                      <OptimizedImage
                        src={venue.image}
                        alt={venue.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Lightbox Next/Prev Arrows */}
                      <button
                        onClick={() => {
                          const currIdx = venuePhotos.findIndex((v) => v.id === activeVenuePhoto);
                          const nextIdx = (currIdx - 1 + venuePhotos.length) % venuePhotos.length;
                          setActiveVenuePhoto(venuePhotos[nextIdx].id);
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/80 hover:bg-[#1C103B] text-[#D4AF37] border border-[#D4AF37]/50 backdrop-blur-md cursor-pointer transition-all"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          const currIdx = venuePhotos.findIndex((v) => v.id === activeVenuePhoto);
                          const nextIdx = (currIdx + 1) % venuePhotos.length;
                          setActiveVenuePhoto(venuePhotos[nextIdx].id);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/80 hover:bg-[#1C103B] text-[#D4AF37] border border-[#D4AF37]/50 backdrop-blur-md cursor-pointer transition-all"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-[#DDD6FE]">
                      <p className="leading-relaxed">{venue.desc}</p>
                      <span className="font-mono text-[#D4AF37] shrink-0 font-bold">
                        {venue.tag}
                      </span>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>,
          document.body
        )}

      {/* Global Delegate Registration Modal */}
      <GlobalRegistrationModal
        isOpen={globalModalOpen}
        onClose={() => setGlobalModalOpen(false)}
        preselectedCommittee={modalPreselectedCommittee}
      />
    </div>
  );
};
