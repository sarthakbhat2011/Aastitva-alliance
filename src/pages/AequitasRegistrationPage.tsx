import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Calendar,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageSquare,
  Home,
  ExternalLink,
  Volume2,
  VolumeX,
  Flame,
  Ticket,
  Gamepad2,
  Music,
  Crown,
  PartyPopper,
  Radio,
} from 'lucide-react';
import { INITIAL_SUMMIT_CONFIG } from '../data';
import { sounds } from '../utils/soundEffects';
import { DeveloperMailboxModal } from '../components/DeveloperMailboxModal';

export const PAYMENT_CONFIG = {
  standardAmount: '3000',
  standardFormatted: '₹3,000',
  accommodationAmount: '5999',
  accommodationFormatted: '₹5,999',
  amount: '3000',
  formattedAmount: '₹3,000',
  surgeUpcomingAmount: '3500',
  surgeUpcomingFormatted: '₹3,500',
  surgeEffectiveDate: '25th October 2026',
  spotsRemaining: 0,
  upiNumber: '9797937138',
  upiNumberFormatted: '+91 97979 37138',
  accountNumber: '0116040100017669',
  ifscCode: 'JAKA0GNGYAL',
  bankName: 'Jammu & Kashmir Bank (J&K Bank)',
  branch: 'Gangyal, Jammu',
  beneficiaryName: 'Aequitas Conclave / Aastitva Alliances',
  qrCodeUrl: '/payment-qr.jpg',
  primaryContact: {
    number: '+91 99065 12613',
    raw: '919906512613',
    label: 'Primary Secretariat Contact',
  },
  secondaryContacts: [
    { number: '+91 88993 46704', raw: '918899346704', label: 'Secondary / Emergency Desk' },
    { number: '+91 95963 72727', raw: '919596372727', label: 'Secondary / Emergency Desk' },
    { number: '+91 95484 99951', raw: '919548499951', label: 'Secondary / Emergency Desk' },
  ],
};

export const AequitasRegistrationPage: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(sounds.isEnabled());
  const [devMailboxOpen, setDevMailboxOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    if (typeof window !== 'undefined') {
      const search = window.location.search.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (search.includes('mailbox=true') || search.includes('tab=mailbox') || search.includes('dev=') || hash === '#mailbox') {
        setDevMailboxOpen(true);
      }
    }
  }, []);

  const toggleSound = () => {
    const newState = sounds.toggle();
    setSoundEnabled(newState);
    if (newState) sounds.playChime();
  };

  return (
    <div className="min-h-screen bg-[#050811] text-[#FAF5EF] relative overflow-x-hidden selection:bg-[#D4AF37] selection:text-[#070A14] font-jakarta pb-20">
      {/* Dynamic Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-[#8B5CF6]/15 via-[#D4AF37]/10 to-transparent blur-3xl opacity-75" />
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#EC4899]/10 rounded-full blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FAF5EF 1px, transparent 0)`,
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-10 border-b border-[#D4AF37]/20 bg-[#070A14]/85 backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href="/"
              onClick={() => sounds.playTap()}
              className="flex items-center gap-2 group"
              title="Return to Aequitas Summit Home"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] p-0.5 shadow-md group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#070A14] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="font-playfair font-bold text-sm tracking-wide text-white block">
                  AEQUITAS SUMMIT 2026
                </span>
                <span className="text-[10px] font-mono text-[#D4AF37] tracking-widest block uppercase">
                  Radisson Blu Jammu
                </span>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleSound}
              className="p-2 rounded-xl bg-[#0D1427] border border-[#D4AF37]/30 text-[#C4BBA3] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all cursor-pointer"
              title={soundEnabled ? 'Mute Interface Audio' : 'Enable Interface Audio'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#D4AF37]" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <a
              href="/events-register"
              onClick={() => sounds.playTap()}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#8B5CF6] text-white text-xs font-mono font-bold shadow-md hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer animate-pulse"
            >
              <PartyPopper className="w-3.5 h-3.5" />
              <span>Prom &amp; Events Open</span>
            </a>

            <a
              href="/"
              onClick={() => sounds.playTap()}
              className="px-3 py-1.5 rounded-xl bg-[#0D1427] border border-[#D4AF37]/30 text-[#C4BBA3] hover:text-white hover:border-[#D4AF37] text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Home</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 space-y-8 sm:space-y-12">
        {/* ========================================================================= */}
        {/* SECTION 1: OFFICIAL DELEGATE REGISTRATION CLOSURE NOTICE                  */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-b from-[#120D24]/95 via-[#0A0D1A]/95 to-[#060812] border-2 border-rose-500/40 p-6 sm:p-10 text-center space-y-5 shadow-[0_0_50px_rgba(244,63,94,0.15)] relative overflow-hidden"
        >
          {/* Ambient red / rose background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Closed Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/70 border border-rose-500/50 text-rose-300 text-xs font-mono font-extrabold uppercase tracking-widest shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping inline-block" />
            <span>REGISTRATION STATUS: OFFICIALLY CLOSED</span>
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-playfair font-black text-white tracking-tight">
              Delegate Registration Has <span className="text-rose-400">Officially Ended</span>
            </h1>
            <p className="text-xs sm:text-base text-[#C4BBA3] leading-relaxed">
              All committee allocations, executive council portfolios, and residential delegate packages across our 6 historic councils (CC, UNHRC, Lok Sabha, UN Women, BRICS, and IPC) have reached <strong className="text-white">100% capacity</strong>.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#070A14]/90 border border-rose-500/30 max-w-xl mx-auto text-xs font-mono text-[#E2D9C8] flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>The delegate application portal is sealed. No further delegate submissions will be accepted.</span>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* SECTION 2: HIGH-VOLTAGE CALLOUT: PROM & EVENTS ARE STILL ON!              */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-3xl bg-gradient-to-r from-[#240B48] via-[#120826] to-[#2B0E38] border-2 border-[#D4AF37] p-6 sm:p-10 shadow-[0_0_60px_rgba(212,175,55,0.35)] relative overflow-hidden text-center space-y-6"
        >
          {/* Shimmer light effect */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#D4AF37]/20 via-[#C084FC]/20 to-transparent blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-[#EC4899]/20 to-transparent blur-2xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-[#FDE047] text-xs font-mono font-black uppercase tracking-wider shadow-sm animate-pulse">
            <Flame className="w-4 h-4 text-[#FDE047]" />
            <span>THE CELEBRATION IS JUST GETTING STARTED!</span>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-extrabold text-white leading-tight">
              Prom Night &amp; Recreational Events Are <span className="gold-gradient-text">STILL ON!</span>
            </h2>
            <p className="text-sm sm:text-lg text-[#E9D5FF] leading-relaxed font-jakarta">
              Delegate seats are locked, but the stage is wide open for glory, music, and gaming! Grab your <strong className="text-white underline underline-offset-4 decoration-[#D4AF37]">Prom Night passes</strong> and join the <strong className="text-white underline underline-offset-4 decoration-[#C084FC]">Recreational Tournaments</strong> before tickets sell out!
            </p>
          </div>

          {/* Major Hero Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/events-register"
              onClick={() => sounds.playTap()}
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#EC4899] text-[#070A14] font-black text-sm sm:text-base tracking-wide shadow-[0_0_40px_rgba(212,175,55,0.6)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer group"
            >
              <Ticket className="w-5 h-5 text-[#070A14] group-hover:rotate-12 transition-transform" />
              <span>GRAB YOUR SEATS &amp; PASSES NOW</span>
              <ArrowRight className="w-5 h-5 text-[#070A14] group-hover:translate-x-1.5 transition-transform" />
            </a>

            <a
              href="#open-events"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#0B081A]/80 hover:bg-[#1A1038] border border-[#D4AF37]/40 text-[#FAF5EF] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer font-mono"
            >
              <span>View Open Event Lineup</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </a>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* SECTION 3: SHOWCASE OF CURRENTLY OPEN PASSES & EVENTS                     */}
        {/* ========================================================================= */}
        <section id="open-events" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#D4AF37]/25 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
                Official Event Deck • Registrations Open
              </span>
              <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-white mt-1">
                Choose Your Arena &amp; Book Your Entry
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold self-start sm:self-auto">
              Live Gateway Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Card 1: Prom Night */}
            <div className="rounded-2xl bg-gradient-to-b from-[#1E1038] via-[#0D081D] to-[#070A14] border-2 border-[#D4AF37]/60 p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xl hover:border-[#D4AF37] transition-all hover:scale-[1.01] group">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#FDE047] text-[10px] font-mono font-bold uppercase tracking-wider">
                    Grand Gala Night
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">Fast Filling</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Crown className="w-6 h-6 text-[#FDE047]" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-playfair font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      Aequitas Prom Night 2026
                    </h4>
                    <p className="text-xs text-[#C4BBA3] mt-1 leading-relaxed">
                      Red carpet arrival, live high-energy DJ set, royal prom court crowning, photo booths, and a lavish executive gala banquet.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#070A14]/80 border border-[#D4AF37]/30 space-y-1 font-mono text-xs">
                  <div className="text-[#D4AF37] font-bold">Packages Available:</div>
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-white">
                    <span className="px-2 py-0.5 rounded bg-[#16203B] border border-[#243563]">Stag: ₹599</span>
                    <span className="px-2 py-0.5 rounded bg-[#16203B] border border-[#243563]">Duo: ₹999</span>
                    <span className="px-2 py-0.5 rounded bg-[#2E1065] border border-[#A855F7]/50 text-[#E9D5FF] font-bold">Squad: ₹1,999</span>
                  </div>
                </div>
              </div>

              <a
                href="/events-register"
                onClick={() => sounds.playTap()}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E8A53E] text-[#070A14] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all font-mono"
              >
                <span>Book Prom Night Tickets</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Card 2: E-Sports (BGMI & Free Fire) */}
            <div className="rounded-2xl bg-gradient-to-b from-[#131E3D] via-[#091124] to-[#070A14] border-2 border-blue-500/40 p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xl hover:border-blue-400 transition-all hover:scale-[1.01] group">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/50 text-blue-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                    E-Sports Championship
                  </span>
                  <span className="text-xs font-mono text-blue-400 font-bold">Live Arena</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/20 border border-blue-500/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Gamepad2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-playfair font-bold text-white group-hover:text-blue-300 transition-colors">
                      BGMI &amp; Free Fire Tournaments
                    </h4>
                    <p className="text-xs text-[#C4BBA3] mt-1 leading-relaxed">
                      Custom room battle royale warfare with live caster shoutcasting, squad coordination, and cash rewards for Champions.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#070A14]/80 border border-blue-500/30 space-y-1 font-mono text-xs">
                  <div className="text-blue-400 font-bold">Package Tier Pricing:</div>
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-white">
                    <span className="px-2 py-0.5 rounded bg-[#16203B] border border-[#243563]">Individual: ₹250</span>
                    <span className="px-2 py-0.5 rounded bg-[#16203B] border border-[#243563]">Duo: ₹450</span>
                    <span className="px-2 py-0.5 rounded bg-[#1E293B] border border-blue-500/50 text-blue-200 font-bold">Squad: ₹800</span>
                  </div>
                </div>
              </div>

              <a
                href="/events-register"
                onClick={() => sounds.playTap()}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all font-mono shadow-md"
              >
                <span>Register Gaming Squad</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Card 3: Strategy (Ludo & Mafia) */}
            <div className="rounded-2xl bg-gradient-to-b from-[#2E1065] via-[#150A2E] to-[#070A14] border-2 border-purple-500/40 p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xl hover:border-purple-400 transition-all hover:scale-[1.01] group">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/50 text-purple-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                    Mind Games &amp; Strategy
                  </span>
                  <span className="text-xs font-mono text-purple-400 font-bold">Popular</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-500/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Flame className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-playfair font-bold text-white group-hover:text-purple-300 transition-colors">
                      Ludo &amp; Mafia Tournaments
                    </h4>
                    <p className="text-xs text-[#C4BBA3] mt-1 leading-relaxed">
                      High-stakes deception, social deduction, board strategies, and fierce knockout brackets.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#070A14]/80 border border-purple-500/30 space-y-1 font-mono text-xs">
                  <div className="text-purple-400 font-bold">Package Tier Pricing:</div>
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-white">
                    <span className="px-2 py-0.5 rounded bg-[#16203B] border border-[#243563]">Individual: ₹250</span>
                    <span className="px-2 py-0.5 rounded bg-[#16203B] border border-[#243563]">Duo: ₹450</span>
                    <span className="px-2 py-0.5 rounded bg-[#2E1065] border border-purple-500/50 text-purple-200 font-bold">Squad: ₹800</span>
                  </div>
                </div>
              </div>

              <a
                href="/events-register"
                onClick={() => sounds.playTap()}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all font-mono shadow-md"
              >
                <span>Enter Strategy Arena</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Card 4: Rapunzel's Vanity, Dumb Charades, Musical Chairs, FIFA */}
            <div className="rounded-2xl bg-gradient-to-b from-[#1C160B] via-[#0D0B05] to-[#070A14] border-2 border-amber-500/40 p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xl hover:border-amber-400 transition-all hover:scale-[1.01] group">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                    Special Pageantry &amp; Fun
                  </span>
                  <span className="text-xs font-mono text-amber-400 font-bold">Open Access</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Music className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-playfair font-bold text-white group-hover:text-amber-300 transition-colors">
                      Rapunzel's Vanity &amp; Stage Games
                    </h4>
                    <p className="text-xs text-[#C4BBA3] mt-1 leading-relaxed">
                      Rapunzel's Vanity (DIY hair &amp; styling), DUMB CHARADES, Musical Chairs, and FIFA 24 Console Showdown.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#070A14]/80 border border-amber-500/30 space-y-1 font-mono text-xs">
                  <div className="text-amber-400 font-bold">Standard Activity Pricing:</div>
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-white">
                    <span className="px-2.5 py-0.5 rounded bg-[#16203B] border border-amber-500/40 text-amber-200 font-bold">
                      Standard Entry: ₹200 per activity
                    </span>
                  </div>
                </div>
              </div>

              <a
                href="/events-register"
                onClick={() => sounds.playTap()}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-[#070A14] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all font-mono shadow-md"
              >
                <span>Register for Recreational Activities</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: ASSISTANCE FOR ALREADY REGISTERED DELEGATES                    */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#070A14]/90 border border-[#D4AF37]/30 text-left space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <h4 className="font-playfair font-bold text-base sm:text-lg text-white">
                Already Registered as a Delegate?
              </h4>
            </div>
            <span className="text-[11px] font-mono text-[#D4AF37] px-2.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 self-start sm:self-auto">
              Allocation Records Safe
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed">
            All applications submitted prior to the deadline have been successfully archived in the Secretariat database. Official allotment letters, committee background guides, and verification credentials are being dispatched directly to your registered contact channels.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="tel:+919906512613"
              className="px-4 py-2 rounded-xl bg-[#16203B] border border-[#D4AF37]/35 text-white hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all text-xs font-mono font-bold flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Secretariat Helpline: +91 99065 12613</span>
            </a>

            <a
              href={`https://wa.me/919906512613?text=${encodeURIComponent(
                'Hello Aequitas Secretariat, I have an inquiry regarding my existing delegate allotment.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#0E3A2F] text-emerald-300 hover:bg-emerald-500 hover:text-white transition-all text-xs font-mono font-bold flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>
      </main>

      {/* Developer Partner Mailbox Modal (Secretariat access preserved) */}
      <DeveloperMailboxModal
        isOpen={devMailboxOpen}
        onClose={() => setDevMailboxOpen(false)}
      />
    </div>
  );
};
