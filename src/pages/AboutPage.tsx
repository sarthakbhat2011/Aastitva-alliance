import React from 'react';
import { Page } from '../types';
import { Target, Compass, ShieldAlert, Award, CheckCircle2, HeartHandshake, Sparkles, ArrowRight, BookOpen, Sprout, Zap, Landmark, UserCheck } from 'lucide-react';
import { Astitva3DCanvas } from '../components/Astitva3DCanvas';
import { ScrollIndicator } from '../components/ScrollIndicator';

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
    <div className="relative font-sans text-[#FAF5EF] py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">

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
      <div className="bg-gradient-to-br from-[#0D1427]/95 via-[#16203B]/90 to-[#070A14]/95 border border-[#D4AF37]/35 shadow-[0_16px_50px_rgba(0,0,0,0.85)] p-6 sm:p-12 rounded-3xl relative overflow-hidden flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center">
        <div className="w-full lg:col-span-8 space-y-4 text-left z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Astitva Alliance</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold gold-gradient-text leading-tight">
            Jammu's Premier Academic Infrastructure Partner
          </h1>
          <p className="text-sm sm:text-base text-[#C4BBA3] w-full max-w-2xl leading-relaxed">
            Empowering schools, secretariats, and student debaters across Jammu & Kashmir with world-class Executive Board recruitment, venue sourcing, and turnkey event execution.
          </p>
        </div>

        <div className="w-full lg:col-span-4 h-44 sm:h-60 relative flex items-center justify-center z-0">
          <Astitva3DCanvas variant="hero" />
        </div>

        <div className="w-full lg:col-span-12 flex justify-center pt-2">
          <ScrollIndicator targetId="genesis-section" label="Discover Our Story" />
        </div>
      </div>

      {/* Our Story Grid - Un-boxed Editorial Flow */}
      <div id="genesis-section" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-6">
        <div className="space-y-6 text-left border-l-2 border-[#D4AF37] pl-6 sm:pl-8">
          <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold block animate-text-reveal">
            Genesis & Mission
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-var-text-primary animate-text-reveal animate-delay-1">
            Why We Founded Astitva Alliance
          </h2>
          <p className="text-base text-var-text-secondary leading-relaxed animate-text-reveal animate-delay-2">
            Aastitva Alliance was born out of a shared observation of academic events in Jammu. For years, school festivals and MUNs suffered from fragmented organization—teachers overwhelmed with logistics, inexperienced chairs causing committee delays, and students missing out on genuine debate.
          </p>
          <p className="text-base text-var-text-secondary leading-relaxed animate-text-reveal animate-delay-3">
            We decided to build a standardized infrastructure backbone. Aastitva provides schools with complete turn-key support: vetted Executive Boards, professional venue sourcing, custom delegate handbooks, and outreach networks.
          </p>
        </div>

        <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200"
            alt="Aastitva Team and Event Venue"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070A14] via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 text-xs text-white font-serif font-bold bg-black/80 px-4 py-2 rounded-xl border border-[#D4AF37]/30 backdrop-blur-md">
            Academic Summit Hall • Jammu Region
          </span>
        </div>
      </div>

      {/* The Gap We Resolve - Un-boxed Grid */}
      <div className="space-y-8 py-6">
        <div className="flex items-center gap-3 animate-text-reveal">
          <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-var-text-primary">The Gap We Resolve</h2>
            <p className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider">Eliminating Traditional School Event Bottlenecks</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="border-l-2 border-rose-500/60 pl-5 space-y-2 animate-text-reveal animate-delay-1">
            <span className="text-rose-400 font-bold block text-sm sm:text-base">1. Logistics Overload</span>
            <p className="text-sm text-var-text-secondary leading-relaxed">
              School staff forced to handle catering, sound tech, certificates, and trophies alongside daily teaching responsibilities.
            </p>
          </div>
          <div className="border-l-2 border-rose-500/60 pl-5 space-y-2 animate-text-reveal animate-delay-2">
            <span className="text-rose-400 font-bold block text-sm sm:text-base">2. Inconsistent Moderation</span>
            <p className="text-sm text-var-text-secondary leading-relaxed">
              Unvetted chairs lacking depth in Rules of Procedure, leading to biased awards and frustrated delegates.
            </p>
          </div>
          <div className="border-l-2 border-rose-500/60 pl-5 space-y-2 animate-text-reveal animate-delay-3">
            <span className="text-rose-400 font-bold block text-sm sm:text-base">3. Low Attendance</span>
            <p className="text-sm text-var-text-secondary leading-relaxed">
              Limited outreach beyond immediate school walls, missing out on inter-school networking and full committee halls.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
        <div className="border-l-2 border-[#D4AF37] pl-6 space-y-4 text-left">
          <div className="p-3 w-fit rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 animate-text-reveal">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-var-text-primary animate-text-reveal animate-delay-1">Our Mission</h3>
          <p className="text-base text-var-text-secondary leading-relaxed animate-text-reveal animate-delay-2">
            To provide Jammu’s schools and colleges with world-class, hassle-free event infrastructure, enabling students to master public speaking, critical thinking, and international diplomacy.
          </p>
        </div>

        <div className="border-l-2 border-[#52459E] pl-6 space-y-4 text-left">
          <div className="p-3 w-fit rounded-xl bg-[#52459E]/30 text-[#D4AF37] border border-[#D4AF37]/30 animate-text-reveal">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-var-text-primary animate-text-reveal animate-delay-1">Our Vision</h3>
          <p className="text-base text-var-text-secondary leading-relaxed animate-text-reveal animate-delay-2">
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
