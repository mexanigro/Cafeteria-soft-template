# Firebase (optional)

This template initializes **Firebase App** and optional **Google Analytics** when valid web credentials are supplied. There is **no Firestore or Auth UI** in this café template by default—only shared analytics initialization for future extensions.

## Configuration

1. Create a project in [Firebase Console](https://console.firebase.google.com/) and add a **Web** app.
2. Copy values into **`.env`** (recommended):

| Variable | Description |
| --- | --- |
| `VITE_FIREBASE_API_KEY` | Web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | `*.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage bucket from config |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Sender ID |
| `VITE_FIREBASE_APP_ID` | App ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | Optional — enables Analytics |
| `VITE_FIREBASE_FIRESTORE_DATABASE_ID` | Optional — defaults to `(default)` if you add Firestore later |

Or replace placeholders in **`src/config/firebase-applet-config.json`** (do not commit production secrets to public repos).

Implementation: **`src/lib/firebase.ts`** (imported from **`App.tsx`**).

## Hosting SPA routes

Legal URLs (`/privacy`, `/cookies`, etc.) require the host to **rewrite all paths to `index.html`** (standard SPA fallback).
