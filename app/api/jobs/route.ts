/**
 * API Route: /api/jobs
 *
 * GET  — public, returns active job listings from Firestore.
 *        Query params: ?type=seeking_operator|seeking_job&locale=pl|en|de
 * POST — requires Firebase auth (ID token in Authorization header).
 *        Creates a new job listing with expiresAt = now + 30 days.
 */
import { NextRequest, NextResponse } from "next/server";
import { adminDb, adminAuth } from "@/lib/firebase/admin";
import { Timestamp } from "firebase-admin/firestore";

export const dynamic = "force-dynamic";

const JOBS_COLLECTION = "jobs";
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Verify the Firebase ID token from the Authorization: Bearer <token> header.
 * Returns the decoded token or null if invalid/missing.
 */
async function verifyAuthToken(request: NextRequest): Promise<{ uid: string } | { error: string } | null> {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return { error: "no_bearer_header" };

  const idToken = authHeader.slice(7);
  if (!idToken || idToken === "undefined" || idToken === "null") return { error: "empty_token" };

  try {
    return await adminAuth.verifyIdToken(idToken);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { error: msg };
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const locale = searchParams.get("locale");

    let q: FirebaseFirestore.Query = adminDb
      .collection(JOBS_COLLECTION)
      .where("active", "==", true)
      .orderBy("postedAt", "desc");

    if (type && (type === "seeking_operator" || type === "seeking_job")) {
      q = q.where("type", "==", type);
    }
    if (locale) {
      q = q.where("locale", "==", locale);
    }

    const snapshot = await q.get();
    const jobs = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        // Convert Firestore Timestamps to ISO strings for JSON serialization
        postedAt: data.postedAt?.toDate?.()?.toISOString() ?? null,
        expiresAt: data.expiresAt?.toDate?.()?.toISOString() ?? null,
      };
    });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("GET /api/jobs error:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const decodedToken = await verifyAuthToken(request);
    if (!decodedToken || "error" in decodedToken) {
      const reason = decodedToken && "error" in decodedToken ? decodedToken.error : "no_token";
      return NextResponse.json({ error: "Unauthorized", reason }, { status: 401 });
    }

    const body = await request.json();

    // Validate required fields
    const requiredFields = ["type", "title", "description", "location"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate type
    if (body.type !== "seeking_operator" && body.type !== "seeking_job") {
      return NextResponse.json(
        { error: "Invalid type. Must be 'seeking_operator' or 'seeking_job'" },
        { status: 400 }
      );
    }

    const now = Timestamp.now();
    const expiresAt = Timestamp.fromMillis(now.toMillis() + THIRTY_DAYS_MS);

    const jobData = {
      type: body.type,
      title: body.title,
      description: body.description,
      location: body.location,
      coordinates: body.coordinates ?? { lat: 53.4285, lng: 14.5528 },
      radius: body.radius ?? 50,
      province: body.province ?? "zachodniopomorskie",
      services: body.services ?? [],
      droneTypes: body.droneTypes ?? [],
      licenses: body.licenses ?? [],
      rate: body.rate ?? null,
      rateType: body.rateType ?? "negotiable",
      rateNegotiable: body.rateNegotiable ?? true,
      postedBy: (decodedToken as { uid: string }).uid,
      postedByName: (decodedToken as { name?: string; email?: string }).name ?? (decodedToken as { email?: string }).email ?? "Anonymous",
      contactName: body.contactName ?? (decodedToken as { name?: string }).name ?? "Anonymous",
      postedAt: now,
      expiresAt,
      active: true,
      locale: body.locale ?? "pl",
    };

    const docRef = await adminDb.collection(JOBS_COLLECTION).add(jobData);

    return NextResponse.json(
      { id: docRef.id, message: "Job created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/jobs error:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}
