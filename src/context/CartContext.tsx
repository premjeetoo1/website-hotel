'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';

export interface CartItem {
  id: string | number;
  name: string;
  bengaliName?: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: { id: string | number; name: string; price: number | string; image?: string; bengaliName?: string }) => void;
  removeItem: (id: string | number) => void;
  updateQuantity: (id: string | number, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  openReservation: () => void;
  closeReservation: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const isLoaded = useRef(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aaroshi_hotel_cart') || localStorage.getItem('hotel_mahakal_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // ignore
    }
    isLoaded.current = true;
  }, []);

  // Save cart to localStorage (only after initial load)
  useEffect(() => {
    if (!isLoaded.current) return;
    try {
      localStorage.setItem('aaroshi_hotel_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const parsePrice = (price: number | string): number => {
    if (typeof price === 'number') return price;
    const clean = price.replace(/[^0-9.]/g, '');
    return parseFloat(clean) || 0;
  };

  const addItem = useCallback((item: { id: string | number; name: string; price: number | string; image?: string; bengaliName?: string }) => {
    const numPrice = parsePrice(item.price);
    setItems((prev) => {
      const existing = prev.find((i) => String(i.id) === String(item.id));
      if (existing) {
        return prev.map((i) =>
          String(i.id) === String(item.id) ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          bengaliName: item.bengaliName,
          price: numPrice,
          quantity: 1,
          image: item.image,
        },
      ];
    });
    // Don't auto-open drawer — toast notification handles the feedback
  }, []);

  const removeItem = useCallback((id: string | number) => {
    setItems((prev) => prev.filter((i) => String(i.id) !== String(id)));
  }, []);

  const updateQuantity = useCallback((id: string | number, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (String(i.id) === String(id)) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter((i): i is CartItem => i !== null)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = Math.round(items.reduce((acc, i) => acc + i.price * i.quantity, 0) * 100) / 100;

  const openReservation = useCallback(() => setIsReservationOpen(true), []);
  const closeReservation = useCallback(() => setIsReservationOpen(false), []);

  const value = useMemo(() => ({
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    isReservationOpen,
    setIsReservationOpen,
    openReservation,
    closeReservation,
  }), [items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal, isCartOpen, isReservationOpen, openReservation, closeReservation]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
