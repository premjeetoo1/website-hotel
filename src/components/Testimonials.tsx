'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitReview, getLiveReviews, ReviewData } from '@/lib/firebaseServices';
import confetti from 'canvas-confetti';
import {
  Star,
  MessageSquarePlus,
  X,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const DEFAULT_TESTIMONIALS = [
  {
    id: 't1',
    name: 'Anirban Dutta',
    title: 'Highway Traveler · 42 reviews',
    rating: 5,
    date: '2 weeks ago',
    text: "Well maintained rooms, restaurants and facilities with good staff. We stopped here on our way to Dooars and had a wonderful dinner.",
    tags: ['Good Staff', 'Clean Rooms', 'Highway Stop'],
    initials: 'AD',
    color: 'bg-orange-500',
  },
  {
    id: 't2',
    name: 'Prakash Sharma',
    title: 'Local Guide · 86 reviews',
    rating: 4,
    date: '1 month ago',
    text: "Good place, food quality is good with spacious parking facility. Safe place to park our SUV while enjoying hot tandoori roti and chicken.",
    tags: ['Spacious Parking', 'Food Quality', 'Fast Service'],
    initials: 'PS',
    color: 'bg-emerald-600',
  },
  {
    id: 't3',
    name: 'Deepak Thapa',
    title: 'Dooars Tourist · 19 reviews',
    rating: 5,
    date: '3 weeks ago',
    text: "The meal was delicious, Nepali -indian foods are served with reasonable price. The momos and thali were fresh and tasty.",
    tags: ['Nepali-Indian Food', 'Reasonable Price', 'Delicious Thali'],
    initials: 'DT',
    color: 'bg-blue-600',
  },
  {
    id: 't4',
    name: 'Swati Mukherjee',
    title: 'Family Traveler · 31 reviews',
    rating: 5,
    date: '2 months ago',
    text: "Great stop in Chalsa Mahabari! Tandoori chicken and mutton kosha were mouthwatering. AC family dining hall is clean and relaxing.",
    tags: ['Tandoori Chicken', 'Mutton Kosha', 'AC Family Dining'],
    initials: 'SM',
    color: 'bg-purple-600',
  },
];

export default function Testimonials() {
  const [reviews, setReviews] = useState(DEFAULT_TESTIMONIALS);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    dish: '',
    text: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function loadReviews() {
      try {
        const live = await getLiveReviews();
        if (live && live.length > 0) {
          const formatted = live.map((r, i) => ({
            id: r.id || `live-${i}`,
            name: r.name,
            title: 'Verified Customer',
            rating: r.rating || 5,
            date: 'Recent',
            text: r.text || r.comment || '',
            tags: r.dish ? [r.dish] : ['Dine-In'],
            initials: r.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .substring(0, 2),
            color: 'bg-primary-600',
          }));
          setReviews([...formatted, ...DEFAULT_TESTIMONIALS]);
        }
      } catch {
        // ignore
      }
    }
    loadReviews();
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    setIsSubmitting(true);
    try {
      await submitReview({
        name: newReview.name,
        rating: newReview.rating,
        dish: newReview.dish,
        text: newReview.text,
        date: 'Today',
      });

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ed741f', '#f19345', '#22c55e'],
        });
      } catch {
        // ignore
      }

      setSubmitted(true);
      setReviews((prev) => [
        {
          id: `user-${Date.now()}`,
          name: newReview.name,
          title: 'Verified Customer',
          rating: newReview.rating,
          date: 'Just now',
          text: newReview.text,
          tags: newReview.dish ? [newReview.dish] : ['Dine-In'],
          initials: newReview.name.substring(0, 2).toUpperCase(),
          color: 'bg-primary-600',
        },
        ...prev,
      ]);
    } catch {
      // ignore
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setSubmitted(false);
    setNewReview({ name: '', rating: 5, dish: '', text: '' });
  };

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-gray-50/70 relative overflow-hidden" aria-labelledby="reviews-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold mb-3 border border-primary-100">
              <Sparkles className="w-3.5 h-3.5 text-primary-500" />
              <span>গ্রাহক পর্যালোচনা · Customer Feedback</span>
            </div>
            <h2 id="reviews-heading" className="section-title">
              What Travelers &amp; Locals Say
            </h2>
            <p className="section-subtitle">
              Rated 3.9 ★ by 997+ guests on Google Reviews for our food quality, spacious parking, and friendly service in Chalsa.
            </p>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="btn-primary py-3 px-5 rounded-2xl text-xs font-bold shadow-md shadow-primary-500/20 inline-flex items-center gap-2 self-start md:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Share Your Experience</span>
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.slice(0, 4).map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < item.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-dark-800 ml-1.5">{item.rating}.0</span>
                </div>

                <p className="text-dark-700 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags?.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gray-100 text-dark-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <div
                    className={`w-9 h-9 rounded-full ${item.color} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm`}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xs text-dark-900 leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-dark-400">{item.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
            onKeyDown={(e) => {
              if (e.key === 'Escape') closeReviewModal();
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeReviewModal}
              className="fixed inset-0 bg-dark-950/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 border border-gray-100"
            >
              <button
                onClick={closeReviewModal}
                aria-label="Close modal"
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-dark-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {submitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-dark-900">Thank You!</h3>
                  <p className="text-xs text-dark-500">
                    Your review has been submitted and published live to our customer wall.
                  </p>
                  <button
                    onClick={closeReviewModal}
                    className="btn-primary w-full py-2.5 text-xs font-bold rounded-xl"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <h3 id="review-modal-title" className="font-heading font-bold text-xl text-dark-900">Share Your Experience</h3>
                    <p className="text-xs text-dark-500 mt-0.5">Tell us about your meal at Aaroshi Hotel &amp; Family Restaurant</p>
                  </div>

                  {/* Star Selector */}
                  <div>
                    <label className="text-xs font-semibold text-dark-700 block mb-1.5">Rating</label>
                    <div className="flex items-center gap-2" role="radiogroup" aria-label="Rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          aria-label={`${star} star${star > 1 ? 's' : ''}`}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="p-1 text-2xl focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              star <= newReview.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-dark-700 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      placeholder="e.g. Subhashish Roy"
                      className="input-field py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-dark-700 block mb-1">Favorite Dish Tried (Optional)</label>
                    <input
                      type="text"
                      value={newReview.dish}
                      onChange={(e) => setNewReview({ ...newReview, dish: e.target.value })}
                      placeholder="e.g. Tandoori Chicken, Mutton Kosha"
                      className="input-field py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-dark-700 block mb-1">Your Comments *</label>
                    <textarea
                      required
                      rows={3}
                      value={newReview.text}
                      onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                      placeholder="How was the taste, parking, service, and ambiance?"
                      className="input-field py-2 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-3 text-sm font-bold rounded-xl shadow-md shadow-primary-500/20"
                  >
                    {isSubmitting ? 'Publishing Review...' : 'Submit Review'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}