import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Test Admin SDK by creating a custom token — no real user needed
    const token = await adminAuth.createCustomToken("test-uid-probe");
    return NextResponse.json({ sdk: "ok", token: token.substring(0, 30) + "..." });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ sdk: "failed", error: msg }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ step: "no_header" }, { status: 400 });
    }
    const token = authHeader.slice(7);
    const decoded = await adminAuth.verifyIdToken(token);
    return NextResponse.json({ step: "ok", uid: decoded.uid });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ step: "verify_failed", error: msg }, { status: 401 });
  }
}
