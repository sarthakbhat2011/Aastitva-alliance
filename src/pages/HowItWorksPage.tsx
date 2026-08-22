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
import { InstitutionalInstallationWizard } from '../components/InstitutionalInstallationWizard';
import { ScrollReveal } from '../components/ScrollReveal';
import { sounds } from '../utils/soundEffects';
import { MagneticElement } from '../components/motion/MagneticElement';
import { PerspectiveCard } from '../components/motion/PerspectiveCard';
import { TextReveal } from '../components/motion/TextReveal';
import { SpatialFloatingElement } from '../components/motion/SpatialFloatingElement';
import { CinematicScene } from '../components/cinematic/CinematicScene';
import { CinematicMaskReveal } from '../components/cinematic/CinematicMaskReveal';
import { FilmConduitConnector } from '../components/cinematic/FilmConduitConnector';

interface Props {
  onNavigate: (page: Page) => void;
  onOpenRegister?: () => void;
}

export const HowItWorksPage: React.FC<Props> = ({ onNavigate, onOpenRegister }) => {
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
      {/* Hero Header with Futuristic Institutional Installation Wizard (Scene 01: Establishing Shot) */}
      <CinematicScene shotType="establishing-shot" intensity={0.9}>
        <ScrollReveal direction="zoom" delay={0.1}>
          <div className="space-y-8">
            <div className="space-y-3 text-left font-jakarta">
              <MagneticElement strength={0.25}>
                <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-2xl sm:rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[9.5px] xs:text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider shadow-sm cursor-pointer max-w-[92vw] sm:max-w-none">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse shrink-0" />
                  <span className="break-words">Process & Architecture • Academic Event Management + Network Organisation</span>
                </div>
              </MagneticElement>
              <CinematicMaskReveal variant="gold-trace-sweep" duration={0.85}>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-cormorant font-bold gold-gradient-text leading-tight">
                  <TextReveal text="How It Works" duration={0.5} />
                </h1>
              </CinematicMaskReveal>
              <p className="text-sm sm:text-base text-[#C4BBA3] w-full max-w-3xl leading-relaxed font-jakarta">
                From first inquiry to post-event impact report—our streamlined 7-phase process guarantees seamless execution for school leadership.
              </p>
            </div>

            <InstitutionalInstallationWizard />
          </div>
        </ScrollReveal>
      </CinematicScene>

      {/* Seamless Film Conduit */}
      <FilmConduitConnector label="SCENE 02 // 7-PHASE EXECUTION CHOREOGRAPHY" />

      {/* Timeline Steps (Scene 02: Montage Sequence) */}
      <CinematicScene shotType="montage" intensity={0.85}>
        <div className="relative space-y-8 before:absolute before:inset-0 before:left-6 sm:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-[#D4AF37]/30 max-w-5xl mx-auto">
          {steps.map((s, idx) => {
            const isEven = idx % 2 === 0;
            const IconComp = s.icon;

            return (
              <div
                key={s.num}
                className={`relative flex items-center gap-6 sm:gap-12 ${
                  isEven ? 'sm:flex-row-reverse' : 'sm:flex-row'
                } pl-12 sm:pl-0`}
              >
                {/* Timeline Center Dot Indicator */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0D1427] border-2 border-[#D4AF37] text-[#D4AF37] font-mono text-xs font-bold flex items-center justify-center shadow-lg z-10">
                  {s.num}
                </div>

                {/* Timeline Card with Free-Floating Spatial Motion */}
                <div
                  className={`w-full sm:w-1/2 ${
                    isEven ? 'sm:text-right text-left' : 'text-left'
                  }`}
                >
                  <SpatialFloatingElement
                    preset={isEven ? 'card-float' : 'gentle'}
                    speed={0.8 + (idx % 3) * 0.15}
                    delay={idx * 0.25}
                  >
                    <PerspectiveCard maxTilt={6} scale={1.02} onMouseEnter={() => sounds.playHover()}>
                      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1427]/90 border-2 border-[#D4AF37]/35 hover:border-[#D4AF37] shadow-2xl transition-all duration-300 font-jakarta space-y-2">
                        <div
                          className={`flex items-center gap-3 ${
                            isEven ? 'sm:justify-end justify-start' : 'justify-start'
                          }`}
                        >
                          <div className="p-2.5 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <h3 className="text-xl font-cormorant font-bold text-[#FAF5EF]">
                            {s.title}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed">
                          {s.desc}
                        </p>

                        <div className="pt-2 border-t border-[#D4AF37]/15">
                          <span className="text-[11px] font-mono text-[#D4AF37] font-semibold">
                            Deliverable: {s.deliverable}
                          </span>
                        </div>
                      </div>
                    </PerspectiveCard>
                  </SpatialFloatingElement>
                </div>
              </div>
            );
          })}
        </div>
      </CinematicScene>

      {/* Seamless Film Conduit */}
      <FilmConduitConnector label="SCENE 03 // PARTNERSHIP GATEWAY" />

      {/* Bottom CTA (Scene 03: Reflective Calm) */}
      <CinematicScene shotType="reflective-calm" intensity={0.9}>
        <ScrollReveal direction="zoom" delay={0.1}>
          <div className="text-center glass-card rounded-3xl p-10 space-y-4 max-w-3xl mx-auto font-jakarta">
            <h2 className="text-2xl font-cormorant font-bold text-[#FAF5EF]">
              Ready to Begin Step 01?
            </h2>
            <p className="text-xs text-[#C4BBA3]">
              Submit a 2-minute inquiry form to receive your custom event proposal.
            </p>
            <MagneticElement strength={0.35}>
              <button
                onClick={() => {
                  sounds.playTap();
                  if (onOpenRegister) {
                    onOpenRegister();
                  } else {
                    onNavigate('summit');
                  }
                }}
                className="px-8 py-3.5 rounded-xl shimmer-btn text-[#171026] font-bold text-sm shadow-xl hover:brightness-110 flex items-center gap-2 mx-auto min-touch cursor-pointer btn-sheen-sweep"
              >
                <span>Start Your Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </MagneticElement>
          </div>
        </ScrollReveal>
      </CinematicScene>
    </div>
  );
};
