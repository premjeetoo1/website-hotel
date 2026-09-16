'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check initial scroll position on mount
    toggleVisibility();

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          key="scroll-to-top"
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-dark-900/80 hover:bg-dark-900 text-white backdrop-blur-md border border-white/10 shadow-lg shadow-black/25 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-950 group"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 text-white group-hover:text-primary-400 group-hover:-translate-y-0.5 transition-all duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
