import React, { useEffect, useRef } from 'react';

export const GlobalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    const colors = ['#D4AF37', '#FAF5EF', '#F3E5AB', '#243563', '#3A4F8A', '#7C67EE'];
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

      // 1. Draw Mouse Interactive Radiant Glow Aura (Dark Royal Blue + Gold)
      const mouseGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 240);
      mouseGlow.addColorStop(0, 'rgba(212, 175, 55, 0.2)');
      mouseGlow.addColorStop(0.5, 'rgba(36, 53, 99, 0.15)');
      mouseGlow.addColorStop(1, 'rgba(7, 10, 20, 0)');
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
            const lineAlpha = (1 - dist / 135) * 0.22;
            ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
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
          const mouseLineAlpha = (1 - mdist / 165) * 0.38;
          ctx.strokeStyle = `rgba(243, 229, 171, ${mouseLineAlpha})`;
          ctx.lineWidth = 1.0;
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
        ctx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));
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
        starGrad.addColorStop(0, `rgba(255, 255, 255, ${star.alpha})`);
        starGrad.addColorStop(0.5, `rgba(212, 175, 55, ${star.alpha * 0.8})`);
        starGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');

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
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dark Obsidian Blue Atmospheric Nebulas */}
      <div className="absolute -top-40 -left-40 w-[750px] h-[750px] bg-gradient-to-br from-[#1C2A4F]/40 via-[#10172D]/25 to-transparent rounded-full blur-[140px] animate-pulse-glow" />
      <div className="absolute top-1/4 -right-40 w-[700px] h-[700px] bg-gradient-to-l from-[#D4AF37]/22 via-[#243563]/20 to-transparent rounded-full blur-[150px] animate-float" />
      <div className="absolute bottom-10 left-1/3 w-[850px] h-[850px] bg-gradient-to-tr from-[#070A14] via-[#16203B]/30 to-transparent rounded-full blur-[160px] animate-pulse-glow" />
      <div className="absolute top-2/3 -left-30 w-[550px] h-[550px] bg-gradient-to-r from-[#243563]/25 via-[#0B1021]/15 to-transparent rounded-full blur-[130px] animate-float" />

      {/* Interactive Canvas layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />
    </div>
  );
};
