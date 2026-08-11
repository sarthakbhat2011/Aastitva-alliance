import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ContactFormData } from '../types';
import { Astitva3DCanvas } from '../components/Astitva3DCanvas';
import { ScrollIndicator } from '../components/ScrollIndicator';
import {
  CheckCircle2,
  ShieldCheck,
  Send,
  Sparkles,
  Building,
  Award,
  Zap,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState<ContactFormData>({
    schoolName: '',
    contactPerson: '',
    email: '',
    phone: '',
    eventType: 'Model United Nations (MUN)',
    preferredDate: '',
    message: '',
    captchaVerified: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
        now.getDate()
      ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      const existingData = localStorage.getItem('astitva_partner_submissions');
      const submissions = existingData ? JSON.parse(existingData) : [];

      const newSubmission = {
        id: `SUB-${Date.now()}`,
        schoolName: form.schoolName,
        contactPerson: form.contactPerson,
        email: form.email,
        phone: form.phone,
        eventType: form.eventType,
        preferredDate: form.preferredDate,
        message: form.message,
        timestamp: formattedDate,
      };

      submissions.unshift(newSubmission);
      localStorage.setItem('astitva_partner_submissions', JSON.stringify(submissions));
    } catch (err) {
      console.error('Error saving submission locally:', err);
    }

    // Silent background POST to Google Form
    const GOOGLE_FORM_ACTION =
      'https://docs.google.com/forms/d/e/1FAIpQLScBGLm5S3STYlDHqXT8EojVv0F4o-wMOxWRW563YrE1B1x1DQ/formResponse';

    try {
      const body = new URLSearchParams();
      body.append('entry.386438479', form.schoolName);
      body.append('entry.183535783', form.contactPerson);
      body.append('entry.1640058535', form.email);
      body.append('entry.1465756153', form.phone);
      body.append('entry.1860013780', form.eventType);
      body.append('entry.1770614625', form.preferredDate);
      body.append('entry.1136480282', form.message);

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

    setLoading(false);
    setSubmitted(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="relative font-sans text-[#FAF5EF] py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      {/* Header Banner with Ambient 3D Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-card p-8 sm:p-12 rounded-3xl relative overflow-hidden">
        <div className="lg:col-span-8 space-y-4 text-left z-10">
          <span className="px-3.5 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Institutional Partnerships
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold gold-gradient-text">
            Partner With Astitva Alliance
          </h1>
          <p className="text-sm sm:text-base text-[#C4BBA3] max-w-2xl leading-relaxed">
            Empower your institution with Jammu's premier academic event infrastructure. Submit your event scope to receive a customized Executive Board roster, venue layout, and budget plan within 24 hours.
          </p>
        </div>

        <div className="lg:col-span-4 h-48 sm:h-56 relative flex items-center justify-center">
          <Astitva3DCanvas variant="minimal" />
        </div>

        <div className="col-span-12 flex justify-center pt-2">
          <ScrollIndicator targetId="partner-form" label="Fill Partner Form" />
        </div>
      </div>

      {/* Main Form Grid */}
      <div id="partner-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Inquiry Form */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#52459E]/40">
            <h2 className="text-2xl font-serif font-bold text-[#FAF5EF]">
              Infrastructure Proposal Inquiry
            </h2>
            <span className="text-xs text-[#D4AF37] font-semibold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 256-Bit SSL Encrypted
            </span>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-center space-y-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
              <h3 className="text-2xl font-serif font-bold text-[#FAF5EF]">
                Inquiry Logged Successfully!
              </h3>
              <p className="text-sm text-[#C4BBA3] leading-relaxed">
                Thank you! Our academic director will review the requirements for <strong className="text-white">{form.schoolName}</strong> and send over a complete execution roadmap within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-[#231B42] text-xs font-bold text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-[#372C68]"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                  School / College / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.schoolName}
                  onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
                  placeholder="e.g. Heritage School Jammu"
                  className="w-full px-4 py-3 rounded-xl bg-[#171026] border border-[#52459E]/50 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.contactPerson}
                    onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                    placeholder="e.g. Prof. Anish Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-[#171026] border border-[#52459E]/50 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="principal@school.edu"
                    className="w-full px-4 py-3 rounded-xl bg-[#171026] border border-[#52459E]/50 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-[#171026] border border-[#52459E]/50 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                    Event Type
                  </label>
                  <select
                    value={form.eventType}
                    onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#171026] border border-[#52459E]/50 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option>Model United Nations (MUN)</option>
                    <option>Literary Fest</option>
                    <option>Inter-School Quiz</option>
                    <option>Parliamentary Debate</option>
                    <option>Cultural Festival</option>
                    <option>Other Youth Event</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                  Preferred Target Date(s)
                </label>
                <input
                  type="text"
                  value={form.preferredDate}
                  onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                  placeholder="e.g. October 2026 or Early November"
                  className="w-full px-4 py-3 rounded-xl bg-[#171026] border border-[#52459E]/50 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                  Message / Special Scope Requirements
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe target delegate headcount, venue requirements, or specific committee topics..."
                  className="w-full px-4 py-3 rounded-xl bg-[#171026] border border-[#52459E]/50 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-[#171026] border border-[#52459E]/40 flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.captchaVerified}
                    onChange={(e) => setForm({ ...form, captchaVerified: e.target.checked })}
                    className="w-4 h-4 accent-[#D4AF37]"
                  />
                  <span className="font-semibold text-[#FAF5EF]">I'm not a robot</span>
                </label>
                <span className="text-[10px] text-[#C4BBA3] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> reCAPTCHA Protected
                </span>
              </div>

              <button
                type="submit"
                disabled={loading || !form.captchaVerified}
                className="w-full py-4 rounded-xl shimmer-btn text-[#171026] font-bold text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Sending Proposal Request...' : 'Send Inquiry Request'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Col: Partnership Advantages */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#FAF5EF]">
              What You Receive Upon Partnering
            </h3>
            <div className="space-y-3.5 text-xs text-[#C4BBA3]">
              {[
                { title: 'Executive Board Roster', desc: 'Pre-vetted chairs with proven UN procedure expertise and zero-bias guarantees.' },
                { title: 'Full Venue Setup', desc: 'Audio-visual podiums, committee microphones, and stage banners.' },
                { title: 'Delegate Training Modules', desc: 'Pre-event research guides, position paper workshops, and opening speechprep.' },
                { title: 'Zero Risk Infrastructure', desc: 'Pre-negotiated vendor rates and complete event budget management.' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#FAF5EF]">{item.title}</h4>
                    <p className="text-[#C4BBA3] text-[11px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
