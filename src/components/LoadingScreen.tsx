import React, { useEffect, useRef, useState } from 'react';
import { AstitvaLogo } from './AstitvaLogo';
import { Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface Props {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const statusLogs = [
    '⚡ Initializing Jammu Academic Infrastructure Engine...',
    '🔒 Verifying 256-Bit SSL Security Gateways...',
    '📜 Verifying UN Rules of Procedure Standards...',
    '🏛️ Allocating Executive Board Rosters & Venue Maps...',
    '🏆 Readying Aequitas MUN Summit Portal...',
  ];

  // Mouse Spotlight state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth progress increment & status ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFading(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 650);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 14) + 7;
        return next > 100 ? 100 : next;
      });
    }, 85);

    const logInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusLogs.length);
    }, 600);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, [onComplete]);

  // Interactive Particle Canvas inside Loading Screen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const dots: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < 70; i++) {
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.7 + 0.3,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw particle connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${(1 - dist / 120) * 0.25})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#D4AF37';
        ctx.globalAlpha = d.alpha;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Quick boost speed trigger if user clicks anywhere on loading screen
  const handleInteractiveBoost = () => {
    setProgress((prev) => Math.min(100, prev + 25));
  };

  return (
    <div
      onClick={handleInteractiveBoost}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070A14] transition-opacity duration-700 select-none overflow-hidden cursor-pointer ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Interactive Interactive Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-80" />

      {/* Interactive Mouse Spotlight Aura */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full pointer-events-none transition-transform duration-75 ease-out blur-[110px]"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(36,53,99,0.15) 50%, rgba(7,10,20,0) 100%)',
          transform: `translate(${mousePos.x - 225}px, ${mousePos.y - 225}px)`,
        }}
      />

      {/* Atmospheric Glowing Dark Blue Nebulas */}
      <div className="absolute -top-30 -left-30 w-[550px] h-[550px] bg-gradient-to-br from-[#1C2A4F]/40 via-[#0B1021]/20 to-transparent rounded-full blur-[130px] animate-pulse-glow" />
      <div className="absolute -bottom-30 -right-30 w-[550px] h-[550px] bg-gradient-to-tl from-[#D4AF37]/18 via-[#16203B]/20 to-transparent rounded-full blur-[130px] animate-float" />

      {/* Main Glass Center Card */}
      <div className="relative z-10 flex flex-col items-center max-w-md px-8 py-10 text-center rounded-3xl bg-[#0D1427]/85 border border-[#D4AF37]/35 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        {/* Animated Enso Logo Emblem */}
        <div className="mb-6 transform transition-all duration-500 hover:scale-110 drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]">
          <AstitvaLogo size="xl" showSubtitle={false} variant="mark-only" />
        </div>

        {/* Brand Title */}
        <h1 className="text-3xl font-serif font-bold gold-gradient-text tracking-tight mb-1">
          Astitva Alliance
        </h1>
        <p className="text-xs uppercase tracking-[0.3em] text-[#C4BBA3] font-medium mb-6 flex items-center gap-1.5 justify-center">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Academic Infrastructure
        </p>

        {/* Progress Bar Container */}
        <div className="w-72 h-2 bg-[#070A14] rounded-full overflow-hidden border border-[#D4AF37]/30 relative mb-3 p-0.5 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFF5DC] to-[#D4AF37] transition-all duration-200 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.9)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter & Status */}
        <div className="flex justify-between w-72 text-xs font-mono text-[#C4BBA3] mb-4">
          <span className="text-[#FAF5EF] font-semibold">LOADING CORE ENGINE</span>
          <span className="text-[#D4AF37] font-bold">{progress}%</span>
        </div>

        {/* Live Status Ticker */}
        <div className="w-72 p-2.5 rounded-xl bg-[#070A14]/80 border border-[#243563]/40 text-[11px] text-[#C4BBA3] flex items-center justify-center gap-1.5 font-mono animate-page-enter">
          <span className="truncate">{statusLogs[statusIndex]}</span>
        </div>

        {/* Interactive Click Tip */}
        <p className="text-[10px] text-[#C4BBA3]/70 tracking-wider uppercase mt-4 flex items-center gap-1">
          <Zap className="w-3 h-3 text-[#D4AF37] animate-bounce" /> Click anywhere to accelerate load
        </p>
      </div>
    </div>
  );
};
