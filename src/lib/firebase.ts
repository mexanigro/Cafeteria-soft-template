import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import rawConfig from '@/src/config/firebase-applet-config.json';

type FirebaseWebConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
  firestoreDatabaseId?: string;
};

function resolveFirebaseConfig(): FirebaseWebConfig | null {
  const e = import.meta.env;
  const fromEnv: Partial<FirebaseWebConfig> = {
    apiKey: e.VITE_FIREBASE_API_KEY?.trim(),
    authDomain: e.VITE_FIREBASE_AUTH_DOMAIN?.trim(),
    projectId: e.VITE_FIREBASE_PROJECT_ID?.trim(),
    storageBucket: e.VITE_FIREBASE_STORAGE_BUCKET?.trim(),
    messagingSenderId: e.VITE_FIREBASE_MESSAGING_SENDER_ID?.trim(),
    appId: e.VITE_FIREBASE_APP_ID?.trim(),
    measurementId: e.VITE_FIREBASE_MEASUREMENT_ID?.trim(),
    firestoreDatabaseId: e.VITE_FIREBASE_FIRESTORE_DATABASE_ID?.trim(),
  };

  if (
    fromEnv.apiKey &&
    fromEnv.authDomain &&
    fromEnv.projectId &&
    fromEnv.storageBucket &&
    fromEnv.messagingSenderId &&
    fromEnv.appId
  ) {
    return fromEnv as FirebaseWebConfig;
  }

  const raw = rawConfig as Record<string, string>;
  const merged: FirebaseWebConfig = {
    apiKey: raw.apiKey ?? '',
    authDomain: raw.authDomain ?? '',
    projectId: raw.projectId ?? '',
    storageBucket: raw.storageBucket ?? '',
    messagingSenderId: raw.messagingSenderId ?? '',
    appId: raw.appId ?? '',
    ...(raw.measurementId ? { measurementId: raw.measurementId } : {}),
    ...(raw.firestoreDatabaseId ? { firestoreDatabaseId: raw.firestoreDatabaseId } : {}),
  };

  const looksPlaceholder =
    merged.apiKey.includes('REPLACE') || merged.projectId === 'your-project-id' || merged.apiKey === '';

  if (looksPlaceholder) return null;

  return merged;
}

const firebaseConfig = resolveFirebaseConfig();

let appInstance: FirebaseApp | null = null;

if (!firebaseConfig) {
  console.warn(
    '[Site setup] Firebase optional bundle not configured. Add VITE_FIREBASE_* to `.env` or replace placeholders in firebase-applet-config.json.',
  );
} else {
  try {
    appInstance = initializeApp(firebaseConfig as Record<string, string>);
    void isSupported()
      .then((ok) => {
        if (ok && firebaseConfig.measurementId) {
          getAnalytics(appInstance!);
        }
      })
      .catch(() => {});
  } catch (err) {
    console.error('[Firebase] Initialization failed:', err);
    appInstance = null;
  }
}

export const firebaseApp = appInstance;
export const isFirebaseConfigured = appInstance !== null;
