import React, { useState } from 'react';
import { Page } from '../types';
import { OFFERINGS, FAQS } from '../data';
import { ChevronDown, ChevronUp, ArrowRight, CheckCircle2, Sparkles, HelpCircle, MessageSquare } from 'lucide-react';
import { ServicesManagerXP } from '../components/ServicesManagerXP';
import { ScrollReveal } from '../components/ScrollReveal';
import { OptimizedImage } from '../components/OptimizedImage';
import { sounds } from '../utils/soundEffects';
import { MagneticElement } from '../components/motion/MagneticElement';
import { TextReveal } from '../components/motion/TextReveal';
import { SpatialFloatingElement } from '../components/motion/SpatialFloatingElement';
import { CinematicScene } from '../components/cinematic/CinematicScene';
import { CinematicMaskReveal } from '../components/cinematic/CinematicMaskReveal';
import { FilmConduitConnector } from '../components/cinematic/FilmConduitConnector';

interface Props {
  onNavigate: (page: Page) => void;
  onOpenRegister?: () => void;
}

export const OfferingsPage: React.FC<Props> = ({ onNavigate, onOpenRegister }) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="relative font-sans text-[#FAF5EF] py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      {/* Header Banner (Scene 01: Establishing Shot) */}
      <CinematicScene shotType="establishing-shot" intensity={0.9}>
        <ScrollReveal direction="zoom" delay={0.1}>
          <div className="space-y-8">
            <div className="space-y-3 text-left font-jakarta">
              <MagneticElement strength={0.2}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono font-bold uppercase tracking-wider shadow-sm cursor-pointer">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>Aastitva Suite • Academic Event Management + Network Organisation</span>
                </div>
              </MagneticElement>
              <CinematicMaskReveal variant="gold-trace-sweep" duration={0.85}>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-cormorant font-bold gold-gradient-text leading-tight">
                  <TextReveal text="Our Offerings" duration={0.6} />
                </h1>
              </CinematicMaskReveal>
              <p className="text-sm sm:text-base text-[#C4BBA3] w-full max-w-3xl leading-relaxed">
                Six full-width modular capability modules with end-to-end operational, physical, and academic coverage for institutions across Jammu & Kashmir.
              </p>
            </div>

            <ServicesManagerXP />
          </div>
        </ScrollReveal>
      </CinematicScene>

      {/* Seamless Film Conduit */}
      <FilmConduitConnector label="SCENE 02 // NETFLIX-STYLE CAPABILITY MATRIX" />

      {/* Offerings Modules - Netflix-Style Full-Width Expandable Cards */}
      <CinematicScene shotType="montage" intensity={0.85}>
        <div className="space-y-8">
          {OFFERINGS.map((offering, idx) => {
            const isExpanded = expandedCard === offering.id;
            const isEven = idx % 2 === 0;

            return (
              <SpatialFloatingElement
                key={offering.id}
                preset={isEven ? 'card-float' : 'gentle'}
                speed={0.8 + (idx % 3) * 0.1}
                delay={idx * 0.2}
              >
                <ScrollReveal direction={isEven ? 'left' : 'right'} delay={0.05}>
                  <div
                    onMouseEnter={() => sounds.playHover()}
                    className="rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 bg-[#0D1427]/90 border-2 border-[#D4AF37]/35 hover:border-[#D4AF37]"
                  >
                    {/* Full-Width Hero Card Banner */}
                    <div className="relative min-h-[240px] sm:min-h-[280px] flex items-end p-6 sm:p-8 dark-photo-overlay overflow-hidden">
                      <OptimizedImage
                        src={offering.image}
                        alt={offering.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070A14] via-[#070A14]/75 to-[#070A14]/30" />

                      <div className="relative z-10 w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left">
                        <div className="space-y-2 max-w-2xl">
                          <span className="px-3 py-1 rounded-md bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider font-jakarta inline-block">
                            {offering.category}
                          </span>
                          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cormorant font-bold text-[#FAF5EF] tracking-wide">
                            {offering.title}
                          </h2>
                          <p className="text-xs sm:text-sm text-[#C4BBA3] font-jakarta">
                            {offering.subtitle}
                          </p>
                        </div>

                        <MagneticElement strength={0.3}>
                          <button
                            onClick={() => {
                              sounds.playTap();
                              toggleExpand(offering.id);
                            }}
                            className="px-5 py-3 rounded-xl bg-[#070A14]/90 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-bold hover:bg-[#16203B] hover:text-[#FAF5EF] transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto backdrop-blur-md min-touch font-jakarta cursor-pointer shadow-lg"
                          >
                            <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </MagneticElement>
                      </div>
                    </div>

                    {/* Highlights Ribbon */}
                    {offering.highlights && offering.highlights.length > 0 && (
                      <div className="bg-[#050811]/90 px-6 sm:px-8 py-3 border-y border-[#D4AF37]/20 flex flex-wrap items-center gap-4 text-xs font-jakarta">
                        <span className="text-[#D4AF37] font-bold uppercase text-[10px] tracking-wider">Key Deliverables:</span>
                        {offering.highlights.map((h, i) => (
                          <span key={i} className="flex items-center gap-1.5 text-[#FAF5EF] font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {h}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Expandable "Learn More" Section */}
                    {isExpanded && (
                      <div className="p-6 sm:p-8 bg-[#0B1120]/95 space-y-6 animate-page-enter font-jakarta text-left border-t border-[#D4AF37]/20">
                        <p className="text-sm text-[#C4BBA3] leading-relaxed">
                          {offering.description}
                        </p>

                        <div className="space-y-3">
                          <h3 className="text-xs sm:text-sm uppercase tracking-widest text-[#D4AF37] font-bold">
                            Detailed Execution Scope:
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {offering.details.map((detail, dIdx) => (
                              <div key={dIdx} className="p-3.5 rounded-xl bg-[#0D1427]/80 border border-[#D4AF37]/25 text-xs text-[#FAF5EF] flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-wrap items-center justify-between gap-4">
                          <span className="text-xs text-[#C4BBA3]">
                            Ready to configure this capability for your campus?
                          </span>
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
                              className="px-6 py-3 rounded-xl shimmer-btn text-[#050811] text-xs font-bold shadow-lg hover:brightness-110 flex items-center gap-2 min-touch cursor-pointer btn-sheen-sweep"
                            >
                              <span>Request Scope Proposal</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </MagneticElement>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              </SpatialFloatingElement>
            );
          })}
        </div>
      </CinematicScene>

      {/* Seamless Film Conduit */}
      <FilmConduitConnector label="SCENE 03 // FAQ & CONSULTATION GATEWAY" />

      {/* FAQ Mini-Section */}
      <CinematicScene shotType="reflective-calm" intensity={0.9}>
        <ScrollReveal direction="up" delay={0.1}>
          <div className="space-y-6 max-w-4xl mx-auto text-left font-jakarta">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-l-2 border-[#D4AF37] pl-6">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" /> FAQ Mini-Section
                </span>
                <h3 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#FAF5EF]">
                  Frequently Asked Questions
                </h3>
              </div>
              <MagneticElement strength={0.25}>
                <button
                  onClick={() => {
                    sounds.playTap();
                    onNavigate('faq');
                  }}
                  className="text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1 min-touch cursor-pointer self-start sm:self-auto"
                >
                  <span>Explore Full Knowledge Base</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </MagneticElement>
            </div>

            <div className="space-y-3 pt-2">
              {FAQS.slice(0, 3).map((faq) => {
                const isOpen = expandedFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="p-5 rounded-2xl bg-[#0D1427]/80 border border-[#D4AF37]/30 backdrop-blur-md cursor-pointer transition-all hover:border-[#D4AF37]"
                    onClick={() => {
                      sounds.playTap();
                      toggleFaq(faq.id);
                    }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="text-sm font-bold text-[#FAF5EF] font-jakarta">
                        {faq.question}
                      </h4>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      )}
                    </div>
                    {isOpen && (
                      <p className="text-xs text-[#C4BBA3] mt-3 pt-3 border-t border-[#D4AF37]/15 leading-relaxed">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </CinematicScene>

      {/* Final CTA per PDF Specification: "Which Offering Fits Your Event?" → Talk to Us button */}
      <CinematicScene shotType="establishing-shot" intensity={0.95}>
        <ScrollReveal direction="zoom" delay={0.1}>
          <div className="text-center rounded-3xl p-8 sm:p-12 space-y-6 max-w-3xl mx-auto font-jakarta bg-gradient-to-r from-[#0D1427] via-[#16203B] to-[#0D1427] border-2 border-[#D4AF37]/40 shadow-2xl">
            <span className="px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider inline-block">
              Institutional Advisory
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cormorant font-bold text-[#FAF5EF]">
              Which Offering Fits Your Event?
            </h2>
            <p className="text-xs sm:text-sm text-[#C4BBA3] max-w-xl mx-auto leading-relaxed">
              Connect directly with our academic operations director to build a customized infrastructure package matching your school's delegate capacity and calendar.
            </p>
            <div className="pt-2">
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
                  className="px-8 py-4 rounded-xl shimmer-btn text-[#050811] font-bold text-sm shadow-[0_8px_30px_rgba(212,175,55,0.4)] btn-sheen-sweep flex items-center gap-2 mx-auto min-touch cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Talk to Us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </MagneticElement>
            </div>
          </div>
        </ScrollReveal>
      </CinematicScene>
    </div>
  );
};
