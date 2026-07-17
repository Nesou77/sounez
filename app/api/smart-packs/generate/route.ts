import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp, AI_RATE_LIMIT } from "@/lib/rate-limit";
import { smartPackGenerateRequestSchema } from "@/lib/smart-packs/schemas";
import { generateSmartPack } from "@/lib/ai/generateSmartPack";

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

  return NextResponse.json({
    ok: true,
    packSlug: input.packSlug,
    output: result.output,
    createdAt: new Date().toISOString(),
  });
}
