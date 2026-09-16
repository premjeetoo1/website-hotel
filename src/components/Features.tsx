'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Car,
  UtensilsCrossed,
  Flame,
  ShieldCheck,
  Clock,
  Compass,
  Sparkles,
} from 'lucide-react';

const features = [
  {
    icon: Car,
    title: 'Spacious Parking & Highway Stop',
    bengaliTitle: 'বিশাল পার্কিং ও হাইওয়ে সুবিধা',
    description:
      'Conveniently located on Chalsa Mahabari highway. Safe, wide parking area for cars, SUVs, bikes, and tourist buses.',
    badge: 'Easy Highway Access',
    color: 'from-blue-500 to-cyan-500',
    bgLight: 'bg-blue-50/70',
    border: 'border-blue-100',
  },
  {
    icon: Flame,
    title: 'Tandoori & Dhaba Non-Veg',
    bengaliTitle: 'তন্দুরি ও খাঁটি মাংসের পদ',
    description:
      'Famous for smoky Tandoori Chicken, rich Chicken Masala, tender Mutton curries, and sizzling butter naans.',
    badge: 'Chef Specials',
    color: 'from-orange-500 to-amber-500',
    bgLight: 'bg-orange-50/70',
    border: 'border-orange-100',
  },
  {
    icon: UtensilsCrossed,
    title: 'Authentic Bengali & Nepali-Indian',
    bengaliTitle: 'বাঙালি ও নেপালি খাবার',
    description:
      'Hearty homestyle Bengali fish & mutton thalis alongside savory Himalayan momos and Nepali-Indian specialties.',
    badge: 'Homestyle Taste',
    color: 'from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-50/70',
    border: 'border-emerald-100',
  },
  {
    icon: ShieldCheck,
    title: 'AC Family Hall & Clean Rooms',
    bengaliTitle: 'পরিচ্ছন্ন এসি ফ্যামিলি ডাইনিং',
    description:
      'Well-maintained dining facilities and rooms with hygienic washrooms and courteous family hospitality.',
    badge: 'Clean & Comfortable',
    color: 'from-purple-500 to-pink-500',
    bgLight: 'bg-purple-50/70',
    border: 'border-purple-100',
  },
];

export default function Features() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden" aria-label="Restaurant features and highlights">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold mb-3 border border-primary-100">
            <Sparkles className="w-3.5 h-3.5 text-primary-500" />
            <span>কেন আমাদের বেছে নেবেন · Why Dine at Aaroshi Hotel</span>
          </div>
          <h2 className="section-title">
            Your Trusted Dining Stopover in Dooars
          </h2>
          <p className="section-subtitle mx-auto">
            Serving fresh, flavorful meals to locals, highway travelers, and families visiting Chalsa, Dooars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`card p-6 ${feature.bgLight} ${feature.border} rounded-3xl relative flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-dark-500 bg-white/80 px-2.5 py-1 rounded-full border border-gray-100">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-dark-900 mb-1 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="font-bengali text-xs text-primary-600 font-medium mb-3">
                    {feature.bengaliTitle}
                  </p>
                  <p className="text-dark-600 text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}