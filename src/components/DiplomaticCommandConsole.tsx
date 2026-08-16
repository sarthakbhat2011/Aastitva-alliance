import React, { useState } from 'react';
import { Globe, Users, Flame, Shield, Building, HeartHandshake, Zap, TrendingUp, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { COMMITTEES } from '../data';
import { Astitva3DCanvas } from './Astitva3DCanvas';
import { sounds } from '../utils/soundEffects';

interface Props {
  onOpenRegister?: (commCode?: string) => void;
}

export const DiplomaticCommandConsole: React.FC<Props> = ({ onOpenRegister }) => {
  const [activeCommId, setActiveCommId] = useState<string>(COMMITTEES[0]?.id || 'ccc');

  const activeComm = COMMITTEES.find((c) => c.id === activeCommId) || COMMITTEES[0];

  const getCouncilIcon = (id: string) => {
    switch (id) {
      case 'ccc': return Flame;
      case 'unhrc': return Shield;
      case 'jkla': return Building;
      case 'un-women': return HeartHandshake;
      case 'lok-sabha': return Zap;
      case 'ipl': return TrendingUp;
      default: return Globe;
    }
  };

  const IconComp = getCouncilIcon(activeComm.id);

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-[#0B1224]/95 via-[#070A14]/95 to-[#050811]/95 border-2 border-[#D4AF37]/50 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden font-jakarta text-left relative">
      {/* Windows XP Futuristic Diplomatic Deck Titlebar */}
      <div className="bg-gradient-to-r from-[#16203B] via-[#0D1427] to-[#16203B] px-4 py-2.5 border-b border-[#D4AF37]/35 flex items-center justify-between select-none font-mono">
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
            <Globe className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-[#FAF5EF] tracking-wider truncate">
            Aequitas_Diplomatic_Console.exe [6 Authorized Councils Matrix]
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-300/40" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-300/40" />
          <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-300/40" />
        </div>
      </div>

      {/* Main Command Center Content */}
      <div className="p-5 sm:p-7 space-y-5">
        {/* Council Switcher Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {COMMITTEES.map((c) => {
            const isSelected = c.id === activeCommId;
            const CouncilIcon = getCouncilIcon(c.id);

            return (
              <button
                key={c.id}
                onClick={() => {
                  sounds.playTap();
                  setActiveCommId(c.id);
                }}
                onMouseEnter={() => sounds.playHover()}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  isSelected
                    ? 'bg-[#D4AF37] text-[#070A14] font-bold border-[#FAF5EF] shadow-lg scale-102'
                    : 'bg-[#070A14] text-[#C4BBA3] border-[#D4AF37]/20 hover:border-[#D4AF37] hover:bg-[#16203B]'
                }`}
              >
                <CouncilIcon className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold font-mono truncate w-full">{c.code}</span>
                <span className={`text-[10px] font-mono ${isSelected ? 'text-[#070A14]' : 'text-[#D4AF37]'}`}>
                  {c.seats} Seats
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Council Dossier Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center p-5 sm:p-6 rounded-2xl bg-[#070A14]/90 border border-[#D4AF37]/35 shadow-inner">
          <div className="lg:col-span-8 space-y-3.5">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 shadow-md shrink-0">
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-widest block">
                    Official Summit Council
                  </span>
                  <h3 className="text-xl sm:text-2xl font-cormorant font-bold text-[#FAF5EF]">
                    {activeComm.name} ({activeComm.code})
                  </h3>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 font-mono text-[11px] font-bold">
                Delegate Registration Open
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#16203B]/70 border-l-4 border-[#D4AF37] space-y-1">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-wider block">
                Official Deliberation Agenda:
              </span>
              <p className="text-xs sm:text-sm font-cormorant italic text-[#FAF5EF] leading-relaxed">
                "{activeComm.agenda}"
              </p>
            </div>

            <p className="text-xs text-[#C4BBA3] leading-relaxed">
              {activeComm.description}
            </p>

            <div className="pt-1 flex items-center justify-between gap-3 flex-wrap">
              <button
                onClick={() => {
                  sounds.playChime();
                  onOpenRegister && onOpenRegister(`${activeComm.code} - ${activeComm.name}`);
                }}
                className="px-6 py-2.5 rounded-xl shimmer-btn text-[#070A14] font-bold text-xs shadow-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Apply for {activeComm.code} Seat</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-[10px] font-mono text-[#C4BBA3]">
                100% UN Rules of Procedure & EB Allocation
              </span>
            </div>
          </div>

          {/* Fused 3D Saturn Planetary Council Core */}
          <div className="lg:col-span-4 h-44 sm:h-52 relative rounded-2xl overflow-hidden bg-black/60 border border-[#D4AF37]/35 flex items-center justify-center p-1">
            <Astitva3DCanvas variant="minimal" onOpenRegister={() => onOpenRegister && onOpenRegister(activeComm.code)} />
            <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-[#070A14]/85 text-[9px] font-mono text-[#D4AF37] text-center border border-[#D4AF37]/20 backdrop-blur-md">
              Council Diplomatic Core
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
