import { NextResponse } from "next/server";

// Background removal now runs entirely in the browser via on-device AI.
// This server route is no longer used - kept as a stub so any stale clients
// get a clear 410 response instead of a 404.
export async function POST() {
  return NextResponse.json(
    { error: "Background removal now runs entirely in your browser. No server required." },
    { status: 410 },
  );
}
