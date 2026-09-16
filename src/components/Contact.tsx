'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { submitContactMessage } from '@/lib/firebaseServices';
import confetti from 'canvas-confetti';
import {
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  Car,
  ExternalLink,
  Navigation,
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [messageId, setMessageId] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await submitContactMessage({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
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

      setMessageId(res.id);
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-dark-950 text-white relative overflow-hidden" aria-labelledby="contact-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-xs font-bold mb-4 border border-primary-500/30">
                <Sparkles className="w-3.5 h-3.5 text-primary-400" />
                <span>যোগাযোগ ও লোকেশন · Highway Location &amp; Contact</span>
              </div>
              <h2 id="contact-heading" className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                Visit Us at Chalsa Mahabari
              </h2>
              <p className="text-dark-400 text-sm sm:text-base mt-3 leading-relaxed">
                Easily accessible right on the Dooars Highway with spacious parking for cars, SUVs &amp; buses.
              </p>
            </div>

            <div className="space-y-6">
              {/* Address card */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-dark-900/80 border border-dark-800">
                <div className="w-12 h-12 rounded-xl bg-primary-500/20 text-primary-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-base text-white">Our Address</h3>
                    <a
                      href="https://maps.app.goo.gl/UCf5PsNf7h8sLZ6W6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-primary-400 hover:text-primary-300 font-semibold underline flex items-center gap-1"
                    >
                      <span>Open in Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-dark-300 text-xs sm:text-sm mt-0.5 leading-relaxed">
                    Mahabari, Chalsa, Chalsa Mahabari, West Bengal 735206
                  </p>
                  <p className="font-mono text-xs text-primary-400 mt-1">Plus Code: VRJ7+JC Chalsa, WB</p>
                </div>
              </div>

              {/* Phone card */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-dark-900/80 border border-dark-800">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white">Direct Phone &amp; Orders</h3>
                  <p className="text-dark-300 text-xs sm:text-sm mt-0.5">
                    For table booking, bulk tour catering &amp; highway inquiries:
                  </p>
                  <a
                    href="tel:+919563161422"
                    className="font-heading font-black text-lg text-primary-400 hover:underline block mt-1"
                  >
                    095631 61422
                  </a>
                </div>
              </div>

              {/* Hours & Parking card */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-dark-900/80 border border-dark-800">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white">Hours &amp; Parking</h3>
                  <p className="text-dark-300 text-xs sm:text-sm mt-0.5">
                    Open All 7 Days: <span className="text-white font-semibold">07:00 AM – 11:00 PM</span>
                  </p>
                  <p className="text-emerald-400 text-xs mt-1 flex items-center gap-1 font-semibold">
                    <Car className="w-3.5 h-3.5" /> Free Spacious Parking Available
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-3xl bg-dark-900/90 border border-dark-800 shadow-2xl backdrop-blur-md"
            >
              {status === 'success' ? (
                <div className="text-center py-12 space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </motion.div>
                  <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/30">
                    ✅ Message Sent
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-white">Message Dispatched!</h3>
                  <p className="text-dark-300 text-sm max-w-sm mx-auto">
                    Thank you! We have received your note. Reference: <code className="font-mono text-primary-400">{messageId}</code>. Our manager will call you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-primary py-2.5 px-6 text-xs font-bold rounded-xl mt-4"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-white">Send Us a Direct Message</h3>
                    <p className="text-xs text-dark-400 mt-1">Tour group catering, bulk thali delivery, or highway inquiries</p>
                  </div>

                  {status === 'error' && (
                    <div className="p-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl text-xs">
                      Failed to send message. Please call us directly at 095631 61422.
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="text-xs font-medium text-dark-300 block mb-1">Your Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Subhendu Ghosh"
                        className="w-full px-4 py-3 bg-dark-950 border border-dark-700 rounded-xl text-sm text-white placeholder:text-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="text-xs font-medium text-dark-300 block mb-1">Phone Number *</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 95631 61422"
                        className="w-full px-4 py-3 bg-dark-950 border border-dark-700 rounded-xl text-sm text-white placeholder:text-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="text-xs font-medium text-dark-300 block mb-1">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. subhendu@example.com"
                      className="w-full px-4 py-3 bg-dark-950 border border-dark-700 rounded-xl text-sm text-white placeholder:text-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="text-xs font-medium text-dark-300 block mb-1">Your Inquiry / Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tour bus group lunch, family dinner reservation, spicy food preference..."
                      className="w-full px-4 py-3 bg-dark-950 border border-dark-700 rounded-xl text-sm text-white placeholder:text-dark-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary w-full py-3.5 text-sm font-bold rounded-xl shadow-lg shadow-primary-600/20 flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        {/* Map Header & Driving Directions Link */}
        <div className="mt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-400" />
              <span>Interactive Google Map &amp; Highway Directions</span>
            </h3>
            <p className="text-xs text-dark-400">Located on the main Dooars Chalsa highway with ample parking</p>
          </div>
          <a
            href="https://maps.app.goo.gl/UCf5PsNf7h8sLZ6W6"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 shrink-0"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Live Driving Directions (Google Maps)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Map Embed centered on Chalsa Mahabari */}
        <div className="rounded-3xl overflow-hidden border border-dark-700/80 shadow-2xl">
          <iframe
            src="https://maps.google.com/maps?q=Chalsa+Mahabari,+West+Bengal+735206&t=&z=14&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="340"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Aaroshi Hotel & Family Restaurant Location Map Chalsa Mahabari"
            className="w-full grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>
    </section>
  );
}