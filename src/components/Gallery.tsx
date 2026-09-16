'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ZoomIn } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=80',
    title: 'Smoky Tandoori Chicken Fresh from Clay Oven',
    bengali: 'গরম তন্দুরি চিকেন',
    category: 'Food',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    title: 'Comfortable AC Family Dining Hall',
    bengali: 'এসি ফ্যামিলি খাবার হল',
    category: 'Interior',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    title: 'Rich Dhaba Mutton Kosha',
    bengali: 'কষা মাংস ও পরোটা',
    category: 'Food',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1545247181-516773cae7be?auto=format&fit=crop&w=1000&q=80',
    title: 'Highway Garden Verandah & Parking',
    bengali: 'গার্ডেন ভিউ ও পার্কিং',
    category: 'Ambiance',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80',
    title: 'Steaming Hot Chicken Momos with Dalle Dip',
    bengali: 'গরম চিকেন মোমো',
    category: 'Food',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80',
    title: 'Authentic Bengali River Fish Thali',
    bengali: 'বাঙালি মাছের থালি',
    category: 'Food',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1000&q=80',
    title: 'Clay Pot Mishti Doi & Soft Rosogolla',
    bengali: 'মিষ্টি দই ও রসগোল্লা',
    category: 'Dessert',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1000&q=80',
    title: 'Crispy Butter Naan & Dal Tadka',
    bengali: 'বাটার নান ও ডাল তড়কা',
    category: 'Food',
  },
];

const CATEGORIES = ['All', 'Food', 'Interior', 'Ambiance', 'Dessert'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  const filtered =
    selectedCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white relative overflow-hidden" aria-labelledby="gallery-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold mb-3 border border-primary-100">
              <Sparkles className="w-3.5 h-3.5 text-primary-500" />
              <span>ছবি ও মুহূর্ত · Restaurant Photo Gallery</span>
            </div>
            <h2 id="gallery-heading" className="section-title">
              Visual Flavors &amp; Highway Ambiance
            </h2>
            <p className="section-subtitle">
              A glimpse into our sizzling tandoori oven, AC family dining halls, and Dooars highway stopover.
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-gray-100 rounded-2xl self-start md:self-auto">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-dark-600 hover:text-dark-900 hover:bg-gray-200/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((img) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImage(img)}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl border border-gray-100"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                  <span className="self-end p-2 rounded-full bg-white/20 backdrop-blur-md text-white">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[10px] font-bold text-primary-300 uppercase tracking-wider block mb-1">
                      {img.category}
                    </span>
                    <h3 className="font-heading font-bold text-sm text-white leading-snug">
                      {img.title}
                    </h3>
                    <p className="font-bengali text-xs text-primary-200">{img.bengali}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox"
            onKeyDown={(e) => {
              if (e.key === 'Escape') setSelectedImage(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-dark-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-3xl w-full bg-dark-900 rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/10"
            >
              <button
                onClick={() => setSelectedImage(null)}
                aria-label="Close lightbox"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-dark-950/60 hover:bg-dark-950 text-white flex items-center justify-center backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>

              <div className="p-5 text-white flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg">{selectedImage.title}</h3>
                  <p className="font-bengali text-sm text-amber-400">{selectedImage.bengali}</p>
                </div>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-dark-300">
                  {selectedImage.category}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}