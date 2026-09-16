import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// Live Firebase configuration for Aaroshi Restaurant
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAJPqA9tR9SLA7oPBFIgziuDsJp71Yz5ns",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "aroshihotel.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "aroshihotel",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "aroshihotel.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "52682406001",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:52682406001:web:f92551c854af16dab383d0",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-Z2XHRHWB1R",
};

// Check if credentials have been populated
export const isFirebaseConfigured = true;

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (err) {
  console.warn('[Firebase] Could not initialize Firestore:', err);
}

export { app, db };
