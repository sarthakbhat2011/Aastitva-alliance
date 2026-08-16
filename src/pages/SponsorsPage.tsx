import React from 'react';
import { Page } from '../types';
import { Sparkles } from 'lucide-react';
import { PartnershipMatrixConsole } from '../components/PartnershipMatrixConsole';
import { ScrollReveal } from '../components/ScrollReveal';
import { MagneticElement } from '../components/motion/MagneticElement';
import { TextReveal } from '../components/motion/TextReveal';
import { CinematicScene } from '../components/cinematic/CinematicScene';
import { CinematicMaskReveal } from '../components/cinematic/CinematicMaskReveal';

interface Props {
  onNavigate: (page: Page) => void;
  onOpenRegister?: () => void;
}

export const SponsorsPage: React.FC<Props> = ({ onNavigate, onOpenRegister }) => {
  return (
    <div className="relative font-sans text-[#FAF5EF] py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      {/* Header Banner with Futuristic Partnership Matrix (Scene 01: Establishing Shot) */}
      <CinematicScene shotType="establishing-shot" intensity={0.9}>
        <ScrollReveal direction="zoom" delay={0.1}>
          <div className="space-y-8">
            <div className="space-y-3 text-left font-jakarta">
              <MagneticElement strength={0.25}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-widest shadow-sm cursor-pointer">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>Institutional & Brand Alliances</span>
                </div>
              </MagneticElement>
              <CinematicMaskReveal variant="gold-trace-sweep" duration={0.85}>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-cormorant font-bold gold-gradient-text leading-tight">
                  <TextReveal text="Partner With Jammu's Academic Movement" duration={0.6} />
                </h1>
              </CinematicMaskReveal>
              <p className="text-sm sm:text-base text-[#C4BBA3] w-full max-w-3xl leading-relaxed font-jakarta">
                Empower student debaters and grassroots schools across Northern India while establishing high-credibility institutional partnership.
              </p>
            </div>

            <PartnershipMatrixConsole
              onPartnerClick={() => {
                if (onOpenRegister) {
                  onOpenRegister();
                } else {
                  onNavigate('summit');
                }
              }}
            />
          </div>
        </ScrollReveal>
      </CinematicScene>
    </div>
  );
};
