'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { submitOrder } from '@/lib/firebaseServices';
import confetti from 'canvas-confetti';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  CheckCircle,
  CheckCircle2,
  Clock,
  MapPin,
  UtensilsCrossed,
  ShieldCheck,
} from 'lucide-react';

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, clearCart, subtotal, totalItems } = useCart();
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway' | 'delivery'>('dine-in');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<{ id: string; isLive: boolean } | null>(null);

  const deliveryFee = orderType === 'delivery' ? 40 : 0;
  const gst = Math.round(subtotal * 0.05); // 5% GST for restaurant
  const grandTotal = subtotal + deliveryFee + gst;

  const executeOrderCheckout = async (verifiedPhone?: string) => {
    setIsSubmitting(true);
    try {
      const res = await submitOrder({
        customerName,
        phone: verifiedPhone || phone,
        address: orderType === 'delivery' ? address : undefined,
        orderType,
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        subtotal,
        total: grandTotal,
        instructions,
      });

      // Celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ed741f', '#22c55e', '#fad7ad', '#e05813'],
        });
      } catch {
        // ignore
      }

      setOrderConfirmed({ id: res.id, isLive: res.isLive });
      clearCart();
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || items.length === 0) return;
    if (orderType === 'delivery' && !address.trim()) return;

    await executeOrderCheckout(phone);
  };

  const handleClose = () => {
    setIsCartOpen(false);
    if (orderConfirmed) {
      setTimeout(() => setOrderConfirmed(null), 300);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Your Order" onKeyDown={(e) => { if (e.key === 'Escape') handleClose(); }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="absolute inset-0 bg-dark-950/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full"
            >
              {/* Header */}
              <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-primary-50/50 to-transparent">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-lg text-dark-900">Your Order</h2>
                    <p className="text-xs text-dark-500">Aaroshi Hotel Kitchen · Chalsa Mahabari</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-dark-600 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Order Confirmed View */}
              {orderConfirmed ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 shadow-inner"
                  >
                    <CheckCircle className="w-10 h-10" />
                  </motion.div>
                  <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200 mb-3">
                    ✅ Order Confirmed
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-dark-900 mb-2">Order Placed!</h3>
                  <p className="text-sm text-dark-600 mb-6">
                    ধন্যবাদ! Our master chefs at Aaroshi Hotel & Family Restaurant have received your order and are preparing your fresh meal.
                  </p>

                  <div className="w-full bg-gray-50 rounded-xl p-4 text-left border border-gray-100 mb-6 space-y-2">
                    <div className="flex justify-between text-xs text-dark-500">
                      <span>Order Number</span>
                      <span className="font-mono font-bold text-dark-900">{orderConfirmed.id}</span>
                    </div>
                    <div className="flex justify-between text-xs text-dark-500">
                      <span>Type</span>
                      <span className="capitalize font-semibold text-dark-800">{orderType}</span>
                    </div>
                    <div className="flex justify-between text-xs text-dark-500">
                      <span>Estimated Time</span>
                      <span className="font-semibold text-primary-600 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> 25 - 35 mins
                      </span>
                    </div>
                  </div>

                  <div className="w-full space-y-2">
                    <a
                      href={`https://wa.me/919563161422?text=${encodeURIComponent(
                        `*New Food Order Confirmation - Aaroshi Hotel & Family Restaurant*\n\n` +
                        `🔖 *Order ID:* ${orderConfirmed.id}\n` +
                        `👤 *Customer:* ${customerName}\n` +
                        `📞 *Phone:* ${phone}\n` +
                        `🛵 *Dining Type:* ${orderType.toUpperCase()}\n` +
                        (address ? `🏠 *Address:* ${address}\n` : '') +
                        `\n🍲 *Items:*\n` +
                        items.map((i) => `• ${i.quantity}x ${i.name} (₹${i.price * i.quantity})`).join('\n') +
                        `\n\n💰 *Total Amount:* ₹${grandTotal}\n` +
                        (instructions ? `📝 *Notes:* ${instructions}\n` : '') +
                        `\n📍 *Mahabari, Chalsa, West Bengal*`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary w-full py-3 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20"
                    >
                      <span>Send WhatsApp Alert to Kitchen</span>
                    </a>

                    <button
                      onClick={handleClose}
                      className="w-full py-2.5 text-xs font-semibold rounded-xl text-dark-600 hover:bg-gray-100 transition-colors"
                    >
                      Done &amp; Continue
                    </button>
                  </div>
                </div>
              ) : items.length === 0 ? (
                /* Empty Cart */
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-primary-50 text-primary-400 flex items-center justify-center mb-4 border border-primary-100">
                    <UtensilsCrossed className="w-9 h-9" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-dark-900 mb-2">Your Bag is Empty</h3>
                  <p className="text-sm text-dark-500 max-w-xs mb-6">
                    Add aromatic thalis, momos, or biryani from our menu to begin your authentic Bengali feast.
                  </p>
                  <button
                    onClick={handleClose}
                    className="btn-primary px-6 py-2.5 text-sm rounded-xl inline-flex items-center gap-2"
                  >
                    Explore Menu <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Cart Items & Checkout Form */
                <>
                  <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {/* Item list */}
                    <div className="space-y-3">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-gray-50/60 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-1 pr-3">
                            <h4 className="font-semibold text-sm text-dark-900 leading-snug">{item.name}</h4>
                            {item.bengaliName && (
                              <p className="font-bengali text-xs text-primary-600">{item.bengaliName}</p>
                            )}
                            <p className="text-xs font-bold text-dark-700 mt-1">₹{item.price}</p>
                          </div>

                          <div className="flex items-center space-x-2">
                            <div className="flex items-center border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-7 h-7 flex items-center justify-center text-dark-600 hover:bg-gray-100 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-7 text-center text-xs font-bold text-dark-900">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-7 h-7 flex items-center justify-center text-dark-600 hover:bg-gray-100 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1.5 text-gray-400 hover:text-red-500 rounded-md transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Order Type Tabs */}
                    <div className="pt-3 border-t border-gray-100">
                      <label className="text-xs font-semibold text-dark-700 uppercase tracking-wider block mb-2">
                        Dining Preference
                      </label>
                      <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 rounded-xl">
                        {(['dine-in', 'takeaway', 'delivery'] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setOrderType(type)}
                            className={`py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                              orderType === type
                                ? 'bg-white text-primary-600 shadow-sm'
                                : 'text-dark-600 hover:text-dark-900'
                            }`}
                          >
                            {type === 'dine-in' ? '🍽️ Dine-In' : type === 'takeaway' ? '🥡 Takeaway' : '🛵 Delivery'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Customer Inputs */}
                    <form id="checkout-form" onSubmit={handleCheckout} className="space-y-3 pt-2">
                      <div>
                        <label className="text-xs font-medium text-dark-700 mb-1 block">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Rahul Mukherjee"
                          className="input-field py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-dark-700 block mb-1">Phone Number * (10 Digits)</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="input-field py-2 text-sm"
                        />
                      </div>
                      {orderType === 'delivery' && (
                        <div>
                          <label className="text-xs font-medium text-dark-700 mb-1 block">Delivery Address (Chalsa & nearby) *</label>
                          <textarea
                            required
                            rows={2}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Hotel/Resort/Home address, landmark in Chalsa..."
                            className="input-field py-2 text-sm"
                          />
                        </div>
                      )}
                      <div>
                        <label className="text-xs font-medium text-dark-700 mb-1 block">Special Cooking Notes (Optional)</label>
                        <input
                          type="text"
                          value={instructions}
                          onChange={(e) => setInstructions(e.target.value)}
                          placeholder="e.g. Less spicy, extra lemon, spicy green chutney"
                          className="input-field py-2 text-sm"
                        />
                      </div>
                    </form>
                  </div>

                  {/* Summary & Checkout Footer */}
                  <div className="p-5 border-t border-gray-100 bg-gray-50/80 space-y-3">
                    <div className="space-y-1.5 text-xs text-dark-600">
                      <div className="flex justify-between">
                        <span>Items Subtotal ({totalItems})</span>
                        <span className="font-semibold text-dark-900">₹{subtotal}</span>
                      </div>
                      {orderType === 'delivery' && (
                        <div className="flex justify-between">
                          <span>Delivery Fee (Chalsa Area)</span>
                          <span className="font-semibold text-dark-900">₹{deliveryFee}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>GST (5%)</span>
                        <span className="font-semibold text-dark-900">₹{gst}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-dark-900 pt-2 border-t border-gray-200">
                        <span>Total Payable</span>
                        <span className="text-primary-600 font-heading text-lg">₹{grandTotal}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      form="checkout-form"
                      disabled={isSubmitting || !customerName || !phone || (orderType === 'delivery' && !address.trim())}
                      className="btn-primary w-full py-3.5 text-base font-bold rounded-xl shadow-lg shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending to Kitchen...</span>
                        </>
                      ) : (
                        <>
                          <span>Place Order · ₹{grandTotal}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
