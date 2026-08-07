import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollControls: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      setShowScrollTop(window.scrollY > 250);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Top Scroll Reading Progress Line */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[#171026]/40 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFF5DC] to-[#D4AF37] transition-all duration-150 shadow-[0_0_10px_rgba(212,175,55,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Scroll To Top Button with Radial Progress Ring */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#231B42]/90 border border-[#D4AF37]/40 text-[#FAF5EF] shadow-2xl backdrop-blur-md transition-all duration-300 transform hover:scale-110 active:scale-95 group focus:outline-none ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
        aria-label="Scroll to top of page"
      >
        {/* SVG Progress Circle Ring */}
        <svg className="w-8 h-8 absolute inset-0 -rotate-90 pointer-events-none" viewBox="0 0 36 36">
          <path
            className="text-[#52459E]/30"
            strokeWidth="3"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-[#D4AF37] transition-all duration-150"
            strokeDasharray={`${scrollProgress}, 100`}
            strokeWidth="3"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>

        <ArrowUp className="w-5 h-5 text-[#D4AF37] group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </>
  );
};
