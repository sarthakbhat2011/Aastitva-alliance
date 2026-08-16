import React, { useState } from 'react';
import { Target, ShieldCheck, Globe, Compass, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const InteractiveValueMatrix: React.FC = () => {
  const [activeValue, setActiveValue] = useState<number | null>(null);

  const values = [
    {
      id: 1,
      name: 'Purpose',
      tagline: 'Intentional Execution',
      desc: 'Profound intention behind every event—ensuring every student initiative reaches full existence.',
      icon: Target,
      accent: 'border-[#D4AF37] text-[#D4AF37]',
    },
    {
      id: 2,
      name: 'Integrity',
      tagline: 'Impartial Standards',
      desc: 'Strict impartiality, complete transparency, and commitment to academic excellence.',
      icon: ShieldCheck,
      accent: 'border-emerald-400 text-emerald-400',
    },
    {
      id: 3,
      name: 'Access',
      tagline: 'Equal Opportunity',
      desc: 'Extending premier event infrastructure to underprivileged schools and communities.',
      icon: Globe,
      accent: 'border-cyan-400 text-cyan-400',
    },
    {
      id: 4,
      name: 'Presence',
      tagline: 'Ground Directorship',
      desc: 'Direct, hands-on operational leadership and physical presence on the ground.',
      icon: Compass,
      accent: 'border-amber-400 text-amber-400',
    },
    {
      id: 5,
      name: 'Transparency',
      tagline: 'Radical Honesty',
      desc: 'No hidden costs, no vague promises, just honest conversations from day one.',
      icon: Quote,
      accent: 'border-[#FAF5EF] text-[#FAF5EF]',
    },
  ];

  return (
    <div className="space-y-6 font-jakarta text-left">
      <div className="flex items-center justify-between gap-4 flex-wrap pb-2 border-b border-[#D4AF37]/20">
        <div>
          <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest block">
            Guiding Principles
          </span>
          <h3 className="text-2xl sm:text-4xl font-cormorant font-bold text-[#FAF5EF]">
            OUR VALUES
          </h3>
        </div>
        <span className="text-xs font-mono text-[#C4BBA3]">
          Purpose · Integrity · Access · Presence · Transparency
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {values.map((v, idx) => {
          const IconComp = v.icon;
          const isSelected = activeValue === v.id;
          return (
            <div
              key={v.id}
              onMouseEnter={() => {
                sounds.playHover();
                setActiveValue(v.id);
              }}
              onMouseLeave={() => setActiveValue(null)}
              onClick={() => {
                sounds.playTap();
                setActiveValue(v.id);
              }}
              className={`p-6 rounded-3xl bg-[#0D1427]/90 border-2 transition-all duration-500 cursor-pointer relative overflow-hidden shadow-xl ${
                isSelected
                  ? `${v.accent} shadow-[0_0_30px_rgba(212,175,55,0.4)] -translate-y-2 scale-105 bg-[#16203B]`
                  : 'border-[#D4AF37]/25 hover:border-[#D4AF37]/60'
              }`}
            >
              <div className="space-y-3 relative z-10">
                <div className={`p-3 w-fit rounded-2xl bg-[#070A14] border border-[#D4AF37]/30 shadow-md ${v.accent}`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#D4AF37] opacity-80 block">
                    {v.tagline}
                  </span>
                  <h4 className="font-bold text-lg text-[#FAF5EF] mt-0.5">{v.name}</h4>
                </div>
                <p className="text-xs text-[#C4BBA3] leading-relaxed">
                  {v.desc}
                </p>
              </div>

              {/* Glowing Background Corner Light */}
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-xl pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* The Covenant Promise Callout */}
      <div className="p-5 rounded-2xl bg-[#070A14]/90 border-l-4 border-[#D4AF37] space-y-1 shadow-inner">
        <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-widest block">
          The Unbreakable Promise:
        </span>
        <p className="text-sm sm:text-base font-cormorant italic text-[#FAF5EF]">
          "This is a promise: no hidden costs, no vague promises, just honest conversations from day one."
        </p>
      </div>
    </div>
  );
};
