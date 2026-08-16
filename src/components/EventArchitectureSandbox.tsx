import React, { useState } from 'react';
import { Layers, ShieldCheck, Target, Sparkles, Check, ArrowRight, Download, Send, Zap, Award, BookOpen, Users, Compass } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface Props {
  onScheduleBriefing: () => void;
}

export const EventArchitectureSandbox: React.FC<Props> = ({ onScheduleBriefing }) => {
  const [eventScale, setEventScale] = useState<'interschool' | 'regional' | 'flagship'>('regional');
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'eb_procurement',
    'rop_handbook',
    'impartial_judging',
    'logistics_blueprint',
  ]);

  const modules = [
    {
      id: 'eb_procurement',
      title: 'Executive Board Procurement & Circuit Chairs',
      desc: 'Handpicked national circuit chairs, vice-chairs, and crisis directors.',
      icon: Award,
    },
    {
      id: 'rop_handbook',
      title: 'UN ROP Academic Governance & Handbooks',
      desc: 'Comprehensive background guides, crisis portfolios, and rules of procedure.',
      icon: BookOpen,
    },
    {
      id: 'impartial_judging',
      title: 'Fair Judging & EB Impartiality Protocol',
      desc: 'Strict transparency scoring metrics with zero home-school bias.',
      icon: ShieldCheck,
    },
    {
      id: 'press_governance',
      title: 'International Press & Media Corp Governance',
      desc: 'Journalism guidelines, crisis press conferences, and media newsletters.',
      icon: Zap,
    },
    {
      id: 'logistics_blueprint',
      title: 'Delegate Flow & Hall Logistics Directorship',
      desc: 'Complete on-ground operational coordination and secretariat management.',
      icon: Compass,
    },
  ];

  const toggleModule = (id: string) => {
    sounds.playTap();
    if (selectedModules.includes(id)) {
      setSelectedModules(selectedModules.filter((m) => m !== id));
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  const scaleStats = {
    interschool: { delegates: '150 - 250', committees: '4 Committees', days: '2-Day Conclave', readiness: '96%' },
    regional: { delegates: '300 - 500', committees: '6 Committees', days: '2 to 3 Days', readiness: '98%' },
    flagship: { delegates: '600 - 1000+', committees: '8+ Councils', days: '3-Day Flagship', readiness: '99.4%' },
  };

  const currentStats = scaleStats[eventScale];

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0D1427] via-[#16203B]/90 to-[#070A14] border-2 border-[#D4AF37]/50 shadow-[0_20px_70px_rgba(0,0,0,0.85)] font-jakarta text-left space-y-8">
      <div className="flex items-center justify-between gap-4 flex-wrap pb-3 border-b border-[#D4AF37]/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
            <Layers className="w-4 h-4 text-[#D4AF37]" />
            <span>Interactive Institutional Architecture Sandbox</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-cormorant font-bold text-[#FAF5EF]">
            Configure Your Institution's Academic Conclave
          </h3>
        </div>

        <span className="px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-xs font-bold">
          Live Blueprint Engine
        </span>
      </div>

      {/* 1. SELECT EVENT SCALE */}
      <div className="space-y-3">
        <span className="text-xs font-mono font-bold text-[#C4BBA3] uppercase tracking-wider block">
          Step 1: Select Event Scope & Format
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'interschool', label: 'Inter-School MUN', sub: '150-250 Delegates • 4 Councils' },
            { id: 'regional', label: 'Regional Leadership Conclave', sub: '300-500 Delegates • 6 Councils' },
            { id: 'flagship', label: 'Flagship Mega-Summit', sub: '600-1000+ Delegates • 8+ Councils' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sounds.playTap();
                setEventScale(item.id as any);
              }}
              className={`p-4 rounded-2xl border text-left transition-all ${
                eventScale === item.id
                  ? 'bg-[#16203B] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.35)]'
                  : 'bg-[#070A14]/80 border-[#D4AF37]/25 hover:border-[#D4AF37]/50'
              }`}
            >
              <h4 className="font-bold text-sm text-[#FAF5EF]">{item.label}</h4>
              <p className="text-[11px] text-[#C4BBA3] mt-1">{item.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 2. SELECT INFRASTRUCTURE MODULES */}
      <div className="space-y-3">
        <span className="text-xs font-mono font-bold text-[#C4BBA3] uppercase tracking-wider block">
          Step 2: Choose Aastitva Infrastructure Modules ({selectedModules.length} Active)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {modules.map((m) => {
            const isSelected = selectedModules.includes(m.id);
            const IconComp = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => toggleModule(m.id)}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                  isSelected
                    ? 'bg-[#0D1427] border-[#D4AF37] shadow-md'
                    : 'bg-[#070A14]/60 border-[#D4AF37]/15 opacity-70'
                }`}
              >
                <div
                  className={`p-2 rounded-xl shrink-0 ${
                    isSelected ? 'bg-[#D4AF37] text-[#070A14]' : 'bg-[#16203B] text-[#C4BBA3]'
                  }`}
                >
                  {isSelected ? <Check className="w-4 h-4" /> : <IconComp className="w-4 h-4" />}
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs sm:text-sm text-[#FAF5EF]">{m.title}</h4>
                  <p className="text-[11px] text-[#C4BBA3] leading-relaxed">{m.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. LIVE BLUEPRINT TELEMETRY & ACTION */}
      <div className="p-6 rounded-2xl bg-[#070A14]/90 border border-[#D4AF37]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
          <div>
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase block">Capacity</span>
            <strong className="text-base text-[#FAF5EF] font-bold">{currentStats.delegates}</strong>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase block">Roster</span>
            <strong className="text-base text-[#FAF5EF] font-bold">{currentStats.committees}</strong>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase block">Duration</span>
            <strong className="text-base text-[#FAF5EF] font-bold">{currentStats.days}</strong>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase block">Readiness</span>
            <strong className="text-base text-emerald-400 font-bold">{currentStats.readiness}</strong>
          </div>
        </div>

        <button
          onClick={onScheduleBriefing}
          className="w-full md:w-auto px-8 py-4 rounded-xl shimmer-btn text-[#070A14] font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shrink-0 min-touch"
        >
          <Sparkles className="w-4 h-4 fill-current" />
          <span>Lock In Institutional Blueprint</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
