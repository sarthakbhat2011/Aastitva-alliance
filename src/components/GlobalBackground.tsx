import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Page } from '../types';

interface Props {
  currentPage?: Page;
}

export const GlobalBackground: React.FC<Props> = ({ currentPage = 'home' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  // Pages featuring the celestial background suite & Saturn orbital model
  const isGalacticPage = currentPage === 'about' || currentPage === 'founder' || currentPage === 'summit';
  const showCelestialSaturn = currentPage === 'about' || currentPage === 'founder' || currentPage === 'summit' || currentPage === 'faq';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic Particle Count based on resolution (mobile-optimized to prevent clustering)
    const isMobile = width < 768;
    const particleCount = isMobile
      ? Math.min(Math.floor((width * height) / 22000), 40)
      : Math.min(Math.floor((width * height) / 9000), 160);

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

    // Select theme & page-adapted particle color palettes
    const getColors = () => {
      if (isGalacticPage) {
        if (theme === 'light') {
          return ['#7C3AED', '#9333EA', '#6D28D9', '#B48A1A', '#2563EB', '#A855F7'];
        }
        return ['#C084FC', '#A855F7', '#D8B4FE', '#E9D5FF', '#F3E5AB', '#D4AF37', '#9333EA', '#7C3AED', '#818CF8'];
      }
      if (currentPage === 'faq') {
        if (theme === 'light') {
          return ['#B48A1A', '#2563EB', '#7C3AED', '#0284C7', '#D97706'];
        }
        return ['#D4AF37', '#9333EA', '#38BDF8', '#C084FC', '#F3E5AB', '#818CF8'];
      }
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
        radius: isGalacticPage || currentPage === 'faq'
          ? (theme === 'light' ? Math.random() * 2.5 + 1.0 : Math.random() * 2.8 + 0.9)
          : (theme === 'light' ? Math.random() * 3.2 + 1.2 : Math.random() * 2.5 + 0.8),
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        alpha: theme === 'light' ? Math.random() * 0.45 + 0.35 : Math.random() * 0.6 + 0.25,
        maxAlpha: theme === 'light' ? 0.9 : Math.random() * 0.75 + 0.35,
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

    // 3D Saturn Planetary Background State
    let saturnRotation = 0;

    // Animation Loop
    const render = () => {
      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;
      saturnRotation += 0.004;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Page-Specific Cosmic Background Nebulas
      if (isGalacticPage || currentPage === 'faq') {
        if (theme === 'light') {
          const neb1 = ctx.createRadialGradient(width * 0.5, height * 0.1, 0, width * 0.5, height * 0.1, width * 0.55);
          neb1.addColorStop(0, 'rgba(192, 132, 252, 0.18)');
          neb1.addColorStop(0.5, 'rgba(216, 180, 254, 0.08)');
          neb1.addColorStop(1, 'rgba(241, 245, 249, 0)');
          ctx.fillStyle = neb1;
          ctx.fillRect(0, 0, width, height);

          const neb2 = ctx.createRadialGradient(width * 0.15, height * 0.75, 0, width * 0.15, height * 0.75, width * 0.45);
          neb2.addColorStop(0, 'rgba(147, 51, 234, 0.12)');
          neb2.addColorStop(0.6, 'rgba(168, 85, 247, 0.05)');
          neb2.addColorStop(1, 'rgba(241, 245, 249, 0)');
          ctx.fillStyle = neb2;
          ctx.fillRect(0, 0, width, height);

          const neb3 = ctx.createRadialGradient(width * 0.85, height * 0.5, 0, width * 0.85, height * 0.5, width * 0.4);
          neb3.addColorStop(0, 'rgba(168, 85, 247, 0.14)');
          neb3.addColorStop(0.7, 'rgba(233, 213, 255, 0.06)');
          neb3.addColorStop(1, 'rgba(241, 245, 249, 0)');
          ctx.fillStyle = neb3;
          ctx.fillRect(0, 0, width, height);
        } else {
          const neb1 = ctx.createRadialGradient(width * 0.5, height * 0.1, 0, width * 0.5, height * 0.1, width * 0.55);
          neb1.addColorStop(0, 'rgba(109, 40, 217, 0.22)');
          neb1.addColorStop(0.5, 'rgba(88, 28, 135, 0.12)');
          neb1.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = neb1;
          ctx.fillRect(0, 0, width, height);

          const neb2 = ctx.createRadialGradient(width * 0.15, height * 0.75, 0, width * 0.15, height * 0.75, width * 0.45);
          neb2.addColorStop(0, 'rgba(67, 24, 255, 0.16)');
          neb2.addColorStop(0.6, 'rgba(126, 34, 206, 0.08)');
          neb2.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = neb2;
          ctx.fillRect(0, 0, width, height);

          const neb3 = ctx.createRadialGradient(width * 0.85, height * 0.5, 0, width * 0.85, height * 0.5, width * 0.4);
          neb3.addColorStop(0, 'rgba(147, 51, 234, 0.14)');
          neb3.addColorStop(0.7, 'rgba(46, 16, 101, 0.06)');
          neb3.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = neb3;
          ctx.fillRect(0, 0, width, height);
        }
      }

      // 2. ETHEREAL 3D SATURN CELESTIAL BACKGROUND (Founders, FAQ & Live Summit)
      if (showCelestialSaturn) {
        ctx.save();
        // Anchor Saturn smoothly in the background with subtle mouse parallax (mobile-adapted)
        const isMobileScreen = width < 768;
        const saturnCenterX = isMobileScreen
          ? width * 0.5
          : width * 0.78 + (mouseX - width / 2) * 0.035;
        const saturnCenterY = isMobileScreen
          ? height * 0.2
          : height * 0.38 + (mouseY - height / 2) * 0.035;
        const baseRadius = isMobileScreen
          ? Math.min(width, height) * 0.22
          : Math.min(width, height) * 0.18;

        ctx.translate(saturnCenterX, saturnCenterY);

        const globeAlpha = isMobileScreen
          ? (theme === 'light' ? 0.16 : 0.2)
          : (theme === 'light' ? 0.22 : 0.28);
        const strokeColor = theme === 'light'
          ? (isGalacticPage ? 'rgba(126, 34, 206, 0.35)' : 'rgba(180, 138, 26, 0.35)')
          : (isGalacticPage ? 'rgba(192, 132, 252, 0.4)' : 'rgba(212, 175, 55, 0.35)');

        // A. Subtle Celestial Planetary Glow Aura
        const planetGlow = ctx.createRadialGradient(0, 0, baseRadius * 0.4, 0, 0, baseRadius * 1.8);
        planetGlow.addColorStop(0, isGalacticPage ? 'rgba(168, 85, 247, 0.12)' : 'rgba(212, 175, 55, 0.1)');
        planetGlow.addColorStop(0.6, isGalacticPage ? 'rgba(147, 51, 234, 0.05)' : 'rgba(37, 99, 235, 0.04)');
        planetGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = planetGlow;
        ctx.beginPath();
        ctx.arc(0, 0, baseRadius * 1.8, 0, Math.PI * 2);
        ctx.fill();

        // B. Planetary Sphere Wireframe / Latitude Bands
        ctx.lineWidth = 1.0;
        ctx.strokeStyle = strokeColor;
        ctx.globalAlpha = globeAlpha;

        // Outer Sphere Perimeter
        ctx.beginPath();
        ctx.arc(0, 0, baseRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Latitude Elliptical Rings
        for (let lat = -3; lat <= 3; lat++) {
          const latY = (lat / 4) * baseRadius * 0.85;
          const latRadius = Math.sqrt(Math.max(0, baseRadius * baseRadius - latY * latY));
          ctx.beginPath();
          ctx.ellipse(0, latY, latRadius, latRadius * 0.28, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Longitude Revolving Great Circles
        for (let i = 0; i < 4; i++) {
          const angle = saturnRotation + (i * Math.PI) / 4;
          const longWidth = Math.cos(angle) * baseRadius;
          ctx.beginPath();
          ctx.ellipse(0, 0, Math.abs(longWidth), baseRadius, Math.PI / 14, 0, Math.PI * 2);
          ctx.stroke();
        }

        // C. Concentric 3D Saturn Orbital Rings (Tilted Ethereal Belts)
        const ringAngles = [
          { rX: baseRadius * 1.45, rY: baseRadius * 0.42, tilt: -Math.PI / 7, alpha: 0.35 },
          { rX: baseRadius * 1.75, rY: baseRadius * 0.52, tilt: -Math.PI / 7, alpha: 0.45 },
          { rX: baseRadius * 2.05, rY: baseRadius * 0.62, tilt: -Math.PI / 7, alpha: 0.25 },
        ];

        ringAngles.forEach((ring) => {
          ctx.save();
          ctx.rotate(ring.tilt);
          ctx.beginPath();
          ctx.ellipse(0, 0, ring.rX, ring.rY, 0, 0, Math.PI * 2);
          ctx.strokeStyle = theme === 'light'
            ? 'rgba(168, 85, 247, 0.4)'
            : 'rgba(233, 213, 255, 0.45)';
          ctx.lineWidth = 1.2;
          ctx.globalAlpha = ring.alpha * (theme === 'light' ? 0.7 : 0.9);
          ctx.stroke();
          ctx.restore();
        });

        ctx.restore();
      }

      // 3. Draw Mouse Interactive Radiant Glow Aura
      const mouseGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 280);
      if (isGalacticPage || currentPage === 'faq') {
        if (theme === 'light') {
          mouseGlow.addColorStop(0, 'rgba(192, 132, 252, 0.3)');
          mouseGlow.addColorStop(0.4, 'rgba(216, 180, 254, 0.15)');
          mouseGlow.addColorStop(1, 'rgba(241, 245, 249, 0)');
        } else {
          mouseGlow.addColorStop(0, 'rgba(192, 132, 252, 0.28)');
          mouseGlow.addColorStop(0.4, 'rgba(126, 34, 206, 0.18)');
          mouseGlow.addColorStop(1, 'rgba(9, 6, 20, 0)');
        }
      } else if (theme === 'light') {
        mouseGlow.addColorStop(0, 'rgba(180, 138, 26, 0.45)');
        mouseGlow.addColorStop(0.5, 'rgba(37, 99, 235, 0.35)');
        mouseGlow.addColorStop(1, 'rgba(241, 245, 249, 0)');
      } else {
        mouseGlow.addColorStop(0, 'rgba(212, 175, 55, 0.22)');
        mouseGlow.addColorStop(0.5, 'rgba(36, 53, 99, 0.18)');
        mouseGlow.addColorStop(1, 'rgba(7, 10, 20, 0)');
      }
      ctx.fillStyle = mouseGlow;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 280, 0, Math.PI * 2);
      ctx.fill();

      // 4. Draw Constellation Network Lines (damped on mobile for clean breathing room)
      const maxConnDist = isMobile ? 90 : 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineAlpha = (1 - dist / maxConnDist) * (theme === 'light' ? 0.75 : 0.6);
            
            if (isGalacticPage || currentPage === 'faq') {
              ctx.strokeStyle = theme === 'light'
                ? `rgba(147, 51, 234, ${lineAlpha * 0.7})`
                : `rgba(168, 85, 247, ${lineAlpha * 0.9})`;
            } else if (theme === 'light') {
              ctx.strokeStyle = `rgba(29, 78, 216, ${lineAlpha})`;
            } else {
              ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha})`;
            }
            
            ctx.lineWidth = isGalacticPage || currentPage === 'faq' ? (theme === 'light' ? 1.4 : 1.3) : (theme === 'light' ? 1.6 : 1.2);
            ctx.stroke();
          }
        }

        // Draw connections to mouse cursor
        const mdx = particles[i].x - mouseX;
        const mdy = particles[i].y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 190) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouseX, mouseY);
          const mouseLineAlpha = (1 - mdist / 190) * (theme === 'light' ? 0.85 : 0.7);
          
          if (isGalacticPage || currentPage === 'faq') {
            ctx.strokeStyle = theme === 'light'
              ? `rgba(126, 34, 206, ${mouseLineAlpha * 0.85})`
              : `rgba(233, 213, 255, ${mouseLineAlpha})`;
          } else if (theme === 'light') {
            ctx.strokeStyle = `rgba(180, 138, 26, ${mouseLineAlpha})`;
          } else {
            ctx.strokeStyle = `rgba(243, 229, 171, ${mouseLineAlpha})`;
          }
          
          ctx.lineWidth = isGalacticPage || currentPage === 'faq' ? (theme === 'light' ? 1.6 : 1.5) : (theme === 'light' ? 1.8 : 1.4);
          ctx.stroke();
        }
      }

      // 5. Update & Draw Particles (Circles, Diamonds, Rings)
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
        if (p.alpha > p.maxAlpha || p.alpha < 0.2) {
          p.pulseSpeed *= -1;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = Math.max(0.2, Math.min(1, p.alpha));
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.radius * (isGalacticPage ? 6 : (theme === 'light' ? 5 : 4));

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
          ctx.lineWidth = theme === 'light' ? 1.2 : 0.8;
          ctx.stroke();
        }

        ctx.restore();
      });

      // 6. Update & Draw Shooting Stars
      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        if (!star.active) continue;

        const endX = star.x + Math.cos(star.angle) * star.length;
        const endY = star.y + Math.sin(star.angle) * star.length;

        const starGrad = ctx.createLinearGradient(star.x, star.y, endX, endY);
        if (isGalacticPage || currentPage === 'faq') {
          if (theme === 'light') {
            starGrad.addColorStop(0, `rgba(126, 34, 206, ${star.alpha})`);
            starGrad.addColorStop(0.5, `rgba(180, 138, 26, ${star.alpha * 0.85})`);
            starGrad.addColorStop(1, 'rgba(180, 138, 26, 0)');
          } else {
            starGrad.addColorStop(0, `rgba(233, 213, 255, ${star.alpha})`);
            starGrad.addColorStop(0.5, `rgba(168, 85, 247, ${star.alpha * 0.85})`);
            starGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
          }
        } else if (theme === 'light') {
          starGrad.addColorStop(0, `rgba(37, 99, 235, ${star.alpha})`);
          starGrad.addColorStop(0.5, `rgba(180, 138, 26, ${star.alpha * 0.9})`);
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
        ctx.lineWidth = isGalacticPage || currentPage === 'faq' ? 1.8 : 1.5;
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
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme, isGalacticPage, showCelestialSaturn, currentPage]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      style={{ opacity: 'var(--canvas-opacity, 1.0)' }}
    />
  );
};
