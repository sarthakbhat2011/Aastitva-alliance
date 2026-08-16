import React from 'react';
import { Sparkles, Landmark, Compass, ShieldCheck, ArrowRight, Activity, Globe } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface Props {
  onNavigateSummit?: () => void;
}

export const WhereWeAreTodayCard: React.FC<Props> = ({ onNavigateSummit }) => {
  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-[#0D1427] via-[#16203B]/90 to-[#070A14] border-2 border-[#D4AF37]/45 p-6 sm:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.85)] font-jakarta text-left space-y-6 overflow-hidden animate-twist-in">
      {/* Background Cosmic Atmosphere */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between gap-4 flex-wrap pb-3 border-b border-[#D4AF37]/20">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
            Institutional Status • Where We Are Today
          </span>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#16203B] text-[#FAF5EF] text-[10px] font-mono border border-[#D4AF37]/30">
          Inaugural Partnership Horizon
        </span>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl sm:text-4xl font-cormorant font-bold text-[#FAF5EF]">
          Building Aastitva Alliance from the ground up
        </h3>

        <div className="p-6 rounded-2xl bg-[#070A14]/90 border-l-4 border-[#D4AF37] space-y-2.5 shadow-inner">
          <p className="text-sm sm:text-base text-[#FAF5EF] leading-relaxed font-cormorant italic">
            "We're building Aastitva Alliance from the ground up, starting with our first live partnership, the inaugural Aequitas Summit, with a clear intent to expand across event types and across the region in the years ahead."
          </p>
          <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed font-jakarta">
            "We're nascent, and we are transparent about that. But <em>Aastitva</em> was never about how long we've existed; it's about making sure the events we touch get to exist fully, properly, the way they were meant to."
          </p>
        </div>
      </div>

      {/* Real-time telemetry badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-[#070A14]/80 border border-[#D4AF37]/25 space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] font-bold">
            <Landmark className="w-4 h-4 text-[#D4AF37]" />
            <span>First Live Partnership</span>
          </div>
          <p className="text-sm font-bold text-[#FAF5EF]">Aequitas Summit 2026</p>
          <p className="text-[10px] text-[#C4BBA3]">KC Public School, Jammu</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#070A14]/80 border border-[#D4AF37]/25 space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Transparency Metric</span>
          </div>
          <p className="text-sm font-bold text-emerald-400">100% Radical Honesty</p>
          <p className="text-[10px] text-[#C4BBA3]">Zero opacity, no middlemen</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#070A14]/80 border border-[#D4AF37]/25 space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] font-bold">
            <Compass className="w-4 h-4 text-[#D4AF37]" />
            <span>Regional Intent</span>
          </div>
          <p className="text-sm font-bold text-[#FAF5EF]">13 Interconnected Hubs</p>
          <p className="text-[10px] text-[#C4BBA3]">North & Western India Circuit</p>
        </div>
      </div>

      {onNavigateSummit && (
        <div className="pt-2">
          <button
            onClick={() => {
              sounds.playTap();
              onNavigateSummit();
            }}
            className="px-6 py-3 rounded-xl shimmer-btn text-[#070A14] font-bold text-xs shadow-lg flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all"
          >
            <span>Inspect Inaugural Aequitas Summit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
