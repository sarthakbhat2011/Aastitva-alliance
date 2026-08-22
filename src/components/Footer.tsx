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
    <footer className="bg-[#050811] text-[#FAF5EF] border-t border-[#D4AF37]/30 font-sans pt-16 pb-12 px-4 sm:px-6 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#D4AF37]/20">
        {/* Column 1 — Brand */}
        <div className="space-y-4 text-left">
          <AstitvaLogo size="lg" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#D4AF37] text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase">
            <span>Academic Event Management + Network Organisation</span>
          </div>
          <p className="text-xs sm:text-sm text-[#D3C5E5] font-inter italic leading-relaxed">
            "Empowering Student Diplomacy & Academic Excellence"
          </p>
          <div className="flex items-center gap-3 pt-2">
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

        {/* Column 2 — Quick Links */}
        <div className="space-y-3 text-left">
          <h4 className="text-xs uppercase tracking-widest text-[#E8A53E] font-bold font-inter">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#cecece]">
            {[
              { id: 'home', label: 'Home' },
              { id: 'founder', label: 'Meet the Founder' },
              { id: 'about', label: 'About Us' },
              { id: 'offerings', label: 'Offerings' },
              { id: 'how-it-works', label: 'How It Works' },
              { id: 'summit', label: 'Current Summit' },
            ].map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleLinkClick(link.id as Page)}
                  onMouseEnter={() => sounds.playHover()}
                  className="hover:text-[#E8A53E] hover:translate-x-1 transition-all text-left font-inter cursor-pointer inline-block"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Resources */}
        <div className="space-y-3 text-left">
          <h4 className="text-xs uppercase tracking-widest text-[#E8A53E] font-bold font-inter">
            Resources
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#cecece]">
            {[
              { id: 'offerings', label: 'Capabilities & Scope' },
              { id: 'faq', label: 'FAQ' },
              { id: 'sponsors', label: 'Sponsors' },
            ].map((res) => (
              <li key={res.label}>
                <button
                  onClick={() => handleLinkClick(res.id as Page)}
                  onMouseEnter={() => sounds.playHover()}
                  className="hover:text-[#E8A53E] hover:translate-x-1 transition-all text-left font-inter cursor-pointer inline-block"
                >
                  {res.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Institutional Desk */}
        <div className="space-y-3 text-left">
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

      {/* Bottom strip (full-width, below columns) */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#9C9482] font-inter">
        <p>© 2026 Aastitva Alliance (yet to legalize)</p>

        <p className="font-serif italic text-[#D3C5E5]">
          "The Infrastructure behind Great Events"
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => handleLinkClick('about')}
            className="hover:text-[#E8A53E] transition-colors cursor-pointer"
          >
            Privacy Policy · Terms & Conditions
          </button>

          {onOpenDevMailbox && (
            <MagneticElement strength={0.25}>
              <button
                onClick={() => {
                  sounds.playChime();
                  onOpenDevMailbox();
                }}
                className="px-3 py-1 rounded-xl bg-[#0B1120] hover:bg-[#121B33] text-[#E8A53E] border border-[#D4AF37]/30 transition-colors flex items-center gap-1.5 font-bold cursor-pointer"
              >
                <Key className="w-3.5 h-3.5 text-[#E8A53E]" />
                <span>Dev Partner Mailbox</span>
              </button>
            </MagneticElement>
          )}

          <MagneticElement strength={0.3}>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#cecece] hover:text-[#E8A53E] p-1 cursor-pointer"
            >
              Top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </MagneticElement>
        </div>
      </div>
    </footer>
  );
};

