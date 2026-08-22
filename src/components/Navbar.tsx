import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Sparkles, ChevronRight, ArrowUpRight, ArrowRight, ShieldCheck, Settings, Clock, Monitor, Volume2, VolumeX } from 'lucide-react';
import { AstitvaLogo } from './AstitvaLogo';
import { ThemeToggle } from './ThemeToggle';
import { Page, SummitConfig, CountdownTime } from '../types';
import { sounds } from '../utils/soundEffects';
import { MagneticElement } from './motion/MagneticElement';

interface Props {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  summitConfig: SummitConfig;
  onOpenAudit: () => void;
  onOpenAdmin: () => void;
  onOpenOS?: () => void;
  onOpenRegister?: () => void;
}

export const Navbar: React.FC<Props> = ({
  currentPage,
  onNavigate,
  summitConfig,
  onOpenAudit,
  onOpenAdmin,
  onOpenOS,
  onOpenRegister,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [soundActive, setSoundActive] = useState(sounds.isEnabled());
  const [countdown, setCountdown] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [istTime, setIstTime] = useState<string>('');

  // Handle scroll threshold for sticky floating state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live IST Clock (Indian Standard Time)
  useEffect(() => {
    const updateIstClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setIstTime(new Date().toLocaleTimeString('en-IN', options));
    };
    updateIstClock();
    const interval = setInterval(updateIstClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Live countdown logic
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = summitConfig.targetTimestamp - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [summitConfig.targetTimestamp]);

  // Primary navigation items
  const navItems: { id: Page; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About', badge: 'FOUNDER' },
    { id: 'offerings', label: 'Offerings' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'summit', label: 'Current Summit', badge: 'LIVE' },
    { id: 'faq', label: 'FAQ' },
  ];

  const handleNavClick = (page: Page) => {
    sounds.playTap();
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 select-none">
      {/* Top Subtle Live Status Bar */}
      <div className="bg-[#070A14]/98 border-b border-[#D4AF37]/20 text-[10px] sm:text-[11px] py-1 px-3 sm:px-6 text-[#C4BBA3] backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Countdown (Visible on both Mobile & Desktop) */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden whitespace-nowrap py-0.5">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] font-semibold text-[9px] sm:text-[10px] tracking-wider uppercase border border-[#D4AF37]/30 shrink-0">
              <Sparkles className="w-2.5 h-2.5 animate-pulse text-[#D4AF37]" />
              <span className="hidden xs:inline">Summit</span> 2026
            </span>
            <span className="text-[#FAF5EF] font-mono font-semibold tracking-wider text-[10px] sm:text-xs">
              {countdown.days}d : {countdown.hours.toString().padStart(2, '0')}h :{' '}
              {countdown.minutes.toString().padStart(2, '0')}m
              <span className="hidden sm:inline"> : {countdown.seconds.toString().padStart(2, '0')}s</span>
            </span>
            <span className="hidden lg:inline text-[#243563]">|</span>
            <span className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] font-mono font-bold text-[10px] uppercase tracking-wider border border-[#D4AF37]/30 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-[#D4AF37] animate-pulse" />
              <span>Academic Event Management + Network Organisation</span>
            </span>
          </div>

          {/* Right: Quick Controls & Theme */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 text-[11px]">
            {onOpenOS && (
              <MagneticElement strength={0.25}>
                <button
                  onClick={() => {
                    sounds.playChime();
                    onOpenOS();
                  }}
                  className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#16203B] text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-[#070A14] transition-all font-mono font-bold shadow-sm cursor-pointer"
                  title="Switch to Retro-Futuristic Astitva OS Environment"
                >
                  <Monitor className="w-3 h-3" />
                  <span>Astitva OS</span>
                </button>
              </MagneticElement>
            )}

            <MagneticElement strength={0.2}>
              <a
                href="https://aquitas-aastitva11.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1 text-[#D4AF37] hover:text-[#FAF5EF] transition-colors font-medium smooth-button-hover group px-2 py-0.5 rounded-lg"
              >
                <span>Aequitas Site</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </MagneticElement>

            {/* Sound FX Synthesizer Toggle */}
            <MagneticElement strength={0.3}>
              <button
                onClick={() => {
                  const isNowOn = sounds.toggleSound();
                  setSoundActive(isNowOn);
                }}
                className={`p-1 sm:p-1.5 rounded-full border transition-all cursor-pointer ${
                  soundActive
                    ? 'bg-[#D4AF37] text-[#070A14] border-[#D4AF37] shadow-[0_0_10px_#D4AF37]'
                    : 'bg-[#16203B] text-[#C4BBA3] border-[#D4AF37]/30 hover:text-[#FAF5EF]'
                }`}
                title={soundActive ? 'Sound FX Enabled (Web Audio API)' : 'Enable Futuristic Sound FX'}
              >
                {soundActive ? <Volume2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> : <VolumeX className="w-3 sm:w-3.5 h-3 sm:h-3.5" />}
              </button>
            </MagneticElement>

            <button
              onClick={() => {
                sounds.playTap();
                onOpenAudit();
              }}
              className="p-1 rounded text-[#9E93C4] hover:text-[#FAF5EF] transition-colors cursor-pointer"
              title="System Diagnostics & SSL Status"
            >
              <ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            </button>

            <button
              onClick={() => {
                sounds.playTap();
                onOpenAdmin();
              }}
              className="p-1 rounded text-[#9E93C4] hover:text-[#D4AF37] transition-colors cursor-pointer"
              title="Edit Event Content"
            >
              <Settings className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            </button>

            <ThemeToggle variant="compact" className="ml-0.5" />
          </div>
        </div>
      </div>

      {/* Main Floating Glass Navbar Container */}
      <div className="w-full px-2.5 sm:px-6 pt-1.5 sm:pt-2 pb-1.5 sm:pb-2 transition-all duration-300">
        <nav
          className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 overflow-hidden ${
            scrolled
              ? 'bg-[#0D1427]/95 backdrop-blur-xl border border-[#D4AF37]/45 shadow-[0_14px_45px_rgba(0,0,0,0.9)] py-2 px-3 sm:px-6'
              : 'bg-[#0D1427]/85 backdrop-blur-md border border-[#D4AF37]/25 hover:border-[#D4AF37]/45 py-2 sm:py-3 px-3 sm:px-6'
          }`}
        >
          <div className="flex items-center justify-between gap-1.5 sm:gap-6 w-full">
            {/* Brand Logo - Stable, Clean & Static Anchor */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 rounded-xl p-0.5 shrink-0 min-w-0 max-w-[62vw] xs:max-w-[70vw] sm:max-w-none cursor-pointer"
              aria-label="Aastitva Alliance Home"
            >
              <AstitvaLogo size="sm" />
            </button>

            {/* Desktop Navigation Links with Smooth Indicator Glide */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2 bg-[#070A14]/85 p-1.5 rounded-xl border border-[#D4AF37]/30 backdrop-blur-md shrink-0 shadow-inner relative">
              {navItems.map((item) => {
                const active = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={() => sounds.playHover()}
                    className={`relative px-3 xl:px-4 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-colors duration-200 flex items-center gap-1.5 whitespace-nowrap z-10 cursor-pointer ${
                      active
                        ? 'text-[#FAF5EF] font-bold'
                        : 'text-[#C4BBA3] hover:text-[#FAF5EF]'
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="navbarActiveIndicator"
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#16203B] via-[#243563] to-[#16203B] border border-[#D4AF37]/60 shadow-[0_2px_14px_rgba(212,175,55,0.25)] -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.2 text-[8px] font-extrabold uppercase rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-[#070A14] shadow-sm animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* CTA Button & Mobile Toggle with Magnetic Response */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <MagneticElement strength={0.35}>
                <button
                  onClick={() => {
                    sounds.playTap();
                    if (onOpenRegister) {
                      onOpenRegister();
                    } else {
                      handleNavClick('summit');
                    }
                  }}
                  className="inline-flex items-center gap-1 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-xl shimmer-btn text-[#070A14] text-[11px] sm:text-sm font-extrabold shadow-[0_4px_20px_rgba(212,175,55,0.35)] btn-sheen-sweep group whitespace-nowrap shrink-0 border border-[#FAF5EF]/30 cursor-pointer min-h-[38px] sm:min-h-[44px]"
                >
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                  <span className="hidden xs:inline">Partner With Us</span>
                  <span className="xs:hidden">Partner</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </MagneticElement>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => {
                  sounds.playTap();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="lg:hidden p-2 rounded-xl bg-[#070A14] text-[#FAF5EF] border border-[#D4AF37]/50 hover:bg-[#16203B] transition-colors focus:outline-none min-w-[38px] min-h-[38px] flex items-center justify-center shadow-md shrink-0 cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4 text-[#D4AF37]" /> : <Menu className="w-4 h-4 text-[#FAF5EF]" />}
              </button>
            </div>
          </div>

          {/* DEDICATED MOBILE HORIZONTAL NAVIGATION BAR (Visible at the header for instant 1-tap browsing) */}
          <div className="lg:hidden mt-2 pt-2 border-t border-[#D4AF37]/20 flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 -mx-1 px-1">
            {navItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap shrink-0 flex items-center gap-1 transition-all cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8A53E] text-[#070A14] shadow-[0_0_15px_rgba(212,175,55,0.45)] font-extrabold border border-[#FFF5DC]'
                      : 'bg-[#070A14]/80 text-[#C4BBA3] border border-[#D4AF37]/25 hover:text-[#FAF5EF] hover:border-[#D4AF37]/60'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`px-1 py-0.1 text-[7.5px] font-extrabold uppercase rounded-full ${
                        active ? 'bg-[#070A14] text-[#D4AF37]' : 'bg-[#D4AF37] text-[#070A14]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Full Mobile Navigation Drawer (Expanded Menu) */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-[#D4AF37]/30 space-y-2 animate-page-enter">
              <div className="grid grid-cols-1 gap-1.5">
                {navItems.map((item) => {
                  const active = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between min-h-[44px] transition-colors ${
                        active
                          ? 'bg-gradient-to-r from-[#16203B] to-[#243563] text-[#FAF5EF] border border-[#D4AF37] font-bold shadow-md'
                          : 'bg-[#070A14]/60 text-[#C4BBA3] border border-[#D4AF37]/20 hover:bg-[#16203B] hover:text-[#FAF5EF]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge ? (
                        <span className="px-2 py-0.5 text-[9px] font-extrabold rounded-full bg-[#D4AF37] text-[#070A14]">
                          {item.badge}
                        </span>
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]/60" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex flex-col gap-2">
                {onOpenOS && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenOS();
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#16203B] border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <Monitor className="w-4 h-4" />
                    <span>Launch Astitva OS Environment</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenRegister) {
                      onOpenRegister();
                    } else {
                      handleNavClick('summit');
                    }
                  }}
                  className="w-full py-2.5 rounded-xl shimmer-btn text-[#070A14] font-bold text-center text-xs shadow-lg min-h-[44px] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>Partner With Us / Reserve Seat</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
