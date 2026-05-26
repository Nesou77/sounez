import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { visitorHashFromRequest } from "@/lib/visitor-hash";
import { isContentType } from "@/lib/content-types";

const LIKE_RATE = { limit: 30, windowMs: 60 * 1000 };

const bodySchema = z.object({
  contentType: z.enum(["blog", "tool", "page", "smart_pack"]),
  slug: z.string().min(1).max(120),
  action: z.enum(["toggle", "status"]),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const contentType = searchParams.get("contentType") ?? "";
  const slug = searchParams.get("slug") ?? "";

  if (!isContentType(contentType) || !slug) {
    return NextResponse.json({ ok: false, error: "Invalid query." }, { status: 400 });
  }

  try {
    const count = await prisma.like.count({ where: { contentType, slug } });
    const visitorHash = visitorHashFromRequest(req);
    const liked = !!(await prisma.like.findUnique({
      where: {
        contentType_slug_visitorHash: { contentType, slug, visitorHash },
      },
    }));
    return NextResponse.json({ ok: true, count, liked });
  } catch {
    return NextResponse.json({ ok: true, count: 0, liked: false });
  }
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limited = checkRateLimit(`likes:${ip}`, LIKE_RATE);
  if (!limited.allowed) {
    return NextResponse.json({ ok: false, error: "Too many requests." }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { contentType, slug } = parsed.data;
  const visitorHash = visitorHashFromRequest(req);

  try {
    const existing = await prisma.like.findUnique({
      where: { contentType_slug_visitorHash: { contentType, slug, visitorHash } },
    });

    if (parsed.data.action === "status") {
      const count = await prisma.like.count({ where: { contentType, slug } });
      return NextResponse.json({ ok: true, count, liked: !!existing });
    }

    if (existing) {
      await prisma.like.delete({ where: { id: existing.id } });
    } else {
      await prisma.like.create({ data: { contentType, slug, visitorHash } });
    }

    const count = await prisma.like.count({ where: { contentType, slug } });
    const liked = !existing;
    return NextResponse.json({ ok: true, count, liked });
  } catch (err) {
    console.error("[likes POST]", err);
    return NextResponse.json({ ok: false, error: "Could not update like." }, { status: 503 });
  }
}
