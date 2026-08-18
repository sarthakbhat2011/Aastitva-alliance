import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, Sparkles, MessageCircleQuestion } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { FAQS } from '../data';

export const AastitvaHelpCenterXP: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full rounded-3xl bg-gradient-to-b from-[#0B1224]/95 via-[#070A14]/95 to-[#050811]/95 border-2 border-[#D4AF37]/50 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden font-jakarta text-left space-y-0 relative">
      {/* Windows XP Futuristic Help Center Titlebar */}
      <div className="bg-gradient-to-r from-[#16203B] via-[#0D1427] to-[#16203B] px-3.5 sm:px-4 py-2 sm:py-2.5 border-b border-[#D4AF37]/35 flex items-center justify-between select-none font-mono">
        <div className="flex items-center gap-2 max-w-[70%] sm:max-w-none">
          <div className="p-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] shrink-0">
            <HelpCircle className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-[#FAF5EF] tracking-wider truncate">
            Aastitva_Knowledge_Base.hlp
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80 border border-amber-300/40" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 border border-emerald-300/40" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80 border border-rose-300/40" />
        </div>
      </div>

      {/* Main Help Center Body */}
      <div className="p-4 sm:p-10 space-y-4 sm:space-y-6">
        {/* Instant Search Filter Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#D4AF37] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions, event formats, packages, sponsorship, or policies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#070A14] border border-[#D4AF37]/30 text-xs text-[#FAF5EF] placeholder-[#6B7280] focus:border-[#D4AF37] focus:outline-none shadow-inner"
          />
        </div>

        {/* Total Questions Count Badge */}
        <div className="flex flex-col sm:flex-row gap-1 sm:items-center sm:justify-between text-[11px] sm:text-xs text-[#C4BBA3] px-1 font-mono">
          <span>Displaying {filteredFaqs.length} of {FAQS.length} Verified Inquiries</span>
          <span className="text-[#D4AF37] font-bold">Standard Institutional Guidelines</span>
        </div>

        {/* FAQ Accordion List - Line by line exact */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0D1427] border-[#D4AF37]/60 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                    : 'bg-[#070A14]/90 border-[#D4AF37]/25 hover:border-[#D4AF37]/45'
                }`}
              >
                <button
                  onClick={() => {
                    sounds.playTap();
                    setActiveFaq(isOpen ? null : idx);
                  }}
                  onMouseEnter={() => sounds.playHover()}
                  className="w-full p-4 sm:p-5 flex items-start justify-between gap-4 text-left transition-colors cursor-pointer"
                >
                  <div className="space-y-1.5 pr-2">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/30 inline-block">
                      {faq.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#FAF5EF] leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="p-2 rounded-full bg-[#16203B] text-[#D4AF37] shrink-0 border border-[#D4AF37]/30 mt-1">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-[#C4BBA3] leading-relaxed border-t border-[#D4AF37]/15 bg-[#070A14]/80">
                    <p className="text-[#FAF5EF]/95 font-medium">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
