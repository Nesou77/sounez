import { NextResponse } from "next/server";

/** Serve ads.txt from NEXT_PUBLIC_ADSENSE_PUB_ID — no hardcoded publisher IDs. */
export function GET() {
  const raw = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID?.trim();
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
      "Cache-Control": "public, max-age=3600",
    },
  });
}
