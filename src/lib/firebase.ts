import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// Configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if credentials have been populated by the user
export const isFirebaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'YOUR_API_KEY' &&
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'your-api-key-here'
);

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (typeof window !== 'undefined' || process.env.NODE_ENV !== 'production') {
  if (isFirebaseConfigured) {
    try {
      app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
      db = getFirestore(app);
      if (process.env.NODE_ENV === 'development') {
        console.log('🔥 [Firebase] Connected to Firestore');
      }
    } catch (err) {
      console.warn('[Firebase] Could not initialize, using local fallback:', err);
    }
  } else if (process.env.NODE_ENV === 'development') {
    console.info('[Firebase] No env vars configured. Running in offline/demo mode.');
  }
}

export { app, db };
