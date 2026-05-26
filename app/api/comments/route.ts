import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import {
  commentBodySchema,
  rejectSpamUrls,
  toPublicComment,
} from "@/lib/comment-validation";
import { isContentType } from "@/lib/content-types";

const COMMENT_RATE = { limit: 8, windowMs: 60 * 1000 };

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const contentType = searchParams.get("contentType") ?? "";
  const slug = searchParams.get("slug") ?? "";

  if (!isContentType(contentType) || !slug) {
    return NextResponse.json({ ok: false, error: "Invalid query parameters." }, { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { contentType, slug, status: "approved" },
      orderBy: { createdAt: "desc" },
      take: 100,
      select: {
        id: true,
        contentType: true,
        slug: true,
        authorName: true,
        body: true,
        createdAt: true,
      },
    });
    return NextResponse.json({
      ok: true,
      comments: comments.map(toPublicComment),
    });
  } catch (err) {
    console.error("[comments GET]", err);
    return NextResponse.json({ ok: true, comments: [] });
  }
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limited = checkRateLimit(`comments:${ip}`, COMMENT_RATE);
  if (!limited.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many comments. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = commentBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check your comment and try again.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const spam = rejectSpamUrls(parsed.data.body);
  if (spam) {
    return NextResponse.json({ ok: false, error: spam }, { status: 400 });
  }

  const email = parsed.data.authorEmail?.trim() || null;

  try {
    const comment = await prisma.comment.create({
      data: {
        contentType: parsed.data.contentType,
        slug: parsed.data.slug,
        authorName: parsed.data.authorName,
        authorEmail: email,
        body: parsed.data.body,
        status: "pending",
      },
      select: { id: true },
    });

    return NextResponse.json({
      ok: true,
      id: comment.id,
      message:
        "Thanks. Your comment has been submitted and will appear after moderation.",
    });
  } catch (err) {
    console.error("[comments POST]", err);
    return NextResponse.json(
      { ok: false, error: "Could not save your comment. Please try again later." },
      { status: 503 },
    );
  }
}
