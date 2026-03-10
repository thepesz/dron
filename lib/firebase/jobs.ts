/**
 * Firestore CRUD functions for job listings (client-side).
 * These run in the browser via the Firebase JS SDK.
 *
 * For server-side reads (in Server Components / API routes), use the Admin SDK
 * directly via lib/firebase/admin.ts.
 */
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  Timestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./client";

/** Shape of a job listing document in Firestore. */
export interface FirestoreJobListing {
  id?: string;
  type: "seeking_operator" | "seeking_job";
  title: string;
  description: string;
  location: string;
  coordinates: { lat: number; lng: number };
  radius: number;
  province: string;
  services: string[];
  droneTypes: string[];
  licenses: string[];
  rate: number | null;
  rateType: "day" | "project" | "negotiable";
  rateNegotiable: boolean;
  postedBy: string; // Firebase Auth uid
  postedByName: string;
  contactName: string;
  postedAt: Timestamp;
  expiresAt: Timestamp;
  active: boolean;
  locale: string;
}

const JOBS_COLLECTION = "jobs";
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Create a new job listing in Firestore.
 * Sets postedAt to now and expiresAt to now + 30 days.
 * Returns the new document ID.
 */
export async function createJob(
  data: Omit<FirestoreJobListing, "id" | "postedAt" | "expiresAt" | "active">
): Promise<string> {
  const now = Timestamp.now();
  const expiresAt = Timestamp.fromMillis(now.toMillis() + THIRTY_DAYS_MS);

  const docRef = await addDoc(collection(db, JOBS_COLLECTION), {
    ...data,
    postedAt: now,
    expiresAt,
    active: true,
  });

  return docRef.id;
}

/** Optional filters for getJobs. */
export interface GetJobsFilters {
  type?: "seeking_operator" | "seeking_job";
  locale?: string;
}

/**
 * Fetch active job listings from Firestore.
 * Optionally filter by type and/or locale.
 * Results are ordered by postedAt descending (newest first).
 */
export async function getJobs(
  filters?: GetJobsFilters
): Promise<FirestoreJobListing[]> {
  const constraints = [
    where("active", "==", true),
    orderBy("postedAt", "desc"),
  ];

  if (filters?.type) {
    constraints.unshift(where("type", "==", filters.type));
  }
  if (filters?.locale) {
    constraints.unshift(where("locale", "==", filters.locale));
  }

  const q = query(collection(db, JOBS_COLLECTION), ...constraints);
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    ...(d.data() as FirestoreJobListing),
    id: d.id,
  }));
}

/**
 * Fetch a single job listing by its Firestore document ID.
 * Returns null if not found.
 */
export async function getJobById(
  id: string
): Promise<FirestoreJobListing | null> {
  const docRef = doc(db, JOBS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return { ...(docSnap.data() as FirestoreJobListing), id: docSnap.id };
}

/**
 * Update a job listing. Only the provided fields are updated.
 */
export async function updateJob(
  id: string,
  data: Partial<FirestoreJobListing>
): Promise<void> {
  const docRef = doc(db, JOBS_COLLECTION, id);
  await updateDoc(docRef, data);
}

/**
 * Soft-delete a job listing by marking it inactive.
 */
export async function deleteJob(id: string): Promise<void> {
  const docRef = doc(db, JOBS_COLLECTION, id);
  await deleteDoc(docRef);
}

/**
 * Extend a job listing's expiration by 30 days from now.
 */
export async function renewJob(id: string): Promise<void> {
  const now = Timestamp.now();
  const newExpiry = Timestamp.fromMillis(now.toMillis() + THIRTY_DAYS_MS);
  const docRef = doc(db, JOBS_COLLECTION, id);
  await updateDoc(docRef, { expiresAt: newExpiry, active: true });
}
