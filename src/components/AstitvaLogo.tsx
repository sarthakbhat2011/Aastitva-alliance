import React from 'react';

interface Props {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  variant?: 'full' | 'mark-only' | 'badge';
}

export const AstitvaLogo: React.FC<Props> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  variant = 'full',
}) => {
  const sizeMap = {
    sm: { mark: 'w-10 h-10', text: 'text-xl', sub: 'text-[10px]' },
    md: { mark: 'w-12 h-12', text: 'text-2xl sm:text-[26px]', sub: 'text-[11px] sm:text-[12px]' },
    lg: { mark: 'w-16 h-16', text: 'text-3xl sm:text-4xl', sub: 'text-xs' },
    xl: { mark: 'w-20 h-20', text: 'text-4xl sm:text-5xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`relative inline-flex items-center gap-3.5 select-none group cursor-pointer p-1.5 rounded-2xl transition-all duration-300 ${className}`}>
      
      {/* SOLAR SYSTEM PLANETARY ORBITAL ANIMATION SYSTEM */}
      <div className={`relative ${currentSize.mark} shrink-0 flex items-center justify-center`}>
        
        {/* Orbit Ring 1 (Inner Gold Orbit with Golden Planet) */}
        <div className="absolute inset-0 rounded-full border border-[#D4AF37]/35 animate-orbit-fast pointer-events-none">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_10px_#F59E0B] animate-pulse" />
        </div>

        {/* Orbit Ring 2 (Middle Sapphire Orbit with Saturn Ringed Planet) */}
        <div className="absolute -inset-1.5 rounded-full border border-sky-400/30 animate-orbit-med pointer-events-none">
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_12px_#38BDF8] flex items-center justify-center">
            {/* Saturn Ring Overlay */}
            <div className="w-4 h-1 border border-amber-300 rounded-full -rotate-45" />
          </div>
        </div>

        {/* Orbit Ring 3 (Outer Cosmic Orbit with Emerald Moon) */}
        <div className="absolute -inset-3 rounded-full border border-purple-500/25 animate-orbit-slow pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
        </div>

        {/* CLASSIC CALLIGRAPHIC MONOGRAM EMBLEM */}
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#1E293B] via-[#0B1120] to-[#070A14] border border-[#D4AF37]/45 p-1.5 shadow-[0_4px_20px_rgba(212,175,55,0.25)] group-hover:border-[#E8A53E] group-hover:shadow-[0_0_25px_rgba(232,165,62,0.45)] transition-all duration-300 flex items-center justify-center overflow-hidden relative">
          
          {/* Subtle Calligraphic Emblem Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,165,62,0.25)_0%,transparent_70%)] group-hover:opacity-100 opacity-60 transition-opacity" />

          {/* Real Official Logo Image if present, overlaid with Calligraphic Accent */}
          <img
            src="/astitva-logo.png"
            alt="Astitva Official Emblem"
            className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)] relative z-10 transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              // Fallback SVG Calligraphic Monogram if image missing
              e.currentTarget.style.display = 'none';
            }}
          />

          {/* SVG Calligraphic Emblem Fallback */}
          <svg className="w-full h-full text-[#E8A53E] stroke-current fill-none relative z-0" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
            <path d="M 30 75 Q 50 15 70 75 M 36 54 L 64 54" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <circle cx="50" cy="20" r="4" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* CALLIGRAPHIC BRAND NAME & TAGLINE */}
      {variant !== 'mark-only' && (
        <div className="flex flex-col relative z-10">
          <div className="flex items-baseline gap-2">
            
            {/* "Astitva" Calligraphic Luxury Serif Typography */}
            <span className={`font-cormorant brand-logo-text font-bold italic ${currentSize.text} bg-gradient-to-r from-[#FFFFFF] via-[#FAF5EF] to-[#E8A53E] group-hover:to-[#FFD700] bg-clip-text text-transparent leading-none drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)] transition-all duration-300`}>
              Astitva
            </span>

            {/* "ALLIANCE" Modern Institutional Sans */}
            <span className="font-jakarta text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#E8A53E] group-hover:text-white transition-colors duration-300">
              ALLIANCE
            </span>
          </div>

          {showSubtitle && (
            <span className={`font-jakarta ${currentSize.sub} text-[#B8A9C9] group-hover:text-[#D3C5E5] tracking-normal font-normal mt-0.5 transition-colors duration-300`}>
              Academic Event Infrastructure
            </span>
          )}
        </div>
      )}
    </div>
  );
};

