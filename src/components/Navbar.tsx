import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ChevronRight, ArrowUpRight, ShieldCheck, Settings, Clock } from 'lucide-react';
import { AstitvaLogo } from './AstitvaLogo';
import { ThemeToggle } from './ThemeToggle';
import { Page, SummitConfig, CountdownTime } from '../types';

interface Props {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  summitConfig: SummitConfig;
  onOpenAudit: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<Props> = ({
  currentPage,
  onNavigate,
  summitConfig,
  onOpenAudit,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
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

  // Clean, decluttered primary navigation structure
  const navItems: { id: Page; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'offerings', label: 'Offerings' },
    { id: 'summit', label: 'Summit 2026', badge: 'LIVE' },
    { id: 'blog', label: 'Resources' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Subtle Live Countdown Ticker */}
      <div className="bg-[#070A14]/95 border-b border-[#243563]/30 text-[11px] py-1 px-4 text-[#C4BBA3] backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] font-semibold text-[10px] tracking-wider uppercase border border-[#D4AF37]/30">
              <Sparkles className="w-2.5 h-2.5 animate-pulse text-[#D4AF37]" /> Summit 2026 Countdown
            </span>
            <span className="text-[#FAF5EF] font-mono font-semibold tracking-wider">
              {countdown.days}d : {countdown.hours.toString().padStart(2, '0')}h :{' '}
              {countdown.minutes.toString().padStart(2, '0')}m :{' '}
              {countdown.seconds.toString().padStart(2, '0')}s
            </span>
            <span className="hidden sm:inline text-[#243563]">|</span>
            <span className="hidden sm:flex items-center gap-1.5 text-[#D4AF37] font-mono font-semibold text-[11px] bg-[#16203B]/80 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30 shadow-sm">
              <Clock className="w-3 h-3 text-[#D4AF37] animate-pulse shrink-0" />
              <span>IST {istTime} (UTC+5:30)</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 text-[11px]">
            <a
              href="https://aquitas-aastitva11.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 text-[#D4AF37] hover:text-[#FAF5EF] transition-colors font-medium"
            >
              <span>Aequitas Site</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            <button
              onClick={onOpenAudit}
              className="p-1 rounded text-[#9E93C4] hover:text-[#FAF5EF] transition-colors"
              title="System Diagnostics & SSL Status"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenAdmin}
              className="p-1 rounded text-[#9E93C4] hover:text-[#D4AF37] transition-colors"
              title="Edit Event Content"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>

            {/* Header Corner Theme Toggle */}
            <div className="hidden xs:block sm:block ml-1">
              <ThemeToggle variant="full" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Floating Glass Navbar Container */}
      <div className={`w-full px-3 sm:px-6 pt-2 pb-2 transition-all duration-300`}>
        <nav
          className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
            scrolled
              ? 'bg-[#0D1427]/95 backdrop-blur-xl border border-[#D4AF37]/35 shadow-[0_12px_45px_rgba(0,0,0,0.85)] py-2.5 px-4 sm:px-6'
              : 'bg-[#0D1427]/80 backdrop-blur-md border border-[#243563]/40 py-3.5 px-4 sm:px-6'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 rounded-xl p-1 transition-transform hover:scale-[1.02]"
              aria-label="Astitva Alliance Home"
            >
              <AstitvaLogo size="md" />
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2 bg-[#070A14]/75 p-1.5 rounded-xl border border-[#243563]/30 backdrop-blur-sm">
              {navItems.map((item) => {
                const active = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-4 py-2 text-xs xl:text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-1.5 ${
                      active
                        ? 'text-[#FAF5EF] font-bold bg-gradient-to-r from-[#16203B] to-[#243563] border border-[#D4AF37]/45 shadow-[0_4px_18px_rgba(212,175,55,0.18)]'
                        : 'text-[#C4BBA3] hover:text-[#FAF5EF] hover:bg-[#16203B]/50'
                    }`}
                  >
                    {item.label}
                    {item.badge && (
                      <span className="px-1.5 py-0.2 text-[9px] font-extrabold uppercase rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-[#070A14] shadow-sm animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* CTA Button & Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Header Corner Theme Switcher (Mobile fallback) */}
              <div className="block xs:hidden">
                <ThemeToggle variant="compact" />
              </div>

              <button
                onClick={() => handleNavClick('contact')}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl shimmer-btn text-[#070A14] text-xs sm:text-sm font-bold shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-95 transition-all"
              >
                <span>Partner With Us</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Mobile Menu Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-[#070A14] text-[#FAF5EF] border border-[#243563]/40 hover:bg-[#16203B] transition-colors focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center shadow-md"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6 text-[#FAF5EF]" />}
              </button>
            </div>
          </div>

          {/* Full Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-[#243563]/40 space-y-2 animate-page-enter">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {navItems.map((item) => {
                  const active = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between min-h-[48px] transition-colors ${
                        active
                          ? 'bg-[#16203B] text-[#FAF5EF] border border-[#D4AF37]/45 font-bold'
                          : 'text-[#C4BBA3] hover:bg-[#070A14] hover:text-[#FAF5EF]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.badge ? (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#D4AF37] text-[#070A14]">
                          {item.badge}
                        </span>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-[#243563]" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 flex flex-col gap-2">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full py-3 rounded-xl shimmer-btn text-[#070A14] font-bold text-center text-sm shadow-lg min-h-[48px] flex items-center justify-center gap-2"
                >
                  <span>Partner With Us</span>
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
