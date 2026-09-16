'use client';

import React from 'react';
import { Star, ExternalLink, ThumbsUp, Sparkles, MessageSquareHeart } from 'lucide-react';
import { GOOGLE_REVIEW_URL } from '@/lib/firebaseServices';

export default function GoogleReviewBadge() {
  return (
    <section id="google-reviews" className="py-14 bg-gradient-to-r from-amber-500 via-primary-600 to-primary-700 text-white relative overflow-hidden">
      {/* Decorative Blur Circles */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto rounded-3xl bg-white/10 backdrop-blur-md p-6 sm:p-10 border border-white/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Side: Rating Info */}
          <div className="text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Google Reviews · গুগল রিভিউ</span>
            </div>

            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white leading-tight">
              Enjoyed your meal at Aaroshi Hotel?
            </h3>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="flex items-center gap-1 text-amber-200">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-300 text-amber-300" />
                ))}
              </div>
              <span className="font-heading font-black text-xl text-white">3.9 ★</span>
              <span className="text-xs text-primary-100 font-medium">(997+ Verified Google Reviews)</span>
            </div>

            <p className="text-xs sm:text-sm text-primary-50 max-w-lg leading-relaxed">
              Your valuable feedback helps fellow travelers find the best food and clean stay in Chalsa Dooars. Rate us 5 stars on Google Maps!
            </p>
          </div>

          {/* Right Side: CTA Button */}
          <div className="flex flex-col sm:flex-row md:flex-col items-center gap-3 shrink-0">
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-2xl bg-white text-dark-950 hover:bg-amber-50 font-heading font-black text-sm sm:text-base shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 group"
            >
              <MessageSquareHeart className="w-5 h-5 text-primary-600 group-hover:scale-110 transition-transform" />
              <span>Rate Us 5-Stars on Google</span>
              <ExternalLink className="w-4 h-4 text-dark-400 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <span className="text-[11px] text-primary-100 flex items-center gap-1 font-medium">
              <ThumbsUp className="w-3 h-3 text-amber-300" /> Takes only 30 seconds
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
