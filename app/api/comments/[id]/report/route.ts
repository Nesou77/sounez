import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const REPORT_RATE = { limit: 10, windowMs: 60 * 60 * 1000 }; // 10 reports per IP per hour

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const ip = getClientIp(req);
  const limited = checkRateLimit(`report:${ip}`, REPORT_RATE);
  if (!limited.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many reports. Please try again later." },
      { status: 429 },
    );
  }

  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing comment ID." }, { status: 400 });
  }

  try {
    const comment = await prisma.comment.findUnique({
      where: { id },
      select: { id: true, status: true, reportCount: true },
    });

    if (!comment || comment.status === "rejected") {
      // Don't reveal whether the comment exists
      return NextResponse.json({ ok: true });
    }

    // Auto-reject if report threshold reached; otherwise increment count
    const newCount = comment.reportCount + 1;
    const shouldAutoReject = newCount >= 5;

    await prisma.comment.update({
      where: { id },
      data: {
        reportCount: newCount,
        moderationFlag: "user_reports",
        ...(shouldAutoReject ? { status: "rejected" } : {}),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[comments report]", err);
    return NextResponse.json({ ok: false, error: "Could not submit report." }, { status: 503 });
  }
}
