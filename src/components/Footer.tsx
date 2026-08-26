import React from 'react';
import { AstitvaLogo } from './AstitvaLogo';
import { Page } from '../types';
import { Mail, Phone, ArrowUp, Instagram, Linkedin, MessageSquare, Key } from 'lucide-react';
import { MagneticElement } from './motion/MagneticElement';
import { sounds } from '../utils/soundEffects';

interface Props {
  onNavigate: (page: Page) => void;
  onOpenDevMailbox?: () => void;
  onOpenRegister?: () => void;
}

export const Footer: React.FC<Props> = ({ onNavigate, onOpenDevMailbox, onOpenRegister }) => {
  const scrollToTop = () => {
    sounds.playTap();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (page: Page) => {
    sounds.playTap();
    onNavigate(page);
    scrollToTop();
  };

  return (
    <footer className="bg-[#050811] text-[#FAF5EF] border-t border-[#D4AF37]/30 font-sans pt-8 sm:pt-16 pb-8 sm:pb-12 px-3.5 sm:px-6 relative z-10">
      {/* Mobile Boxy Layout (< md) vs Desktop 4-Column Grid (md+) */}
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-10 pb-8 sm:pb-12 border-b border-[#D4AF37]/20">
        
        {/* Box 1: Brand & Identity Box */}
        <div className="p-4 sm:p-0 rounded-2xl md:rounded-none bg-[#0D1427]/80 md:bg-transparent border border-[#D4AF37]/25 md:border-none space-y-3.5 text-left shadow-lg md:shadow-none">
          <div className="flex items-center justify-between gap-3">
            <AstitvaLogo size="md" />
            
            {/* Social Links on mobile (inline with header) */}
            <div className="flex items-center gap-2 md:hidden">
              <a
                href="https://www.instagram.com/alliancesby_aastitva_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                onClick={() => sounds.playTap()}
                className="w-8 h-8 rounded-lg bg-[#0B1120] border border-[#D4AF37]/30 text-[#E8A53E] hover:bg-[#E8A53E] hover:text-[#050811] flex items-center justify-center transition-all shadow-sm"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/company/aastitva-alliance"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                onClick={() => sounds.playTap()}
                className="w-8 h-8 rounded-lg bg-[#0B1120] border border-[#D4AF37]/30 text-[#E8A53E] hover:bg-[#E8A53E] hover:text-[#050811] flex items-center justify-center transition-all shadow-sm"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#D4AF37] text-[9px] sm:text-[11px] font-mono font-bold tracking-wider uppercase">
            <span className="truncate">Academic Event Management + Network Organisation</span>
          </div>

          <p className="text-xs sm:text-sm text-[#D3C5E5] font-inter italic leading-relaxed">
            "Empowering Student Diplomacy & Academic Excellence"
          </p>

          {/* Desktop Social Links */}
          <div className="hidden md:flex items-center gap-3 pt-2">
            <MagneticElement strength={0.4}>
              <a
                href="https://www.instagram.com/alliancesby_aastitva_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                onMouseEnter={() => sounds.playHover()}
                className="w-10 h-10 rounded-xl bg-[#0B1120] border border-[#D4AF37]/30 text-[#E8A53E] hover:bg-[#E8A53E] hover:text-[#050811] flex items-center justify-center transition-all shadow-md cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </MagneticElement>
            <MagneticElement strength={0.4}>
              <a
                href="https://www.linkedin.com/company/aastitva-alliance"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                onMouseEnter={() => sounds.playHover()}
                className="w-10 h-10 rounded-xl bg-[#0B1120] border border-[#D4AF37]/30 text-[#E8A53E] hover:bg-[#E8A53E] hover:text-[#050811] flex items-center justify-center transition-all shadow-md cursor-pointer"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </MagneticElement>
          </div>
        </div>

        {/* Box 2 & 3: Navigation Grid (Compact 2-Column on Mobile, Discrete Columns on Desktop) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:contents">
          {/* Quick Links Card */}
          <div className="p-3.5 sm:p-0 rounded-2xl md:rounded-none bg-[#0D1427]/70 md:bg-transparent border border-[#D4AF37]/20 md:border-none space-y-2.5 text-left shadow-md md:shadow-none">
            <h4 className="text-[11px] sm:text-xs uppercase tracking-widest text-[#E8A53E] font-bold font-inter flex items-center gap-1">
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-1.5 sm:space-y-2.5 text-[11px] sm:text-sm text-[#cecece]">
              {[
                { id: 'home', label: 'Home' },
                { id: 'founder', label: 'Meet Founder' },
                { id: 'about', label: 'About Us' },
                { id: 'offerings', label: 'Offerings' },
                { id: 'how-it-works', label: 'How It Works' },
                { id: 'summit', label: 'Current Summit' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id as Page)}
                    onMouseEnter={() => sounds.playHover()}
                    className="hover:text-[#E8A53E] hover:translate-x-1 transition-all text-left font-inter cursor-pointer inline-block py-0.5"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Scope Card */}
          <div className="p-3.5 sm:p-0 rounded-2xl md:rounded-none bg-[#0D1427]/70 md:bg-transparent border border-[#D4AF37]/20 md:border-none space-y-2.5 text-left shadow-md md:shadow-none flex flex-col justify-between">
            <div className="space-y-2.5">
              <h4 className="text-[11px] sm:text-xs uppercase tracking-widest text-[#E8A53E] font-bold font-inter">
                Resources
              </h4>
              <ul className="space-y-1.5 sm:space-y-2.5 text-[11px] sm:text-sm text-[#cecece]">
                {[
                  { id: 'offerings', label: 'Capabilities & Scope' },
                  { id: 'faq', label: 'FAQ' },
                  { id: 'sponsors', label: 'Sponsors' },
                ].map((res) => (
                  <li key={res.label}>
                    <button
                      onClick={() => handleLinkClick(res.id as Page)}
                      onMouseEnter={() => sounds.playHover()}
                      className="hover:text-[#E8A53E] hover:translate-x-1 transition-all text-left font-inter cursor-pointer inline-block py-0.5"
                    >
                      {res.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Partner CTA on mobile inside resources box */}
            <div className="pt-2 md:hidden">
              <button
                onClick={() => {
                  sounds.playTap();
                  if (onOpenRegister) {
                    onOpenRegister();
                  } else {
                    handleLinkClick('summit');
                  }
                }}
                className="w-full py-1.5 px-2.5 rounded-lg bg-gradient-to-r from-[#EAE0C8] to-[#E8A53E] text-[#050811] font-bold text-[10px] shadow-sm active:scale-95 transition-all text-center"
              >
                Partner With Us
              </button>
            </div>
          </div>
        </div>

        {/* Box 4: Institutional Desk (Visible on Desktop) */}
        <div className="hidden md:block space-y-3 text-left">
          <h4 className="text-xs uppercase tracking-widest text-[#E8A53E] font-bold font-inter">
            Institutional Desk
          </h4>
          <p className="text-xs text-[#cecece] font-inter leading-relaxed">
            Ready to simplify your school's event infrastructure? Request a personalized covenant briefing with our founder.
          </p>

          <div className="pt-2">
            <MagneticElement strength={0.3}>
              <button
                onClick={() => {
                  sounds.playTap();
                  if (onOpenRegister) {
                    onOpenRegister();
                  } else {
                    handleLinkClick('summit');
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#EAE0C8] to-[#E8A53E] text-[#050811] font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-1.5 btn-sheen-sweep cursor-pointer"
              >
                <span>Partner With Us</span>
              </button>
            </MagneticElement>
          </div>
        </div>
      </div>

      {/* Bottom Compact Utility Strip */}
      <div className="max-w-7xl mx-auto pt-4 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-[#9C9482] font-inter">
        <div className="flex items-center justify-between w-full sm:w-auto gap-3 text-center sm:text-left">
          <p>© 2026 Aastitva Alliance</p>
          <p className="hidden md:block font-serif italic text-[#D3C5E5]">
            "The Infrastructure behind Great Events"
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={() => handleLinkClick('about')}
            className="hover:text-[#E8A53E] transition-colors cursor-pointer text-[10px] sm:text-xs"
          >
            Privacy & Terms
          </button>

          {onOpenDevMailbox && (
            <MagneticElement strength={0.25}>
              <button
                onClick={() => {
                  sounds.playChime();
                  onOpenDevMailbox();
                }}
                className="px-2.5 py-1 rounded-lg sm:rounded-xl bg-[#0B1120] hover:bg-[#121B33] text-[#E8A53E] border border-[#D4AF37]/35 transition-all flex items-center gap-1.5 font-bold cursor-pointer text-[10px] sm:text-xs shadow-sm"
              >
                <Key className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E8A53E]" />
                <span>Dev Key Mailbox</span>
              </button>
            </MagneticElement>
          )}

          <MagneticElement strength={0.3}>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#cecece] hover:text-[#E8A53E] px-2 py-1 rounded-lg bg-[#070A14] border border-[#D4AF37]/20 cursor-pointer text-[10px] sm:text-xs"
            >
              <span>Top</span> <ArrowUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </MagneticElement>
        </div>
      </div>
    </footer>
  );
};

