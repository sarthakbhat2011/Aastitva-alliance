import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollControls: React.FC = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
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
      {/* Scroll Reading Progress Bar at the top of the viewport */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#FFF5DC] to-[#D4AF37] z-50 origin-left shadow-[0_0_15px_rgba(212,175,55,0.8)]"
        style={{ scaleX }}
      />

      {/* Floating Back to Top Button */}
      {showTopBtn && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          aria-label="Scroll back to top of page"
          title="Scroll to Top"
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-[#070A14]/85 border border-[#D4AF37]/50 text-[#D4AF37] hover:text-white hover:bg-[#D4AF37] hover:border-[#D4AF37] shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 group min-touch focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        >
          <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
        </motion.button>
      )}
    </>
  );
};
