import React, { useState } from 'react';
import { Page } from '../types';
import { OFFERINGS } from '../data';
import { ChevronDown, ChevronUp, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Astitva3DCanvas } from '../components/Astitva3DCanvas';
import { ScrollIndicator } from '../components/ScrollIndicator';

interface Props {
  onNavigate: (page: Page) => void;
}

export const OfferingsPage: React.FC<Props> = ({ onNavigate }) => {
  const [expandedCard, setExpandedCard] = useState<string | null>('executive-board');

  const toggleExpand = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="relative font-sans text-[#FAF5EF] py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      {/* Hero Header with 3D Canvas Emblem */}
      <div className="bg-gradient-to-br from-[#0D1427]/95 via-[#16203B]/90 to-[#070A14]/95 border border-[#D4AF37]/35 shadow-[0_16px_50px_rgba(0,0,0,0.85)] p-6 sm:p-12 rounded-3xl relative overflow-hidden flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center">
        <div className="w-full lg:col-span-8 space-y-4 text-left z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turnkey Infrastructure Modules</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold gold-gradient-text leading-tight">
            Our Infrastructure Offerings
          </h1>
          <p className="text-sm sm:text-base text-[#C4BBA3] w-full max-w-2xl leading-relaxed">
            Expandable, modular infrastructure packages tailored for school and university academic events across Jammu & Kashmir.
          </p>
        </div>

        <div className="w-full lg:col-span-4 h-44 sm:h-60 relative flex items-center justify-center z-0">
          <Astitva3DCanvas variant="hero" />
        </div>

        <div className="w-full lg:col-span-12 flex justify-center pt-2">
          <ScrollIndicator targetId="offerings-list" label="Explore Modules" />
        </div>
      </div>

      {/* Expandable Offerings Cards */}
      <div id="offerings-list" className="space-y-8">
        {OFFERINGS.map((offering) => {
          const isExpanded = expandedCard === offering.id;

          return (
            <div
              key={offering.id}
              className="glass-card rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-[#D4AF37]/50"
            >
              {/* Hero Card Banner */}
              <div className="relative min-h-[220px] sm:min-h-[260px] flex items-end p-6 sm:p-8">
                <img
                  src={offering.image}
                  alt={offering.title}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171026] via-[#171026]/70 to-transparent" />

                <div className="relative z-10 w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-2 max-w-2xl">
                    <span className="px-3 py-1 rounded-md bg-[#D4AF37] text-[#171026] text-xs font-bold uppercase tracking-wider">
                      {offering.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF5EF]">
                      {offering.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#C4BBA3]">
                      {offering.subtitle}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleExpand(offering.id)}
                    className="px-4 py-2.5 rounded-xl bg-[#171026]/90 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold hover:bg-[#372C68] transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto backdrop-blur-md"
                  >
                    <span>{isExpanded ? 'Hide Details' : 'Explore Capability'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Highlights Ribbon */}
              <div className="bg-[#120D1F]/90 px-6 sm:px-8 py-3 border-y border-[#52459E]/30 flex flex-wrap items-center gap-4 text-xs">
                <span className="text-[#D4AF37] font-bold uppercase text-[10px] tracking-wider">Key Highlights:</span>
                {offering.highlights.map((h, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-[#FAF5EF] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {h}
                  </span>
                ))}
              </div>

              {/* Expanded Details Section */}
              {isExpanded && (
                <div className="p-6 sm:p-8 bg-[#171026]/95 space-y-6 animate-page-enter">
                  <p className="text-sm text-[#C4BBA3] leading-relaxed">
                    {offering.description}
                  </p>

                  <div className="space-y-3">
                    <h3 className="text-sm uppercase tracking-widest text-[#D4AF37] font-bold">
                      Detailed Execution Scope:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {offering.details.map((detail, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-[#231B42]/80 border border-[#52459E]/30 text-xs text-[#FAF5EF] flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#52459E]/30 flex justify-end">
                    <button
                      onClick={() => onNavigate('contact')}
                      className="px-6 py-3 rounded-xl shimmer-btn text-[#171026] text-xs font-bold shadow-lg hover:brightness-110 flex items-center gap-2"
                    >
                      <span>Request Scope Proposal</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
