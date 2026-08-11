import React, { useState, useEffect } from 'react';
import { Page, SummitConfig, CountdownTime, AnalyticsStats } from './types';
import { INITIAL_SUMMIT_CONFIG } from './data';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TechnicalAuditModal } from './components/TechnicalAuditModal';
import { AdminContentDrawer } from './components/AdminContentDrawer';
import { DeveloperMailboxModal } from './components/DeveloperMailboxModal';
import { LoadingScreen } from './components/LoadingScreen';
import { GlobalBackground } from './components/GlobalBackground';
import { ScrollControls } from './components/ScrollControls';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { FounderPage } from './pages/FounderPage';
import { OfferingsPage } from './pages/OfferingsPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { SummitPage } from './pages/SummitPage';
import { SponsorsPage } from './pages/SponsorsPage';
import { BlogPage } from './pages/BlogPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [summitConfig, setSummitConfig] = useState<SummitConfig>(INITIAL_SUMMIT_CONFIG);

  // Modals / Drawers
  const [auditOpen, setAuditOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [devMailboxOpen, setDevMailboxOpen] = useState(false);

  // Live countdown state
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Analytics Stats
  const [analytics, setAnalytics] = useState<AnalyticsStats>({
    pageViews: 1420,
    uniqueVisitors: 680,
    loadTimeMs: 1120,
    ttiMs: 840,
    sslSecure: true,
    renderStatus: 'Active / Healthy (0 USD/mo)',
    cdmCachedRatio: '99.8%',
  });

  // Measure performance
  useEffect(() => {
    if (typeof window !== 'undefined' && window.performance) {
      const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navTiming) {
        const loadTime = Math.round(navTiming.loadEventEnd - navTiming.startTime) || 1120;
        const domInteractive = Math.round(navTiming.domInteractive - navTiming.startTime) || 840;
        setAnalytics((prev) => ({
          ...prev,
          loadTimeMs: loadTime > 0 ? loadTime : 1120,
          ttiMs: domInteractive > 0 ? domInteractive : 840,
        }));
      }
    }
  }, []);

  // Live countdown ticker
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

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setAnalytics((prev) => ({ ...prev, pageViews: prev.pageViews + 1 }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateConfig = (newConfig: SummitConfig) => {
    setSummitConfig(newConfig);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            summitConfig={summitConfig}
            countdown={countdown}
          />
        );
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'founder':
        return <FounderPage onNavigate={handleNavigate} />;
      case 'offerings':
        return <OfferingsPage onNavigate={handleNavigate} />;
      case 'how-it-works':
        return <HowItWorksPage onNavigate={handleNavigate} />;
      case 'summit':
        return <SummitPage summitConfig={summitConfig} countdown={countdown} onNavigate={handleNavigate} />;
      case 'sponsors':
        return <SponsorsPage onNavigate={handleNavigate} />;
      case 'blog':
        return <BlogPage onNavigate={handleNavigate} />;
      case 'faq':
        return <FAQPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            summitConfig={summitConfig}
            countdown={countdown}
          />
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#070A14] relative transition-colors duration-500">
        {/* Pre-loader Screen */}
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

        {/* Global Interactive Canvas & Ambient Lighting Background */}
        <GlobalBackground />

        {/* Top Scroll Reading Progress & Floating Scroll Top Button */}
        <ScrollControls />

        {/* Navigation Header */}
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          summitConfig={summitConfig}
          onOpenAudit={() => setAuditOpen(true)}
          onOpenAdmin={() => setAdminOpen(true)}
        />

        {/* Main Content Area with Route Transition */}
        <main key={currentPage} className="flex-1 z-10 animate-page-enter">
          {renderPage()}
        </main>

        {/* Footer */}
        <Footer 
          onNavigate={handleNavigate} 
          onOpenDevMailbox={() => setDevMailboxOpen(true)}
        />

        {/* Developer Partner Mailbox Modal */}
        <DeveloperMailboxModal
          isOpen={devMailboxOpen}
          onClose={() => setDevMailboxOpen(false)}
        />

        {/* Technical Audit Modal */}
        <TechnicalAuditModal
          isOpen={auditOpen}
          onClose={() => setAuditOpen(false)}
          stats={analytics}
        />

        {/* Admin Live Content Drawer */}
        <AdminContentDrawer
          isOpen={adminOpen}
          onClose={() => setAdminOpen(false)}
          config={summitConfig}
          onUpdateConfig={handleUpdateConfig}
        />
      </div>
    </ThemeProvider>
  );
}
