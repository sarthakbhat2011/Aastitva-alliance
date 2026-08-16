import React, { useState } from 'react';
import {
  Layers,
  ShieldCheck,
  Landmark,
  BookOpen,
  Camera,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Play,
  Terminal,
  Sparkles,
  Download,
  X,
  FileCheck,
  Activity,
  Cpu,
  RefreshCw,
} from 'lucide-react';
import { OFFERINGS } from '../data';
import { sounds } from '../utils/soundEffects';

interface Props {
  onOpenRegister?: (serviceTitle?: string) => void;
}

export const ServicesManagerXP: React.FC<Props> = ({ onOpenRegister }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(OFFERINGS[0]?.id || 'executive-board');
  const [isDiagnosing, setIsDiagnosing] = useState<boolean>(false);
  const [diagnosticStep, setDiagnosticStep] = useState<number>(0);
  const [showDossier, setShowDossier] = useState<boolean>(false);
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([]);

  const activeOffering = OFFERINGS.find((o) => o.id === selectedServiceId) || OFFERINGS[0];

  const runDiagnostics = () => {
    sounds.playTap();
    setIsDiagnosing(true);
    setDiagnosticStep(0);
    setShowDossier(false);
    setDiagnosticLogs([
      `[INIT] Launching Aastitva Diagnostic Subsystem for "${activeOffering.title}"...`,
    ]);

    const steps = [
      `[ACADEMICS] Auditing Executive Board roster against strict UN Rules of Procedure...`,
      `[BANDWIDTH] Simulating acoustic audio, stage tech & delegate room throughput...`,
      `[CURRICULUM] Verifying study guide background dossiers and double-blind scoring matrix...`,
      `[COVENANT] Confirming zero-middlemen protocol and radical transparency promise...`,
      `[READY] All systems verified 100% compliant with Aastitva Institutional Standards!`,
    ];

    steps.forEach((stepText, index) => {
      setTimeout(() => {
        sounds.playHover();
        setDiagnosticStep(index + 1);
        setDiagnosticLogs((prev) => [...prev, stepText]);

        if (index === steps.length - 1) {
          setTimeout(() => {
            sounds.playChime();
            setIsDiagnosing(false);
            setShowDossier(true);
          }, 600);
        }
      }, (index + 1) * 450);
    });
  };

  const handleDownloadSpec = () => {
    sounds.playTap();
    const specContent = `=====================================================
AASTITVA ALLIANCE • INSTITUTIONAL CAPABILITY SPECIFICATION
=====================================================
Module Name: ${activeOffering.title}
Category: ${activeOffering.category}
Subtitle: ${activeOffering.subtitle}
Verification Hash: SHA-256 [0x9F4C2A1E8B]
Academic Compliance: 100% UN Rules of Procedure Standard
Impartiality Index: Zero-Bias Guarantee

OFFICIAL SPECIFICATIONS & DELIVERABLES:
${activeOffering.details.map((d, i) => `  ${i + 1}. ${d}`).join('\n')}

FOUNDER'S PERSONAL COVENANT:
"This is a promise: no hidden costs, no vague promises, just honest conversations from day one."

=====================================================
Issued by: Aastitva Alliance Infrastructure Kernel
Status: VERIFIED & READY FOR INSTITUTIONAL DEPLOYMENT
=====================================================`;

    const blob = new Blob([specContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Aastitva_Spec_${activeOffering.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full rounded-3xl bg-gradient-to-b from-[#0B1224]/95 via-[#070A14]/95 to-[#050811]/95 border-2 border-[#D4AF37]/50 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden font-jakarta text-left space-y-0 relative">
      {/* XP Window Header */}
      <div className="bg-gradient-to-r from-[#16203B] via-[#0D1427] to-[#16203B] px-4 py-2.5 border-b border-[#D4AF37]/35 flex items-center justify-between select-none font-mono">
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-[#FAF5EF] tracking-wider truncate">
            Aastitva_Services_Manager.msc [Capability & Diagnostics Terminal]
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-300/40" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-300/40" />
          <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-300/40" />
        </div>
      </div>

      {/* Main Services Inspector Grid */}
      <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Service Device Nodes */}
        <div className="lg:col-span-5 space-y-2">
          <div className="text-[10px] font-mono uppercase text-[#D4AF37] font-bold tracking-widest pb-1 border-b border-[#D4AF37]/20 flex items-center justify-between">
            <span>Modular Packages ({OFFERINGS.length})</span>
            <span className="text-emerald-400">● 100% Online</span>
          </div>

          <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
            {OFFERINGS.map((offering, idx) => {
              const isSelected = offering.id === selectedServiceId;
              return (
                <button
                  key={offering.id}
                  onClick={() => {
                    sounds.playTap();
                    setSelectedServiceId(offering.id);
                    setShowDossier(false);
                  }}
                  onMouseEnter={() => sounds.playHover()}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-[#16203B] border-[#D4AF37] text-[#FAF5EF] shadow-lg scale-[1.01]'
                      : 'bg-[#070A14]/70 border-[#D4AF37]/20 text-[#C4BBA3] hover:border-[#D4AF37]/60 hover:bg-[#0D1427]'
                  }`}
                >
                  <div className="space-y-0.5 truncate">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase block">
                      Module 0{idx + 1} • {offering.category}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-[#FAF5EF] truncate">
                      {offering.title}
                    </h4>
                  </div>

                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      isSelected ? 'bg-emerald-400 animate-ping' : 'bg-gray-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Diagnostic Dossier */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#070A14]/90 border border-[#D4AF37]/35 space-y-4 flex flex-col justify-between shadow-inner">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-mono font-bold uppercase border border-[#D4AF37]/40">
                {activeOffering.category}
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Status: Fully Active</span>
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-cormorant font-bold text-[#FAF5EF]">
              {activeOffering.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed">
              {activeOffering.description}
            </p>

            {/* Feature Checkpoints */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-mono uppercase text-[#D4AF37] tracking-wider block font-bold">
                Specifications & Deliverables:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeOffering.details.slice(0, 4).map((detail, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#0D1427]/80 border border-[#D4AF37]/20 text-[11px] text-[#FAF5EF] flex items-start gap-2"
                  >
                    <span className="text-[#D4AF37] font-bold">✦</span>
                    <span className="leading-snug">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnostic Action Bar */}
          <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between gap-4 flex-wrap">
            <button
              onClick={runDiagnostics}
              disabled={isDiagnosing}
              className="px-5 py-2.5 rounded-xl shimmer-btn text-[#070A14] font-bold text-xs shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isDiagnosing ? 'Running Diagnostics...' : 'Run Capability Diagnostics'}</span>
            </button>

            <span className="text-[10px] font-mono text-[#C4BBA3]">
              100% Institutional Reliability Guaranteed
            </span>
          </div>
        </div>
      </div>

      {/* LIVE DIAGNOSTIC SIMULATION PROGRESS OVERLAY */}
      {isDiagnosing && (
        <div className="p-6 bg-[#050811]/95 border-t border-[#D4AF37]/30 space-y-3 font-mono text-xs animate-page-enter">
          <div className="flex items-center justify-between text-[#D4AF37] font-bold">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 animate-pulse text-[#D4AF37]" />
              <span>DIAGNOSTIC TEST IN PROGRESS: {activeOffering.title.toUpperCase()}</span>
            </div>
            <span>{Math.min(diagnosticStep * 20, 100)}%</span>
          </div>

          {/* XP Segmented Progress Bar */}
          <div className="w-full h-3 rounded-full bg-[#16203B] overflow-hidden border border-[#D4AF37]/40 p-0.5 flex gap-1">
            {[1, 2, 3, 4, 5].map((seg) => (
              <div
                key={seg}
                className={`h-full flex-1 rounded-sm transition-all duration-300 ${
                  seg <= diagnosticStep
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFF5DC] shadow-[0_0_8px_#D4AF37]'
                    : 'bg-transparent'
                }`}
              />
            ))}
          </div>

          <div className="space-y-1 text-[11px] text-[#C4BBA3] max-h-24 overflow-y-auto">
            {diagnosticLogs.map((log, idx) => (
              <p key={idx} className="text-[#FAF5EF]">
                {log}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* DIAGNOSTIC HEALTH DOSSIER MODAL / RESULTS CARD */}
      {showDossier && (
        <div className="p-6 sm:p-8 bg-gradient-to-br from-[#0D1427] via-[#16203B] to-[#070A14] border-t-2 border-[#D4AF37] space-y-5 animate-skew-in">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/40">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-widest block">
                  Capability Audit Complete
                </span>
                <h4 className="text-xl sm:text-2xl font-cormorant font-bold text-[#FAF5EF]">
                  Institutional Readiness: 99.4% [OPTIMAL]
                </h4>
              </div>
            </div>

            <button
              onClick={() => setShowDossier(false)}
              className="p-1.5 rounded-full bg-[#070A14] text-[#C4BBA3] hover:text-white border border-[#D4AF37]/30"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Health Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-2xl bg-[#070A14]/90 border border-[#D4AF37]/25 space-y-1">
              <span className="text-[10px] text-[#D4AF37] block">Academic Compliance</span>
              <p className="text-sm font-bold text-emerald-400">100% (Strict UN ROP)</p>
              <span className="text-[9px] text-[#C4BBA3]">Zero-bias double blind scoring</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#070A14]/90 border border-[#D4AF37]/25 space-y-1">
              <span className="text-[10px] text-[#D4AF37] block">Operational Latency</span>
              <p className="text-sm font-bold text-cyan-400">0.0s (Direct Founder Lead)</p>
              <span className="text-[9px] text-[#C4BBA3]">No middlemen, no bureaucracy</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#070A14]/90 border border-[#D4AF37]/25 space-y-1">
              <span className="text-[10px] text-[#D4AF37] block">Transparency Index</span>
              <p className="text-sm font-bold text-[#D4AF37]">Guaranteed Covenant</p>
              <span className="text-[9px] text-[#C4BBA3]">No hidden surcharges from day one</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-4 flex-wrap pt-2">
            <button
              onClick={handleDownloadSpec}
              className="px-5 py-2.5 rounded-xl bg-[#070A14] hover:bg-[#16203B] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-mono font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Verified Blueprint (.TXT / Spec)</span>
            </button>

            <button
              onClick={() => {
                sounds.playChime();
                onOpenRegister && onOpenRegister(activeOffering.title);
              }}
              className="px-6 py-2.5 rounded-xl shimmer-btn text-[#070A14] font-bold text-xs shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Deploy This Module for Your School</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
