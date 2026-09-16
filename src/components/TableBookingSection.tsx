'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { submitReservation } from '@/lib/firebaseServices';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  Users,
  Sparkles,
  CheckCircle2,
  Phone,
  User,
  Heart,
  Printer,
  ChevronRight,
  ShieldCheck,
  Award,
  Flame,
  ArrowRight,
  Utensils,
  Car,
} from 'lucide-react';

export const SEATING_ZONES = [
  {
    id: 'ac-family',
    title: 'AC Family Dining Hall',
    bengali: 'এসি ফ্যামিলি খাবার হল',
    tag: 'Family Favorite',
    tagColor: 'bg-primary-600 text-white',
    desc: 'Spacious, air-conditioned family hall with comfortable dining tables, quick service, and clean surroundings.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    capacity: '2 - 12 Guests',
    perks: ['Full AC Comfort', 'Spacious Family Seating', 'Baby High-Chairs Available'],
  },
  {
    id: 'highway-garden',
    title: 'Highway Garden Verandah',
    bengali: 'হাইওয়ে গার্ডেন ভিউ ডাইনিং',
    tag: 'Scenic & Breezy',
    tagColor: 'bg-emerald-600 text-white',
    desc: 'Fresh Dooars breeze overlooking our lush green entrance garden and Chalsa highway. Great for tea and tandoori.',
    image: 'https://images.unsplash.com/photo-1545247181-516773cae7be?auto=format&fit=crop&w=800&q=80',
    capacity: '2 - 8 Guests',
    perks: ['Fresh Outdoor Breeze', 'Highway View', 'Parking In Sight'],
  },
  {
    id: 'dhaba-baithak',
    title: 'Traditional Dhaba Hall',
    bengali: 'ঐতিহ্যবাহী ধাবা বৈঠক',
    tag: 'Authentic Dhaba Vibe',
    tagColor: 'bg-amber-500 text-white',
    desc: 'Authentic highway dhaba ambiance with sizzling tandoori aromas, quick hot roti service, and energetic vibes.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    capacity: '2 - 10 Guests',
    perks: ['Fast Hot Kitchen Service', 'Dhaba Tandoori Ambience', 'Budget Friendly'],
  },
  {
    id: 'tour-lounge',
    title: 'Tour Group & Banquet Lounge',
    bengali: 'ট্যুর গ্রুপ ও ভোজ এলাকা',
    tag: 'Large Tour Parties',
    tagColor: 'bg-blue-600 text-white',
    desc: 'Special combined banquet area for travelers touring Dooars, Lataguri, Gorumara, and Jaldapara.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    capacity: '6 - 30+ Guests',
    perks: ['Bus Group Seating', 'Pre-set Thali Buffets', 'Bus Parking Priority'],
  },
];

const TIME_SLOTS = [
  { time: '08:30 AM', period: 'Breakfast', badge: 'Chai & Paratha' },
  { time: '09:30 AM', period: 'Breakfast', badge: 'Morning Rush' },
  { time: '12:30 PM', period: 'Lunch', badge: 'Thali Time' },
  { time: '01:30 PM', period: 'Lunch', badge: 'Prime Lunch' },
  { time: '02:30 PM', period: 'Lunch', badge: 'Relaxed' },
  { time: '05:00 PM', period: 'Evening Snacks', badge: 'Tea & Momos' },
  { time: '07:30 PM', period: 'Dinner', badge: 'Tandoori Sizzle' },
  { time: '08:45 PM', period: 'Dinner', badge: 'Popular' },
  { time: '10:00 PM', period: 'Late Dinner', badge: 'Highway Night' },
];

const OCCASIONS = [
  { id: 'highway-stop', label: 'Highway Road-Trip Stop', icon: '🚗' },
  { id: 'family-dinner', label: 'Family Vacation Dinner', icon: '👨‍👩‍👧‍👦' },
  { id: 'birthday', label: 'Birthday Celebration', icon: '🎂' },
  { id: 'dooars-tour', label: 'Dooars Safari Tour Group', icon: '🌲' },
  { id: 'casual', label: 'Casual Lunch / Dinner', icon: '🍽️' },
];

export default function TableBookingSection() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedZone, setSelectedZone] = useState(SEATING_ZONES[0].title);
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA'));
  const [selectedTime, setSelectedTime] = useState('01:30 PM');
  const [guestsCount, setGuestsCount] = useState(4);
  const [selectedOccasion, setSelectedOccasion] = useState('Highway Road-Trip Stop');

  // Customer Form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{ id: string; isLive: boolean } | null>(null);

  // Quick Date Helpers
  const todayStr = new Date().toLocaleDateString('en-CA');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toLocaleDateString('en-CA');
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  const dayAfterStr = dayAfter.toLocaleDateString('en-CA');

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    try {
      const fullNotes = [
        `Occasion: ${selectedOccasion}`,
        specialRequests.trim(),
      ]
        .filter(Boolean)
        .join(' | ');

      const res = await submitReservation({
        name,
        phone,
        email: email || undefined,
        guests: guestsCount,
        date: selectedDate,
        time: selectedTime,
        seating: selectedZone,
        specialRequests: fullNotes || undefined,
      });

      try {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#ed741f', '#f19345', '#22c55e', '#fad7ad', '#b94111'],
        });
      } catch {
        // ignore
      }

      setConfirmation({ id: res.id, isLive: res.isLive });
    } catch (err) {
      console.error('Reservation failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrintPass = () => {
    window.print();
  };

  const handleReset = () => {
    setConfirmation(null);
    setStep(1);
    setName('');
    setPhone('');
    setEmail('');
    setSpecialRequests('');
  };

  return (
    <section
      id="book-table"
      className="py-20 md:py-28 bg-gradient-to-b from-orange-50/50 via-white to-amber-50/30 relative overflow-hidden"
      aria-labelledby="table-booking-heading"
    >
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-primary-400/10 via-amber-300/10 to-primary-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100/80 border border-primary-200 text-primary-900 text-xs sm:text-sm font-bold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span>টেবিল বুকিং · Instant Table &amp; Dining Reservation</span>
          </div>

          <h2
            id="table-booking-heading"
            className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-dark-950 tracking-tight leading-tight mb-4"
          >
            Reserve a Table at{' '}
            <span className="bg-gradient-to-r from-primary-600 via-amber-600 to-primary-600 bg-clip-text text-transparent">
              Aaroshi Chalsa
            </span>
          </h2>

          <p className="text-base sm:text-lg text-dark-600 leading-relaxed max-w-2xl mx-auto">
            Heading to Dooars or traveling on the highway? Reserve your family table in advance with guaranteed parking and fresh hot meals ready on your arrival.
          </p>

          {/* Quick Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-xs sm:text-sm font-semibold text-dark-700">
            <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Free Booking
            </span>
            <span className="inline-flex items-center gap-1.5 text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              <Car className="w-4 h-4 text-blue-600" /> Spacious Parking Reserved
            </span>
            <span className="inline-flex items-center gap-1.5 text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              <Award className="w-4 h-4 text-purple-600" /> AC Family Hall Available
            </span>
          </div>
        </div>

        {/* RESERVATION CONFIRMATION VOUCHER / PASS */}
        {confirmation ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl border border-primary-200 overflow-hidden"
          >
            {/* Boarding Pass Header */}
            <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-dark-900 text-white p-6 sm:p-8 text-center relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mx-auto mb-3 shadow-inner">
                <CheckCircle2 className="w-9 h-9 text-emerald-400" />
              </div>

              <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-200 text-xs font-bold rounded-full border border-emerald-400/30 mb-2">
                ✅ Table Confirmed &amp; Reserved
              </span>

              <h3 className="font-heading font-black text-2xl sm:text-3xl">Aaroshi Table Pass</h3>
              <p className="text-primary-100 text-xs sm:text-sm mt-1">
                Aaroshi Hotel &amp; Family Restaurant · Mahabari, Chalsa, WB 735206
              </p>
            </div>

            {/* Pass Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="bg-primary-50/60 rounded-2xl p-5 border border-primary-100 space-y-3">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-primary-200/60">
                  <span className="text-dark-500 uppercase font-semibold">Booking Reference</span>
                  <span className="font-mono font-black text-base text-primary-700">{confirmation.id}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-dark-400 block text-[11px]">Guest Name</span>
                    <strong className="text-dark-900 font-bold">{name}</strong>
                  </div>
                  <div>
                    <span className="text-dark-400 block text-[11px]">Phone Contact</span>
                    <strong className="text-dark-900 font-bold">{phone}</strong>
                  </div>
                  <div>
                    <span className="text-dark-400 block text-[11px]">Date &amp; Time</span>
                    <strong className="text-dark-900 font-bold">{selectedDate} · {selectedTime}</strong>
                  </div>
                  <div>
                    <span className="text-dark-400 block text-[11px]">Party Size</span>
                    <strong className="text-dark-900 font-bold">{guestsCount} Guests</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-primary-200/60 text-xs">
                  <span className="text-dark-400 block text-[11px]">Reserved Dining Zone</span>
                  <strong className="text-primary-800 font-bold text-sm">{selectedZone}</strong>
                </div>

                <div className="text-xs text-dark-600">
                  <span className="text-dark-400 block text-[11px]">Occasion</span>
                  <span>{selectedOccasion}</span>
                </div>
              </div>

              {/* Instructions */}
              <div className="text-xs text-dark-500 space-y-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="font-bold text-dark-800">📌 Traveler Instructions:</p>
                <p>• Location: Chalsa Mahabari (Plus Code: VRJ7+JC Chalsa).</p>
                <p>• Free spacious parking is available at our premises for your car or bus.</p>
                <p>• Questions or running late on the highway? Call us directly: <a href="tel:+919563161422" className="text-primary-600 font-bold hover:underline">095631 61422</a>.</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handlePrintPass}
                  className="btn-primary flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Table Pass</span>
                </button>

                <a
                  href={`https://wa.me/919563161422?text=${encodeURIComponent(
                    `*Table Reservation Confirmation - Aaroshi Hotel & Family Restaurant*\n\n` +
                    `🔖 *Booking ID:* ${confirmation.id}\n` +
                    `👤 *Guest Name:* ${name}\n` +
                    `📞 *Phone:* ${phone}\n` +
                    `👥 *Guests:* ${guestsCount} Persons\n` +
                    `📅 *Date:* ${selectedDate}\n` +
                    `⏰ *Time Slot:* ${selectedTime}\n` +
                    `🪑 *Seating Zone:* ${selectedZone}\n` +
                    (selectedOccasion ? `🎉 *Occasion:* ${selectedOccasion}\n` : '') +
                    (specialRequests ? `📝 *Notes:* ${specialRequests}\n` : '') +
                    `\n📍 *Mahabari, Chalsa, West Bengal 735206*`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-center flex items-center justify-center gap-2 transition-colors shadow-md shadow-emerald-600/20"
                >
                  <span>WhatsApp Alert to Owner</span>
                </a>

                <button
                  onClick={handleReset}
                  className="px-5 py-3 text-xs font-semibold text-dark-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Book Another
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* INTERACTIVE MULTI-STEP RESERVATION ENGINE */
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-200/80 overflow-hidden">
            {/* Wizard Progress Steps Bar */}
            <div className="bg-dark-900 text-white p-4 sm:p-6 border-b border-dark-800">
              <div className="flex items-center justify-between max-w-xl mx-auto text-xs sm:text-sm">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`flex items-center gap-2 font-bold transition-all ${
                    step >= 1 ? 'text-primary-400' : 'text-dark-500'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                    step >= 1 ? 'bg-primary-500 text-white' : 'bg-dark-800 text-dark-400'
                  }`}>1</span>
                  <span>When &amp; Who</span>
                </button>

                <div className={`flex-1 h-0.5 mx-3 ${step >= 2 ? 'bg-primary-500' : 'bg-dark-800'}`} />

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={`flex items-center gap-2 font-bold transition-all ${
                    step >= 2 ? 'text-primary-400' : 'text-dark-500'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                    step >= 2 ? 'bg-primary-500 text-white' : 'bg-dark-800 text-dark-400'
                  }`}>2</span>
                  <span>Dining Zone</span>
                </button>

                <div className={`flex-1 h-0.5 mx-3 ${step >= 3 ? 'bg-primary-500' : 'bg-dark-800'}`} />

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className={`flex items-center gap-2 font-bold transition-all ${
                    step >= 3 ? 'text-primary-400' : 'text-dark-500'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                    step === 3 ? 'bg-primary-500 text-white' : 'bg-dark-800 text-dark-400'
                  }`}>3</span>
                  <span>Confirm Details</span>
                </button>
              </div>
            </div>

            {/* STEP 1: DATE, TIME & GUESTS */}
            {step === 1 && (
              <div className="p-6 sm:p-10 space-y-8 animate-fade-in">
                {/* 1. Date Picker with Quick Chips */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-heading font-bold text-sm text-dark-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary-600" />
                      <span>Select Reservation Date</span>
                    </label>
                    <span className="text-xs text-dark-500 font-medium">Open Daily 7 AM - 11 PM</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => setSelectedDate(todayStr)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedDate === todayStr
                          ? 'bg-primary-600 text-white shadow-md'
                          : 'bg-gray-100 hover:bg-gray-200 text-dark-700'
                      }`}
                    >
                      Today ({new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })})
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedDate(tomorrowStr)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedDate === tomorrowStr
                          ? 'bg-primary-600 text-white shadow-md'
                          : 'bg-gray-100 hover:bg-gray-200 text-dark-700'
                      }`}
                    >
                      Tomorrow ({tomorrow.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })})
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedDate(dayAfterStr)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedDate === dayAfterStr
                          ? 'bg-primary-600 text-white shadow-md'
                          : 'bg-gray-100 hover:bg-gray-200 text-dark-700'
                      }`}
                    >
                      Day After ({dayAfter.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })})
                    </button>

                    <div className="relative inline-flex items-center">
                      <input
                        type="date"
                        value={selectedDate}
                        min={todayStr}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-3 py-1.5 text-xs font-bold bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-primary-500"
                        aria-label="Pick custom date"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Time Slot Selector */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-heading font-bold text-sm text-dark-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary-600" />
                      <span>Select Preferred Meal &amp; Time Slot</span>
                    </label>
                    <span className="text-xs text-primary-600 font-semibold">Kitchen Closes 11:00 PM</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = selectedTime === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => setSelectedTime(slot.time)}
                          className={`p-3 rounded-2xl border text-left transition-all relative ${
                            isSelected
                              ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500/25 shadow-sm'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-heading font-black text-sm text-dark-900">{slot.time}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              isSelected ? 'bg-primary-600 text-white' : 'bg-gray-100 text-dark-600'
                            }`}>
                              {slot.badge}
                            </span>
                          </div>
                          <span className="text-[11px] text-dark-400 block mt-0.5">{slot.period} Service</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Number of Guests */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-heading font-bold text-sm text-dark-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary-600" />
                      <span>Number of Guests</span>
                    </label>
                    <span className="text-xs font-bold text-primary-700 bg-primary-50 px-2.5 py-0.5 rounded-full">
                      Party of {guestsCount}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuestsCount(num)}
                        className={`w-12 h-12 rounded-2xl font-heading font-bold text-sm transition-all flex items-center justify-center ${
                          guestsCount === num
                            ? 'bg-primary-600 text-white shadow-md shadow-primary-600/30 scale-105'
                            : 'bg-gray-100 hover:bg-gray-200 text-dark-800'
                        }`}
                      >
                        {num === 25 ? '25+' : num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 1 Next Button */}
                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn-primary px-8 py-3.5 rounded-2xl text-sm font-bold shadow-lg shadow-primary-600/25 flex items-center gap-2"
                  >
                    <span>Choose Dining Zone</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SEATING ZONE VISUAL SELECTOR */}
            {step === 2 && (
              <div className="p-6 sm:p-10 space-y-6 animate-fade-in">
                <div>
                  <h3 className="font-heading font-bold text-lg text-dark-900 mb-1">
                    Select Your Preferred Dining Area
                  </h3>
                  <p className="text-xs sm:text-sm text-dark-500">
                    Aaroshi Hotel &amp; Family Restaurant offers AC family dining, highway garden breeze, and dhaba ambiance in Chalsa.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SEATING_ZONES.map((zone) => {
                    const isSelected = selectedZone === zone.title;
                    return (
                      <div
                        key={zone.id}
                        onClick={() => setSelectedZone(zone.title)}
                        className={`rounded-2xl border-2 overflow-hidden cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-primary-500 ring-2 ring-primary-500/25 shadow-lg bg-primary-50/20'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="relative aspect-[16/9] w-full">
                          <Image
                            src={zone.image}
                            alt={zone.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-transparent" />
                          <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${zone.tagColor}`}>
                            {zone.tag}
                          </span>

                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <h4 className="font-heading font-bold text-base leading-tight">{zone.title}</h4>
                            <p className="font-bengali text-xs text-amber-200">{zone.bengali}</p>
                          </div>
                        </div>

                        <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                          <p className="text-xs text-dark-600 leading-relaxed">{zone.desc}</p>
                          <div className="space-y-1 pt-2 border-t border-gray-100">
                            <div className="flex justify-between text-[11px] text-dark-500 font-medium">
                              <span>Capacity:</span>
                              <strong className="text-dark-800">{zone.capacity}</strong>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {zone.perks.map((p, idx) => (
                                <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-dark-700 font-medium">
                                  ✓ {p}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Step 2 Buttons */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-3 text-xs font-bold text-dark-600 hover:text-dark-900 transition-colors"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="btn-primary px-8 py-3.5 rounded-2xl text-sm font-bold shadow-lg shadow-primary-600/25 flex items-center gap-2"
                  >
                    <span>Continue to Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: OCCASION & GUEST CONTACT FORM */}
            {step === 3 && (
              <form onSubmit={handleBookingSubmit} className="p-6 sm:p-10 space-y-6 animate-fade-in">
                {/* Booking Summary Strip */}
                <div className="bg-primary-50 rounded-2xl p-4 border border-primary-200/80 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-dark-500 block text-[11px]">Selected Booking</span>
                    <strong className="text-dark-900 font-bold">{selectedDate} at {selectedTime}</strong>
                  </div>
                  <div>
                    <span className="text-dark-500 block text-[11px]">Guests</span>
                    <strong className="text-dark-900 font-bold">{guestsCount} Guests</strong>
                  </div>
                  <div>
                    <span className="text-dark-500 block text-[11px]">Dining Area</span>
                    <strong className="text-primary-700 font-bold">{selectedZone}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-primary-600 hover:underline"
                  >
                    Edit
                  </button>
                </div>

                {/* Occasion Selector */}
                <div>
                  <label className="font-heading font-bold text-sm text-dark-900 flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-primary-600" />
                    <span>Purpose of Visit</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {OCCASIONS.map((occ) => {
                      const isSelected = selectedOccasion === occ.label;
                      return (
                        <button
                          key={occ.id}
                          type="button"
                          onClick={() => setSelectedOccasion(occ.label)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                            isSelected
                              ? 'border-primary-500 bg-primary-100/70 text-primary-900 ring-2 ring-primary-500/20'
                              : 'border-gray-200 hover:border-gray-300 bg-white text-dark-700'
                          }`}
                        >
                          <span className="text-base">{occ.icon}</span>
                          <span className="truncate">{occ.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Customer Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-dark-800 block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Joydeep Roy"
                      className="input-field py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-dark-800 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 95631 61422"
                      className="input-field py-2.5 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-dark-800 block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. joydeep@example.com"
                      className="input-field py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-dark-800 block mb-1">
                      Vehicle Type / Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="e.g. Car parking needed, less spicy food, kid seat"
                      className="input-field py-2.5 text-sm"
                    />
                  </div>
                </div>

                {/* Final Confirmation Button */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-3 text-xs font-bold text-dark-600 hover:text-dark-900 transition-colors"
                  >
                    ← Back to Areas
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting || !name.trim() || !phone.trim()}
                    className="btn-primary px-8 py-3.5 rounded-2xl text-base font-bold shadow-xl shadow-primary-600/30 flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Reserving Table...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 text-amber-300" />
                        <span>Confirm &amp; Generate Table Pass</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
