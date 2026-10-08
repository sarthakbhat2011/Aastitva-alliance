import React, { useState } from 'react';
import { Page } from '../types';
import {
  Sparkles,
  MapPin,
  ShieldCheck,
  Quote,
  ArrowRight,
} from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
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
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);

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
              <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-2xl sm:rounded-full bg-[#581C87]/40 border border-[#C084FC]/50 text-[#E9D5FF] text-[9.5px] xs:text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider shadow-sm font-jakarta max-w-[92vw] sm:max-w-none">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#D4AF37] shrink-0" />
                <span className="break-words">About Aastitva Alliances • Academic Event Management + Network Organisation</span>
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
                  Aastitva Alliances was born to fill that void.
                </p>
                <p>
                  The problem is barely a lack of effort; rather, I feel it’s the absence of a dedicated ecosystem connecting all the pieces an event actually needs , each one solved in isolation, event after event, by people already stretched thin. Ideas were being built, but rarely allowed to fully exist. Ideas were abundant. Existence was rare.
                </p>
              </div>

              {/* Kinetic Negative Animative Space Conduit (No Personal Photos) */}
              <div className="lg:col-span-4 flex items-center justify-center">
                <PerspectiveCard maxTilt={6} scale={1.01}>
                  <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-[#A855F7]/35 bg-gradient-to-b from-[#1C103B]/80 via-[#0B061A]/95 to-[#05030E] flex flex-col items-center justify-center p-6 text-center shadow-2xl group">
                    {/* Ambient Glows */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.18),transparent_70%)] animate-pulse" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#7C3AED]/20 rounded-full blur-2xl pointer-events-none" />

                    {/* Kinetic Planetary & Celestial Orbital Conduit */}
                    <div className="relative w-40 h-40 flex items-center justify-center">
                      {/* Outer Dashed Orbit */}
                      <div
                        className="absolute inset-0 rounded-full border border-dashed border-[#A855F7]/40 animate-spin"
                        style={{ animationDuration: '28s' }}
                      />
                      {/* Counter-rotating Middle Ellipse */}
                      <div
                        className="absolute inset-2.5 rounded-full border border-dotted border-[#D4AF37]/45 animate-spin"
                        style={{ animationDuration: '18s', animationDirection: 'reverse' }}
                      />
                      {/* Pulsing Aura Rings */}
                      <div
                        className="absolute inset-7 rounded-full border border-[#C084FC]/30 animate-ping opacity-25"
                        style={{ animationDuration: '4s' }}
                      />
                      <div className="absolute inset-9 rounded-full bg-gradient-to-tr from-[#581C87]/40 via-[#3B0764]/60 to-[#D4AF37]/20 backdrop-blur-md border border-[#A855F7]/50 shadow-[0_0_25px_rgba(168,85,247,0.35)]" />

                      {/* Floating Starlight Centerpiece */}
                      <div className="relative z-10 flex flex-col items-center justify-center">
                        <Sparkles className="w-8 h-8 text-[#D4AF37] animate-pulse drop-shadow-[0_0_14px_rgba(212,175,55,0.8)]" />
                      </div>

                      {/* Micro Starlight Nodes */}
                      <div className="absolute top-2 left-6 w-2 h-2 rounded-full bg-[#FAF5EF] shadow-[0_0_8px_#FAF5EF] animate-pulse" />
                      <div
                        className="absolute bottom-3 right-7 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_#D4AF37] animate-ping"
                        style={{ animationDuration: '3s' }}
                      />
                      <div className="absolute top-1/2 -right-1 w-2 h-2 rounded-full bg-[#A855F7] shadow-[0_0_8px_#A855F7]" />
                      <div className="absolute -left-1 top-1/3 w-1.5 h-1.5 rounded-full bg-[#C084FC] shadow-[0_0_6px_#C084FC]" />
                    </div>

                    {/* Negative Space Typographic Balance */}
                    <div className="relative z-10 mt-5 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#D4AF37] font-bold block">
                        CELESTIAL NEXUS • IDENTITY
                      </span>
                      <p className="text-xs text-[#DDD6FE]/80 font-cormorant italic">
                        "Pure architectural intent, liberated from form."
                      </p>
                    </div>
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
                That commitment took me beyond planning. Before Aastitva Alliances took shape, I personally visited government schools across Jammu , to understand where the real gaps were. Not just for well-resourced institutions, the ones least likely to ever see the inside of a conference hall.
              </p>
              <div className="p-6 rounded-2xl bg-[#0F0A24]/90 border-l-4 border-[#D4AF37] backdrop-blur-md space-y-2 mt-4">
                <p className="text-sm sm:text-lg font-cormorant italic text-[#FAF5EF]">
                  "That pilgrimage shaped the conscience of Aastitva: existence isn't a privilege reserved for the schools that can already afford it. It should be something every student gets a chance at."
                </p>
              </div>
            </div>

            {/* Kinetic Negative Animative Space Harmonic Field (No Personal Photos) */}
            <div className="pt-4">
              <div className="relative rounded-2xl overflow-hidden border border-[#A855F7]/30 bg-gradient-to-r from-[#0C061E]/90 via-[#190C36]/70 to-[#0C061E]/90 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.14),transparent_70%)] pointer-events-none" />

                <div className="space-y-2 text-left relative z-10 max-w-xl">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                    <span>SPATIAL RESONANCE • UNCOMPROMISED FOCUS</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#DDD6FE] leading-relaxed">
                    Eliminating personal distraction to place the spotlight entirely on institutional dignity, delegate empowerment, and uncompromised academic rigor.
                  </p>
                </div>

                {/* Kinetic Pulsing Soundwave / Light Frequency Bars */}
                <div className="relative z-10 flex items-center gap-1.5 shrink-0 px-4 py-3 rounded-xl bg-[#090514]/80 border border-[#A855F7]/30 shadow-inner">
                  {[38, 62, 28, 82, 48, 92, 42, 72, 32, 88, 58].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 rounded-full bg-gradient-to-t from-[#7C3AED] via-[#C084FC] to-[#D4AF37] animate-pulse"
                      style={{
                        height: `${h * 0.32}px`,
                        animationDelay: `${i * 120}ms`,
                        animationDuration: '1.8s',
                      }}
                    />
                  ))}
                </div>
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
                We're building Aastitva Alliances from the ground up, starting with our first live partnership, the inaugural Aequitas Summit, with a clear intent to expand across event types and across the region in the years ahead.
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
                Aastitva Alliances is backed by a personal network spanning across states, relationships built long before the company existed.
              </p>
              <p>
                Beyond Jammu, we have established professional connections across Delhi, Pune, Jaipur, Abohar(Rajastan) Haryana, Dehradun(Uttarakhand), Amritsar, Ludhiana(Punjab), Kashmir, Chandigarh, Meerut(Uttar Pradesh), and even in Himachal Pradesh, the relationships built through years of involvement in the MUN and academic events circuit.
              </p>
              <p className="font-semibold text-[#FAF5EF]">
                As Aastitva Alliances grows, this network becomes the foundation for expansion.
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

      {/* Global Delegate Registration Modal */}
      <GlobalRegistrationModal
        isOpen={registrationModalOpen}
        onClose={() => setRegistrationModalOpen(false)}
      />
    </div>
  );
};
