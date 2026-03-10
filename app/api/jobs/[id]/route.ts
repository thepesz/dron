/**
 * API Route: /api/jobs/[id]
 *
 * GET    — public, returns a single job listing by Firestore document ID.
 * PATCH  — requires auth + must be the job owner. Updates specified fields.
 * DELETE — requires auth + must be the job owner. Deletes the document.
 */
import { NextRequest, NextResponse } from "next/server";
import { adminDb, adminAuth } from "@/lib/firebase/admin";

export const dynamic = "force-dynamic";

const JOBS_COLLECTION = "jobs";

/**
 * Verify the Firebase ID token from the Authorization: Bearer <token> header.
 * Returns the decoded token or null if invalid/missing.
 */
async function verifyAuthToken(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const idToken = authHeader.slice(7);
  try {
    return await adminAuth.verifyIdToken(idToken);
  } catch {
    return null;
  }
}

interface RouteContext {
  params: { id: string };
}

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const docRef = adminDb.collection(JOBS_COLLECTION).doc(params.id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const data = docSnap.data()!;
    return NextResponse.json({
      job: {
        ...data,
        id: docSnap.id,
        postedAt: data.postedAt?.toDate?.()?.toISOString() ?? null,
        expiresAt: data.expiresAt?.toDate?.()?.toISOString() ?? null,
      },
    });
  } catch (error) {
    console.error(`GET /api/jobs/${params.id} error:`, error);
    return NextResponse.json(
      { error: "Failed to fetch job" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    // Verify authentication
    const decodedToken = await verifyAuthToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const docRef = adminDb.collection(JOBS_COLLECTION).doc(params.id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Check ownership
    const jobData = docSnap.data()!;
    if (jobData.postedBy !== decodedToken.uid) {
      return NextResponse.json(
        { error: "Forbidden: you can only edit your own listings" },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Only allow updating specific fields (not postedBy, postedAt, etc.)
    const allowedFields = [
      "title",
      "description",
      "location",
      "coordinates",
      "radius",
      "province",
      "services",
      "droneTypes",
      "licenses",
      "rate",
      "rateType",
      "rateNegotiable",
      "contactName",
      "active",
      "locale",
    ];

    const updates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (field in body) {
        updates[field] = body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    await docRef.update(updates);

    return NextResponse.json({ message: "Job updated successfully" });
  } catch (error) {
    console.error(`PATCH /api/jobs/${params.id} error:`, error);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    // Verify authentication
    const decodedToken = await verifyAuthToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const docRef = adminDb.collection(JOBS_COLLECTION).doc(params.id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Check ownership
    const jobData = docSnap.data()!;
    if (jobData.postedBy !== decodedToken.uid) {
      return NextResponse.json(
        { error: "Forbidden: you can only delete your own listings" },
        { status: 403 }
      );
    }

    await docRef.delete();

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error(`DELETE /api/jobs/${params.id} error:`, error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}
