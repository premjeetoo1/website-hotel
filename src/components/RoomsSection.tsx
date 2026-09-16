'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { submitRoomBooking, getWhatsAppRoomBookingUrl } from '@/lib/firebaseServices';
import confetti from 'canvas-confetti';
import {
  BedDouble,
  Wifi,
  Tv,
  ShowerHead,
  Car,
  UtensilsCrossed,
  CheckCircle2,
  Calendar,
  Users,
  Sparkles,
  Phone,
  MessageSquare,
  ShieldCheck,
  X,
} from 'lucide-react';

interface RoomType {
  id: 'deluxe-ac' | 'standard-non-ac' | 'family-quad' | 'tour-dorm';
  title: string;
  bengali: string;
  tag: string;
  price: number;
  capacity: string;
  bed: string;
  image: string;
  description: string;
  amenities: string[];
}

const ROOMS: RoomType[] = [
  {
    id: 'deluxe-ac',
    title: 'Deluxe AC Family Room',
    bengali: 'ডিলাক্স এসি ফ্যামিলি রুম',
    tag: 'Most Popular',
    price: 1499,
    capacity: '2 - 3 Guests',
    bed: '1 King Bed + Extra Mattress Option',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    description: 'Spacious air-conditioned room with premium bedding, modern bathroom, and peaceful Dooars garden view.',
    amenities: ['Split AC', '24/7 Hot Water', 'Free High-Speed WiFi', 'LED TV', 'Room Dining', 'Spacious Parking'],
  },
  {
    id: 'standard-non-ac',
    title: 'Standard Highway Room',
    bengali: 'স্ট্যান্ডার্ড নন-এসি রুম',
    tag: 'Budget Friendly',
    price: 899,
    capacity: '2 Guests',
    bed: '1 Queen Bed',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    description: 'Neat, comfortable room designed for highway travelers and tourists needing a refreshing night stay.',
    amenities: ['Ceiling Fan', 'Attached Bath', 'Free WiFi', 'TV', 'Spacious Parking', '24/7 Room Service'],
  },
  {
    id: 'family-quad',
    title: 'Family Suite (4-Bed)',
    bengali: 'ফ্যামিলি স্যুট (৪ বেড)',
    tag: 'Great For Families',
    price: 2199,
    capacity: '4 - 5 Guests',
    bed: '2 Queen Beds',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    description: 'Large family suite perfect for parents and kids or friends traveling together to Gorumara and Dooars.',
    amenities: ['Split AC', '24/7 Hot Water', 'Free WiFi', 'LED TV', 'Sofa Seating', 'Direct Car Parking Access'],
  },
  {
    id: 'tour-dorm',
    title: 'Tour Group / Driver Stay',
    bengali: 'ট্যুর গ্রুপ / ড্রাইভার রুম',
    tag: 'Tour Packages',
    price: 599,
    capacity: 'Per Person / Bed',
    bed: 'Single Clean Bunk / Cot',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    description: 'Economical, clean stay with hot shower and security for tour drivers, backpackers, and travel crew.',
    amenities: ['Clean Bedding', 'Hot Shower', 'Secure Lockers', 'Bus Parking', '24/7 Gate Guard'],
  },
];

export default function RoomsSection() {
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState(new Date().toLocaleDateString('en-CA'));
  const [checkOut, setCheckOut] = useState(
    new Date(Date.now() + 86400000).toLocaleDateString('en-CA')
  );
  const [roomsCount, setRoomsCount] = useState(1);
  const [guestsCount, setGuestsCount] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingPass, setBookingPass] = useState<{
    id: string;
    whatsAppUrl: string;
    total: number;
    nights: number;
  } | null>(null);

  const calculateNights = () => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();

  const handleOpenBooking = (room: RoomType) => {
    setSelectedRoom(room);
    setBookingPass(null);
  };

  const handleCloseModal = () => {
    setSelectedRoom(null);
    setBookingPass(null);
  };

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) return;

    setIsSubmitting(true);
    const totalEstimate = selectedRoom.price * roomsCount * nights;

    try {
      const roomTypeMap: Record<string, any> = {
        'deluxe-ac': 'Deluxe AC Room',
        'standard-non-ac': 'Standard Non-AC Room',
        'family-quad': 'Family Quad Room',
        'tour-dorm': 'Driver / Tour Dormitory',
      };

      const res = await submitRoomBooking({
        guestName,
        phone,
        roomType: roomTypeMap[selectedRoom.id] || 'Deluxe AC Room',
        roomsCount,
        guestsCount,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        nights,
        totalEstimate,
        specialRequests,
      });

      const whatsAppUrl = getWhatsAppRoomBookingUrl({
        id: res.id,
        guestName,
        phone,
        roomType: selectedRoom.title,
        roomsCount,
        guestsCount,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        nights,
        totalEstimate,
        specialRequests,
      });

      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ed741f', '#22c55e', '#fad7ad', '#3b82f6'],
        });
      } catch {
        // ignore
      }

      setBookingPass({
        id: res.id,
        whatsAppUrl,
        total: totalEstimate,
        nights,
      });
    } catch (err) {
      console.error('Room booking failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rooms" className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100/70 border border-primary-200/80 text-primary-800 text-xs font-bold uppercase tracking-wider mb-3">
            <BedDouble className="w-4 h-4 text-primary-600" />
            <span>হোটেলে থাকার সুব্যবস্থা · Clean Rooms &amp; Lodging</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-dark-950 tracking-tight">
            Stay in Comfort at <span className="gradient-text">Aaroshi Hotel Chalsa</span>
          </h2>
          <p className="mt-3 text-dark-600 text-sm sm:text-base leading-relaxed">
            Convenient highway stay with well-maintained AC &amp; Non-AC rooms, 24/7 hot water, spacious car/bus parking, and in-room dining for travelers exploring Dooars &amp; Gorumara.
          </p>

          {/* Quick Amenities Pill List */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs text-dark-700 font-medium">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-sm">
              <Car className="w-3.5 h-3.5 text-primary-600" /> Huge Bus &amp; Car Parking
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-sm">
              <ShowerHead className="w-3.5 h-3.5 text-primary-600" /> 24/7 Running Hot Water
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-sm">
              <Wifi className="w-3.5 h-3.5 text-primary-600" /> High-Speed WiFi
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-sm">
              <UtensilsCrossed className="w-3.5 h-3.5 text-primary-600" /> In-Room Hot Dining
            </span>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROOMS.map((room) => (
            <motion.div
              key={room.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col group"
            >
              {/* Room Image */}
              <div className="relative h-48 w-full overflow-hidden bg-dark-100">
                <Image
                  src={room.image}
                  alt={room.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-dark-900/80 backdrop-blur-md text-white border border-white/20">
                    {room.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <span className="text-xs font-semibold drop-shadow">{room.capacity}</span>
                  <div className="text-right">
                    <span className="text-xs opacity-80">from </span>
                    <span className="text-lg font-bold">₹{room.price}</span>
                    <span className="text-[11px] opacity-80">/night</span>
                  </div>
                </div>
              </div>

              {/* Room Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-dark-900 leading-snug">{room.title}</h3>
                  <p className="font-bengali text-xs text-primary-600 font-semibold mb-2">{room.bengali}</p>
                  <p className="text-xs text-dark-500 leading-relaxed line-clamp-2 mb-4">{room.description}</p>

                  <div className="space-y-1.5 mb-5">
                    {room.amenities.slice(0, 3).map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-dark-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenBooking(room)}
                  className="btn-primary w-full py-2.5 rounded-xl text-xs font-bold shadow-md shadow-primary-500/20 flex items-center justify-center gap-1.5 group-hover:bg-primary-600 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Check Availability &amp; Book</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highway Stay Banner */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-dark-900 via-dark-950 to-primary-950 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dooars Tour Group &amp; Family Stay Deals</span>
            </div>
            <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
              Planning a stay near Gorumara or Jaldapara?
            </h3>
            <p className="text-xs text-dark-300 max-w-xl leading-relaxed">
              We offer special discounted multi-night packages and tour group packages including hot breakfast, lunch, and dinner.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:+919563161422"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border border-white/20"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call Reception: 095631 61422</span>
            </a>
            <a
              href="https://wa.me/919563161422?text=Hello%20Aaroshi%20Hotel,%20I%20want%20to%20inquire%20about%20room%20availability%20and%20rates."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-5 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-primary-500/25 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </div>

      {/* Room Booking Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onKeyDown={(e) => { if (e.key === 'Escape') handleCloseModal(); }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-dark-950/70 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 border border-gray-100"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-dark-900 text-white p-6">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-[11px] font-semibold text-primary-100 mb-2 border border-white/10">
                  <BedDouble className="w-3.5 h-3.5 text-amber-300" />
                  <span>Aaroshi Hotel Stay Booking</span>
                </div>
                <h3 className="font-heading font-black text-2xl text-white">{selectedRoom.title}</h3>
                <p className="text-primary-100 text-xs mt-1">₹{selectedRoom.price}/night · {selectedRoom.bed}</p>
              </div>

              {/* Confirmation State */}
              {bookingPass ? (
                <div className="p-6 sm:p-8 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200 mb-1">
                      ✅ Room Booking Received
                    </span>
                    <h4 className="font-heading font-bold text-2xl text-dark-900">Stay Reserved Successfully!</h4>
                    <p className="text-dark-500 text-xs mt-1">
                      Welcome to Aaroshi Hotel, <span className="font-semibold text-dark-800">{guestName}</span>!
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-primary-50/60 border border-primary-100 rounded-2xl p-4 text-left space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-dark-500">Booking Reference</span>
                      <span className="font-mono font-bold text-primary-700">{bookingPass.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-500">Room</span>
                      <span className="font-semibold text-dark-900">{selectedRoom.title} ({roomsCount} Room)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-500">Check-In / Out</span>
                      <span className="font-semibold text-dark-900">{checkIn} to {checkOut} ({bookingPass.nights} Night{bookingPass.nights > 1 ? 's' : ''})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-500">Estimated Total</span>
                      <span className="font-bold text-primary-700 text-sm">₹{bookingPass.total}</span>
                    </div>
                  </div>

                  {/* 1-Click WhatsApp Action */}
                  <div className="space-y-2 pt-2">
                    <a
                      href={bookingPass.whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send Instant WhatsApp Alert to Hotel</span>
                    </a>
                    <button
                      onClick={handleCloseModal}
                      className="w-full py-2.5 rounded-xl text-xs font-semibold text-dark-600 hover:bg-gray-100 transition-colors"
                    >
                      Close &amp; Back to Website
                    </button>
                  </div>
                </div>
              ) : (
                /* Booking Form */
                <form onSubmit={handleBookSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="label text-xs">Guest Full Name *</label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. Subrata Roy"
                        className="input-field py-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="input-field py-2.5 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="label text-xs flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary-600" /> Check-In Date *
                      </label>
                      <input
                        type="date"
                        required
                        min={new Date().toLocaleDateString('en-CA')}
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="input-field py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="label text-xs flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary-600" /> Check-Out Date *
                      </label>
                      <input
                        type="date"
                        required
                        min={checkIn}
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="input-field py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="label text-xs">Number of Rooms</label>
                      <select
                        value={roomsCount}
                        onChange={(e) => setRoomsCount(Number(e.target.value))}
                        className="input-field py-2 text-xs bg-white"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'Room' : 'Rooms'}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label text-xs flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-primary-600" /> Total Guests
                      </label>
                      <select
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(Number(e.target.value))}
                        className="input-field py-2 text-xs bg-white"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Estimated Cost Pill */}
                  <div className="bg-primary-50 rounded-xl p-3.5 flex items-center justify-between border border-primary-200/60">
                    <div>
                      <span className="text-[11px] text-dark-500 block">Total Stay Estimate ({nights} Night{nights > 1 ? 's' : ''})</span>
                      <span className="font-heading font-black text-lg text-primary-700">₹{selectedRoom.price * roomsCount * nights}</span>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-100/80 px-2.5 py-1 rounded-lg">
                      Pay at Hotel Check-In
                    </span>
                  </div>

                  <div>
                    <label className="label text-xs">Special Notes / Arrival Time (Optional)</label>
                    <input
                      type="text"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="e.g. Arriving 8 PM, Need extra blanket, Parking for 1 car"
                      className="input-field py-2 text-xs"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || !guestName || !phone}
                      className="btn-primary w-full py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Reserving Stay...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4 text-amber-200" />
                          <span>Confirm Stay Booking</span>
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-dark-400 mt-2">
                      Zero advance payment required · Free cancellation · 24/7 Check-in
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
