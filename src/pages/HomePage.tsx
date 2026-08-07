import React, { useState } from 'react';
import { Page, SummitConfig, CountdownTime, RegistrationFormData } from '../types';
import { Astitva3DCanvas } from '../components/Astitva3DCanvas';
import { OFFERINGS, COMMITTEES } from '../data';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowRight,
  Award,
  Users,
  BookOpen,
  Trophy,
  Calendar,
  Building,
  Quote,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  X,
  FileText,
  MapPin,
  Clock,
  Zap,
  ExternalLink,
  ChevronDown,
  ArrowDown,
  Globe,
  Landmark,
  Lightbulb,
  Scale,
} from 'lucide-react';

interface Props {
  onNavigate: (page: Page) => void;
  summitConfig: SummitConfig;
  countdown: CountdownTime;
}

export const HomePage: React.FC<Props> = ({ onNavigate, summitConfig, countdown }) => {
  const [heroMode, setHeroMode] = useState<'summit' | 'alliance'>('summit');
  const [showQuickRegisterModal, setShowQuickRegisterModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [form, setForm] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    grade: 'High School (11-12)',
    firstChoiceCommittee: 'CCC - Continuous Crisis Committee',
    firstChoicePortfolio: '',
    secondChoiceCommittee: 'UNHRC - United Nations Human Rights Council',
    secondChoicePortfolio: '',
    priorExperience: '1-3 MUNs',
  });

  const GOOGLE_FORM_ACTION =
    'https://docs.google.com/forms/d/e/1FAIpQLScBGLm5S3STYlDHqXT8EojVv0F4o-wMOxWRW563YrE1B1x1DQ/formResponse';

  const handleQuickRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.6 },
    });

    // Silent background POST submission with exact Google Form entry IDs
    try {
      const body = new URLSearchParams();
      body.append('entry.183535783', form.fullName);
      body.append('entry.1640058535', form.email);
      body.append('entry.1465756153', form.phone);
      body.append('entry.386438479', form.institution);
      body.append('entry.177448804', `${form.grade} (${form.priorExperience})`);
      body.append('entry.1860013780', form.firstChoiceCommittee);
      body.append('entry.1770614625', form.firstChoicePortfolio);
      body.append('entry.1136480282', form.secondChoiceCommittee);
      body.append('entry.546561131', form.secondChoicePortfolio);

      fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      }).catch((err) => console.log('Silent Google Form POST:', err));
    } catch (err) {
      console.log('Background submit:', err);
    }
  };

  const scrollToNextSection = () => {
    const section = document.getElementById('explore-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  const trustCategories = [
    { label: 'Model United Nations', icon: Globe },
    { label: 'Literary Festivals', icon: BookOpen },
    { label: 'Inter-School Quizzes', icon: Lightbulb },
    { label: 'Parliamentary Debates', icon: Landmark },
    { label: 'Cultural Symposia', icon: Sparkles },
    { label: 'Youth Parliaments', icon: Scale },
  ];

  return (
    <div className="relative font-sans text-[#FAF5EF]">
      {/* Quick Registration Modal */}
      {showQuickRegisterModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#1D1635] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowQuickRegisterModal(false);
                setFormSubmitted(false);
              }}
              className="absolute top-5 right-5 text-[#C4BBA3] hover:text-white p-2 rounded-full bg-[#171026] border border-[#52459E]/30"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!formSubmitted ? (
              <div className="space-y-5">
                <div className="text-center space-y-1.5">
                  <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">
                    Official Delegate Portal
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#FAF5EF]">
                    Register for {summitConfig.name}
                  </h3>
                  <p className="text-xs text-[#C4BBA3]">
                    {summitConfig.partnerSchool} • {summitConfig.date}
                  </p>
                </div>

                <form onSubmit={handleQuickRegister} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[#C4BBA3] mb-1 font-medium">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#171026] border border-[#52459E]/40 text-[#FAF5EF] focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#C4BBA3] mb-1 font-medium">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="aarav@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#171026] border border-[#52459E]/40 text-[#FAF5EF] focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#C4BBA3] mb-1 font-medium">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#171026] border border-[#52459E]/40 text-[#FAF5EF] focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#C4BBA3] mb-1 font-medium">School / College Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Heritage School Jammu"
                      value={form.institution}
                      onChange={(e) => setForm({ ...form, institution: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#171026] border border-[#52459E]/40 text-[#FAF5EF] focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#C4BBA3] mb-1 font-medium">1st Committee Preference *</label>
                      <select
                        value={form.firstChoiceCommittee}
                        onChange={(e) => setForm({ ...form, firstChoiceCommittee: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#070A14] border border-[#243563]/50 text-[#FAF5EF] focus:border-[#D4AF37] focus:outline-none"
                      >
                        {COMMITTEES.map((c) => (
                          <option key={c.id} value={`${c.code} - ${c.name}`} className="bg-[#070A14]">
                            {c.code} - {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#C4BBA3] mb-1 font-medium">1st Portfolio Preference *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. USA / Portfolio 1"
                        value={form.firstChoicePortfolio}
                        onChange={(e) => setForm({ ...form, firstChoicePortfolio: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#070A14] border border-[#243563]/50 text-[#FAF5EF] focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#C4BBA3] mb-1 font-medium">2nd Committee Preference *</label>
                      <select
                        value={form.secondChoiceCommittee}
                        onChange={(e) => setForm({ ...form, secondChoiceCommittee: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#070A14] border border-[#243563]/50 text-[#FAF5EF] focus:border-[#D4AF37] focus:outline-none"
                      >
                        {COMMITTEES.map((c) => (
                          <option key={c.id} value={`${c.code} - ${c.name}`} className="bg-[#070A14]">
                            {c.code} - {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#C4BBA3] mb-1 font-medium">2nd Portfolio Preference *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. France / Portfolio 2"
                        value={form.secondChoicePortfolio}
                        onChange={(e) => setForm({ ...form, secondChoicePortfolio: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#070A14] border border-[#243563]/50 text-[#FAF5EF] focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl shimmer-btn text-[#171026] font-bold text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all mt-2"
                  >
                    Submit Delegate Application 🚀
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#FAF5EF]">
                  Application Received!
                </h3>
                <p className="text-xs text-[#C4BBA3] max-w-md mx-auto">
                  Thank you, <strong className="text-white">{form.fullName}</strong>. Your seat reservation for{' '}
                  <span className="text-[#D4AF37] font-semibold">{form.firstChoiceCommittee}</span> has been securely submitted to your Google Form account!
                </p>
                <div className="pt-2 flex items-center justify-center">
                  <button
                    onClick={() => {
                      setShowQuickRegisterModal(false);
                      setFormSubmitted(false);
                    }}
                    className="px-6 py-2.5 rounded-xl shimmer-btn text-[#070A14] font-bold text-xs shadow-lg hover:brightness-110"
                  >
                    Done & Return to Site
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex flex-col justify-between pt-8 pb-12 px-4 sm:px-6 overflow-hidden">
        {/* Top Mode Toggle Badge */}
        <div className="max-w-7xl mx-auto w-full z-10 flex justify-center mb-6">
          <div className="p-1 rounded-2xl bg-[#120D1F]/80 border border-[#D4AF37]/30 backdrop-blur-md inline-flex items-center gap-1 shadow-lg">
            <button
              onClick={() => setHeroMode('summit')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                heroMode === 'summit'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89220] text-[#171026] shadow-md'
                  : 'text-[#C4BBA3] hover:text-[#FAF5EF]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Aequitas Summit 2026</span>
              <span className="px-1.5 py-0.5 text-[9px] rounded bg-rose-600 text-white font-extrabold animate-pulse">
                OCT 24-25
              </span>
            </button>
            <button
              onClick={() => setHeroMode('alliance')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                heroMode === 'alliance'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89220] text-[#171026] shadow-md'
                  : 'text-[#C4BBA3] hover:text-[#FAF5EF]'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Astitva Infrastructure</span>
            </button>
          </div>
        </div>

        {/* Hero Body Grid */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10 flex-1">
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {heroMode === 'summit' ? (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Jammu's Premier Model United Nations Summit</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.1]">
                  Where Diplomacy Meets <br />
                  <span className="gold-gradient-text">Youth Leadership.</span>
                </h1>

                <p className="text-sm sm:text-base text-[#C4BBA3] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Join 350+ student delegates, 25+ handpicked chairs, and leading schools across Jammu for two days of intense debate, policy drafting, and international networking at the <strong>Aequitas MUN 2026</strong>.
                </p>

                {/* Hero Live Countdown Bar */}
                <div className="glass-card p-4 rounded-2xl max-w-lg mx-auto lg:mx-0">
                  <div className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-bold mb-2 flex items-center gap-1.5 justify-center lg:justify-start">
                    <Clock className="w-3.5 h-3.5" /> Official Event Countdown
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-[#171026]/80 p-2 rounded-xl border border-[#52459E]/30">
                      <div className="text-xl sm:text-2xl font-mono font-bold text-white">{countdown.days}</div>
                      <div className="text-[10px] text-[#C4BBA3]">DAYS</div>
                    </div>
                    <div className="bg-[#171026]/80 p-2 rounded-xl border border-[#52459E]/30">
                      <div className="text-xl sm:text-2xl font-mono font-bold text-white">{countdown.hours.toString().padStart(2, '0')}</div>
                      <div className="text-[10px] text-[#C4BBA3]">HOURS</div>
                    </div>
                    <div className="bg-[#171026]/80 p-2 rounded-xl border border-[#52459E]/30">
                      <div className="text-xl sm:text-2xl font-mono font-bold text-white">{countdown.minutes.toString().padStart(2, '0')}</div>
                      <div className="text-[10px] text-[#C4BBA3]">MINS</div>
                    </div>
                    <div className="bg-[#171026]/80 p-2 rounded-xl border border-[#52459E]/30">
                      <div className="text-xl sm:text-2xl font-mono font-bold text-[#D4AF37]">{countdown.seconds.toString().padStart(2, '0')}</div>
                      <div className="text-[10px] text-[#C4BBA3]">SECS</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                  <button
                    onClick={() => setShowQuickRegisterModal(true)}
                    className="px-7 py-3.5 rounded-xl shimmer-btn text-[#171026] text-sm font-bold shadow-[0_6px_25px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <span>Register as Delegate</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate('summit')}
                    className="px-6 py-3.5 rounded-xl bg-[#231B42] border border-[#D4AF37]/40 text-[#FAF5EF] text-sm font-semibold hover:bg-[#372C68] transition-all flex items-center gap-2"
                  >
                    <span>Explore Committees</span>
                    <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#52459E]/30 border border-[#52459E]/50 text-[#C4BBA3] text-xs font-semibold">
                  <Building className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Academic Event Infrastructure Platform</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.1]">
                  Empowering Jammu’s <br />
                  <span className="silver-gradient-text">Academic Ecosystem.</span>
                </h1>

                <p className="text-sm sm:text-base text-[#C4BBA3] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  We partner with leading educational institutions in Jammu to power MUNs, debate summits, and literary festivals. From Executive Board allocation to technical setup, we manage end-to-end logistics.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="glass-card p-3 rounded-xl">
                    <div className="text-lg font-bold text-[#D4AF37]">25+</div>
                    <div className="text-[11px] text-[#C4BBA3]">Certified EB Members</div>
                  </div>
                  <div className="glass-card p-3 rounded-xl">
                    <div className="text-lg font-bold text-[#D4AF37]">100%</div>
                    <div className="text-[11px] text-[#C4BBA3]">UN ROP Compliance</div>
                  </div>
                  <div className="glass-card p-3 rounded-xl col-span-2 sm:col-span-1">
                    <div className="text-lg font-bold text-[#D4AF37]">₹0</div>
                    <div className="text-[11px] text-[#C4BBA3]">Upfront Risk Guarantee</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                  <button
                    onClick={() => onNavigate('contact')}
                    className="px-7 py-3.5 rounded-xl shimmer-btn text-[#171026] text-sm font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <span>Request School Partnership</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate('offerings')}
                    className="px-6 py-3.5 rounded-xl bg-[#231B42] border border-[#D4AF37]/40 text-[#FAF5EF] text-sm font-semibold hover:bg-[#372C68] transition-all"
                  >
                    View Infrastructure Offerings
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Right Hero Graphic / 3D Canvas Emblem */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="w-full h-[380px] sm:h-[450px] relative rounded-3xl overflow-hidden glass-card p-2 flex items-center justify-center shadow-2xl">
              <Astitva3DCanvas variant={heroMode === 'summit' ? 'summit' : 'hero'} />
              
              {/* Overlay Glass Floating Cards */}
              <div className="absolute top-4 left-4 bg-[#120D1F]/90 border border-[#D4AF37]/30 p-3 rounded-xl backdrop-blur-md shadow-lg flex items-center gap-2.5 animate-float">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold text-xs">
                  🏆
                </div>
                <div>
                  <div className="text-xs font-bold text-[#FAF5EF]">Conference Location</div>
                  <div className="text-[10px] text-[#C4BBA3]">To Be Announced (Jammu)</div>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 bg-[#120D1F]/90 border border-[#D4AF37]/30 p-3 rounded-xl backdrop-blur-md shadow-lg flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-[#FAF5EF]">Verified EB Roster</div>
                  <div className="text-[10px] text-[#C4BBA3]">100% Academic Rigor</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Smooth Prompt Cue (Mobile & Desktop) */}
        <div className="w-full z-10 flex flex-col items-center justify-center pt-8 cursor-pointer group" onClick={scrollToNextSection}>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C4BBA3] group-hover:text-[#D4AF37] transition-colors mb-2 font-semibold">
            Scroll to Explore
          </span>
          <div className="w-10 h-10 rounded-full bg-[#231B42]/80 border border-[#D4AF37]/40 flex items-center justify-center shadow-lg group-hover:border-[#D4AF37] group-hover:bg-[#372C68] transition-all animate-bounce">
            <ArrowDown className="w-5 h-5 text-[#D4AF37]" />
          </div>
        </div>
      </section>

      {/* Infinite Moving Quotes Marquee Ribbon */}
      <section className="w-full bg-gradient-to-r from-[#171026] via-[#2A1E4A] to-[#171026] border-y border-[#D4AF37]/40 py-3.5 overflow-hidden select-none shadow-2xl relative">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-10">
          {[
            { text: "Diplomacy is the art of letting someone else have your way.", author: "Sir Henry Wotton" },
            { text: "In matters of international debate, clarity is courage & consensus is strength.", author: "Aequitas MUN Secretariat" },
            { text: "Empowering youth leadership & debate excellence across Jammu & Kashmir.", author: "Astitva Alliance" },
            { text: "Rules of Procedure built on academic rigor, zero bias, & parliamentary decorum.", author: "Executive Board" },
            { text: "The highest result of education is tolerance & leadership.", author: "Helen Keller" },
            { text: "Diplomacy is the art of letting someone else have your way.", author: "Sir Henry Wotton" },
            { text: "In matters of international debate, clarity is courage & consensus is strength.", author: "Aequitas MUN Secretariat" },
            { text: "Empowering youth leadership & debate excellence across Jammu & Kashmir.", author: "Astitva Alliance" },
            { text: "Rules of Procedure built on academic rigor, zero bias, & parliamentary decorum.", author: "Executive Board" },
            { text: "The highest result of education is tolerance & leadership.", author: "Helen Keller" },
          ].map((q, idx) => (
            <div key={idx} className="flex items-center gap-3 shrink-0">
              <span className="text-[#D4AF37] font-serif text-lg font-bold">“</span>
              <span className="text-xs sm:text-sm font-medium text-[#FAF5EF] tracking-wide">
                {q.text}
              </span>
              <span className="text-[10px] font-extrabold text-[#D4AF37] uppercase tracking-wider bg-[#D4AF37]/15 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30 shadow-sm">
                — {q.author}
              </span>
              <span className="text-[#D4AF37] text-xs px-3 font-bold">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Categories Ticker */}
      <section id="explore-section" className="py-10 bg-[#070A14]/90 border-b border-[#243563]/30 overflow-hidden backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <p className="text-center text-xs font-serif font-bold tracking-[0.2em] text-[#D4AF37] uppercase drop-shadow-sm">
            Powering Academic Competitions Across Jammu & Kashmir
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {trustCategories.map((c, i) => {
              const IconComp = c.icon;
              return (
                <div
                  key={i}
                  className="glass-card py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2.5 text-center transition-all duration-300 hover:scale-[1.03] hover:border-[#D4AF37]/60 group shadow-lg"
                >
                  <IconComp className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="text-xs font-serif font-semibold text-[#FAF5EF] tracking-wide group-hover:text-[#F3E5AB]">
                    {c.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Offerings Preview Section */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            Our Infrastructure Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold gold-gradient-text">
            End-to-End Event Execution
          </h2>
          <p className="text-sm text-[#C4BBA3]">
            We handle the complex groundwork so schools and student secretariats can focus on delivering exceptional debates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OFFERINGS.slice(0, 3).map((offering) => (
            <div
              key={offering.id}
              className="glass-card p-6 rounded-3xl space-y-4 flex flex-col justify-between group hover:border-[#D4AF37]/50"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#52459E]/30 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#FAF5EF]">
                  {offering.title}
                </h3>
                <p className="text-xs text-[#C4BBA3] leading-relaxed">
                  {offering.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#52459E]/30 space-y-2">
                {offering.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#FAF5EF]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
                <button
                  onClick={() => onNavigate('offerings')}
                  className="pt-2 text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1"
                >
                  <span>Learn details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Summit Committees Showcase */}
      <section className="py-20 px-4 sm:px-6 bg-[#120D1F]/80 border-y border-[#52459E]/30">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="px-3.5 py-1 rounded-full bg-rose-600/20 text-rose-300 text-xs font-bold uppercase tracking-wider">
                Aequitas Summit 2026 Committees
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF5EF]">
                Rigorous Agendas & Handpicked EB
              </h2>
              <p className="text-sm text-[#C4BBA3]">
                Four dynamic committees simulating security, human rights, national policy, and historical crisis.
              </p>
            </div>

            <button
              onClick={() => onNavigate('summit')}
              className="px-6 py-3 rounded-xl bg-[#231B42] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold hover:bg-[#372C68] transition-all flex items-center gap-2 self-start md:self-auto"
            >
              <span>View All Committees & Matrix</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMMITTEES.map((committee) => (
              <div key={committee.id} className="glass-card p-6 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-[#52459E]/40 text-[#D4AF37] font-mono font-bold text-xs border border-[#D4AF37]/30">
                    {committee.code}
                  </span>
                  <span className="text-xs text-[#C4BBA3] font-medium">
                    Seats: <strong className="text-white">{committee.seats} Delegates</strong>
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#FAF5EF]">
                  {committee.name}
                </h3>

                <div className="bg-[#171026]/80 p-3 rounded-xl border border-[#52459E]/30 text-xs space-y-1">
                  <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider">
                    Official Agenda:
                  </span>
                  <p className="text-white font-medium italic">"{committee.agenda}"</p>
                </div>

                <p className="text-xs text-[#C4BBA3] leading-relaxed">
                  {committee.description}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => setShowQuickRegisterModal(true)}
                    className="px-4 py-2 rounded-xl shimmer-btn text-[#171026] text-xs font-bold shadow-md hover:brightness-110"
                  >
                    Apply for {committee.code}
                  </button>

                  <button
                    onClick={() => onNavigate('summit')}
                    className="text-xs text-[#C4BBA3] hover:text-[#D4AF37] font-medium flex items-center gap-1"
                  >
                    View Background Guide <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border-2 border-[#D4AF37]/40 relative overflow-hidden text-center space-y-6 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <span className="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-wider inline-block">
            Elevate Your School's MUN Experience
          </span>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold gold-gradient-text max-w-2xl mx-auto">
            Ready to Host a World-Class Academic Event in Jammu?
          </h2>

          <p className="text-sm sm:text-base text-[#C4BBA3] max-w-xl mx-auto leading-relaxed">
            Partner with Astitva Alliance for zero-risk infrastructure, elite Executive Board recruitment, and complete delegate preparation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-xl shimmer-btn text-[#171026] font-bold text-sm shadow-[0_8px_30px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Schedule Partnership Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://aquitas-aastitva11.onrender.com/"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-4 rounded-xl bg-[#171026] border border-[#D4AF37]/50 text-[#D4AF37] font-bold text-sm hover:bg-[#231B42] transition-all flex items-center gap-2"
            >
              <span>Visit Live Aequitas Portal</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
