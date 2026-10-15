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

const isOsRequested = () => {
  if (typeof window === 'undefined') return false;
  const search = window.location.search.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  return search.includes('mode=os') || search.includes('os=true') || hash === '#os';
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
  const [isStandaloneRegister, setIsStandaloneRegister] = useState(isRegistrationUrl);
  const [isStandaloneSponsors, setIsStandaloneSponsors] = useState(isSponsorshipUrl);
  const [osMode, setOsMode] = useState<boolean>(isOsRequested); // Defaults to main website homepage
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lock body & document scroll when in OS Mode to prevent background web app from leaking on mobile scroll
  useEffect(() => {
    if (isStandaloneRegister || isStandaloneSponsors) {
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
  }, [osMode, isStandaloneRegister, isStandaloneSponsors]);

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

  // Dedicated Autonomous Registration Portal
  if (isStandaloneRegister) {
    return (
      <ThemeProvider>
        <AequitasRegistrationPage />
      </ThemeProvider>
    );
  }

  // Dedicated Autonomous Sponsorship Proposal Portal
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
              handleEnterSiteFromOS(page);
            }
          }}
          onOpenRegister={handleOpenRegisterPortal}
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
