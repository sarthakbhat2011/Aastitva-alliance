import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Page } from '../types';
import {
  Sparkles,
  MapPin,
  ShieldCheck,
  Quote,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Heart,
  Eye,
  Scale,
  Compass,
} from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { OptimizedImage } from '../components/OptimizedImage';
import { IndiaNetworkMap } from '../components/IndiaNetworkMap';
import { KenKeseyWaveCard } from '../components/KenKeseyWaveCard';
import { GlobalRegistrationModal } from '../components/GlobalRegistrationModal';
import { sounds } from '../utils/soundEffects';
import { PerspectiveCard } from '../components/motion/PerspectiveCard';
import { MagneticElement } from '../components/motion/MagneticElement';
import { CinematicScene } from '../components/cinematic/CinematicScene';
import { CinematicMaskReveal } from '../components/cinematic/CinematicMaskReveal';
import { FilmConduitConnector } from '../components/cinematic/FilmConduitConnector';

interface Props {
  onNavigate: (page: Page) => void;
}

export const AboutFounderPage: React.FC<Props> = ({ onNavigate }) => {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);

  // 3-4 Founder Photo Shoots (PDF Page 1: "We might add 3-4 shoots of founder in this page")
  const founderPhotos = [
    {
      id: 1,
      title: 'Meet The Founder',
      subtitle: 'Corridors of India’s MUN circuits',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: 2,
      title: 'Beyond the Blueprint',
      subtitle: 'Grassroots school visits across Jammu',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: 3,
      title: 'Where We Are Today',
      subtitle: 'Building from the ground up • Aequitas Summit',
      img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: 4,
      title: 'Personal Network & Reach',
      subtitle: 'Pan-India academic circuit connections',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1200',
    },
  ];

  // Lightbox navigation
  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activePhoto === null) return;
    sounds.playTap();
    const currentIndex = founderPhotos.findIndex((p) => p.id === activePhoto);
    const prevIndex = (currentIndex - 1 + founderPhotos.length) % founderPhotos.length;
    setActivePhoto(founderPhotos[prevIndex].id);
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activePhoto === null) return;
    sounds.playTap();
    const currentIndex = founderPhotos.findIndex((p) => p.id === activePhoto);
    const nextIndex = (currentIndex + 1) % founderPhotos.length;
    setActivePhoto(founderPhotos[nextIndex].id);
  };

  useEffect(() => {
    if (activePhoto !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activePhoto]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhoto === null) return;
      if (e.key === 'Escape') setActivePhoto(null);
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'ArrowRight') handleNextPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto]);

  return (
    <div className="relative font-sans text-[#FAF5EF] py-8 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24 text-left">
      {/* ========================================================================= */}
      {/* 1. THE PHILOSOPHY OF AASTITVA (PDF Page 1)                                */}
      {/* ========================================================================= */}
      <CinematicScene shotType="lens-focus" intensity={0.9}>
        <ScrollReveal direction="zoom" delay={0.08}>
          <section className="relative rounded-3xl bg-gradient-to-br from-[#1C103B] via-[#120B29]/95 to-[#0A0618] border-2 border-[#A855F7]/40 p-6 sm:p-14 overflow-hidden shadow-[0_20px_70px_rgba(12,4,32,0.95)]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#A855F7]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#4318FF]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 text-left relative z-10 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#581C87]/40 border border-[#C084FC]/50 text-[#E9D5FF] text-xs font-bold uppercase tracking-widest shadow-sm font-jakarta">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#D4AF37]" />
                <span>About Aastitva Alliance</span>
              </div>

              <CinematicMaskReveal variant="gold-trace-sweep" duration={0.9}>
                <h1 className="text-3xl sm:text-6xl lg:text-7xl font-cormorant font-bold text-[#FAF5EF] leading-tight">
                  The Philosophy of <span className="gold-gradient-text">Aastitva</span>
                </h1>
              </CinematicMaskReveal>

              {/* Exact PDF Page 1 Text */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0F0A24]/90 border-l-4 border-[#A855F7] backdrop-blur-md space-y-4 shadow-2xl">
                <p className="text-xl sm:text-2xl font-cormorant italic text-[#E9D5FF] leading-relaxed">
                  Aastitva translates to <em>existence</em>, the state of truly being, fully and completely.
                </p>
                <p className="text-xs sm:text-base text-[#DDD6FE] leading-relaxed font-jakarta">
                  We chose this name with profound intention. Because every event an organiser dreams of already exists somewhere in a proposal, a conversation, a hope that students will show up and something meaningful will happen. What's missing is rarely the idea. It's everything standing between that idea and its full existence: the venue that falls through, the judge who cancels, the marketing that never quite reaches enough students.
                </p>
              </div>

              {/* Exact PDF Page 2 Epigraph & Wave */}
              <KenKeseyWaveCard />
            </div>
          </section>
        </ScrollReveal>
      </CinematicScene>

      {/* SEAMLESS FILM CONDUIT */}
      <FilmConduitConnector label="FOUNDER'S PERSPECTIVE // MEET THE FOUNDER" />

      {/* ========================================================================= */}
      {/* 2. SO, WHO'S RUNNING THIS THING? — MEET THE FOUNDER (PDF Page 2)          */}
      {/* ========================================================================= */}
      <CinematicScene shotType="establishing-shot" intensity={0.9}>
        <ScrollReveal direction="up" delay={0.1}>
          <section className="relative rounded-3xl bg-[#140C2C]/90 border-2 border-[#A855F7]/40 p-6 sm:p-12 overflow-hidden shadow-2xl space-y-8 font-jakarta">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#581C87]/40 text-[#E9D5FF] border border-[#C084FC]/40">
                <Quote className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-4xl font-cormorant font-bold text-[#FAF5EF]">
                  So, who's running this thing?
                </h2>
                <p className="text-xs text-[#E9D5FF] font-semibold uppercase tracking-wider">
                  Caption: Meet The Founder
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Founder Narrative (Verbatim from PDF Page 2) */}
              <div className="lg:col-span-8 space-y-4 text-xs sm:text-base text-[#DDD6FE] leading-relaxed">
                <p>
                  My journey began in the corridors of India’s MUN circuits, where I witnessed a recurring irony: organisers, brimming with ambition, were often reduced to juggling logistics, often sacrificing the creative soul of their event to the tyranny of management. I observed that while every institution possesses distinct values and a desire to leave a mark, but that spark is too often extinguished by the sheer burden of operational chaos.
                </p>
                <p className="font-semibold text-[#FAF5EF] text-sm sm:text-lg border-l-2 border-[#D4AF37] pl-3 py-1">
                  Aastitva Alliance was born to fill that void.
                </p>
                <p>
                  The problem is barely a lack of effort; rather, I feel it’s the absence of a dedicated ecosystem connecting all the pieces an event actually needs , each one solved in isolation, event after event, by people already stretched thin. Ideas were being built, but rarely allowed to fully exist. Ideas were abundant. Existence was rare.
                </p>
              </div>

              {/* Founder Photo Shoot Card (PDF Page 1 & 2) */}
              <div className="lg:col-span-4">
                <PerspectiveCard maxTilt={8} scale={1.02}>
                  <div
                    onClick={() => {
                      sounds.playTap();
                      setActivePhoto(1);
                    }}
                    className="group relative rounded-2xl overflow-hidden border-2 border-[#A855F7]/40 cursor-pointer shadow-xl"
                  >
                    <OptimizedImage
                      src={founderPhotos[0].img}
                      alt="Meet The Founder"
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0618] via-transparent to-transparent opacity-85" />
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block">
                        Caption: Meet The Founder
                      </span>
                      <h4 className="text-sm font-bold text-[#FAF5EF]">
                        {founderPhotos[0].title}
                      </h4>
                    </div>
                    <button
                      className="absolute top-3 right-3 p-2 rounded-full bg-[#0A0618]/70 text-[#E9D5FF] backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Enlarge photo"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </PerspectiveCard>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </CinematicScene>

      {/* SEAMLESS FILM CONDUIT */}
      <FilmConduitConnector label="CHAPTER III // BEYOND THE BLUEPRINT" />

      {/* ========================================================================= */}
      {/* 3. BEYOND THE BLUEPRINT (PDF Page 2 & 3)                                  */}
      {/* ========================================================================= */}
      <CinematicScene shotType="lens-focus" intensity={0.85}>
        <ScrollReveal direction="up" delay={0.1}>
          <section className="relative rounded-3xl bg-[#140C2C]/90 border-2 border-[#A855F7]/40 p-6 sm:p-12 overflow-hidden shadow-2xl space-y-6 font-jakarta text-left">
            <h2 className="text-2xl sm:text-4xl font-cormorant font-bold text-[#FAF5EF]">
              Beyond the Blueprint
            </h2>

            {/* Verbatim from PDF Page 2 & 3 */}
            <div className="space-y-4 text-xs sm:text-base text-[#DDD6FE] leading-relaxed max-w-4xl">
              <p>
                Having experienced these challenges firsthand, I set out to build something different: an organisation that makes event execution simpler, stronger, and more connected, so schools and organisers could focus on their students and creative prospects, not on holding logistics together.
              </p>
              <p>
                That commitment took me beyond planning. Before Aastitva Alliance took shape, I personally visited government schools across Jammu , to understand where the real gaps were. Not just for well-resourced institutions, the ones least likely to ever see the inside of a conference hall.
              </p>
              <div className="p-6 rounded-2xl bg-[#0F0A24]/90 border-l-4 border-[#D4AF37] backdrop-blur-md space-y-2 mt-4">
                <p className="text-sm sm:text-lg font-cormorant italic text-[#FAF5EF]">
                  "That pilgrimage shaped the conscience of Aastitva: existence isn't a privilege reserved for the schools that can already afford it. It should be something every student gets a chance at."
                </p>
              </div>
            </div>

            {/* 3-4 Photo Gallery Shoots (PDF Page 1 Specification) */}
            <div className="pt-6">
              <div className="text-[11px] font-mono uppercase text-[#D4AF37] font-bold tracking-widest mb-4">
                ✦ Founder Visual Chronicle (3-4 Editorial Shoots)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {founderPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => {
                      sounds.playTap();
                      setActivePhoto(photo.id);
                    }}
                    className="group relative rounded-xl overflow-hidden border border-[#A855F7]/30 cursor-pointer shadow-md"
                  >
                    <OptimizedImage
                      src={photo.img}
                      alt={photo.title}
                      className="w-full h-36 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0618] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-2 left-2 right-2 text-left">
                      <span className="text-[9px] font-mono text-[#D4AF37] block truncate">
                        Shoot 0{photo.id}
                      </span>
                      <span className="text-[11px] font-bold text-[#FAF5EF] block truncate">
                        {photo.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>
      </CinematicScene>

      {/* SEAMLESS FILM CONDUIT */}
      <FilmConduitConnector label="CHAPTER IV // WHERE WE ARE TODAY" />

      {/* ========================================================================= */}
      {/* 4. WHERE WE ARE TODAY (PDF Page 3)                                        */}
      {/* ========================================================================= */}
      <CinematicScene shotType="theatrical-prop" intensity={0.9}>
        <ScrollReveal direction="up" delay={0.1}>
          <section className="relative rounded-3xl bg-[#140C2C]/90 border-2 border-[#A855F7]/40 p-6 sm:p-12 overflow-hidden shadow-2xl space-y-6 font-jakarta text-left">
            <h2 className="text-2xl sm:text-4xl font-cormorant font-bold text-[#FAF5EF]">
              Where We Are Today
            </h2>

            {/* Verbatim from PDF Page 3 */}
            <div className="space-y-4 text-xs sm:text-base text-[#DDD6FE] leading-relaxed max-w-4xl">
              <p>
                We're building Aastitva Alliance from the ground up, starting with our first live partnership, the inaugural Aequitas Summit, with a clear intent to expand across event types and across the region in the years ahead.
              </p>
              <p>
                We're nascent, and we are transparent about that. But <em>Aastitva</em> was never about how long we've existed; it's about making sure the events we touch get to exist fully, properly, the way they were meant to.
              </p>
            </div>
          </section>
        </ScrollReveal>
      </CinematicScene>

      {/* SEAMLESS FILM CONDUIT */}
      <FilmConduitConnector label="CHAPTER V // PERSONAL NETWORK & REACH" />

      {/* ========================================================================= */}
      {/* 5. PERSONAL NETWORK & REACH (PDF Page 3)                                  */}
      {/* ========================================================================= */}
      <CinematicScene shotType="establishing-shot" intensity={0.9}>
        <ScrollReveal direction="zoom" delay={0.1}>
          <section className="relative rounded-3xl bg-[#140C2C]/90 border-2 border-[#A855F7]/40 p-6 sm:p-12 overflow-hidden shadow-2xl space-y-6 font-jakarta text-left">
            <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#581C87]/40 border border-[#C084FC]/40 text-[#E9D5FF] text-xs font-mono font-bold uppercase tracking-wider w-fit">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Pan-India Circuit Foundation</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-cormorant font-bold text-[#FAF5EF]">
              Personal Network & Reach
            </h2>

            {/* Verbatim from PDF Page 3 */}
            <div className="space-y-4 text-xs sm:text-base text-[#DDD6FE] leading-relaxed max-w-4xl">
              <p>
                Aastitva Alliance is backed by a personal network spanning across states, relationships built long before the company existed.
              </p>
              <p>
                Beyond Jammu, we have established professional connections across Delhi, Pune, Jaipur, Abohar(Rajastan) Haryana, Dehradun(Uttarakhand), Amritsar, Ludhiana(Punjab), Kashmir, Chandigarh, Meerut(Uttar Pradesh), and even in Himachal Pradesh, the relationships built through years of involvement in the MUN and academic events circuit.
              </p>
              <p className="font-semibold text-[#FAF5EF]">
                As Aastitva Alliance grows, this network becomes the foundation for expansion.
              </p>
            </div>

            {/* Interactive India Network Map (PDF Page 3: "Here we want some map integration with some gentle dissolving and emerging animations that project these locations on map") */}
            <div className="pt-4">
              <IndiaNetworkMap />
            </div>
          </section>
        </ScrollReveal>
      </CinematicScene>

      {/* SEAMLESS FILM CONDUIT */}
      <FilmConduitConnector label="CHAPTER VI // MISSION & VISION" />

      {/* ========================================================================= */}
      {/* 6. MISSION & VISION (PDF Page 3 & 4)                                      */}
      {/* ========================================================================= */}
      <CinematicScene shotType="lens-focus" intensity={0.9}>
        <ScrollReveal direction="up" delay={0.1}>
          <section className="relative rounded-3xl bg-[#140C2C]/90 border-2 border-[#A855F7]/40 p-6 sm:p-12 overflow-hidden shadow-2xl space-y-8 font-jakarta text-left">
            <h2 className="text-2xl sm:text-4xl font-cormorant font-bold text-[#FAF5EF]">
              Mission & Vision
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mission Card (Verbatim from PDF Page 3) */}
              <PerspectiveCard maxTilt={6} scale={1.01}>
                <div className="h-full p-6 sm:p-8 rounded-2xl bg-[#0F0A24]/90 border border-[#A855F7]/40 space-y-3">
                  <span className="text-[11px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider">
                    Mission
                  </span>
                  <p className="text-sm sm:text-base text-[#FAF5EF] leading-relaxed">
                    <strong>Mission:</strong> To simplify the complexity of running academic events, so every idea gets the chance to fully exist.
                  </p>
                </div>
              </PerspectiveCard>

              {/* Vision Card (Verbatim from PDF Page 4) */}
              <PerspectiveCard maxTilt={6} scale={1.01}>
                <div className="h-full p-6 sm:p-8 rounded-2xl bg-[#0F0A24]/90 border border-[#A855F7]/40 space-y-3">
                  <span className="text-[11px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider">
                    Vision
                  </span>
                  <p className="text-sm sm:text-base text-[#FAF5EF] leading-relaxed">
                    <strong>Vision:</strong> To become an institutional-level partner for events of every scale and to extend that existence to underprivileged schools and communities, starting with what we learn from our early, experienced partnerships.
                  </p>
                </div>
              </PerspectiveCard>
            </div>
          </section>
        </ScrollReveal>
      </CinematicScene>

      {/* SEAMLESS FILM CONDUIT */}
      <FilmConduitConnector label="CHAPTER VII // WHY TRUST A NEW COMPANY & VALUES" />

      {/* ========================================================================= */}
      {/* 7. WHY TRUST A NEW COMPANY & OUR VALUES (PDF Page 4)                      */}
      {/* ========================================================================= */}
      <CinematicScene shotType="dramatic-climax" intensity={1.0}>
        <ScrollReveal direction="zoom" delay={0.1}>
          <section className="relative rounded-3xl bg-[#140C2C]/90 border-2 border-[#A855F7]/40 p-6 sm:p-12 overflow-hidden shadow-2xl space-y-8 font-jakarta text-left">
            <div className="space-y-4 max-w-4xl">
              <h2 className="text-2xl sm:text-4xl font-cormorant font-bold text-[#FAF5EF]">
                Why Trust a New Company
              </h2>

              {/* Verbatim from PDF Page 4 */}
              <p className="text-xs sm:text-base text-[#DDD6FE] leading-relaxed">
                Our new & visionary approach is our hallmark. We operate without the bureaucracy of scale, the opacity of middlemen, or the apathy of corporate indifference. Just transparency, word-of-mouth reputation, and a founder who takes personal responsibility, offering self as a personal covenant for every event we help bring into existence.
              </p>
            </div>

            {/* OUR VALUES (Verbatim from PDF Page 4) */}
            <div className="pt-4 border-t border-[#A855F7]/30 space-y-4">
              <span className="text-xs font-mono uppercase font-bold text-[#D4AF37] tracking-widest block">
                OUR VALUES
              </span>
              <div className="flex flex-wrap gap-2.5 sm:gap-4">
                {['Purpose', 'Integrity', 'Access', 'Presence', 'Transparency'].map((val) => (
                  <span
                    key={val}
                    className="px-4 py-2 rounded-xl bg-[#581C87]/40 border border-[#C084FC]/50 text-[#FAF5EF] text-xs sm:text-sm font-bold shadow-sm"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>

            {/* Founder's Personal Covenant (Verbatim from PDF Page 4) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0F0A24]/90 border-2 border-[#D4AF37] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
              <div className="space-y-2 text-left relative z-10">
                <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-mono font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Founder's Personal Covenant
                </span>
                <p className="text-base sm:text-xl font-cormorant font-bold text-[#FAF5EF] leading-relaxed">
                  "This is a promise: no hidden costs, no vague promises, just honest conversations from day one."
                </p>
              </div>

              <MagneticElement strength={0.35}>
                <button
                  onClick={() => {
                    sounds.playChime();
                    setRegistrationModalOpen(true);
                  }}
                  className="shrink-0 px-8 py-4 rounded-xl shimmer-btn text-[#070A14] font-bold text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-2 z-10 min-touch cursor-pointer btn-sheen-sweep"
                >
                  <span>Partner With Our Founder</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </MagneticElement>
            </div>
          </section>
        </ScrollReveal>
      </CinematicScene>

      {/* Global Photo Lightbox Modal */}
      {activePhoto !== null &&
        createPortal(
          <div
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-[99999] bg-[#050811]/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#140C2C] border-2 border-[#A855F7]/60 rounded-3xl overflow-hidden shadow-[0_0_90px_rgba(168,85,247,0.4)] flex flex-col max-h-[90vh]"
            >
              <div className="p-4 bg-[#0A0618] border-b border-[#A855F7]/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
                    Founder Chronicle Photo 0{activePhoto} of 0{founderPhotos.length}
                  </span>
                  <h3 className="text-base font-bold text-[#FAF5EF]">
                    {founderPhotos.find((p) => p.id === activePhoto)?.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="p-2 rounded-xl bg-[#1C103B] hover:bg-[#2A1654] text-[#E9D5FF] transition-colors cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px]">
                <OptimizedImage
                  src={founderPhotos.find((p) => p.id === activePhoto)?.img || ''}
                  alt={founderPhotos.find((p) => p.id === activePhoto)?.title || ''}
                  className="max-h-[65vh] w-auto object-contain mx-auto"
                />

                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0A0618]/80 text-[#FAF5EF] hover:bg-[#A855F7] hover:text-[#070A14] transition-all cursor-pointer border border-[#A855F7]/40 shadow-xl"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0A0618]/80 text-[#FAF5EF] hover:bg-[#A855F7] hover:text-[#070A14] transition-all cursor-pointer border border-[#A855F7]/40 shadow-xl"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 bg-[#0A0618] border-t border-[#A855F7]/30 text-xs text-[#DDD6FE]">
                {founderPhotos.find((p) => p.id === activePhoto)?.subtitle}
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Global Delegate Registration Modal */}
      <GlobalRegistrationModal
        isOpen={registrationModalOpen}
        onClose={() => setRegistrationModalOpen(false)}
      />
    </div>
  );
};
