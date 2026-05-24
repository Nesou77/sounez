import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { checkRateLimit, getClientIp, AI_RATE_LIMIT } from "@/lib/rate-limit";

type Tone = "descriptive" | "accessibility" | "seo" | "social";

type DescribeResult = {
  altText: string;
  shortCaption: string;
  detailedDescription: string;
  seoKeywords: string;
  socialCaption: string;
};

// ── Fallback (used when Gemini key is missing or call fails) ──────────────────

function fallbackResult(tone: Tone): DescribeResult {
  const base: DescribeResult = {
    altText: "An uploaded image.",
    shortCaption: "A photo ready for use.",
    detailedDescription: "Your image was uploaded successfully. Add your own description to get the most out of this tool.",
    seoKeywords: "image, photo, visual content, media",
    socialCaption: "Check out this image! ✨ #photo #content #visual",
  };
  if (tone === "accessibility") {
    return { ...base, altText: "Image — please add a descriptive alt text for accessibility." };
  }
  if (tone === "seo") {
    return { ...base, seoKeywords: "image, photo, visual, content, media, digital" };
  }
  return base;
}

// ── Gemini Vision ─────────────────────────────────────────────────────────────

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

function buildPrompt(tone: Tone): string {
  const toneInstructions: Record<Tone, string> = {
    descriptive: "Provide a neutral, factual description. Focus on subjects, objects, setting, colors, and composition.",
    accessibility: "Write concise alt text for screen readers. Be specific, under 125 characters if possible. Most important content first.",
    seo: "Generate SEO-optimised content with keywords a user might search for. Include descriptive terms for subject, setting, and context.",
    social: "Write engaging social media content. Be conversational, use relevant emojis, include 3-5 hashtags at the end.",
  };

  return `Analyse this image and return a JSON object with exactly these fields:
- "altText": ${tone === "accessibility" ? "Concise alt text for screen readers (under 125 characters)." : "A short descriptive alt text (1-2 sentences)."}
- "shortCaption": A punchy one-line caption (under 15 words).
- "detailedDescription": A detailed description (3-5 sentences).
- "seoKeywords": A comma-separated list of 8-12 relevant SEO keywords.
- "socialCaption": An engaging social media caption with emojis and 3-5 hashtags.

Tone: ${toneInstructions[tone]}

Return ONLY valid JSON. No markdown fences. No explanation.`;
}

async function callGeminiVision(
  base64Image: string,
  mimeType: string,
  tone: Tone,
): Promise<DescribeResult> {
  const model = env.geminiModel;
  const url = `${GEMINI_BASE}/${model}:generateContent?key=${env.geminiApiKey}`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [
          { inlineData: { mimeType, data: base64Image } },
          { text: buildPrompt(tone) },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 600,
      responseMimeType: "application/json",
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error(`[image-describe] Gemini error ${res.status}: ${await res.text()}`);
    return fallbackResult(tone);
  }

  const data = await res.json();
  const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  if (!text) return fallbackResult(tone);

  try {
    const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    const parsed = JSON.parse(cleaned) as Partial<DescribeResult>;
    const fb = fallbackResult(tone);
    return {
      altText: parsed.altText?.trim() || fb.altText,
      shortCaption: parsed.shortCaption?.trim() || fb.shortCaption,
      detailedDescription: parsed.detailedDescription?.trim() || fb.detailedDescription,
      seoKeywords: parsed.seoKeywords?.trim() || fb.seoKeywords,
      socialCaption: parsed.socialCaption?.trim() || fb.socialCaption,
    };
  } catch {
    return fallbackResult(tone);
  }
}

// ── Route ─────────────────────────────────────────────────────────────────────

const ACCEPTED_MIME = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const MAX_SIZE = 10 * 1024 * 1024;

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`image-describe:${ip}`, AI_RATE_LIMIT);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  // If no API key, return graceful fallback instead of an error
  const hasKey = !!env.geminiApiKey;

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request. Please try again." }, { status: 400 });
  }

  const imageFile = formData.get("image");
  const toneRaw = formData.get("tone");

  if (!(imageFile instanceof File)) {
    return NextResponse.json({ error: "No image file provided." }, { status: 400 });
  }

  const mimeType = imageFile.type || "image/jpeg";
  if (!ACCEPTED_MIME.includes(mimeType)) {
    return NextResponse.json(
      { error: "Unsupported file type. Please upload a PNG, JPG, WEBP or GIF image." },
      { status: 400 },
    );
  }

  if (imageFile.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 10 MB." },
      { status: 400 },
    );
  }

  const VALID_TONES: Tone[] = ["descriptive", "accessibility", "seo", "social"];
  const tone: Tone =
    typeof toneRaw === "string" && VALID_TONES.includes(toneRaw as Tone)
      ? (toneRaw as Tone)
      : "descriptive";

  // Return fallback immediately if no key configured
  if (!hasKey) {
    return NextResponse.json(fallbackResult(tone));
  }

  const arrayBuffer = await imageFile.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  try {
    const result = await callGeminiVision(base64, mimeType, tone);
    return NextResponse.json(result);
  } catch (e) {
    console.error("[image-describe] Unexpected error:", e);
    return NextResponse.json(fallbackResult(tone));
  }
}
