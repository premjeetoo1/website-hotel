import Link from 'next/link';
import { Utensils, Home, Phone, ArrowLeft, MapPin } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary-50/40 via-white to-dark-50/50">
      {/* Branded Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-3 group focus:outline-none"
            aria-label="Aaroshi Hotel & Family Restaurant - Home"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-lg md:text-xl text-dark-950 tracking-tight leading-none">
                  Aaroshi Hotel
                </span>
                <span className="inline-flex px-1.5 py-0.5 rounded bg-primary-100 text-[10px] font-bold text-primary-700 uppercase tracking-wide">
                  3.9 ★ (997+)
                </span>
              </div>
              <span className="block font-bengali text-xs text-dark-500 leading-tight">
                আরসি হোটেল & ফ্যামিলি রেস্টুরেন্ট
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-dark-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </header>

      {/* Main 404 Content */}
      <main id="main-content" className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-xl w-full text-center">
          {/* Decorative culinary 404 badge */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-400/20 via-primary-500/10 to-primary-600/20 rounded-full blur-xl" />
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 p-0.5 shadow-xl shadow-primary-500/25">
              <div className="w-full h-full bg-white rounded-[22px] flex flex-col items-center justify-center p-3">
                <Utensils className="w-10 h-10 sm:w-12 sm:h-12 text-primary-600 mb-1" />
                <span className="font-heading font-extrabold text-2xl sm:text-3xl text-dark-950 tracking-tight leading-none">
                  404
                </span>
              </div>
            </div>
          </div>

          {/* Bengali text pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-200/80 text-primary-800 text-xs sm:text-sm font-medium mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            <span className="font-bengali font-semibold">পৃষ্ঠাটি পাওয়া যায়নি · 404 Page Not Found</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-dark-950 tracking-tight mb-3">
            Dish Not Found
          </h1>

          <p className="text-base sm:text-lg text-dark-600 leading-relaxed max-w-md mx-auto mb-8">
            Looks like this dish isn&apos;t on our menu! The page you&apos;re looking for doesn&apos;t exist or has moved.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 mb-10">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-primary-600 hover:bg-primary-700 active:scale-[0.98] transition-all shadow-md shadow-primary-600/25"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/#menu"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-dark-900 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-300 active:scale-[0.98] transition-all shadow-sm"
            >
              <Utensils className="w-5 h-5 text-primary-600" />
              <span>View Menu</span>
            </Link>

            <a
              href="tel:+919563161422"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-dark-700 bg-gray-100 hover:bg-gray-200 active:scale-[0.98] transition-all"
            >
              <Phone className="w-5 h-5 text-dark-600" />
              <span>Call Restaurant</span>
            </a>
          </div>

          {/* Quick info card */}
          <div className="pt-6 border-t border-gray-200/80 max-w-md mx-auto text-center">
            <p className="inline-flex items-center justify-center gap-1.5 text-xs text-dark-500">
              <MapPin className="w-3.5 h-3.5 text-primary-600" />
              <span>Mahabari, Chalsa, West Bengal 735206 · Open 7:00 AM – 11:00 PM</span>
            </p>
          </div>
        </div>
      </main>

      {/* Branded Minimal Footer */}
      <footer className="border-t border-gray-100 py-6 text-center text-xs text-dark-400">
        <p>© {new Date().getFullYear()} Aaroshi Hotel &amp; Family Restaurant. All rights reserved.</p>
      </footer>
    </div>
  );
}
