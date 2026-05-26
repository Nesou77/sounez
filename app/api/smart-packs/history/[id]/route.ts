import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SMART_PACK_VISITOR_COOKIE } from "@/lib/smart-packs/visitor";

function visitorFromCookie(req: Request): string | null {
  const m = req.headers.get("cookie")?.match(new RegExp(`${SMART_PACK_VISITOR_COOKIE}=([^;]+)`));
  return m?.[1]?.slice(0, 32) ?? null;
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const visitorHash = visitorFromCookie(req);
  if (!visitorHash) {
    return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  }

  try {
    const row = await prisma.smartPackGeneration.findUnique({ where: { id } });
    if (!row || row.visitorHash !== visitorHash) {
      return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, item: row });
  } catch {
    return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const visitorHash = visitorFromCookie(req);
  if (!visitorHash) {
    return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  }

  try {
    const row = await prisma.smartPackGeneration.findUnique({ where: { id } });
    if (!row || row.visitorHash !== visitorHash) {
      return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
    }
    await prisma.smartPackGeneration.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not delete." }, { status: 500 });
  }
}
