import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const GlobalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic Particle Count based on resolution (up to 150 particles)
    const particleCount = Math.min(Math.floor((width * height) / 9500), 150);

    interface Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      maxAlpha: number;
      pulseSpeed: number;
      color: string;
      shape: 'circle' | 'diamond' | 'ring';
      angle: number;
      spinSpeed: number;
    }

    const particles: Particle[] = [];
    
    // Select theme-adapted particle color palettes
    const getColors = () => {
      if (theme === 'light') {
        return ['#B48A1A', '#1E3A8A', '#2563EB', '#6D28D9', '#D97706', '#0284C7'];
      } else if (theme === 'dark') {
        return ['#D4AF37', '#FFFFFF', '#38BDF8', '#818CF8', '#F59E0B', '#C084FC'];
      }
      return ['#D4AF37', '#FAF5EF', '#F3E5AB', '#243563', '#3A4F8A', '#7C67EE'];
    };

    const colors = getColors();
    const shapes: ('circle' | 'diamond' | 'ring')[] = ['circle', 'circle', 'circle', 'diamond', 'ring'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 0.8,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        alpha: Math.random() * 0.6 + 0.2,
        maxAlpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.03,
      });
    }

    // Shooting Stars System
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
      active: boolean;
    }

    const shootingStars: ShootingStar[] = [];
    const spawnShootingStar = () => {
      if (Math.random() < 0.35 && shootingStars.filter((s) => s.active).length < 4) {
        shootingStars.push({
          x: Math.random() * width,
          y: (Math.random() * height) / 2,
          length: Math.random() * 90 + 45,
          speed: Math.random() * 9 + 4.5,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          alpha: 1.0,
          active: true,
        });
      }
    };

    // Mouse interactive cursor aura
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
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    const render = () => {
      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Mouse Interactive Radiant Glow Aura
      const mouseGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 240);
      if (theme === 'light') {
        mouseGlow.addColorStop(0, 'rgba(180, 138, 26, 0.25)');
        mouseGlow.addColorStop(0.5, 'rgba(37, 99, 235, 0.18)');
        mouseGlow.addColorStop(1, 'rgba(241, 245, 249, 0)');
      } else {
        mouseGlow.addColorStop(0, 'rgba(212, 175, 55, 0.22)');
        mouseGlow.addColorStop(0.5, 'rgba(36, 53, 99, 0.18)');
        mouseGlow.addColorStop(1, 'rgba(7, 10, 20, 0)');
      }
      ctx.fillStyle = mouseGlow;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 240, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Constellation Network Lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineAlpha = (1 - dist / 135) * (theme === 'light' ? 0.35 : 0.22);
            ctx.strokeStyle = theme === 'light' ? `rgba(30, 58, 138, ${lineAlpha})` : `rgba(212, 175, 55, ${lineAlpha})`;
            ctx.lineWidth = theme === 'light' ? 1.0 : 0.8;
            ctx.stroke();
          }
        }

        // Draw connections to mouse cursor
        const mdx = particles[i].x - mouseX;
        const mdy = particles[i].y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 165) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouseX, mouseY);
          const mouseLineAlpha = (1 - mdist / 165) * 0.42;
          ctx.strokeStyle = theme === 'light' ? `rgba(180, 138, 26, ${mouseLineAlpha})` : `rgba(243, 229, 171, ${mouseLineAlpha})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }

      // 3. Update & Draw Particles (Circles, Diamonds, Rings)
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spinSpeed;

        // Bounce off canvas edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse repelling physics
        const mdx = mouseX - p.x;
        const mdy = mouseY - p.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 120 && mdist > 0) {
          const force = (120 - mdist) / 120;
          p.x -= (mdx / mdist) * force * 1.5;
          p.y -= (mdy / mdist) * force * 1.5;
        }

        // Alpha pulsing
        p.alpha += p.pulseSpeed;
        if (p.alpha > p.maxAlpha || p.alpha < 0.15) {
          p.pulseSpeed *= -1;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = Math.max(0.15, Math.min(1, p.alpha));
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.radius * 4;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'diamond') {
          ctx.beginPath();
          ctx.moveTo(0, -p.radius * 1.5);
          ctx.lineTo(p.radius * 1.5, 0);
          ctx.lineTo(0, p.radius * 1.5);
          ctx.lineTo(-p.radius * 1.5, 0);
          ctx.closePath();
          ctx.fill();
        } else if (p.shape === 'ring') {
          ctx.beginPath();
          ctx.arc(0, 0, p.radius * 1.6, 0, Math.PI * 2);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        ctx.restore();
      });

      // 4. Update & Draw Shooting Stars
      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        if (!star.active) continue;

        const endX = star.x + Math.cos(star.angle) * star.length;
        const endY = star.y + Math.sin(star.angle) * star.length;

        const starGrad = ctx.createLinearGradient(star.x, star.y, endX, endY);
        if (theme === 'light') {
          starGrad.addColorStop(0, `rgba(37, 99, 235, ${star.alpha})`);
          starGrad.addColorStop(0.5, `rgba(180, 138, 26, ${star.alpha * 0.8})`);
          starGrad.addColorStop(1, 'rgba(180, 138, 26, 0)');
        } else {
          starGrad.addColorStop(0, `rgba(255, 255, 255, ${star.alpha})`);
          starGrad.addColorStop(0.5, `rgba(212, 175, 55, ${star.alpha * 0.8})`);
          starGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
        }

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = starGrad;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.alpha -= 0.015;

        if (star.alpha <= 0 || star.x > width || star.y > height) {
          star.active = false;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Theme Atmospheric Nebulas */}
      <div className={`absolute -top-40 -left-40 w-[750px] h-[750px] rounded-full blur-[140px] animate-pulse-glow transition-all duration-500 ${
        theme === 'light'
          ? 'bg-gradient-to-br from-[#3B82F6]/25 via-[#6366F1]/18 to-transparent'
          : theme === 'dark'
          ? 'bg-gradient-to-br from-[#1E1B4B]/50 via-[#0F172A]/40 to-transparent'
          : 'bg-gradient-to-br from-[#1C2A4F]/40 via-[#10172D]/25 to-transparent'
      }`} />

      <div className={`absolute top-1/4 -right-40 w-[700px] h-[700px] rounded-full blur-[150px] animate-float transition-all duration-500 ${
        theme === 'light'
          ? 'bg-gradient-to-l from-[#F59E0B]/25 via-[#3B82F6]/20 to-transparent'
          : theme === 'dark'
          ? 'bg-gradient-to-l from-[#D4AF37]/25 via-[#0284C7]/20 to-transparent'
          : 'bg-gradient-to-l from-[#D4AF37]/22 via-[#243563]/20 to-transparent'
      }`} />

      <div className={`absolute bottom-10 left-1/3 w-[850px] h-[850px] rounded-full blur-[160px] animate-pulse-glow transition-all duration-500 ${
        theme === 'light'
          ? 'bg-gradient-to-tr from-[#F1F4F9] via-[#93C5FD]/25 to-transparent'
          : theme === 'dark'
          ? 'bg-gradient-to-tr from-[#000000] via-[#090D16]/80 to-transparent'
          : 'bg-gradient-to-tr from-[#070A14] via-[#16203B]/30 to-transparent'
      }`} />

      {/* Interactive Canvas layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-[var(--canvas-opacity)] transition-opacity duration-500" />
    </div>
  );
};
