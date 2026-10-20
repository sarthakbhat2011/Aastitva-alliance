import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Lock,
  Volume2,
  VolumeX,
  Clock,
  Download,
  Printer,
  RefreshCw,
  QrCode,
  CreditCard,
  Copy,
  ExternalLink,
  Award,
  Gamepad2,
  PartyPopper,
  Mic,
  Star,
  Users,
  User,
  Heart,
  Flame,
  Check,
  AlertCircle,
  HelpCircle,
  Phone,
  Mail,
  Building,
  ZoomIn,
  Maximize2,
  X,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import {
  PROM_PACKAGES,
  PROM_ACTIVITIES,
  RECREATIONAL_ACTIVITIES,
  RECREATIONAL_TIERS,
  SPECIAL_EVENT,
  PromPackage,
  RecreationalActivity,
  RecreationalPackageTier,
} from '../data/eventsData';
import {
  generateEventPassDataUrl,
  downloadEventPassPng,
  EventPassData,
} from '../utils/generateEventPass';
import {
  submitEventRegistrationToServer,
  saveEntryToMailbox,
} from '../utils/mailboxApi';
import { DeveloperMailboxModal } from '../components/DeveloperMailboxModal';

// Dedicated Autonomous Events Payment Configuration (Strictly Aastitva Alliances)
export const EVENT_PAYMENT_CONFIG = {
  accountNumber: '0116040100017669',
  ifscCode: 'JAKA0GNGYAL',
  bankName: 'Jammu & Kashmir Bank (J&K Bank)',
  branch: 'Gangyal, Jammu',
  beneficiaryName: 'Aastitva Alliances',
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

// Interactive 3D Tilt Card Component
const Card3D: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = '', onClick }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -7;
    const rotY = ((x - centerX) / centerX) * 7;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlareX((x / rect.width) * 100);
    setGlareY((y / rect.height) * 100);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sounds.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      style={{ perspective: '1100px' }}
      className="w-full transition-transform duration-200"
    >
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        className={`relative transition-all duration-300 rounded-3xl overflow-hidden ${className}`}
      >
        {/* Dynamic Specular Lighting Sheen */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay transition-opacity duration-300 opacity-60"
            style={{
              background: `radial-gradient(circle 320px at ${glareX}% ${glareY}%, rgba(255,255,255,0.22), transparent 70%)`,
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
};

export const EventsRegistrationPage: React.FC = () => {
  // Navigation & Category Selection State
  // null = Common Interface with 3 Bigger Options
  const [selectedCategory, setSelectedCategory] = useState<'prom' | 'recreational' | 'special' | null>(null);

  // Selected sub-item
  const [selectedPromPackage, setSelectedPromPackage] = useState<PromPackage>(PROM_PACKAGES[0]);
  const [selectedActivity, setSelectedActivity] = useState<RecreationalActivity>(RECREATIONAL_ACTIVITIES[0]);
  const [selectedRecreationalTier, setSelectedRecreationalTier] = useState<RecreationalPackageTier>(RECREATIONAL_TIERS[0]);

  // Form inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [age, setAge] = useState<string>('');
  const [talentDescription, setTalentDescription] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [member2Name, setMember2Name] = useState('');
  const [member3Name, setMember3Name] = useState('');
  const [member4Name, setMember4Name] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Dynamic Duo / Squad computation across Prom Night and Tiered Esports
  const isDuo =
    (selectedCategory === 'prom' && selectedPromPackage.id === 'duo') ||
    (selectedCategory === 'recreational' && selectedActivity.hasTiers && selectedRecreationalTier.id === 'duo');

  const isSquad =
    (selectedCategory === 'prom' && selectedPromPackage.id === 'squad') ||
    (selectedCategory === 'recreational' && selectedActivity.hasTiers && selectedRecreationalTier.id === 'squad');

  // Validation & UI State
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [submissionTime, setSubmissionTime] = useState('');
  const [passDataUrl, setPassDataUrl] = useState('');
  const [copiedBankInfo, setCopiedBankInfo] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  // Sound & Modals
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [devMailboxOpen, setDevMailboxOpen] = useState(false);

  // Canvas Ref for Live Celestial Starfield & Lightning Gaze
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isSubmittingRef = useRef(false);

  // Ensure document scrolling
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

  // Set document title
  useEffect(() => {
    document.title =
      'Aastitva 2026 • Prom Night, Recreational Tournaments & Special Events Registration';
  }, []);

  // Scroll to top on category transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setValidationErrors({});
  }, [selectedCategory]);

  // Clear specific squad errors when tier / package changes
  useEffect(() => {
    setValidationErrors((prev) => {
      if (!prev.member2Name && !prev.member3Name && !prev.member4Name) return prev;
      const next = { ...prev };
      delete next.member2Name;
      delete next.member3Name;
      delete next.member4Name;
      return next;
    });
  }, [selectedCategory, selectedPromPackage, selectedActivity, selectedRecreationalTier]);

  // Dynamic Galactic Starfield & Lightning Gaze Atmosphere Canvas
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

    // 120 pulsating stars
    const stars: {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      pulseSpeed: number;
      color: string;
    }[] = [];

    const starColors = ['#D4AF37', '#FAF5EF', '#38BDF8', '#C084FC', '#FDE047'];

    for (let i = 0; i < 110; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // Shooting Stars / Meteors
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
      if (Math.random() < 0.35 && shootingStars.filter((s) => s.active).length < 3) {
        const palettes = ['rgba(212, 175, 55, ', 'rgba(255, 255, 255, ', 'rgba(192, 132, 252, ', 'rgba(56, 189, 248, '];
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

    // Lightning gaze background energy pulses
    let lightningTimer = 0;
    let lightningGlow = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      lightningTimer += 0.015;
      // Ambient lightning gaze pulse
      lightningGlow = Math.sin(lightningTimer) * 0.5 + 0.5;

      // 1. Radiant Atmospheric Glow
      const ambientNebula = ctx.createRadialGradient(
        width * 0.5 + (mouseX - width / 2) * 0.04,
        height * 0.35 + (mouseY - height / 2) * 0.04,
        20,
        width * 0.5,
        height * 0.4,
        width * 0.7
      );
      ambientNebula.addColorStop(0, `rgba(124, 58, 237, ${0.12 + lightningGlow * 0.06})`);
      ambientNebula.addColorStop(0.5, `rgba(212, 175, 55, ${0.08 + (1 - lightningGlow) * 0.04})`);
      ambientNebula.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ambientNebula;
      ctx.fillRect(0, 0, width, height);

      // 2. Stars Rendering
      for (const star of stars) {
        star.alpha += star.pulseSpeed;
        if (star.alpha > 0.95 || star.alpha < 0.2) {
          star.pulseSpeed = -star.pulseSpeed;
        }

        ctx.save();
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, star.alpha));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 3. Shooting Stars Rendering
      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        if (!s.active) continue;

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.018;

        if (s.alpha <= 0 || s.x > width + 100 || s.y > height + 100) {
          s.active = false;
          shootingStars.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = `${s.color}${s.alpha})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - Math.cos(s.angle) * s.length, s.y - Math.sin(s.angle) * s.length);
        ctx.stroke();
        ctx.restore();
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

  const handleCopyBankInfo = () => {
    sounds.playTap();
    const details = `Jammu & Kashmir Bank (J&K Bank)
Account Number: ${EVENT_PAYMENT_CONFIG.accountNumber}
IFSC Code: ${EVENT_PAYMENT_CONFIG.ifscCode}
Beneficiary: ${EVENT_PAYMENT_CONFIG.beneficiaryName}
Branch: ${EVENT_PAYMENT_CONFIG.branch}`;
    navigator.clipboard.writeText(details);
    setCopiedBankInfo(true);
    setTimeout(() => setCopiedBankInfo(false), 2500);
  };

  // Validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!fullName.trim()) {
      errors.fullName = 'Full Name is required.';
    } else if (fullName.trim().length < 3) {
      errors.fullName = 'Please enter your full name (at least 3 characters).';
    }

    if (!email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }

    if (!phone.trim()) {
      errors.phone = 'Contact number is required.';
    } else if (phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Please enter a valid phone number with at least 10 digits.';
    }

    if (!institution.trim()) {
      errors.institution = 'Institution / School / College name is required.';
    }

    if (selectedCategory === 'prom') {
      const parsedAge = parseInt(age, 10);
      if (!age.trim() || isNaN(parsedAge)) {
        errors.age = 'Age is required.';
      } else if (parsedAge < 18) {
        errors.age =
          'Prom Night is strictly 18+ for students who are in college or pursuing undergraduate studies.';
      }

      if (!transactionId.trim()) {
        errors.transactionId = 'Please enter your Transaction / UTR ID for verification.';
      } else if (transactionId.trim().length < 5) {
        errors.transactionId = 'Please enter a valid Transaction / UTR ID (at least 5 characters).';
      }
    }

    if (selectedCategory === 'recreational') {
      if (!transactionId.trim()) {
        errors.transactionId = 'Please enter your Transaction / UTR ID for verification.';
      } else if (transactionId.trim().length < 5) {
        errors.transactionId = 'Please enter a valid Transaction / UTR ID (at least 5 characters).';
      }
    }

    if (selectedCategory === 'special') {
      const parsedAge = parseInt(age, 10);
      if (!age.trim() || isNaN(parsedAge)) {
        errors.age = 'Age is required.';
      } else if (parsedAge < 10 || parsedAge > 90) {
        errors.age = 'Please enter a valid age.';
      }

      if (!talentDescription.trim()) {
        errors.talentDescription = 'Please describe the talent you will showcase.';
      } else if (talentDescription.trim().length < 8) {
        errors.talentDescription = 'Please provide a brief description of your act (at least 8 characters).';
      }
    }

    // Duo Validation: Ensure partner full name is provided
    if (isDuo) {
      if (!member2Name.trim()) {
        errors.member2Name = 'Partner / Member 2 full name is required for Duo registrations.';
      } else if (member2Name.trim().length < 3) {
        errors.member2Name = 'Partner name must be at least 3 characters.';
      }
    }

    // Squad Validation: Ensure all 3 squad teammates' names are provided
    if (isSquad) {
      if (!member2Name.trim()) {
        errors.member2Name = 'Teammate 2 full name is required for Squad registrations.';
      } else if (member2Name.trim().length < 3) {
        errors.member2Name = 'Teammate 2 name must be at least 3 characters.';
      }

      if (!member3Name.trim()) {
        errors.member3Name = 'Teammate 3 full name is required for Squad registrations.';
      } else if (member3Name.trim().length < 3) {
        errors.member3Name = 'Teammate 3 name must be at least 3 characters.';
      }

      if (!member4Name.trim()) {
        errors.member4Name = 'Teammate 4 full name is required for Squad registrations.';
      } else if (member4Name.trim().length < 3) {
        errors.member4Name = 'Teammate 4 name must be at least 3 characters.';
      }
    }

    if (!agreedToTerms) {
      errors.agreedToTerms = 'Please confirm that the submitted details are accurate.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSubmittingRef.current) return;
    if (!validateForm()) {
      sounds.playHover();
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    sounds.playChime();

    const category = selectedCategory || 'prom';
    let selectionId = '';
    let selectionTitle = '';
    let price = 0;
    let formattedPrice = '';
    let categoryLabel = '';

    if (category === 'prom') {
      categoryLabel = 'Prom Night';
      selectionId = selectedPromPackage.id;
      selectionTitle = selectedPromPackage.name;
      price = selectedPromPackage.price;
      formattedPrice = selectedPromPackage.formattedPrice;
    } else if (category === 'recreational') {
      categoryLabel = 'Recreational Activities';
      if (selectedActivity.hasTiers) {
        selectionId = `${selectedActivity.id}_${selectedRecreationalTier.id}`;
        selectionTitle = `${selectedActivity.name} (${selectedRecreationalTier.name})`;
        price = selectedRecreationalTier.price;
        formattedPrice = selectedRecreationalTier.formattedPrice;
      } else {
        selectionId = selectedActivity.id;
        selectionTitle = selectedActivity.name;
        price = 200;
        formattedPrice = '₹200';
      }
    } else {
      categoryLabel = 'Special Event: MUN got Latent';
      selectionId = SPECIAL_EVENT.id;
      selectionTitle = SPECIAL_EVENT.name;
      price = 0;
      formattedPrice = 'FREE';
    }

    let squadMembersFormatted = 'N/A - Solo Entry';
    let squadMembersPassText: string | undefined = undefined;

    if (isDuo) {
      squadMembersFormatted = `Member 2 (Partner): ${member2Name.trim()}`;
      squadMembersPassText = `Partner: ${member2Name.trim()}`;
    } else if (isSquad) {
      squadMembersFormatted = `Member 2: ${member2Name.trim()} | Member 3: ${member3Name.trim()} | Member 4: ${member4Name.trim()}`;
      squadMembersPassText = `M2: ${member2Name.trim()}, M3: ${member3Name.trim()}, M4: ${member4Name.trim()}`;
    }

    const payload = {
      category,
      categoryLabel,
      selectionId,
      selectionTitle,
      price,
      formattedPrice,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      institution: institution.trim(),
      age: age ? parseInt(age, 10) : undefined,
      talentDescription: category === 'special' ? talentDescription.trim() : undefined,
      transactionId: price > 0 ? transactionId.trim() : undefined,
      squadMembers: squadMembersFormatted,
      member2Name: member2Name.trim() || undefined,
      member3Name: member3Name.trim() || undefined,
      member4Name: member4Name.trim() || undefined,
      agreedToTerms: true,
    };

    let generatedTrackingId = `ACT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    let serverSyncedToGoogle = false;
    try {
      // 1. Submit to authoritative backend endpoint /api/register-event
      const serverResult = await submitEventRegistrationToServer(payload);
      if (serverResult.success && serverResult.trackingId) {
        generatedTrackingId = serverResult.trackingId;
        if (serverResult.googleFormSynced) {
          serverSyncedToGoogle = true;
        }
      }

      // 2. Also save into local mailbox cache for instant secretarial offline view
      const localEntry = {
        id: generatedTrackingId,
        timestamp: nowTime,
        schoolName: payload.institution,
        contactPerson: `${payload.fullName}${payload.age ? ` (${payload.age} yrs)` : ''}`,
        email: payload.email,
        phone: payload.phone,
        eventType: `${categoryLabel}: ${selectionTitle} [${formattedPrice}]`,
        preferredDate: '2026-10-29',
        message: `[EVENT APPLICATION - ${generatedTrackingId}]\nParticipant Name: ${payload.fullName}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nInstitution: ${payload.institution}\nCategory: ${categoryLabel}\nSelection: ${selectionTitle}\nFee: ${formattedPrice}${isDuo || isSquad ? `\nSquad / Duo Members:\n${squadMembersFormatted}` : ''}\nTransaction / UTR ID: ${payload.transactionId || (category === 'special' ? 'Free Entry' : 'Pending')}${payload.talentDescription ? `\nTalent Showcase:\n${payload.talentDescription}` : ''}`,
        status: 'New' as const,
      };
      await saveEntryToMailbox(localEntry);

      // 3. Fallback client-side Google Form dispatch ONLY IF server did not already sync
      // This strictly prevents duplicate entries in the user's Google Sheet
      if (!serverSyncedToGoogle) {
        try {
          const mapCategory = () => {
            if (category === 'prom') return 'Prom Night Gala (Strictly 18+ College / UG)';
            if (category === 'recreational') return 'Recreational Activities (Open to All Ages)';
            return 'Special Event: MUN got Latent (100% Free)';
          };

          const mapPromPackage = () => {
            if (category !== 'prom') return '• N/A - Not Applicable';
            const id = (payload.selectionId || '').toLowerCase();
            if (id === 'stag') return '• Stag Entry — ₹599';
            if (id === 'duo') return '• Duo Entry — ₹999';
            if (id === 'squad') return '• Squad Entry — ₹1,999';
            return '• Stag Entry — ₹599';
          };

          const mapRecreationActivity = () => {
            if (category !== 'recreational') return '• N/A - Not Applicable';
            const id = (payload.selectionId || '').toLowerCase();
            const isSquad = id.includes('squad');
            const isDuo = id.includes('duo');

            if (id.includes('bgmi')) {
              if (isSquad) return '• Unisex: BGMI — Squad (₹800)';
              if (isDuo) return '• Unisex: BGMI — Duo (₹450)';
              return '• Unisex: BGMI — Individual (₹250)';
            }
            if (id.includes('freefire')) {
              if (isSquad) return '• Unisex: FREE FIRE — Squad (₹800)';
              if (isDuo) return '• Unisex: FREE FIRE — Duo (₹450)';
              return '• Unisex: FREE FIRE — Individual (₹250)';
            }
            if (id.includes('ludo')) {
              if (isSquad) return '• Unisex: LUDO — Squad (₹800)';
              if (isDuo) return '• Unisex: LUDO — Duo (₹450)';
              return '• Unisex: LUDO — Individual (₹250)';
            }
            if (id.includes('mafia')) {
              if (isSquad) return '• Unisex: MAFIA — Squad (₹800)';
              if (isDuo) return '• Unisex: MAFIA — Duo (₹450)';
              return '• Unisex: MAFIA — Individual (₹250)';
            }
            if (id.includes('treasure')) return '• Unisex: TREASURE HUNT (₹200)';
            if (id.includes('charade') || id.includes('damsh') || id.includes('dumb')) return '• Unisex: DUMB CHARADES (₹200)';
            if (id === 'chess') return '• Unisex: CHESS (₹200)';
            if (id.includes('vanity') || id.includes('rapunzel') || id.includes('brush') || id.includes('hair') || id.includes('diy')) return "• Exclusively for Girls: Rapunzel's vanity (₹200)";
            if (id.includes('minute') || id.includes('win')) return '• Exclusively for Boys: Minute to Win it challenge (₹200)';
            return '• Unisex: BGMI — Individual (₹250)';
          };

          const googleFormData = new URLSearchParams({
            'entry.2071710502': mapCategory(),
            'entry.1817464805': mapPromPackage(),
            'entry.1684941164': mapRecreationActivity(),
            'entry.1040121999': payload.fullName,
            'entry.1784915256': payload.age ? String(payload.age) : 'N/A',
            'entry.1349604836': payload.phone,
            'entry.834784784': payload.email,
            'entry.826925770': payload.institution,
            'entry.564995734': payload.talentDescription || 'N/A',
            'entry.1595191915': payload.transactionId || (category === 'special' ? 'Free Entry (MUN Got Latent)' : 'Pending Verification'),
            'entry.1617953813': generatedTrackingId,
          });

          fetch('https://docs.google.com/forms/d/e/1FAIpQLSc_tPGuiQ7rBUTtBgoUd-gvtaQIDyP_SrC2_klygg6GUy0EHA/formResponse', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: googleFormData.toString(),
          }).catch(() => {});
        } catch (e) {}
      }
    } catch (err) {
      console.warn('Registration dispatch local recovery:', err);
    }

    setTimeout(() => {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTrackingId(generatedTrackingId);
      setSubmissionTime(nowTime);

      // Generate the official high-resolution Event Pass PNG with Aastitva logo
      try {
        const logoEl = document.querySelector('img[alt="Aastitva Alliances"]') as HTMLImageElement | null;
        const passUrl = generateEventPassDataUrl({
          fullName: fullName.trim(),
          category,
          categoryLabel,
          selectionTitle,
          priceFormatted: formattedPrice,
          institution: institution.trim(),
          age: age ? parseInt(age, 10) : undefined,
          trackingId: generatedTrackingId,
          logoImg: logoEl,
          teamMembers: squadMembersPassText,
        });
        setPassDataUrl(passUrl);
      } catch (err) {
        console.error('Failed to generate event pass PNG:', err);
      }

      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#FAF5EF', '#A855F7', '#38BDF8', '#F59E0B'],
      });
    }, 600);
  };

  const handleReset = () => {
    isSubmittingRef.current = false;
    sounds.playTap();
    setSelectedCategory(null);
    setSelectedPromPackage(PROM_PACKAGES[0]);
    setSelectedActivity(RECREATIONAL_ACTIVITIES[0]);
    setSelectedRecreationalTier(RECREATIONAL_TIERS[0]);
    setFullName('');
    setEmail('');
    setPhone('');
    setInstitution('');
    setAge('');
    setTalentDescription('');
    setTransactionId('');
    setAgreedToTerms(false);
    setValidationErrors({});
    setIsSubmitted(false);
    setPassDataUrl('');
  };

  return (
    <div className="min-h-screen bg-[#050811] text-[#FAF5EF] font-sans relative overflow-x-hidden selection:bg-[#D4AF37] selection:text-[#070A14] flex flex-col justify-between">
      {/* Galactic Living Starfield, Shooting Stars & Lightning Gaze Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Atmospheric Electric Neon Spotlight */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[550px] bg-gradient-to-b from-[#A855F7]/15 via-[#38BDF8]/15 to-transparent blur-[160px] pointer-events-none z-0" />

      {/* Dedicated Header Topbar */}
      <header className="sticky top-0 z-40 bg-[#070A14]/95 border-b border-[#D4AF37]/30 backdrop-blur-xl px-3 sm:px-8 py-2.5 sm:py-3.5 select-none shadow-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Aastitva Alliances Official Emblem & Designation */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="relative shrink-0">
              <img
                src="/astitva-logo.png"
                alt="Aastitva Alliances"
                className="w-9 h-9 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-[#D4AF37] shadow-[0_0_16px_rgba(212,175,55,0.45)] block bg-[#1e1442]"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="font-playfair font-extrabold text-xs sm:text-base md:text-lg text-[#FAF5EF] tracking-wide truncate">
                  Aastitva Experiences &amp; Festivities
                </span>
                <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-[#A855F7]/20 border border-[#A855F7]/50 text-[#C084FC] font-mono font-bold text-[8px] sm:text-[9px] uppercase tracking-wider shrink-0">
                  Oct 29–30, 2026
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#C4BBA3] font-mono truncate">
                Prom Night • Recreational Activities • MUN got Latent
              </p>
            </div>
          </div>

          {/* Right Navigation & Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Direct Switcher to MUN Delegate Allocation */}
            <a
              href="/register"
              onClick={() => sounds.playTap()}
              className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16203B] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#070A14] transition-all font-mono text-[10.5px] cursor-pointer shadow-sm"
              title="Switch to Model United Nations Delegate Allocation Portal"
            >
              <span>MUN Delegates</span>
              <ArrowRight className="w-3 h-3" />
            </a>

            <button
              type="button"
              onClick={() => setDevMailboxOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D1427] border border-[#D4AF37]/25 text-emerald-400 font-mono text-[10.5px] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all cursor-pointer"
              title="Open Secretariat Verification Desk"
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

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-10 flex flex-col justify-center">
        {!isSubmitted ? (
          selectedCategory === null ? (
            /* ========================================================================= */
            /* 1. COMMON INTERFACE: THREE BIGGER OPTIONS VISIBLE FIRST                   */
            /* Reference: Delegate with Accommodation vs Ordinary Delegate Selection     */
            /* ========================================================================= */
            <motion.div
              key="common-events-overview"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-6 sm:space-y-8 w-full py-2"
            >
              {/* Header Banner */}
              <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] font-mono font-bold text-xs uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                  <span>SPECIAL EXPERIENCES &amp; FESTIVITIES GATEWAY</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-extrabold text-white tracking-tight leading-tight">
                  Choose Your Conclave Experience
                </h1>

                <p className="text-xs sm:text-sm md:text-base text-[#C4BBA3] max-w-2xl mx-auto font-mono leading-relaxed">
                  Select between the glamorous <span className="text-[#C084FC] font-semibold">Prom Night</span>, thrilling <span className="text-[#38BDF8] font-semibold">Recreational Tournaments</span>, or take the spotlight at the grand <span className="text-[#FDE047] font-semibold">MUN Got Latent</span> stage.
                </p>
              </div>

              {/* THREE BIG INTERACTIVE 3D CARDS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch pt-2">
                {/* ------------------------------------------------------------- */}
                {/* OPTION 1: PROM NIGHT (18+ COLLEGE / UNDERGRADUATES)           */}
                {/* ------------------------------------------------------------- */}
                <Card3D
                  onClick={() => {
                    sounds.playChime();
                    setSelectedCategory('prom');
                  }}
                  className="bg-gradient-to-b from-[#190D2E]/95 via-[#0F081E]/95 to-[#070A14] border-2 border-[#A855F7]/60 hover:border-[#C084FC] p-6 sm:p-7 flex flex-col justify-between shadow-[0_15px_40px_rgba(168,85,247,0.25)] hover:shadow-[0_20px_55px_rgba(168,85,247,0.45)] cursor-pointer group"
                >
                  <div className="space-y-4">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="px-2.5 py-1 rounded-full bg-[#A855F7]/25 border border-[#A855F7]/50 text-[#E9D5FF] font-mono font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                        <PartyPopper className="w-3 h-3 text-[#C084FC]" />
                        <span>Prom Night Gala</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono font-bold">
                        Strictly 18+ Only
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-playfair font-black text-white group-hover:text-[#F3E5AB] transition-colors">
                        Prom Night
                      </h2>
                      <p className="text-xs text-[#E9D5FF]/80 mt-1 font-mono">
                        Evening of elegance, music, ballroom dances, and unforgettable social encounters.
                      </p>
                    </div>

                    {/* Strict 18+ Notice Banner */}
                    <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-[11px] leading-snug font-mono flex items-start gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Eligibility:</strong> Strictly for ages 18 and 18+ (currently enrolled in college or pursuing undergraduate degrees).
                      </span>
                    </div>

                    {/* Packages Breakdown */}
                    <div className="space-y-2 pt-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
                        Available Packages:
                      </div>
                      <div className="space-y-1.5">
                        {PROM_PACKAGES.map((pkg) => (
                          <div
                            key={pkg.id}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-[#090514]/80 border border-[#A855F7]/30 group-hover:border-[#A855F7]/60 transition-all text-xs"
                          >
                            <div>
                              <span className="font-bold text-white">{pkg.name}</span>
                              <span className="block text-[10.5px] text-[#C4BBA3] font-mono">{pkg.badge}</span>
                            </div>
                            <span className="font-mono font-extrabold text-[#FDE047] text-sm">
                              {pkg.formattedPrice}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Prom Activities Short Note */}
                    <div className="p-3 rounded-2xl bg-[#140B27]/80 border border-[#A855F7]/30 space-y-1.5">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#C084FC] font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#C084FC]" />
                        <span>Included Prom Activities:</span>
                      </div>
                      <ul className="text-[11px] text-[#FAF5EF]/90 space-y-1 font-mono">
                        {PROM_ACTIVITIES.map((act, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C084FC] shrink-0" />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-5">
                    <button
                      type="button"
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#C084FC] text-white font-mono font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Select Prom Night Package</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </Card3D>

                {/* ------------------------------------------------------------- */}
                {/* OPTION 2: RECREATIONAL ACTIVITIES (OPEN TO ALL AGES)          */}
                {/* ------------------------------------------------------------- */}
                <Card3D
                  onClick={() => {
                    sounds.playChime();
                    setSelectedCategory('recreational');
                  }}
                  className="bg-gradient-to-b from-[#09172B]/95 via-[#061120]/95 to-[#070A14] border-2 border-[#0284C7]/60 hover:border-[#38BDF8] p-6 sm:p-7 flex flex-col justify-between shadow-[0_15px_40px_rgba(2,132,199,0.25)] hover:shadow-[0_20px_55px_rgba(2,132,199,0.45)] cursor-pointer group"
                >
                  <div className="space-y-4">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="px-2.5 py-1 rounded-full bg-[#0284C7]/25 border border-[#0284C7]/50 text-[#BAE6FD] font-mono font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                        <Gamepad2 className="w-3 h-3 text-[#38BDF8]" />
                        <span>Tournaments &amp; Games</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
                        No Age Limit
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-playfair font-black text-white group-hover:text-[#BAE6FD] transition-colors">
                        Recreational Activities
                      </h2>
                      <p className="text-xs text-[#BAE6FD]/80 mt-1 font-mono">
                        Compete in exhilarating esports, deduction battles, intellectual chess, and creative DIYs.
                      </p>
                    </div>

                    {/* Entry Fee Badge */}
                    <div className="p-2.5 rounded-xl bg-[#0284C7]/15 border border-[#0284C7]/40 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#E0F2FE]">Entry Pricing:</span>
                      <span className="text-xs sm:text-sm font-mono font-extrabold text-[#38BDF8]">Starting from ₹200</span>
                    </div>

                    {/* Activities Categorized */}
                    <div className="space-y-3 pt-1">
                      {/* Tiered Esports & Board/Card Games Banner */}
                      <div className="p-2.5 rounded-xl bg-[#071324] border border-[#0284C7]/35 text-xs font-mono space-y-1.5">
                        <div className="flex items-center justify-between flex-wrap gap-1">
                          <span className="text-[10px] uppercase font-bold text-[#38BDF8]">
                            BGMI • FREE FIRE • LUDO • MAFIA
                          </span>
                          <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#0284C7]/20 text-[#38BDF8] border border-[#0284C7]/40 font-bold">
                            Tiered Packages
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5 text-center pt-0.5">
                          <div className="p-1 rounded-lg bg-[#09172B] border border-[#0284C7]/20">
                            <span className="text-[9px] text-[#BAE6FD] block">Individual</span>
                            <strong className="text-white text-xs">₹250</strong>
                          </div>
                          <div className="p-1 rounded-lg bg-[#09172B] border border-[#0284C7]/20">
                            <span className="text-[9px] text-[#BAE6FD] block">Duo</span>
                            <strong className="text-white text-xs">₹450</strong>
                          </div>
                          <div className="p-1 rounded-lg bg-[#09172B] border border-[#0284C7]/20">
                            <span className="text-[9px] text-[#BAE6FD] block">Squad</span>
                            <strong className="text-[#38BDF8] text-xs">₹800</strong>
                          </div>
                        </div>
                      </div>

                      {/* Other Unisex Activities */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#38BDF8] font-bold">
                          <span>Other Activities:</span>
                          <span className="text-[#FDE047] font-extrabold">₹200 each</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {['TREASURE HUNT', 'DUMB CHARADES', 'CHESS'].map(
                            (act) => (
                              <span
                                key={act}
                                className="px-2 py-1 rounded-lg bg-[#071324] border border-[#0284C7]/30 text-white font-mono text-[10.5px] font-semibold"
                              >
                                {act}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      {/* Exclusively for Girls */}
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-pink-400 font-bold flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3 text-pink-400" />
                            <span>Exclusively for girls:</span>
                          </span>
                          <span className="text-pink-300 font-bold">₹200</span>
                        </div>
                        <div className="p-2 rounded-xl bg-pink-950/30 border border-pink-500/30 text-[11px] font-mono text-pink-200">
                          Rapunzel's vanity
                        </div>
                      </div>

                      {/* Exclusively for Boys */}
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Flame className="w-3 h-3 text-amber-400" />
                            <span>Exclusively for boys:</span>
                          </span>
                          <span className="text-amber-300 font-bold">₹200</span>
                        </div>
                        <div className="p-2 rounded-xl bg-amber-950/30 border border-amber-500/30 text-[11px] font-mono text-amber-200">
                          Minute to Win it challenge
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-5">
                    <button
                      type="button"
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] text-white font-mono font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-sky-500/25 group-hover:shadow-sky-500/40 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Choose Recreational Activity</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </Card3D>

                {/* ------------------------------------------------------------- */}
                {/* OPTION 3: SPECIAL EVENT (MUN GOT LATENT - 100% FREE)          */}
                {/* ------------------------------------------------------------- */}
                <Card3D
                  onClick={() => {
                    sounds.playChime();
                    setSelectedCategory('special');
                  }}
                  className="bg-gradient-to-b from-[#251805]/95 via-[#160E03]/95 to-[#070A14] border-2 border-[#D4AF37]/70 hover:border-[#FDE047] p-6 sm:p-7 flex flex-col justify-between shadow-[0_15px_40px_rgba(212,175,55,0.25)] hover:shadow-[0_20px_55px_rgba(212,175,55,0.45)] cursor-pointer group"
                >
                  <div className="space-y-4">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/25 border border-[#D4AF37]/50 text-[#FDE047] font-mono font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                        <Mic className="w-3 h-3 text-[#FDE047]" />
                        <span>Special Event</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 text-[10px] font-mono font-extrabold uppercase animate-pulse">
                        100% Free
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-playfair font-black text-white group-hover:text-[#FDE047] transition-colors">
                        MUN got Latent
                      </h2>
                      <p className="text-xs text-[#FDE047]/80 mt-1 font-mono">
                        The ultimate conclave stage to unleash your latent genius before a celebrated jury panel.
                      </p>
                    </div>

                    {/* Official Verbatim Description */}
                    <div className="p-3.5 rounded-2xl bg-[#1B1104]/90 border border-[#D4AF37]/35 text-xs text-[#FAF5EF]/90 font-mono leading-relaxed space-y-2">
                      <div className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold flex items-center gap-1.5">
                        <Star className="w-3 h-3 text-[#D4AF37]" />
                        <span>Official Event Synopsis:</span>
                      </div>
                      <p>
                        Since there is only one special event which is{' '}
                        <strong className="text-[#FDE047]">MUN got Latent</strong> and it is{' '}
                        <strong className="text-emerald-400">absolutely free</strong>, here different individuals would get a chance to showcase their talent in front of the panel of judges.
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2 pt-1 font-mono text-[11px] text-[#C4BBA3]">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Singing, Standup, Poetry, Beatboxing &amp; More</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Live feedback from distinguished panel of judges</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Grand Trophy &amp; Official Accolades</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 font-bold" />
                        <span className="text-emerald-300 font-bold">Zero Remittance / Absolutely Free</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-5">
                    <button
                      type="button"
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#CA8A04] via-[#EAB308] to-[#FDE047] text-[#070A14] font-mono font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Register for MUN Got Latent (Free)</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </Card3D>
              </div>

              {/* Bottom Quick Switch to MUN Delegate Portal */}
              <div className="text-center pt-4">
                <a
                  href="/register"
                  onClick={() => sounds.playTap()}
                  className="inline-flex items-center gap-2 text-xs font-mono text-[#D4AF37] hover:text-[#FAF5EF] transition-colors py-2 px-4 rounded-full bg-[#16203B]/70 border border-[#D4AF37]/30 hover:border-[#D4AF37]"
                >
                  <span>Looking for Model United Nations Committees &amp; Agendas?</span>
                  <strong className="underline underline-offset-4">Register as MUN Delegate Here ↗</strong>
                </a>
              </div>
            </motion.div>
          ) : (
            /* ========================================================================= */
            /* 2. THE COMMON REGISTRATION FORM                                           */
            /* Dynamically adapts to Prom Night, Recreational Activities, or Latent      */
            /* ========================================================================= */
            <motion.div
              key="common-registration-form"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="max-w-3xl mx-auto w-full space-y-6"
            >
              {/* Back / Change Selection Header */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playTap();
                    setSelectedCategory(null);
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16203B] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#070A14] transition-all font-mono text-xs font-bold cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Change Event Selection</span>
                </button>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-[#C4BBA3]">Selected:</span>
                  <span
                    className={`font-bold px-2.5 py-0.5 rounded-full ${
                      selectedCategory === 'prom'
                        ? 'bg-[#A855F7]/25 text-[#E9D5FF] border border-[#A855F7]/40'
                        : selectedCategory === 'recreational'
                        ? 'bg-[#0284C7]/25 text-[#BAE6FD] border border-[#0284C7]/40'
                        : 'bg-[#D4AF37]/25 text-[#FDE047] border border-[#D4AF37]/40'
                    }`}
                  >
                    {selectedCategory === 'prom'
                      ? `Prom Night • ${selectedPromPackage.name} (${selectedPromPackage.formattedPrice})`
                      : selectedCategory === 'recreational'
                      ? `Recreation • ${selectedActivity.name}${selectedActivity.hasTiers ? ` (${selectedRecreationalTier.name} — ${selectedRecreationalTier.formattedPrice})` : ` (${selectedActivity.formattedPrice})`}`
                      : `Special Event • MUN got Latent (FREE)`}
                  </span>
                </div>
              </div>

              {/* Form Container */}
              <div className="bg-[#070A14]/95 border-2 border-[#D4AF37]/45 rounded-3xl p-5 sm:p-9 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden space-y-6">
                {/* Form Title & Context */}
                <div className="space-y-2 border-b border-[#D4AF37]/25 pb-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] font-mono font-bold text-[11px] uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span>
                      {selectedCategory === 'prom'
                        ? 'Prom Night Enrolment Dossier'
                        : selectedCategory === 'recreational'
                        ? 'Recreational Tournament Entry'
                        : 'MUN got Latent Audition Application'}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-playfair font-extrabold text-white">
                    {selectedCategory === 'prom'
                      ? 'Prom Night Gala Registration'
                      : selectedCategory === 'recreational'
                      ? 'Recreational Activities Registration'
                      : 'MUN got Latent Audition Registration'}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#C4BBA3] font-mono">
                    Please provide your authentic contact credentials below to issue your official conclave pass and access permissions.
                  </p>
                </div>

                {/* CATEGORY-SPECIFIC SUB-SELECTION */}
                {selectedCategory === 'prom' && (
                  <div className="space-y-4">
                    {/* STRICT 18+ ADVISORY BANNER */}
                    <div className="p-3.5 rounded-2xl bg-rose-950/40 border-2 border-rose-500/50 text-rose-200 text-xs font-mono leading-relaxed flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-rose-300 block text-sm">
                          Strict 18+ Age Requirement:
                        </strong>
                        Prom Night events are strictly restricted to individuals who are 18 and 18+ (currently enrolled in college or pursuing undergraduate degrees).
                      </div>
                    </div>

                    {/* Package Selector */}
                    <div className="space-y-2">
                      <label className="block text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                        Select Prom Night Package:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {PROM_PACKAGES.map((pkg) => {
                          const isSelected = selectedPromPackage.id === pkg.id;
                          return (
                            <div
                              key={pkg.id}
                              onClick={() => {
                                sounds.playTap();
                                setSelectedPromPackage(pkg);
                              }}
                              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                                isSelected
                                  ? 'bg-[#A855F7]/25 border-[#C084FC] shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                                  : 'bg-[#16203B]/60 border-[#D4AF37]/30 hover:border-[#D4AF37]'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-white text-xs">{pkg.name}</span>
                                <span className="font-mono font-extrabold text-[#FDE047] text-sm">
                                  {pkg.formattedPrice}
                                </span>
                              </div>
                              <span className="text-[10px] text-[#C4BBA3] font-mono mt-1">
                                {pkg.badge}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Included Prom Activities Reminder */}
                    <div className="p-3 rounded-xl bg-[#140B27]/80 border border-[#A855F7]/30 text-xs font-mono text-[#E9D5FF] space-y-1">
                      <strong className="text-[#C084FC] block text-[11px] uppercase tracking-wider">
                        Activities included in Prom Night:
                      </strong>
                      <p className="text-[11px] text-[#C4BBA3]">
                        {PROM_ACTIVITIES.join(' • ')}
                      </p>
                    </div>
                  </div>
                )}

                {selectedCategory === 'recreational' && (
                  <div className="space-y-4">
                    {/* NO AGE LIMIT BANNER */}
                    <div className="p-3 rounded-2xl bg-sky-950/40 border border-sky-500/40 text-sky-200 text-xs font-mono leading-relaxed flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>
                        <strong>Open to All:</strong> There is no age limit for recreational activities. <strong>BGMI</strong>, <strong>FREE FIRE</strong>, <strong>LUDO</strong>, and <strong>MAFIA</strong> feature Individual (₹250), Duo (₹450), and Squad (₹800) packages. All other activities are <strong>₹200 flat</strong>.
                      </span>
                    </div>

                    {/* Activity Selector */}
                    <div className="space-y-2">
                      <label className="block text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                        Select Your Recreational Activity:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                        {RECREATIONAL_ACTIVITIES.map((act) => {
                          const isSelected = selectedActivity.id === act.id;
                          return (
                            <div
                              key={act.id}
                              onClick={() => {
                                sounds.playTap();
                                setSelectedActivity(act);
                              }}
                              className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                                isSelected
                                  ? 'bg-[#0284C7]/25 border-[#38BDF8] shadow-[0_0_15px_rgba(2,132,199,0.4)]'
                                  : 'bg-[#16203B]/60 border-[#D4AF37]/30 hover:border-[#D4AF37]'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-white text-xs">{act.name}</span>
                                <span className="font-mono font-extrabold text-[#38BDF8] text-xs">
                                  {act.hasTiers ? 'From ₹250' : act.formattedPrice}
                                </span>
                              </div>
                              <span
                                className={`text-[9.5px] font-mono mt-1 ${
                                  act.hasTiers
                                    ? 'text-[#38BDF8] font-bold'
                                    : act.category === 'girls'
                                    ? 'text-pink-300 font-bold'
                                    : act.category === 'boys'
                                    ? 'text-amber-300 font-bold'
                                    : 'text-[#C4BBA3]'
                                }`}
                              >
                                {act.hasTiers ? 'Tiered Packages' : act.categoryLabel}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Tier Package Selector for BGMI, FREE FIRE, LUDO, MAFIA */}
                    {selectedActivity.hasTiers && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-[#09172B]/90 border-2 border-[#0284C7]/50 space-y-3 shadow-lg"
                      >
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">
                            Choose {selectedActivity.name} Package Tier:
                          </label>
                          <span className="text-[10px] font-mono text-[#BAE6FD] bg-[#0284C7]/30 px-2.5 py-0.5 rounded-full border border-[#0284C7]/50 font-semibold">
                            Solo • Duo • Squad
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {RECREATIONAL_TIERS.map((tier) => {
                            const isSelected = selectedRecreationalTier.id === tier.id;
                            return (
                              <div
                                key={tier.id}
                                onClick={() => {
                                  sounds.playTap();
                                  setSelectedRecreationalTier(tier);
                                }}
                                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                                  isSelected
                                    ? 'bg-[#0284C7]/35 border-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                                    : 'bg-[#101F38] border-[#0284C7]/30 hover:border-[#38BDF8]/60'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-white text-xs">{tier.name}</span>
                                  <span className="font-mono font-extrabold text-[#FDE047] text-sm">
                                    {tier.formattedPrice}
                                  </span>
                                </div>
                                <span className="text-[10px] text-[#BAE6FD] font-mono mt-1">
                                  {tier.badge}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {selectedCategory === 'special' && (
                  <div className="p-3.5 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-xs font-mono text-[#FAF5EF] leading-relaxed flex items-start gap-2.5">
                    <Star className="w-4 h-4 text-[#FDE047] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#FDE047] block text-sm">
                        MUN got Latent • 100% Free Entry:
                      </strong>
                      Here different individuals get a chance to showcase their talent in front of our distinguished panel of judges. No registration fee required.
                    </div>
                  </div>
                )}

                {/* THE ACTUAL FORM FIELDS */}
                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                        Full Legal Name <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Aarav Sharma"
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border text-white font-mono text-xs focus:outline-none focus:ring-1 transition-all ${
                            validationErrors.fullName
                              ? 'border-rose-500 focus:ring-rose-500'
                              : 'border-[#D4AF37]/35 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
                          }`}
                        />
                      </div>
                      {validationErrors.fullName && (
                        <p className="text-[11px] text-rose-400 font-mono">
                          {validationErrors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Age Field */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                        Age{' '}
                        {selectedCategory === 'prom' ? (
                          <span className="text-rose-400 font-bold">(Strictly 18+) *</span>
                        ) : selectedCategory === 'special' ? (
                          <span className="text-rose-400">*</span>
                        ) : (
                          <span className="text-[#C4BBA3] font-normal">(Optional)</span>
                        )}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder={selectedCategory === 'prom' ? 'Must be 18+' : 'e.g. 19'}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border text-white font-mono text-xs focus:outline-none focus:ring-1 transition-all ${
                          validationErrors.age
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-[#D4AF37]/35 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
                        }`}
                      />
                      {validationErrors.age && (
                        <p className="text-[11px] text-rose-400 font-mono">{validationErrors.age}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Contact Number */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                        Contact Number (Phone / WhatsApp) <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 99065 12613"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border text-white font-mono text-xs focus:outline-none focus:ring-1 transition-all ${
                          validationErrors.phone
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-[#D4AF37]/35 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
                        }`}
                      />
                      {validationErrors.phone && (
                        <p className="text-[11px] text-rose-400 font-mono">{validationErrors.phone}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="participant@astitva.org"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border text-white font-mono text-xs focus:outline-none focus:ring-1 transition-all ${
                          validationErrors.email
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-[#D4AF37]/35 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
                        }`}
                      />
                      {validationErrors.email && (
                        <p className="text-[11px] text-rose-400 font-mono">{validationErrors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Institution Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                      {selectedCategory === 'prom'
                        ? 'College / University Name'
                        : 'Institution / School / College Name'}{' '}
                      <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder={
                        selectedCategory === 'prom'
                          ? 'e.g. University of Jammu / MIET'
                          : 'e.g. Heritage School / DPS / College'
                      }
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border text-white font-mono text-xs focus:outline-none focus:ring-1 transition-all ${
                        validationErrors.institution
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-[#D4AF37]/35 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
                      }`}
                    />
                    {validationErrors.institution && (
                      <p className="text-[11px] text-rose-400 font-mono">
                        {validationErrors.institution}
                      </p>
                    )}
                  </div>

                  {/* DUO / SQUAD TEAMMATES INFORMATION */}
                  {isDuo && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 sm:p-5 rounded-2xl bg-[#09172B]/90 border-2 border-[#38BDF8]/60 shadow-[0_0_20px_rgba(56,189,248,0.2)] space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#38BDF8]" />
                          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                            Duo Partner Details
                          </span>
                        </div>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#38BDF8]/20 border border-[#38BDF8]/40 text-[#BAE6FD] font-semibold">
                          2 Participants Entry
                        </span>
                      </div>
                      <p className="text-[11px] text-[#C4BBA3] font-mono leading-relaxed">
                        You have selected a <strong className="text-white">Duo Package</strong> (
                        {selectedCategory === 'prom'
                          ? 'Prom Night Duo'
                          : `${selectedActivity.name} Duo`}
                        ). Member 1 is the primary registrant above. Please enter the full legal name of your partner (Member 2).
                      </p>
                      <div className="space-y-1.5 pt-1">
                        <label className="block text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">
                          Partner / Member 2 Full Name <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={member2Name}
                          onChange={(e) => setMember2Name(e.target.value)}
                          placeholder="e.g. Diya Sharma"
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border text-white font-mono text-xs focus:outline-none focus:ring-1 transition-all ${
                            validationErrors.member2Name
                              ? 'border-rose-500 focus:ring-rose-500'
                              : 'border-[#38BDF8]/40 focus:border-[#38BDF8] focus:ring-[#38BDF8]'
                          }`}
                        />
                        {validationErrors.member2Name && (
                          <p className="text-[11px] text-rose-400 font-mono">
                            {validationErrors.member2Name}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {isSquad && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 sm:p-5 rounded-2xl bg-[#1E1138]/90 border-2 border-[#C084FC]/60 shadow-[0_0_20px_rgba(192,132,252,0.2)] space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#C084FC]" />
                          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                            Squad Roster / Teammates Details
                          </span>
                        </div>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#C084FC]/20 border border-[#C084FC]/40 text-[#E9D5FF] font-semibold">
                          4 Participants Squad
                        </span>
                      </div>
                      <p className="text-[11px] text-[#C4BBA3] font-mono leading-relaxed">
                        You have selected a <strong className="text-white">Squad Package</strong> (
                        {selectedCategory === 'prom'
                          ? 'Prom Night Squad'
                          : `${selectedActivity.name} Squad`}
                        ). Member 1 (Lead) is the primary registrant above. Please enter the full legal names of your 3 squad teammates.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-mono font-bold text-[#E9D5FF] uppercase tracking-wider">
                            Teammate 2 Full Name <span className="text-rose-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={member2Name}
                            onChange={(e) => setMember2Name(e.target.value)}
                            placeholder="e.g. Rohan Verma"
                            className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border text-white font-mono text-xs focus:outline-none focus:ring-1 transition-all ${
                              validationErrors.member2Name
                                ? 'border-rose-500 focus:ring-rose-500'
                                : 'border-[#C084FC]/40 focus:border-[#C084FC] focus:ring-[#C084FC]'
                            }`}
                          />
                          {validationErrors.member2Name && (
                            <p className="text-[11px] text-rose-400 font-mono">
                              {validationErrors.member2Name}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-mono font-bold text-[#E9D5FF] uppercase tracking-wider">
                            Teammate 3 Full Name <span className="text-rose-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={member3Name}
                            onChange={(e) => setMember3Name(e.target.value)}
                            placeholder="e.g. Priya Gupta"
                            className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border text-white font-mono text-xs focus:outline-none focus:ring-1 transition-all ${
                              validationErrors.member3Name
                                ? 'border-rose-500 focus:ring-rose-500'
                                : 'border-[#C084FC]/40 focus:border-[#C084FC] focus:ring-[#C084FC]'
                            }`}
                          />
                          {validationErrors.member3Name && (
                            <p className="text-[11px] text-rose-400 font-mono">
                              {validationErrors.member3Name}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-mono font-bold text-[#E9D5FF] uppercase tracking-wider">
                            Teammate 4 Full Name <span className="text-rose-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={member4Name}
                            onChange={(e) => setMember4Name(e.target.value)}
                            placeholder="e.g. Kunal Singh"
                            className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border text-white font-mono text-xs focus:outline-none focus:ring-1 transition-all ${
                              validationErrors.member4Name
                                ? 'border-rose-500 focus:ring-rose-500'
                                : 'border-[#C084FC]/40 focus:border-[#C084FC] focus:ring-[#C084FC]'
                            }`}
                          />
                          {validationErrors.member4Name && (
                            <p className="text-[11px] text-rose-400 font-mono">
                              {validationErrors.member4Name}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* SPECIAL FIELD FOR "MUN got Latent": WHAT TALENT DO YOU THINK YOU CAN SHOWCASE */}
                  {selectedCategory === 'special' && (
                    <div className="space-y-1.5 pt-1">
                      <label className="block text-xs font-mono font-bold text-[#FDE047] uppercase tracking-wider">
                        {SPECIAL_EVENT.talentQuestion} <span className="text-rose-400">*</span>
                      </label>
                      <textarea
                        rows={3}
                        value={talentDescription}
                        onChange={(e) => setTalentDescription(e.target.value)}
                        placeholder="Describe your talent, act, or stage performance in detail (e.g., Standup comedy, vocal performance, instrumental music, dramatic monologue, beatboxing, mimicry, etc.)..."
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border text-white font-mono text-xs focus:outline-none focus:ring-1 transition-all ${
                          validationErrors.talentDescription
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-[#D4AF37]/35 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
                        }`}
                      />
                      {validationErrors.talentDescription && (
                        <p className="text-[11px] text-rose-400 font-mono">
                          {validationErrors.talentDescription}
                        </p>
                      )}
                    </div>
                  )}

                  {/* PAYMENT / REMITTANCE DESK (Only for Paid Events: Prom & Recreational) */}
                  {selectedCategory !== 'special' && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#080D1A] border-2 border-[#D4AF37]/40 space-y-4 pt-4">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                          <span className="font-playfair font-bold text-white text-sm">
                            Official Payment Desk &amp; Fee Remittance
                          </span>
                        </div>
                        <span className="font-mono font-extrabold text-[#FDE047] text-sm px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50">
                          Payable Amount:{' '}
                          {selectedCategory === 'prom'
                            ? selectedPromPackage.formattedPrice
                            : selectedActivity.hasTiers
                            ? selectedRecreationalTier.formattedPrice
                            : '₹200'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                        {/* Bank Transfer Details */}
                        <div className="p-3 rounded-xl bg-[#10172B] border border-[#D4AF37]/25 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[#D4AF37] font-bold text-[11px]">
                              Jammu &amp; Kashmir Bank (J&amp;K Bank)
                            </span>
                            <button
                              type="button"
                              onClick={handleCopyBankInfo}
                              className="text-[10px] text-[#D4AF37] hover:text-white flex items-center gap-1 cursor-pointer"
                            >
                              <Copy className="w-2.5 h-2.5" />
                              <span>{copiedBankInfo ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>
                          <div className="text-[11px] text-[#FAF5EF] space-y-0.5">
                            <div>
                              <span className="text-[#C4BBA3]">A/C Number:</span>{' '}
                              <strong className="text-white">{EVENT_PAYMENT_CONFIG.accountNumber}</strong>
                            </div>
                            <div>
                              <span className="text-[#C4BBA3]">IFSC Code:</span>{' '}
                              <strong className="text-white">{EVENT_PAYMENT_CONFIG.ifscCode}</strong>
                            </div>
                            <div>
                              <span className="text-[#C4BBA3]">Branch:</span> {EVENT_PAYMENT_CONFIG.branch}
                            </div>
                            <div>
                              <span className="text-[#C4BBA3]">Beneficiary:</span>{' '}
                              {EVENT_PAYMENT_CONFIG.beneficiaryName}
                            </div>
                          </div>
                        </div>

                        {/* QR Code */}
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#10172B] border border-[#D4AF37]/25">
                          <div
                            onClick={() => {
                              sounds.playTap();
                              setQrModalOpen(true);
                            }}
                            className="relative group/qr cursor-pointer shrink-0"
                            title="Click to Enlarge QR Code"
                          >
                            <img
                              src={EVENT_PAYMENT_CONFIG.qrCodeUrl}
                              alt="Payment QR Code"
                              className="w-16 h-16 rounded-lg object-contain bg-white p-1 transition-transform group-hover/qr:scale-105 border border-[#D4AF37]/50"
                            />
                            <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover/qr:opacity-100 transition-opacity">
                              <ZoomIn className="w-4 h-4 text-white drop-shadow" />
                            </div>
                          </div>
                          <div className="text-[11px] font-mono space-y-1 min-w-0">
                            <span className="text-white font-bold block">Scan &amp; Pay via UPI</span>
                            <span className="text-[#C4BBA3] block text-[10px]">
                              Supports GPay, PhonePe, Paytm &amp; all UPI banking apps.
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                sounds.playTap();
                                setQrModalOpen(true);
                              }}
                              className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-[#D4AF37] hover:text-[#FAF5EF] underline underline-offset-2 transition-colors cursor-pointer pt-0.5"
                            >
                              <Maximize2 className="w-3 h-3" />
                              <span>Enlarge QR Code</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Transaction / UTR ID Input */}
                      <div className="space-y-1.5 pt-1">
                        <label className="block text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                          Transaction / UTR Reference ID <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          placeholder="e.g. 423984729184 (12-digit UTR from banking app)"
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border text-white font-mono text-xs focus:outline-none focus:ring-1 transition-all ${
                            validationErrors.transactionId
                              ? 'border-rose-500 focus:ring-rose-500'
                              : 'border-[#D4AF37]/35 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
                          }`}
                        />
                        {validationErrors.transactionId && (
                          <p className="text-[11px] text-rose-400 font-mono">
                            {validationErrors.transactionId}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Terms & Declarations Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-1 rounded bg-[#0B1120] border-[#D4AF37]/50 text-[#D4AF37] focus:ring-0 cursor-pointer"
                      />
                      <span className="text-xs text-[#C4BBA3] font-mono leading-relaxed">
                        I hereby declare that all submitted personal details are true and accurate. I understand and agree to uphold the conclave code of conduct throughout the event.
                      </span>
                    </label>
                    {validationErrors.agreedToTerms && (
                      <p className="text-[11px] text-rose-400 font-mono mt-1">
                        {validationErrors.agreedToTerms}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3.5 px-6 rounded-2xl font-mono font-bold text-xs uppercase tracking-widest transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2.5 ${
                        isSubmitting
                          ? 'bg-[#16203B] text-[#C4BBA3] cursor-not-allowed'
                          : selectedCategory === 'prom'
                          ? 'bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#C084FC] text-white hover:scale-[1.01] shadow-purple-500/25'
                          : selectedCategory === 'recreational'
                          ? 'bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] text-white hover:scale-[1.01] shadow-sky-500/25'
                          : 'bg-gradient-to-r from-[#CA8A04] via-[#EAB308] to-[#FDE047] text-[#070A14] hover:scale-[1.01] shadow-amber-500/25'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Transmitting Enrolment Dossier...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>
                            {selectedCategory === 'special'
                              ? 'Confirm Free Audition Registration ✦'
                              : 'Complete Registration & Generate Official Pass ✦'}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )
        ) : (
          /* ========================================================================= */
          /* 3. POST-SUBMISSION CONFIRMATION & HIGH-RES EVENT PASS VIEW                */
          /* ========================================================================= */
          <motion.div
            key="confirmation-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto w-full space-y-6 text-center py-4"
          >
            <div className="bg-[#070A14]/95 border-2 border-[#D4AF37]/50 rounded-3xl p-6 sm:p-9 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] space-y-6">
              {/* Success Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs uppercase tracking-widest">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Enrolment Confirmed &amp; Dossier Secured</span>
              </div>

              {/* Title & Tracking ID */}
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-playfair font-black text-white">
                  Registration Successful!
                </h2>
                <div className="font-mono text-xs text-[#C4BBA3]">
                  Official Security Verification ID:{' '}
                  <strong className="text-[#FDE047] text-sm tracking-wider">{trackingId}</strong>
                </div>
                <div className="text-[11px] text-[#A39E8F] font-mono">Timestamp: {submissionTime}</div>
              </div>

              {/* Registration Summary Box */}
              <div className="p-4 rounded-2xl bg-[#0D1427] border border-[#D4AF37]/30 text-left font-mono text-xs space-y-2 max-w-lg mx-auto">
                <div className="flex justify-between border-b border-[#D4AF37]/15 pb-1.5">
                  <span className="text-[#C4BBA3]">Attendee:</span>
                  <span className="text-white font-bold">{fullName}</span>
                </div>
                <div className="flex justify-between border-b border-[#D4AF37]/15 pb-1.5">
                  <span className="text-[#C4BBA3]">Category:</span>
                  <span className="text-[#D4AF37] font-bold">
                    {selectedCategory === 'prom'
                      ? 'Prom Night Gala'
                      : selectedCategory === 'recreational'
                      ? 'Recreational Activities'
                      : 'Special Event'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#D4AF37]/15 pb-1.5">
                  <span className="text-[#C4BBA3]">Enrolled Item:</span>
                  <span className="text-white font-bold">
                    {selectedCategory === 'prom'
                      ? selectedPromPackage.name
                      : selectedCategory === 'recreational'
                      ? (selectedActivity.hasTiers ? `${selectedActivity.name} (${selectedRecreationalTier.name})` : selectedActivity.name)
                      : SPECIAL_EVENT.name}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#D4AF37]/15 pb-1.5">
                  <span className="text-[#C4BBA3]">Institution:</span>
                  <span className="text-white">{institution}</span>
                </div>
                {age && (
                  <div className="flex justify-between border-b border-[#D4AF37]/15 pb-1.5">
                    <span className="text-[#C4BBA3]">Age:</span>
                    <span className="text-white">{age} years</span>
                  </div>
                )}
                {(isDuo || isSquad) && (
                  <div className="border-b border-[#D4AF37]/15 pb-2 pt-1 text-xs font-mono space-y-1">
                    <span className="text-[#38BDF8] font-bold block uppercase text-[11px] text-left">
                      {isDuo ? 'Duo Partner Roster' : 'Squad Roster'}:
                    </span>
                    <div className="text-white space-y-0.5 text-left pl-2 text-[11px]">
                      <div>• Member 1 (Lead): {fullName}</div>
                      <div>• Member 2: {member2Name}</div>
                      {isSquad && member3Name && <div>• Member 3: {member3Name}</div>}
                      {isSquad && member4Name && <div>• Member 4: {member4Name}</div>}
                    </div>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#C4BBA3]">Status:</span>
                  <span className="text-emerald-400 font-bold">
                    {selectedCategory === 'special' ? 'Free Registration' : 'Verified Remittance'}
                  </span>
                </div>
              </div>

              {/* Generated Event Pass PNG Preview */}
              {passDataUrl && (
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
                    Official High-Resolution Event Access Pass:
                  </div>
                  <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-[0_10px_35px_rgba(212,175,55,0.25)] max-w-xl mx-auto">
                    <img
                      src={passDataUrl}
                      alt="Official Event Pass"
                      className="w-full h-auto block"
                    />
                  </div>

                  {/* Download & Print Buttons */}
                  <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() =>
                        downloadEventPassPng(
                          passDataUrl,
                          fullName,
                          selectedCategory === 'prom'
                            ? 'Prom_Night'
                            : selectedCategory === 'recreational'
                            ? (selectedActivity.hasTiers ? `${selectedActivity.name}_${selectedRecreationalTier.id}` : selectedActivity.name)
                            : 'MUN_Got_Latent'
                        )
                      }
                      className="py-2.5 px-5 rounded-xl bg-[#D4AF37] text-[#070A14] font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#F3E5AB] transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Event Pass PNG</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="py-2.5 px-5 rounded-xl bg-[#16203B] border border-[#D4AF37]/40 text-[#D4AF37] font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#070A14] transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Pass</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-4 flex items-center justify-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={handleReset}
                  className="py-2.5 px-5 rounded-xl bg-[#0B1120] border border-[#D4AF37]/35 text-[#FAF5EF] font-mono text-xs hover:border-[#D4AF37] transition-all cursor-pointer"
                >
                  Register Another Participant
                </button>

                <a
                  href="/"
                  className="py-2.5 px-5 rounded-xl bg-[#16203B] text-[#D4AF37] font-mono text-xs hover:text-[#FAF5EF] transition-all"
                >
                  Return to Home
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer Credentials */}
      <footer className="relative z-10 py-6 border-t border-[#D4AF37]/20 text-center font-mono text-[11px] text-[#A39E8F] space-y-1">
        <p>Aastitva Alliances 2026 • Official Events Registration Gateway</p>
        <p className="text-[10px] text-[#716B5C]">
          October 29–30, 2026 • Radisson Blu Hotel, Jammu * Subject to change under force Majeure or administrative factors.
        </p>
      </footer>

      {/* Secretarial / Developer Mailbox Modal */}
      <DeveloperMailboxModal
        isOpen={devMailboxOpen}
        onClose={() => setDevMailboxOpen(false)}
      />

      {/* Enlarged QR Code Lightbox Modal */}
      <AnimatePresence>
        {qrModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQrModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0A1020] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center relative shadow-[0_0_50px_rgba(212,175,55,0.4)] cursor-default space-y-4"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  sounds.playTap();
                  setQrModalOpen(false);
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#16203B] text-[#C4BBA3] hover:text-white hover:bg-[#D4AF37] hover:text-[#070A14] transition-all cursor-pointer"
                aria-label="Close QR Modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-[10px] font-bold uppercase tracking-wider">
                  <QrCode className="w-3 h-3" />
                  <span>Official UPI Payment QR</span>
                </div>
                <h3 className="text-lg font-playfair font-bold text-white">
                  Scan to Pay
                </h3>
                <p className="text-xs font-mono text-[#D4AF37] font-extrabold">
                  {selectedCategory === 'prom'
                    ? `Prom Night: ${selectedPromPackage.name} (${selectedPromPackage.formattedPrice})`
                    : `Recreational: ${selectedActivity.name}${selectedActivity.hasTiers ? ` (${selectedRecreationalTier.name} — ${selectedRecreationalTier.formattedPrice})` : ' (₹200)'}`}
                </p>
              </div>

              {/* Large QR Display */}
              <div className="p-3 bg-white rounded-2xl border-2 border-[#D4AF37]/60 mx-auto max-w-[260px] aspect-square flex items-center justify-center shadow-inner">
                <img
                  src={EVENT_PAYMENT_CONFIG.qrCodeUrl}
                  alt="Enlarged Payment QR Code"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              <div className="space-y-1 text-xs font-mono text-[#C4BBA3]">
                <p className="text-white font-semibold">
                  Beneficiary: {EVENT_PAYMENT_CONFIG.beneficiaryName}
                </p>
                <p className="text-[11px]">
                  Compatible with PhonePe, Google Pay, Paytm, BHIM &amp; Cred
                </p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-center gap-2">
                <a
                  href={EVENT_PAYMENT_CONFIG.qrCodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-4 rounded-xl bg-[#16203B] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#070A14] transition-all font-mono text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Resolution</span>
                </a>
                <button
                  type="button"
                  onClick={() => setQrModalOpen(false)}
                  className="py-2 px-4 rounded-xl bg-[#D4AF37] text-[#070A14] font-mono text-xs font-bold hover:bg-[#F3E5AB] transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
