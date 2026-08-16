import React from 'react';
import { AastitvaHelpCenterXP } from '../components/AastitvaHelpCenterXP';
import { ScrollReveal } from '../components/ScrollReveal';
import { Sparkles } from 'lucide-react';
import { MagneticElement } from '../components/motion/MagneticElement';
import { TextReveal } from '../components/motion/TextReveal';
import { CinematicScene } from '../components/cinematic/CinematicScene';
import { CinematicMaskReveal } from '../components/cinematic/CinematicMaskReveal';

export const FAQPage: React.FC = () => {
  return (
    <div className="relative font-sans text-[#FAF5EF] py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      {/* Header Banner with Futuristic Help Center (Scene 01: Establishing Shot) */}
      <CinematicScene shotType="establishing-shot" intensity={0.9}>
        <ScrollReveal direction="zoom" delay={0.1}>
          <div className="space-y-8">
            <div className="space-y-3 text-left font-jakarta">
              <MagneticElement strength={0.25}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-widest shadow-sm cursor-pointer">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>Institutional Knowledge Base</span>
                </div>
              </MagneticElement>
              <CinematicMaskReveal variant="gold-trace-sweep" duration={0.85}>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-cormorant font-bold gold-gradient-text leading-tight">
                  <TextReveal text="Frequently Asked Questions" duration={0.6} />
                </h1>
              </CinematicMaskReveal>
              <p className="text-sm sm:text-base text-[#C4BBA3] w-full max-w-3xl leading-relaxed font-jakarta">
                Direct answers on event formats, package customization, sponsorship, student eligibility, logistics, and coordination.
              </p>
            </div>

            <AastitvaHelpCenterXP />
          </div>
        </ScrollReveal>
      </CinematicScene>
    </div>
  );
};
