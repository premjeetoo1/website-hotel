'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export interface Toast {
  id: string;
  itemName: string;
}

interface CartToastContextType {
  showToast: (itemName: string) => void;
}

const CartToastContext = createContext<CartToastContextType | undefined>(undefined);

export function CartToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (itemName: string) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      setToasts((prev) => [...prev, { id, itemName }]);

      setTimeout(() => {
        removeToast(id);
      }, 2000);
    },
    [removeToast]
  );

  return (
    <CartToastContext.Provider value={{ showToast }}>
      {children}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none w-max max-w-[90vw]"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex items-center gap-2.5 rounded-2xl bg-dark-900/95 text-white backdrop-blur-md px-5 py-3 shadow-xl pointer-events-auto border border-white/10"
            >
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0" aria-hidden="true" />
              <span className="text-sm font-medium text-white">
                <span className="font-semibold">{toast.itemName}</span>{' '}
                <span className="text-gray-300">added to bag</span>
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </CartToastContext.Provider>
  );
}

export function useCartToast(): CartToastContextType {
  const context = useContext(CartToastContext);
  if (!context) {
    throw new Error('useCartToast must be used within a CartToastProvider');
  }
  return context;
}

export default CartToastProvider;
