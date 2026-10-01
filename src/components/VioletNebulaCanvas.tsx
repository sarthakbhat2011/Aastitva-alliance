import React, { useEffect, useRef } from 'react';

interface Props {
  className?: string;
  intensity?: number;
}

export const VioletNebulaCanvas: React.FC<Props> = ({
  className = '',
  intensity = 1.0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e && e.touches[0]) {
        targetMouseX = e.touches[0].clientX;
        targetMouseY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        targetMouseX = (e as MouseEvent).clientX;
        targetMouseY = (e as MouseEvent).clientY;
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // 1. Procedural Nebula Cloud Clustered Emitters (Rich Real-Life Violet & Deep Purple)
    const nebulaClouds = [
      {
        x: width * 0.25,
        y: height * 0.28,
        radius: Math.max(width, height) * 0.38,
        color1: 'rgba(124, 58, 237, 0.22)',   // Royal Violet
        color2: 'rgba(147, 51, 234, 0.12)',   // Purple
        color3: 'rgba(88, 28, 135, 0.0)',
        vx: 0.08,
        vy: 0.05,
      },
      {
        x: width * 0.72,
        y: height * 0.42,
        radius: Math.max(width, height) * 0.45,
        color1: 'rgba(168, 85, 247, 0.18)',   // Amethyst Magenta
        color2: 'rgba(109, 40, 217, 0.10)',   // Deep Violet
        color3: 'rgba(46, 16, 101, 0.0)',
        vx: -0.06,
        vy: 0.04,
      },
      {
        x: width * 0.5,
        y: height * 0.78,
        radius: Math.max(width, height) * 0.4,
        color1: 'rgba(91, 33, 182, 0.20)',    // Deep Indigo Violet
        color2: 'rgba(212, 175, 55, 0.08)',   // Faint Celestial Gold Accent
        color3: 'rgba(15, 23, 42, 0.0)',
        vx: 0.04,
        vy: -0.07,
      },
      {
        x: width * 0.85,
        y: height * 0.15,
        radius: Math.max(width, height) * 0.3,
        color1: 'rgba(192, 132, 252, 0.14)',  // Radiant Light Lavender
        color2: 'rgba(126, 34, 206, 0.06)',
        color3: 'rgba(0, 0, 0, 0.0)',
        vx: -0.05,
        vy: 0.03,
      },
    ];

    // 2. Starfield with Constellation Links
    const starCount = Math.min(180, Math.floor((width * height) / 8000));
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.7 + 0.25,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      speed: Math.random() * 0.15 + 0.04,
      color:
        Math.random() > 0.35
          ? '#FAF5EF'
          : Math.random() > 0.5
          ? '#D4AF37'
          : '#C084FC',
    }));

    // 3. Shooting Meteors
    interface Meteor {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
      color: string;
      active: boolean;
    }

    const meteors: Meteor[] = [];
    const spawnMeteor = () => {
      if (Math.random() < 0.015 && meteors.length < 3) {
        meteors.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 110 + 60,
          speed: Math.random() * 9 + 7,
          angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
          alpha: 0.9,
          color: Math.random() > 0.4 ? '#C084FC' : '#D4AF37',
          active: true,
        });
      }
    };

    let tick = 0;

    const render = () => {
      tick++;
      // Smooth camera parallax
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;
      const offsetX = (mouseX - width / 2) * 0.03;
      const offsetY = (mouseY - height / 2) * 0.03;

      // Base Deep Cosmic Gradient
      const baseGrad = ctx.createLinearGradient(0, 0, width, height);
      baseGrad.addColorStop(0, '#06030F');
      baseGrad.addColorStop(0.35, '#0C061D');
      baseGrad.addColorStop(0.7, '#140A2C');
      baseGrad.addColorStop(1, '#05020A');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Procedural Gaseous Nebula Formations
      nebulaClouds.forEach((cloud, idx) => {
        cloud.x += cloud.vx;
        cloud.y += cloud.vy;

        // Wrap around borders smoothly
        if (cloud.x < -cloud.radius) cloud.x = width + cloud.radius;
        if (cloud.x > width + cloud.radius) cloud.x = -cloud.radius;
        if (cloud.y < -cloud.radius) cloud.y = height + cloud.radius;
        if (cloud.y > height + cloud.radius) cloud.y = -cloud.radius;

        const pulse = 1 + Math.sin(tick * 0.01 + idx) * 0.06;
        const curRadius = cloud.radius * pulse;

        const cx = cloud.x + offsetX * (idx + 1) * 0.5;
        const cy = cloud.y + offsetY * (idx + 1) * 0.5;

        const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, curRadius);
        radGrad.addColorStop(0, cloud.color1);
        radGrad.addColorStop(0.55, cloud.color2);
        radGrad.addColorStop(1, cloud.color3);

        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, curRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Subtle Galactic Celestial Orbit Lines
      ctx.save();
      ctx.translate(width * 0.5 + offsetX * 0.4, height * 0.4 + offsetY * 0.4);
      const ringScale = Math.min(width, height) * 0.42;

      ctx.beginPath();
      ctx.ellipse(0, 0, ringScale * 1.15, ringScale * 0.38, -Math.PI / 8, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.12)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 16]);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, 0, ringScale * 0.85, ringScale * 0.28, Math.PI / 10, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.10)';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([2, 12]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Render Drifting Stars
      stars.forEach((star) => {
        ctx.save();
        ctx.beginPath();
        const sx = star.x + offsetX * 0.5;
        const sy = star.y + offsetY * 0.5;
        ctx.arc(sx, sy, star.radius, 0, Math.PI * 2);

        star.alpha += Math.sin(tick * star.pulseSpeed + star.x) * 0.01;
        star.alpha = Math.max(0.18, Math.min(0.95, star.alpha));

        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha * intensity;
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

      // Render Meteors
      spawnMeteor();
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        if (!m.active) continue;

        const endX = m.x + Math.cos(m.angle) * m.length;
        const endY = m.y + Math.sin(m.angle) * m.length;

        const mGrad = ctx.createLinearGradient(m.x, m.y, endX, endY);
        mGrad.addColorStop(0, `${m.color}`);
        mGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.4)');
        mGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = mGrad;
        ctx.lineWidth = 2.4;
        ctx.lineCap = 'round';
        ctx.globalAlpha = m.alpha;
        ctx.shadowColor = m.color;
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();

        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= 0.014;

        if (m.alpha <= 0 || m.x > width + 100 || m.y > height + 100) {
          m.active = false;
          meteors.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
};
