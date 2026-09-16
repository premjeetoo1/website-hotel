'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { submitOrder, getWhatsAppOrderUrl } from '@/lib/firebaseServices';
import confetti from 'canvas-confetti';
import {
  Car,
  Clock,
  Flame,
  CheckCircle,
  CheckCircle2,
  UtensilsCrossed,
  ArrowRight,
  Sparkles,
  Phone,
  MessageSquare,
  X,
  MapPin,
  ShieldCheck,
} from 'lucide-react';

const QUICK_HIGHWAY_COMBOS = [
  {
    id: 'combo-1',
    name: 'Tandoori Chicken + Rumali Roti Combo',
    bengali: 'তন্দুরি চিকেন কম্বো',
    desc: 'Half Tandoori Chicken (4 pcs) + 4 Fresh Rotis + Mint Chutney & Salad',
    price: 340,
    time: '15 Mins',
    eta: '15 Mins',
    icon: '🍗',
    popular: true,
  },
  {
    id: 'combo-2',
    name: 'Authentic Bengali Special Thali',
    bengali: 'স্পেশাল বাঙালি থালি',
    desc: 'Basmati Rice + Katla Kalia / Chicken + Moong Dal + Bhaja + Chutney',
    price: 240,
    time: '10 Mins',
    eta: '10 Mins',
    icon: '🍛',
    popular: true,
  },
  {
    id: 'combo-3',
    name: 'Dooars Hot Momo & Thukpa Platter',
    bengali: 'মোমো ও থুকপা প্ল্যাটার',
    desc: 'Steamed Chicken Momos (8 pcs) + Hot Chicken Thukpa Soup + Spicy Dip',
    price: 220,
    time: '10 Mins',
    eta: '10 Mins',
    icon: '🥟',
    popular: false,
  },
];

export default function OrderAheadBanner() {
  const [selectedCombo, setSelectedCombo] = useState<typeof QUICK_HIGHWAY_COMBOS[0] | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [eta, setEta] = useState('20 Mins');
  const [diningMode, setDiningMode] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderVoucher, setOrderVoucher] = useState<{ id: string; whatsAppUrl: string } | null>(null);

  const handleOpenPreOrder = (combo: typeof QUICK_HIGHWAY_COMBOS[0]) => {
    setSelectedCombo(combo);
    setOrderVoucher(null);
  };

  const handleClose = () => {
    setSelectedCombo(null);
    setOrderVoucher(null);
  };

  const executePreOrderSubmit = async (verifiedPhone?: string) => {
    if (!selectedCombo) return;

    setIsSubmitting(true);
    const notes = `Highway Pre-Order ETA: ${eta} | Car/Vehicle: ${carNumber || 'Not provided'} | Dining: ${diningMode.toUpperCase()}`;
    const finalPhone = verifiedPhone || phone;

    try {
      const res = await submitOrder({
        customerName,
        phone: finalPhone,
        orderType: diningMode,
        items: [{ id: selectedCombo.id, name: selectedCombo.name, price: selectedCombo.price, quantity: 1 }],
        subtotal: selectedCombo.price,
        total: selectedCombo.price,
        instructions: notes,
      });

      const whatsAppUrl = getWhatsAppOrderUrl({
        id: res.id,
        customerName,
        phone: finalPhone,
        orderType: `Highway Pre-Order (${diningMode})`,
        items: [{ name: selectedCombo.name, quantity: 1, price: selectedCombo.price }],
        total: selectedCombo.price,
        instructions: notes,
      });

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ed741f', '#22c55e', '#fad7ad'],
        });
      } catch {
        // ignore
      }

      setOrderVoucher({ id: res.id, whatsAppUrl });
    } catch (err) {
      console.error('Highway pre-order failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCombo || !customerName.trim() || !phone.trim()) return;

    await executePreOrderSubmit(phone);
  };

  return (
    <section id="order-ahead" className="py-16 bg-dark-950 text-white relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Banner Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-dark-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Car className="w-4 h-4 text-primary-400" />
              <span>হাইওয়ে ড্রাইভিং প্রি-অর্ডার · Highway Express Dining</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
              Driving on the Highway? <span className="text-primary-400">Order 20 Mins Ahead!</span>
            </h2>
            <p className="mt-2 text-dark-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Don&apos;t waste 30 minutes waiting for food while traveling. Pre-order your hot meal before reaching Chalsa Mahabari—we will have your table set and piping hot food ready when you park.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/#menu"
              className="px-5 py-3 rounded-xl bg-dark-800 hover:bg-dark-700 text-dark-200 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 border border-dark-700"
            >
              <UtensilsCrossed className="w-4 h-4 text-primary-400" />
              <span>Browse Full Menu</span>
            </Link>
            <a
              href="tel:+919563161422"
              className="btn-primary px-5 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-primary-600/25 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Kitchen: 095631 61422</span>
            </a>
          </div>
        </div>

        {/* Quick Highway Express Combos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {QUICK_HIGHWAY_COMBOS.map((combo) => (
            <motion.div
              key={combo.id}
              whileHover={{ y: -4 }}
              className="bg-dark-900/90 rounded-2xl p-5 border border-dark-800 hover:border-primary-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                    <Clock className="w-3 h-3" /> Ready in {combo.time}
                  </span>
                  <span className="font-heading font-black text-lg text-white">₹{combo.price}</span>
                </div>

                <h3 className="font-heading font-bold text-base text-white leading-snug mb-0.5">{combo.name}</h3>
                <p className="font-bengali text-xs text-primary-400 mb-2">{combo.bengali}</p>
                <p className="text-xs text-dark-400 leading-relaxed line-clamp-3 mb-4">{combo.desc}</p>
              </div>

              <div className="pt-2 border-t border-dark-800 flex items-center gap-2">
                <button
                  onClick={() => handleOpenPreOrder(combo)}
                  className="btn-primary flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Pre-Order While Driving</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Location Highway Hint */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-dark-400 text-center">
          <MapPin className="w-4 h-4 text-primary-400 shrink-0" />
          <span>Located on Chalsa Mahabari Main Highway · 15 mins to Gorumara Forest · Free Bus &amp; Car Parking</span>
        </div>
      </div>

      {/* Pre-Order Modal */}
      <AnimatePresence>
        {selectedCombo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto text-dark-900"
            onKeyDown={(e) => { if (e.key === 'Escape') handleClose(); }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-dark-950/80 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 border border-gray-100"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-primary-600 to-dark-900 text-white p-6">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[11px] font-semibold text-primary-100 mb-2">
                  <Car className="w-3.5 h-3.5 text-amber-300" />
                  <span>Highway Express Pre-Order</span>
                </div>
                <h3 className="font-heading font-black text-xl text-white">{selectedCombo.name}</h3>
                <p className="text-primary-100 text-xs mt-1">₹{selectedCombo.price} · Hot &amp; Ready in {selectedCombo.time}</p>
              </div>

              {/* Confirmation State */}
              {orderVoucher ? (
                <div className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200 mb-1">
                      ✅ Kitchen Notified
                    </span>
                    <h4 className="font-heading font-bold text-xl text-dark-900">Pre-Order Received!</h4>
                    <p className="text-dark-500 text-xs mt-1">
                      We will have your hot food ready for your arrival in <span className="font-bold text-dark-800">{eta}</span>.
                    </p>
                  </div>

                  <div className="bg-primary-50 rounded-2xl p-4 text-left space-y-2 text-xs border border-primary-100">
                    <div className="flex justify-between">
                      <span className="text-dark-500">Order Token</span>
                      <span className="font-mono font-bold text-primary-700">{orderVoucher.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-500">Customer</span>
                      <span className="font-semibold text-dark-900">{customerName} ({phone})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-500">Vehicle / Car</span>
                      <span className="font-semibold text-dark-900">{carNumber || 'Drive-in'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-500">Total Payable</span>
                      <span className="font-bold text-primary-700 text-sm">₹{selectedCombo.price}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <a
                      href={orderVoucher.whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send WhatsApp Alert to Kitchen</span>
                    </a>
                    <button
                      onClick={handleClose}
                      className="w-full py-2 rounded-xl text-xs font-semibold text-dark-600 hover:bg-gray-100 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handlePreOrderSubmit} className="p-6 space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="label text-xs">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Anirban Das"
                        className="input-field py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="label text-xs mb-0.5 block">Phone Number * (10 Digits)</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="input-field py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="label text-xs">Estimated Arrival Time *</label>
                      <select
                        value={eta}
                        onChange={(e) => setEta(e.target.value)}
                        className="input-field py-2 text-xs bg-white"
                      >
                        <option value="15 Mins">Arriving in 15 mins</option>
                        <option value="20 Mins">Arriving in 20 mins</option>
                        <option value="30 Mins">Arriving in 30 mins</option>
                        <option value="45 Mins">Arriving in 45 mins</option>
                        <option value="1 Hour">Arriving in 1 hour</option>
                      </select>
                    </div>
                    <div>
                      <label className="label text-xs">Car / Vehicle No. (Optional)</label>
                      <input
                        type="text"
                        value={carNumber}
                        onChange={(e) => setCarNumber(e.target.value)}
                        placeholder="e.g. WB-74 1234"
                        className="input-field py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label text-xs">Dining Preference</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() => setDiningMode('dine-in')}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                          diningMode === 'dine-in'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 text-dark-600 hover:bg-gray-50'
                        }`}
                      >
                        🍽️ Ready on Table
                      </button>
                      <button
                        type="button"
                        onClick={() => setDiningMode('takeaway')}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                          diningMode === 'takeaway'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 text-dark-600 hover:bg-gray-50'
                        }`}
                      >
                        🛍️ Packed Takeaway
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || !customerName || !phone}
                      className="btn-primary w-full py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending to Kitchen...</span>
                        </>
                      ) : (
                        <>
                          <Flame className="w-4 h-4 text-amber-200" />
                          <span>Place Express Highway Pre-Order (₹{selectedCombo.price})</span>
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-dark-400 mt-2">
                      Pay after arrival · Free spacious parking · AC hall seating ready
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
