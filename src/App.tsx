import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Page, SummitConfig, CountdownTime } from './types';
import { INITIAL_SUMMIT_CONFIG, calculateCountdown } from './data';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DeveloperMailboxModal } from './components/DeveloperMailboxModal';
import { GlobalRegistrationModal } from './components/GlobalRegistrationModal';
import { CelestialOrbWidget } from './components/CelestialOrbWidget';
import { AstitvaOSLoader } from './components/AstitvaOSLoader';
import { GlobalBackground } from './components/GlobalBackground';
import { ScrollControls } from './components/ScrollControls';
import { SpatialAtmosphere } from './components/motion/SpatialAtmosphere';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { FounderPage } from './pages/FounderPage';
import { OfferingsPage } from './pages/OfferingsPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { SummitPage } from './pages/SummitPage';
import { SponsorsPage } from './pages/SponsorsPage';
import { FAQPage } from './pages/FAQPage';
import { AequitasRegistrationPage } from './pages/AequitasRegistrationPage';
import { BlogsPage } from './pages/BlogsPage';
import { ComingSoonScreen } from './components/ComingSoonScreen';

const checkSiteUnlocked = () => {
  if (typeof window === 'undefined') return false;
  const search = window.location.search.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  if (
    search.includes('dev=bhatsarthakunrivalledunion2011,2001') ||
    search.includes('dev=true') ||
    search.includes('dev=preview') ||
    search.includes('unlock=true') ||
    search.includes('mailbox') ||
    path.startsWith('/mailbox')
  ) {
    sessionStorage.setItem('astitva_site_unlocked', 'true');
    return true;
  }
  return sessionStorage.getItem('astitva_site_unlocked') === 'true';
};

const checkMailboxRequested = () => {
  if (typeof window === 'undefined') return false;
  const search = window.location.search.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  return (
    search.includes('mailbox=true') ||
    search.includes('mailbox') ||
    search.includes('dev=mailbox') ||
    path.startsWith('/mailbox') ||
    hash === '#mailbox'
  );
};

const isRegistrationUrl = () => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const search = window.location.search.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  return (
    path.startsWith('/register') ||
    path.startsWith('/registration') ||
    search.includes('mode=register') ||
    search.includes('tab=register') ||
    search.includes('page=register') ||
    search.includes('form=register') ||
    hash === '#register' ||
    hash === '#registration'
  );
};

const isSponsorshipUrl = () => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const search = window.location.search.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  return (
    path.startsWith('/sponsor') ||
    path.startsWith('/sponsorship') ||
    path.startsWith('/offer-sponsorship') ||
    search.includes('mode=sponsor') ||
    search.includes('tab=sponsor') ||
    search.includes('page=sponsor') ||
    search.includes('mode=sponsorship') ||
    search.includes('tab=sponsorship') ||
    hash === '#sponsor' ||
    hash === '#sponsors' ||
    hash === '#sponsorship' ||
    hash === '#sponsorships'
  );
};

const isBlogsUrl = () => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const search = window.location.search.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  return (
    path.startsWith('/blogs') ||
    path.startsWith('/blog') ||
    search.includes('page=blogs') ||
    search.includes('page=blog') ||
    search.includes('tab=blogs') ||
    search.includes('tab=blog') ||
    hash === '#blogs' ||
    hash === '#blog'
  );
};

export default function App() {
  const [isSiteUnlocked, setIsSiteUnlocked] = useState<boolean>(checkSiteUnlocked);
  const [isStandaloneRegister, setIsStandaloneRegister] = useState(isRegistrationUrl);
  const [isStandaloneSponsors, setIsStandaloneSponsors] = useState(isSponsorshipUrl);
  const [osMode, setOsMode] = useState(true); // Boots into Astitva OS initially
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [summitConfig, setSummitConfig] = useState<SummitConfig>(INITIAL_SUMMIT_CONFIG);

  // Global Modals / Drawers
  const [devMailboxOpen, setDevMailboxOpen] = useState<boolean>(checkMailboxRequested);
  const [globalRegisterOpen, setGlobalRegisterOpen] = useState(false);

  // Live countdown state
  const [countdown, setCountdown] = useState<CountdownTime>(() =>
    calculateCountdown(INITIAL_SUMMIT_CONFIG.targetTimestamp)
  );

  // Live countdown ticker
  useEffect(() => {
    const updateCountdown = () => {
      setCountdown(calculateCountdown(summitConfig.targetTimestamp));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [summitConfig.targetTimestamp]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setAnalytics((prev) => ({ ...prev, pageViews: prev.pageViews + 1 }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lock body & document scroll when in OS Mode to prevent background web app from leaking on mobile scroll
  // (Strictly bypassed on standalone registration portal and Coming Soon screen to allow full natural scrolling)
  useEffect(() => {
    if (isStandaloneRegister || isStandaloneSponsors || !isSiteUnlocked) {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      document.body.style.touchAction = 'auto';
      return;
    }

    if (osMode) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [osMode, isStandaloneRegister, isStandaloneSponsors, isSiteUnlocked]);

  // Deep link & route listener for standalone registration portal & sponsorships
  useEffect(() => {
    const handleLocationChange = () => {
      setIsStandaloneRegister(isRegistrationUrl());
      setIsStandaloneSponsors(isSponsorshipUrl());
      if (checkMailboxRequested()) {
        setDevMailboxOpen(true);
      }
      if (isBlogsUrl()) {
        setOsMode(false);
        setCurrentPage('blogs');
      }
    };
    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleOpenRegisterPortal = () => {
    window.open('/register', '_blank', 'noopener,noreferrer');
  };

  // Listen for site re-lock command
  useEffect(() => {
    const handleLock = () => {
      sessionStorage.removeItem('astitva_site_unlocked');
      setIsSiteUnlocked(false);
    };
    window.addEventListener('astitva_lock_site', handleLock);
    return () => window.removeEventListener('astitva_lock_site', handleLock);
  }, []);

  // Dedicated Autonomous Registration Portal (Exception: never blocked by Coming Soon)
  if (isStandaloneRegister) {
    return (
      <ThemeProvider>
        <AequitasRegistrationPage />
      </ThemeProvider>
    );
  }

  // Dedicated Autonomous Sponsorship Proposal Portal (Exception: never blocked by Coming Soon for approaching firms)
  if (isStandaloneSponsors) {
    return (
      <ThemeProvider>
        <SponsorsPage
          isStandalone={true}
          onNavigate={(page) => {
            if (page === 'home') {
              window.location.href = '/';
            } else {
              setIsStandaloneSponsors(false);
              setIsSiteUnlocked(true);
              handleEnterSiteFromOS(page);
            }
          }}
          onOpenRegister={handleOpenRegisterPortal}
        />
      </ThemeProvider>
    );
  }

  // Pre-Launch Gate Screen (Coming Soon with buzz, quotes, countdown, and hidden developer gate)
  if (!isSiteUnlocked) {
    return (
      <ThemeProvider>
        <ComingSoonScreen
          onUnlock={() => setIsSiteUnlocked(true)}
          onOpenDevMailbox={() => setDevMailboxOpen(true)}
          onOpenRegister={handleOpenRegisterPortal}
          onOpenSponsors={() => setIsStandaloneSponsors(true)}
          countdown={countdown}
        />
        <DeveloperMailboxModal
          isOpen={devMailboxOpen}
          onClose={() => setDevMailboxOpen(false)}
        />
      </ThemeProvider>
    );
  }

  const handleEnterSiteFromOS = (targetPage: Page = 'home') => {
    setOsMode(false);
    setCurrentPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            summitConfig={summitConfig}
            countdown={countdown}
            onOpenRegister={handleOpenRegisterPortal}
          />
        );
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'founder':
        return <FounderPage onNavigate={handleNavigate} />;
      case 'offerings':
        return (
          <OfferingsPage
            onNavigate={handleNavigate}
            onOpenRegister={handleOpenRegisterPortal}
          />
        );
      case 'how-it-works':
        return (
          <HowItWorksPage
            onNavigate={handleNavigate}
            onOpenRegister={handleOpenRegisterPortal}
          />
        );
      case 'summit':
        return (
          <SummitPage
            summitConfig={summitConfig}
            countdown={countdown}
            onNavigate={handleNavigate}
          />
        );
      case 'sponsors':
        return (
          <SponsorsPage
            onNavigate={handleNavigate}
            onOpenRegister={handleOpenRegisterPortal}
          />
        );
      case 'faq':
        return <FAQPage />;
      case 'blogs':
      case 'blog':
        return (
          <BlogsPage
            onNavigate={handleNavigate}
            onOpenRegister={handleOpenRegisterPortal}
          />
        );
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            summitConfig={summitConfig}
            countdown={countdown}
            onOpenRegister={handleOpenRegisterPortal}
          />
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#070A14] relative transition-colors duration-500">
        {/* Interactive Retro-Futuristic Astitva OS Environment */}
        {osMode && (
          <AstitvaOSLoader
            onEnterSite={handleEnterSiteFromOS}
            onOpenRegister={handleOpenRegisterPortal}
            onOpenDevMailbox={() => setDevMailboxOpen(true)}
          />
        )}

        {/* Global Interactive Canvas & Dynamic Galactic Nebula Constellation Background */}
        <GlobalBackground currentPage={currentPage} />

        {/* Multi-Depth Spatial Environment Atmosphere with Passing Cross-Viewport Traversers */}
        <SpatialAtmosphere />

        {/* Top Scroll Reading Progress & Floating Scroll Top Button */}
        {!osMode && <ScrollControls />}

        {/* Floating 3D Celestial Planet Core Quick Portal Widget */}
        {!osMode && (
          <CelestialOrbWidget
            onOpenRegister={handleOpenRegisterPortal}
            onOpenOS={() => setOsMode(true)}
          />
        )}

        {/* Navigation Header */}
        {!osMode && (
          <Navbar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            summitConfig={summitConfig}
            onOpenOS={() => setOsMode(true)}
            onOpenRegister={handleOpenRegisterPortal}
          />
        )}

        {/* Main Content Area with Seamless Motion Route Transition (Only rendered when OS mode is false) */}
        {!osMode && (
          <AnimatePresence mode="wait">
            <motion.main
              key={currentPage}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 z-10"
            >
              {renderPage()}
            </motion.main>
          </AnimatePresence>
        )}

        {/* Footer (Only rendered when OS mode is false) */}
        {!osMode && (
          <Footer 
            onNavigate={handleNavigate} 
            onOpenDevMailbox={() => setDevMailboxOpen(true)}
            onOpenRegister={handleOpenRegisterPortal}
          />
        )}

        {/* Global Delegate Registration Modal */}
        <GlobalRegistrationModal
          isOpen={globalRegisterOpen}
          onClose={() => setGlobalRegisterOpen(false)}
        />

        {/* Developer Partner Mailbox Modal */}
        <DeveloperMailboxModal
          isOpen={devMailboxOpen}
          onClose={() => setDevMailboxOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}
