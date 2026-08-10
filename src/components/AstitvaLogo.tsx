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
    sm: { img: 'h-8 sm:h-9 w-auto', text: 'text-base sm:text-lg', sub: 'text-[9px]' },
    md: { img: 'h-10 sm:h-11 w-auto', text: 'text-lg sm:text-xl', sub: 'text-[10px]' },
    lg: { img: 'h-14 sm:h-16 w-auto', text: 'text-2xl sm:text-3xl', sub: 'text-xs' },
    xl: { img: 'h-20 sm:h-24 w-auto', text: 'text-3xl sm:text-4xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Real Astitva Logo Image */}
      <img
        src="/astitva-logo.png"
        alt="Astitva Official Logo"
        className={`${currentSize.img} object-contain rounded-xl shadow-md border border-[#D4AF37]/35 shrink-0 transition-transform duration-300 hover:scale-105`}
      />

      {variant !== 'mark-only' && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span
              className="font-playfair text-[24px] sm:text-[26px] font-semibold bg-gradient-to-r from-[#EAE0C8] to-[#E8A53E] bg-clip-text text-transparent leading-none"
            >
              Astitva
            </span>
            <span className="text-[#EAE0C8] font-inter text-xs tracking-wider uppercase font-medium">
              Alliance
            </span>
          </div>
          {showSubtitle && (
            <span className="font-inter text-[11px] sm:text-[12px] text-[#B8A9C9] tracking-normal font-normal mt-0.5">
              Academic Event Infrastructure
            </span>
          )}
        </div>
      )}
    </div>
  );
};

