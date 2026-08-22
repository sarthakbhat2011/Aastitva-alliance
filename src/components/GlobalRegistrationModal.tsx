import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, Sparkles, ShieldCheck, Send, Globe, Award, Calendar, MapPin } from 'lucide-react';
import { COMMITTEES, INITIAL_SUMMIT_CONFIG } from '../data';
import { RegistrationFormData } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  preselectedCommittee?: string;
}

export const GlobalRegistrationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  preselectedCommittee,
}) => {
  const [form, setForm] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    grade: 'High School (11-12)',
    firstChoiceCommittee: preselectedCommittee || 'CCC - Continuous Crisis Committee',
    firstChoicePortfolio: '',
    secondChoiceCommittee: 'UNHRC - United Nations Human Rights Council',
    secondChoicePortfolio: '',
    priorExperience: '1-3 MUNs',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync preselected committee if changed
  React.useEffect(() => {
    if (preselectedCommittee) {
      setForm((prev) => ({ ...prev, firstChoiceCommittee: preselectedCommittee }));
    }
  }, [preselectedCommittee]);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const GOOGLE_FORM_ACTION =
    'https://docs.google.com/forms/d/e/1FAIpQLScBGLm5S3STYlDHqXT8EojVv0F4o-wMOxWRW563YrE1B1x1DQ/formResponse';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
      }).catch((err) => console.log('Silent Google Form submit:', err));
    } catch (err) {
      console.log('Background submit:', err);
    }

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#FFF5DC', '#3B82F6', '#10B981'],
      });
    }, 600);
  };

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999999] bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-page-enter"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-[94vw] sm:max-w-2xl w-full rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0D1427] via-[#070A14] to-[#0D1427] border-2 border-[#D4AF37]/60 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden my-auto font-jakarta text-left"
      >
        {/* Futuristic Top Glowing HUD Bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#FFF5DC] to-[#52459E] shadow-[0_0_15px_rgba(212,175,55,0.8)]" />

        {/* Modal Header */}
        <div className="p-4 sm:p-8 pb-3 sm:pb-4 flex items-start justify-between gap-3 sm:gap-4 border-b border-[#D4AF37]/20 relative">
          <div className="space-y-1 sm:space-y-1.5">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="px-2.5 sm:px-3 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Summit Portal 2026</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                Registration Active
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-cormorant font-bold gold-gradient-text">
              Reserve Delegate Seat
            </h2>
            <p className="text-[11px] sm:text-xs text-[#C4BBA3]">
              Official registration for <strong>{INITIAL_SUMMIT_CONFIG.name}</strong> • Academic Event Management + Network Organisation
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full bg-[#16203B] text-[#C4BBA3] hover:text-rose-400 hover:bg-rose-950/40 border border-[#D4AF37]/30 transition-all shadow-md min-touch shrink-0"
            aria-label="Close registration portal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-8 pt-4 sm:pt-6 max-h-[78vh] overflow-y-auto custom-scrollbar">
          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border-2 border-emerald-400/50 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-cormorant font-bold text-[#FAF5EF]">
                  Application Transmitted!
                </h3>
                <p className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                  Registration ID Confirmed
                </p>
              </div>
              <p className="text-xs sm:text-sm text-[#C4BBA3] max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-[#FAF5EF]">{form.fullName}</strong>. Your delegate application for <strong className="text-[#D4AF37]">{form.firstChoiceCommittee}</strong> has been secured directly into the Secretariat roster.
              </p>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#16203B] border border-[#D4AF37]/40 text-[#FAF5EF] text-xs font-bold hover:border-[#D4AF37]"
                >
                  Register Another Delegate
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl shimmer-btn text-[#070A14] text-xs font-bold shadow-lg"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-[#D4AF37] mb-1.5">
                  Full Name (as on Official Delegate Certificate) *
                </label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="e.g. Aryan Sharma"
                  className="w-full px-4 py-3 rounded-xl bg-[#070A14] border border-[#D4AF37]/35 text-[#FAF5EF] placeholder-[#C4BBA3]/40 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#D4AF37] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="delegate@institution.edu"
                    className="w-full px-4 py-3 rounded-xl bg-[#070A14] border border-[#D4AF37]/35 text-[#FAF5EF] placeholder-[#C4BBA3]/40 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#D4AF37] mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-[#070A14] border border-[#D4AF37]/35 text-[#FAF5EF] placeholder-[#C4BBA3]/40 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#D4AF37] mb-1.5">
                    School / University *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.institution}
                    onChange={(e) => setForm({ ...form, institution: e.target.value })}
                    placeholder="e.g. KC Public School, Jammu"
                    className="w-full px-4 py-3 rounded-xl bg-[#070A14] border border-[#D4AF37]/35 text-[#FAF5EF] placeholder-[#C4BBA3]/40 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#D4AF37] mb-1.5">
                    Academic Year / Grade
                  </label>
                  <select
                    value={form.grade}
                    onChange={(e) => setForm({ ...form, grade: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#070A14] border border-[#D4AF37]/35 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option>Middle School (8-10)</option>
                    <option>High School (11-12)</option>
                    <option>Undergraduate University</option>
                  </select>
                </div>
              </div>

              {/* Committee Preferences */}
              <div className="p-4 rounded-2xl bg-[#16203B]/60 border border-[#D4AF37]/30 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#D4AF37] mb-1.5">
                      1st Committee Choice *
                    </label>
                    <select
                      value={form.firstChoiceCommittee}
                      onChange={(e) => setForm({ ...form, firstChoiceCommittee: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A14] border border-[#D4AF37]/35 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                    >
                      {COMMITTEES.map((c) => (
                        <option key={c.id} value={`${c.code} - ${c.name}`}>
                          {c.code} — {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#D4AF37] mb-1.5">
                      1st Portfolio / Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.firstChoicePortfolio}
                      onChange={(e) => setForm({ ...form, firstChoicePortfolio: e.target.value })}
                      placeholder="e.g. Delegate of India / Cabinet Minister"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A14] border border-[#D4AF37]/35 text-[#FAF5EF] placeholder-[#C4BBA3]/40 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#D4AF37] mb-1.5">
                      2nd Committee Choice *
                    </label>
                    <select
                      value={form.secondChoiceCommittee}
                      onChange={(e) => setForm({ ...form, secondChoiceCommittee: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A14] border border-[#D4AF37]/35 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                    >
                      {COMMITTEES.map((c) => (
                        <option key={c.id} value={`${c.code} - ${c.name}`}>
                          {c.code} — {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#D4AF37] mb-1.5">
                      2nd Portfolio / Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.secondChoicePortfolio}
                      onChange={(e) => setForm({ ...form, secondChoicePortfolio: e.target.value })}
                      placeholder="e.g. Delegate of United Kingdom"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A14] border border-[#D4AF37]/35 text-[#FAF5EF] placeholder-[#C4BBA3]/40 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#D4AF37] mb-1.5">
                  Prior Model UN / Debate Experience
                </label>
                <select
                  value={form.priorExperience}
                  onChange={(e) => setForm({ ...form, priorExperience: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#070A14] border border-[#D4AF37]/35 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option>Novice / First-Time Delegate (Delegate Guidebook Included)</option>
                  <option>1 - 3 Conferences</option>
                  <option>4 - 8 Conferences (Intermediate)</option>
                  <option>9+ Veteran Delegate</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl shimmer-btn text-[#070A14] font-extrabold text-sm shadow-[0_10px_30px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#070A14] border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Application...</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      <span>Submit Application & Confirm Seat</span>
                    </span>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-[#C4BBA3]/70 text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit SSL Encrypted Submission • Instant Secretariat Notification</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
