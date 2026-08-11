import React, { useState } from 'react';
import { Page } from '../types';
import { FAQS } from '../data';
import { ChevronDown, ChevronUp, HelpCircle, Sparkles } from 'lucide-react';
import { Astitva3DCanvas } from '../components/Astitva3DCanvas';
import { StickmanGuide } from '../components/StickmanGuide';

interface Props {
  onNavigate?: (page: Page) => void;
}

export const FAQPage: React.FC<Props> = ({ onNavigate = () => {} }) => {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Executive Board', 'Training', 'Sponsorship'];

  const filteredFaqs = FAQS.filter((f) => {
    return activeCategory === 'All' || f.category === activeCategory;
  });

  return (
    <div className="relative font-sans text-[#FAF5EF] py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      {/* Top Interactive Stickman Page Guide */}
      <StickmanGuide page="faq" onNavigate={onNavigate} />
      {/* Hero Banner with 3D Canvas Emblem */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-card p-8 sm:p-12 rounded-3xl relative overflow-hidden">
        <div className="lg:col-span-8 space-y-4 text-left z-10">
          <span className="px-3.5 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Answers & Guidance
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold gold-gradient-text">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-[#C4BBA3] max-w-2xl leading-relaxed">
            Everything you need to know about partnering with Astitva Alliance for school and university academic events in Jammu.
          </p>
        </div>

        <div className="lg:col-span-4 h-48 sm:h-56 relative flex items-center justify-center">
          <Astitva3DCanvas variant="minimal" />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89220] text-[#171026] shadow-lg'
                : 'bg-[#171026]/80 text-[#C4BBA3] border border-[#52459E]/40 hover:text-[#FAF5EF]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {filteredFaqs.map((faq) => {
          const isOpen = openFaq === faq.id;
          return (
            <div
              key={faq.id}
              className="glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#D4AF37]/50"
            >
              <button
                onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif font-bold text-base text-[#FAF5EF] hover:text-[#D4AF37]"
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <span>{faq.question}</span>
                </span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#D4AF37] shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#C4BBA3] shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-[#C4BBA3] leading-relaxed border-t border-[#52459E]/30 pt-4 animate-page-enter">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
