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
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Globe,
  Compass,
  Mail,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CountdownTime } from '../types';
import { sounds } from '../utils/soundEffects';
import { Astitva3DCanvas } from './Astitva3DCanvas';
import { COMMITTEES } from '../data';

interface Props {
  onUnlock: () => void;
  onOpenRegister: () => void;
  countdown?: CountdownTime;
  onOpenDevMailbox?: () => void;
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
  onOpenDevMailbox,
}) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Ensure full page scrolling is unlocked
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

  // Auto rotate quotes every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Ambient Starfield, Shooting Stars & Galactic Planetary Effects Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 1. Galactic Starfield
    const stars: {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      pulseSpeed: number;
      speed: number;
      color: string;
    }[] = [];

    const starColors = ['#D4AF37', '#FAF5EF', '#38BDF8', '#C084FC', '#FDE047'];

    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        speed: Math.random() * 0.3 + 0.05,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // 2. Shooting Stars System
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
      color: string;
      active: boolean;
    }

    const shootingStars: ShootingStar[] = [];
    const spawnShootingStar = () => {
      if (Math.random() < 0.45 && shootingStars.filter((s) => s.active).length < 4) {
        const palettes = [
          'rgba(212, 175, 55, ',   // Imperial Gold
          'rgba(255, 255, 255, ',   // Pure Starlight White
          'rgba(192, 132, 252, ',   // Royal Violet
          'rgba(56, 189, 248, ',    // Electric Cyan
        ];
        shootingStars.push({
          x: Math.random() * (width * 1.2) - width * 0.1,
          y: Math.random() * (height * 0.5),
          length: Math.random() * 120 + 70,
          speed: Math.random() * 9 + 5,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.25,
          alpha: 1.0,
          color: palettes[Math.floor(Math.random() * palettes.length)],
          active: true,
        });
      }
    };

    // 3. Planetary Orbital Geometry State
    let planetRotation = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse Parallax Easing
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      planetRotation += 0.003;

      // A. Deep Cosmic Nebula Gradients
      const nebula1 = ctx.createRadialGradient(
        width * 0.5 + (mouseX - width / 2) * 0.04,
        height * 0.35 + (mouseY - height / 2) * 0.04,
        0,
        width * 0.5,
        height * 0.35,
        Math.max(width, height) * 0.65
      );
      nebula1.addColorStop(0, 'rgba(88, 28, 135, 0.28)'); // Deep royal purple
      nebula1.addColorStop(0.4, 'rgba(30, 27, 75, 0.35)'); // Navy violet
      nebula1.addColorStop(0.75, 'rgba(15, 23, 42, 0.55)');
      nebula1.addColorStop(1, 'rgba(5, 8, 17, 0.95)');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      // B. Warm Golden Starlight Horizon Glow
      const goldNebula = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        0,
        width * 0.5,
        height * 0.45,
        width * 0.4
      );
      goldNebula.addColorStop(0, 'rgba(212, 175, 55, 0.12)');
      goldNebula.addColorStop(0.6, 'rgba(212, 175, 55, 0.03)');
      goldNebula.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = goldNebula;
      ctx.fillRect(0, 0, width, height);

      // C. Celestial Planetary Background Rings & Latitude Bands
      ctx.save();
      const planetCenterX = width * 0.5 + (mouseX - width / 2) * 0.02;
      const planetCenterY = height * 0.48 + (mouseY - height / 2) * 0.02;
      ctx.translate(planetCenterX, planetCenterY);

      // Giant outer orbital planetary ring
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.min(width, height) * 0.46, Math.min(width, height) * 0.16, -Math.PI / 10 + Math.sin(planetRotation * 0.5) * 0.04, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.16)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([8, 12]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Secondary inclined orbital ring
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.min(width, height) * 0.56, Math.min(width, height) * 0.2, Math.PI / 8 - Math.cos(planetRotation * 0.4) * 0.03, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.12)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 10]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Tertiary faint wide perimeter ring
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.min(width, height) * 0.68, Math.min(width, height) * 0.24, -Math.PI / 6, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([2, 14]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();

      // D. Draw & Twinkle Drifting Stars
      stars.forEach((star) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;

        // Twinkle
        star.alpha += Math.sin(planetRotation * 10 + star.x) * star.pulseSpeed;
        star.alpha = Math.max(0.15, Math.min(0.95, star.alpha));

        ctx.globalAlpha = star.alpha;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = star.radius * 3.5;
        ctx.fill();
        ctx.restore();

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      });

      // E. Update & Draw Shooting Stars (Meteors with radiant multi-color trails)
      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        if (!star.active) continue;

        const endX = star.x + Math.cos(star.angle) * star.length;
        const endY = star.y + Math.sin(star.angle) * star.length;

        const starGrad = ctx.createLinearGradient(star.x, star.y, endX, endY);
        starGrad.addColorStop(0, `${star.color}${star.alpha})`);
        starGrad.addColorStop(0.4, `${star.color}${star.alpha * 0.7})`);
        starGrad.addColorStop(1, `${star.color}0)`);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = starGrad;
        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';
        ctx.shadowColor = '#FAF5EF';
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.restore();

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.alpha -= 0.012;

        if (star.alpha <= 0 || star.x > width + 100 || star.y > height + 100) {
          star.active = false;
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleAuthorize = (action: 'unlock' | 'mailbox' = 'unlock', e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsVerifying(true);

    if (passcode.trim() === DEV_PASSCODE) {
      sounds.playChime();
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
      });

      sessionStorage.setItem('astitva_site_unlocked', 'true');
      sessionStorage.setItem('astitva_dev_partner_authorized', 'true');
      setPasscodeError('');
      setTimeout(() => {
        setIsVerifying(false);
        setShowAuthModal(false);
        if (action === 'mailbox') {
          if (onOpenDevMailbox) {
            onOpenDevMailbox();
          } else {
            onUnlock();
          }
        } else {
          onUnlock();
        }
      }, 400);
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
    <div className="relative min-h-screen w-full bg-[#050811] text-[#FAF5EF] flex flex-col justify-between overflow-x-hidden overflow-y-auto font-sans selection:bg-[#D4AF37] selection:text-[#070A14]">
      {/* Background Starfield, Galactic Nebulas & Shooting Stars Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Radiant Atmospheric Center Spotlight */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[500px] bg-gradient-to-b from-[#7C3AED]/15 via-[#D4AF37]/15 to-transparent blur-[160px] pointer-events-none z-0" />

      {/* TOP HEADER: Branding & Registration Portal Button */}
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

      {/* MAIN SCROLLABLE CONTENT */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-6 sm:py-10 flex flex-col items-center text-center space-y-8 sm:space-y-12">
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
        <div className="space-y-3.5 max-w-4xl">
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

        {/* OFFICIAL SUMMIT COUNTDOWN MODULE (October 29–30, 2026) */}
        {countdown && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="w-full max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#16203B]/80 via-[#070A14]/90 to-[#16203B]/80 border border-[#D4AF37]/45 backdrop-blur-md shadow-[0_0_35px_rgba(212,175,55,0.2)] space-y-3"
          >
            <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-2 flex-wrap gap-2">
              <span className="text-[11px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                Official Summit Opening Countdown
              </span>
              <span className="text-[10px] font-mono text-[#FAF5EF] bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-2.5 py-0.5 rounded-full font-bold">
                October 29–30, 2026 • Jammu
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
              {/* Days */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#050811]/90 border border-[#243563]">
                <div className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-white">
                  {countdown.days.toString().padStart(2, '0')}
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono text-[#A39B88] uppercase tracking-wider mt-0.5">
                  Days
                </div>
              </div>
              {/* Hours */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#050811]/90 border border-[#243563]">
                <div className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[#D4AF37]">
                  {countdown.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono text-[#A39B88] uppercase tracking-wider mt-0.5">
                  Hours
                </div>
              </div>
              {/* Minutes */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#050811]/90 border border-[#243563]">
                <div className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[#38BDF8]">
                  {countdown.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono text-[#A39B88] uppercase tracking-wider mt-0.5">
                  Minutes
                </div>
              </div>
              {/* Seconds */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#050811]/90 border border-[#243563]">
                <div className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[#C084FC] animate-pulse">
                  {countdown.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono text-[#A39B88] uppercase tracking-wider mt-0.5">
                  Seconds
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3D PLANETARY CORES & CELESTIAL SYSTEM VIEWPORT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="w-full max-w-4xl relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0D1427]/85 via-[#070A14]/85 to-[#0A0F1D]/85 border border-[#D4AF37]/35 shadow-[0_25px_80px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden text-center space-y-6"
        >
          {/* Top Orbit Label Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pb-3 border-b border-[#243563]/60 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span className="font-mono text-[11px] text-[#D4AF37] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                Interactive 3D Diplomatic Planetary Core & Orbit System
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#C4BBA3] bg-[#16203B]/80 px-2.5 py-0.5 rounded-full border border-[#243563]">
              Aequitas Summit 2026 • 6 Planetary Councils Active
            </span>
          </div>

          {/* 3D WebGL Planetary Canvas Container */}
          <div className="relative w-full h-[320px] sm:h-[420px] mx-auto flex items-center justify-center">
            <Astitva3DCanvas
              variant="hero"
              onOpenRegister={onOpenRegister}
              className="w-full h-full"
            />
            {/* Subtle center halo behind sphere */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-64 h-64 rounded-full bg-radial from-[#D4AF37]/15 to-transparent blur-2xl" />
            </div>
          </div>

          {/* 6 Sovereign Planetary Councils Bar */}
          <div className="space-y-2 pt-2">
            <span className="text-[10px] font-mono text-[#A39B88] uppercase tracking-widest block">
              Official Council Chambers • Orbiting Satellite Nodes
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {COMMITTEES.map((comm) => (
                <div
                  key={comm.id}
                  onClick={() => {
                    sounds.playTap();
                    onOpenRegister();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#070A14] border border-[#243563] hover:border-[#D4AF37]/70 text-white hover:text-[#D4AF37] transition-all text-xs font-medium cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <span className="text-[10px] font-mono text-[#D4AF37] font-bold">
                    {comm.code}
                  </span>
                  <span>{comm.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-4 border-t border-[#243563]/60 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                sounds.playTap();
                onOpenRegister();
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl shimmer-btn text-[#070A14] font-bold text-sm tracking-wide shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Register for Aequitas Summit 2026 Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* CORE OPERATING POLICIES & SOVEREIGN COVENANT */}
        <div className="w-full max-w-4xl space-y-4 text-left">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              FOUNDING COVENANT & OPERATIONAL POLICIES
            </span>
            <span className="text-[10px] font-mono text-[#768074]">
              AASTITVA ALLIANCE CHARTER
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Policy 1: Academic Impartiality */}
            <div className="p-5 rounded-2xl bg-[#0D1427]/70 border border-[#243563] backdrop-blur-md space-y-2.5 hover:border-[#D4AF37]/50 transition-all group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#D4AF37] font-mono text-xs font-bold uppercase">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Integrity Policy</span>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37]">
                  Pillar 01
                </span>
              </div>
              <h4 className="text-base font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                Academic Impartiality & Merit
              </h4>
              <p className="text-xs text-[#C4BBA3] leading-relaxed">
                Zero institutional bias. Standardized blind evaluation rubrics, accredited non-partisan executive board moderation, and strictly merit-based delegate recognitions.
              </p>
            </div>

            {/* Policy 2: Direct Stewardship */}
            <div className="p-5 rounded-2xl bg-[#0D1427]/70 border border-[#243563] backdrop-blur-md space-y-2.5 hover:border-sky-400/50 transition-all group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-bold uppercase">
                  <Compass className="w-4 h-4" />
                  <span>Stewardship Policy</span>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-sky-500/15 text-sky-300">
                  Pillar 02
                </span>
              </div>
              <h4 className="text-base font-serif font-bold text-white group-hover:text-sky-300 transition-colors">
                Zero Middlemen & Accountability
              </h4>
              <p className="text-xs text-[#C4BBA3] leading-relaxed">
                We operate without corporate opacity or bureaucratic overhead. Every summit is anchored by direct, on-ground personal responsibility and transparent institution agreements.
              </p>
            </div>

            {/* Policy 3: Grassroots Access */}
            <div className="p-5 rounded-2xl bg-[#0D1427]/70 border border-[#243563] backdrop-blur-md space-y-2.5 hover:border-purple-400/50 transition-all group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold uppercase">
                  <Sparkles className="w-4 h-4" />
                  <span>Access Policy</span>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-purple-500/15 text-purple-300">
                  Pillar 03
                </span>
              </div>
              <h4 className="text-base font-serif font-bold text-white group-hover:text-purple-300 transition-colors">
                Democratized Youth Access
              </h4>
              <p className="text-xs text-[#C4BBA3] leading-relaxed">
                Active subsidies and dedicated procedural training workshops to ensure high-caliber diplomatic exposure extends to underprivileged students and regional grassroots schools.
              </p>
            </div>
          </div>

          {/* Operating Covenant Banner with 5 Core Values */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#070A14]/90 border border-[#D4AF37]/35 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-lg">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-widest block">
                THE FOUNDER'S COVENANT
              </span>
              <p className="text-xs sm:text-sm text-[#FAF5EF] font-serif italic leading-relaxed">
                "To simplify the complexity of running academic events, so every idea gets the chance to fully exist."
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {['Purpose', 'Integrity', 'Access', 'Presence', 'Transparency'].map((val) => (
                <span
                  key={val}
                  className="px-3 py-1 rounded-xl bg-[#16203B] border border-[#243563] text-[11px] font-mono text-[#D4AF37] font-bold shadow-sm"
                >
                  {val}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ROTATING EXCELLENCE QUOTES DECK */}
        <div className="w-full max-w-2xl relative min-h-[120px] flex items-center justify-center pt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuoteIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="space-y-2 px-8 text-center"
            >
              <Quote className="w-5 h-5 text-[#D4AF37]/60 mx-auto mb-1" />
              <p className="text-sm sm:text-base font-serif italic text-[#FAF5EF]/95 leading-relaxed max-w-xl mx-auto">
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
            className="absolute left-0 p-2 rounded-full text-[#768074] hover:text-[#D4AF37] hover:bg-[#16203B]/50 transition-colors cursor-pointer"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextQuote}
            className="absolute right-0 p-2 rounded-full text-[#768074] hover:text-[#D4AF37] hover:bg-[#16203B]/50 transition-colors cursor-pointer"
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

              <form onSubmit={(e) => handleAuthorize('unlock', e)} className="space-y-4 text-left text-xs">
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

                <div className="pt-2 flex flex-wrap items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAuthModal(false)}
                    className="px-3 py-2 rounded-xl bg-[#16203B] hover:bg-[#243563] text-white font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAuthorize('mailbox')}
                    disabled={isVerifying}
                    className="px-4 py-2 rounded-xl bg-[#D4AF37]/20 hover:bg-[#D4AF37]/35 border border-[#D4AF37]/50 text-[#D4AF37] font-bold flex items-center gap-1.5 shadow-lg active:scale-95 transition-all cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open Mailbox</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="px-4 py-2 rounded-xl shimmer-btn text-[#070A14] font-bold flex items-center gap-1.5 shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
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
