'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { submitGroupCatering, getWhatsAppGroupCateringUrl } from '@/lib/firebaseServices';
import confetti from 'canvas-confetti';
import {
  Users,
  Bus,
  CheckCircle2,
  Sparkles,
  Calendar,
  Clock,
  Phone,
  MessageSquare,
  UtensilsCrossed,
  ShieldCheck,
  Calculator,
} from 'lucide-react';

const CATERING_PACKAGES = [
  {
    id: 'pkg-thali',
    name: 'Standard Tourist Bengali Thali',
    bengali: 'স্ট্যান্ডার্ড বাঙালি থালি',
    pricePerPax: 220,
    items: [
      'Dehradun Basmati Rice',
      'Katla Fish Curry OR Chicken Curry',
      'Moong Dal & Begun Bhaja',
      'Seasonal Labra Sabzi',
      'Tomato Khejur Chutney & Papad',
      'Traditional Mishti Doi / Rosogolla',
    ],
  },
  {
    id: 'pkg-royal',
    name: 'Aaroshi Highway Royal Feast',
    bengali: 'আরসি রয়্যাল ফিস্ট',
    pricePerPax: 360,
    items: [
      'Fragrant Polao & Basmati Rice',
      'Tandoori Chicken Starter (2 pcs)',
      'Rich Mutton Kosha (2 pcs)',
      'Fish Kalia (Katla)',
      'Chholar Dal & Luchi',
      'Salad, Raita, Chutney, Papad',
      'Payesh & Rosogolla in Clay Pot',
    ],
  },
  {
    id: 'pkg-breakfast',
    name: 'Dooars Morning Breakfast Buffet',
    bengali: 'ডুয়ার্স প্রাতরাশ বুফে',
    pricePerPax: 130,
    items: [
      'Hot Fluffy Luchi (4 pcs) with Aloo Dum',
      'OR Stuffed Puri-Sabzi',
      'Boiled Egg / Veg Cutlet',
      'Hot Dooars Garden Milk Chai / Coffee',
      'Fresh Sweet Jalebi / Rosogolla',
    ],
  },
];

export default function GroupCateringSection() {
  const [selectedPkg, setSelectedPkg] = useState(CATERING_PACKAGES[0]);
  const [paxCount, setPaxCount] = useState(25);
  const [organizerName, setOrganizerName] = useState('');
  const [groupName, setGroupName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState(new Date().toLocaleDateString('en-CA'));
  const [mealTime, setMealTime] = useState<'Breakfast' | 'Lunch' | 'High Tea' | 'Dinner'>('Lunch');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState<{ id: string; whatsAppUrl: string } | null>(null);

  // Group discount: 10% discount for 20+ pax, 15% discount for 40+ pax
  const discountPercent = paxCount >= 40 ? 15 : paxCount >= 20 ? 10 : 0;
  const rawTotal = selectedPkg.pricePerPax * paxCount;
  const discountAmount = Math.round((rawTotal * discountPercent) / 100);
  const finalTotal = rawTotal - discountAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await submitGroupCatering({
        organizerName,
        groupName,
        phone,
        packageType: selectedPkg.name,
        paxCount,
        eventDate,
        mealTime,
        estimatedCost: finalTotal,
        notes,
      });

      const whatsAppUrl = getWhatsAppGroupCateringUrl({
        id: res.id,
        organizerName,
        phone,
        packageType: selectedPkg.name,
        paxCount,
        eventDate,
        mealTime,
        estimatedCost: finalTotal,
        notes: `${notes ? notes + ' | ' : ''}Group: ${groupName || 'Tour Group'} (${discountPercent}% Group Discount applied)`,
      });

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ed741f', '#22c55e', '#3b82f6'],
        });
      } catch {
        // ignore
      }

      setQuoteSuccess({ id: res.id, whatsAppUrl });
    } catch (err) {
      console.error('Group catering submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="group-catering" className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Bus className="w-4 h-4 text-emerald-600" />
            <span>ট্যুর বাস ও গ্রুপ ক্যাটারিং · Tour Bus &amp; Group Meals</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-dark-950 tracking-tight">
            Tour Bus &amp; Large Group <span className="gradient-text">Meal Packages</span>
          </h2>
          <p className="mt-3 text-dark-600 text-sm sm:text-base leading-relaxed">
            Planning a trip to Dooars, Lataguri or Gorumara with a tourist bus or large family? We provide fast, hygienic, piping hot bulk meals with dedicated reserved hall seating and bus parking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Column: Interactive Package Selector & Calculator */}
          <div className="lg:col-span-7 space-y-6">
            {/* Package Tabs */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-dark-500 uppercase tracking-wider block">
                1. Select Meal Package:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CATERING_PACKAGES.map((pkg) => {
                  const isSelected = selectedPkg.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPkg(pkg)}
                      className={`p-4 rounded-2xl border text-left transition-all relative ${
                        isSelected
                          ? 'border-primary-500 bg-primary-50/70 shadow-md ring-2 ring-primary-500/20'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <span className="font-heading font-bold text-sm text-dark-900 block leading-snug">
                        {pkg.name}
                      </span>
                      <span className="font-bengali text-xs text-primary-600 font-semibold block mt-0.5">
                        {pkg.bengali}
                      </span>
                      <div className="mt-2 text-xs font-bold text-primary-700">
                        ₹{pkg.pricePerPax} <span className="text-[10px] text-dark-500 font-normal">/person</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Package Inclusions */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-base text-dark-900 flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-primary-600" />
                  <span>Package Menu Inclusions:</span>
                </h4>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Unlimited Rice, Dal &amp; Condiments
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-dark-700 pt-2">
                {selectedPkg.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Group Size Slider */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-dark-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-primary-600" />
                  <span>2. Select Number of People:</span>
                </label>
                <div className="px-3 py-1 bg-primary-100 text-primary-800 font-heading font-black text-base rounded-xl">
                  {paxCount} Persons
                </div>
              </div>

              <input
                type="range"
                min={10}
                max={120}
                step={5}
                value={paxCount}
                onChange={(e) => setPaxCount(Number(e.target.value))}
                className="w-full accent-primary-600 cursor-pointer h-2 bg-gray-200 rounded-lg"
              />

              <div className="flex justify-between text-[11px] text-dark-400 font-medium">
                <span>10 (Small Group)</span>
                <span>35 (Mini Bus)</span>
                <span>60 (Large Tourist Bus)</span>
                <span>120+ (Charter)</span>
              </div>

              {/* Price Calculation Summary Box */}
              <div className="bg-gradient-to-br from-primary-50 to-amber-50/50 rounded-2xl p-4 border border-primary-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[11px] text-dark-500 block">
                    Base: ₹{selectedPkg.pricePerPax} × {paxCount} = ₹{rawTotal}
                  </span>
                  {discountPercent > 0 && (
                    <span className="text-xs font-bold text-emerald-700 block">
                      🎉 {discountPercent}% Group Discount (-₹{discountAmount})
                    </span>
                  )}
                  <span className="text-xs text-dark-600 block">
                    (₹{Math.round(finalTotal / paxCount)} / person effective)
                  </span>
                </div>
                <div className="sm:text-right">
                  <span className="text-xs text-dark-500 block">Estimated Total:</span>
                  <span className="font-heading font-black text-2xl text-primary-700">₹{finalTotal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form & Instant WhatsApp Quote */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl">
            {quoteSuccess ? (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 mb-1">
                    ✅ Quote Generated
                  </span>
                  <h4 className="font-heading font-bold text-2xl text-dark-900">Group Inquiry Sent!</h4>
                  <p className="text-xs text-dark-500 mt-1">
                    Reference <span className="font-bold text-primary-700">{quoteSuccess.id}</span> for {paxCount} persons.
                  </p>
                </div>

                <a
                  href={quoteSuccess.whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Group Quote to WhatsApp</span>
                </a>

                <button
                  onClick={() => setQuoteSuccess(null)}
                  className="w-full py-2 text-xs font-semibold text-dark-600 hover:text-dark-900"
                >
                  Calculate Another Package
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <Calculator className="w-5 h-5 text-primary-600" />
                  <h3 className="font-heading font-bold text-lg text-dark-900">Get Instant Group Quote</h3>
                </div>

                <div>
                  <label className="label text-xs">Organizer / Leader Name *</label>
                  <input
                    type="text"
                    required
                    value={organizerName}
                    onChange={(e) => setOrganizerName(e.target.value)}
                    placeholder="e.g. Debashis Sen"
                    className="input-field py-2 text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="label text-xs">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="input-field py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="label text-xs">Agency / Tour Name</label>
                    <input
                      type="text"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      placeholder="e.g. Dooars Travels"
                      className="input-field py-2 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="label text-xs flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary-600" /> Event Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toLocaleDateString('en-CA')}
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="input-field py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="label text-xs flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-primary-600" /> Meal Time *
                    </label>
                    <select
                      value={mealTime}
                      onChange={(e) => setMealTime(e.target.value as any)}
                      className="input-field py-2 text-xs bg-white"
                    >
                      <option value="Breakfast">Breakfast (7:30 AM - 10:30 AM)</option>
                      <option value="Lunch">Lunch (12:30 PM - 3:30 PM)</option>
                      <option value="High Tea">High Tea & Snacks (4:30 PM - 6:30 PM)</option>
                      <option value="Dinner">Dinner (7:30 PM - 10:30 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label text-xs">Special Food Requests or Bus Count</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. 1 Bus, 5 pure veg, non-spicy for elderly"
                    className="input-field py-2 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !organizerName || !phone}
                  className="btn-primary w-full py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Generating Quote...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-200" />
                      <span>Request Group Quote (₹{finalTotal})</span>
                    </>
                  )}
                </button>

                <div className="pt-2 text-[11px] text-dark-500 space-y-1">
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Free Bus &amp; Car Parking in premises
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Separate Driver Meal complimentary with 30+ pax
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
