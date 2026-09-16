'use client';

import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-500 via-amber-500 to-primary-600 z-[60] pointer-events-none"
      style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
    />
  );
}

