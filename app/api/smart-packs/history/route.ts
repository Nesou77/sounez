import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SMART_PACK_VISITOR_COOKIE } from "@/lib/smart-packs/visitor";

export async function GET(req: Request) {
  const cookieMatch = req.headers
    .get("cookie")
    ?.match(new RegExp(`${SMART_PACK_VISITOR_COOKIE}=([^;]+)`));
  const visitorHash = cookieMatch?.[1]?.slice(0, 32);
  if (!visitorHash) {
    return NextResponse.json({ ok: true, items: [] });
  }

  const { searchParams } = new URL(req.url);
  const packSlug = searchParams.get("packSlug") ?? undefined;
  const limit = Math.min(Number(searchParams.get("limit")) || 20, 50);

  try {
    const items = await prisma.smartPackGeneration.findMany({
      where: {
        visitorHash,
        ...(packSlug ? { packSlug } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        packSlug: true,
        language: true,
        tone: true,
        createdAt: true,
        updatedAt: true,
        input: true,
        output: true,
      },
    });

    return NextResponse.json({ ok: true, items });
  } catch (e) {
    console.error("[smart-packs] history list failed:", e);
    return NextResponse.json({ ok: true, items: [] });
  }
}
