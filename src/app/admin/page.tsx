'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Calendar,
  MessageSquare,
  Star,
  RefreshCw,
  Clock,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  Lock,
  LogOut,
  Utensils,
  Search,
  Filter,
  Printer,
  ChevronRight,
  TrendingUp,
  Users,
  DollarSign,
  ChefHat,
  ArrowUpRight,
} from 'lucide-react';
import {
  getLiveOrders,
  getLiveReservations,
  getLiveContacts,
  getLiveReviews,
  getLiveRoomBookings,
  getLiveGroupCaterings,
  updateOrderStatus,
  updateReservationStatus,
  OrderData,
  ReservationData,
  ContactData,
  ReviewData,
  RoomBookingData,
  GroupCateringData,
} from '@/lib/firebaseServices';
import { isFirebaseConfigured } from '@/lib/firebase';
import { BedDouble, Bus } from 'lucide-react';

const ADMIN_PIN = '1995'; // Default management PIN (Est. 1995)

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Tabs: 'orders' | 'reservations' | 'rooms' | 'caterings' | 'messages' | 'reviews'
  const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'rooms' | 'caterings' | 'messages' | 'reviews'>('orders');

  // Data states
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [reservations, setReservations] = useState<ReservationData[]>([]);
  const [roomBookings, setRoomBookings] = useState<RoomBookingData[]>([]);
  const [groupCaterings, setGroupCaterings] = useState<GroupCateringData[]>([]);
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');

  // Filters & Search
  const [orderFilter, setOrderFilter] = useState<'all' | 'received' | 'preparing' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Check existing session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session = sessionStorage.getItem('hm_admin_auth');
      if (session === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError(false);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('hm_admin_auth', 'true');
      }
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('hm_admin_auth');
    }
  };

  const loadAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [o, r, rm, grp, c, rev] = await Promise.all([
        getLiveOrders(),
        getLiveReservations(),
        getLiveRoomBookings(),
        getLiveGroupCaterings(),
        getLiveContacts(),
        getLiveReviews(),
      ]);
      setOrders(o || []);
      setReservations(r || []);
      setRoomBookings(rm || []);
      setGroupCaterings(grp || []);
      setContacts(c || []);
      setReviews(rev || []);
      setLastRefreshed(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
      const interval = setInterval(loadAllData, 30000); // 30s auto-refresh
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, loadAllData]);

  const handleOrderStatusChange = async (orderId: string | undefined, status: 'received' | 'preparing' | 'completed') => {
    if (!orderId) return;
    await updateOrderStatus(orderId, status);
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  };

  const handlePrintKOT = (order: OrderData) => {
    const printWindow = window.open('', '', 'width=400,height=600');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>KOT - ${order.id}</title>
          <style>
            body { font-family: monospace; padding: 20px; font-size: 14px; }
            h2 { text-align: center; margin: 0; font-size: 18px; }
            .meta { margin: 12px 0; border-bottom: 1px dashed #000; padding-bottom: 8px; }
            .item { display: flex; justify-content: space-between; margin: 6px 0; }
            .total { border-top: 1px dashed #000; margin-top: 12px; padding-top: 8px; font-weight: bold; font-size: 16px; }
          </style>
        </head>
        <body>
          <h2>AAROSHI HOTEL & FAMILY RESTAURANT</h2>
          <div style="text-align:center; font-size:12px;">Mahabari, Chalsa, West Bengal 735206</div>
          <div class="meta">
            <div>Order: <strong>${order.id}</strong> (${order.orderType.toUpperCase()})</div>
            <div>Customer: ${order.customerName} (${order.phone})</div>
            ${order.address ? `<div>Delivery: ${order.address}</div>` : ''}
            <div>Time: ${new Date().toLocaleTimeString()}</div>
          </div>
          <div>
            ${order.items.map((i) => `<div class="item"><span>${i.quantity}x ${i.name}</span><span>₹${i.price * i.quantity}</span></div>`).join('')}
          </div>
          ${order.instructions ? `<div style="margin-top:10px; font-style:italic;">Notes: ${order.instructions}</div>` : ''}
          <div class="total">
            <div class="item"><span>Total Amount:</span><span>₹${order.total}</span></div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrdersCount = orders.filter((o) => o.status !== 'completed').length;
  const pendingReservationsCount = reservations.filter((r) => r.status === 'confirmed').length;

  const filteredOrders = orders
    .filter((o) => (orderFilter === 'all' ? true : o.status === orderFilter))
    .filter((o) =>
      searchQuery
        ? o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.phone.includes(searchQuery) ||
          String(o.id).toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  // PIN LOGIN GATE
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-dark-900 border border-dark-800 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary-500/20">
            <Lock className="w-8 h-8 text-white" />
          </div>

          <h1 className="font-heading font-black text-2xl text-white mb-1">Manager Portal</h1>
          <p className="text-dark-400 text-xs mb-6">Aaroshi Hotel &amp; Family Restaurant · Chalsa</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-pin" className="sr-only">Management PIN</label>
              <input
                id="admin-pin"
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Enter PIN (Default: 1995)"
                className="w-full text-center tracking-[0.4em] font-mono text-xl py-3 px-4 bg-dark-950 border border-dark-700 rounded-xl focus:outline-none focus:border-primary-500 text-white placeholder:tracking-normal placeholder:text-sm placeholder:text-dark-500"
                autoFocus
              />
            </div>

            {pinError && (
              <p className="text-xs text-red-400 flex items-center justify-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> Incorrect PIN. Try default: 1995
              </p>
            )}

            <button
              type="submit"
              className="btn-primary w-full py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-primary-600/25"
            >
              Access Portal
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-dark-800 flex items-center justify-between text-xs text-dark-500">
            <Link href="/" className="hover:text-primary-400 transition-colors">
              ← Return to Main Website
            </Link>
            <span>Dooars Chalsa</span>
          </div>
        </div>
      </div>
    );
  }

  // MAIN DASHBOARD
  return (
    <div className="min-h-screen bg-gray-50 text-dark-900 flex flex-col">
      {/* Top Admin Navbar */}
      <header className="bg-dark-950 text-white border-b border-dark-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-black text-base text-white leading-tight">Aaroshi Hotel Admin</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-500/20 text-primary-300 border border-primary-500/30">
                  {isFirebaseConfigured ? '🔥 Firebase Live' : '⚡ LocalStorage Mode'}
                </span>
              </div>
              <p className="text-[11px] text-dark-400">Mahabari, Chalsa, West Bengal</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={loadAllData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-dark-200 text-xs font-semibold transition-colors disabled:opacity-50"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-dark-200 text-xs font-semibold transition-colors"
            >
              <span>View Site</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* KPI Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-dark-500 font-medium">Total Orders</p>
              <h3 className="font-heading font-black text-2xl text-dark-900 mt-1">{orders.length}</h3>
              <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">{pendingOrdersCount} Active In Kitchen</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-primary-600 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-dark-500 font-medium">Order Revenue</p>
              <h3 className="font-heading font-black text-2xl text-dark-900 mt-1">₹{totalRevenue.toLocaleString('en-IN')}</h3>
              <p className="text-[11px] text-dark-400 mt-0.5">Average: ₹{orders.length ? Math.round(totalRevenue / orders.length) : 0}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-dark-500 font-medium">Table Bookings</p>
              <h3 className="font-heading font-black text-2xl text-dark-900 mt-1">{reservations.length}</h3>
              <p className="text-[11px] text-blue-600 font-semibold mt-0.5">{pendingReservationsCount} Confirmed Guests</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-dark-500 font-medium">Customer Inquiries</p>
              <h3 className="font-heading font-black text-2xl text-dark-900 mt-1">{contacts.length}</h3>
              <p className="text-[11px] text-purple-600 font-semibold mt-0.5">{reviews.length} Customer Reviews</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3">
          <div className="flex items-center gap-1.5 p-1 bg-gray-200/70 rounded-xl">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'orders' ? 'bg-white text-primary-700 shadow-sm' : 'text-dark-600 hover:text-dark-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('reservations')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'reservations' ? 'bg-white text-primary-700 shadow-sm' : 'text-dark-600 hover:text-dark-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Table Bookings ({reservations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('rooms')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'rooms' ? 'bg-white text-primary-700 shadow-sm' : 'text-dark-600 hover:text-dark-900'
              }`}
            >
              <BedDouble className="w-4 h-4" />
              <span>Room Stays ({roomBookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('caterings')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'caterings' ? 'bg-white text-primary-700 shadow-sm' : 'text-dark-600 hover:text-dark-900'
              }`}
            >
              <Bus className="w-4 h-4" />
              <span>Tour Bus Groups ({groupCaterings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'messages' ? 'bg-white text-primary-700 shadow-sm' : 'text-dark-600 hover:text-dark-900'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquiries ({contacts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'reviews' ? 'bg-white text-primary-700 shadow-sm' : 'text-dark-600 hover:text-dark-900'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>Reviews ({reviews.length})</span>
            </button>
          </div>

          <div className="text-xs text-dark-400 flex items-center gap-2">
            <span>Last synced: {lastRefreshed || 'Just now'}</span>
          </div>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Order Status Filters */}
              <div className="flex items-center gap-1.5">
                {(['all', 'received', 'preparing', 'completed'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setOrderFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                      orderFilter === filter
                        ? 'bg-dark-900 text-white shadow-sm'
                        : 'bg-white text-dark-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {filter} {filter === 'all' ? `(${orders.length})` : `(${orders.filter((o) => o.status === filter).length})`}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-dark-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customer, phone, ID..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-dark-400">
                <ChefHat className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="font-heading font-bold text-base text-dark-700">No Orders Found</p>
                <p className="text-xs mt-1">Orders placed by customers online will appear here in real-time.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredOrders.map((order) => {
                  const status = order.status || 'received';
                  return (
                    <div
                      key={order.id}
                      className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between shadow-sm ${
                        status === 'received'
                          ? 'border-amber-300 ring-2 ring-amber-500/10'
                          : status === 'preparing'
                          ? 'border-blue-300'
                          : 'border-gray-200 opacity-90'
                      }`}
                    >
                      <div>
                        {/* Header: ID, Type & Status */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div>
                            <span className="font-mono font-bold text-xs text-dark-900 block">{order.id}</span>
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mt-1 ${
                                order.orderType === 'delivery'
                                  ? 'bg-purple-100 text-purple-800'
                                  : order.orderType === 'takeaway'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {order.orderType === 'delivery' ? '🛵 Delivery' : order.orderType === 'takeaway' ? '🥡 Takeaway' : '🍽️ Dine-In'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
                                status === 'received'
                                  ? 'bg-amber-100 text-amber-800 animate-pulse'
                                  : status === 'preparing'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {status}
                            </span>
                          </div>
                        </div>

                        {/* Customer Info */}
                        <div className="bg-gray-50 rounded-xl p-3 mb-3 text-xs space-y-1">
                          <div className="font-bold text-dark-900">{order.customerName}</div>
                          <div className="flex items-center gap-1.5 text-dark-600">
                            <Phone className="w-3 h-3 text-primary-500" />
                            <a href={`tel:${order.phone}`} className="hover:text-primary-600 font-medium">
                              {order.phone}
                            </a>
                          </div>
                          {order.address && (
                            <div className="flex items-start gap-1.5 text-dark-600 pt-1 border-t border-gray-200">
                              <MapPin className="w-3 h-3 text-primary-500 shrink-0 mt-0.5" />
                              <span className="text-[11px] leading-tight">{order.address}</span>
                            </div>
                          )}
                        </div>

                        {/* Items Breakdown */}
                        <div className="space-y-1.5 mb-4">
                          <p className="text-[11px] font-semibold text-dark-400 uppercase tracking-wider">Ordered Dishes</p>
                          {order.items?.map((item, i) => (
                            <div key={i} className="flex justify-between text-xs py-0.5 border-b border-gray-100">
                              <span className="font-medium text-dark-800">
                                {item.quantity}x {item.name}
                              </span>
                              <span className="font-semibold text-dark-700">₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>

                        {order.instructions && (
                          <div className="p-2 rounded bg-amber-50 border border-amber-200 text-amber-900 text-xs mb-3">
                            <strong className="block text-[10px] uppercase">Cooking Notes:</strong>
                            {order.instructions}
                          </div>
                        )}
                      </div>

                      {/* Footer: Amount & Action Controls */}
                      <div className="pt-3 border-t border-gray-200 space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-xs text-dark-500">Grand Total</span>
                          <span className="font-heading font-black text-lg text-primary-600">₹{order.total}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handlePrintKOT(order)}
                            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-dark-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Printer className="w-3.5 h-3.5" /> Print KOT
                          </button>

                          {status === 'received' ? (
                            <button
                              onClick={() => handleOrderStatusChange(order.id, 'preparing')}
                              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
                            >
                              <ChefHat className="w-3.5 h-3.5" /> Cook
                            </button>
                          ) : status === 'preparing' ? (
                            <button
                              onClick={() => handleOrderStatusChange(order.id, 'completed')}
                              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
                            >
                              <CheckCircle className="w-3.5 h-3.5" /> Ready
                            </button>
                          ) : (
                            <button
                              disabled
                              className="px-3 py-2 bg-gray-100 text-emerald-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                            >
                              <CheckCircle className="w-3.5 h-3.5" /> Completed
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: RESERVATIONS */}
        {activeTab === 'reservations' && (
          <div className="space-y-4">
            {reservations.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-dark-400">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="font-heading font-bold text-base text-dark-700">No Reservations Yet</p>
                <p className="text-xs mt-1">Table bookings made from the website will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reservations.map((res) => (
                  <div key={res.id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="font-mono font-bold text-xs text-primary-700">{res.id}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          {res.status || 'Confirmed'}
                        </span>
                      </div>

                      <h4 className="font-heading font-bold text-base text-dark-900 mb-1">{res.name}</h4>
                      <div className="space-y-1.5 text-xs text-dark-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-primary-500" />
                          <a href={`tel:${res.phone}`} className="font-semibold text-dark-900 hover:underline">
                            {res.phone}
                          </a>
                        </div>
                        {res.email && <div>Email: {res.email}</div>}
                        <div className="flex items-center gap-2 pt-2 border-t border-gray-100 font-semibold text-dark-900">
                          <Clock className="w-3.5 h-3.5 text-primary-500" />
                          <span>{res.date} at {res.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-primary-500" />
                          <span>{res.guests} Guests</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary-700 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-primary-500" />
                          <span>{res.seating}</span>
                        </div>
                      </div>

                      {res.specialRequests && (
                        <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-dark-700 mb-4">
                          <span className="font-bold block text-[10px] text-dark-400 uppercase">Requests:</span>
                          {res.specialRequests}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex gap-2">
                      <a
                        href={`tel:${res.phone}`}
                        className="btn-primary flex-1 py-2 text-xs font-bold rounded-xl text-center"
                      >
                        Call Guest
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: ROOM BOOKINGS */}
        {activeTab === 'rooms' && (
          <div className="space-y-4">
            {roomBookings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-dark-400">
                <BedDouble className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="font-heading font-bold text-base text-dark-700">No Room Bookings Yet</p>
                <p className="text-xs mt-1">Incoming room stay reservations from the website will appear here in real-time.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roomBookings.map((rm) => (
                  <div key={rm.id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-lg border border-primary-200">
                          {rm.id}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                          {rm.status || 'Confirmed'}
                        </span>
                      </div>

                      <h4 className="font-heading font-bold text-base text-dark-900">{rm.guestName}</h4>
                      <p className="text-xs font-medium text-dark-600 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-primary-500" /> {rm.phone}
                      </p>

                      <div className="mt-3 space-y-1.5 text-xs text-dark-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <div className="flex justify-between font-semibold text-dark-900">
                          <span>{rm.roomType}</span>
                          <span>{rm.roomsCount} Room(s)</span>
                        </div>
                        <div className="flex justify-between text-dark-500">
                          <span>Check-In / Out:</span>
                          <span>{rm.checkInDate} to {rm.checkOutDate}</span>
                        </div>
                        <div className="flex justify-between text-dark-500">
                          <span>Stay Duration:</span>
                          <span>{rm.nights} Night(s) · {rm.guestsCount} Guests</span>
                        </div>
                        <div className="flex justify-between font-bold text-primary-700 pt-1 border-t border-gray-200">
                          <span>Estimated Bill:</span>
                          <span>₹{rm.totalEstimate}</span>
                        </div>
                      </div>

                      {rm.specialRequests && (
                        <div className="p-2 bg-amber-50 rounded-lg border border-amber-100 text-[11px] text-amber-800 mt-2">
                          <span className="font-bold block text-[10px] text-amber-600 uppercase">Notes:</span>
                          {rm.specialRequests}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex gap-2">
                      <a
                        href={`tel:${rm.phone}`}
                        className="btn-primary flex-1 py-2 text-xs font-bold rounded-xl text-center"
                      >
                        Call Guest
                      </a>
                      <a
                        href={`https://wa.me/${rm.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: TOUR BUS & GROUP CATERING */}
        {activeTab === 'caterings' && (
          <div className="space-y-4">
            {groupCaterings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-dark-400">
                <Bus className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="font-heading font-bold text-base text-dark-700">No Group Catering Inquiries</p>
                <p className="text-xs mt-1">Tour bus catering inquiries and large group meal quotes will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupCaterings.map((grp) => (
                  <div key={grp.id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-lg border border-primary-200">
                          {grp.id}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                          {grp.paxCount} Persons Group
                        </span>
                      </div>

                      <h4 className="font-heading font-bold text-base text-dark-900">{grp.organizerName}</h4>
                      {grp.groupName && <p className="text-xs font-semibold text-primary-600">{grp.groupName}</p>}
                      <p className="text-xs font-medium text-dark-600 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-primary-500" /> {grp.phone}
                      </p>

                      <div className="mt-3 space-y-1.5 text-xs text-dark-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <div className="flex justify-between font-semibold text-dark-900">
                          <span>Package:</span>
                          <span className="text-right">{grp.packageType}</span>
                        </div>
                        <div className="flex justify-between text-dark-500">
                          <span>Date &amp; Meal:</span>
                          <span>{grp.eventDate} ({grp.mealTime})</span>
                        </div>
                        <div className="flex justify-between font-bold text-primary-700 pt-1 border-t border-gray-200">
                          <span>Estimated Quote:</span>
                          <span>₹{grp.estimatedCost}</span>
                        </div>
                      </div>

                      {grp.notes && (
                        <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 text-[11px] text-dark-700 mt-2">
                          <span className="font-bold block text-[10px] text-dark-400 uppercase">Requests:</span>
                          {grp.notes}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex gap-2">
                      <a
                        href={`tel:${grp.phone}`}
                        className="btn-primary flex-1 py-2 text-xs font-bold rounded-xl text-center"
                      >
                        Call Leader
                      </a>
                      <a
                        href={`https://wa.me/${grp.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CONTACT INQUIRIES */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {contacts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-dark-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="font-heading font-bold text-base text-dark-700">No Inquiries Received</p>
                <p className="text-xs mt-1">Customer inquiries from the contact form will be displayed here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {contacts.map((c) => (
                  <div key={c.id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading font-bold text-base text-dark-900">{c.name}</h4>
                        <span className="text-xs font-mono text-dark-400">({c.id})</span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-dark-600">
                        <span className="font-medium flex items-center gap-1">
                          <Phone className="w-3 h-3 text-primary-500" /> {c.phone}
                        </span>
                        {c.email && <span>· {c.email}</span>}
                      </div>
                      <p className="text-sm text-dark-700 bg-gray-50 p-3 rounded-xl border border-gray-100 mt-2">
                        &ldquo;{c.message}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`tel:${c.phone}`}
                        className="btn-primary py-2 px-4 text-xs font-bold rounded-xl"
                      >
                        Call Back
                      </a>
                      <a
                        href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((rev, idx) => (
                <div key={rev.id || idx} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-bold text-sm text-dark-900">{rev.name}</h4>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-dark-600 italic leading-relaxed">&ldquo;{rev.text}&rdquo;</p>

                  {rev.dish && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary-50 text-primary-700 border border-primary-100">
                      Fav: {rev.dish}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
