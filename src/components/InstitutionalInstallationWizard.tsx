import React, { useState } from 'react';
import { Terminal, CheckCircle2, ArrowRight, ArrowLeft, RefreshCw, Sparkles, Layers, ShieldCheck, FileText } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const InstitutionalInstallationWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    {
      num: '01',
      title: 'Inquiry & First Contact',
      desc: 'School leadership or student committee reaches out via our official online partnership form or direct email.',
      deliverable: 'Initial project brief recorded',
      checksum: 'SHA-256: 9a8f4c...verified',
      log: '[INIT] Partnership brief received. School capacity mapped.',
    },
    {
      num: '02',
      title: 'Customized Proposal & Budget',
      desc: 'We draft an institutional blueprint outlining delegate capacity, committee themes, Executive Board budget, and timeline.',
      deliverable: 'Transparent cost & scope document',
      checksum: 'SHA-256: 7d1b2e...verified',
      log: '[BUDGET] Transparent allocation compiled. No hidden surcharges.',
    },
    {
      num: '03',
      title: 'MoU & Institutional Alignment',
      desc: 'School management reviews and signs the official partnership MoU, locking dates and venue requirements.',
      deliverable: 'Formalized partnership agreement',
      checksum: 'SHA-256: 4f8a9c...verified',
      log: '[MOU] Bilateral agreement signed. Dates locked on circuit calendar.',
    },
    {
      num: '04',
      title: 'EB Recruitment & Study Guides',
      desc: 'We vet and appoint experienced committee chairs, releasing comprehensive background guides to registered delegates.',
      deliverable: 'Vetted Executive Board & Study Guides',
      checksum: 'SHA-256: 3c5e8b...verified',
      log: '[ACADEMICS] Impartial Executive Board roster assigned. Study guides published.',
    },
    {
      num: '05',
      title: 'Pre-Event Training Workshops',
      desc: 'Interactive delegate bootcamps conducted for first-time debaters covering Rules of Procedure and opening speeches.',
      deliverable: 'Prepped student secretariat & debaters',
      checksum: 'SHA-256: 2e7d1a...verified',
      log: '[WORKSHOP] Student delegates trained in parliamentary ROP & speech drafting.',
    },
    {
      num: '06',
      title: 'End-to-End Event Execution',
      desc: 'Our on-site operations squad manages delegate check-in, committee timing, audio-visuals, catering, and award ceremonies.',
      deliverable: 'Flawless 2-day summit operation',
      checksum: 'SHA-256: 8b1f4c...verified',
      log: '[EXECUTION] Full on-ground operations active. Committees in session.',
    },
    {
      num: '07',
      title: 'Post-Event Impact Report',
      desc: 'School administration receives an analytics dossier containing delegate turnout numbers, feedback quotes, high-res photo gallery, and media coverage.',
      deliverable: 'Comprehensive post-summit archive',
      checksum: 'SHA-256: 1a9d4f...verified',
      log: '[ARCHIVE] Post-summit dossier & analytics report delivered to administration.',
    },
  ];

  const curr = steps[currentStep];

  const handleNext = () => {
    sounds.playTap();
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    sounds.playTap();
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-full rounded-3xl bg-gradient-to-b from-[#0B1224]/95 via-[#070A14]/95 to-[#050811]/95 border-2 border-[#D4AF37]/50 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden font-jakarta text-left space-y-0 relative">
      {/* Windows XP Futuristic Setup Wizard Titlebar */}
      <div className="bg-gradient-to-r from-[#16203B] via-[#0D1427] to-[#16203B] px-4 py-2.5 border-b border-[#D4AF37]/35 flex items-center justify-between select-none font-mono">
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-[#FAF5EF] tracking-wider">
            Aastitva_Setup_Wizard.exe [Phase {currentStep + 1} of {steps.length}]
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-300/40" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-300/40" />
          <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-300/40" />
        </div>
      </div>

      {/* Wizard Body */}
      <div className="p-6 sm:p-10 space-y-6">
        {/* Step Progress Segmented Indicators */}
        <div className="flex items-center justify-between gap-1.5 overflow-x-auto pb-2">
          {steps.map((s, idx) => (
            <button
              key={s.num}
              onClick={() => {
                sounds.playTap();
                setCurrentStep(idx);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                idx === currentStep
                  ? 'bg-[#D4AF37] text-[#070A14] shadow-lg scale-105'
                  : idx < currentStep
                  ? 'bg-[#16203B] text-emerald-400 border border-emerald-500/40'
                  : 'bg-[#070A14] text-[#C4BBA3] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
              }`}
            >
              {idx < currentStep && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              <span>Step {s.num}</span>
            </button>
          ))}
        </div>

        {/* Active Phase Card */}
        <div className="p-6 rounded-2xl bg-[#070A14]/90 border-l-4 border-[#D4AF37] space-y-4 shadow-inner">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-mono font-bold uppercase">
              Phase {curr.num} Protocol
            </span>
            <span className="text-[11px] font-mono text-[#D4AF37]">
              Checksum: {curr.checksum}
            </span>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#FAF5EF]">
              {curr.title}
            </h3>
            <p className="text-xs sm:text-base text-[#C4BBA3] leading-relaxed">
              {curr.desc}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#0D1427] border border-[#D4AF37]/20 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Core Output: {curr.deliverable}</span>
            </div>
            <span className="text-[10px] font-mono text-[#C4BBA3]">
              {curr.log}
            </span>
          </div>
        </div>

        {/* Wizard Footer Controls */}
        <div className="flex items-center justify-between gap-4 pt-2 border-t border-[#D4AF37]/20">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`px-5 py-2.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              currentStep === 0
                ? 'opacity-40 cursor-not-allowed bg-[#070A14] text-[#6B7280] border-gray-800'
                : 'bg-[#16203B] text-[#FAF5EF] border-[#D4AF37]/30 hover:border-[#D4AF37]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <span className="text-xs font-mono text-[#C4BBA3] hidden sm:inline">
            Step {currentStep + 1} of {steps.length} — 100% Institutional Reliability
          </span>

          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              currentStep === steps.length - 1
                ? 'opacity-40 cursor-not-allowed bg-[#070A14] text-[#6B7280]'
                : 'shimmer-btn text-[#070A14] shadow-lg hover:scale-105'
            }`}
          >
            <span>Next Step</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
