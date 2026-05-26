import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp, AI_RATE_LIMIT } from "@/lib/rate-limit";
import { smartPackGenerateRequestSchema } from "@/lib/smart-packs/schemas";
import { generateSmartPack } from "@/lib/ai/generateSmartPack";
import { newVisitorId, SMART_PACK_VISITOR_COOKIE } from "@/lib/smart-packs/visitor";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`smart-pack:${ip}`, { ...AI_RATE_LIMIT, limit: 15 });
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = smartPackGenerateRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.errors[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  const input = parsed.data;
  const result = await generateSmartPack(input);

  if (!result.ok) {
    const status = result.code === "SAFETY" ? 400 : result.code === "AI_UNAVAILABLE" ? 503 : 422;
    return NextResponse.json({ ok: false, error: result.error, code: result.code }, { status });
  }

  const cookieMatch = req.headers
    .get("cookie")
    ?.match(new RegExp(`${SMART_PACK_VISITOR_COOKIE}=([^;]+)`));
  const setCookie = !cookieMatch?.[1];
  const visitorHash = cookieMatch?.[1]?.slice(0, 32) ?? newVisitorId();

  let generationId: string | undefined;
  try {
    const row = await prisma.smartPackGeneration.create({
      data: {
        packSlug: input.packSlug,
        input: input as object,
        output: result.output as object,
        language: input.language,
        tone: input.tone,
        visitorHash,
      },
    });
    generationId = row.id;
  } catch (e) {
    console.error("[smart-packs] save failed:", e);
  }

  const res = NextResponse.json({
    ok: true,
    generationId,
    packSlug: input.packSlug,
    output: result.output,
    createdAt: new Date().toISOString(),
  });

  if (setCookie) {
    res.cookies.set(SMART_PACK_VISITOR_COOKIE, visitorHash, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }

  return res;
}
