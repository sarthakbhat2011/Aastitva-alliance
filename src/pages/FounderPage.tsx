import React, { useState } from 'react';
import { Page } from '../types';
import {
  Sparkles,
  MapPin,
  ShieldCheck,
  Quote,
  Globe,
  Feather,
  Maximize2,
  X,
  Target,
  Compass,
  ArrowRight
} from 'lucide-react';
import { Astitva3DCanvas } from '../components/Astitva3DCanvas';
import { ScrollReveal } from '../components/ScrollReveal';
import { OptimizedImage } from '../components/OptimizedImage';

interface Props {
  onNavigate: (page: Page) => void;
}

export const FounderPage: React.FC<Props> = ({ onNavigate }) => {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>('Jammu');

  // 4 Editorial Founder Placeholder Photos
  const founderPhotos = [
    {
      id: 1,
      title: 'In the MUN Corridors',
      subtitle: 'Origins of Aastitva',
      caption: 'Witnessing the operational chaos and creative spark of academic delegates.',
      img: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: 2,
      title: 'Grassroots School Outreach',
      subtitle: 'Jammu District Tour',
      caption: 'Visiting government schools to listen to debaters who rarely get a stage.',
      img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: 3,
      title: 'Secretariat Directorship',
      subtitle: 'Academic Governance',
      caption: 'Standardizing UN Rules of Procedure and handpicking Executive Board chairs.',
      img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: 4,
      title: 'Regional Summit Vision',
      subtitle: 'Aequitas Partnership',
      caption: "Building a dependable, high-standard academic infrastructure partner for Jammu's institutions.",
      img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200',
    },
  ];

  const locations = [
    { name: 'Jammu City', district: 'Jammu', role: 'Headquarters & Core Secretariat Hub', coordinates: { x: 48, y: 56 } },
    { name: 'Nagrota', district: 'Jammu', role: 'Suburban School Training Workshops', coordinates: { x: 54, y: 48 } },
    { name: 'RS Pura', district: 'Jammu', role: 'Border Region Delegate Pilgrimage', coordinates: { x: 44, y: 72 } },
    { name: 'Akhnoor', district: 'Jammu', role: 'Institutional Circuit Outreach', coordinates: { x: 32, y: 48 } },
    { name: 'Samba', district: 'Samba', role: 'Industrial Belt School Partnership', coordinates: { x: 62, y: 64 } },
    { name: 'Kathua', district: 'Kathua', role: 'Gateway District Debate Network', coordinates: { x: 76, y: 76 } },
    { name: 'Udhampur', district: 'Udhampur', role: 'Hill District Student Seminars', coordinates: { x: 58, y: 38 } },
    { name: 'Reasi', district: 'Reasi', role: 'Young Speakers Assembly Sourcing', coordinates: { x: 24, y: 38 } },
  ];

  const coreValues = [
    { name: 'Authentic Existence', desc: 'Making ideas real without superficial fluff or corporate delay.', icon: Target },
    { name: 'Strict Neutrality', desc: '100% UN Rules of Procedure compliance and unbiased moderation.', icon: ShieldCheck },
    { name: 'Turnkey Simplicity', desc: 'Absorbing all administrative friction so school leaders focus on students.', icon: Compass },
    { name: 'Equity of Access', desc: 'Extending premier debate stages to government & suburban schools.', icon: Globe },
    { name: 'Founder Accountability', desc: 'Direct personal covenant and commitment on every partnership.', icon: Quote },
  ];

  return (
    <div className="relative font-sans text-[#FAF5EF] py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      {/* Section 1: Hero Philosophy of Aastitva */}
      <ScrollReveal direction="zoom" delay={0.1}>
        <section className="relative rounded-3xl bg-gradient-to-br from-[#0D1427] via-[#16203B] to-[#070A14] border border-[#D4AF37]/35 p-8 sm:p-14 overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.75)]">
          {/* Background Ambient Lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#52459E]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-8 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-widest shadow-sm">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>The Founder's Journal</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-[#FAF5EF] leading-tight">
                The Philosophy of <span className="gold-gradient-text">Aastitva</span>
              </h1>

              <div className="p-6 rounded-2xl bg-[#070A14]/80 border-l-4 border-[#D4AF37] backdrop-blur-md space-y-3 shadow-lg">
                <p className="text-base sm:text-xl font-cormorant italic text-[#D4AF37] leading-relaxed">
                  "Aastitva translates to existence—the state of truly being, fully and completely."
                </p>
                <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed font-jakarta">
                  We chose this name with profound intention. Because every event an organiser dreams of already exists somewhere in a proposal, a conversation, a hope that students will show up and something meaningful will happen.
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#C4BBA3] leading-relaxed max-w-3xl font-jakarta">
                What's missing is rarely the idea. It's everything standing between that idea and its full existence: the venue that falls through, the judge who cancels, the marketing that never quite reaches enough students.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <div className="px-4 py-2 rounded-xl bg-[#16203B]/90 border border-[#D4AF37]/30 text-xs font-medium text-[#FAF5EF] inline-flex items-center gap-2 font-jakarta">
                  <Feather className="w-4 h-4 text-[#D4AF37]" />
                  <span>Collapsing the Distance to Existence</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 h-64 sm:h-80 relative flex items-center justify-center">
              <Astitva3DCanvas variant="emblem" />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 2: So, who's running this thing? / Meet The Founder */}
      <ScrollReveal direction="up" delay={0.15}>
        <section className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 font-jakarta">
              <Sparkles className="w-3.5 h-3.5" /> Editorial Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-cormorant font-bold text-[#FAF5EF]">
              So, who's running this thing?
            </h2>
            <p className="text-sm text-[#C4BBA3] font-jakarta">
              Caption: <strong className="text-[#D4AF37]">Meet The Founder</strong> — Visual journey from MUN corridors to regional leadership.
            </p>
          </div>

          {/* 4-Shoot Founder Editorial Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {founderPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo.id)}
                className="group relative rounded-3xl bg-[#0D1427] border border-[#243563]/50 hover:border-[#D4AF37]/60 overflow-hidden cursor-pointer transition-all duration-500 shadow-xl hover:-translate-y-1.5"
              >
                <div className="relative h-80 w-full overflow-hidden bg-[#16203B]">
                  <OptimizedImage
                    src={photo.img}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070A14] via-[#070A14]/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                  <div className="absolute top-4 right-4 p-2 rounded-full bg-[#070A14]/80 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 space-y-1.5 relative z-10 bg-[#070A14]/90">
                  <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-bold block font-jakarta">
                    {photo.subtitle}
                  </span>
                  <h3 className="text-base font-jakarta font-bold text-[#FAF5EF] group-hover:text-[#D4AF37] transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-[#C4BBA3] line-clamp-2 leading-relaxed font-jakarta">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal for Founder Shoot Photos */}
          {activePhoto !== null && (
            <div className="fixed inset-0 z-50 bg-[#070A14]/90 backdrop-blur-xl flex items-center justify-center p-4">
              <div className="relative max-w-4xl w-full rounded-3xl bg-[#0D1427] border border-[#D4AF37]/50 p-6 space-y-4 shadow-2xl animate-page-enter">
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-[#16203B] text-[#FAF5EF] hover:text-[#D4AF37] transition-colors border border-[#D4AF37]/30 min-touch"
                >
                  <X className="w-5 h-5" />
                </button>

                {(() => {
                  const item = founderPhotos.find((p) => p.id === activePhoto);
                  if (!item) return null;
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-7 h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#D4AF37]/30">
                        <OptimizedImage src={item.img} alt={item.title} className="w-full h-full object-cover" priority={true} />
                      </div>
                      <div className="md:col-span-5 space-y-4 text-left font-jakarta">
                        <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider inline-block">
                          Founder Editorial Portfolio
                        </span>
                        <h3 className="text-2xl font-cormorant font-bold text-[#FAF5EF]">{item.title}</h3>
                        <p className="text-sm text-[#C4BBA3] leading-relaxed">{item.caption}</p>
                        <div className="p-4 rounded-xl bg-[#16203B] border border-[#243563] text-xs text-[#FAF5EF]">
                          <em>Note: Founder shoot slot ready for custom photos replacement.</em>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Editorial Story Text - Open Un-boxed Editorial Flow */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-6">
            <div className="lg:col-span-7 space-y-6 text-left border-l-2 border-[#D4AF37]/50 pl-6 sm:pl-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                  <Quote className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-cormorant font-bold text-var-text-primary">The Corridors of Debate</h3>
                  <p className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider font-jakarta">Origin & Observation</p>
                </div>
              </div>

              <p className="text-base text-var-text-secondary leading-relaxed font-jakarta">
                My journey began in the corridors of India’s MUN circuits, where I witnessed a recurring irony: organisers, brimming with ambition, were often reduced to juggling logistics, sacrificing the creative soul of their event to the tyranny of management.
              </p>
              <p className="text-base text-var-text-secondary leading-relaxed font-jakarta">
                I observed that while every institution possesses distinct values and a desire to leave a mark, that spark is too often extinguished by the sheer burden of operational chaos.
              </p>

              <div className="py-3 px-5 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 font-jakarta font-bold text-[#D4AF37] text-base inline-block">
                Aastitva Alliance was born to fill that void.
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 text-left border-l-2 border-[#52459E]/50 pl-6 sm:pl-8">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block font-jakarta">
                The Core Insight
              </span>
              <h3 className="text-2xl sm:text-3xl font-cormorant font-bold text-var-text-primary leading-tight">
                "Ideas were abundant. Existence was rare."
              </h3>
              <p className="text-base text-var-text-secondary leading-relaxed font-jakarta">
                The problem is rarely a lack of effort; rather, it’s the absence of a dedicated infrastructure ecosystem connecting all the pieces an event actually needs—each one solved in isolation, event after event, by teams already stretched thin.
              </p>

              <div className="pt-4 flex items-center justify-between text-xs font-semibold text-[#D4AF37] border-t border-[#D4AF37]/30 font-jakarta">
                <span>Collapsing the Distance to Execution</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 3: Beyond the Blueprint & Jammu Pilgrimage */}
      <ScrollReveal direction="up" delay={0.15}>
        <section className="space-y-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6 text-left border-l-2 border-[#D4AF37] pl-6 sm:pl-8">
              <span className="px-3.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] text-xs font-bold uppercase tracking-widest border border-[#D4AF37]/30 inline-block font-jakarta">
                Beyond the Blueprint
              </span>
              <h2 className="text-3xl sm:text-5xl font-cormorant font-bold text-var-text-primary">
                The Pilgrimage Across Jammu
              </h2>
              <p className="text-base text-var-text-secondary leading-relaxed font-jakarta">
                Having experienced these challenges firsthand, I set out to build something different: an infrastructure ecosystem that makes event execution simpler, stronger, and more connected, so schools and organisers can focus on their students and creative prospects.
              </p>
              <p className="text-base text-var-text-secondary leading-relaxed font-jakarta">
                That commitment took me beyond planning. Before Aastitva Alliance took shape, I personally visited government schools across Jammu to understand where the real gaps were—especially for institutions least likely to see the inside of an academic conference hall.
              </p>
              <div className="p-6 rounded-2xl bg-[#D4AF37]/10 border-l-4 border-[#D4AF37] space-y-2">
                <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider block font-jakarta">The Conscience of Aastitva</span>
                <p className="text-base sm:text-lg font-cormorant italic text-var-text-primary">
                  "Existence isn't a privilege reserved for institutions that can already afford it. It should be something every student gets a chance at."
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 h-80 sm:h-96 rounded-3xl overflow-hidden border border-[#D4AF37]/40 relative group shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1200"
                alt="Jammu Government School Pilgrimage"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070A14] via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 right-4 text-xs font-jakarta font-bold text-white bg-black/75 px-4 py-2.5 rounded-xl border border-[#D4AF37]/40 backdrop-blur-md text-center block">
                Grassroots Education Pilgrimage • Jammu Region
              </span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 4: Where We Are Today & Radical Transparency */}
      <ScrollReveal direction="up" delay={0.15}>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 py-6">
          <div className="space-y-4 text-left border-l-2 border-[#D4AF37]/50 pl-6 sm:pl-8">
            <div className="p-3 w-fit rounded-2xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-cormorant font-bold text-var-text-primary">Where We Are Today</h3>
            <p className="text-base text-var-text-secondary leading-relaxed font-jakarta">
              We're building Aastitva Alliance from the ground up, starting with our flagship partnership—the inaugural Aequitas Summit—with a clear intent to expand across event types and throughout the region in the years ahead.
            </p>
          </div>

          <div className="space-y-4 text-left border-l-2 border-[#52459E]/50 pl-6 sm:pl-8">
            <div className="p-3 w-fit rounded-2xl bg-[#52459E]/30 text-[#D4AF37] border border-[#D4AF37]/40">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-cormorant font-bold text-var-text-primary">Radical Transparency</h3>
            <p className="text-base text-var-text-secondary leading-relaxed font-jakarta">
              We are nascent, and we are transparent about that. But Aastitva was never about how long we've existed; it's about making sure the academic events we power get to exist fully, properly, the way they were meant to.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 5: Jammu Interactive Pilgrimage Map */}
      <ScrollReveal direction="up" delay={0.15}>
        <section className="rounded-3xl bg-gradient-to-b from-[#070A14] via-[#0D1427] to-[#070A14] border border-[#D4AF37]/35 p-8 sm:p-12 space-y-10 shadow-2xl">
          <div className="text-center max-w-3xl mx-auto space-y-3 font-jakarta">
            <span className="px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Jammu School Pilgrimage & Regional Reach
            </span>
            <h2 className="text-3xl sm:text-4xl font-cormorant font-bold text-[#FAF5EF]">
              Map of Jammu & Grassroots Circuit
            </h2>
            <p className="text-sm text-[#C4BBA3] leading-relaxed">
              The conscience of Aastitva was shaped on the ground across Jammu's districts—connecting urban institutions with border, suburban, and rural government schools to ensure every student gets a chance at existence.
            </p>
          </div>

          <div className="relative rounded-3xl bg-[#070A14] border border-[#243563]/60 p-6 sm:p-8 overflow-hidden min-h-[420px] flex flex-col justify-between shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

            <div className="relative w-full h-80 sm:h-96 flex items-center justify-center">
              <svg className="w-full h-full max-w-2xl opacity-35 text-[#D4AF37]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.75">
                <path d="M 15,20 C 25,12 45,15 60,25 C 75,30 85,25 92,35 C 90,55 82,75 75,85 C 60,88 40,82 25,75 C 15,60 10,40 15,20 Z" fill="#16203B" fillOpacity="0.4" />
                <path d="M 25,25 L 45,35 L 55,50 L 40,70 L 25,60 Z" stroke="#243563" strokeWidth="0.4" strokeDasharray="1,1" />
                <path d="M 55,50 L 75,40 L 85,60 L 62,65 Z" stroke="#243563" strokeWidth="0.4" strokeDasharray="1,1" />
                <line x1="48" y1="56" x2="54" y2="48" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="1,1" />
                <line x1="48" y1="56" x2="44" y2="72" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="1,1" />
                <line x1="48" y1="56" x2="32" y2="48" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="1,1" />
                <line x1="48" y1="56" x2="62" y2="64" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="1,1" />
                <line x1="48" y1="56" x2="76" y2="76" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="1,1" />
                <line x1="48" y1="56" x2="58" y2="38" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="1,1" />
                <line x1="48" y1="56" x2="24" y2="38" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="1,1" />
              </svg>

              {locations.map((loc) => {
                const isSelected = selectedLocation === loc.name;
                const isJammuCity = loc.name === 'Jammu City';
                return (
                  <button
                    key={loc.name}
                    onClick={() => setSelectedLocation(loc.name)}
                    style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group p-2 transition-all duration-300 ${
                      isSelected ? 'z-30 scale-125' : 'z-20 hover:scale-110'
                    }`}
                    title={`${loc.name} (District: ${loc.district})`}
                  >
                    <span className="relative flex h-4 w-4 items-center justify-center">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          isJammuCity ? 'bg-[#D4AF37]' : 'bg-[#52459E]'
                        }`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-3 w-3 border ${
                          isSelected
                            ? 'bg-[#D4AF37] border-[#FAF5EF]'
                            : isJammuCity
                            ? 'bg-[#D4AF37] border-[#070A14]'
                            : 'bg-[#16203B] border-[#D4AF37]'
                        }`}
                      />
                    </span>
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 top-5 whitespace-nowrap text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border transition-all ${
                        isSelected
                          ? 'bg-[#D4AF37] text-[#070A14] border-[#FAF5EF]'
                          : 'bg-[#070A14]/90 text-[#C4BBA3] border-[#243563] group-hover:text-[#FAF5EF]'
                      }`}
                    >
                      {loc.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedLocation && (
              <div className="p-4 rounded-2xl bg-[#16203B]/90 border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs z-30 font-jakarta">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-jakarta font-bold text-sm text-[#FAF5EF]">
                      {selectedLocation} — {locations.find((l) => l.name === selectedLocation)?.district} District, Jammu
                    </h4>
                    <p className="text-[#C4BBA3]">
                      {locations.find((l) => l.name === selectedLocation)?.role}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="overflow-hidden py-4 border-y border-[#D4AF37]/25 relative">
            <div className="flex whitespace-nowrap gap-8 animate-marquee text-lg sm:text-2xl font-jakarta font-bold tracking-widest text-[#D4AF37]/70 uppercase">
              <span>JAMMU CITY • NAGROTA • RS PURA • AKHNOOR • SAMBA • KATHUA • UDHAMPUR • REASI • RAJOURI • POONCH • DODA</span>
              <span>JAMMU CITY • NAGROTA • RS PURA • AKHNOOR • SAMBA • KATHUA • UDHAMPUR • REASI • RAJOURI • POONCH • DODA</span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 6: Mission & Vision */}
      <ScrollReveal direction="up" delay={0.15}>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 py-6">
          <div className="border-l-2 border-[#D4AF37] pl-6 sm:pl-8 space-y-4 text-left">
            <div className="p-3 w-fit rounded-2xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-cormorant font-bold text-var-text-primary">Mission</h3>
            <p className="text-base text-var-text-secondary leading-relaxed font-jakarta">
              To simplify the complexity of running academic events, so every idea gets the chance to fully exist.
            </p>
          </div>

          <div className="border-l-2 border-[#52459E] pl-6 sm:pl-8 space-y-4 text-left">
            <div className="p-3 w-fit rounded-2xl bg-[#52459E]/30 text-[#D4AF37] border border-[#D4AF37]/40">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-cormorant font-bold text-var-text-primary">Vision</h3>
            <p className="text-base text-var-text-secondary leading-relaxed font-jakarta">
              To become an institutional-level partner for events of every scale and to extend that existence to underprivileged schools and communities, starting with what we learn from our early, experienced partnerships.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 7 & 8: Why Trust a New Company & OUR VALUES */}
      <ScrollReveal direction="zoom" delay={0.15}>
        <section className="space-y-10 py-6">
          <div className="space-y-4 text-left max-w-4xl border-l-2 border-[#D4AF37] pl-6 sm:pl-8">
            <span className="px-3.5 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-wider inline-block font-jakarta">
              Institutional Trust
            </span>
            <h2 className="text-3xl sm:text-5xl font-cormorant font-bold text-var-text-primary">
              Why Trust a New Company
            </h2>
            <p className="text-base sm:text-lg text-var-text-secondary leading-relaxed font-jakarta">
              Our new & visionary approach is our hallmark. We operate without the bureaucracy of scale, the opacity of middlemen, or the apathy of corporate indifference. Just transparency, word-of-mouth reputation, and a founder who takes personal responsibility, offering self as a personal covenant for every event we help bring into existence.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-jakarta font-bold text-[#D4AF37] uppercase tracking-wider text-left pl-2">
              OUR VALUES
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {coreValues.map((val, idx) => {
                const IconComp = val.icon;
                return (
                  <div key={idx} className="rounded-2xl bg-[#070A14]/90 border border-[#D4AF37]/30 p-5 space-y-3 hover:border-[#D4AF37] transition-colors text-left">
                    <div className="p-2.5 w-fit rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h4 className="font-jakarta font-bold text-base text-var-text-primary">{val.name}</h4>
                    <p className="text-xs text-var-text-secondary leading-relaxed font-jakarta">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#070A14] border-2 border-[#D4AF37]/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-2 text-left relative z-10 font-jakarta">
              <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Founder's Personal Covenant
              </span>
              <h4 className="text-xl font-cormorant font-bold text-var-text-primary">
                "This is a promise: no hidden costs, no vague promises, just honest conversations from day one."
              </h4>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="shrink-0 px-8 py-4 rounded-xl shimmer-btn text-[#070A14] font-bold text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-2 z-10 min-touch"
            >
              <span>Partner With Our Founder</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};
