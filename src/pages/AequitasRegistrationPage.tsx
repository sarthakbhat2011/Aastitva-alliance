import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  User,
  Mail,
  Phone,
  School,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Send,
  Calendar,
  MapPin,
  Award,
  FileText,
  Check,
  AlertCircle,
  HelpCircle,
  Printer,
  RefreshCw,
  Lock,
  Volume2,
  VolumeX,
  Globe,
  Sliders,
  Flame,
  Radio,
  Clock,
  Layers,
  CheckCheck,
  Download,
} from 'lucide-react';
import { COMMITTEES, INITIAL_SUMMIT_CONFIG } from '../data';
import { sounds } from '../utils/soundEffects';
import {
  generateDelegatePassDataUrl,
  downloadDelegatePassPng,
  DelegatePassData,
} from '../utils/generateDelegatePass';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  grade: string;
  priorExperience: string;
  priorAccolades: string;
  statement: string;
  firstChoiceCommittee: string;
  firstChoicePortfolio: string;
  secondChoiceCommittee: string;
  secondChoicePortfolio: string;
  thirdChoiceCommittee: string;
  thirdChoicePortfolio: string;
  agreedToTerms: boolean;
}

const GRADE_OPTIONS = [
  { id: 'middle', label: 'Middle School (Grades 6–8)', desc: 'Junior diplomatic division' },
  { id: 'secondary', label: 'Secondary School (Grades 9–10)', desc: 'Intermediate debate division' },
  { id: 'senior', label: 'Senior Secondary / High School (Grades 11–12)', desc: 'Premier delegation division' },
  { id: 'college', label: 'Undergraduate / College', desc: 'Collegiate & open division' },
];

const EXPERIENCE_TIERS = [
  {
    id: 'novice',
    label: 'First-Timer / Novice (0 MUNs)',
    badge: 'Bootcamp Provided',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    desc: 'New to Model United Nations. Will receive dedicated procedural training and delegate starter dossier.',
    icon: Sparkles,
  },
  {
    id: 'junior',
    label: 'Junior Delegate (1–3 MUNs)',
    badge: 'Foundational',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    desc: 'Familiar with Rules of Procedure, moderated caucuses, and basic working paper drafting.',
    icon: Globe,
  },
  {
    id: 'seasoned',
    label: 'Seasoned Delegate (4–7 MUNs)',
    badge: 'Competitive Tier',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    desc: 'Experienced speaker with active track record in negotiating crisis directives and draft resolutions.',
    icon: Award,
  },
  {
    id: 'veteran',
    label: 'Veteran Delegate (8+ MUNs)',
    badge: 'Master Circuit',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    desc: 'Senior circuit delegate capable of high-stakes crisis response, unmoderated caucus leadership, and bloc formation.',
    icon: Flame,
  },
];

const COMMON_INSTITUTIONS = [
  'Delhi Public School, Jammu',
  'Heritage School, Jammu',
  'KC Public School, Jammu',
  'Jodhpur Model School',
  'University of Jammu',
  'Other Institution',
];

const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLScBGLm5S3STYlDHqXT8EojVv0F4o-wMOxWRW563YrE1B1x1DQ/formResponse';

export const AequitasRegistrationPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [soundEnabled, setSoundEnabled] = useState(sounds.isEnabled());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [submissionTime, setSubmissionTime] = useState('');
  const [passDataUrl, setPassDataUrl] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    grade: 'Senior Secondary / High School (Grades 11–12)',
    priorExperience: 'Junior Delegate (1–3 MUNs)',
    priorAccolades: '',
    statement: '',
    firstChoiceCommittee: "CC - Citizens' Council",
    firstChoicePortfolio: '',
    secondChoiceCommittee: 'UNHRC - United Nations Human Rights Council',
    secondChoicePortfolio: '',
    thirdChoiceCommittee: 'Lok Sabha - Lok Sabha (House of the People)',
    thirdChoicePortfolio: '',
    agreedToTerms: false,
  });

  // Ensure document-level scrolling is fully unlocked on the registration portal
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.body.style.touchAction = 'auto';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, []);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Set document title
  useEffect(() => {
    document.title = 'Aequitas Summit 2026 • Official Delegate Allocation Portal';
  }, []);

  const handleSoundToggle = () => {
    const updated = sounds.toggleSound();
    setSoundEnabled(updated);
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!form.fullName.trim()) {
        errors.fullName = 'Full Name is required.';
      } else if (form.fullName.trim().length < 3) {
        errors.fullName = 'Please enter your full official name (at least 3 characters).';
      }

      if (!form.email.trim()) {
        errors.email = 'Email address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        errors.email = 'Please provide a valid email format (e.g. name@domain.com).';
      }

      if (!form.phone.trim()) {
        errors.phone = 'Phone number is required.';
      } else if (form.phone.replace(/\D/g, '').length < 10) {
        errors.phone = 'Please enter a valid phone number with at least 10 digits.';
      }

      if (!form.institution.trim()) {
        errors.institution = 'School / Institution name is required.';
      }

      if (!form.grade) {
        errors.grade = 'Please select your academic grade / level.';
      }
    }

    if (step === 2) {
      if (!form.priorExperience) {
        errors.priorExperience = 'Please select your prior experience tier.';
      }
      if (!form.statement.trim()) {
        errors.statement = 'Please write a brief statement of purpose (at least 15 words).';
      } else if (form.statement.trim().split(/\s+/).length < 8) {
        errors.statement = 'Please write at least 8–10 words explaining your interest or background.';
      }
    }

    if (step === 3) {
      if (!form.firstChoiceCommittee) {
        errors.firstChoiceCommittee = 'Please select your 1st Choice Committee.';
      }
      if (!form.firstChoicePortfolio.trim()) {
        errors.firstChoicePortfolio = 'Please specify your 1st choice portfolio / country preference.';
      }
      if (!form.secondChoiceCommittee) {
        errors.secondChoiceCommittee = 'Please select your 2nd Choice Committee.';
      }
      if (!form.secondChoicePortfolio.trim()) {
        errors.secondChoicePortfolio = 'Please specify your 2nd choice portfolio / country preference.';
      }
      if (!form.thirdChoiceCommittee) {
        errors.thirdChoiceCommittee = 'Please select your 3rd Choice Committee.';
      }
      if (!form.thirdChoicePortfolio.trim()) {
        errors.thirdChoicePortfolio = 'Please specify your 3rd choice portfolio / country preference.';
      }
    }

    if (step === 4) {
      if (!form.agreedToTerms) {
        errors.agreedToTerms = 'You must agree to the academic integrity declaration to submit.';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      sounds.playTap();
      setDirection('forward');
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    } else {
      sounds.playHover();
    }
  };

  const handleBack = () => {
    sounds.playTap();
    setDirection('backward');
    setValidationErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleJumpToStep = (targetStep: number) => {
    if (targetStep < currentStep) {
      sounds.playTap();
      setDirection('backward');
      setValidationErrors({});
      setCurrentStep(targetStep);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    sounds.playChime();

    const trackingId = `AEQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    try {
      const body = new URLSearchParams();
      body.append('entry.183535783', form.fullName.trim());
      body.append('entry.1640058535', form.email.trim());
      body.append('entry.1465756153', form.phone.trim());
      body.append('entry.386438479', form.institution.trim());
      body.append(
        'entry.177448804',
        `${form.grade} | ${form.priorExperience}${
          form.priorAccolades ? ` | Honors: ${form.priorAccolades}` : ''
        } | Motivation: ${form.statement}`
      );
      body.append('entry.1860013780', form.firstChoiceCommittee);
      body.append('entry.1770614625', form.firstChoicePortfolio.trim());
      body.append('entry.1136480282', form.secondChoiceCommittee);
      body.append('entry.546561131', form.secondChoicePortfolio.trim());
      // Tertiary choice preferences for custom Google Form mapping
      body.append('entry.thirdChoiceCommittee', form.thirdChoiceCommittee);
      body.append('entry.thirdChoicePortfolio', form.thirdChoicePortfolio.trim());

      fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      }).catch((err) => console.log('Silent Google Form response:', err));

      // Also persist to local application storage and Developer Mailbox
      try {
        const stored = JSON.parse(localStorage.getItem('aequitas_delegate_applications') || '[]');
        stored.push({
          trackingId,
          timestamp: nowTime,
          ...form,
        });
        localStorage.setItem('aequitas_delegate_applications', JSON.stringify(stored));

        // Persist directly to Developer Mailbox (astitva_partner_mailbox) for Developer Desk access
        const existingMailbox = JSON.parse(localStorage.getItem('astitva_partner_mailbox') || '[]');
        const newMailboxEntry = {
          id: trackingId,
          timestamp: nowTime,
          schoolName: form.institution.trim(),
          contactPerson: `${form.fullName.trim()} (${form.grade})`,
          email: form.email.trim(),
          phone: form.phone.trim(),
          eventType: `Aequitas 2026 Delegate: ${form.firstChoiceCommittee} [${form.firstChoicePortfolio.trim()}]`,
          preferredDate: '2026-10-24',
          message: `[DELEGATE APPLICATION - ${trackingId}]\nDelegate Name: ${form.fullName.trim()}\nEmail: ${form.email.trim()}\nPhone: ${form.phone.trim()}\nInstitution: ${form.institution.trim()}\nAcademic Division: ${form.grade}\nPrior MUN Experience: ${form.priorExperience}\nHonors / Accolades: ${form.priorAccolades.trim() || 'None'}\n1st Choice Committee: ${form.firstChoiceCommittee} (Preferred: ${form.firstChoicePortfolio.trim()})\n2nd Choice Committee: ${form.secondChoiceCommittee} (Preferred: ${form.secondChoicePortfolio.trim()})\n3rd Choice Committee: ${form.thirdChoiceCommittee} (Preferred: ${form.thirdChoicePortfolio.trim()})\nStatement of Purpose:\n${form.statement.trim()}`,
          status: 'New',
        };
        localStorage.setItem('astitva_partner_mailbox', JSON.stringify([newMailboxEntry, ...existingMailbox]));
        window.dispatchEvent(new Event('astitva_partner_submitted'));
      } catch (e) {
        console.error('Failed to log to developer mailbox:', e);
      }
    } catch (err) {
      console.log('Submission dispatch error:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setApplicationId(trackingId);
      setSubmissionTime(nowTime);

      // Generate the official high-resolution Delegate Pass PNG
      try {
        const passUrl = generateDelegatePassDataUrl({
          fullName: form.fullName.trim(),
          institution: form.institution.trim(),
          grade: form.grade,
          trackingId,
        });
        setPassDataUrl(passUrl);
      } catch (err) {
        console.error('Failed to generate pass PNG:', err);
      }

      confetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#FFF5DC', '#3B82F6', '#10B981', '#E8A53E'],
      });
    }, 700);
  };

  const handleResetForm = () => {
    sounds.playTap();
    setPassDataUrl('');
    setForm({
      fullName: '',
      email: '',
      phone: '',
      institution: '',
      grade: 'Senior Secondary / High School (Grades 11–12)',
      priorExperience: 'Junior Delegate (1–3 MUNs)',
      priorAccolades: '',
      statement: '',
      firstChoiceCommittee: "CC - Citizens' Council",
      firstChoicePortfolio: '',
      secondChoiceCommittee: 'UNHRC - United Nations Human Rights Council',
      secondChoicePortfolio: '',
      thirdChoiceCommittee: 'Lok Sabha - Lok Sabha (House of the People)',
      thirdChoicePortfolio: '',
      agreedToTerms: false,
    });
    setIsSubmitted(false);
    setCurrentStep(1);
    setValidationErrors({});
  };

  // Helper for initials avatar
  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'DG';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#050811] text-[#FAF5EF] font-sans relative overflow-x-hidden selection:bg-[#D4AF37] selection:text-[#070A14] flex flex-col justify-between">
      {/* Dynamic Background Spatial Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/8 blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-[550px] h-[550px] rounded-full bg-[#16203B]/60 blur-[130px]" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-[#E8A53E]/5 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
      </div>

      {/* Dedicated Portal Topbar (Autonomous: strictly NO home redirection) */}
      <header className="sticky top-0 z-40 bg-[#070A14]/95 border-b border-[#D4AF37]/30 backdrop-blur-xl px-4 sm:px-8 py-3.5 select-none shadow-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Official Emblem & Portal Designation */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37]/25 to-[#16203B] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-lg shrink-0">
              <Sparkles className="w-5 h-5 fill-current animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-playfair font-extrabold text-sm sm:text-base text-[#FAF5EF] tracking-wide">
                  Aequitas Summit 2026
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] font-mono font-bold text-[9px] uppercase tracking-wider hidden xs:inline">
                  Official Portal
                </span>
              </div>
              <p className="text-[11px] text-[#C4BBA3] font-mono truncate">
                Delegate Allocation & Verification Gateway
              </p>
            </div>
          </div>

          {/* Right Security & Sound Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D1427] border border-[#D4AF37]/25 text-emerald-400 font-mono text-[10.5px]">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>256-Bit SSL Secured</span>
            </div>

            <button
              onClick={handleSoundToggle}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-[#D4AF37] text-[#070A14] border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                  : 'bg-[#16203B] text-[#C4BBA3] border-[#D4AF37]/30 hover:text-[#FAF5EF]'
              }`}
              title={soundEnabled ? 'Sound FX Enabled' : 'Enable Sound FX'}
              aria-label="Toggle Sound Effects"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Interactive Slide-by-Slide Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col justify-center">
        {!isSubmitted ? (
          <div className="space-y-6 sm:space-y-8">
            {/* Slide Progress Stepper Header */}
            <div className="bg-[#070A14]/85 border border-[#D4AF37]/30 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-lg space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
                  <span className="text-[#D4AF37] font-bold tracking-wider uppercase">
                    Registration Slide {currentStep} of 4
                  </span>
                </div>
                <div className="text-[#C4BBA3] text-[11px]">
                  {currentStep === 1 && 'Personal & Institutional Data'}
                  {currentStep === 2 && 'Experience Tier & Profile'}
                  {currentStep === 3 && 'Committee & Portfolio Allocation'}
                  {currentStep === 4 && 'Verification & Sovereign Submission'}
                </div>
              </div>

              {/* Linear Progress Bar */}
              <div className="w-full h-2 rounded-full bg-[#0D1427] border border-[#D4AF37]/20 overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.6)]"
                  initial={{ width: '25%' }}
                  animate={{ width: `${currentStep * 25}%` }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              </div>

              {/* Clickable Step Pills */}
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2 pt-1">
                {[
                  { step: 1, label: 'Identity', icon: User },
                  { step: 2, label: 'Experience', icon: Award },
                  { step: 3, label: 'Committees', icon: Layers },
                  { step: 4, label: 'Review', icon: CheckCheck },
                ].map((item) => {
                  const IconComp = item.icon;
                  const isCurrent = currentStep === item.step;
                  const isDone = currentStep > item.step;
                  return (
                    <button
                      key={item.step}
                      type="button"
                      onClick={() => handleJumpToStep(item.step)}
                      disabled={item.step > currentStep}
                      className={`flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-1 sm:px-2 rounded-xl text-[10.5px] sm:text-xs font-medium transition-all ${
                        isCurrent
                          ? 'bg-[#D4AF37] text-[#070A14] font-bold border border-[#FAF5EF] shadow-md'
                          : isDone
                          ? 'bg-[#0D1427] text-emerald-400 border border-emerald-500/30 cursor-pointer hover:border-emerald-400'
                          : 'bg-[#070A14]/50 text-[#C4BBA3]/40 border border-transparent cursor-not-allowed'
                      }`}
                    >
                      {isDone ? (
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      ) : (
                        <IconComp className="w-3 h-3 shrink-0" />
                      )}
                      <span className="truncate hidden xs:inline">{item.label}</span>
                      <span className="xs:hidden">{item.step}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slide Body Card with Animated Transitions */}
            <div className="bg-[#0B1224]/90 border border-[#D4AF37]/35 rounded-3xl p-5 sm:p-8 md:p-10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
              <AnimatePresence mode="wait">
                {/* SLIDE 1: IDENTIFICATION & INSTITUTION */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: direction === 'forward' ? 24 : -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction === 'forward' ? -24 : 24 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="space-y-6"
                  >
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/35 text-xs font-mono font-semibold mb-2">
                        <User className="w-3 h-3" />
                        <span>Step 01 // Delegate Identity</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-white">
                        Personal & Institutional Profile
                      </h2>
                      <p className="text-xs sm:text-sm text-[#C4BBA3] mt-1">
                        Please provide your official legal name and contact details for delegate credentials.
                      </p>
                    </div>

                    <div className="space-y-4 pt-1">
                      {/* Full Name with Dynamic Initials Avatar */}
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-[#FAF5EF] mb-1.5">
                          Full Name of Delegate *
                        </label>
                        <div className="relative flex items-center">
                          <div className="absolute left-3.5 w-7 h-7 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-[11px] flex items-center justify-center pointer-events-none select-none">
                            {getInitials(form.fullName)}
                          </div>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Aarav Sharma"
                            value={form.fullName}
                            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                            className={`w-full pl-13 pr-4 py-3 rounded-xl bg-[#050811] border text-white text-sm focus:outline-none transition-colors ${
                              validationErrors.fullName
                                ? 'border-rose-500 focus:border-rose-400'
                                : 'border-[#D4AF37]/35 focus:border-[#D4AF37]'
                            }`}
                          />
                        </div>
                        {validationErrors.fullName && (
                          <p className="text-rose-400 text-xs mt-1 flex items-center gap-1 font-mono">
                            <AlertCircle className="w-3 h-3" />
                            <span>{validationErrors.fullName}</span>
                          </p>
                        )}
                      </div>

                      {/* Contact Grid: Email & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-[#FAF5EF] mb-1.5">
                            Official Email Address *
                          </label>
                          <div className="relative flex items-center">
                            <Mail className="absolute left-3.5 w-4 h-4 text-[#D4AF37]/70 pointer-events-none" />
                            <input
                              type="email"
                              required
                              placeholder="e.g. delegate@institution.edu"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#050811] border text-white text-sm focus:outline-none transition-colors ${
                                validationErrors.email
                                  ? 'border-rose-500 focus:border-rose-400'
                                  : 'border-[#D4AF37]/35 focus:border-[#D4AF37]'
                              }`}
                            />
                          </div>
                          {validationErrors.email && (
                            <p className="text-rose-400 text-xs mt-1 flex items-center gap-1 font-mono">
                              <AlertCircle className="w-3 h-3" />
                              <span>{validationErrors.email}</span>
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-[#FAF5EF] mb-1.5">
                            Phone / WhatsApp Number *
                          </label>
                          <div className="relative flex items-center">
                            <Phone className="absolute left-3.5 w-4 h-4 text-[#D4AF37]/70 pointer-events-none" />
                            <input
                              type="tel"
                              required
                              placeholder="+91 XXXXX XXXXX"
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#050811] border text-white text-sm focus:outline-none transition-colors ${
                                validationErrors.phone
                                  ? 'border-rose-500 focus:border-rose-400'
                                  : 'border-[#D4AF37]/35 focus:border-[#D4AF37]'
                              }`}
                            />
                          </div>
                          {validationErrors.phone && (
                            <p className="text-rose-400 text-xs mt-1 flex items-center gap-1 font-mono">
                              <AlertCircle className="w-3 h-3" />
                              <span>{validationErrors.phone}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Institution / School Name */}
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-[#FAF5EF] mb-1.5">
                          School / College / Institution Name *
                        </label>
                        <div className="relative flex items-center">
                          <School className="absolute left-3.5 w-4 h-4 text-[#D4AF37]/70 pointer-events-none" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Delhi Public School, Jammu"
                            value={form.institution}
                            onChange={(e) => setForm({ ...form, institution: e.target.value })}
                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#050811] border text-white text-sm focus:outline-none transition-colors ${
                              validationErrors.institution
                                ? 'border-rose-500 focus:border-rose-400'
                                : 'border-[#D4AF37]/35 focus:border-[#D4AF37]'
                            }`}
                          />
                        </div>
                        {/* Quick Choice Chips */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-2">
                          <span className="text-[10.5px] text-[#C4BBA3] font-mono mr-1">Suggestions:</span>
                          {COMMON_INSTITUTIONS.map((inst, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                sounds.playTap();
                                setForm({ ...form, institution: inst });
                              }}
                              className="text-[10px] px-2 py-0.5 rounded-lg bg-[#070A14] border border-[#D4AF37]/20 text-[#C4BBA3] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all cursor-pointer"
                            >
                              {inst}
                            </button>
                          ))}
                        </div>
                        {validationErrors.institution && (
                          <p className="text-rose-400 text-xs mt-1 flex items-center gap-1 font-mono">
                            <AlertCircle className="w-3 h-3" />
                            <span>{validationErrors.institution}</span>
                          </p>
                        )}
                      </div>

                      {/* Academic Grade / Level Chips */}
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-[#FAF5EF] mb-2">
                          Academic Grade / Division *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {GRADE_OPTIONS.map((opt) => {
                            const selected = form.grade === opt.label;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => {
                                  sounds.playTap();
                                  setForm({ ...form, grade: opt.label });
                                }}
                                onMouseEnter={() => sounds.playHover()}
                                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                                  selected
                                    ? 'bg-[#16203B] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)] ring-1 ring-[#D4AF37]'
                                    : 'bg-[#070A14]/80 border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:bg-[#0D1427]'
                                }`}
                              >
                                <span
                                  className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                                    selected
                                      ? 'border-[#D4AF37] bg-[#D4AF37] text-[#070A14]'
                                      : 'border-[#C4BBA3]/40'
                                  }`}
                                >
                                  {selected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                </span>
                                <div>
                                  <div className="text-xs font-semibold text-white">{opt.label}</div>
                                  <div className="text-[10.5px] text-[#C4BBA3] font-mono mt-0.5">{opt.desc}</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* SLIDE 2: EXPERIENCE TIER & STATEMENT */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: direction === 'forward' ? 24 : -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction === 'forward' ? -24 : 24 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="space-y-6"
                  >
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/35 text-xs font-mono font-semibold mb-2">
                        <Award className="w-3 h-3" />
                        <span>Step 02 // Diplomatic Assessment</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-white">
                        Experience Tier & Statement of Intent
                      </h2>
                      <p className="text-xs sm:text-sm text-[#C4BBA3] mt-1">
                        Enables the Executive Board to conduct equitable portfolio matching and balance council debate dynamics.
                      </p>
                    </div>

                    {/* Experience Tier Selector */}
                    <div className="space-y-2.5">
                      <label className="block text-xs sm:text-sm font-medium text-[#FAF5EF]">
                        Prior Model UN Experience Tier *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {EXPERIENCE_TIERS.map((tier) => {
                          const IconComp = tier.icon;
                          const selected = form.priorExperience === tier.label;
                          return (
                            <button
                              key={tier.id}
                              type="button"
                              onClick={() => {
                                sounds.playTap();
                                setForm({ ...form, priorExperience: tier.label });
                              }}
                              onMouseEnter={() => sounds.playHover()}
                              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                selected
                                  ? 'bg-[#16203B] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)] ring-1 ring-[#D4AF37]'
                                  : 'bg-[#070A14]/80 border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:bg-[#0D1427]'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <div className="p-2 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                                    <IconComp className="w-4 h-4" />
                                  </div>
                                  <span className="text-xs sm:text-sm font-bold text-white">{tier.label}</span>
                                </div>
                                <span
                                  className={`text-[9px] font-mono px-2 py-0.5 rounded-full border shrink-0 ${tier.badgeColor}`}
                                >
                                  {tier.badge}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#C4BBA3] mt-2.5 leading-relaxed font-mono">
                                {tier.desc}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Prior Accolades (Optional) */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-[#FAF5EF] mb-1.5">
                        Prior Conferences / Accolades / Portfolios Held (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Best Delegate at DPS MUN 2025 (UNSC - France); 3 Special Mentions"
                        value={form.priorAccolades}
                        onChange={(e) => setForm({ ...form, priorAccolades: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#050811] border border-[#D4AF37]/35 text-white text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Statement of Motivation */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs sm:text-sm font-medium text-[#FAF5EF]">
                          Statement of Purpose / Why Aequitas Summit? *
                        </label>
                        <span className="text-[10.5px] font-mono text-[#D4AF37]">
                          {form.statement.length} characters
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        required
                        placeholder="Share your goals for the conference, policy interests, or what you hope to champion in committee deliberations..."
                        value={form.statement}
                        onChange={(e) => setForm({ ...form, statement: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-[#050811] border text-white text-sm focus:outline-none transition-colors resize-none ${
                          validationErrors.statement
                            ? 'border-rose-500 focus:border-rose-400'
                            : 'border-[#D4AF37]/35 focus:border-[#D4AF37]'
                        }`}
                      />
                      {validationErrors.statement && (
                        <p className="text-rose-400 text-xs mt-1 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          <span>{validationErrors.statement}</span>
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* SLIDE 3: COMMITTEE & PORTFOLIO ALLOCATION */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: direction === 'forward' ? 24 : -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction === 'forward' ? -24 : 24 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="space-y-6"
                  >
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/35 text-xs font-mono font-semibold mb-2">
                        <Layers className="w-3 h-3" />
                        <span>Step 03 // Allocation Matrix</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-white">
                        Committee & Portfolio Preferences
                      </h2>
                      <p className="text-xs sm:text-sm text-[#C4BBA3] mt-1">
                        Select your primary, secondary, and tertiary committee preferences. Portfolios are allocated on a rolling, merit-assessed basis.
                      </p>
                    </div>

                    {/* Committee Cards Quick Reference */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono text-[#D4AF37] block">
                        Summit 2026 Council Roster (Click to set as 1st Choice):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {COMMITTEES.map((comm) => {
                          const isFirst = form.firstChoiceCommittee.includes(comm.code);
                          const isSecond = form.secondChoiceCommittee.includes(comm.code);
                          const isThird = form.thirdChoiceCommittee.includes(comm.code);
                          return (
                            <div
                              key={comm.id}
                              onClick={() => {
                                sounds.playTap();
                                setForm({ ...form, firstChoiceCommittee: `${comm.code} - ${comm.name}` });
                              }}
                              className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                                isFirst
                                  ? 'bg-[#16203B] border-[#D4AF37] ring-1 ring-[#D4AF37]'
                                  : isSecond
                                  ? 'bg-[#0D1427] border-sky-400/40'
                                  : isThird
                                  ? 'bg-[#1A0B2E] border-purple-400/40'
                                  : 'bg-[#070A14]/70 border-[#D4AF37]/20 hover:border-[#D4AF37]/60'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs text-white">{comm.code}</span>
                              </div>
                              <p className="text-[10px] text-[#C4BBA3] truncate mt-1">{comm.name}</p>
                              {isFirst && (
                                <span className="mt-1.5 inline-block text-[9px] font-mono text-emerald-400 font-bold">
                                  ✓ 1st Choice
                                </span>
                              )}
                              {isSecond && !isFirst && (
                                <span className="mt-1.5 inline-block text-[9px] font-mono text-sky-400 font-bold">
                                  ✓ 2nd Choice
                                </span>
                              )}
                              {isThird && !isFirst && !isSecond && (
                                <span className="mt-1.5 inline-block text-[9px] font-mono text-purple-400 font-bold">
                                  ✓ 3rd Choice
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Preference 1 */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#070A14]/90 border border-[#D4AF37]/30 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-[#D4AF37] text-[#070A14] font-bold text-xs flex items-center justify-center">
                          1
                        </span>
                        <h3 className="font-bold text-sm text-white">First Choice Preference (Primary)</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs text-[#FAF5EF] mb-1 font-medium">
                            Select Committee *
                          </label>
                          <select
                            value={form.firstChoiceCommittee}
                            onChange={(e) => setForm({ ...form, firstChoiceCommittee: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl bg-[#050811] border border-[#D4AF37]/35 text-white text-xs focus:border-[#D4AF37] focus:outline-none cursor-pointer"
                          >
                            {COMMITTEES.map((comm) => (
                              <option key={comm.id} value={`${comm.code} - ${comm.name}`}>
                                {comm.code} - {comm.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs text-[#FAF5EF] mb-1 font-medium">
                            Preferred Portfolio / Country / Ministry *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. France / Home Minister / NSA"
                            value={form.firstChoicePortfolio}
                            onChange={(e) => setForm({ ...form, firstChoicePortfolio: e.target.value })}
                            className={`w-full px-3 py-2.5 rounded-xl bg-[#050811] border text-white text-xs focus:outline-none transition-colors ${
                              validationErrors.firstChoicePortfolio
                                ? 'border-rose-500 focus:border-rose-400'
                                : 'border-[#D4AF37]/35 focus:border-[#D4AF37]'
                            }`}
                          />
                          {validationErrors.firstChoicePortfolio && (
                            <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1 font-mono">
                              <AlertCircle className="w-3 h-3" />
                              <span>{validationErrors.firstChoicePortfolio}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Preference 2 */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#070A14]/90 border border-[#D4AF37]/30 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-[#16203B] border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-xs flex items-center justify-center">
                          2
                        </span>
                        <h3 className="font-bold text-sm text-white">Second Choice Preference (Alternate)</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs text-[#FAF5EF] mb-1 font-medium">
                            Select Committee *
                          </label>
                          <select
                            value={form.secondChoiceCommittee}
                            onChange={(e) => setForm({ ...form, secondChoiceCommittee: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl bg-[#050811] border border-[#D4AF37]/35 text-white text-xs focus:border-[#D4AF37] focus:outline-none cursor-pointer"
                          >
                            {COMMITTEES.map((comm) => (
                              <option key={comm.id} value={`${comm.code} - ${comm.name}`}>
                                {comm.code} - {comm.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs text-[#FAF5EF] mb-1 font-medium">
                            Preferred Portfolio / Country / Ministry *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Germany / Leader of Opposition"
                            value={form.secondChoicePortfolio}
                            onChange={(e) => setForm({ ...form, secondChoicePortfolio: e.target.value })}
                            className={`w-full px-3 py-2.5 rounded-xl bg-[#050811] border text-white text-xs focus:outline-none transition-colors ${
                              validationErrors.secondChoicePortfolio
                                ? 'border-rose-500 focus:border-rose-400'
                                : 'border-[#D4AF37]/35 focus:border-[#D4AF37]'
                            }`}
                          />
                          {validationErrors.secondChoicePortfolio && (
                            <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1 font-mono">
                              <AlertCircle className="w-3 h-3" />
                              <span>{validationErrors.secondChoicePortfolio}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Preference 3 */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#070A14]/90 border border-[#D4AF37]/30 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-[#2E1065] border border-purple-500/40 text-purple-300 font-bold text-xs flex items-center justify-center">
                          3
                        </span>
                        <h3 className="font-bold text-sm text-white">Third Choice Preference (Tertiary / Contingency)</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs text-[#FAF5EF] mb-1 font-medium">
                            Select Committee *
                          </label>
                          <select
                            value={form.thirdChoiceCommittee}
                            onChange={(e) => setForm({ ...form, thirdChoiceCommittee: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl bg-[#050811] border border-[#D4AF37]/35 text-white text-xs focus:border-[#D4AF37] focus:outline-none cursor-pointer"
                          >
                            {COMMITTEES.map((comm) => (
                              <option key={comm.id} value={`${comm.code} - ${comm.name}`}>
                                {comm.code} - {comm.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs text-[#FAF5EF] mb-1 font-medium">
                            Preferred Portfolio / Country / Ministry *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. United Kingdom / Delegate"
                            value={form.thirdChoicePortfolio}
                            onChange={(e) => setForm({ ...form, thirdChoicePortfolio: e.target.value })}
                            className={`w-full px-3 py-2.5 rounded-xl bg-[#050811] border text-white text-xs focus:outline-none transition-colors ${
                              validationErrors.thirdChoicePortfolio
                                ? 'border-rose-500 focus:border-rose-400'
                                : 'border-[#D4AF37]/35 focus:border-[#D4AF37]'
                            }`}
                          />
                          {validationErrors.thirdChoicePortfolio && (
                            <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1 font-mono">
                              <AlertCircle className="w-3 h-3" />
                              <span>{validationErrors.thirdChoicePortfolio}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* SLIDE 4: REVIEW & SOVEREIGN SUBMISSION */}
                {currentStep === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: direction === 'forward' ? 24 : -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction === 'forward' ? -24 : 24 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="space-y-6"
                  >
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/35 text-xs font-mono font-semibold mb-2">
                        <CheckCheck className="w-3 h-3" />
                        <span>Step 04 // Application Dossier Review</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-white">
                        Confirm & Dispatch Application
                      </h2>
                      <p className="text-xs sm:text-sm text-[#C4BBA3] mt-1">
                        Please review your application parameters before dispatching to the Aequitas Executive Secretariat.
                      </p>
                    </div>

                    {/* Summary Review Dossier Box */}
                    <div className="rounded-2xl bg-[#070A14]/95 border-2 border-[#D4AF37]/40 p-4 sm:p-6 space-y-4 shadow-xl">
                      {/* Section 1: Identity */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/20">
                        <div>
                          <div className="text-xs text-[#D4AF37] font-mono uppercase tracking-wider">
                            Delegate Profile
                          </div>
                          <div className="font-bold text-base text-white mt-0.5">{form.fullName}</div>
                          <div className="text-xs text-[#C4BBA3] font-mono">
                            {form.email} • {form.phone}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleJumpToStep(1)}
                          className="px-2.5 py-1 rounded-lg bg-[#16203B] text-[#D4AF37] text-xs font-mono border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-[#070A14] transition-all cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>

                      {/* Section 2: Institution & Experience */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/20">
                        <div>
                          <div className="text-xs text-[#D4AF37] font-mono uppercase tracking-wider">
                            Institution & Division
                          </div>
                          <div className="font-semibold text-sm text-white mt-0.5">{form.institution}</div>
                          <div className="text-xs text-[#C4BBA3] font-mono">
                            {form.grade} • {form.priorExperience}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleJumpToStep(2)}
                          className="px-2.5 py-1 rounded-lg bg-[#16203B] text-[#D4AF37] text-xs font-mono border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-[#070A14] transition-all cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>

                      {/* Section 3: Allocations */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/20">
                        <div>
                          <div className="text-xs text-[#D4AF37] font-mono uppercase tracking-wider">
                            Requested Allocations
                          </div>
                          <div className="text-xs text-white mt-1">
                            <span className="text-[#D4AF37] font-bold">1st Choice:</span>{' '}
                            {form.firstChoiceCommittee} —{' '}
                            <span className="underline decoration-[#D4AF37]">{form.firstChoicePortfolio}</span>
                          </div>
                          <div className="text-xs text-[#C4BBA3] mt-0.5">
                            <span className="text-[#8FB3DE] font-bold">2nd Choice:</span>{' '}
                            {form.secondChoiceCommittee} —{' '}
                            <span className="underline decoration-[#8FB3DE]">{form.secondChoicePortfolio}</span>
                          </div>
                          <div className="text-xs text-[#C4BBA3] mt-0.5">
                            <span className="text-[#C084FC] font-bold">3rd Choice:</span>{' '}
                            {form.thirdChoiceCommittee} —{' '}
                            <span className="underline decoration-[#C084FC]">{form.thirdChoicePortfolio}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleJumpToStep(3)}
                          className="px-2.5 py-1 rounded-lg bg-[#16203B] text-[#D4AF37] text-xs font-mono border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-[#070A14] transition-all cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>

                      {/* Summit Snapshot Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#C4BBA3] bg-[#050811] p-3 rounded-xl border border-[#D4AF37]/20">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{INITIAL_SUMMIT_CONFIG.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{INITIAL_SUMMIT_CONFIG.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Declaration Checkbox */}
                    <div className="p-4 rounded-xl bg-[#070A14]/80 border border-[#D4AF37]/25 space-y-2">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={form.agreedToTerms}
                          onChange={(e) => setForm({ ...form, agreedToTerms: e.target.checked })}
                          className="mt-1 w-4 h-4 rounded border-[#D4AF37]/40 text-[#D4AF37] focus:ring-[#D4AF37] cursor-pointer"
                        />
                        <span className="text-xs text-[#C4BBA3] leading-relaxed">
                          I hereby confirm that all submitted details are authentic, and I agree to abide by the
                          official Rules of Procedure, diplomatic decorum, and zero-bias code of conduct established
                          by the Aequitas Summit 2026 Executive Board.
                        </span>
                      </label>
                      {validationErrors.agreedToTerms && (
                        <p className="text-rose-400 text-xs mt-1 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          <span>{validationErrors.agreedToTerms}</span>
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Button Controls */}
              <div className="flex items-center justify-between gap-3 pt-6 mt-6 border-t border-[#D4AF37]/20">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-3 rounded-xl bg-[#070A14] text-[#C4BBA3] border border-[#D4AF37]/30 hover:text-white hover:border-[#D4AF37] transition-all flex items-center gap-2 text-xs sm:text-sm font-semibold cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E8A53E] to-[#D4AF37] text-[#070A14] font-extrabold text-xs sm:text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer ml-auto"
                  >
                    <span>Continue to Step {currentStep + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className={`px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E8A53E] to-[#D4AF37] text-[#070A14] font-extrabold text-xs sm:text-sm shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer ml-auto ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Transmitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Official Application</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* SLIDE 5: CONFIRMATION RECEIPT (NO REDIRECT TO HOME) */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-[#0B1224]/95 border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] text-center space-y-6 max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(212,175,55,0.4)] animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-mono font-bold uppercase tracking-wider inline-block mb-2">
                Application Confirmed & Recorded
              </span>
              <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-white">
                Registration Successful!
              </h2>
              <p className="text-xs sm:text-sm text-[#C4BBA3] max-w-md mx-auto mt-2 leading-relaxed">
                Thank you, <strong>{form.fullName}</strong>. Your delegate application for{' '}
                <strong>Aequitas Model United Nations Summit 2026</strong> has been received by the Executive Board.
              </p>
            </div>

            {/* Application Receipt Badge */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#070A14] border border-[#D4AF37]/30 text-left font-mono space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/20">
                <span className="text-[#C4BBA3]">Tracking ID:</span>
                <span className="text-[#D4AF37] font-bold text-sm">{applicationId}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/20">
                <span className="text-[#C4BBA3]">Timestamp:</span>
                <span className="text-white">{submissionTime}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/20">
                <span className="text-[#C4BBA3]">Assigned Institution:</span>
                <span className="text-white truncate max-w-[200px]">{form.institution}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#C4BBA3]">Primary Preference:</span>
                <span className="text-emerald-400 font-bold truncate max-w-[220px]">
                  {form.firstChoiceCommittee}
                </span>
              </div>
            </div>

            {/* OFFICIAL DELEGATE PASS PNG PREVIEW & DOWNLOAD CARD */}
            {passDataUrl && (
              <div className="p-4 sm:p-6 rounded-2xl bg-[#070A14] border-2 border-[#D4AF37]/60 text-left space-y-4 shadow-2xl">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                    <span className="font-playfair font-bold text-sm sm:text-base text-white">
                      Official Delegate Pass Credential (PNG)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
                    High-Res 1200×720 PNG
                  </span>
                </div>

                {/* Live Canvas PNG Image Preview */}
                <div className="rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow-xl bg-black/60">
                  <img
                    src={passDataUrl}
                    alt={`Delegate Pass for ${form.fullName}`}
                    className="w-full h-auto object-cover block"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                  <p className="text-[11px] text-[#C4BBA3] font-mono leading-relaxed">
                    Personalized with your legal name, institution, academic division, and the Conclave Covenant of Excellence.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      sounds.playChime();
                      downloadDelegatePassPng(passDataUrl, form.fullName);
                    }}
                    className="w-full sm:w-auto shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E8A53E] to-[#D4AF37] text-[#070A14] font-extrabold text-xs shadow-[0_0_20px_rgba(212,175,55,0.5)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 stroke-[2.5]" />
                    <span>Download Delegate Pass (PNG)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Next Steps Roadmap */}
            <div className="p-4 rounded-xl bg-[#0D1427]/80 border border-[#D4AF37]/20 text-left space-y-2.5">
              <span className="text-[11px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider block">
                Next Steps on the Diplomatic Circuit:
              </span>
              <ul className="text-xs text-[#C4BBA3] space-y-1.5 list-disc list-inside">
                <li>
                  <strong>Portfolio Review:</strong> The Executive Board evaluates preferences within 48–72 hours.
                </li>
                <li>
                  <strong>Background Guides:</strong> Comprehensive dossier sent to your registered email (
                  <span className="text-[#FAF5EF]">{form.email}</span>).
                </li>
                <li>
                  <strong>Pre-Conclave Briefing:</strong> Live delegate briefing session announced prior to conference dates.
                </li>
              </ul>
            </div>

            {/* Action Buttons (Strictly no home redirect, printing and repeat registration supported) */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {passDataUrl && (
                <button
                  type="button"
                  onClick={() => {
                    sounds.playChime();
                    downloadDelegatePassPng(passDataUrl, form.fullName);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E8A53E] text-[#070A14] font-extrabold text-xs flex items-center gap-2 shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer font-mono"
                >
                  <Download className="w-4 h-4 stroke-[2.5]" />
                  <span>Download Pass (.PNG)</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-[#070A14] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#16203B] transition-all flex items-center gap-2 text-xs font-bold font-mono cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save Receipt</span>
              </button>

              <button
                type="button"
                onClick={handleResetForm}
                className="px-5 py-2.5 rounded-xl bg-[#16203B] border border-[#D4AF37]/40 text-white hover:bg-[#D4AF37] hover:text-[#070A14] transition-all flex items-center gap-2 text-xs font-bold font-mono cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Register Another Delegate</span>
              </button>
            </div>
          </motion.div>
        )}
      </main>

      {/* Autonomous Dedicated Portal Footer (Strictly NO home links) */}
      <footer className="bg-[#070A14]/95 border-t border-[#D4AF37]/20 py-4 px-4 sm:px-8 text-center select-none text-[11px] font-mono text-[#C4BBA3] space-y-1">
        <div>
          Aequitas Model United Nations Summit 2026 • Executive Secretariat Delegate Allocation Gate
        </div>
        <div>
          Official Inquiries: <span className="text-[#D4AF37]">aastitva.alliance@gmail.com</span> • Jammu, J&amp;K
        </div>
      </footer>
    </div>
  );
};
