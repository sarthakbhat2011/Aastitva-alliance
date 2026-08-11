import React, { useState } from 'react';
import { Page, SummitConfig, CountdownTime, RegistrationFormData } from '../types';
import { Astitva3DCanvas } from '../components/Astitva3DCanvas';
import { ConsultationModal } from '../components/ConsultationModal';
import { ScrollIndicator } from '../components/ScrollIndicator';
import { OFFERINGS, COMMITTEES, BLOG_POSTS } from '../data';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowRight,
  Award,
  BookOpen,
  Trophy,
  Calendar,
  Building,
  ChevronRight,
  CheckCircle2,
  X,
  Clock,
  ArrowDown,
  Globe,
  Landmark,
  Lightbulb,
  Scale,
  Video,
  Shield,
  MessageSquare,
  ExternalLink,
  Users,
} from 'lucide-react';

interface Props {
  onNavigate: (page: Page) => void;
  summitConfig: SummitConfig;
  countdown: CountdownTime;
}

export const HomePage: React.FC<Props> = ({ onNavigate, summitConfig, countdown }) => {
  const [heroMode, setHeroMode] = useState<'summit' | 'alliance'>('alliance');
  const [showQuickRegisterModal, setShowQuickRegisterModal] = useState(false);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [form, setForm] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    schoolName: '',
    grade: '11th Grade',
    firstChoiceCommittee: 'CCC',
    secondChoiceCommittee: 'UNHRC',
    firstChoicePortfolio: '',
    secondChoicePortfolio: '',
    experienceLevel: 'Intermediate',
    agreedToTerms: true,
  });

  const handleQuickRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });

    try {
      const GOOGLE_FORM_ACTION =
        'https://docs.google.com/forms/d/e/1FAIpQLScBGLm5S3STYlDHqXT8EojVv0F4o-wMOxWRW563YrE1B1x1DQ/formResponse';

      const body = new URLSearchParams();
      body.append('entry.200562055', form.fullName);
      body.append('entry.1045781291', form.email);
      body.append('entry.1166974658', form.phone);
      body.append('entry.1065046570', form.schoolName);
      body.append('entry.839337160', form.firstChoiceCommittee);
      body.append('entry.1843230671', form.secondChoiceCommittee);

      fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
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
    { label: 'MUNs', icon: Globe },
    { label: 'Literary Fests', icon: BookOpen },
    { label: 'Quizzes', icon: Lightbulb },
    { label: 'Debates', icon: Landmark },
    { label: 'Cultural Events', icon: Sparkles },
  ];

  return (
    <div className="relative font-sans text-[#cecece]">
      {/* 15-Minute Consultation Booking Modal */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
      />

      {/* Quick Registration Modal */}
      {showQuickRegisterModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#0B1120] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowQuickRegisterModal(false);
                setFormSubmitted(false);
              }}
              className="absolute top-5 right-5 text-[#B8A9C9] hover:text-white p-2 rounded-full bg-[#050811] border border-[#D4AF37]/30"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!formSubmitted ? (
              <div className="space-y-5">
                <div className="text-center space-y-1.5">
                  <span className="px-3 py-1 rounded-full bg-[#E8A53E]/20 text-[#E8A53E] text-[10px] font-bold uppercase tracking-wider">
                    Official Delegate Portal
                  </span>
                  <h3 className="text-2xl font-playfair font-bold text-white">
                    Register for {summitConfig.name}
                  </h3>
                  <p className="text-xs text-[#D3C5E5]">
                    {summitConfig.partnerSchool} • {summitConfig.date}
                  </p>
                </div>

                <form onSubmit={handleQuickRegister} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[#D3C5E5] mb-1 font-medium">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#050811] border border-[#D4AF37]/30 text-white focus:border-[#E8A53E] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#D3C5E5] mb-1 font-medium">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="aarav@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#050811] border border-[#D4AF37]/30 text-white focus:border-[#E8A53E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#D3C5E5] mb-1 font-medium">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 94191 00000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#050811] border border-[#D4AF37]/30 text-white focus:border-[#E8A53E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#D3C5E5] mb-1 font-medium">School / Institution Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DPS Jammu"
                      value={form.schoolName}
                      onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#050811] border border-[#D4AF37]/30 text-white focus:border-[#E8A53E] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl shimmer-btn text-[#050811] font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Submit Delegate Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E8A53E]/20 text-[#E8A53E] flex items-center justify-center mx-auto border border-[#E8A53E]/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-white">Registration Received!</h3>
                <p className="text-sm text-[#D3C5E5] max-w-md mx-auto">
                  Thank you, <strong>{form.fullName}</strong>. Your seat reservation has been recorded.
                </p>
                <button
                  onClick={() => {
                    setShowQuickRegisterModal(false);
                    setFormSubmitted(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#E8A53E] text-[#050811] font-bold text-xs hover:bg-[#D4AF37] transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Hero Section */}
      <section className="relative min-h-[92vh] flex flex-col justify-between pt-6 sm:pt-8 pb-10 px-4 sm:px-6 overflow-hidden">
        {/* Toggle Mode Switcher */}
        <div className="max-w-7xl mx-auto w-full z-10 flex items-center justify-center lg:justify-start mb-6">
          <div className="inline-flex p-1 rounded-2xl bg-[#0B1120]/90 border border-[#D4AF37]/35 backdrop-blur-md shadow-xl">
            <button
              onClick={() => setHeroMode('alliance')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                heroMode === 'alliance'
                  ? 'bg-gradient-to-r from-[#EAE0C8] to-[#E8A53E] text-[#050811] shadow-md'
                  : 'text-[#D3C5E5] hover:text-white'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Astitva Infrastructure</span>
            </button>
            <button
              onClick={() => setHeroMode('summit')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                heroMode === 'summit'
                  ? 'bg-gradient-to-r from-[#EAE0C8] to-[#E8A53E] text-[#050811] shadow-md'
                  : 'text-[#D3C5E5] hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E8A53E]" />
              <span>Aequitas Summit 2026</span>
              <span className="px-1.5 py-0.5 text-[9px] rounded bg-rose-600 text-white font-extrabold animate-pulse">
                OCT 24-25
              </span>
            </button>
          </div>
        </div>

        {/* Hero Body Grid */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10 flex-1">
          {/* Left Hero Text Column (Exact PDF Specification) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8A53E]/15 border border-[#E8A53E]/30 text-[#E8A53E] text-xs font-semibold">
              <Trophy className="w-3.5 h-3.5" />
              <span>Academic Event Infrastructure Partner</span>
            </div>

            {/* HEADLINE: Playfair Display 52px, #FFFFFF (Add glow that sort of embosses) */}
            <h1 className="hero-headline-text">
              The First & Only Academic Event Infrastructure Partner in Jammu
            </h1>

            {/* SUBHEADLINE: Inter 20px, #D3C5E5 */}
            <p className="hero-subheadline-text font-inter">
              One partnership. Everything covered.
            </p>

            {/* BODY PARAGRAPH: Inter 19px, #cecece */}
            <p className="body-paragraph-text font-inter max-w-2xl mx-auto lg:mx-0">
              We partner with leading educational institutions in Jammu to power MUNs, debate summits, quizzes, and literary festivals. From certified Executive Board deployment to technical logistics, we manage end-to-end event execution.
            </p>

            {/* THREE HERO BUTTONS (PDF Page 1 Specification) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-3">
              {/* Button 1: "Partner With Us" (leads to form) */}
              <button
                onClick={() => onNavigate('contact')}
                className="px-7 py-3.5 rounded-xl shimmer-btn text-[#050811] text-sm font-bold shadow-[0_6px_25px_rgba(232,165,62,0.35)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Button 2: "Explore Offerings" (redirects to the offerings tab) */}
              <button
                onClick={() => onNavigate('offerings')}
                className="px-6 py-3.5 rounded-xl bg-[#0B1120] border border-[#D4AF37]/40 text-[#FAF5EF] text-sm font-semibold hover:border-[#E8A53E] hover:text-[#E8A53E] transition-all flex items-center gap-2"
              >
                <span>Explore Offerings</span>
                <ChevronRight className="w-4 h-4 text-[#E8A53E]" />
              </button>

              {/* Button 3: "Book a Free Consultation Call" (15-minute call directly on a calendar) */}
              <button
                onClick={() => setConsultationModalOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-[#050811] border border-[#B8A9C9]/40 text-[#D3C5E5] text-sm font-semibold hover:border-[#E8A53E] hover:text-white transition-all flex items-center gap-2 shadow-lg"
              >
                <Video className="w-4 h-4 text-[#E8A53E]" />
                <span>Book a Free Consultation Call</span>
              </button>
            </div>
          </div>

          {/* Right Hero Graphic / 3D Canvas Emblem */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="w-full h-[380px] sm:h-[450px] relative rounded-3xl overflow-hidden glass-card p-2 flex items-center justify-center shadow-2xl lusion-hover-tilt">
              <Astitva3DCanvas variant={heroMode === 'summit' ? 'summit' : 'hero'} />

              {/* Overlay Glass Floating Cards */}
              <div className="absolute top-4 left-4 bg-[#050811]/90 border border-[#D4AF37]/30 p-3 rounded-xl backdrop-blur-md shadow-lg flex items-center gap-2.5 animate-float">
                <div className="w-8 h-8 rounded-lg bg-[#E8A53E]/20 text-[#E8A53E] flex items-center justify-center font-bold text-xs">
                  🏆
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-inter">Summit Location</div>
                  <div className="text-[10px] text-[#B8A9C9] font-inter">Jammu, J&K (Prestige Venue)</div>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 bg-[#050811]/90 border border-[#D4AF37]/30 p-3 rounded-xl backdrop-blur-md shadow-lg flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-inter">Verified EB Roster</div>
                  <div className="text-[10px] text-[#B8A9C9] font-inter">100% UN ROP Compliance</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Cue */}
        <div className="w-full z-10 flex flex-col items-center justify-center pt-6">
          <ScrollIndicator targetId="explore-section" label="Scroll to Explore" />
        </div>
      </section>

      {/* SCROLLING BAR (Left to Right as specified in PDF Page 2) */}
      <section className="w-full bg-[#050811] border-y border-[#D4AF37]/30 py-4 overflow-hidden select-none shadow-2xl relative">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12">
          {trustCategories.concat(trustCategories).concat(trustCategories).map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <div key={idx} className="flex items-center gap-3 shrink-0 px-4 py-1.5 rounded-xl bg-[#0B1120] border border-[#D4AF37]/20">
                <IconComp className="w-4 h-4 text-[#E8A53E]" />
                <span className="text-xs sm:text-sm font-semibold text-[#EAE0C8] tracking-wider uppercase font-inter">
                  {cat.label}
                </span>
                <span className="text-[#E8A53E] text-xs font-bold ml-2">✦</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* LIVE COUNTDOWN SECTION (PDF Page 2 Specification) */}
      <section id="explore-section" className="py-16 px-4 sm:px-6 bg-[#0B1120]/90 border-b border-[#D4AF37]/20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-[#E8A53E]/20 text-[#E8A53E] text-xs font-bold uppercase tracking-widest border border-[#E8A53E]/30">
              Official Summit Countdown
            </span>
            <h2 className="text-3xl sm:text-5xl font-playfair font-bold text-white tracking-wider">
              THE SUMMIT BEGINS IN
            </h2>
            <p className="text-xs sm:text-sm text-[#B8A9C9] font-mono tracking-widest">
              (Days · Hours · Minutes · Seconds)
            </p>
          </div>

          {/* Massive, translucent countdown numbers dissolving smoothly as seconds change */}
          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto">
            <div className="glass-card p-4 sm:p-8 rounded-3xl border border-[#D4AF37]/40 shadow-2xl lusion-hover-tilt">
              <div className="text-4xl sm:text-6xl lg:text-7xl font-mono font-extrabold countdown-val-text">
                {countdown.days.toString().padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#E8A53E] countdown-val-accent tracking-widest mt-2 uppercase">DAYS</div>
            </div>

            <div className="glass-card p-4 sm:p-8 rounded-3xl border border-[#D4AF37]/40 shadow-2xl lusion-hover-tilt">
              <div className="text-4xl sm:text-6xl lg:text-7xl font-mono font-extrabold countdown-val-text">
                {countdown.hours.toString().padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#E8A53E] countdown-val-accent tracking-widest mt-2 uppercase">HOURS</div>
            </div>

            <div className="glass-card p-4 sm:p-8 rounded-3xl border border-[#D4AF37]/40 shadow-2xl lusion-hover-tilt">
              <div className="text-4xl sm:text-6xl lg:text-7xl font-mono font-extrabold countdown-val-text">
                {countdown.minutes.toString().padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#E8A53E] countdown-val-accent tracking-widest mt-2 uppercase">MINUTES</div>
            </div>

            <div className="glass-card p-4 sm:p-8 rounded-3xl border border-[#D4AF37]/40 shadow-2xl lusion-hover-tilt">
              <div className="text-4xl sm:text-6xl lg:text-7xl font-mono font-extrabold text-[#E8A53E] countdown-val-accent animate-pulse">
                {countdown.seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#E8A53E] countdown-val-accent tracking-widest mt-2 uppercase">SECONDS</div>
            </div>
          </div>

          {/* Live Summit CTA buttons next to the countdown */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => onNavigate('summit')}
              className="px-6 py-3.5 rounded-full shimmer-btn text-[#050811] text-sm font-bold shadow-[0_6px_25px_rgba(232,165,62,0.35)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Explore the Summit Live</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('summit')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#E8A53E] hover:text-white transition-colors bg-[#050811] px-5 py-3 rounded-full border border-[#D4AF37]/30 shadow-lg"
            >
              <span>Follow our first live partnership in real time</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* OFFERINGS PREVIEW SECTION (PDF Page 2 & 3 Specification) */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-[#E8A53E]/20 text-[#E8A53E] text-xs font-bold uppercase tracking-wider">
            OFFERINGS PREVIEW
          </span>
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-white">
            End-to-End Infrastructure Coverage
          </h2>
          <p className="text-sm text-[#D3C5E5]">
            Everything physical, academic, and operational needed for a flawless event.
          </p>
        </div>

        {/* 6 OFFERINGS FROM PDF PAGE 2 & 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'EXECUTIVE BOARD',
              desc: 'Handpicked chairs, judges, rapporteurs, quizmasters, or emcee depending on event type.',
              icon: Award,
            },
            {
              title: 'VENUE SOURCING & LOGISTICS',
              desc: 'Finding and booking the space, seating arrangements, AV/sound setup, signage & aesthetics, basically everything physical that needs to be in place on the day.',
              icon: Building,
            },
            {
              title: 'TRAINING SESSIONS',
              desc: 'Pre-event prep sessions, public speaking, research methodology, debate strategy, or whatever skill the specific event demands.',
              icon: BookOpen,
            },
            {
              title: 'MARKETING & PARTICIPANT ACQUISITION',
              desc: 'Filling seats through social media promotion, campus outreach, registration management.',
              icon: Globe,
            },
            {
              title: 'EVENT DAY EXECUTION & COORDINATION',
              desc: 'Running the actual day-of operations, timing, coordination between teams, handling last-minute issues.',
              icon: Shield,
            },
            {
              title: 'NETWORK AND EXPOSURE ACCESS',
              desc: 'Connecting the organisation/school into the growing circuit, other schools, organisations, students, and future collaboration opportunities.',
              icon: Trophy,
            },
          ].map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-3xl space-y-4 flex flex-col justify-between lusion-hover-tilt border border-[#D4AF37]/30"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#050811] border border-[#D4AF37]/40 flex items-center justify-center text-[#E8A53E]">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-playfair font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#cecece] leading-relaxed font-inter">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D4AF37]/20">
                  <button
                    onClick={() => onNavigate('offerings')}
                    className="text-xs font-bold text-[#E8A53E] hover:underline flex items-center gap-1"
                  >
                    <span>View Offering Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOUNDER / TEAM CREDIBILITY STRIP (PDF Page 3 Specification) */}
      <section className="py-14 bg-[#0B1120] border-y border-[#D4AF37]/30 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E8A53E]">
              Founder & Secretariat Credibility Strip
            </span>
            <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-white">
              Led by Jammu’s Most Experienced Debate Directors
            </h3>
            <p className="text-xs sm:text-sm text-[#D3C5E5] max-w-xl">
              25+ certified chairs, 100% parliamentary compliance, and 12+ institutional summits executed seamlessly.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="glass-card px-5 py-3 rounded-2xl border border-[#D4AF37]/30 text-center">
              <div className="text-2xl font-bold text-[#E8A53E]">25+</div>
              <div className="text-[10px] text-[#B8A9C9] uppercase">Certified EB Members</div>
            </div>
            <div className="glass-card px-5 py-3 rounded-2xl border border-[#D4AF37]/30 text-center">
              <div className="text-2xl font-bold text-[#E8A53E]">100%</div>
              <div className="text-[10px] text-[#B8A9C9] uppercase">ROP Compliance</div>
            </div>
            <div className="glass-card px-5 py-3 rounded-2xl border border-[#D4AF37]/30 text-center">
              <div className="text-2xl font-bold text-[#E8A53E]">₹0</div>
              <div className="text-[10px] text-[#B8A9C9] uppercase">Risk Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG / INSIGHT TEASER ("From our blog" as specified in PDF Page 3) */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E8A53E]">
              From our blog
            </span>
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-white mt-1">
              Latest Insights & Event Guides
            </h2>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="text-xs font-bold text-[#E8A53E] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Articles</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <div
              key={post.id}
              onClick={() => onNavigate('blog')}
              className="glass-card rounded-3xl overflow-hidden cursor-pointer lusion-hover-tilt border border-[#D4AF37]/30 flex flex-col justify-between"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#E8A53E] uppercase tracking-wider">
                    {post.category} • {post.readTime}
                  </span>
                  <h3 className="text-lg font-playfair font-bold text-white hover:text-[#E8A53E] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#cecece] line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs text-[#B8A9C9]">
                  <span>{post.date}</span>
                  <span className="text-[#E8A53E] font-bold">Read →</span>
                </div>
              </div>
            </div>
          ))}
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
