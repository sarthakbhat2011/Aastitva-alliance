import React from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const KineticLocationMarquee: React.FC = () => {
  const locations = [
    { city: 'Jammu', state: 'J&K' },
    { city: 'Kashmir', state: 'J&K' },
    { city: 'Himachal Pradesh', state: 'HP' },
    { city: 'Amritsar', state: 'Punjab' },
    { city: 'Ludhiana', state: 'Punjab' },
    { city: 'Chandigarh', state: 'UT' },
    { city: 'Abohar', state: 'Rajasthan' },
    { city: 'Dehradun', state: 'Uttarakhand' },
    { city: 'Haryana', state: 'HR' },
    { city: 'Delhi', state: 'NCR' },
    { city: 'Meerut', state: 'Uttar Pradesh' },
    { city: 'Jaipur', state: 'Rajasthan' },
    { city: 'Pune', state: 'Maharashtra' },
  ];

  return (
    <div className="w-full overflow-hidden py-4 border-y border-[#D4AF37]/30 bg-[#070A14]/80 backdrop-blur-md select-none relative group">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050811] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050811] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee-slow flex items-center gap-8 text-xs sm:text-sm font-mono tracking-widest uppercase">
        {[...locations, ...locations].map((loc, idx) => (
          <div
            key={idx}
            onMouseEnter={() => sounds.playHover()}
            className="flex items-center gap-3 shrink-0 px-4 py-1.5 rounded-full bg-[#0D1427]/60 border border-[#D4AF37]/20 hover:border-[#D4AF37] hover:bg-[#16203B] transition-all cursor-default text-[#C4BBA3] hover:text-[#FAF5EF]"
          >
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span className="font-bold text-[#FAF5EF]">{loc.city}</span>
            <span className="text-[10px] text-[#D4AF37] opacity-80">({loc.state})</span>
            <span className="text-[#D4AF37]/40 text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
