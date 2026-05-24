import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const BG_REMOVE_RATE_LIMIT = { limit: 5, windowMs: 60 * 1000 };
const ACCEPTED_MIME = ["image/png", "image/jpeg", "image/webp"];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`bg-remove:${ip}`, BG_REMOVE_RATE_LIMIT);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  const apiKey = process.env.REMOVE_BG_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "Background removal is not available right now. Please try again later." },
      { status: 503 },
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request. Please try again." }, { status: 400 });
  }

  const imageFile = formData.get("image");
  if (!(imageFile instanceof File)) {
    return NextResponse.json({ error: "No image file provided." }, { status: 400 });
  }

  const mimeType = imageFile.type || "image/jpeg";
  if (!ACCEPTED_MIME.includes(mimeType)) {
    return NextResponse.json(
      { error: "Unsupported file type. Please upload a PNG, JPG or WEBP image." },
      { status: 400 },
    );
  }

  if (imageFile.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 10 MB." },
      { status: 400 },
    );
  }

  try {
    const removeBgForm = new FormData();
    removeBgForm.append("image_file", imageFile);
    removeBgForm.append("size", "auto");

    const res = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: { "X-Api-Key": apiKey },
      body: removeBgForm,
    });

    if (!res.ok) {
      if (res.status === 402) {
        return NextResponse.json(
          { error: "Background removal is not available right now. Please try again later." },
          { status: 503 },
        );
      }
      if (res.status === 422) {
        return NextResponse.json(
          { error: "We could not process this image. Please try a clearer photo." },
          { status: 422 },
        );
      }
      if (res.status === 429) {
        return NextResponse.json(
          { error: "Too many requests. Please wait a moment and try again." },
          { status: 429 },
        );
      }
      console.error(`[bg-remove] remove.bg error ${res.status}`);
      return NextResponse.json(
        { error: "We could not remove the background. Please try a different image." },
        { status: 502 },
      );
    }

    const imageBuffer = await res.arrayBuffer();
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'attachment; filename="background-removed.png"',
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("[bg-remove] Unexpected error:", e);
    return NextResponse.json(
      { error: "Something went wrong. Please check your connection and try again." },
      { status: 500 },
    );
  }
}
