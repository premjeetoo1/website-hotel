'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useCartToast } from '@/components/CartToast';
import {
  Sparkles,
  Plus,
  Star,
  Check,
  Flame,
  Leaf,
  Drumstick,
} from 'lucide-react';

const popularDishes = [
  {
    id: 'aaroshi-tandoori-chicken',
    name: 'Smoky Tandoori Chicken',
    bengaliName: 'তন্দুরি চিকেন',
    price: 240,
    rating: 4.8,
    reviews: 214,
    category: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    description: 'Tender chicken marinated in yogurt & Kashmiri spices, charcoal-roasted in tandoor with mint chutney.',
    tag: 'Highway Bestseller',
    spicy: true,
  },
  {
    id: 'aaroshi-chicken-masala',
    name: 'Special Chicken Masala',
    bengaliName: 'চিকেন মসলা',
    price: 190,
    rating: 4.7,
    reviews: 188,
    category: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1545247181-516773cae7be?auto=format&fit=crop&w=800&q=80',
    description: 'Succulent chicken pieces cooked in thick tomato-onion gravy, tossed with roasted spices & coriander.',
    tag: 'Dhaba Favorite',
    spicy: true,
  },
  {
    id: 'aaroshi-mutton-kosha',
    name: 'Dhaba Mutton Kosha',
    bengaliName: 'মাংস কষা',
    price: 260,
    rating: 4.9,
    reviews: 165,
    category: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    description: 'Slow-simmered tender goat meat in rich caramelized onion gravy, aromatic whole garam masala.',
    tag: 'Must Try',
    spicy: true,
  },
  {
    id: 'aaroshi-chicken-momo',
    name: 'Steamed Chicken Momos (8 pcs)',
    bengaliName: 'চিকেন মোমো',
    price: 110,
    rating: 4.8,
    reviews: 192,
    category: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    description: 'Juicy minced chicken dumplings served with fiery dalle red chilli dip and clear hot soup.',
    tag: 'Popular',
    spicy: true,
  },
  {
    id: 'aaroshi-fish-thali',
    name: 'Bengali River Fish Thali',
    bengaliName: 'মাছ থালি',
    price: 260,
    rating: 4.7,
    reviews: 140,
    category: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    description: 'Fresh river fish curry, steamed basmati rice, yellow dal, seasonal bhaja, chutney, papad, sweet.',
    tag: 'Homestyle',
    spicy: false,
  },
  {
    id: 'aaroshi-nepali-khana',
    name: 'Nepali-Indian Mountain Thali',
    bengaliName: 'নেপালি পাহাড়ি থালি',
    price: 220,
    rating: 4.8,
    reviews: 118,
    category: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    description: 'Steamed rice, chicken/egg curry, black dal, gundruk achar, saag, fresh salad, papad.',
    tag: 'Traveler Special',
    spicy: true,
  },
  {
    id: 'aaroshi-butter-naan-tadka',
    name: 'Butter Naan with Dal Tadka',
    bengaliName: 'বাটার নান ও ডাল তড়কা',
    price: 150,
    rating: 4.6,
    reviews: 95,
    category: 'Veg',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    description: '2 fluffy tandoor butter naans served with smoky yellow dal fry tempered with cumin & garlic butter.',
    tag: 'Comfort Food',
    spicy: false,
  },
  {
    id: 'aaroshi-mishti-doi',
    name: 'Earthen Pot Mishti Doi & Sweets',
    bengaliName: 'মিষ্টি দই ও রসগোল্লা',
    price: 60,
    rating: 4.9,
    reviews: 180,
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
    description: 'Creamy caramelized sweet yogurt set in earthen clay pot with soft spongy rosogolla.',
    tag: 'Sweet Finish',
    spicy: false,
  },
];

export default function PopularDishes() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const { addItem } = useCart();
  const { showToast } = useCartToast();

  const filteredDishes =
    selectedFilter === 'All'
      ? popularDishes
      : selectedFilter === 'Veg'
      ? popularDishes.filter((d) => d.category === 'Veg' || d.category === 'Dessert')
      : popularDishes.filter((d) => d.category === 'Non-Veg');

  const handleAddToCart = (dish: (typeof popularDishes)[0]) => {
    addItem({
      id: dish.id,
      name: dish.name,
      bengaliName: dish.bengaliName,
      price: dish.price,
      image: dish.image,
    });

    showToast(dish.name);
    setAddedItems((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [dish.id]: false }));
    }, 1200);
  };

  return (
    <section id="dishes" className="py-20 md:py-28 bg-gray-50/50 relative overflow-hidden" aria-labelledby="popular-dishes-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold mb-3 border border-primary-100">
              <Sparkles className="w-3.5 h-3.5 text-primary-500" />
              <span>জনপ্রিয় খাবার · Signature Dishes</span>
            </div>
            <h2 id="popular-dishes-heading" className="section-title">
              Customer Favorite Delights
            </h2>
            <p className="section-subtitle">
              Most loved Tandoori, Dhaba curries, Nepali momos &amp; Bengali thalis served at Aaroshi Hotel Chalsa.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-gray-200/70 rounded-2xl self-start md:self-auto">
            {['All', 'Non-Veg', 'Veg'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedFilter === filter
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-dark-600 hover:text-dark-900'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDishes.map((dish, index) => {
            const isAdded = !!addedItems[dish.id];
            return (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="card rounded-3xl overflow-hidden flex flex-col justify-between group bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="px-2.5 py-1 bg-dark-900/80 backdrop-blur-md text-white text-[10px] font-bold rounded-full tracking-wide border border-white/10">
                        {dish.tag}
                      </span>
                    </div>

                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-md shadow-sm border flex items-center gap-1 bg-white/95 text-dark-800 border-gray-100">
                      {dish.category === 'Veg' ? (
                        <Leaf className="w-3 h-3 text-emerald-600" />
                      ) : dish.category === 'Dessert' ? (
                        <Sparkles className="w-3 h-3 text-amber-500" />
                      ) : (
                        <Drumstick className="w-3 h-3 text-red-500" />
                      )}
                      {dish.category}
                    </span>

                    <div className="absolute bottom-2.5 left-3 right-3 text-white">
                      <p className="font-bengali text-xs text-amber-200 drop-shadow-sm">{dish.bengaliName}</p>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="font-heading font-bold text-base text-dark-900 group-hover:text-primary-600 transition-colors leading-snug">
                        {dish.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 mb-2 text-xs text-dark-500">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{dish.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{dish.reviews} orders</span>
                    </div>

                    <p className="text-dark-500 text-xs line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <span className="text-[10px] text-dark-400 block leading-none">Price</span>
                      <span className="font-heading font-black text-lg text-dark-900">₹{dish.price}</span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(dish)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                        isAdded
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-600/20 active:scale-95'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Order</span>
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