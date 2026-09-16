'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Non-intrusive delay of 2 seconds before showing button
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="whatsapp-floating-container"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-20 left-6 z-40 flex items-center"
        >
          {/* Floating WhatsApp Action Button */}
          <motion.a
            href="https://wa.me/919563161422?text=Hi!%20I'd%20like%20to%20order%20or%20book%20a%20table%20at%20Aaroshi%20Hotel%20%26%20Family%20Restaurant%20Chalsa"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            aria-label="Chat on WhatsApp"
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1fb855] text-white shadow-lg shadow-green-600/30 transition-colors focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-white"
          >
            {/* Subtle pulsing green ring */}
            <span
              aria-hidden="true"
              className="absolute -inset-1 rounded-full bg-[#25D366] pointer-events-none animate-ping motion-reduce:animate-none opacity-30"
            />

            {/* Classic phone-in-chat-bubble WhatsApp inline SVG */}
            <svg
              className="w-7 h-7 fill-current text-white relative z-10"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.201.3-.778.98-.954 1.18-.175.2-.351.226-.652.076-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.676-2.085-.175-.3-.019-.462.132-.612.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.238-.244-.588-.493-.509-.678-.518-.176-.009-.376-.01-.577-.01s-.527.075-.803.376c-.276.301-1.054 1.03-1.054 2.512 0 1.482 1.079 2.912 1.23 3.113.15.2 2.122 3.24 5.141 4.542.718.31 1.279.495 1.716.634.721.229 1.377.197 1.895.12.578-.087 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.076-.125-.277-.2-.578-.35zm-5.468 7.562a9.88 9.88 0 0 1-5.034-1.378l-.361-.215-3.741.982.999-3.648-.236-.375a9.865 9.865 0 0 1-1.514-5.26c0-5.452 4.437-9.888 9.89-9.888 2.64 0 5.122 1.029 6.987 2.894a9.825 9.825 0 0 1 2.895 6.994c-.003 5.451-4.44 9.889-9.886 9.889zm8.413-18.3c-2.246-2.248-5.232-3.487-8.413-3.488C5.455.156.12 5.492.117 12.049c0 2.097.546 4.142 1.587 5.946L.017 24.156l6.305-1.654a11.85 11.85 0 0 0 5.688 1.448h.005c6.555 0 11.89-5.335 11.893-11.892a11.815 11.815 0 0 0-3.48-8.414z" />
            </svg>
          </motion.a>

          {/* Tooltip sliding in from left on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: -10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -6, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute left-full ml-3 pointer-events-none z-50 flex items-center whitespace-nowrap"
                role="tooltip"
              >
                <div className="relative flex items-center bg-dark-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl backdrop-blur-md border border-white/15">
                  <span
                    className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-[6px] border-r-dark-900/90"
                    aria-hidden="true"
                  />
                  <span>Chat on WhatsApp</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
