import React from 'react';
import { Page } from '../types';
import { Target, Compass, ShieldAlert, Award, CheckCircle2, HeartHandshake, Sparkles, ArrowRight, BookOpen, Sprout, Zap, Landmark, UserCheck } from 'lucide-react';
import { Astitva3DCanvas } from '../components/Astitva3DCanvas';
import { ScrollIndicator } from '../components/ScrollIndicator';
import { StickmanGuide } from '../components/StickmanGuide';

interface Props {
  onNavigate: (page: Page) => void;
}

export const AboutPage: React.FC<Props> = ({ onNavigate }) => {
  const values = [
    {
      title: 'Academic Rigor',
      desc: 'Strict adherence to UN Rules of Procedure, unbiased moderation, and high-quality study guides.',
      icon: BookOpen,
    },
    {
      title: 'Youth Empowerment',
      desc: 'Creating inclusive stages where high school and university debaters build lifelong confidence.',
      icon: Sprout,
    },
    {
      title: 'Turnkey Excellence',
      desc: 'Handling every venue detail, sound desk, badge, and trophy so school administrators relax.',
      icon: Zap,
    },
    {
      title: 'Regional Prestige',
      desc: 'Lifting Jammu onto the national academic event circuit with uncompromising standards.',
      icon: Landmark,
    },
  ];

  return (
    <div className="relative font-sans text-[#FAF5EF] py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      {/* Top Interactive Stickman Page Guide */}
      <StickmanGuide page="about" onNavigate={onNavigate} />

      {/* Featured Founder Banner Cross-Link */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#16203B] via-[#0D1427] to-[#16203B] border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3 text-left">
          <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-serif font-bold text-[#FAF5EF]">
              Looking for our Founder's Story & Journal?
            </h4>
            <p className="text-xs text-[#C4BBA3]">
              Read the philosophy of Aastitva, Jammu government school pilgrimage, and regional reach map.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('founder')}
          className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#070A14] font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-1.5 shrink-0"
        >
          <span>Meet The Founder</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
      {/* Hero Header with 3D Canvas Emblem */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-card p-8 sm:p-12 rounded-3xl relative overflow-hidden">
        <div className="lg:col-span-8 space-y-4 text-left z-10">
          <span className="px-3.5 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> About Astitva Alliance
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold gold-gradient-text">
            Jammu's Premier Academic Infrastructure Partner
          </h1>
          <p className="text-sm sm:text-base text-[#C4BBA3] max-w-2xl leading-relaxed">
            Empowering schools, secretariats, and student debaters across Jammu & Kashmir with world-class Executive Board recruitment, venue sourcing, and turnkey event execution.
          </p>
        </div>

        <div className="lg:col-span-4 h-48 sm:h-60 relative flex items-center justify-center">
          <Astitva3DCanvas variant="hero" />
        </div>

        <div className="col-span-12 flex justify-center pt-2">
          <ScrollIndicator targetId="genesis-section" label="Discover Our Story" />
        </div>
      </div>

      {/* Our Story Grid */}
      <div id="genesis-section" className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center glass-card p-8 sm:p-12 rounded-3xl">
        <div className="space-y-4">
          <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold">
            Genesis & Mission
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF5EF]">
            Why We Founded Astitva Alliance
          </h2>
          <p className="text-sm text-[#C4BBA3] leading-relaxed">
            Aastitva Alliance was born out of a shared observation of academic events in Jammu. For years, school festivals and MUNs suffered from fragmented organization—teachers overwhelmed with logistics, inexperienced chairs causing committee delays, and students missing out on genuine debate.
          </p>
          <p className="text-sm text-[#C4BBA3] leading-relaxed">
            We decided to build a standardized infrastructure backbone. Aastitva provides schools with complete turn-key support: vetted Executive Boards, professional venue sourcing, custom delegate handbooks, and outreach networks.
          </p>
        </div>

        <div className="relative h-80 rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200"
            alt="Aastitva Team and Event Venue"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171026] via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 text-xs text-[#FAF5EF] font-serif font-bold bg-[#171026]/90 px-3 py-1.5 rounded-lg border border-[#D4AF37]/30 backdrop-blur-md">
            Academic Summit Hall • Jammu
          </span>
        </div>
      </div>

      {/* The Gap We Saw */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#FAF5EF]">The Gap We Resolve</h2>
            <p className="text-xs text-[#C4BBA3]">Eliminating Traditional School Event Bottlenecks</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#C4BBA3]">
          <div className="p-6 rounded-2xl bg-[#171026]/80 border border-[#52459E]/40 space-y-2">
            <span className="text-rose-300 font-bold block text-sm">1. Logistics Overload</span>
            <p className="text-xs leading-relaxed">
              School staff forced to handle catering, sound tech, certificates, and trophies alongside daily teaching responsibilities.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#171026]/80 border border-[#52459E]/40 space-y-2">
            <span className="text-rose-300 font-bold block text-sm">2. Inconsistent Moderation</span>
            <p className="text-xs leading-relaxed">
              Unvetted chairs lacking depth in Rules of Procedure, leading to biased awards and frustrated delegates.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#171026]/80 border border-[#52459E]/40 space-y-2">
            <span className="text-rose-300 font-bold block text-sm">3. Low Attendance</span>
            <p className="text-xs leading-relaxed">
              Limited outreach beyond immediate school walls, missing out on inter-school networking and full committee halls.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card rounded-3xl p-8 space-y-4">
          <div className="p-3 w-fit rounded-xl bg-[#52459E]/30 text-[#D4AF37] border border-[#D4AF37]/30">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#FAF5EF]">Our Mission</h3>
          <p className="text-sm text-[#C4BBA3] leading-relaxed">
            To provide Jammu’s schools and colleges with world-class, hassle-free event infrastructure, enabling students to master public speaking, critical thinking, and international diplomacy.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 space-y-4">
          <div className="p-3 w-fit rounded-xl bg-[#52459E]/30 text-[#D4AF37] border border-[#D4AF37]/30">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#FAF5EF]">Our Vision</h3>
          <p className="text-sm text-[#C4BBA3] leading-relaxed">
            To establish Jammu as a premier academic event hub in Northern India, producing articulate global citizens who represent J&K on national and international forums.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-8">
        <h2 className="text-3xl font-serif font-bold gold-gradient-text text-center">
          Our Core Values
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => {
            const IconComp = val.icon;
            return (
              <div key={idx} className="glass-card rounded-3xl p-6 space-y-3 lusion-hover-tilt border border-[#D4AF37]/30">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E8A53E]/20 to-[#0B1120] border border-[#E8A53E]/40 flex items-center justify-center text-[#E8A53E] shadow-lg">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-cormorant font-bold text-[#FAF5EF]">{val.title}</h3>
                <p className="text-xs text-[#C4BBA3] leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('contact')}
          className="px-8 py-4 rounded-xl shimmer-btn text-[#171026] font-bold text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-2"
        >
          <span>Schedule Institutional Briefing</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
