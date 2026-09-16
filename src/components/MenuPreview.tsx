'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useCartToast } from '@/components/CartToast';
import {
  Plus,
  Check,
  Search,
  Sparkles,
  Flame,
  CalendarCheck,
  ShoppingBag,
  ArrowRight,
  Utensils,
} from 'lucide-react';

export const ALL_MENU_CATEGORIES = [
  {
    id: 'thali',
    name: 'Authentic Bengali Thalis',
    bengaliName: 'বাঙালি থালি',
    icon: '🍛',
    description: 'Complete wholesome meals with rice, dal, seasonal bhaja, chutney, papad & mishti doi',
    items: [
      { name: 'Fish Thali (Rui/Katla)', bengali: 'মাছ থালি', price: 280, desc: 'Fresh river fish in mustard gravy, steamed rice, dal, seasonal sabzi, chutney, papad, mishti doi', popular: true, spicy: true },
      { name: 'Mutton Kosha Thali', bengali: 'মাংস থালি', price: 350, desc: 'Slow-cooked mutton kosha, basmati rice, dal, jhuri aloo bhaja, salad, papad, mishti doi', popular: true, spicy: true },
      { name: 'Chicken Curry Thali', bengali: 'চিকেন থালি', price: 300, desc: 'Homestyle chicken curry, steamed rice, dal, seasonal veg, chutney, papad, mishti doi', popular: false, spicy: true },
      { name: 'Pure Veg Bengali Thali', bengali: 'ভেজ থালি', price: 200, desc: 'Seasonal labra, chholar dal, aloo posto, rice, roti, papad, chutney, mishti doi', popular: false, spicy: false },
      { name: 'Double Egg Curry Thali', bengali: 'ডিম থালি', price: 180, desc: '2 boiled eggs in spicy dim-kosha gravy, rice, dal, seasonal veg, chutney, papad, sweet', popular: false, spicy: true },
      { name: 'Aaroshi Special Highway Mahathali', bengali: 'আরসি স্পেশাল মহাত্থালী', price: 420, desc: 'Fish + Mutton Kosha + Tandoori Chicken, basmati rice, luchi, polao, payesh, mishti & condiments', popular: true, spicy: true },
    ],
  },
  {
    id: 'biryani',
    name: 'Aromatic Biryani & Rice',
    bengaliName: 'বিরিয়ানি ও পোলাও',
    icon: '🍚',
    description: 'Aromatic long-grain basmati cooked with saffron, rich spices & served with mint raita',
    items: [
      { name: 'Dooars Highway Egg Biryani (2 Eggs)', bengali: 'ডিম বিরিয়ানি', price: 180, desc: 'Basmati rice, 2 spiced eggs, golden potato, mint raita', popular: true, spicy: false },
      { name: 'Kolkata Chicken Biryani', bengali: 'চিকেন বিরিয়ানি', price: 220, desc: 'Fragrant basmati, succulent chicken piece, potato, boiled egg, saffron, mint raita', popular: true, spicy: true },
      { name: 'Special Mutton Biryani', bengali: 'মাটন বিরিয়ানি', price: 280, desc: 'Tender goat meat, spiced saffron basmati, aloo, mint raita', popular: false, spicy: true },
      { name: 'Subz Veg Biryani', bengali: 'ভেজ বিরিয়ানি', price: 160, desc: 'Garden vegetables, cottage cheese cubes, saffron basmati, raita', popular: false, spicy: false },
      { name: 'Chicken Fried Rice', bengali: 'চিকেন ফ্রাইড রাইস', price: 180, desc: 'Wok-tossed long-grain rice, chicken shreds, vegetables, soy seasoning', popular: false, spicy: false },
      { name: 'Veg Hakka Fried Rice', bengali: 'ভেজ ফ্রাইড রাইস', price: 140, desc: 'Wok-tossed rice with spring onion, bell pepper, carrots', popular: false, spicy: false },
    ],
  },
  {
    id: 'tibetan',
    name: 'Himalayan & Nepali Special',
    bengaliName: 'হিমালয়ান ও নেপালি খাবার',
    icon: '🥟',
    description: 'Authentic mountain dumplings, hot noodle soups & roadside Nepali favorites',
    items: [
      { name: 'Steamed Pork Momos (8 pcs)', bengali: 'পোর্ক মোমো', price: 120, desc: 'Hand-minced pork, mountain herbs, served with fiery dalle chilli chutney & soup', popular: true, spicy: true },
      { name: 'Steamed Chicken Momos (8 pcs)', bengali: 'চিকেন মোমো', price: 110, desc: 'Juicy minced chicken dumplings with spicy red dip & clear hot broth', popular: true, spicy: true },
      { name: 'Fresh Veg Momos (8 pcs)', bengali: 'ভেজ মোমো', price: 90, desc: 'Fresh cabbage, mountain greens, paneer filling with garlic dip', popular: false, spicy: true },
      { name: 'Pan-Fried Kothey Momos (8 pcs)', bengali: 'কোথে মোমো', price: 140, desc: 'Crispy fried bottom dumplings with spicy schezwan dip', popular: false, spicy: true },
      { name: 'Chicken Thukpa Noodle Soup', bengali: 'চিকেন থুপকা', price: 160, desc: 'Tibetan comfort noodle broth with shredded chicken, vegetables & mountain herbs', popular: true, spicy: false },
      { name: 'Veg Mountain Thukpa', bengali: 'ভেজ থুপকা', price: 130, desc: 'Steaming aromatic noodle soup loaded with fresh hill greens', popular: false, spicy: false },
      { name: 'Tibetan Shaphaley (2 pcs)', bengali: 'শাফালে', price: 140, desc: 'Golden crispy deep-fried Tibetan meat pies with spicy relish', popular: false, spicy: true },
    ],
  },
  {
    id: 'chinese',
    name: 'Indo-Chinese Delights',
    bengaliName: 'চাইনিজ খাবার',
    icon: '🥢',
    description: 'Fiery wok-tossed noodles, crispy chilli chicken and savory gravies',
    items: [
      { name: 'Chicken Hakka Chowmein', bengali: 'চিকেন চাউমিন', price: 160, desc: 'Wok-tossed hakka noodles, sliced chicken, cabbage, capsicum, soy', popular: true, spicy: false },
      { name: 'Egg Chowmein', bengali: 'এগ চাউমিন', price: 140, desc: 'Hakka noodles with scrambled eggs and garden vegetables', popular: false, spicy: false },
      { name: 'Chilli Chicken Gravy/Dry', bengali: 'চিলি চিকেন', price: 190, desc: 'Crispy chicken tossed with bell peppers, green chillies & dark soy', popular: true, spicy: true },
      { name: 'Chicken Manchurian', bengali: 'চিকেন মাঞ্চুরিয়ান', price: 180, desc: 'Crispy chicken dumplings in tangy coriander-garlic Manchurian gravy', popular: true, spicy: true },
      { name: 'Chilli Paneer Dry', bengali: 'চিলি পনির', price: 170, desc: 'Fresh cottage cheese cubes, onion petals, capsicum, green chilli glaze', popular: false, spicy: true },
      { name: 'Crispy Veg Spring Rolls (4 pcs)', bengali: 'স্প্রিং রোলস', price: 100, desc: 'Golden rolls with spicy sweet chilli sauce', popular: false, spicy: false },
    ],
  },
  {
    id: 'curries',
    name: 'Main Course Bengali Curries',
    bengaliName: 'বাঙালি স্পেশাল তরকারি',
    icon: '🍲',
    description: 'Generational Bengali gravies slow-cooked in cold-pressed mustard oil',
    items: [
      { name: 'Mutton Kosha (Rich Goat Curry)', bengali: 'মাংস কষা', price: 250, desc: 'Signature slow-cooked mutton in thick spicy caramelized onion-garlic masala', popular: true, spicy: true },
      { name: 'Katla/Rui Macher Jhol', bengali: 'মাছের ঝোল', price: 180, desc: 'Fresh river fish in traditional cumin-ginger-mustard broth', popular: true, spicy: true },
      { name: 'Fish Kalia', bengali: 'মাছ কালিয়া', price: 200, desc: 'Rich celebratory fish gravy with caramelized onions & whole spices', popular: false, spicy: true },
      { name: 'Bengali Chicken Curry', bengali: 'চিকেন তরকারি', price: 180, desc: 'Homestyle chicken gravy with golden fried potato halves', popular: false, spicy: true },
      { name: 'Aloo Posto', bengali: 'আলু পোস্তো', price: 100, desc: 'Classic diced potatoes in stone-ground poppy seed paste with green chillies', popular: true, spicy: false },
      { name: 'Chholar Dal with Narkol', bengali: 'চোলার ডাল', price: 90, desc: 'Bengal gram dal tempered with roasted coconut bits, hing & garam masala', popular: false, spicy: false },
    ],
  },
  {
    id: 'breakfast',
    name: 'Breakfast & Bengali Snacks',
    bengaliName: 'সকালের জলখাবার ও স্ন্যাকস',
    icon: '☕',
    description: 'Hot breakfast served daily from 07:00 AM to 11:30 AM',
    items: [
      { name: 'Hot Luchi & Aloor Dum (4 pcs)', bengali: 'লুচি ও আলুর দম', price: 90, desc: 'Puffed golden luchis served with spiced Hing aloor dum & salad', popular: true, spicy: true },
      { name: 'Radhaballabhi with Chholar Dal', bengali: 'রাধাবল্লভী', price: 110, desc: 'Stuffed spiced urad-dal puris with sweet-savory Bengal gram dal', popular: false, spicy: true },
      { name: 'Koraishutir Kachuri (Seasonal)', bengali: 'করাইশুতির কচুরি', price: 110, desc: 'Green pea stuffed kachuris with aloor dum & sweet chutney', popular: true, spicy: true },
      { name: 'Double Egg Paratha Roll', bengali: 'এগ রোল', price: 80, desc: 'Flaky paratha rolled with fried egg, sliced onion, green chilli, lime', popular: true, spicy: false },
      { name: 'Chicken Kathi Roll', bengali: 'চিকেন রোল', price: 100, desc: 'Crispy paratha wrap loaded with spicy chicken chunks & mint sauce', popular: true, spicy: false },
      { name: 'Stuffed Aloo Paratha Set', bengali: 'আলু পরোটা সেট', price: 110, desc: '2 stuffed parathas, curd, mango pickle, fresh butter', popular: false, spicy: false },
    ],
  },
  {
    id: 'sweets',
    name: 'Traditional Bengali Sweets',
    bengaliName: 'বাঙালি মিষ্টি',
    icon: '🍮',
    description: 'Handcrafted traditional sweets made fresh in-house every morning',
    items: [
      { name: 'Sponge Rosogolla (4 pcs)', bengali: 'রসগোল্লা', price: 60, desc: 'Soft spongy chhena dumplings soaked in light cardamom syrup', popular: true, spicy: false },
      { name: 'Traditional Mishti Doi', bengali: 'মিষ্টি দই', price: 50, desc: 'Rich caramelized sweet yogurt set in traditional earthen clay pots', popular: true, spicy: false },
      { name: 'Gulab Jamun (4 pcs)', bengali: 'গুলাব জামুন', price: 60, desc: 'Mawa dumplings fried to golden brown, soaked in rose syrup', popular: true, spicy: false },
      { name: 'Kheer Mohan / Rajbhog (2 pcs)', bengali: 'রাজভোগ', price: 70, desc: 'Giant saffron-infused rosogolla stuffed with pistachios & cardamom', popular: false, spicy: false },
      { name: 'Gobindobhog Rice Payesh', bengali: 'পায়েস', price: 70, desc: 'Creamy aromatic rice pudding with condensed milk, raisins & cashews', popular: false, spicy: false },
    ],
  },
  {
    id: 'beverages',
    name: 'Tea & Refreshing Beverages',
    bengaliName: 'পানীয় ও চা',
    icon: '🥤',
    description: 'Fresh tea garden brews and cooling refreshes for highway travelers',
    items: [
      { name: 'Dooars Garden Black Tea', bengali: 'ডুয়ার্স স্পেশাল চা', price: 30, desc: 'Pure aromatic single-estate Dooars tea brew', popular: true, spicy: false },
      { name: 'Kullad Masala Milk Chai', bengali: 'মাটির ভাঁড়ের মসলা চা', price: 30, desc: 'Cardamom & ginger infused milk tea in clay cup', popular: true, spicy: false },
      { name: 'Sweet Mango Lassi', bengali: 'ম্যাঙ্গো লস্যি', price: 70, desc: 'Thick churned curd blended with Alphonso mango pulp', popular: true, spicy: false },
      { name: 'Fresh Sweet/Salted Lime Soda', bengali: 'ফ্রেশ লাইম সোডা', price: 40, desc: 'Sparkling soda with freshly squeezed lemons', popular: false, spicy: false },
    ],
  },
];

export default function MenuPreview() {
  const [activeTab, setActiveTab] = useState(ALL_MENU_CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [addedNames, setAddedNames] = useState<Record<string, boolean>>({});
  const { addItem, openReservation } = useCart();
  const { showToast } = useCartToast();

  const activeCategory = ALL_MENU_CATEGORIES.find((c) => c.id === activeTab) || ALL_MENU_CATEGORIES[0];

  const handleAdd = (item: { name: string; bengali: string; price: number }) => {
    addItem({
      id: `${activeCategory.id}-${item.name}`,
      name: item.name,
      bengaliName: item.bengali,
      price: item.price,
    });

    showToast(item.name);
    setAddedNames((prev) => ({ ...prev, [item.name]: true }));
    setTimeout(() => {
      setAddedNames((prev) => ({ ...prev, [item.name]: false }));
    }, 1200);
  };

  // Filter items based on active tab and search query
  const filteredItems = activeCategory.items.filter((item) =>
    searchQuery
      ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.bengali.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <section id="menu" className="py-20 md:py-28 bg-white relative overflow-hidden" aria-labelledby="menu-preview-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold mb-3 border border-primary-100">
            <Sparkles className="w-3.5 h-3.5 text-primary-500" />
            <span>খাবারের সম্পূর্ণ তালিকা · Complete Restaurant Menu</span>
          </div>

          <h2 id="menu-preview-heading" className="section-title">
            Explore Our Complete Menu
          </h2>

          <p className="section-subtitle mx-auto">
            Authentic Bengali, Himalayan Tibetan, and Indo-Chinese specialties prepared fresh daily in Chauk Bazaar. Order for delivery or reserve your dining table.
          </p>
        </div>

        {/* Live Search & Category Navigator */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          {/* Search Box */}
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-dark-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search thalis, momos, biryani, sweets..."
              className="w-full pl-11 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all shadow-sm"
              aria-label="Search all dishes"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-dark-400 hover:text-dark-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* 9 Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-gray-100/80 rounded-2xl">
            {ALL_MENU_CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab(cat.id);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-primary-700 shadow-md scale-105'
                      : 'text-dark-600 hover:text-dark-900 hover:bg-white/50'
                  }`}
                >
                  <span className="text-sm">{cat.icon}</span>
                  <span>{cat.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Description Banner */}
        <div className="max-w-4xl mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-r from-orange-50/70 to-amber-50/50 border border-primary-100 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-heading font-bold text-base text-dark-900 flex items-center gap-2">
              <span className="text-xl">{activeCategory.icon}</span>
              <span>{activeCategory.name}</span>
              <span className="font-bengali text-xs text-primary-600 font-medium">({activeCategory.bengaliName})</span>
            </h3>
            <p className="text-xs text-dark-500 mt-0.5">{activeCategory.description}</p>
          </div>

          <span className="text-xs font-bold text-dark-500 shrink-0 hidden sm:inline">
            {filteredItems.length} Dishes
          </span>
        </div>

        {/* Items Grid */}
        <div className="max-w-5xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-3xl border border-gray-100">
              <Utensils className="w-10 h-10 mx-auto text-dark-300 mb-2" />
              <p className="font-heading font-bold text-dark-800">No dishes matching &ldquo;{searchQuery}&rdquo;</p>
              <p className="text-xs text-dark-500 mt-1">Try searching for Thali, Momo, Fish, or Biryani</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item, idx) => {
                const isAdded = !!addedNames[item.name];
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.03 }}
                    className="p-5 rounded-2xl bg-white border border-gray-200/80 hover:border-primary-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div>
                          <h4 className="font-heading font-bold text-sm sm:text-base text-dark-900 group-hover:text-primary-600 transition-colors leading-snug">
                            {item.name}
                          </h4>
                          <p className="font-bengali text-xs text-primary-600 font-medium">{item.bengali}</p>
                        </div>

                        <span className="font-heading font-black text-sm text-dark-900 shrink-0">
                          ₹{item.price}
                        </span>
                      </div>

                      <p className="text-xs text-dark-500 leading-relaxed mb-4">{item.desc}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1.5">
                        {item.popular && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                            <Sparkles className="w-2.5 h-2.5" /> Popular
                          </span>
                        )}
                        {item.spicy && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800">
                            <Flame className="w-2.5 h-2.5" /> Spicy
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAdd(item)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isAdded
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white'
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
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Banner with Table Reservation CTA */}
        <div className="mt-14 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-dark-900 via-dark-950 to-primary-950 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-primary-400 uppercase tracking-wider block">
              Dine with us in Chalsa Mahabari
            </span>
            <h4 className="font-heading font-black text-xl sm:text-2xl text-white">
              Want to enjoy these hot at your reserved table?
            </h4>
            <p className="text-xs text-dark-300 max-w-md">
              Book an AC family table or garden verandah seat with hassle-free parking and we will have your fresh food ready.
            </p>
          </div>

          <Link
            href="#book-table"
            className="btn-primary px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-primary-500/25 flex items-center gap-2 shrink-0"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Book Table Now</span>
          </Link>
        </div>
      </div>
    </section>
  );
}