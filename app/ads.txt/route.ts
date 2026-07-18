import { NextResponse } from "next/server";
import { env } from "@/lib/env";

/** Serve ads.txt from the centralized NEXT_PUBLIC_ADSENSE_PUB_ID config - no hardcoded publisher IDs. */
export function GET() {
  const raw = env.adsensePubId;
  if (!raw) {
    return new NextResponse(
      "# Configure NEXT_PUBLIC_ADSENSE_PUB_ID to publish ads.txt\n",
      { headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  const pubId = raw.startsWith("pub-")
    ? raw
    : raw.startsWith("ca-pub-")
      ? raw.replace(/^ca-pub-/, "pub-")
      : `pub-${raw}`;

  const body = `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
