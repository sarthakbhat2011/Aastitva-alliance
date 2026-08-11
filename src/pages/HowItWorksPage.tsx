import React from 'react';
import { Page } from '../types';
import {
  MessageSquare,
  FileText,
  CheckSquare,
  Calendar,
  GraduationCap,
  PlayCircle,
  BarChart3,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Astitva3DCanvas } from '../components/Astitva3DCanvas';

interface Props {
  onNavigate: (page: Page) => void;
}

export const HowItWorksPage: React.FC<Props> = ({ onNavigate }) => {
  const steps = [
    {
      num: '01',
      title: 'Inquiry & First Contact',
      desc: 'School leadership or student committee reaches out via our official online partnership form or direct email.',
      icon: MessageSquare,
      deliverable: 'Initial project brief recorded',
    },
    {
      num: '02',
      title: 'Customized Proposal & Budget',
      desc: 'We draft an institutional blueprint outlining delegate capacity, committee themes, Executive Board budget, and timeline.',
      icon: FileText,
      deliverable: 'Transparent cost & scope document',
    },
    {
      num: '03',
      title: 'MoU & Institutional Alignment',
      desc: 'School management reviews and signs the official partnership MoU, locking dates and venue requirements.',
      icon: CheckSquare,
      deliverable: 'Formalized partnership agreement',
    },
    {
      num: '04',
      title: 'EB Recruitment & Study Guides',
      desc: 'We vet and appoint experienced committee chairs, releasing comprehensive background guides to registered delegates.',
      icon: Calendar,
      deliverable: 'Vetted Executive Board & Study Guides',
    },
    {
      num: '05',
      title: 'Pre-Event Training Workshops',
      desc: 'Interactive delegate bootcamps conducted for first-time debaters covering Rules of Procedure and opening speeches.',
      icon: GraduationCap,
      deliverable: 'Prepped student secretariat & debaters',
    },
    {
      num: '06',
      title: 'End-to-End Event Execution',
      desc: 'Our on-site operations squad manages delegate check-in, committee timing, audio-visuals, catering, and award ceremonies.',
      icon: PlayCircle,
      deliverable: 'Flawless 2-day summit operation',
    },
    {
      num: '07',
      title: 'Post-Event Impact Report',
      desc: 'School administration receives an analytics dossier containing delegate turnout numbers, feedback quotes, high-res photo gallery, and media coverage.',
      icon: BarChart3,
      deliverable: 'Comprehensive post-summit archive',
    },
  ];

  return (
    <div className="relative font-sans text-[#FAF5EF] py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      {/* Hero Header with 3D Canvas Emblem */}
      <div className="bg-gradient-to-br from-[#0D1427]/95 via-[#16203B]/90 to-[#070A14]/95 border border-[#D4AF37]/35 shadow-[0_16px_50px_rgba(0,0,0,0.85)] p-6 sm:p-12 rounded-3xl relative overflow-hidden flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center">
        <div className="w-full lg:col-span-8 space-y-4 text-left z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>7-Step Institutional Roadmap</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold gold-gradient-text leading-tight">
            How It Works
          </h1>
          <p className="text-sm sm:text-base text-[#C4BBA3] w-full max-w-2xl leading-relaxed">
            From first inquiry to post-event impact report—our streamlined 7-phase process guarantees seamless execution for school leadership.
          </p>
        </div>

        <div className="w-full lg:col-span-4 h-44 sm:h-56 relative flex items-center justify-center z-0">
          <Astitva3DCanvas variant="hero" />
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="relative space-y-8 before:absolute before:inset-0 before:left-6 sm:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-[#D4AF37]/30 max-w-5xl mx-auto">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isEven = idx % 2 === 0;

          return (
            <div
              key={s.num}
              className={`relative flex flex-col sm:flex-row items-center gap-8 ${
                isEven ? 'sm:flex-row-reverse' : ''
              }`}
            >
              {/* Numbered Center Circle */}
              <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#171026] border-2 border-[#D4AF37] text-[#D4AF37] font-serif font-bold text-sm flex items-center justify-center shadow-2xl z-10">
                {s.num}
              </div>

              {/* Content Card */}
              <div className="w-full sm:w-[calc(50%-2.5rem)] ml-16 sm:ml-0 glass-card rounded-2xl p-6 shadow-xl space-y-3 hover:border-[#D4AF37]/60 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#52459E]/30 text-[#D4AF37] border border-[#D4AF37]/30">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#FAF5EF]">
                    {s.title}
                  </h3>
                </div>

                <p className="text-xs text-[#C4BBA3] leading-relaxed">{s.desc}</p>

                <div className="pt-2 text-[11px] font-semibold text-[#D4AF37] flex items-center gap-1.5 border-t border-[#52459E]/30">
                  <span>Key Outcome:</span>
                  <span className="text-[#FAF5EF]">{s.deliverable}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center glass-card rounded-3xl p-10 space-y-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-serif font-bold text-[#FAF5EF]">
          Ready to Begin Step 01?
        </h2>
        <p className="text-xs text-[#C4BBA3]">
          Submit a 2-minute inquiry form to receive your custom event proposal.
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="px-8 py-3.5 rounded-xl shimmer-btn text-[#171026] font-bold text-sm shadow-xl hover:brightness-110 flex items-center gap-2 mx-auto"
        >
          <span>Start Your Inquiry</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
