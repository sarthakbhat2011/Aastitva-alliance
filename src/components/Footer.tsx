import React from 'react';
import { AstitvaLogo } from './AstitvaLogo';
import { Page } from '../types';
import { Mail, Phone, MapPin, Shield, Heart, ArrowUp, ExternalLink } from 'lucide-react';

interface Props {
  onNavigate: (page: Page) => void;
  onOpenDevMailbox?: () => void;
}

export const Footer: React.FC<Props> = ({ onNavigate, onOpenDevMailbox }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070A14] text-[#FAF5EF] border-t border-[#243563]/40 font-sans pt-16 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#52459E]/30">
        {/* Col 1: Brand & Bio */}
        <div className="lg:col-span-2 space-y-4">
          <AstitvaLogo size="lg" />
          <p className="text-sm text-[#C4BBA3] leading-relaxed max-w-md">
            Jammu’s first dedicated academic event infrastructure partner. We empower schools and institutions by providing world-class Executive Board members, venue sourcing, delegate training, and end-to-end event execution for MUNs, debates, quizzes, and literary festivals.
          </p>
          <div className="flex items-center gap-3 pt-2 text-xs text-[#D4AF37]">
            <span className="px-2.5 py-1 rounded bg-[#2D2359] border border-[#52459E]/40 font-semibold">
              🔒 256-Bit SSL Secured
            </span>
            <span className="px-2.5 py-1 rounded bg-[#2D2359] border border-[#52459E]/40 font-semibold">
              ⚡ Edge CDN Hosted
            </span>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Quick Navigation
          </h4>
          <ul className="space-y-2 text-sm text-[#C4BBA3]">
            {['home', 'about', 'offerings', 'how-it-works', 'summit'].map((p) => (
              <li key={p}>
                <button
                  onClick={() => {
                    onNavigate(p as Page);
                    scrollToTop();
                  }}
                  className="hover:text-[#D4AF37] transition-colors capitalize text-left"
                >
                  {p === 'summit' ? 'Current Summit (Aequitas)' : p.replace('-', ' ')}
                </button>
              </li>
            ))}
            <li>
              <a
                href="https://aquitas-aastitva11.onrender.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#D4AF37] text-rose-300 font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>Live Aequitas Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Offerings & Support */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Offerings & Info
          </h4>
          <ul className="space-y-2 text-sm text-[#C4BBA3]">
            {['sponsors', 'blog', 'faq', 'contact'].map((p) => (
              <li key={p}>
                <button
                  onClick={() => {
                    onNavigate(p as Page);
                    scrollToTop();
                  }}
                  className="hover:text-[#D4AF37] transition-colors capitalize text-left"
                >
                  {p === 'blog' ? 'Resources & Articles' : p}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact & Location */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Jammu Headquarters
          </h4>
          <ul className="space-y-2 text-xs text-[#C4BBA3]">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>Aastitva Alliance Hub, Jammu, J&K</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <a href="mailto:contact@aastitvaalliance.in" className="hover:underline">
                contact@aastitvaalliance.in
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <a href="tel:+919419100000" className="hover:underline">
                +91 94191 00000
              </a>
            </li>
          </ul>

          <div className="pt-2">
            <a
              href="https://www.instagram.com/alliancesby_aastitva_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noreferrer"
              className="inline-block px-3 py-1.5 rounded-lg bg-[#2D2359] hover:bg-[#52459E]/40 text-xs text-[#FAF5EF] border border-[#52459E]/30 transition-colors"
            >
              Follow on Instagram @alliancesby_aastitva_
            </a>
          </div>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#768074]">
        <p>© {new Date().getFullYear()} Aastitva Alliance. All rights reserved. Built for Jammu's Youth.</p>
        <div className="flex items-center gap-4">
          {onOpenDevMailbox && (
            <button
              onClick={onOpenDevMailbox}
              className="px-3 py-1 rounded-xl bg-[#16203B] hover:bg-[#243563] text-[#D4AF37] border border-[#D4AF37]/30 transition-colors flex items-center gap-1.5 font-bold"
              title="Open Developer Partner Mailbox"
            >
              <span>🔑 Dev Partner Mailbox</span>
            </button>
          )}
          <button onClick={scrollToTop} className="flex items-center gap-1 text-[#C4BBA3] hover:text-[#D4AF37]">
            Back to Top <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
