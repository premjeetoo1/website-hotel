'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Star, CalendarCheck, Car, ShieldCheck, Clock } from 'lucide-react';

export default function About() {
  const { openReservation } = useCart();

  return (
    <section id="about" className="py-20 md:py-28 bg-white relative overflow-hidden" aria-labelledby="about-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 aspect-[4/3] w-full">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
                alt="Aaroshi Hotel & Family Restaurant Chalsa dining atmosphere"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-3 py-1 bg-primary-600/90 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                  Dooars Highway Gateway
                </span>
                <p className="font-heading font-black text-xl sm:text-2xl">
                  Aaroshi Hotel &amp; Family Restaurant
                </p>
                <p className="font-bengali text-sm text-primary-200">
                  চালসা মহাবাড়ি · ডুয়ার্স হাইওয়ে
                </p>
              </div>
            </div>

            {/* Floating Stats Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 flex items-center gap-3 backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-black text-lg">
                3.9★
              </div>
              <div>
                <p className="font-bold text-dark-900">997+ Reviews</p>
                <p className="text-[10px] text-dark-400">Google Verified Rating</p>
              </div>
              <div className="w-px h-6 bg-gray-200 mx-1" />
              <div>
                <p className="font-bold text-dark-900">Spacious</p>
                <p className="text-[10px] text-dark-400">Car &amp; Bus Parking</p>
              </div>
            </div>
          </motion.div>

          {/* Right Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold mb-3 border border-primary-100">
              <Star className="w-3.5 h-3.5 fill-primary-500 text-primary-500" />
              <span>আমাদের সম্পর্কে · About Aaroshi Restaurant</span>
            </div>

            <h2 id="about-heading" className="section-title mb-6">
              Warm Family Hospitality &amp; Delicious Food in Chalsa
            </h2>

            <div className="space-y-4 text-dark-600 leading-relaxed text-sm sm:text-base">
              <p>
                Located in <strong className="text-dark-900">Chalsa Mahabari</strong> on the main Dooars Highway, <strong className="text-dark-900">Aaroshi Hotel &amp; Family Restaurant</strong> is the preferred dining stop for tourists, road-trippers, and local families exploring Dooars, Lataguri, Gorumara, and surrounding tea gardens.
              </p>
              <p>
                We take pride in our diverse menu offering <strong className="text-dark-900">smoky Tandoori Chicken</strong>, rich <strong className="text-dark-900">Mutton Kosha &amp; Chicken Masala</strong>, authentic <strong className="text-dark-900">Bengali Thalis</strong>, and flavorful <strong className="text-dark-900">Nepali-Indian specialties</strong>—all prepared with fresh local ingredients at reasonable prices (₹200–400 per person).
              </p>
              <p>
                With well-maintained AC family dining facilities, clean rooms, and a spacious parking area that easily accommodates cars, SUVs, and tour buses, we ensure your journey through North Bengal is comfortable and delicious.
              </p>
            </div>

            {/* Highlights Bento */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { icon: '🍗', label: 'Tandoori chicken', title: 'Tandoori & Curries', desc: 'Smoky tandoor & Dhaba curries' },
                { icon: '🍛', label: 'Curry dish', title: 'Bengali Thalis', desc: 'Fish, mutton, egg & veg sets' },
                { icon: '🥟', label: 'Dumpling', title: 'Nepali-Indian Food', desc: 'Steamed momos & thukpa bowls' },
                { icon: '🚗', label: 'Car', title: 'Spacious Parking', desc: 'Safe parking for cars & buses' },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100 flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-label={item.label}>{item.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-dark-900 leading-tight">{item.title}</h4>
                    <p className="text-[11px] text-dark-500 leading-tight mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="#book-table"
                className="btn-primary py-3 px-6 rounded-xl text-sm font-bold shadow-lg shadow-primary-500/20 inline-flex items-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Reserve a Family Table</span>
              </a>

              <a
                href="tel:+919563161422"
                className="px-5 py-3 rounded-xl text-sm font-bold text-dark-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Call: 095631 61422
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}