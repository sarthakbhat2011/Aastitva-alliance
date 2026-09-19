import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  AlertCircle,
  X,
  ArrowRight,
  Quote,
  Clock,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CountdownTime } from '../types';
import { sounds } from '../utils/soundEffects';

interface Props {
  onUnlock: () => void;
  onOpenRegister: () => void;
  countdown: CountdownTime;
}

const DEV_PASSCODE = 'bhatsarthakunrivalledunion2011,2001';

const QUOTES = [
  {
    quote:
      'Where conviction finds its voice, and intellect shapes the horizon—excellence is not an act, but the sovereign art of existence.',
    author: 'Aequitas Conclave Covenant of Excellence',
  },
  {
    quote:
      'The future does not belong to silent spectators, but to those who master the art of dialogue, diplomacy, and decisive leadership.',
    author: 'Aastitva Diplomatic Corps',
  },
  {
    quote:
      'Bridging world-class academic event infrastructure with unprecedented youth leadership across Jammu & Kashmir and Northern India.',
    author: 'Executive Secretariat',
  },
  {
    quote:
      'Architecting the highest standard of parliamentary deliberation. An uncompromised summit is taking shape.',
    author: 'Directorate of Academic Affairs',
  },
];

export const ComingSoonScreen: React.FC<Props> = ({
  onUnlock,
  onOpenRegister,
  countdown,
}) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto rotate quotes every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Ambient Starfield & Particle Glow Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const stars: {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speed: number;
      color: string;
    }[] = [];

    const colors = ['#D4AF37', '#FAF5EF', '#38BDF8', '#C084FC'];

    for (let i = 0; i < 90; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep galactic nebula radial glow
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7
      );
      grad.addColorStop(0, 'rgba(19, 28, 59, 0.45)');
      grad.addColorStop(0.5, 'rgba(11, 18, 36, 0.6)');
      grad.addColorStop(1, 'rgba(5, 8, 17, 0.95)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render drifting stars
      stars.forEach((star) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = star.radius * 4;
        ctx.fill();
        ctx.restore();

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    if (passcode.trim() === DEV_PASSCODE) {
      sounds.playChime();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      sessionStorage.setItem('astitva_site_unlocked', 'true');
      setPasscodeError('');
      setTimeout(() => {
        setIsVerifying(false);
        setShowAuthModal(false);
        onUnlock();
      }, 500);
    } else {
      sounds.playHover();
      setIsVerifying(false);
      setPasscodeError('Invalid Developer Authorization Code. Access Denied.');
    }
  };

  const nextQuote = () => {
    sounds.playTap();
    setCurrentQuoteIndex((prev) => (prev + 1) % QUOTES.length);
  };

  const prevQuote = () => {
    sounds.playTap();
    setCurrentQuoteIndex((prev) => (prev - 1 + QUOTES.length) % QUOTES.length);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050811] text-[#FAF5EF] flex flex-col justify-between overflow-x-hidden select-none font-sans">
      {/* Background Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Radiant Atmosphere Backlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-b from-[#D4AF37]/15 via-[#1E293B]/20 to-transparent blur-[140px] pointer-events-none z-0" />

      {/* TOP BAR: Conclave accreditation & Registration Portal link */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]">
            <span className="font-serif font-bold text-base">✦</span>
          </div>
          <div>
            <span className="font-serif font-bold text-sm tracking-wide text-white block">
              AASTITVA ALLIANCE
            </span>
            <span className="text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase block">
              Academic Event Management + Network Organisation
            </span>
          </div>
        </div>

        {/* Top Direct Registration Button */}
        <button
          onClick={() => {
            sounds.playTap();
            onOpenRegister();
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#070A14] border border-[#D4AF37]/50 transition-all duration-300 text-xs font-mono font-bold tracking-wider cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Delegate Registration Portal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* CENTER CONTENT: Buzz Headline, Countdown & Rotating Quotes */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-8 sm:py-12 flex flex-col items-center text-center my-auto space-y-8">
        {/* Status Pill with Pulsing Dot */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#16203B]/80 border border-[#D4AF37]/40 backdrop-blur-md shadow-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]" />
          </span>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#D4AF37]">
            Official Platform Inception • Coming Soon
          </span>
        </motion.div>

        {/* Main Buzz Headline */}
        <div className="space-y-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-[#FAF5EF] tracking-tight leading-[1.1]"
          >
            A New Sovereign Standard <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF5EF] via-[#D4AF37] to-[#FAF5EF] animate-pulse">
              Is Taking Shape.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#C4BBA3] max-w-2xl mx-auto font-light leading-relaxed"
          >
            Architecting the future of youth diplomacy, parliamentary discourse, and institutional academic event coordination across Jammu & Kashmir.
          </motion.p>
        </div>

        {/* LIVE SUMMIT COUNTDOWN MATRIX */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="p-5 sm:p-6 rounded-3xl bg-[#0D1427]/80 border border-[#D4AF37]/35 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl max-w-xl w-full"
        >
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#243563]/60 text-xs">
            <span className="font-mono text-[11px] text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              Inaugural Conclave: Aequitas Summit 2026
            </span>
            <span className="font-mono text-[10px] text-[#A39B88]">
              October 24–25, 2026 • Jammu
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            {[
              { label: 'DAYS', value: countdown.days },
              { label: 'HOURS', value: countdown.hours },
              { label: 'MINUTES', value: countdown.minutes },
              { label: 'SECONDS', value: countdown.seconds },
            ].map((unit, i) => (
              <div
                key={i}
                className="p-2.5 sm:p-3.5 rounded-2xl bg-[#070A14]/90 border border-[#243563] shadow-inner flex flex-col items-center"
              >
                <span className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-[#D4AF37] tracking-widest mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Primary Action Button */}
          <div className="mt-5 pt-4 border-t border-[#243563]/60">
            <button
              onClick={() => {
                sounds.playTap();
                onOpenRegister();
              }}
              className="w-full py-3.5 rounded-xl shimmer-btn text-[#070A14] font-bold text-sm tracking-wide shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Register Now for Aequitas Summit 2026</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* ROTATING EXCELLENCE QUOTES DECK */}
        <div className="w-full max-w-2xl relative min-h-[110px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuoteIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="space-y-2 px-6"
            >
              <Quote className="w-5 h-5 text-[#D4AF37]/50 mx-auto mb-1" />
              <p className="text-xs sm:text-sm font-serif italic text-[#FAF5EF]/90 leading-relaxed max-w-xl mx-auto">
                "{QUOTES[currentQuoteIndex].quote}"
              </p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
                — {QUOTES[currentQuoteIndex].author}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Quote navigation controls */}
          <button
            onClick={prevQuote}
            className="absolute left-0 p-1.5 rounded-full text-[#768074] hover:text-[#D4AF37] transition-colors"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextQuote}
            className="absolute right-0 p-1.5 rounded-full text-[#768074] hover:text-[#D4AF37] transition-colors"
            aria-label="Next quote"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* FOOTER: Accreditation & The Hidden Developer Access Option */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#243563]/40 text-xs text-[#768074]">
        <div className="text-center sm:text-left text-[11px]">
          <span>© 2026 Aastitva Alliance. All rights reserved.</span>
          <span className="mx-2">•</span>
          <span className="text-[#A39B88]">Aequitas Summit Secretariat</span>
        </div>

        {/* PARTIALLY VISIBLE DEVELOPER ACCESS OPTION */}
        <div className="flex items-center">
          <button
            onClick={() => {
              sounds.playTap();
              setShowAuthModal(true);
            }}
            className="text-[10px] font-mono tracking-widest text-[#768074]/25 hover:text-[#D4AF37]/90 transition-all duration-300 select-none py-1.5 px-3 rounded-lg hover:bg-[#16203B]/60 border border-transparent hover:border-[#D4AF37]/30 flex items-center gap-1.5 cursor-pointer group"
            title="Authorized Developer Gateway"
          >
            <Key className="w-3 h-3 opacity-30 group-hover:opacity-100 group-hover:text-[#D4AF37] transition-opacity" />
            <span className="opacity-40 group-hover:opacity-100 transition-opacity">
              SYS_GATEWAY // DEVELOPER AUTH
            </span>
          </button>
        </div>
      </footer>

      {/* DEVELOPER AUTHORIZATION MODAL (Same passcode as Developer Mailbox) */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070A14]/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-[#0D1427] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-7 space-y-5 shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#243563]">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#FAF5EF]">
                      Secretariat Developer Gateway
                    </h3>
                    <p className="text-[11px] text-[#C4BBA3]">
                      Enter authorization key to unlock main platform.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAuthModal(false)}
                  className="p-1.5 rounded-lg text-[#C4BBA3] hover:text-white hover:bg-[#16203B] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAuthorize} className="space-y-4 text-left text-xs">
                <div>
                  <label className="block text-[#D4AF37] font-semibold mb-1.5 uppercase font-mono tracking-wider text-[11px]">
                    Developer Authorization Code
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Enter developer passcode..."
                      className="w-full px-4 py-3 rounded-xl bg-[#070A14] border border-[#243563] text-white text-xs focus:outline-none focus:border-[#D4AF37] pr-10"
                      autoFocus
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-[#C4BBA3] hover:text-[#D4AF37]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {passcodeError && (
                  <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{passcodeError}</span>
                  </div>
                )}

                <div className="pt-1 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAuthModal(false)}
                    className="px-4 py-2 rounded-xl bg-[#16203B] hover:bg-[#243563] text-white font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="px-5 py-2 rounded-xl shimmer-btn text-[#070A14] font-bold flex items-center gap-1.5 shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>{isVerifying ? 'Authenticating...' : 'Unlock Website'}</span>
                  </button>
                </div>
              </form>

              <div className="text-[10px] font-mono text-[#768074] flex items-center justify-center gap-1.5 pt-2 border-t border-[#243563]/50">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Encrypted Developer Gateway • Key matches Developer Mailbox</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
