import React from 'react';
import { Page } from '../types';
import { Eye, Heart, Megaphone, Sparkles, Building2, ArrowRight } from 'lucide-react';
import { Astitva3DCanvas } from '../components/Astitva3DCanvas';
import { ScrollReveal } from '../components/ScrollReveal';

interface Props {
  onNavigate: (page: Page) => void;
}

export const SponsorsPage: React.FC<Props> = ({ onNavigate }) => {
  const sponsorBenefits = [
    {
      title: 'Direct Youth & Family Reach',
      desc: 'Engage 1,000+ ambitious students, school administrators, and families across Jammu & Kashmir.',
      icon: Eye,
    },
    {
      title: 'High-Impact Brand Visibility',
      desc: 'Logo placement on backdrop banners, delegate handbooks, placards, and social media reels.',
      icon: Megaphone,
    },
    {
      title: 'Corporate Social Responsibility (CSR)',
      desc: 'Align your corporate brand with youth leadership, education, public speaking, and diplomacy.',
      icon: Heart,
    },
    {
      title: 'Institutional Network Access',
      desc: 'Connect with school principals, trustees, and academic decision-makers in non-competitive settings.',
      icon: Building2,
    },
  ];

  return (
    <div className="relative font-sans text-[#FAF5EF] py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      {/* Hero Header with 3D Canvas Emblem */}
      <ScrollReveal direction="zoom" delay={0.1}>
        <div className="bg-gradient-to-br from-[#0D1427]/95 via-[#16203B]/90 to-[#070A14]/95 border border-[#D4AF37]/35 shadow-[0_16px_50px_rgba(0,0,0,0.85)] p-6 sm:p-12 rounded-3xl relative overflow-hidden flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center">
          <div className="w-full lg:col-span-8 space-y-4 text-left z-10 font-jakarta">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Corporate & Brand Alliances</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-cormorant font-bold gold-gradient-text leading-tight">
              Partner With Jammu's Academic Movement
            </h1>
            <p className="text-sm sm:text-base text-[#C4BBA3] w-full max-w-2xl leading-relaxed">
              Support the next generation of articulators, diplomats, and leaders while gaining unmatched brand resonance across premier schools in Jammu & Kashmir.
            </p>
          </div>

          <div className="w-full lg:col-span-4 h-44 sm:h-56 relative flex items-center justify-center z-0">
            <Astitva3DCanvas variant="summit" />
          </div>
        </div>
      </ScrollReveal>

      {/* Benefits Grid */}
      <ScrollReveal direction="up" delay={0.15}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left font-jakarta">
          {sponsorBenefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="space-y-3 border-l-2 border-[#D4AF37] pl-6"
              >
                <div className="p-3 w-fit rounded-2xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-cormorant font-bold text-var-text-primary">{b.title}</h3>
                <p className="text-base text-var-text-secondary leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      {/* What Sponsors Receive */}
      <ScrollReveal direction="up" delay={0.15}>
        <div className="space-y-8 py-6 text-left font-jakarta">
          <h3 className="text-3xl font-cormorant font-bold gold-gradient-text text-left border-l-2 border-[#D4AF37] pl-6">
            Sponsorship Tiers & Deliverables
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs sm:text-sm">
            <div className="border-l-2 border-[#D4AF37] pl-5 space-y-3">
              <span className="text-[#D4AF37] font-bold text-lg block font-jakarta">Title Sponsor</span>
              <ul className="space-y-2 text-var-text-secondary leading-relaxed">
                <li>• Exclusive "Presented By" naming rights</li>
                <li>• Keynote address at Opening Ceremony</li>
                <li>• Prime backdrop logo & stall placement</li>
                <li>• Social media spotlight series</li>
              </ul>
            </div>

            <div className="border-l-2 border-[#52459E] pl-5 space-y-3">
              <span className="text-var-text-primary font-bold text-lg block font-jakarta">Co-Sponsor</span>
              <ul className="space-y-2 text-var-text-secondary leading-relaxed">
                <li>• Secondary backdrop branding</li>
                <li>• Logo on delegate welcome kits & pads</li>
                <li>• Opening ceremony verbal mention</li>
                <li>• Social media co-branding</li>
              </ul>
            </div>

            <div className="border-l-2 border-emerald-500 pl-5 space-y-3">
              <span className="text-var-text-primary font-bold text-lg block font-jakarta">Beverage / Kit Partner</span>
              <ul className="space-y-2 text-var-text-secondary leading-relaxed">
                <li>• Product distribution during high tea & lunch</li>
                <li>• Branding inside delegate bags</li>
                <li>• Dedicated booth stall in foyer</li>
                <li>• Digital certificate branding</li>
              </ul>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal direction="zoom" delay={0.1}>
        <div className="text-center space-y-6 max-w-3xl mx-auto py-8 font-jakarta">
          <h2 className="text-3xl sm:text-5xl font-cormorant font-bold gold-gradient-text">
            Become an Official Academic Sponsor
          </h2>
          <p className="text-base text-var-text-secondary max-w-xl mx-auto leading-relaxed">
            Contact our brand partnership division to receive our sponsorship deck and custom package options.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 rounded-xl shimmer-btn text-[#171026] font-bold text-sm shadow-xl hover:brightness-110 flex items-center gap-2 mx-auto min-touch"
          >
            <span>Talk to Us About Sponsorship</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </ScrollReveal>
    </div>
  );
};
