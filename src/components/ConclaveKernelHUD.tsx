import React, { useState } from 'react';
import { Cpu, Activity, ShieldCheck, Zap, Radio, Server, Terminal, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { Astitva3DCanvas } from './Astitva3DCanvas';
import { sounds } from '../utils/soundEffects';

export const ConclaveKernelHUD: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'kernel' | 'eb' | 'network' | 'transparency'>('kernel');

  const modules = {
    kernel: {
      title: 'Aastitva Core Event Kernel v2.4',
      status: 'OPERATIONAL • 100% HEALTH',
      metrics: [
        { label: 'Rules of Procedure', value: 'Strict UN Standard', status: 'Optimal' },
        { label: 'Operational Latency', value: 'Zero Middlemen', status: 'Active' },
        { label: 'Event Execution Index', value: 'Institutional Grade', status: 'Verified' },
      ],
      desc: 'Simplifying the operational complexity of academic events so student ideas reach full, complete existence without administrative friction.',
    },
    eb: {
      title: 'Executive Board Allocation Subsystem',
      status: 'VERIFIED • UNBIASED ROSTER',
      metrics: [
        { label: 'Chair Screening Tier', value: 'Top 5% Regional Circuit', status: 'Active' },
        { label: 'Marking Matrix Integrity', value: 'Zero-Bias Protocol', status: 'Locked' },
        { label: 'Background Guide Prep', value: 'Comprehensive Dossiers', status: 'Ready' },
      ],
      desc: 'Handpicking impartial, seasoned Executive Board members and providing rigorous delegate training bootcamps.',
    },
    network: {
      title: 'Subcontinent Regional Geodesic Grid',
      status: '13 HUBS INTERCONNECTED',
      metrics: [
        { label: 'Primary Founding Core', value: 'Jammu Operations HQ', status: 'Online' },
        { label: 'Regional Reach', value: 'North & Western India', status: 'Linked' },
        { label: 'Grassroots Access', value: 'Jammu District Tour', status: 'Active' },
      ],
      desc: 'Expanding institutional event infrastructure across 13 established regional hubs from Kashmir to Pune.',
    },
    transparency: {
      title: 'Radical Transparency & Covenant Engine',
      status: 'FOUNDER PERSONAL RESPONSIBILITY',
      metrics: [
        { label: 'Hidden Costs', value: '0% (Zero Surcharges)', status: 'Guaranteed' },
        { label: 'Bureaucracy Level', value: 'None (Direct Contact)', status: 'Verified' },
        { label: 'Conversation Integrity', value: 'Honest From Day One', status: 'Covenant' },
      ],
      desc: 'No hidden costs, no vague promises—a founder who takes direct personal responsibility as a covenant for every event.',
    },
  };

  const curr = modules[activeModule];

  return (
    <div className="w-full rounded-3xl bg-gradient-to-b from-[#0B1224]/95 via-[#070A14]/95 to-[#050811]/95 border-2 border-[#D4AF37]/50 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden font-mono text-left relative group">
      {/* XP-Futuristic Luna Window Titlebar */}
      <div className="bg-gradient-to-r from-[#16203B] via-[#0D1427] to-[#16203B] px-3.5 sm:px-4 py-2 sm:py-2.5 border-b border-[#D4AF37]/35 flex items-center justify-between select-none">
        <div className="flex items-center gap-2 max-w-[70%] sm:max-w-none">
          <div className="p-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] shrink-0">
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-[#FAF5EF] tracking-wider truncate">
            Aastitva_Quantum_Kernel.exe
          </span>
        </div>

        {/* Windows XP Futuristic Jewel Window Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80 border border-amber-300/40 shadow-sm" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 border border-emerald-300/40 shadow-sm" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80 border border-rose-300/40 shadow-sm" />
        </div>
      </div>

      {/* Main HUD Body with Fused 3D Holographic Orbiting Core */}
      <div className="p-3.5 sm:p-7 space-y-4 sm:space-y-6 font-jakarta">
        {/* Module Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 text-xs font-mono">
          {[
            { id: 'kernel', label: 'Kernel.sys', icon: Cpu },
            { id: 'eb', label: 'ExecBoard.dll', icon: ShieldCheck },
            { id: 'network', label: 'GridMap.net', icon: Radio },
            { id: 'transparency', label: 'Covenant.sec', icon: Zap },
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeModule === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playTap();
                  setActiveModule(tab.id as any);
                }}
                onMouseEnter={() => sounds.playHover()}
                className={`p-2 sm:p-2.5 rounded-xl border flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#070A14] font-bold border-[#FAF5EF] shadow-lg scale-102'
                    : 'bg-[#070A14]/80 text-[#C4BBA3] border-[#D4AF37]/25 hover:border-[#D4AF37] hover:bg-[#16203B]'
                }`}
              >
                <IconComp className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate text-[11px] sm:text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* FUSED 3D CELESTIAL SATURN ORB & DIAGNOSTICS DECK */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-3.5 sm:p-5 rounded-2xl bg-[#070A14]/90 border border-[#D4AF37]/35 shadow-inner">
          {/* Left Column: Diagnostics Text & Metrics */}
          <div className="md:col-span-8 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-[#D4AF37]/20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono font-bold text-[#FAF5EF]">{curr.title}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 font-mono text-[10px] font-bold">
                {curr.status}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed">
              {curr.desc}
            </p>

            {/* Metric Telemetry Gauges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {curr.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#0D1427]/80 border border-[#D4AF37]/20 space-y-1">
                  <span className="text-[10px] font-mono text-[#D4AF37] block truncate">{m.label}</span>
                  <span className="text-xs font-bold text-[#FAF5EF] block truncate">{m.value}</span>
                  <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{m.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Embedded 3D Saturn Celestial Orb Matrix */}
          <div className="md:col-span-4 h-40 sm:h-56 relative rounded-2xl overflow-hidden bg-black/50 border border-[#D4AF37]/30 flex items-center justify-center p-1">
            <Astitva3DCanvas variant="minimal" />
            <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-[#070A14]/80 text-[9px] font-mono text-[#D4AF37] text-center border border-[#D4AF37]/20 backdrop-blur-md">
              Quantum Planetary Core
            </div>
          </div>
        </div>

        {/* Real-time System Wave Graphic */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[#D4AF37] px-1 pt-1">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            <span>Event Protocol: Active & Compliant</span>
          </div>
          <span className="text-[#C4BBA3] hidden sm:inline">Telemetry Buffer: 32.768 MB/s</span>
        </div>
      </div>
    </div>
  );
};
