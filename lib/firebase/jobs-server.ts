/**
 * Server-side job fetching via Firebase Admin SDK.
 * Used in Server Components and API routes (NOT in Client Components).
 *
 * Converts Firestore documents to the existing JobListing interface
 * from lib/jobs/mockData.ts for backward compatibility with UI components.
 */
import { adminDb } from "./admin";
import type { JobListing } from "@/lib/jobs/mockData";

const JOBS_COLLECTION = "jobs";

/**
 * Fetch active job listings from Firestore via Admin SDK.
 * Converts Firestore documents to the UI's JobListing format.
 * Returns an empty array if Firestore is unreachable or the collection is empty.
 */
export async function getFirestoreJobs(): Promise<JobListing[]> {
  try {
    const snapshot = await adminDb
      .collection(JOBS_COLLECTION)
      .where("active", "==", true)
      .orderBy("postedAt", "desc")
      .get();

    if (snapshot.empty) return [];

    const now = new Date();

    return snapshot.docs.map((doc) => {
      const data = doc.data();

      // Calculate postedDaysAgo from the Firestore Timestamp
      const postedAt = data.postedAt?.toDate?.() ?? now;
      const diffMs = now.getTime() - postedAt.getTime();
      const postedDaysAgo = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

      // Map Firestore rate to the string-based format expected by UI
      const rateValue = data.rate != null ? String(data.rate) : "do negocjacji";

      return {
        id: doc.id,
        type: data.type ?? "seeking_operator",
        title: data.title ?? "",
        location: data.location ?? "Szczecin",
        lat: data.coordinates?.lat ?? 53.4285,
        lng: data.coordinates?.lng ?? 14.5528,
        radiusKm: data.radius ?? 50,
        services: data.services ?? [],
        drones: data.droneTypes ?? [],
        licenses: data.licenses ?? [],
        rate: rateValue,
        rateType: data.rateType ?? "negotiable",
        description: data.description ?? "",
        postedDaysAgo,
        contactName: data.contactName ?? data.postedByName ?? "Anonymous",
        province: data.province ?? "zachodniopomorskie",
      } satisfies JobListing;
    });
  } catch (error) {
    console.error("Failed to fetch jobs from Firestore:", error);
    return [];
  }
}
