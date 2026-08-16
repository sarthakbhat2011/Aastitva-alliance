import React, { useState } from 'react';
import { Send, ShieldCheck, Terminal, CheckCircle2, Lock, Sparkles, MessageSquare } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const SecureTransmissionTerminal: React.FC = () => {
  const [schoolName, setSchoolName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isEncrypting, setIsEncrypting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playTap();
    setIsEncrypting(true);

    setTimeout(() => {
      setIsEncrypting(false);
      setSubmitted(true);
      sounds.playChime();
    }, 1200);
  };

  return (
    <div className="w-full rounded-3xl bg-gradient-to-b from-[#0B1224]/95 via-[#070A14]/95 to-[#050811]/95 border-2 border-[#D4AF37]/50 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden font-jakarta text-left space-y-0 relative">
      {/* Windows XP Futuristic Transmission Titlebar */}
      <div className="bg-gradient-to-r from-[#16203B] via-[#0D1427] to-[#16203B] px-4 py-2.5 border-b border-[#D4AF37]/35 flex items-center justify-between select-none font-mono">
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
            <Lock className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-[#FAF5EF] tracking-wider">
            Aastitva_Secure_Transmission.exe [256-Bit SSL Encrypted]
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-300/40" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-300/40" />
          <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-300/40" />
        </div>
      </div>

      {/* Terminal Form Body */}
      <div className="p-6 sm:p-10 space-y-6">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 font-jakarta text-xs">
            <div className="flex items-center justify-between gap-4 flex-wrap pb-2 border-b border-[#D4AF37]/20">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-wider block">
                  Founder Personal Transmission Gateway
                </span>
                <p className="text-xs text-[#C4BBA3]">
                  Direct, un-brokered partnership inquiry sent straight to the founder.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#16203B] text-emerald-400 font-mono text-[10px] border border-emerald-500/30">
                ● 256-Bit SSL Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#FAF5EF] mb-1 font-semibold">School / Institution Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. KC Public School / DPS Jammu"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070A14] border border-[#D4AF37]/30 text-[#FAF5EF] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#FAF5EF] mb-1 font-semibold">Contact Person / Designation *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Principal / Faculty Advisor / Secretariat Head"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070A14] border border-[#D4AF37]/30 text-[#FAF5EF] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#FAF5EF] mb-1 font-semibold">Official Email Address *</label>
              <input
                type="email"
                required
                placeholder="advisor@institution.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#070A14] border border-[#D4AF37]/30 text-[#FAF5EF] focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#FAF5EF] mb-1 font-semibold">Event Vision or Inquiry Scope *</label>
              <textarea
                required
                rows={3}
                placeholder="Describe your intended summit dates, expected delegate count, or required modular services..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#070A14] border border-[#D4AF37]/30 text-[#FAF5EF] focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isEncrypting}
              className="w-full py-3.5 rounded-xl shimmer-btn text-[#070A14] font-bold text-sm shadow-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all mt-3"
            >
              <Send className="w-4 h-4" />
              <span>{isEncrypting ? 'Encrypting & Transmitting...' : 'Transmit Partnership Packet'}</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4 animate-page-enter">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-cormorant font-bold text-[#FAF5EF]">
              Transmission Acknowledged
            </h3>
            <p className="text-xs sm:text-sm text-[#C4BBA3] max-w-md mx-auto">
              Thank you, <strong>{contactPerson}</strong> ({schoolName}). Your packet has been verified and securely routed to our founder. You will receive an initial response within 24 hours.
            </p>
            <button
              onClick={() => {
                sounds.playTap();
                setSubmitted(false);
                setSchoolName('');
                setContactPerson('');
                setEmail('');
                setMessage('');
              }}
              className="px-6 py-2.5 rounded-xl bg-[#16203B] text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-mono font-bold hover:bg-[#D4AF37] hover:text-[#070A14] transition-all"
            >
              Transmit Another Inquiry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
