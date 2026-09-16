'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import {
  Phone,
  ShoppingBag,
  CalendarCheck,
  Menu,
  X,
  Utensils,
  MapPin,
  Lock,
} from 'lucide-react';

const navItems = [
  { href: '/#home', label: 'Home' },
  { href: '/#book-table', label: 'Book Table' },
  { href: '/#order-ahead', label: 'Express Drive-In' },
  { href: '/#menu', label: 'Menu' },
  { href: '/#group-catering', label: 'Tour Bus Groups' },
  { href: '/#testimonials', label: 'Reviews' },
  { href: '/#contact', label: 'Contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen, openReservation } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-2.5'
          : 'bg-gradient-to-b from-white/95 via-white/50 to-transparent py-4'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/#home"
            className="flex items-center space-x-3 group focus:outline-none"
            aria-label="Aaroshi Hotel & Family Restaurant - Home"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-base md:text-lg text-dark-950 tracking-tight leading-none">
                  AAROSHI HOTEL
                </span>
                <span className="inline-flex px-1.5 py-0.5 rounded bg-amber-100 text-[10px] font-bold text-amber-800 uppercase tracking-wide">
                  3.9 ★ (997)
                </span>
              </div>
              <span className="block font-bengali text-xs text-dark-500 leading-tight">
                আরসি হোটেল &amp; ফ্যামিলি রেস্টুরেন্ট
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3.5 py-2 text-xs font-semibold text-dark-700 hover:text-primary-600 rounded-xl hover:bg-primary-50/70 transition-all"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-2.5">
            {/* Call Phone Link */}
            <a
              href="tel:+919563161422"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-dark-700 hover:text-primary-600 py-2 px-3 rounded-full hover:bg-gray-100 transition-colors"
              title="Call Aaroshi Restaurant"
            >
              <Phone className="w-3.5 h-3.5 text-primary-500" />
              <span>095631 61422</span>
            </a>

            {/* Table Reservation Button — Primary Header CTA */}
            <Link
              href="/#book-table"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-md shadow-primary-600/25 transition-all"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book Table</span>
            </Link>

            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-dark-800 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-4 h-4 text-primary-600" />
              <span>Bag</span>
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="w-4 h-4 rounded-full bg-primary-600 text-white text-[10px] font-black flex items-center justify-center shadow-sm"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-primary-50 text-primary-600"
              aria-label="View bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              className="p-2 text-dark-700 hover:text-primary-600 rounded-xl bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="sm:hidden overflow-hidden bg-white rounded-2xl mt-3 p-4 shadow-xl border border-gray-100"
            >
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2.5 text-sm font-semibold text-dark-800 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
                <Link
                  href="/#book-table"
                  className="btn-primary w-full py-3 text-xs font-bold rounded-xl text-center flex items-center justify-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Table Online</span>
                </Link>

                <a
                  href="tel:+919563161422"
                  className="w-full py-2.5 text-xs font-bold text-dark-700 bg-gray-100 hover:bg-gray-200 rounded-xl text-center flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary-600" />
                  <span>Call 095631 61422</span>
                </a>

                <div className="pt-2 text-center">
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-600 transition-colors py-1 px-2"
                  >
                    <Lock className="w-3 h-3 text-gray-400" />
                    <span>Manager Portal</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}