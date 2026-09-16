'use client';

import React from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Car,
  Utensils,
  ChevronRight,
  Heart,
} from 'lucide-react';

const footerLinks = {
  quickLinks: [
    { label: 'Home', href: '/#home' },
    { label: 'Book a Table', href: '/#book-table' },
    { label: 'Highway Express Pre-Order', href: '/#order-ahead' },
    { label: 'Full Menu', href: '/#menu' },
    { label: 'Tour Bus Packages', href: '/#group-catering' },
    { label: 'Rate Us on Google', href: '/#google-reviews' },
    { label: 'Highway Location', href: '/#contact' },
  ],
  services: [
    { label: 'Table Reservations', href: '/#book-table' },
    { label: 'AC Family Hall Dining', href: '/#book-table' },
    { label: 'Highway Express Drive-In', href: '/#order-ahead' },
    { label: 'Tour Bus & Group Meals', href: '/#group-catering' },
    { label: 'Spacious Car & Bus Parking', href: '/#about' },
    { label: 'Takeaway Food Packs', href: '/#menu' },
  ],
  popularDishes: [
    { label: 'Smoky Tandoori Chicken', href: '/#dishes' },
    { label: 'Special Chicken Masala', href: '/#dishes' },
    { label: 'Dhaba Mutton Kosha', href: '/#dishes' },
    { label: 'Steamed Chicken Momos', href: '/#dishes' },
    { label: 'Bengali River Fish Thali', href: '/#dishes' },
    { label: 'Butter Naan with Dal Tadka', href: '/#dishes' },
    { label: 'Nepali Himalayan Thali', href: '/#dishes' },
    { label: 'Earthen Pot Mishti Doi', href: '/#dishes' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Hygiene & Cleanliness', href: '#' },
  ],
};

const socialLinks = [
  {
    name: 'WhatsApp',
    href: 'https://wa.me/919563161422?text=Hi%20Aaroshi%20Hotel,%20I%20would%20like%20to%20inquire%20about%20dining%20and%20table%20booking',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.201.3-.778.98-.954 1.18-.175.2-.351.226-.652.076-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.676-2.085-.175-.3-.019-.462.132-.612.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.238-.244-.588-.493-.509-.678-.518-.176-.009-.376-.01-.577-.01s-.527.075-.803.376c-.276.301-1.054 1.03-1.054 2.512 0 1.482 1.079 2.912 1.23 3.113.15.2 2.122 3.24 5.141 4.542.718.31 1.279.495 1.716.634.721.229 1.377.197 1.895.12.578-.087 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.076-.125-.277-.2-.578-.35zm-5.468 7.562a9.88 9.88 0 0 1-5.034-1.378l-.361-.215-3.741.982.999-3.648-.236-.375a9.865 9.865 0 0 1-1.514-5.26c0-5.452 4.437-9.888 9.89-9.888 2.64 0 5.122 1.029 6.987 2.894a9.825 9.825 0 0 1 2.895 6.994c-.003 5.451-4.44 9.889-9.886 9.889zm8.413-18.3C18.188.893 15.232.001 12.004 0 5.456 0 .119 5.335.116 11.892c0 2.096.547 4.142 1.588 5.946L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    name: 'Google Maps Directions',
    href: 'https://maps.app.goo.gl/UCf5PsNf7h8sLZ6W6',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-950 text-white border-t border-dark-800" aria-label="Footer">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link
              href="/"
              className="flex items-center space-x-3 group focus:outline-none"
              aria-label="Aaroshi Hotel & Family Restaurant - Home"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading font-black text-lg md:text-xl text-white tracking-tight leading-none block">
                  AAROSHI HOTEL
                </span>
                <span className="font-bengali text-xs text-dark-400">
                  আরসি হোটেল &amp; ফ্যামিলি রেস্টুরেন্ট
                </span>
              </div>
            </Link>

            <p className="text-dark-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Top family restaurant &amp; highway dhaba in Chalsa Mahabari, Dooars. Delicious Tandoori, Dhaba Chicken &amp; Mutton curries, Nepali-Indian specialties, and authentic Bengali thalis with spacious parking facility.
            </p>

            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-dark-400 hover:bg-primary-600 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-950"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-dark-400 border-t border-dark-800 pt-4">
              <span className="font-bengali text-primary-300">আরসি হোটেল &amp; ফ্যামিলি রেস্টুরেন্ট</span>
              <span className="text-dark-700">|</span>
              <span>Mahabari, Chalsa, WB 735206</span>
              <span className="text-dark-700">|</span>
              <a href="tel:+919563161422" className="hover:text-primary-400 font-bold transition-colors">095631 61422</a>
            </div>
          </div>

          <nav aria-label="Quick links">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5" role="list">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-white mb-4">Services</h4>
            <ul className="space-y-2.5" role="list">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Popular dishes">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-white mb-4">Popular Dishes</h4>
            <ul className="space-y-2.5" role="list">
              {footerLinks.popularDishes.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-dark-500 text-xs">
              © {currentYear} Aaroshi Hotel &amp; Family Restaurant. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 text-xs text-dark-500">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-primary-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admin"
                className="text-xs text-dark-500 hover:text-primary-400 transition-colors inline-flex items-center gap-1 font-semibold"
              >
                <span>Staff Portal</span>
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center md:text-left">
            <p className="text-dark-500 text-xs">
              Made with ❤️ for Dooars Highway travelers &amp; food lovers
            </p>
            <p className="font-bengali text-[11px] text-dark-600 mt-0.5">
              ডুয়ার্স পর্যটক ও খাদ্য প্রেমীদের বিশ্বস্ত ঠিকানা
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}