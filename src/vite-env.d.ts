/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Google AI Studio API key — restrict by HTTP referrer when using client-side chat */
  readonly VITE_GEMINI_API_KEY?: string;
  /** Optional override (default `gemini-2.0-flash`) */
  readonly VITE_GEMINI_MODEL?: string;
  readonly VITE_FIREBASE_API_KEY?: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN?: string;
  readonly VITE_FIREBASE_PROJECT_ID?: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET?: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID?: string;
  readonly VITE_FIREBASE_APP_ID?: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID?: string;
  readonly VITE_FIREBASE_FIRESTORE_DATABASE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
