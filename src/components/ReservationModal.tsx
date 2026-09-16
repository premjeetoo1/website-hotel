'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { submitReservation } from '@/lib/firebaseServices';
import confetti from 'canvas-confetti';
import {
  X,
  Calendar,
  Clock,
  Users,
  Sparkles,
  CheckCircle2,
  Compass,
  Phone,
  User,
  Heart,
  Mail,
} from 'lucide-react';

const SEATING_OPTIONS = [
  { id: 'ac-hall', label: 'AC Family Hall', desc: 'Cool, spacious family atmosphere' },
  { id: 'verandah', label: 'Highway Garden Verandah', desc: 'Fresh Dooars breeze & green scenic views' },
  { id: 'dhaba', label: 'Traditional Dhaba Section', desc: 'Authentic rustic highway dhaba seating' },
  { id: 'lounge', label: 'Dooars Tour Lounge', desc: 'Ideal for tour groups, travelers & large families' },
];

const TIME_SLOTS = [
  '08:30 AM', '09:30 AM', '10:30 AM',
  '12:30 PM', '01:30 PM', '02:30 PM',
  '07:00 PM', '08:00 PM', '09:00 PM',
];

export default function ReservationModal() {
  const { isReservationOpen, closeReservation } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: 2,
    date: new Date().toLocaleDateString('en-CA'),
    time: '01:30 PM',
    seating: 'AC Family Hall',
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ id: string; isLive: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await submitReservation({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        guests: Number(formData.guests),
        date: formData.date,
        time: formData.time,
        seating: formData.seating,
        specialRequests: formData.specialRequests,
      });

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#ed741f', '#f19345', '#22c55e', '#fad7ad'],
        });
      } catch {
        // ignore
      }

      setConfirmation({ id: res.id, isLive: res.isLive });
    } catch (err) {
      console.error('Reservation failed:', err);
      setError('Failed to reserve table. Please try again or call us directly at 095631 61422.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    closeReservation();
    setError(null);
    if (confirmation) {
      setTimeout(() => {
        setConfirmation(null);
        setFormData({
          name: '',
          phone: '',
          email: '',
          guests: 2,
          date: new Date().toLocaleDateString('en-CA'),
          time: '01:30 PM',
          seating: 'AC Family Hall',
          specialRequests: '',
        });
      }, 300);
    }
  };

  return (
    <AnimatePresence>
      {isReservationOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onKeyDown={(e) => { if (e.key === 'Escape') handleClose(); }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-dark-950/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reservation-modal-title"
            className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 border border-gray-100"
          >
            {/* Modal Header */}
            <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-dark-900 text-white p-6 sm:p-8">
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleClose}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold text-primary-100 mb-3 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>আরসি হোটেল & ফ্যামিলি রেস্টুরেন্ট রিজার্ভেশন</span>
              </div>
              <h2 id="reservation-modal-title" className="font-heading font-bold text-2xl sm:text-3xl">Reserve a Table</h2>
              <p className="text-primary-100 text-sm mt-1 max-w-md">
                Experience authentic Tandoori, Bengali & Nepali-Indian dining with spacious car parking at Chalsa Mahabari.
              </p>
            </div>

            {/* Confirmation State */}
            {confirmation ? (
              <div className="p-8 text-center space-y-5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg"
                >
                  <CheckCircle2 className="w-10 h-10" />
                </motion.div>

                <div>
                  <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200 mb-2">
                    ✅ Table Reserved
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-dark-900">Table Reserved Successfully!</h3>
                  <p className="text-dark-500 text-sm mt-1">
                    We look forward to welcoming you, <span className="font-semibold text-dark-800">{formData.name}</span>!
                  </p>
                </div>

                <div className="bg-primary-50/50 border border-primary-100 rounded-2xl p-5 text-left space-y-3">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-dark-500">Booking Reference</span>
                    <span className="font-mono font-bold text-primary-700">{confirmation.id}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-dark-500">Date & Time</span>
                    <span className="font-semibold text-dark-900">{formData.date} at {formData.time}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-dark-500">Guests</span>
                    <span className="font-semibold text-dark-900">{formData.guests} Persons</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-dark-500">Seating Preference</span>
                    <span className="font-semibold text-dark-900">{formData.seating}</span>
                  </div>
                </div>

                <p className="text-xs text-dark-400">
                  A table will be kept ready at Mahabari, Chalsa. Need to alter? Call +91 95631 61422.
                </p>

                <div className="space-y-2 pt-1">
                  <a
                    href={`https://wa.me/919563161422?text=${encodeURIComponent(
                      `*Table Reservation Confirmation - Aaroshi Hotel & Family Restaurant*\n\n` +
                      `🔖 *Booking ID:* ${confirmation.id}\n` +
                      `👤 *Guest Name:* ${formData.name}\n` +
                      `📞 *Phone:* ${formData.phone}\n` +
                      `👥 *Guests:* ${formData.guests} Persons\n` +
                      `📅 *Date:* ${formData.date}\n` +
                      `⏰ *Time Slot:* ${formData.time}\n` +
                      `🪑 *Seating:* ${formData.seating}\n` +
                      (formData.specialRequests ? `📝 *Notes:* ${formData.specialRequests}\n` : '') +
                      `\n📍 *Mahabari, Chalsa, West Bengal*`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary w-full py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700"
                  >
                    <span>Send WhatsApp Alert to Hotel</span>
                  </a>

                  <button
                    onClick={handleClose}
                    className="w-full py-2.5 rounded-xl font-semibold text-xs text-dark-600 hover:bg-gray-100 transition-colors"
                  >
                    Close & Continue Exploring
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label flex items-center gap-1.5 text-xs">
                      <User className="w-3.5 h-3.5 text-primary-500" /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sourav Ganguly"
                      className="input-field py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="label flex items-center gap-1.5 text-xs">
                      <Phone className="w-3.5 h-3.5 text-primary-500" /> Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="input-field py-2.5 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="label flex items-center gap-1.5 text-xs">
                      <Calendar className="w-3.5 h-3.5 text-primary-500" /> Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="input-field py-2.5 text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="label flex items-center gap-1.5 text-xs">
                      <Clock className="w-3.5 h-3.5 text-primary-500" /> Time Slot *
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="input-field py-2.5 text-xs sm:text-sm bg-white"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label flex items-center gap-1.5 text-xs">
                      <Users className="w-3.5 h-3.5 text-primary-500" /> Guests *
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                      className="input-field py-2.5 text-xs sm:text-sm bg-white"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Seating Preference Selector */}
                <div>
                  <label className="label flex items-center gap-1.5 text-xs">
                    <Compass className="w-3.5 h-3.5 text-primary-500" /> Seating Area Preference
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1.5">
                    {SEATING_OPTIONS.map((opt) => {
                      const isSelected = formData.seating === opt.label;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setFormData({ ...formData, seating: opt.label })}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'border-primary-500 bg-primary-50/70 ring-2 ring-primary-500/20'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs text-dark-900">{opt.label}</span>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-primary-600" />}
                          </div>
                          <p className="text-[11px] text-dark-500 mt-0.5">{opt.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="label flex items-center gap-1.5 text-xs">
                    <Heart className="w-3.5 h-3.5 text-primary-500" /> Special Occasion or Dietary Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="e.g. Birthday celebration, window seat priority, high chair"
                    className="input-field py-2 text-sm"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-3.5 text-base font-bold rounded-xl shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Confirming Reservation...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-200" />
                        <span>Confirm Table Booking</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-dark-400 mt-2">
                    Instant confirmation · Free cancellation · No pre-payment required
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
