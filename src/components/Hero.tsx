'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import {
  Sparkles,
  ShoppingBag,
  CalendarCheck,
  Star,
  MapPin,
  Clock,
  Car,
  Award,
  Lock,
} from 'lucide-react';

export default function Hero() {
  const { setIsCartOpen, openReservation } = useCart();

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16 lg:py-32 bg-gradient-to-b from-orange-50/40 via-amber-50/20 to-white"
    >
      {/* Background Animated Gradient Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-primary-200/40 rounded-full blur-3xl will-change-transform"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 -right-24 w-[28rem] h-[28rem] bg-amber-200/30 rounded-full blur-3xl will-change-transform"
        />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Glowing Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-primary-200 text-primary-900 text-xs sm:text-sm font-semibold mb-6 shadow-sm shadow-primary-500/10 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bengali">স্বাগতম</span>
            <span className="text-primary-300">·</span>
            <span>Dooars Highway Family Restaurant &amp; Dhaba</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-dark-950 tracking-tight leading-[1.1] mb-3">
              Aaroshi Hotel &amp;{' '}
              <span className="bg-gradient-to-r from-primary-600 via-amber-600 to-primary-600 bg-clip-text text-transparent">
                Family Restaurant
              </span>
            </h1>
            <h2 className="font-bengali text-xl sm:text-3xl text-dark-700 font-medium mb-6">
              আরসি হোটেল &amp; ফ্যামিলি রেস্টুরেন্ট · চালসা মহাবাড়ি
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-dark-600 max-w-2xl mx-auto mb-8 leading-relaxed font-normal"
          >
            Your favorite highway stopover in <span className="font-semibold text-dark-800">Chalsa, Dooars</span>. Savor juicy <span className="font-semibold text-dark-800">Tandoori Chicken</span>, spicy <span className="font-semibold text-dark-800">Chicken Masala &amp; Mutton</span>, Himalayan momos, and traditional Bengali thalis with spacious parking.
          </motion.p>

          {/* Action CTAs — Table Booking Primary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8"
          >
            <Link
              href="#book-table"
              className="btn-primary text-sm sm:text-base px-8 py-4 rounded-2xl shadow-xl shadow-primary-500/30 flex items-center gap-2.5 font-bold"
            >
              <CalendarCheck className="w-5 h-5" />
              <span>Book Table Online</span>
            </Link>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-4 text-sm sm:text-base font-bold text-dark-800 bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl shadow-sm transition-all"
            >
              <ShoppingBag className="w-5 h-5 text-primary-600" />
              <span>Order Takeaway / Delivery</span>
            </motion.button>

            <Link
              href="#menu"
              className="inline-flex items-center gap-2 px-6 py-4 text-sm sm:text-base font-semibold text-dark-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-2xl transition-all"
            >
              <span>Explore Menu</span>
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-5 py-4 text-sm sm:text-base font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-2xl shadow-sm transition-all"
              title="Manager / Admin Portal (PIN: 1995)"
            >
              <Lock className="w-4 h-4 text-amber-600" />
              <span>Admin Login</span>
            </Link>
          </motion.div>

          {/* Quick Booking Teaser Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="max-w-2xl mx-auto mb-12 p-2.5 bg-white/95 rounded-2xl shadow-lg border border-primary-200/80 backdrop-blur-md flex flex-wrap sm:flex-nowrap items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2.5 px-3 py-1 text-left text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div>
                <span className="font-bold text-dark-900 block">Tables &amp; AC Family Dining Available</span>
                <span className="text-[11px] text-dark-500">Chalsa Highway · Spacious Parking Ready</span>
              </div>
            </div>

            <Link
              href="#book-table"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-primary-600 hover:bg-primary-700 text-white shadow-md transition-all text-center flex items-center justify-center gap-1.5"
            >
              <span>Select Date &amp; Guests</span>
              <span aria-hidden="true">↓</span>
            </Link>
          </motion.div>

          {/* Floating Pill Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto"
          >
            <div className="p-3.5 rounded-2xl bg-white/85 border border-gray-100 shadow-sm backdrop-blur-sm text-left flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100/70 text-amber-700 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-dark-900">3.9 ★ Rating</p>
                <p className="text-[11px] text-dark-500">997+ Google Reviews</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/85 border border-gray-100 shadow-sm backdrop-blur-sm text-left flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100/70 text-primary-700 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-dark-900">Chalsa Mahabari</p>
                <p className="text-[11px] text-dark-500">Dooars Highway (VRJ7+JC)</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/85 border border-gray-100 shadow-sm backdrop-blur-sm text-left flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-dark-900">7 AM - 11 PM</p>
                <p className="text-[11px] text-dark-500">Open All 7 Days</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/85 border border-gray-100 shadow-sm backdrop-blur-sm text-left flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-dark-900">Spacious Parking</p>
                <p className="text-[11px] text-dark-500">Cars, Bikes &amp; Buses</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}