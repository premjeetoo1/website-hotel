import { db, isFirebaseConfigured } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';

export interface ReservationData {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  guests: number;
  date: string;
  time: string;
  seating: string;
  specialRequests?: string;
  status?: 'confirmed' | 'pending';
  createdAt?: unknown;
}

export interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderData {
  id?: string;
  customerName: string;
  phone: string;
  address?: string;
  orderType: 'dine-in' | 'takeaway' | 'delivery';
  items: OrderItem[];
  subtotal: number;
  total: number;
  instructions?: string;
  status?: 'received' | 'preparing' | 'completed';
  createdAt?: unknown;
}

export interface ContactData {
  id?: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  createdAt?: unknown;
}

export interface GroupCateringData {
  id?: string;
  organizerName: string;
  groupName?: string;
  phone: string;
  packageType: string;
  paxCount: number;
  eventDate: string;
  mealTime: 'Breakfast' | 'Lunch' | 'High Tea' | 'Dinner';
  estimatedCost: number;
  notes?: string;
  status?: 'confirmed' | 'pending';
  createdAt?: unknown;
}

export interface ReviewData {
  id?: string;
  name: string;
  title?: string;
  rating: number;
  text?: string;
  comment?: string;
  tags?: string[];
  dish?: string;
  date?: string;
  createdAt?: unknown;
}

// Helpers for localStorage fallback
const STORAGE_KEYS = {
  RESERVATIONS: 'aaroshi_hotel_reservations',
  ORDERS: 'aaroshi_hotel_orders',
  CONTACTS: 'aaroshi_hotel_contacts',
  GROUP_CATERINGS: 'aaroshi_hotel_group_catering',
  REVIEWS: 'aaroshi_hotel_reviews',
};

function getLocalItems<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalItem<T>(key: string, item: T): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getLocalItems<T>(key);
    existing.unshift(item);
    // Cap at 50 items to prevent QuotaExceededError
    const capped = existing.slice(0, 50);
    localStorage.setItem(key, JSON.stringify(capped));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

/** Remove undefined values from an object before sending to Firestore */
function stripUndefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as Partial<T>;
}

/**
 * Submit a table reservation
 */
export async function submitReservation(data: Omit<ReservationData, 'id' | 'createdAt'>): Promise<{ success: boolean; id: string; isLive: boolean }> {
  const reservationRecord: ReservationData = {
    ...data,
    status: 'confirmed',
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'reservations'), {
        ...stripUndefined(reservationRecord),
        createdAt: serverTimestamp(),
      });
      return { success: true, id: docRef.id, isLive: true };
    } catch (error) {
      console.error('Firebase reservation failed, falling back to local storage:', error);
    }
  }

  // Fallback storage
  const mockId = 'HM-RES-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const fullRecord = {
    ...reservationRecord,
    id: mockId,
    createdAt: new Date().toISOString(),
  };
  saveLocalItem(STORAGE_KEYS.RESERVATIONS, fullRecord);
  return { success: true, id: mockId, isLive: false };
}

/**
 * Submit an online food order
 */
export async function submitOrder(data: Omit<OrderData, 'id' | 'createdAt'>): Promise<{ success: boolean; id: string; isLive: boolean }> {
  const orderRecord: OrderData = {
    ...data,
    status: 'received',
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        ...stripUndefined(orderRecord),
        createdAt: serverTimestamp(),
      });
      return { success: true, id: docRef.id, isLive: true };
    } catch (error) {
      console.error('Firebase order failed, falling back to local storage:', error);
    }
  }

  // Fallback storage
  const mockId = 'HM-ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const fullRecord = {
    ...orderRecord,
    id: mockId,
    createdAt: new Date().toISOString(),
  };
  saveLocalItem(STORAGE_KEYS.ORDERS, fullRecord);
  return { success: true, id: mockId, isLive: false };
}

/**
 * Submit a contact form inquiry
 */
export async function submitContactMessage(data: Omit<ContactData, 'id' | 'createdAt'>): Promise<{ success: boolean; id: string; isLive: boolean }> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'contacts'), {
        ...stripUndefined(data),
        createdAt: serverTimestamp(),
      });
      return { success: true, id: docRef.id, isLive: true };
    } catch (error) {
      console.error('Firebase contact submission failed, falling back:', error);
    }
  }

  const mockId = 'HM-MSG-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  saveLocalItem(STORAGE_KEYS.CONTACTS, {
    ...data,
    id: mockId,
    createdAt: new Date().toISOString(),
  });
  return { success: true, id: mockId, isLive: false };
}

/**
 * Submit a customer review
 */
export async function submitReview(data: Omit<ReviewData, 'id' | 'createdAt'>): Promise<{ success: boolean; id: string; isLive: boolean }> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'reviews'), {
        ...stripUndefined(data),
        createdAt: serverTimestamp(),
      });
      return { success: true, id: docRef.id, isLive: true };
    } catch (error) {
      console.error('Firebase review submission failed:', error);
    }
  }

  const mockId = 'HM-REV-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  saveLocalItem(STORAGE_KEYS.REVIEWS, {
    ...data,
    id: mockId,
    createdAt: new Date().toISOString(),
  });
  return { success: true, id: mockId, isLive: false };
}

/**
 * Fetch latest customer reviews
 */
export async function getLiveReviews(): Promise<ReviewData[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'), limit(50));
      const querySnapshot = await getDocs(q);
      const liveReviews: ReviewData[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const createdAt = data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt;
        liveReviews.push({ id: docSnap.id, ...(data as Omit<ReviewData, 'id'>), createdAt });
      });
      return liveReviews;
    } catch (error) {
      console.warn('Could not fetch reviews from Firebase:', error);
    }
  }

  return getLocalItems<ReviewData>(STORAGE_KEYS.REVIEWS);
}

/**
 * Fetch all food orders (for Admin Dashboard)
 */
export async function getLiveOrders(): Promise<OrderData[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(100));
      const querySnapshot = await getDocs(q);
      const orders: OrderData[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const createdAt = data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt;
        orders.push({ id: docSnap.id, ...(data as Omit<OrderData, 'id'>), createdAt });
      });
      return orders;
    } catch (error) {
      console.warn('Could not fetch orders from Firebase:', error);
    }
  }

  return getLocalItems<OrderData>(STORAGE_KEYS.ORDERS);
}

/**
 * Update order status (received -> preparing -> completed)
 */
export async function updateOrderStatus(
  orderId: string,
  status: 'received' | 'preparing' | 'completed'
): Promise<boolean> {
  if (isFirebaseConfigured && db) {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status });
      return true;
    } catch (error) {
      console.error('Firebase update order failed, updating locally:', error);
    }
  }

  // LocalStorage update fallback
  if (typeof window !== 'undefined') {
    const orders = getLocalItems<OrderData>(STORAGE_KEYS.ORDERS);
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
    return true;
  }
  return false;
}

/**
 * Fetch all table reservations (for Admin Dashboard)
 */
export async function getLiveReservations(): Promise<ReservationData[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'), limit(100));
      const querySnapshot = await getDocs(q);
      const reservations: ReservationData[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const createdAt = data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt;
        reservations.push({ id: docSnap.id, ...(data as Omit<ReservationData, 'id'>), createdAt });
      });
      return reservations;
    } catch (error) {
      console.warn('Could not fetch reservations from Firebase:', error);
    }
  }

  return getLocalItems<ReservationData>(STORAGE_KEYS.RESERVATIONS);
}

/**
 * Update reservation status (confirmed -> seated -> completed)
 */
export async function updateReservationStatus(
  resId: string,
  status: 'confirmed' | 'pending'
): Promise<boolean> {
  if (isFirebaseConfigured && db) {
    try {
      const resRef = doc(db, 'reservations', resId);
      await updateDoc(resRef, { status });
      return true;
    } catch (error) {
      console.error('Firebase update reservation failed:', error);
    }
  }

  // LocalStorage update fallback
  if (typeof window !== 'undefined') {
    const reservations = getLocalItems<ReservationData>(STORAGE_KEYS.RESERVATIONS);
    const updated = reservations.map((r) => (r.id === resId ? { ...r, status } : r));
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(updated));
    return true;
  }
  return false;
}

/**
 * Fetch all contact inquiries (for Admin Dashboard)
 */
export async function getLiveContacts(): Promise<ContactData[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'), limit(100));
      const querySnapshot = await getDocs(q);
      const contacts: ContactData[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const createdAt = data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt;
        contacts.push({ id: docSnap.id, ...(data as Omit<ContactData, 'id'>), createdAt });
      });
      return contacts;
    } catch (error) {
      console.warn('Could not fetch contacts from Firebase:', error);
    }
  }

  return getLocalItems<ContactData>(STORAGE_KEYS.CONTACTS);
}

/**
 * Submit Group / Tour Bus Catering Inquiry
 */
export async function submitGroupCatering(data: GroupCateringData): Promise<{ id: string; isLive: boolean }> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'group_caterings'), {
        ...data,
        status: data.status || 'confirmed',
        createdAt: serverTimestamp(),
      });
      return { id: docRef.id, isLive: true };
    } catch (error) {
      console.warn('Firebase group catering failed, falling back to localStorage:', error);
    }
  }

  const id = 'GRP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const newGroup: GroupCateringData = {
    ...data,
    id,
    status: data.status || 'confirmed',
    createdAt: new Date().toISOString(),
  };
  saveLocalItem(STORAGE_KEYS.GROUP_CATERINGS, newGroup);
  return { id, isLive: false };
}

/**
 * Fetch all Group Caterings (Admin)
 */
export async function getLiveGroupCaterings(): Promise<GroupCateringData[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'group_caterings'), orderBy('createdAt', 'desc'), limit(100));
      const querySnapshot = await getDocs(q);
      const caterings: GroupCateringData[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const createdAt = data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt;
        caterings.push({ id: docSnap.id, ...(data as Omit<GroupCateringData, 'id'>), createdAt });
      });
      return caterings;
    } catch (error) {
      console.warn('Could not fetch group caterings from Firebase:', error);
    }
  }

  return getLocalItems<GroupCateringData>(STORAGE_KEYS.GROUP_CATERINGS);
}

/**
 * WhatsApp Helper for Owner Direct Notifications
 */
export const RESTAURANT_WHATSAPP_NUMBER = '919563161422';
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/UCf5PsNf7h8sLZ6W6';
export const GOOGLE_REVIEW_URL = 'https://maps.app.goo.gl/UCf5PsNf7h8sLZ6W6';

export function getWhatsAppBookingUrl(res: {
  id?: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  seating?: string;
  specialRequests?: string;
}) {
  const text = `*New Table Booking Request - Aaroshi Hotel & Family Restaurant*\n\n` +
    `🔖 *Booking ID:* ${res.id || 'Pending'}\n` +
    `👤 *Guest Name:* ${res.name}\n` +
    `📞 *Phone:* ${res.phone}\n` +
    `👥 *Guests:* ${res.guests} Persons\n` +
    `📅 *Date:* ${res.date}\n` +
    `⏰ *Time Slot:* ${res.time}\n` +
    `🪑 *Seating Area:* ${res.seating || 'Standard'}\n` +
    (res.specialRequests ? `📝 *Notes:* ${res.specialRequests}\n` : '') +
    `\n📍 *Location:* Mahabari, Chalsa, West Bengal 735206`;

  return `https://wa.me/${RESTAURANT_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}


export function getWhatsAppGroupCateringUrl(group: {
  id?: string;
  organizerName: string;
  phone: string;
  packageType: string;
  paxCount: number;
  eventDate: string;
  mealTime: string;
  estimatedCost: number;
  notes?: string;
}) {
  const text = `*Tour Bus / Group Catering Inquiry - Aaroshi Hotel Chalsa*\n\n` +
    `🔖 *Inquiry ID:* ${group.id || 'Pending'}\n` +
    `👤 *Organizer:* ${group.organizerName}\n` +
    `📞 *Phone:* ${group.phone}\n` +
    `🍱 *Package:* ${group.packageType}\n` +
    `👥 *Group Size:* ${group.paxCount} Persons\n` +
    `📅 *Date:* ${group.eventDate} (${group.mealTime})\n` +
    `💰 *Estimated Total:* ₹${group.estimatedCost}\n` +
    (group.notes ? `📝 *Notes:* ${group.notes}\n` : '') +
    `\n📍 *Bus & Car Parking Available at Chalsa Mahabari*`;

  return `https://wa.me/${RESTAURANT_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function getWhatsAppOrderUrl(order: {
  id?: string;
  customerName: string;
  phone: string;
  orderType: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  address?: string;
  instructions?: string;
}) {
  const itemsText = order.items.map((i) => `• ${i.quantity}x ${i.name} (₹${i.price * i.quantity})`).join('\n');
  const text = `*New Food Order - Aaroshi Hotel & Family Restaurant*\n\n` +
    `🔖 *Order ID:* ${order.id || 'Pending'}\n` +
    `👤 *Customer:* ${order.customerName}\n` +
    `📞 *Phone:* ${order.phone}\n` +
    `🛵 *Type:* ${order.orderType.toUpperCase()}\n` +
    (order.address ? `🏠 *Address:* ${order.address}\n` : '') +
    `\n🍲 *Items Ordered:*\n${itemsText}\n\n` +
    `💰 *Total Amount:* ₹${order.total}\n` +
    (order.instructions ? `📝 *Notes:* ${order.instructions}\n` : '') +
    `\n📍 *Aaroshi Hotel & Family Restaurant, Chalsa*`;

  return `https://wa.me/${RESTAURANT_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

