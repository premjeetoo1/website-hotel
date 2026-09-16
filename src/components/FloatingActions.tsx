'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, CalendarCheck } from 'lucide-react';

export default function FloatingActions() {
  const { totalItems, setIsCartOpen, openReservation } = useCart();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      <div className="flex items-center gap-3 pointer-events-auto">
        {/* Table Reservation Button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={openReservation}
          className="hidden sm:inline-flex items-center gap-2 px-4 py-3 bg-dark-900/90 hover:bg-dark-950 text-white rounded-full shadow-xl backdrop-blur-md border border-white/10 text-xs font-semibold tracking-wide transition-all group"
        >
          <CalendarCheck className="w-4 h-4 text-primary-400 group-hover:rotate-12 transition-transform" />
          <span>Book Table</span>
        </motion.button>

        {/* Cart Trigger Button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsCartOpen(true)}
          className="relative inline-flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white rounded-full shadow-2xl shadow-primary-600/40 border border-primary-400/30 text-sm font-bold transition-all"
          aria-label="View shopping bag"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="hidden sm:inline">My Order</span>

          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-black bg-white text-primary-600 rounded-full shadow-sm"
              >
                {totalItems}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
