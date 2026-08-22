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
  // Proportioned scaling: compact on mobile (< 768px: max-height 38px-42px), grand on desktop
  const sizeMap = {
    sm: { mark: 'w-10 h-10 max-h-[38px] max-w-[38px] sm:w-14 sm:h-14 sm:max-h-none sm:max-w-none', text: 'text-lg sm:text-2xl', sub: 'text-[9px] sm:text-[11px]' },
    md: { mark: 'w-11 h-11 max-h-[42px] max-w-[42px] sm:w-18 sm:h-18 sm:max-h-none sm:max-w-none', text: 'text-xl sm:text-3xl', sub: 'text-[9px] sm:text-[12px]' },
    lg: { mark: 'w-16 h-16 sm:w-24 sm:h-24', text: 'text-2xl sm:text-4xl', sub: 'text-xs sm:text-sm' },
    xl: { mark: 'w-20 h-20 sm:w-28 sm:h-28', text: 'text-3xl sm:text-5xl', sub: 'text-xs sm:text-base' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`relative inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* 
        CLEAN, SIMPLE, CIRCULAR STATIC LOGO MARK
        Completely static: No revolving planets, no orbital rings, no 3D effects, no pulse/glow gimmicks.
        Acts as the authoritative, stable anchor of the website's visual identity.
      */}
      <div className={`relative ${currentSize.mark} shrink-0 rounded-full overflow-hidden border-2 border-[#D4AF37]/60 bg-[#070A14] shadow-md flex items-center justify-center`}>
        {/* Official Circular Logo Image */}
        <img
          src="/astitva-logo.png"
          alt="Aastitva Alliance Logo"
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      {/* BRAND NAME & TAGLINE TYPOGRAPHY */}
      {variant !== 'mark-only' && (
        <div className="flex flex-col text-left min-w-0 max-w-[190px] xs:max-w-[250px] sm:max-w-none">
          <div className="flex items-baseline gap-1.5 sm:gap-2 truncate">
            {/* "Aastitva" Calligraphic Luxury Serif Typography */}
            <span className={`font-cormorant brand-logo-text font-bold italic ${currentSize.text} bg-gradient-to-r from-[#FFFFFF] via-[#FAF5EF] to-[#E8A53E] bg-clip-text text-transparent leading-none drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]`}>
              Aastitva
            </span>

            {/* "ALLIANCE" Modern Institutional Sans */}
            <span className="font-jakarta text-[10px] sm:text-[12px] font-extrabold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#E8A53E]">
              ALLIANCE
            </span>
          </div>

          {showSubtitle && (
            <span className={`font-mono ${currentSize.sub} text-[#D4AF37] tracking-[0.06em] sm:tracking-[0.12em] font-bold uppercase mt-0.5 truncate block max-w-[170px] xs:max-w-[220px] sm:max-w-none`}>
              Academic Event Management + Network Organisation
            </span>
          )}
        </div>
      )}
    </div>
  );
};

