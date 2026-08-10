import React from 'react';
import { ChevronDown } from 'lucide-react';

interface Props {
  targetId?: string;
  label?: string;
  className?: string;
}

export const ScrollIndicator: React.FC<Props> = ({
  targetId,
  label = 'Scroll to Explore',
  className = '',
}) => {
  const handleClick = () => {
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' });
  };

  return (
    <div
      onClick={handleClick}
      className={`inline-flex flex-col items-center gap-2 cursor-pointer group py-3 select-none transition-transform hover:scale-105 ${className}`}
    >
      <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[#B8A9C9] group-hover:text-[#E8A53E] transition-colors duration-300">
        {label}
      </span>
      
      {/* Animated Mouse Wheel Shell */}
      <div className="w-5 h-8 sm:w-6 sm:h-9 rounded-full border-2 border-[#D4AF37]/50 group-hover:border-[#E8A53E] flex justify-center p-1 transition-all duration-300 shadow-lg bg-[#070A14]/40 backdrop-blur-md">
        <div className="w-1.5 h-2.5 bg-[#E8A53E] rounded-full animate-bounce mt-0.5" />
      </div>

      <ChevronDown className="w-4 h-4 text-[#D4AF37] group-hover:text-[#E8A53E] animate-pulse -mt-1 transition-colors duration-300" />
    </div>
  );
};
