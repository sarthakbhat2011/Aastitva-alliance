import React, { useState } from 'react';
import { Page } from '../types';
import {
  Sparkles,
  MapPin,
  ShieldCheck,
  Award,
  HeartHandshake,
  Compass,
  Target,
  Eye,
  CheckCircle2,
  ArrowRight,
  Quote,
  Globe,
  Layers,
  Feather,
  Maximize2,
  X
} from 'lucide-react';
import { Astitva3DCanvas } from '../components/Astitva3DCanvas';

interface Props {
  onNavigate: (page: Page) => void;
}

export const FounderPage: React.FC<Props> = ({ onNavigate }) => {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>('Jammu');

  // 4 Editorial Founder Placeholder Photos (Clean badges removed as requested)
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
      title: 'Jammu School Pilgrimage',
      subtitle: 'Grassroots Discovery',
      caption: 'Visiting government & non-privileged schools across Jammu to understand true access gaps.',
      img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: 3,
      title: 'Aequitas Summit Blueprint',
      subtitle: 'Inaugural Partnership',
      caption: 'Building turnkey secretariats, delegate handbooks, and vetted Executive Boards.',
      img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: 4,
      title: 'The Personal Covenant',
      subtitle: 'Founder Leadership',
      caption: 'Personal responsibility and transparent covenant for every institution we serve.',
      img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200',
    },
  ];

  // Exclusive Jammu Region Map & School Pilgrimage Locations Data
  const locations = [
    { name: 'Jammu City', district: 'Jammu', role: 'Genesis Hub & Aastitva Alliance Headquarters', coordinates: { x: 48, y: 56 } },
    { name: 'Nagrota', district: 'Jammu', role: 'Government High School Pilgrimage Site • Suburban Jammu', coordinates: { x: 54, y: 48 } },
    { name: 'R.S. Pura', district: 'Jammu', role: 'Border District School Outreach • Rural Access Hub', coordinates: { x: 44, y: 72 } },
    { name: 'Akhnoor', district: 'Jammu', role: 'Chenab Belt School Pilgrimage & Debate Access Site', coordinates: { x: 32, y: 48 } },
    { name: 'Samba', district: 'Samba', role: 'Educational Circuit & Inter-School Delegate Link', coordinates: { x: 62, y: 64 } },
    { name: 'Kathua', district: 'Kathua', role: 'Southern Border District School Access Hub', coordinates: { x: 76, y: 76 } },
    { name: 'Udhampur', district: 'Udhampur', role: 'Highland Academic Summit Partner Link', coordinates: { x: 58, y: 38 } },
    { name: 'Reasi', district: 'Reasi', role: 'Hill District School Pilgrimage & Mentorship Site', coordinates: { x: 42, y: 34 } },
    { name: 'Rajouri', district: 'Rajouri', role: 'Western Jammu Range School Access Hub', coordinates: { x: 24, y: 38 } },
    { name: 'Poonch', district: 'Poonch', role: 'Frontier Academic Outreach & Student Mentorship', coordinates: { x: 18, y: 22 } },
    { name: 'Doda', district: 'Doda', role: 'Eastern Jammu Mountain Education Access Hub', coordinates: { x: 74, y: 28 } },
  ];

  // Core Values
  const coreValues = [
    { name: 'Purpose', desc: 'Every decision serves the student delegates and the institution’s vision.', icon: Target },
    { name: 'Integrity', desc: 'Unbending academic rigor, fair moderation, and zero hidden clauses.', icon: ShieldCheck },
    { name: 'Access', desc: 'Extending event excellence beyond elite halls to underprivileged schools.', icon: HeartHandshake },
    { name: 'Presence', desc: 'Physical on-ground founder availability at every step of event execution.', icon: Compass },
    { name: 'Transparency', desc: 'Honest conversations, transparent budgets, and word-of-mouth trust.', icon: Eye },
  ];

  return (
    <div className="relative font-sans py-6 sm:py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      {/* Hero Header: Philosophy of Aastitva */}
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

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#FAF5EF] leading-tight">
              The Philosophy of <span className="gold-gradient-text">Aastitva</span>
            </h1>

            <div className="p-6 rounded-2xl bg-[#070A14]/80 border-l-4 border-[#D4AF37] backdrop-blur-md space-y-3 shadow-lg">
              <p className="text-base sm:text-xl font-serif italic text-[#D4AF37] leading-relaxed">
                "Aastitva translates to existence—the state of truly being, fully and completely."
              </p>
              <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed">
                We chose this name with profound intention. Because every event an organiser dreams of already exists somewhere in a proposal, a conversation, a hope that students will show up and something meaningful will happen.
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#C4BBA3] leading-relaxed max-w-3xl">
              What's missing is rarely the idea. It's everything standing between that idea and its full existence: the venue that falls through, the judge who cancels, the marketing that never quite reaches enough students.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <div className="px-4 py-2 rounded-xl bg-[#16203B]/90 border border-[#D4AF37]/30 text-xs font-medium text-[#FAF5EF] inline-flex items-center gap-2">
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

      {/* Section 2: So, who's running this thing? / Meet The Founder & 4-Shoot Editorial Gallery */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Editorial Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF5EF]">
            So, who's running this thing?
          </h2>
          <p className="text-sm text-[#C4BBA3]">
            Caption: <strong className="text-[#D4AF37]">Meet The Founder</strong> — Visual journey from MUN corridors to regional leadership.
          </p>
        </div>

        {/* 4-Shoot Founder Editorial Grid (Inspired by purposeandpixel, dervine, studiobrot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {founderPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo.id)}
              className="group relative rounded-3xl bg-[#0D1427] border border-[#243563]/50 hover:border-[#D4AF37]/60 overflow-hidden cursor-pointer transition-all duration-500 shadow-xl hover:-translate-y-1.5"
            >
              {/* Photo Frame Container */}
              <div className="relative h-80 w-full overflow-hidden bg-[#16203B]">
                <img
                  src={photo.img}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A14] via-[#070A14]/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                {/* Expand Overlay Icon */}
                <div className="absolute top-4 right-4 p-2 rounded-full bg-[#070A14]/80 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Card Footer Text */}
              <div className="p-5 space-y-1.5 relative z-10 bg-[#070A14]/90">
                <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-semibold block">
                  {photo.subtitle}
                </span>
                <h3 className="text-base font-serif font-bold text-[#FAF5EF] group-hover:text-[#D4AF37] transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-[#C4BBA3] line-clamp-2 leading-relaxed">
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
                className="absolute top-4 right-4 p-2.5 rounded-full bg-[#16203B] text-[#FAF5EF] hover:text-[#D4AF37] transition-colors border border-[#D4AF37]/30"
              >
                <X className="w-5 h-5" />
              </button>

              {(() => {
                const item = founderPhotos.find((p) => p.id === activePhoto);
                if (!item) return null;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-7 h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#D4AF37]/30">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="md:col-span-5 space-y-4 text-left">
                      <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider inline-block">
                        Founder Editorial Portfolio
                      </span>
                      <h3 className="text-2xl font-serif font-bold text-[#FAF5EF]">{item.title}</h3>
                      <p className="text-sm text-[#C4BBA3] leading-relaxed">{item.caption}</p>
                      <div className="p-4 rounded-xl bg-[#16203B] border border-[#243563] text-xs text-[#FAF5EF]">
                        💡 <em>Note: Founder shoot slot ready for custom photos replacement.</em>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Editorial Story Text Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
          <div className="lg:col-span-7 rounded-3xl bg-[#0D1427]/90 border border-[#243563]/60 p-8 sm:p-10 space-y-5 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                <Quote className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#FAF5EF]">The Corridors of Debate</h3>
                <p className="text-xs text-[#C4BBA3]">Origin & Observation</p>
              </div>
            </div>

            <p className="text-sm text-[#C4BBA3] leading-relaxed">
              My journey began in the corridors of India’s MUN circuits, where I witnessed a recurring irony: organisers, brimming with ambition, were often reduced to juggling logistics, often sacrificing the creative soul of their event to the tyranny of management.
            </p>
            <p className="text-sm text-[#C4BBA3] leading-relaxed">
              I observed that while every institution possesses distinct values and a desire to leave a mark, that spark is too often extinguished by the sheer burden of operational chaos.
            </p>

            <div className="p-4 rounded-2xl bg-[#16203B]/90 border border-[#D4AF37]/30 font-serif font-bold text-[#D4AF37] text-sm">
              Aastitva Alliance was born to fill that void.
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl bg-[#16203B]/60 border border-[#D4AF37]/30 p-8 sm:p-10 space-y-5 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
                The Core Insight
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#FAF5EF]">
                "Ideas were abundant. Existence was rare."
              </h3>
              <p className="text-sm text-[#C4BBA3] leading-relaxed">
                The problem is barely a lack of effort; rather, I feel it’s the absence of a dedicated ecosystem connecting all the pieces an event actually needs, each one solved in isolation, event after event, by people already stretched thin.
              </p>
            </div>

            <div className="pt-4 border-t border-[#243563]/50 flex items-center justify-between text-xs text-[#D4AF37]">
              <span>Collapse the Distance</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Beyond the Blueprint & Jammu Pilgrimage */}
      <section className="rounded-3xl bg-gradient-to-r from-[#0D1427] via-[#16203B] to-[#0D1427] border border-[#D4AF37]/35 p-8 sm:p-12 space-y-8 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="px-3.5 py-1 rounded-full bg-[#52459E]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest border border-[#D4AF37]/30 inline-block">
              Beyond the Blueprint
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF5EF]">
              The Pilgrimage Across Jammu
            </h2>
            <p className="text-sm text-[#C4BBA3] leading-relaxed">
              Having experienced these challenges firsthand, I set out to build something different: an organisation that makes event execution simpler, stronger, and more connected, so schools and organisers could focus on their students and creative prospects, not on holding logistics together.
            </p>
            <p className="text-sm text-[#C4BBA3] leading-relaxed">
              That commitment took me beyond planning. Before Aastitva Alliance took shape, I personally visited government schools across Jammu, to understand where the real gaps were. Not just for well-resourced institutions, the ones least likely to ever see the inside of a conference hall.
            </p>
            <div className="p-5 rounded-2xl bg-[#070A14]/90 border-l-4 border-[#D4AF37] space-y-2">
              <span className="text-xs text-[#D4AF37] font-bold uppercase">The Conscience of Aastitva</span>
              <p className="text-sm sm:text-base font-serif italic text-[#FAF5EF]">
                "Existence isn't a privilege reserved for the schools that can already afford it. It should be something every student gets a chance at."
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 h-80 rounded-2xl overflow-hidden border border-[#D4AF37]/40 relative group shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1200"
              alt="Jammu Government School Pilgrimage"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070A14] via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 right-4 text-xs font-serif font-bold text-[#FAF5EF] bg-[#070A14]/90 px-3.5 py-2 rounded-xl border border-[#D4AF37]/30 backdrop-blur-md">
              Grassroots Education Pilgrimage • Jammu Region
            </span>
          </div>
        </div>
      </section>

      {/* Section 4: Where We Are Today */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-3xl bg-[#0D1427]/90 border border-[#243563]/60 p-8 space-y-4 shadow-xl">
          <div className="p-3 w-fit rounded-2xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#FAF5EF]">Where We Are Today</h3>
          <p className="text-sm text-[#C4BBA3] leading-relaxed">
            We're building Aastitva Alliance from the ground up, starting with our first live partnership, the inaugural Aequitas Summit, with a clear intent to expand across event types and across the region in the years ahead.
          </p>
        </div>

        <div className="rounded-3xl bg-[#0D1427]/90 border border-[#D4AF37]/30 p-8 space-y-4 shadow-xl">
          <div className="p-3 w-fit rounded-2xl bg-[#52459E]/30 text-[#D4AF37] border border-[#D4AF37]/40">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#FAF5EF]">Radical Transparency</h3>
          <p className="text-sm text-[#C4BBA3] leading-relaxed">
            We're nascent, and we are transparent about that. But Aastitva was never about how long we've existed; it's about making sure the events we touch get to exist fully, properly, the way they were meant to.
          </p>
        </div>
      </section>

      {/* Section 5: Area 17 Style Jammu Interactive Pilgrimage Map */}
      <section className="rounded-3xl bg-gradient-to-b from-[#070A14] via-[#0D1427] to-[#070A14] border border-[#D4AF37]/35 p-8 sm:p-12 space-y-10 shadow-2xl">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> Jammu School Pilgrimage & Regional Reach
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF5EF]">
            Map of Jammu & Grassroots Circuit
          </h2>
          <p className="text-sm text-[#C4BBA3] leading-relaxed">
            The conscience of Aastitva was shaped on the ground across Jammu's districts—connecting urban institutions with border, suburban, and rural government schools to ensure every student gets a chance at existence.
          </p>
        </div>

        {/* Interactive Jammu Region SVG Map Component */}
        <div className="relative rounded-3xl bg-[#070A14] border border-[#243563]/60 p-6 sm:p-8 overflow-hidden min-h-[420px] flex flex-col justify-between shadow-inner">
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          {/* Interactive Jammu Map Graphic Frame */}
          <div className="relative w-full h-80 sm:h-96 flex items-center justify-center">
            {/* Custom Jammu District Region SVG Outline */}
            <svg className="w-full h-full max-w-2xl opacity-35 text-[#D4AF37]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.75">
              {/* Jammu Region Territory Path */}
              <path d="M 15,20 C 25,12 45,15 60,25 C 75,30 85,25 92,35 C 90,55 82,75 75,85 C 60,88 40,82 25,75 C 15,60 10,40 15,20 Z" fill="#16203B" fillOpacity="0.4" />
              <path d="M 25,25 L 45,35 L 55,50 L 40,70 L 25,60 Z" stroke="#243563" strokeWidth="0.4" strokeDasharray="1,1" />
              <path d="M 55,50 L 75,40 L 85,60 L 62,65 Z" stroke="#243563" strokeWidth="0.4" strokeDasharray="1,1" />
              
              {/* Connecting Lines between Jammu Hub and Districts */}
              <line x1="48" y1="56" x2="54" y2="48" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="1,1" />
              <line x1="48" y1="56" x2="44" y2="72" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="1,1" />
              <line x1="48" y1="56" x2="32" y2="48" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="1,1" />
              <line x1="48" y1="56" x2="62" y2="64" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="1,1" />
              <line x1="48" y1="56" x2="76" y2="76" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="1,1" />
              <line x1="48" y1="56" x2="58" y2="38" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="1,1" />
              <line x1="48" y1="56" x2="24" y2="38" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="1,1" />
            </svg>

            {/* Pulsing Interactive Location Nodes for Jammu Map */}
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
                  <span className={`relative flex h-4 w-4 items-center justify-center`}>
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

          {/* Selected Jammu Location Info Drawer */}
          {selectedLocation && (
            <div className="p-4 rounded-2xl bg-[#16203B]/90 border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs z-30">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#FAF5EF]">
                    {selectedLocation} — {locations.find((l) => l.name === selectedLocation)?.district} District, Jammu
                  </h4>
                  <p className="text-[#C4BBA3]">
                    {locations.find((l) => l.name === selectedLocation)?.role}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] bg-[#070A14] px-3 py-1 rounded-full border border-[#D4AF37]/30">
                Jammu Pilgrimage Site
              </span>
            </div>
          )}
        </div>

        {/* Area 17 Style Kinetic Jammu Location Scroll Marquee */}
        <div className="overflow-hidden py-4 border-y border-[#D4AF37]/25 relative">
          <div className="flex whitespace-nowrap gap-8 animate-marquee text-lg sm:text-2xl font-serif font-bold tracking-widest text-[#D4AF37]/70 uppercase">
            <span>JAMMU CITY • NAGROTA • RS PURA • AKHNOOR • SAMBA • KATHUA • UDHAMPUR • REASI • RAJOURI • POONCH • DODA</span>
            <span>JAMMU CITY • NAGROTA • RS PURA • AKHNOOR • SAMBA • KATHUA • UDHAMPUR • REASI • RAJOURI • POONCH • DODA</span>
          </div>
        </div>
      </section>

      {/* Section 6: Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-3xl bg-[#0D1427]/90 border border-[#D4AF37]/40 p-8 space-y-4 shadow-xl">
          <div className="p-3 w-fit rounded-2xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#FAF5EF]">Mission</h3>
          <p className="text-sm text-[#C4BBA3] leading-relaxed">
            To simplify the complexity of running academic events, so every idea gets the chance to fully exist.
          </p>
        </div>

        <div className="rounded-3xl bg-[#0D1427]/90 border border-[#52459E]/50 p-8 space-y-4 shadow-xl">
          <div className="p-3 w-fit rounded-2xl bg-[#52459E]/30 text-[#D4AF37] border border-[#D4AF37]/40">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#FAF5EF]">Vision</h3>
          <p className="text-sm text-[#C4BBA3] leading-relaxed">
            To become an institutional-level partner for events of every scale and to extend that existence to underprivileged schools and communities, starting with what we learn from our early, experienced partnerships.
          </p>
        </div>
      </section>

      {/* Section 7 & 8: Why Trust a New Company & OUR VALUES / Personal Covenant */}
      <section className="rounded-3xl bg-gradient-to-br from-[#0D1427] via-[#16203B] to-[#070A14] border border-[#D4AF37]/40 p-8 sm:p-12 space-y-10 shadow-2xl">
        <div className="space-y-4 text-left max-w-4xl">
          <span className="px-3.5 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-wider inline-block">
            Institutional Trust
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF5EF]">
            Why Trust a New Company
          </h2>
          <p className="text-sm sm:text-base text-[#C4BBA3] leading-relaxed">
            Our new & visionary approach is our hallmark. We operate without the bureaucracy of scale, the opacity of middlemen, or the apathy of corporate indifference. Just transparency, word-of-mouth reputation, and a founder who takes personal responsibility, offering self as a personal covenant for every event we help bring into existence.
          </p>
        </div>

        {/* Our Values Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-serif font-bold text-[#D4AF37] uppercase tracking-wider">
            OUR VALUES
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {coreValues.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div key={idx} className="rounded-2xl bg-[#070A14]/90 border border-[#D4AF37]/30 p-5 space-y-3 hover:border-[#D4AF37] transition-colors">
                  <div className="p-2.5 w-fit rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#FAF5EF]">{val.name}</h4>
                  <p className="text-xs text-[#C4BBA3] leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Personal Covenant Promise Banner */}
        <div className="p-8 rounded-3xl bg-[#070A14] border-2 border-[#D4AF37]/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 text-left relative z-10">
            <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Founder's Personal Covenant
            </span>
            <h4 className="text-xl font-serif font-bold text-[#FAF5EF]">
              "This is a promise: no hidden costs, no vague promises, just honest conversations from day one."
            </h4>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="shrink-0 px-8 py-4 rounded-xl shimmer-btn text-[#070A14] font-bold text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-2 z-10"
          >
            <span>Partner With Our Founder</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
