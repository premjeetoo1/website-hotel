'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useCartToast } from '@/components/CartToast';
import {
  Sparkles,
  Flame,
  ShoppingBag,
  Check,
  Tag,
  Clock,
  Car,
} from 'lucide-react';

interface SpecialOfferItem {
  id: string;
  name: string;
  bengaliName: string;
  regularPrice: number;
  offerPrice: number;
  savings: number;
  savingsBadge: string;
  description: string;
  serves: string;
  image: string;
}

const specialOffers: SpecialOfferItem[] = [
  {
    id: 'aaroshi-highway-family-feast',
    name: 'Dooars Highway Family Feast (Serves 4)',
    bengaliName: 'হাইওয়ে ফ্যামিলি ভোজ প্যাকেজ',
    regularPrice: 850,
    offerPrice: 649,
    savings: 201,
    savingsBadge: 'SAVE ₹201',
    description: 'Full Tandoori Chicken + 2 Special Chicken Masala + 6 Butter Naan + 1 Plate Momos + 4 Gulab Jamun',
    serves: 'Ideal for 4 Persons',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'aaroshi-tandoori-thali-combo',
    name: 'Mutton Kosha & Tandoori Platter',
    bengaliName: 'মাংস কষা ও তন্দুরি প্ল্যাটার',
    regularPrice: 480,
    offerPrice: 369,
    savings: 111,
    savingsBadge: 'SAVE ₹111',
    description: 'Dhaba Mutton Kosha + Half Smoky Tandoori Chicken + Steamed Rice + 2 Butter Roti + Mishti Doi',
    serves: 'Ideal for 1-2 Persons',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'aaroshi-himalayan-momo-combo',
    name: 'Himalayan Momo & Thukpa Party Box',
    bengaliName: 'পাহাড়ি মোমো ও থুপকা বক্স',
    regularPrice: 390,
    offerPrice: 299,
    savings: 91,
    savingsBadge: 'SAVE ₹91',
    description: '16 Pcs Steamed Chicken/Pork Momos + 2 Bowls Chicken Thukpa Soup + Spicy Dalle Dip',
    serves: 'Ideal for 2-3 Persons',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
  },
];

export default function SpecialOffers() {
  const { addItem } = useCart();
  const { showToast } = useCartToast();
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const handleOrder = (offer: SpecialOfferItem) => {
    addItem({
      id: offer.id,
      name: offer.name,
      bengaliName: offer.bengaliName,
      price: offer.offerPrice,
      image: offer.image,
    });
    showToast(offer.name);
    setRecentlyAddedId(offer.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1500);
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-orange-50/30 to-white relative overflow-hidden" aria-labelledby="offers-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-xs font-bold mb-3 border border-primary-200 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-primary-600 animate-pulse" />
            <span>বিশেষ অফার · Highway Traveler Combos</span>
          </div>
          <h2 id="offers-heading" className="section-title">
            Special Value Dining Combos
          </h2>
          <p className="section-subtitle mx-auto">
            Curated road-trip feasts and family combo packages at reasonable prices for travelers visiting Chalsa, Dooars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {specialOffers.map((offer) => {
            const isAdded = recentlyAddedId === offer.id;
            return (
              <motion.div
                key={offer.id}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl border border-gray-200/90 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                    <Image
                      src={offer.image}
                      alt={offer.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-primary-600 text-white text-xs font-black rounded-full shadow-md flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {offer.savingsBadge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[11px] font-semibold text-primary-200 block uppercase tracking-wider">
                        {offer.serves}
                      </span>
                      <h3 className="font-heading font-bold text-base sm:text-lg leading-snug">
                        {offer.name}
                      </h3>
                      <p className="font-bengali text-xs text-amber-200">{offer.bengaliName}</p>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-xs text-dark-600 leading-relaxed mb-4">
                      {offer.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-heading font-black text-2xl text-primary-600">
                          ₹{offer.offerPrice}
                        </span>
                        <span className="text-xs text-dark-400 line-through">
                          ₹{offer.regularPrice}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold block">
                        Save ₹{offer.savings} Today
                      </span>
                    </div>

                    <button
                      onClick={() => handleOrder(offer)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md ${
                        isAdded
                          ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                          : 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-600/25 active:scale-95'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Order Combo</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
