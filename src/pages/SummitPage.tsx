import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Page, SummitConfig, CountdownTime, RegistrationFormData } from '../types';
import { COMMITTEES } from '../data';
import { ScrollIndicator } from '../components/ScrollIndicator';
import { Astitva3DCanvas } from '../components/Astitva3DCanvas';
import {
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  Users,
  Award,
  Play,
  X,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface Props {
  summitConfig: SummitConfig;
  countdown: CountdownTime;
  onNavigate?: (page: Page) => void;
}

export const SummitPage: React.FC<Props> = ({ summitConfig, countdown, onNavigate = () => {} }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'register'>('details');

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
  const [submitted, setSubmitted] = useState(false);

  const GOOGLE_FORM_ACTION =
    'https://docs.google.com/forms/d/e/1FAIpQLScBGLm5S3STYlDHqXT8EojVv0F4o-wMOxWRW563YrE1B1x1DQ/formResponse';

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 120,
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

  return (
    <div className="min-h-screen font-sans pb-20">

      {/* 1. HERO - NETFLIX "NOW PLAYING" BRANDING */}
      <section className="relative min-h-[65vh] flex items-end pb-12 px-4 sm:px-8 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600"
            alt="Aequitas Summit Backdrop"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070A14] via-[#070A14]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-left">
            {/* Top Banner Tag */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded bg-rose-600 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 animate-pulse shadow-md">
                <Play className="w-3.5 h-3.5 fill-current" /> NOW PLAYING
              </span>
              <span className="px-3 py-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-semibold text-xs uppercase tracking-wider backdrop-blur-md">
                Official Partnered Summit
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold gold-gradient-text animate-text-reveal">
              {summitConfig.name}
            </h1>

            <p className="text-base sm:text-lg text-var-text-secondary max-w-2xl font-light leading-relaxed animate-text-reveal animate-delay-1">
              {summitConfig.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-[#C4BBA3] pt-2">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D4AF37]" /> {summitConfig.date}
              </span>
              <span className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Users className="w-4 h-4" /> {summitConfig.registeredCount} / {summitConfig.totalSeats} Seats Filled
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => {
                  setActiveTab('register');
                  document.getElementById('summit-tabs')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-xl shimmer-btn text-[#070A14] font-extrabold text-sm shadow-2xl hover:brightness-110 active:scale-95 transition-all"
              >
                Register Delegate Seat
              </button>

              <a
                href="https://aquitas-aastitva11.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/50 text-rose-100 font-bold text-sm flex items-center gap-2 shadow-lg transition-all"
              >
                <ExternalLink className="w-4 h-4 text-rose-300" />
                <span>Visit Live Aequitas Website ↗</span>
              </a>
            </div>
          </div>

          {/* 3D Planet Globe Orbiting Emblem */}
          <div className="lg:col-span-5 w-full h-72 sm:h-96 min-h-[260px] relative z-20 flex items-center justify-center pointer-events-none">
            <Astitva3DCanvas variant="summit" />
          </div>

          <div className="lg:col-span-12 flex justify-center pt-4">
            <ScrollIndicator targetId="summit-clock-banner" label="Scroll for Conference Clock" />
          </div>
        </div>
      </section>

      {/* 2. FULL-WIDTH LIVE COUNTDOWN BANNER (GOLD BACKGROUND) */}
      <section id="summit-clock-banner" className="bg-gradient-to-r from-[#D4AF37] via-[#F9E2C8] to-[#C59B67] text-[#070A14] py-6 px-4 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <span className="text-xs uppercase tracking-widest font-extrabold opacity-85 block">
              Live Conference Clock
            </span>
            <h3 className="text-lg font-serif font-bold">
              Countdown to Inaugural Session
            </h3>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 font-mono font-bold text-xl sm:text-3xl">
            <div className="bg-[#070A14] text-[#D4AF37] px-3 py-1.5 rounded-xl">
              <span>{countdown.days}d</span>
            </div>
            <span>:</span>
            <div className="bg-[#070A14] text-[#FAF5EF] px-3 py-1.5 rounded-xl">
              <span>{countdown.hours.toString().padStart(2, '0')}h</span>
            </div>
            <span>:</span>
            <div className="bg-[#070A14] text-[#FAF5EF] px-3 py-1.5 rounded-xl">
              <span>{countdown.minutes.toString().padStart(2, '0')}m</span>
            </div>
            <span>:</span>
            <div className="bg-[#070A14] text-emerald-400 px-3 py-1.5 rounded-xl">
              <span>{countdown.seconds.toString().padStart(2, '0')}s</span>
            </div>
          </div>

          <span className="text-xs font-bold uppercase tracking-wider bg-[#070A14] text-[#FAF5EF] px-3 py-1.5 rounded-lg border border-[#D4AF37]/30">
            Powered by Aastitva Alliance
          </span>
        </div>
      </section>

      {/* TABS NAVIGATION */}
      <div id="summit-tabs" className="max-w-6xl mx-auto px-4 mt-12">
        <div className="flex items-center gap-3 border-b border-[#243563]/40 pb-3">
          {[
            { id: 'details', label: 'Summit Overview & Committees' },
            { id: 'register', label: 'Delegate Registration' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#16203B] text-[#FAF5EF] border border-[#D4AF37]/45 shadow-lg font-bold'
                  : 'text-[#C4BBA3] hover:text-[#FAF5EF] hover:bg-[#0D1427]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* TAB 1: OVERVIEW & COMMITTEES */}
        {activeTab === 'details' && (
          <div className="space-y-12 animate-page-enter">
            {/* PARTNERSHIP BADGE */}
            <div className="glass-card rounded-3xl p-8 text-center space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                Institutional Co-Host Alliance
              </span>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
                <div className="text-lg font-serif font-bold text-[#FAF5EF] flex items-center gap-2">
                  <span className="text-2xl">🏛️</span> {summitConfig.partnerSchool}
                </div>
                <span className="text-xl text-[#D4AF37] font-bold">✦</span>
                <div className="text-lg font-serif font-bold text-[#FAF5EF] flex items-center gap-2">
                  <span className="text-2xl">⚡</span> Aastitva Alliance Infrastructure
                </div>
              </div>
              <p className="text-xs text-[#C4BBA3] max-w-xl mx-auto">
                Proudly partnered to deliver Jammu’s premier academic diplomacy conference with certified board chairs and full operational support.
              </p>
            </div>

            {/* COMMITTEES SHOWCASE */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <span className="px-3.5 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                  Featured Committees
                </span>
                <h2 className="text-3xl font-serif font-bold text-[#FAF5EF]">
                  High-Stakes Debate Agendas
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {COMMITTEES.map((committee) => (
                  <div key={committee.id} className="glass-card p-6 rounded-3xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-lg bg-[#16203B] text-[#D4AF37] font-mono font-bold text-xs border border-[#D4AF37]/30">
                        {committee.code}
                      </span>
                      <span className="text-xs text-[#C4BBA3] font-medium">
                        Seats: <strong className="text-white">{committee.seats} Delegates</strong>
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-[#FAF5EF]">
                      {committee.name}
                    </h3>

                    <div className="bg-[#070A14]/80 p-3.5 rounded-xl border border-[#243563]/40 text-xs space-y-1">
                      <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider">
                        Official Agenda:
                      </span>
                      <p className="text-white font-medium italic">"{committee.agenda}"</p>
                    </div>

                    <p className="text-xs text-[#C4BBA3] leading-relaxed">
                      {committee.description}
                    </p>

                    <button
                      onClick={() => setActiveTab('register')}
                      className="px-5 py-2.5 rounded-xl shimmer-btn text-[#070A14] text-xs font-bold shadow-md hover:brightness-110 flex items-center gap-1.5"
                    >
                      <span>Apply for {committee.code}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DELEGATE REGISTRATION FORM */}
        {activeTab === 'register' && (
          <div className="max-w-3xl mx-auto glass-card rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-page-enter">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                  Official Delegate Registration
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF5EF]">
                Register for {summitConfig.name}
              </h2>
              <p className="text-xs text-[#C4BBA3]">
                Securing delegate seat at {summitConfig.partnerSchool} — Silent background connection to Official Google Form
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-serif font-bold text-[#FAF5EF]">
                  Registration Confirmed!
                </h3>
                <p className="text-xs text-[#C4BBA3] max-w-md mx-auto">
                  Thank you, <span className="font-bold text-[#FAF5EF]">{form.fullName}</span>. Your delegate application for <span className="font-bold text-[#D4AF37]">{form.firstChoiceCommittee}</span> has been securely submitted to your Google Form account!
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl shimmer-btn text-[#070A14] text-xs font-bold shadow-lg hover:brightness-110"
                  >
                    Register Another Delegate
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                    Full Name (as on Certificate) *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#070A14] border border-[#243563]/50 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@school.edu"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070A14] border border-[#243563]/50 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070A14] border border-[#243563]/50 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                      School / Institution *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.institution}
                      onChange={(e) => setForm({ ...form, institution: e.target.value })}
                      placeholder="e.g. DPS Jammu"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070A14] border border-[#243563]/50 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                      Grade / Year
                    </label>
                    <select
                      value={form.grade}
                      onChange={(e) => setForm({ ...form, grade: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070A14] border border-[#243563]/50 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option>Middle School (8-10)</option>
                      <option>High School (11-12)</option>
                      <option>Undergraduate College</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                      1st Committee Preference *
                    </label>
                    <select
                      value={form.firstChoiceCommittee}
                      onChange={(e) => setForm({ ...form, firstChoiceCommittee: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070A14] border border-[#243563]/50 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                    >
                      {COMMITTEES.map((c) => (
                        <option key={c.id} value={`${c.code} - ${c.name}`}>
                          {c.code} - {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                      1st Portfolio Preference *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.firstChoicePortfolio}
                      onChange={(e) => setForm({ ...form, firstChoicePortfolio: e.target.value })}
                      placeholder="e.g. USA / Portfolio Preference 1"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070A14] border border-[#243563]/50 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                      2nd Committee Preference *
                    </label>
                    <select
                      value={form.secondChoiceCommittee}
                      onChange={(e) => setForm({ ...form, secondChoiceCommittee: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070A14] border border-[#243563]/50 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                    >
                      {COMMITTEES.map((c) => (
                        <option key={c.id} value={`${c.code} - ${c.name}`}>
                          {c.code} - {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                      2nd Portfolio Preference *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.secondChoicePortfolio}
                      onChange={(e) => setForm({ ...form, secondChoicePortfolio: e.target.value })}
                      placeholder="e.g. France / Portfolio Preference 2"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070A14] border border-[#243563]/50 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                    Prior MUN / Debate Experience
                  </label>
                  <select
                    value={form.priorExperience}
                    onChange={(e) => setForm({ ...form, priorExperience: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#070A14] border border-[#243563]/50 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option>First Time Delegate (Bootcamp Included)</option>
                    <option>1-3 MUNs</option>
                    <option>4-8 MUNs</option>
                    <option>9+ Veteran</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl shimmer-btn text-[#070A14] font-extrabold text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all mt-4"
                >
                  Submit Registration & Reserve Seat
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
