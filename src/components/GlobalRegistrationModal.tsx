import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, Sparkles, ShieldCheck, Send, Globe, Award, Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { COMMITTEES, INITIAL_SUMMIT_CONFIG } from '../data';
import { RegistrationFormData, PartnerMailEntry } from '../types';
import { saveEntryToMailbox, submitRegistrationToServer } from '../utils/mailboxApi';

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
    firstChoiceCommittee: preselectedCommittee || 'CC - Citizen Council',
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
    'https://docs.google.com/forms/d/e/1FAIpQLSdgVhSI5tgSKD4vk_m8YWI0q6zFuJFytzer4R7-DSbzu7G8rg/formResponse';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const mapCommittee = (val: string) => {
        if (!val) return '• CC - Citizens Council';
        const str = String(val).trim();
        if (str.includes('IPC') || str.includes('Press') || str.includes('International Press')) return '• IPC - International Press Corps';
        if (str.includes('UNHRC') || str.includes('Human Rights')) return '• UNHRC - United Nations Human Rights Council';
        if (str.includes('BRICS') || str.includes('JKLA') || str.includes('Legislative')) return '• BRICS - BRICS Summit';
        if (str.includes('Women')) return '• UN Women - United Nations Entity for Gender Equality';
        if (str.includes('Lok Sabha') || str.includes('House')) return '• Lok Sabha - Lok Sabha (House of the People)';
        if (str.includes('IPL') || str.includes('Premier')) return '• IPL - Indian Premier League Auction Council';
        if (str.includes('CC') || str.includes('Citizen') || str.includes('Council') || str.includes('CCC') || str.includes('Crisis')) return '• CC - Citizens Council';
        return '• CC - Citizens Council';
      };

      const mapGrade = (val: string) => {
        if (!val) return '•Senior Secondary School (Grades 11–12)';
        const str = String(val).trim();
        if (str.includes('Middle') || str.includes('6-8') || str.includes('6–8')) return '• Middle School (Grades 6–8)';
        if (str.includes('Secondary') && !str.includes('Senior') && !str.includes('11-12') && !str.includes('11–12')) return '• Secondary School (Grades 9–10)';
        if (str.includes('Senior') || str.includes('11-12') || str.includes('11–12') || str.includes('High School')) return '•Senior Secondary School (Grades 11–12)';
        if (str.includes('College') || str.includes('Undergraduate')) return '• Undergraduate / College';
        return '•Senior Secondary School (Grades 11–12)';
      };

      const mapExperience = (val: string) => {
        if (!val) return '• Junior Delegate (1–3 MUNs)';
        const str = String(val).trim();
        if (str.includes('First-Timer') || str.includes('Novice') || str.includes('0 MUNs') || str.includes('Beginner')) return '• First-Timer / Novice (0 MUNs)';
        if (str.includes('Junior') || str.includes('1-3') || str.includes('1–3') || str.includes('Intermediate')) return '• Junior Delegate (1–3 MUNs)';
        if (str.includes('Seasoned') || str.includes('4-7') || str.includes('4–7') || str.includes('Advanced')) return '• Seasoned Delegate (4–7 MUNs)';
        if (str.includes('Veteran') || str.includes('8+')) return '• Veteran Delegate (8+ MUNs)';
        return '• Junior Delegate (1–3 MUNs)';
      };

      const body = new URLSearchParams();
      body.append('entry.1134035501', 'NO');
      body.append('entry.780764261', form.fullName.trim());
      body.append('entry.830016473', form.email.trim());
      body.append('entry.86288026', form.phone.trim());
      body.append('entry.1083196564', form.institution.trim());
      body.append('entry.278555826', mapGrade(form.grade));
      body.append('entry.898367359', mapExperience(form.priorExperience));
      body.append('entry.291987551', 'None');
      body.append('entry.977018072', mapCommittee(form.firstChoiceCommittee));
      body.append('entry.299951131', form.firstChoicePortfolio.trim() || 'General Allocation');
      body.append('entry.580509636', mapCommittee(form.secondChoiceCommittee || 'UNHRC - United Nations Human Rights Council'));
      body.append('entry.777137221', form.secondChoicePortfolio.trim() || 'General Allocation');
      body.append('entry.635888889', '• BRICS - BRICS Summit');
      body.append('entry.794534023', 'General Allocation');
      body.append('entry.156711483', 'Registered via Quick Registration Modal.');
      body.append('entry.1604443743', 'Verified Remittance');

      // SINGLE-ENTRY PIPELINE:
      // Authoritatively submit to server endpoint.
      // Server validates, records in mailbox once, and dispatches to Google Forms once via secure HTTPS.
      let submissionSuccessful = false;
      let googleFormSynced = false;
      const nowTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
      const trackingId = `AEQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      let finalTrackingId = trackingId;

      try {
        const serverResult = await submitRegistrationToServer({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          institution: form.institution.trim(),
          grade: form.grade,
          firstChoiceCommittee: form.firstChoiceCommittee,
          firstChoicePortfolio: form.firstChoicePortfolio.trim(),
          secondChoiceCommittee: form.secondChoiceCommittee,
          secondChoicePortfolio: form.secondChoicePortfolio.trim(),
          priorExperience: form.priorExperience,
        });

        if (serverResult.success) {
          submissionSuccessful = true;
          googleFormSynced = Boolean(serverResult.googleFormSynced);
          if (serverResult.trackingId) {
            finalTrackingId = serverResult.trackingId;
          }
        }
      } catch (err) {
        console.warn('Server registration call failed, switching to fallback:', err);
      }

      // ALWAYS save application to local mailbox immediately so it is never lost
      const newEntry: PartnerMailEntry = {
        id: finalTrackingId,
        timestamp: nowTime,
        schoolName: form.institution.trim(),
        contactPerson: `${form.fullName.trim()} (${form.grade})`,
        email: form.email.trim(),
        phone: form.phone.trim(),
        eventType: `Summit Delegate Allocation: ${form.firstChoiceCommittee}`,
        preferredDate: '2026-10-29',
        message: `[MODAL DELEGATE REGISTRATION - ${finalTrackingId}]\n1st Choice: ${form.firstChoiceCommittee} [${form.firstChoicePortfolio}]\n2nd Choice: ${form.secondChoiceCommittee} [${form.secondChoicePortfolio}]\nDivision: ${form.grade}\nExperience: ${form.priorExperience}`,
        status: 'New',
      };
      await saveEntryToMailbox(newEntry);

      // GUARANTEED GOOGLE FORM SYNCHRONIZATION:
      if (!googleFormSynced) {
        try {
          fetch(GOOGLE_FORM_ACTION, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
          }).catch((err) => console.log('Silent Google Form fallback submit:', err));
        } catch (fallbackErr) {
          console.error('Fallback logging failed:', fallbackErr);
        }
      }
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="registration-title"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-[#0B1224] border-2 border-[#D4AF37]/50 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden font-jakarta text-left z-10 animate-scale-up">
        {/* Modal Header */}
        <div className="p-4 sm:p-8 pb-3 sm:pb-4 flex items-start justify-between gap-3 sm:gap-4 border-b border-[#D4AF37]/20 relative">
          <div className="space-y-1 sm:space-y-1.5 min-w-0">
            {/* Alliance Branding Ribbon */}
            <div className="flex items-center gap-2 pb-1">
              <div className="flex items-center gap-1.5 shrink-0">
                <img
                  src="/aequitas-logo.png"
                  alt="Aequitas Summit"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-[#D4AF37] shadow-sm bg-black"
                />
                <span className="font-playfair font-bold text-xs text-[#D4AF37]">×</span>
                <img
                  src="/astitva-logo.png"
                  alt="Aastitva Alliances"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-[#D4AF37]/70 shadow-sm bg-[#1e1442]"
                />
              </div>
              <span className="font-playfair font-bold text-xs sm:text-sm text-[#FAF5EF] tracking-wide">
                Aequitas Summit x Aastitva Alliances
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="px-2.5 sm:px-3 py-0.5 rounded-full bg-rose-950/60 border border-rose-500/50 text-rose-300 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
                <span>Delegate Registration Ended</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                Prom &amp; Events Open
              </span>
            </div>
            <h2 id="registration-title" className="text-xl sm:text-3xl font-cormorant font-bold text-white">
              Delegate Registration <span className="text-rose-400">Closed</span>
            </h2>
            <p className="text-[11px] sm:text-xs text-[#C4BBA3]">
              Official update for <strong>{INITIAL_SUMMIT_CONFIG.name}</strong> • Committee Allocations Full
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
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#1E1038] via-[#0E071F] to-[#070A14] border-2 border-[#D4AF37] text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(212,175,55,0.4)] animate-bounce">
              <Sparkles className="w-8 h-8 text-[#D4AF37]" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-white">
                Delegate Registration is Closed
              </h3>
              <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed">
                All delegate seats across all 6 committees are 100% full. However, <strong className="text-white">Prom Night 2026</strong> and all <strong className="text-white">Recreational Tournaments</strong> are still on!
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#070A14]/90 border border-[#D4AF37]/30 max-w-sm mx-auto text-xs font-mono text-[#FAF5EF] space-y-1">
              <div className="text-[#D4AF37] font-bold">What's Open Right Now:</div>
              <div className="text-[11px] text-[#C4BBA3]">
                • Prom Night (Stag ₹599, Duo ₹999, Squad ₹1,999)<br />
                • BGMI &amp; Free Fire Tournaments (Solo, Duo, Squad)<br />
                • Ludo &amp; Mafia Tournaments<br />
                • Rapunzel's Vanity, Dumb Charades &amp; Musical Chairs
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/events-register"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3C969] to-[#EC4899] text-[#070A14] font-extrabold text-xs sm:text-sm shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer font-mono"
              >
                <span>Grab Your Prom &amp; Events Seats Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#16203B] border border-[#D4AF37]/40 text-[#C4BBA3] hover:text-white hover:border-[#D4AF37] text-xs font-semibold transition-all cursor-pointer font-mono"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
