/**
 * Firebase Admin SDK initialization.
 * Used ONLY in Server Components, API routes, and server-side data fetching.
 * Never import this file from a Client Component.
 *
 * Reads FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY
 * from environment variables (not NEXT_PUBLIC_ — these are server-only secrets).
 */
import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getAuth, type Auth } from "firebase-admin/auth";

function getAdminApp(): App {
  if (getApps().length) return getApps()[0];

  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Vercel may store the key with literal \n — unescape all variants.
      privateKey: process.env.FIREBASE_PRIVATE_KEY
        ?.replace(/\\\\n/g, "\n")   // double-escaped \\n → newline
        ?.replace(/\\n/g, "\n"),    // single-escaped \n  → newline
    }),
  });
}

export const adminDb: Firestore = getFirestore(getAdminApp());
export const adminAuth: Auth = getAuth(getAdminApp());
