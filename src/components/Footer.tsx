import React from 'react';
import { AstitvaLogo } from './AstitvaLogo';
import { Page } from '../types';
import { Mail, Phone, ArrowUp, Instagram, Linkedin, MessageSquare } from 'lucide-react';

interface Props {
  onNavigate: (page: Page) => void;
  onOpenDevMailbox?: () => void;
}

export const Footer: React.FC<Props> = ({ onNavigate, onOpenDevMailbox }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050811] text-[#FAF5EF] border-t border-[#D4AF37]/30 font-sans pt-16 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#D4AF37]/20">
        {/* Column 1 — Brand */}
        <div className="space-y-4">
          <AstitvaLogo size="lg" />
          <p className="text-xs sm:text-sm text-[#D3C5E5] font-inter italic leading-relaxed">
            "Empowering Student Diplomacy & Academic Excellence"
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://www.instagram.com/alliancesby_aastitva_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-xl bg-[#0B1120] border border-[#D4AF37]/30 text-[#E8A53E] hover:bg-[#E8A53E] hover:text-[#050811] flex items-center justify-center transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/company/aastitva-alliance"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-xl bg-[#0B1120] border border-[#D4AF37]/30 text-[#E8A53E] hover:bg-[#E8A53E] hover:text-[#050811] flex items-center justify-center transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div className="space-y-3">
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
                  onClick={() => {
                    onNavigate(link.id as Page);
                    scrollToTop();
                  }}
                  className="hover:text-[#E8A53E] transition-colors text-left font-inter"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Resources */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-[#E8A53E] font-bold font-inter">
            Resources
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#cecece]">
            {[
              { id: 'blog', label: 'Blog' },
              { id: 'offerings', label: 'Pricing & Scope' },
              { id: 'faq', label: 'FAQ' },
              { id: 'sponsors', label: 'Sponsors' },
            ].map((res) => (
              <li key={res.id}>
                <button
                  onClick={() => {
                    onNavigate(res.id as Page);
                    scrollToTop();
                  }}
                  className="hover:text-[#E8A53E] transition-colors text-left font-inter"
                >
                  {res.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Institutional Desk */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-[#E8A53E] font-bold font-inter">
            Institutional Desk
          </h4>
          <p className="text-xs text-[#cecece] font-inter leading-relaxed">
            Ready to simplify your school's event infrastructure? Request a personalized covenant briefing with our founder.
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                onNavigate('contact');
                scrollToTop();
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#EAE0C8] to-[#E8A53E] text-[#050811] font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-1.5"
            >
              <span>Partner With Us</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom strip (full-width, below columns) */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#9C9482] font-inter">
        <p>© 2026 Aastitva Alliance. All rights reserved.</p>

        <p className="font-serif italic text-[#D3C5E5]">
          "The Infrastructure behind Great Events"
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              onNavigate('about');
              scrollToTop();
            }}
            className="hover:text-[#E8A53E] transition-colors"
          >
            Privacy Policy · Terms & Conditions
          </button>

          {onOpenDevMailbox && (
            <button
              onClick={onOpenDevMailbox}
              className="px-3 py-1 rounded-xl bg-[#0B1120] hover:bg-[#121B33] text-[#E8A53E] border border-[#D4AF37]/30 transition-colors flex items-center gap-1.5 font-bold"
              title="Open Developer Partner Mailbox"
            >
              <span>🔑 Dev Partner Mailbox</span>
            </button>
          )}

          <button onClick={scrollToTop} className="flex items-center gap-1 text-[#cecece] hover:text-[#E8A53E]">
            Top <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
