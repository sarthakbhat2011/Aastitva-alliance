import React, { useState, useEffect, useRef } from 'react';
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
  QrCode,
  CreditCard,
  Copy,
  PhoneCall,
  MessageSquare,
  ExternalLink,
  Landmark,
} from 'lucide-react';
import { COMMITTEES, INITIAL_SUMMIT_CONFIG } from '../data';
import { sounds } from '../utils/soundEffects';
import {
  generateDelegatePassDataUrl,
  downloadDelegatePassPng,
  DelegatePassData,
} from '../utils/generateDelegatePass';
import { PartnerMailEntry } from '../types';
import { saveEntryToMailbox, submitRegistrationToServer } from '../utils/mailboxApi';
import { DeveloperMailboxModal } from '../components/DeveloperMailboxModal';

export const PAYMENT_CONFIG = {
  amount: '1999',
  formattedAmount: '₹1,999',
  accountNumber: '0116040100017669',
  ifscCode: 'JAKA0GNGYAL',
  bankName: 'Jammu & Kashmir Bank (J&K Bank)',
  branch: 'Gangyal, Jammu',
  beneficiaryName: 'Aequitas Conclave / Aastitva Alliance',
  qrCodeUrl: '/payment-qr.jpg',
  primaryContact: {
    number: '+91 99065 12613',
    raw: '919906512613',
    label: 'Primary Secretariat Contact',
  },
  secondaryContacts: [
    { number: '+91 88993 46704', raw: '918899346704', label: 'Secondary / Emergency Desk' },
    { number: '+91 95963 72727', raw: '919596372727', label: 'Secondary / Emergency Desk' },
    { number: '+91 95484 99951', raw: '919548499951', label: 'Secondary / Emergency Desk' },
  ],
  queryContacts: [
    { number: '+91 99065 12613', raw: '919906512613', label: 'Primary Secretariat Contact' },
    { number: '+91 88993 46704', raw: '918899346704', label: 'Secondary / Emergency Desk' },
    { number: '+91 95963 72727', raw: '919596372727', label: 'Secondary / Emergency Desk' },
    { number: '+91 95484 99951', raw: '919548499951', label: 'Secondary / Emergency Desk' },
  ],
};

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
  transactionId: string;
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
    desc: 'New to Model United Nations. Dedicated procedural training and delegate preparation.',
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
  'https://docs.google.com/forms/d/e/1FAIpQLSdgVhSI5tgSKD4vk_m8YWI0q6zFuJFytzer4R7-DSbzu7G8rg/formResponse';

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
  const [devMailboxOpen, setDevMailboxOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldId: string) => {
    sounds.playTap();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search.toLowerCase();
      if (search.includes('mailbox=true') || search.includes('tab=mailbox') || search.includes('dev=')) {
        setDevMailboxOpen(true);
      }
    }
  }, []);

  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    grade: 'Senior Secondary / High School (Grades 11–12)',
    priorExperience: 'Junior Delegate (1–3 MUNs)',
    priorAccolades: '',
    statement: '',
    firstChoiceCommittee: 'CCC - Continuous Crisis Committee',
    firstChoicePortfolio: '',
    secondChoiceCommittee: 'UNHRC - United Nations Human Rights Council',
    secondChoicePortfolio: '',
    thirdChoiceCommittee: 'Lok Sabha - Lok Sabha (House of the People)',
    thirdChoicePortfolio: '',
    transactionId: '',
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

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Dynamic Galactic Starfield, Shooting Stars & Cosmic Planetary Geometry Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e && e.touches[0]) {
        targetMouseX = e.touches[0].clientX;
        targetMouseY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        targetMouseX = (e as MouseEvent).clientX;
        targetMouseY = (e as MouseEvent).clientY;
      }
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 1. Galactic Starfield (120 pulsating celestial stars)
    const stars: {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      pulseSpeed: number;
      speed: number;
      color: string;
    }[] = [];

    const starColors = ['#D4AF37', '#FAF5EF', '#38BDF8', '#C084FC', '#FDE047'];

    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        speed: Math.random() * 0.3 + 0.05,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // 2. Shooting Stars System (Golden, White & Violet Meteorites)
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
      color: string;
      active: boolean;
    }

    const shootingStars: ShootingStar[] = [];
    const spawnShootingStar = () => {
      if (Math.random() < 0.45 && shootingStars.filter((s) => s.active).length < 4) {
        const palettes = [
          'rgba(212, 175, 55, ',   // Imperial Gold
          'rgba(255, 255, 255, ',   // Pure Starlight White
          'rgba(192, 132, 252, ',   // Royal Violet
          'rgba(56, 189, 248, ',    // Electric Cyan
        ];
        shootingStars.push({
          x: Math.random() * (width * 1.2) - width * 0.1,
          y: Math.random() * (height * 0.5),
          length: Math.random() * 120 + 70,
          speed: Math.random() * 9 + 5,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.25,
          alpha: 1.0,
          color: palettes[Math.floor(Math.random() * palettes.length)],
          active: true,
        });
      }
    };

    let planetRotation = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse / touch parallax easing
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      planetRotation += 0.003;

      // A. Deep Cosmic Nebula Gradients
      const nebula1 = ctx.createRadialGradient(
        width * 0.5 + (mouseX - width / 2) * 0.04,
        height * 0.35 + (mouseY - height / 2) * 0.04,
        0,
        width * 0.5,
        height * 0.35,
        Math.max(width, height) * 0.65
      );
      nebula1.addColorStop(0, 'rgba(88, 28, 135, 0.28)'); // Deep royal purple
      nebula1.addColorStop(0.4, 'rgba(30, 27, 75, 0.35)'); // Navy violet
      nebula1.addColorStop(0.75, 'rgba(15, 23, 42, 0.55)');
      nebula1.addColorStop(1, 'rgba(5, 8, 17, 0.95)');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      // B. Warm Golden Starlight Horizon Glow
      const goldNebula = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        0,
        width * 0.5,
        height * 0.45,
        width * 0.4
      );
      goldNebula.addColorStop(0, 'rgba(212, 175, 55, 0.12)');
      goldNebula.addColorStop(0.6, 'rgba(212, 175, 55, 0.03)');
      goldNebula.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = goldNebula;
      ctx.fillRect(0, 0, width, height);

      // C. Celestial Planetary Background Rings & Latitude Bands
      ctx.save();
      const planetCenterX = width * 0.5 + (mouseX - width / 2) * 0.02;
      const planetCenterY = height * 0.48 + (mouseY - height / 2) * 0.02;
      ctx.translate(planetCenterX, planetCenterY);

      // Giant outer orbital planetary ring
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.min(width, height) * 0.46, Math.min(width, height) * 0.16, -Math.PI / 10 + Math.sin(planetRotation * 0.5) * 0.04, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.16)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([8, 12]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Satellite node on ring 1
      const s1X = Math.cos(planetRotation * 2) * (Math.min(width, height) * 0.46);
      const s1Y = Math.sin(planetRotation * 2) * (Math.min(width, height) * 0.16);
      ctx.beginPath();
      ctx.arc(s1X, s1Y, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = '#D4AF37';
      ctx.shadowColor = '#D4AF37';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Secondary inclined orbital ring
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.min(width, height) * 0.56, Math.min(width, height) * 0.2, Math.PI / 8 - Math.cos(planetRotation * 0.4) * 0.03, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.12)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 10]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Satellite node on ring 2
      const s2X = Math.cos(-planetRotation * 1.5) * (Math.min(width, height) * 0.56);
      const s2Y = Math.sin(-planetRotation * 1.5) * (Math.min(width, height) * 0.2);
      ctx.beginPath();
      ctx.arc(s2X, s2Y, 2.6, 0, Math.PI * 2);
      ctx.fillStyle = '#38BDF8';
      ctx.shadowColor = '#38BDF8';
      ctx.shadowBlur = 9;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Tertiary faint wide perimeter ring
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.min(width, height) * 0.68, Math.min(width, height) * 0.24, -Math.PI / 6, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([2, 14]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();

      // D. Draw & Twinkle Drifting Stars
      stars.forEach((star) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;

        // Twinkle
        star.alpha += Math.sin(planetRotation * 10 + star.x) * star.pulseSpeed;
        star.alpha = Math.max(0.15, Math.min(0.95, star.alpha));

        ctx.globalAlpha = star.alpha;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = star.radius * 3.5;
        ctx.fill();
        ctx.restore();

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      });

      // E. Update & Draw Shooting Stars (Meteors with radiant multi-color trails)
      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        if (!star.active) continue;

        const endX = star.x + Math.cos(star.angle) * star.length;
        const endY = star.y + Math.sin(star.angle) * star.length;

        const starGrad = ctx.createLinearGradient(star.x, star.y, endX, endY);
        starGrad.addColorStop(0, `${star.color}${star.alpha})`);
        starGrad.addColorStop(0.4, `${star.color}${star.alpha * 0.7})`);
        starGrad.addColorStop(1, `${star.color}0)`);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = starGrad;
        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';
        ctx.shadowColor = '#FAF5EF';
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.restore();

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.alpha -= 0.012;

        if (star.alpha <= 0 || star.x > width + 100 || star.y > height + 100) {
          star.active = false;
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
    };
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
      if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
        errors.general = 'Please verify that all previous required sections are complete.';
      }
    }

    if (step === 5) {
      if (!form.transactionId.trim()) {
        errors.transactionId = 'Please enter your 12-digit UTR / UPI Reference Number / Transaction ID.';
      } else if (form.transactionId.trim().length < 5) {
        errors.transactionId = 'Please enter a valid Transaction / UTR reference number (at least 5 characters).';
      }

      if (!form.agreedToTerms) {
        errors.agreedToTerms = 'You must confirm the remittance declaration and agree to the academic integrity code to complete registration.';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      sounds.playTap();
      setDirection('forward');
      setCurrentStep((prev) => Math.min(prev + 1, 5));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    sounds.playChime();

    const trackingId = `AEQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    let finalTrackingId = trackingId;

    try {
      // Map academic division to exact Google Form dropdown string
      const mapGradeToGoogleOption = (val: string) => {
        if (!val) return '•Senior Secondary School (Grades 11–12)';
        if (val.includes('Middle') || val.includes('6-8') || val.includes('6–8')) return '• Middle School (Grades 6–8)';
        if (val.includes('Secondary') && !val.includes('Senior') && !val.includes('11-12') && !val.includes('11–12')) return '• Secondary School (Grades 9–10)';
        if (val.includes('Senior') || val.includes('11-12') || val.includes('11–12') || val.includes('High School')) return '•Senior Secondary School (Grades 11–12)';
        if (val.includes('College') || val.includes('Undergraduate')) return '• Undergraduate / College';
        return '•Senior Secondary School (Grades 11–12)';
      };

      // Map experience tier to exact Google Form dropdown string
      const mapExperienceToGoogleOption = (val: string) => {
        if (!val) return '• Junior Delegate (1–3 MUNs)';
        if (val.includes('First-Timer') || val.includes('Novice') || val.includes('0 MUNs')) return '• First-Timer / Novice (0 MUNs)';
        if (val.includes('Junior') || val.includes('1-3') || val.includes('1–3')) return '• Junior Delegate (1–3 MUNs)';
        if (val.includes('Seasoned') || val.includes('4-7') || val.includes('4–7')) return '• Seasoned Delegate (4–7 MUNs)';
        if (val.includes('Veteran') || val.includes('8+')) return '• Veteran Delegate (8+ MUNs)';
        return '• Junior Delegate (1–3 MUNs)';
      };

      // Map committee to exact Google Form dropdown string
      const mapCommitteeToGoogleOption = (val: string) => {
        if (!val) return '• CCC - Continuous Crisis Committee';
        if (val.includes('IPC') || val.includes('Press') || val.includes('International Press')) return '• IPC - International Press Corps';
        if (val.includes('CCC') || val.includes('Crisis') || val.includes('CC')) return '• CCC - Continuous Crisis Committee';
        if (val.includes('UNHRC') || val.includes('Human Rights')) return '• UNHRC - United Nations Human Rights Council';
        if (val.includes('JKLA') || val.includes('Legislative')) return '• JKLA - Jammu & Kashmir Legislative Assembly';
        if (val.includes('Women')) return '• UN Women - United Nations Entity for Gender Equality';
        if (val.includes('Lok Sabha') || val.includes('House')) return '• Lok Sabha - Lok Sabha (House of the People)';
        if (val.includes('IPL') || val.includes('Premier')) return '• IPL - Indian Premier League Auction Council';
        return '• CCC - Continuous Crisis Committee';
      };

      const body = new URLSearchParams();
      // 1. Full Legal Name
      body.append('entry.780764261', form.fullName.trim());
      // 2. Official Email Address
      body.append('entry.830016473', form.email.trim());
      // 3. WhatsApp / Contact Number
      body.append('entry.86288026', form.phone.trim());
      // 4. School / Institution / University Name
      body.append('entry.1083196564', form.institution.trim());
      // 5. Academic Division / Grade
      body.append('entry.278555826', mapGradeToGoogleOption(form.grade));
      // 6. Prior MUN Experience Level
      body.append('entry.898367359', mapExperienceToGoogleOption(form.priorExperience));
      // 7. Prior MUN Honors / Accolades
      body.append('entry.291987551', form.priorAccolades.trim() || 'None');
      // 8. 1st Choice Committee (Primary)
      body.append('entry.977018072', mapCommitteeToGoogleOption(form.firstChoiceCommittee));
      // 9. 1st Choice Portfolio / Country Preference
      body.append('entry.299951131', form.firstChoicePortfolio.trim() || 'General Allocation');
      // 10. 2nd Choice Committee (Alternate)
      body.append('entry.580509636', mapCommitteeToGoogleOption(form.secondChoiceCommittee || 'UNHRC - United Nations Human Rights Council'));
      // 11. 2nd Choice Portfolio / Country Preference
      body.append('entry.777137221', form.secondChoicePortfolio.trim() || 'General Allocation');
      // 12. 3rd Choice Committee (Tertiary / Contingency)
      body.append('entry.635888889', mapCommitteeToGoogleOption(form.thirdChoiceCommittee || 'JKLA - Jammu & Kashmir Legislative Assembly'));
      // 13. 3rd Choice Portfolio / Country Preference
      body.append('entry.794534023', form.thirdChoicePortfolio.trim() || 'General Allocation');
      // 14. Statement of Purpose & Motivation
      body.append('entry.156711483', form.statement.trim() || 'Registered via Aequitas Delegate Portal.');
      // 15. UTR number or UPI ref code
      body.append('entry.1604443743', form.transactionId.trim() || 'Verified Remittance');

      // SINGLE-ENTRY PIPELINE:
      // Submit directly to authoritative backend endpoint /api/register.
      // The server saves the entry to persistent storage and dispatches directly to Google Forms via secure HTTPS.
      let submissionSuccessful = false;

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
          thirdChoiceCommittee: form.thirdChoiceCommittee,
          thirdChoicePortfolio: form.thirdChoicePortfolio.trim(),
          priorExperience: form.priorExperience,
          priorAccolades: form.priorAccolades.trim(),
          statement: form.statement.trim(),
          transactionId: form.transactionId.trim(),
        });

        if (serverResult.success) {
          submissionSuccessful = true;
          if (serverResult.trackingId) {
            finalTrackingId = serverResult.trackingId;
          }
        }
      } catch (e) {
        console.warn('Server registration call failed, switching to fallback:', e);
      }

      // ALWAYS save application to local mailbox immediately so it is never lost
      const mailboxEntry: PartnerMailEntry = {
        id: finalTrackingId,
        timestamp: nowTime,
        schoolName: form.institution.trim(),
        contactPerson: `${form.fullName.trim()} (${form.grade})`,
        email: form.email.trim(),
        phone: form.phone.trim(),
        eventType: `Aequitas 2026 Delegate: ${form.firstChoiceCommittee} [${form.firstChoicePortfolio.trim()}]`,
        preferredDate: '2026-10-29',
        message: `[DELEGATE APPLICATION - ${finalTrackingId}]\nDelegate Name: ${form.fullName.trim()}\nEmail: ${form.email.trim()}\nPhone: ${form.phone.trim()}\nInstitution: ${form.institution.trim()}\nAcademic Division: ${form.grade}\nPrior MUN Experience: ${form.priorExperience}\nHonors / Accolades: ${form.priorAccolades.trim() || 'None'}\n1st Choice Committee: ${form.firstChoiceCommittee} (Preferred: ${form.firstChoicePortfolio.trim()})\n2nd Choice Committee: ${form.secondChoiceCommittee} (Preferred: ${form.secondChoicePortfolio.trim()})\n3rd Choice Committee: ${form.thirdChoiceCommittee} (Preferred: ${form.thirdChoicePortfolio.trim()})\nFee Status: ₹1,999 (Delegate Remittance Recorded)\nTransaction / UTR ID: ${form.transactionId.trim()}\nStatement of Purpose:\n${form.statement.trim()}`,
        status: 'New',
      };
      await saveEntryToMailbox(mailboxEntry);

      // CLIENT FALLBACK (Offline / Static Host Mode ONLY):
      // Only execute client Google Form POST if the server was unavailable.
      if (!submissionSuccessful) {
        try {
          fetch(GOOGLE_FORM_ACTION, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
          }).catch((err) => console.log('Silent Google Form fallback response:', err));
        } catch (fallbackErr) {
          console.error('Fallback logging failed:', fallbackErr);
        }
      }

      // Persist the application locally so the user's receipt and pass render immediately
      try {
        const stored = JSON.parse(localStorage.getItem('aequitas_delegate_applications') || '[]');
        stored.push({
          trackingId: finalTrackingId,
          timestamp: nowTime,
          feePaid: '₹1,999',
          transactionId: form.transactionId.trim(),
          ...form,
        });
        localStorage.setItem('aequitas_delegate_applications', JSON.stringify(stored));
        window.dispatchEvent(new Event('astitva_partner_submitted'));
      } catch (storeErr) {
        console.warn('Failed to store receipt locally:', storeErr);
      }
    } catch (err) {
      console.log('Submission dispatch error:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setApplicationId(finalTrackingId);
      setSubmissionTime(nowTime);

      // Generate the official high-resolution Delegate Pass PNG
      try {
        const passUrl = generateDelegatePassDataUrl({
          fullName: form.fullName.trim(),
          institution: form.institution.trim(),
          grade: form.grade,
          trackingId: finalTrackingId,
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
      firstChoiceCommittee: 'CCC - Continuous Crisis Committee',
      firstChoicePortfolio: '',
      secondChoiceCommittee: 'UNHRC - United Nations Human Rights Council',
      secondChoicePortfolio: '',
      thirdChoiceCommittee: 'Lok Sabha - Lok Sabha (House of the People)',
      thirdChoicePortfolio: '',
      transactionId: '',
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
      {/* Galactic Living Starfield, Shooting Stars & Cosmic Planetary Geometry Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Radiant Atmospheric Center Spotlight */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[500px] bg-gradient-to-b from-[#7C3AED]/15 via-[#D4AF37]/15 to-transparent blur-[160px] pointer-events-none z-0" />

      {/* Dedicated Portal Topbar (Autonomous: strictly NO home redirection) */}
      <header className="sticky top-0 z-40 bg-[#070A14]/95 border-b border-[#D4AF37]/30 backdrop-blur-xl px-3 sm:px-8 py-2.5 sm:py-3.5 select-none shadow-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Official Alliance Dual Logos & Portal Designation */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            {/* Dual Logos as an Alliance */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <div className="relative">
                <img
                  src="/aequitas-logo.png"
                  alt="Aequitas Summit"
                  className="w-8 h-8 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.4)] block bg-black"
                />
              </div>

              <span className="font-playfair font-bold text-xs sm:text-sm text-[#D4AF37] opacity-80 px-0.5 select-none">
                ×
              </span>

              <div className="relative">
                <img
                  src="/astitva-logo.png"
                  alt="Aastitva Alliance"
                  className="w-8 h-8 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#D4AF37]/70 shadow-[0_0_12px_rgba(168,85,247,0.3)] block bg-[#1e1442]"
                />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="font-playfair font-extrabold text-xs sm:text-base md:text-lg text-[#FAF5EF] tracking-wide truncate">
                  Aequitas Summit x Aastitva Alliance
                </span>
                <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] font-mono font-bold text-[8px] sm:text-[9px] uppercase tracking-wider shrink-0">
                  Oct 29–30, 2026
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#C4BBA3] font-mono truncate">
                Official Delegate Allocation &amp; Verification Gateway
              </p>
            </div>
          </div>

          {/* Right Security & Sound Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setDevMailboxOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D1427] border border-[#D4AF37]/25 text-emerald-400 font-mono text-[10.5px] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all cursor-pointer"
              title="Click to open Secretariat / Developer Mailbox Desk"
            >
              <Lock className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">256-Bit SSL Secured</span>
              <span className="sm:hidden">Secured</span>
            </button>

            <button
              onClick={handleSoundToggle}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center ${
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
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-8 flex flex-col justify-center">
        {!isSubmitted ? (
          <div className="space-y-4 sm:space-y-6">
            {/* Slide Progress Stepper Header */}
            <div className="bg-[#070A14]/90 border border-[#D4AF37]/30 rounded-2xl p-3.5 sm:p-5 backdrop-blur-md shadow-lg space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-1.5 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                  <span className="text-[#D4AF37] font-bold text-xs tracking-wider uppercase">
                    Slide {currentStep} of 5
                  </span>
                </div>
                <div className="text-[#C4BBA3] text-[10.5px] sm:text-[11px] truncate">
                  {currentStep === 1 && 'Personal & Institutional Data'}
                  {currentStep === 2 && 'Experience Tier & Profile'}
                  {currentStep === 3 && 'Council & Portfolio Allocation'}
                  {currentStep === 4 && 'Complete Registration Dossier Review'}
                  {currentStep === 5 && 'Delegate Fee Remittance (₹1,999)'}
                </div>
              </div>

              {/* Linear Progress Bar */}
              <div className="w-full h-1.5 sm:h-2 rounded-full bg-[#0D1427] border border-[#D4AF37]/20 overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.6)]"
                  initial={{ width: '20%' }}
                  animate={{ width: `${currentStep * 20}%` }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              </div>

              {/* Clickable Step Pills */}
              <div className="grid grid-cols-5 gap-1 sm:gap-2 pt-0.5">
                {[
                  { step: 1, label: 'Identity', icon: User },
                  { step: 2, label: 'Division', icon: Award },
                  { step: 3, label: 'Committees', icon: Layers },
                  { step: 4, label: 'Review', icon: FileText },
                  { step: 5, label: 'Payment', icon: QrCode },
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
                      className={`flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 rounded-xl text-[10px] sm:text-xs font-medium font-mono transition-all min-h-[36px] ${
                        isCurrent
                          ? 'bg-[#D4AF37] text-[#070A14] font-bold shadow-[0_0_12px_rgba(212,175,55,0.45)]'
                          : isDone
                          ? 'bg-[#0D1427] text-emerald-400 border border-emerald-500/30 cursor-pointer hover:border-emerald-400'
                          : 'bg-[#070A14]/50 text-[#C4BBA3]/40 border border-[#243563]/30 cursor-not-allowed'
                      }`}
                    >
                      {isDone ? (
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      ) : (
                        <IconComp className="w-3 h-3 shrink-0" />
                      )}
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slide Body Card with Animated Transitions */}
            <div className="bg-[#0B1224]/90 border border-[#D4AF37]/35 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
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
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
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

                {/* SLIDE 4: COMPLETE REGISTRATION DOSSIER REVIEW */}
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
                        <FileText className="w-3 h-3" />
                        <span>Step 04 // Complete Registration Dossier Review</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-white">
                        Review Your Application Dossier
                      </h2>
                      <p className="text-xs sm:text-sm text-[#C4BBA3] mt-1">
                        Please inspect all registered parameters before proceeding to fee remittance and seat allocation.
                      </p>
                    </div>

                    {/* Comprehensive Dossier Review Box */}
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
                          {form.priorAccolades && (
                            <div className="text-xs text-amber-300 font-mono mt-0.5">
                              Honors: {form.priorAccolades}
                            </div>
                          )}
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

                      {/* Section 4: Statement of Purpose */}
                      {form.statement && (
                        <div className="p-3.5 rounded-xl bg-[#050811] border border-[#D4AF37]/20 text-xs">
                          <span className="text-[#D4AF37] font-mono uppercase font-bold tracking-wider block mb-1">
                            Statement of Purpose
                          </span>
                          <p className="text-[#FAF5EF]/90 italic leading-relaxed whitespace-pre-wrap">
                            "{form.statement}"
                          </p>
                        </div>
                      )}

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

                      {/* Delegate Fee Summary Card */}
                      <div className="p-4 rounded-xl bg-gradient-to-r from-[#D4AF37]/15 via-[#E8A53E]/10 to-transparent border border-[#D4AF37]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] font-bold block">
                            Standard Delegate Fee
                          </span>
                          <div className="text-xl sm:text-2xl font-bold font-playfair text-white mt-0.5">
                            ₹1,999 <span className="text-xs font-mono text-[#C4BBA3] font-normal">/ Delegate</span>
                          </div>
                          <p className="text-[11px] text-[#C4BBA3] mt-0.5">
                            All-inclusive: 2-day Summit Entry, Committee Allocation, Delegate Kit, High-Res Official Pass, Lunch & High Tea.
                          </p>
                        </div>
                        <div className="sm:text-right shrink-0">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                            <Check className="w-3 h-3 text-emerald-400" />
                            Ready for Remittance
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0D1427]/70 border border-[#D4AF37]/20 text-xs text-[#C4BBA3] flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>
                        All details verified? Click <strong>Proceed to Fee Payment</strong> below to complete remittance via QR code or direct bank transfer.
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* SLIDE 5: DELEGATE FEE REMITTANCE & VERIFICATION */}
                {currentStep === 5 && (
                  <motion.div
                    key="step-5"
                    initial={{ opacity: 0, x: direction === 'forward' ? 24 : -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction === 'forward' ? -24 : 24 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="space-y-6"
                  >
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/35 text-xs font-mono font-semibold mb-2">
                        <QrCode className="w-3 h-3" />
                        <span>Step 05 // Delegate Fee Remittance & Verification</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-white">
                        Delegate Fee Remittance
                      </h2>
                      <p className="text-xs sm:text-sm text-[#C4BBA3] mt-1">
                        Secure payment of ₹1,999 to finalize your registration and generate your official delegate pass.
                      </p>
                    </div>

                    {/* Prominent Amount Header Banner */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#16203B] via-[#0D1427] to-[#16203B] border-2 border-[#D4AF37]/50 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10.5px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
                          Total Amount Payable
                        </span>
                        <div className="text-2xl sm:text-3xl font-playfair font-extrabold text-white flex items-baseline gap-2 mt-0.5">
                          <span>₹1,999</span>
                          <span className="text-xs font-mono font-normal text-emerald-400">
                            (Delegate All-Inclusive Fee)
                          </span>
                        </div>
                        <p className="text-xs text-[#C4BBA3] mt-1">
                          Covers 29 & 30 October 2026 Summit entry, official kit, lunch, high tea & pass credentials.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1.5 rounded-xl bg-[#070A14] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono font-bold flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          Verified Gateway
                        </span>
                      </div>
                    </div>

                    {/* Dual Payment Channels Grid (QR Code + Direct Bank Transfer) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Channel 1: Scan & Pay via UPI QR */}
                      <div className="rounded-2xl bg-[#070A14]/95 border-2 border-[#D4AF37]/40 p-4 sm:p-5 flex flex-col items-center text-center space-y-3.5 shadow-lg">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] text-[11px] font-mono font-bold uppercase tracking-wider">
                          <QrCode className="w-3.5 h-3.5" />
                          <span>Option 1: Scan & Pay</span>
                        </div>
                        <p className="text-xs text-[#C4BBA3]">
                          Open <strong>PhonePe, Google Pay, Paytm, BHIM</strong>, or any UPI app and scan the QR code below:
                        </p>

                        {/* QR Image Box */}
                        <div className="relative p-2.5 rounded-2xl bg-white border-2 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.25)] max-w-[210px] w-full aspect-square flex items-center justify-center overflow-hidden">
                          <img
                            src={PAYMENT_CONFIG.qrCodeUrl}
                            alt="Aequitas Payment QR Code"
                            className="w-full h-full object-contain rounded-xl"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs font-bold text-white font-mono">
                            Amount: ₹1,999
                          </div>
                          <div className="text-[11px] text-[#C4BBA3] font-mono">
                            Scan via PhonePe, GPay, Paytm, BHIM, Cred
                          </div>
                        </div>

                        <a
                          href={PAYMENT_CONFIG.qrCodeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:underline font-mono"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open Full Size QR Code</span>
                        </a>
                      </div>

                      {/* Channel 2: Direct Bank Transfer (NEFT / IMPS / RTGS) */}
                      <div className="rounded-2xl bg-[#070A14]/95 border-2 border-[#D4AF37]/40 p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-lg">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] text-[11px] font-mono font-bold uppercase tracking-wider">
                              <Landmark className="w-3.5 h-3.5" />
                              <span>Option 2: Direct Bank Transfer</span>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#16203B] text-emerald-400 border border-emerald-500/30">
                              IMPS / NEFT / RTGS
                            </span>
                          </div>

                          <p className="text-xs text-[#C4BBA3]">
                            Transfer ₹1,999 directly to the official Aequitas Conclave bank account using net banking or mobile banking:
                          </p>

                          {/* Bank Details Table */}
                          <div className="space-y-2.5 font-mono text-xs">
                            {/* Account Number */}
                            <div className="p-2.5 rounded-xl bg-[#0D1427] border border-[#D4AF37]/30 flex items-center justify-between gap-2">
                              <div className="min-w-0">
                                <span className="text-[10px] uppercase text-[#A39B88] block">Account Number</span>
                                <span className="text-white font-bold text-sm tracking-wider select-all truncate block">
                                  {PAYMENT_CONFIG.accountNumber}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleCopy(PAYMENT_CONFIG.accountNumber, 'acc')}
                                className="shrink-0 px-2.5 py-1.5 rounded-lg bg-[#16203B] hover:bg-[#D4AF37] hover:text-[#070A14] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-sans font-semibold transition-all flex items-center gap-1 cursor-pointer"
                              >
                                {copiedField === 'acc' ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>

                            {/* IFSC Code */}
                            <div className="p-2.5 rounded-xl bg-[#0D1427] border border-[#D4AF37]/30 flex items-center justify-between gap-2">
                              <div className="min-w-0">
                                <span className="text-[10px] uppercase text-[#A39B88] block">IFSC Code</span>
                                <span className="text-white font-bold text-sm tracking-wider select-all truncate block">
                                  {PAYMENT_CONFIG.ifscCode}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleCopy(PAYMENT_CONFIG.ifscCode, 'ifsc')}
                                className="shrink-0 px-2.5 py-1.5 rounded-lg bg-[#16203B] hover:bg-[#D4AF37] hover:text-[#070A14] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-sans font-semibold transition-all flex items-center gap-1 cursor-pointer"
                              >
                                {copiedField === 'ifsc' ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>

                            {/* Bank & Branch Details */}
                            <div className="p-2.5 rounded-xl bg-[#0D1427]/60 border border-[#243563] space-y-1 text-[11px]">
                              <div>
                                <span className="text-[#A39B88]">Bank: </span>
                                <strong className="text-[#FAF5EF]">{PAYMENT_CONFIG.bankName}</strong>
                              </div>
                              <div>
                                <span className="text-[#A39B88]">Branch: </span>
                                <strong className="text-[#FAF5EF]">{PAYMENT_CONFIG.branch}</strong>
                              </div>
                              <div>
                                <span className="text-[#A39B88]">Account Name: </span>
                                <strong className="text-[#FAF5EF]">{PAYMENT_CONFIG.beneficiaryName}</strong>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-[11px] text-amber-300 font-mono bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/25 flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 shrink-0 text-[#D4AF37]" />
                          <span>Confidential Account Credentials • Verified for Aequitas 2026.</span>
                        </div>
                      </div>
                    </div>

                    {/* Transaction Reference / UTR Number Input */}
                    <div className="rounded-2xl bg-[#070A14]/95 border-2 border-[#D4AF37]/50 p-4 sm:p-6 space-y-3 shadow-xl">
                      <label className="block text-xs sm:text-sm font-semibold text-[#FAF5EF]">
                        12-Digit Transaction Reference (UTR / UPI Ref Number / Transaction ID) *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="e.g. 426812345678 or Bank UTR Number"
                          value={form.transactionId}
                          onChange={(e) => {
                            setForm({ ...form, transactionId: e.target.value });
                            if (validationErrors.transactionId) {
                              setValidationErrors({ ...validationErrors, transactionId: '' });
                            }
                          }}
                          className={`w-full px-4 py-3 rounded-xl bg-[#050811] border text-white font-mono text-sm tracking-wider focus:outline-none transition-colors ${
                            validationErrors.transactionId
                              ? 'border-rose-500 focus:border-rose-400'
                              : 'border-[#D4AF37]/45 focus:border-[#D4AF37]'
                          }`}
                        />
                      </div>
                      <p className="text-[11px] text-[#C4BBA3] font-mono leading-relaxed">
                        You can find your 12-digit UTR or UPI Reference Number in your payment receipt on PhonePe, Google Pay, Paytm, or your bank's transfer confirmation.
                      </p>
                      {validationErrors.transactionId && (
                        <p className="text-rose-400 text-xs mt-1 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{validationErrors.transactionId}</span>
                        </p>
                      )}
                    </div>

                    {/* DEDICATED HELPLINE FOR INQUIRIES */}
                    <div className="rounded-2xl bg-gradient-to-br from-[#0D1427] via-[#070A14] to-[#16203B] border-2 border-[#D4AF37]/45 p-4 sm:p-6 space-y-3.5 shadow-xl">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-[#D4AF37]/25">
                        <div className="flex items-center gap-2">
                          <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
                          <h3 className="text-sm sm:text-base font-bold text-white font-playfair tracking-wide">
                            For Any Inquiries &amp; Remittance Support
                          </h3>
                        </div>
                        <span className="text-[10.5px] font-mono text-amber-300 bg-[#D4AF37]/15 px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                          Official Secretariat Helplines
                        </span>
                      </div>

                      <p className="text-xs text-[#C4BBA3] leading-relaxed">
                        For any questions regarding registration, committee allocations, payment verification, or group delegations, reach out directly to our coordinating officers:
                      </p>

                      {/* SECTION 1: PRIMARY CONTACT */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-[11px] font-mono uppercase font-bold text-[#D4AF37] tracking-wider">
                            1. Primary Contact
                          </span>
                        </div>

                        <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-[#16203B] via-[#0D1427] to-[#16203B] border-2 border-[#D4AF37]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-[#A39B88] block">
                              Main Secretariat &amp; Inquiries Lead
                            </span>
                            <span className="text-base sm:text-lg font-mono font-bold text-white block mt-0.5 tracking-wider">
                              {PAYMENT_CONFIG.primaryContact.number}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${PAYMENT_CONFIG.primaryContact.raw}`}
                              className="py-2 px-3.5 sm:px-4 rounded-lg bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#070A14] text-xs font-mono font-extrabold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                              title={`Call Primary Contact ${PAYMENT_CONFIG.primaryContact.number}`}
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>Call Primary</span>
                            </a>
                            <a
                              href={`https://wa.me/${PAYMENT_CONFIG.primaryContact.raw}?text=${encodeURIComponent(
                                `Hello Aequitas Secretariat, I have an inquiry regarding delegate registration (Fee: ₹1,999) for ${form.fullName || 'a delegate'}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="py-2 px-3.5 sm:px-4 rounded-lg bg-[#0E3A2F] hover:bg-emerald-500 hover:text-white text-xs font-mono font-bold text-emerald-300 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                              title={`WhatsApp Primary Contact ${PAYMENT_CONFIG.primaryContact.number}`}
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* SECTION 2: SECONDARY / EMERGENCY CONTACTS */}
                      <div className="space-y-2 pt-2 border-t border-[#D4AF37]/20">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          <span className="text-[11px] font-mono uppercase font-bold text-[#FAF5EF] tracking-wider">
                            2. Secondary / Emergency Contacts
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {PAYMENT_CONFIG.secondaryContacts.map((contact, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-[#070A14] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all space-y-2 flex flex-col justify-between"
                            >
                              <div>
                                <span className="text-[10px] font-mono uppercase text-[#A39B88] block">
                                  Secondary / Emergency Line 0{idx + 1}
                                </span>
                                <span className="text-xs sm:text-sm font-mono font-bold text-white block mt-0.5">
                                  {contact.number}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 pt-1">
                                <a
                                  href={`tel:${contact.raw}`}
                                  className="flex-1 py-1.5 px-2 rounded-lg bg-[#16203B] hover:bg-[#D4AF37] hover:text-[#070A14] text-xs font-mono font-semibold text-white transition-all flex items-center justify-center gap-1"
                                  title={`Call ${contact.number}`}
                                >
                                  <Phone className="w-3 h-3 text-emerald-400" />
                                  <span>Call</span>
                                </a>
                                <a
                                  href={`https://wa.me/${contact.raw}?text=${encodeURIComponent(
                                    `Hello Aequitas Secretariat, I have an inquiry regarding delegate registration (Fee: ₹1,999) for ${form.fullName || 'a delegate'}.`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 py-1.5 px-2 rounded-lg bg-[#0E3A2F] hover:bg-emerald-500 hover:text-white text-xs font-mono font-semibold text-emerald-300 transition-all flex items-center justify-center gap-1"
                                  title={`WhatsApp ${contact.number}`}
                                >
                                  <MessageSquare className="w-3 h-3 text-emerald-400" />
                                  <span>WhatsApp</span>
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Remittance Declaration Checkbox */}
                    <div className="p-4 rounded-xl bg-[#070A14]/80 border border-[#D4AF37]/35 space-y-2">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={form.agreedToTerms}
                          onChange={(e) => {
                            setForm({ ...form, agreedToTerms: e.target.checked });
                            if (validationErrors.agreedToTerms) {
                              setValidationErrors({ ...validationErrors, agreedToTerms: '' });
                            }
                          }}
                          className="mt-1 w-4 h-4 rounded border-[#D4AF37]/40 text-[#D4AF37] focus:ring-[#D4AF37] cursor-pointer"
                        />
                        <span className="text-xs text-[#C4BBA3] leading-relaxed">
                          I confirm that I have remitted <strong>₹1,999</strong> towards the delegate registration fee and that the Transaction / UTR ID entered above is genuine. I agree to abide by the official Rules of Procedure, diplomatic decorum, and zero-bias code of conduct established by the Aequitas Summit 2026 Executive Board.
                        </span>
                      </label>
                      {validationErrors.agreedToTerms && (
                        <p className="text-rose-400 text-xs mt-1 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{validationErrors.agreedToTerms}</span>
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Button Controls */}
              <div className="flex items-center justify-between gap-2.5 pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-[#D4AF37]/20">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-[#070A14] text-[#C4BBA3] border border-[#D4AF37]/30 hover:text-white hover:border-[#D4AF37] transition-all flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold cursor-pointer min-h-[44px]"
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
                    className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E8A53E] to-[#D4AF37] text-[#070A14] font-extrabold text-xs sm:text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer ml-auto min-h-[44px]"
                  >
                    <span>Next: Step {currentStep + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : currentStep === 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E8A53E] to-[#D4AF37] text-[#070A14] font-extrabold text-xs sm:text-sm shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer ml-auto min-h-[44px]"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Proceed to Fee Payment (₹1,999)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className={`px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E8A53E] to-[#D4AF37] text-[#070A14] font-extrabold text-xs sm:text-sm shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer ml-auto min-h-[44px] ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Transmitting &amp; Verifying...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Confirm Payment &amp; Complete Registration</span>
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
                <span className="text-[#C4BBA3]">Fee Remittance:</span>
                <span className="text-emerald-400 font-bold">₹1,999 (Recorded)</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/20">
                <span className="text-[#C4BBA3]">Transaction UTR:</span>
                <span className="text-amber-300 font-bold select-all">{form.transactionId || 'Recorded'}</span>
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
            <div className="p-4 rounded-xl bg-[#0D1427]/80 border border-[#D4AF37]/20 text-left space-y-2">
              <span className="text-[11px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider block">
                Next Steps on the Diplomatic Circuit:
              </span>
              <p className="text-xs text-[#C4BBA3] leading-relaxed">
                <strong className="text-[#FAF5EF]">Portfolio Review:</strong> The Executive Board evaluates committee and portfolio preferences within 48–72 hours.
              </p>
            </div>

            {/* Inquiries & Remittance Support Helpline */}
            <div className="p-4 rounded-xl bg-[#070A14] border border-[#D4AF37]/30 text-left space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[#D4AF37] font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
                  For Any Inquiries:
                </span>
                <span className="text-[10px] text-[#A39B88] font-mono">Secretariat &amp; Emergency Support</span>
              </div>

              {/* 1. Primary Contact */}
              <div className="p-2.5 rounded-lg bg-[#0D1427] border border-[#D4AF37]/40 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase text-[#D4AF37] font-bold block">1. Primary Secretariat Contact:</span>
                  <span className="text-white font-bold text-sm tracking-wider">{PAYMENT_CONFIG.primaryContact.number}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${PAYMENT_CONFIG.primaryContact.raw}`}
                    className="px-2.5 py-1 rounded bg-[#D4AF37] text-[#070A14] font-bold text-[11px] flex items-center gap-1 hover:brightness-110"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`https://wa.me/${PAYMENT_CONFIG.primaryContact.raw}?text=${encodeURIComponent(
                      `Hello Aequitas Secretariat, I have an inquiry regarding delegate registration (Fee: ₹1,999) for ${form.fullName || 'a delegate'}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded bg-[#0E3A2F] text-emerald-300 font-bold text-[11px] flex items-center gap-1 hover:bg-emerald-500 hover:text-white"
                  >
                    <MessageSquare className="w-3 h-3 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* 2. Secondary / Emergency Contacts */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] uppercase text-[#A39B88] block font-bold">2. Secondary / Emergency Contacts:</span>
                <div className="flex flex-wrap items-center gap-2">
                  {PAYMENT_CONFIG.secondaryContacts.map((c, i) => (
                    <a
                      key={i}
                      href={`tel:${c.raw}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#16203B] hover:bg-[#D4AF37] hover:text-[#070A14] text-white border border-[#D4AF37]/30 transition-colors"
                    >
                      <Phone className="w-3 h-3 text-emerald-400" />
                      <span>{c.number}</span>
                    </a>
                  ))}
                </div>
              </div>
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


      {/* Developer Partner Mailbox Modal */}
      <DeveloperMailboxModal
        isOpen={devMailboxOpen}
        onClose={() => setDevMailboxOpen(false)}
      />
    </div>
  );
};
