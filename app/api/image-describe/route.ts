import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { checkRateLimit, getClientIp, AI_RATE_LIMIT } from "@/lib/rate-limit";

// ── Types ────────────────────────────────────────────────────────────────────

type Tone = "descriptive" | "accessibility" | "seo" | "social";

type DescribeResult = {
  altText: string;
  shortCaption: string;
  detailedDescription: string;
  seoKeywords: string;
  socialCaption: string;
};

// ── Fallback ─────────────────────────────────────────────────────────────────

function fallbackResult(tone: Tone): DescribeResult {
  const base = {
    altText: "An image uploaded by the user.",
    shortCaption: "A photo ready for use.",
    detailedDescription: "The image has been uploaded successfully. AI description is temporarily unavailable.",
    seoKeywords: "image, photo, visual content",
    socialCaption: "Check out this image! ✨ #photo #content",
  };

  if (tone === "accessibility") {
    return {
      ...base,
      altText: "Image content — description unavailable. Please add a manual alt text.",
    };
  }
  if (tone === "seo") {
    return {
      ...base,
      seoKeywords: "image, photo, visual, content, media",
    };
  }
  return base;
}

// ── Gemini Vision call ────────────────────────────────────────────────────────

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

function buildPrompt(tone: Tone): string {
  const toneInstructions: Record<Tone, string> = {
    descriptive:
      "Provide a neutral, factual description of the image. Focus on what is visible: subjects, objects, setting, colors, and composition.",
    accessibility:
      "Write concise alt text suitable for screen readers. Be specific and informative. Keep it under 125 characters if possible. Describe the most important content first.",
    seo:
      "Generate SEO-optimised content. Focus on keywords a user might search for. Include relevant descriptive terms for the image subject, setting, and context.",
    social:
      "Write engaging social media content. Be conversational, use relevant emojis, and include 3-5 hashtags at the end.",
  };

  return `Analyse this image and return a JSON object with exactly these fields:
- "altText": ${tone === "accessibility" ? "Concise alt text for screen readers (under 125 characters)." : "A short descriptive alt text for the image (1-2 sentences)."}
- "shortCaption": A punchy one-line caption (under 15 words).
- "detailedDescription": A detailed description of the image (3-5 sentences).
- "seoKeywords": A comma-separated list of 8-12 relevant SEO keywords.
- "socialCaption": An engaging social media caption with emojis and 3-5 hashtags.

Tone instruction: ${toneInstructions[tone]}

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
          {
            inlineData: {
              mimeType,
              data: base64Image,
            },
          },
          {
            text: buildPrompt(tone),
          },
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
    const errText = await res.text();
    console.error(`[image-describe] Gemini error ${res.status}: ${errText}`);
    return fallbackResult(tone);
  }

  const data = await res.json();
  const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  if (!text) return fallbackResult(tone);

  try {
    const cleaned = text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
    const parsed = JSON.parse(cleaned) as Partial<DescribeResult>;

    return {
      altText: parsed.altText?.trim() || fallbackResult(tone).altText,
      shortCaption: parsed.shortCaption?.trim() || fallbackResult(tone).shortCaption,
      detailedDescription: parsed.detailedDescription?.trim() || fallbackResult(tone).detailedDescription,
      seoKeywords: parsed.seoKeywords?.trim() || fallbackResult(tone).seoKeywords,
      socialCaption: parsed.socialCaption?.trim() || fallbackResult(tone).socialCaption,
    };
  } catch {
    return fallbackResult(tone);
  }
}

// ── Route ────────────────────────────────────────────────────────────────────

const ACCEPTED_MIME = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(req: Request) {
  // Rate limit
  const ip = getClientIp(req);
  const rl = checkRateLimit(`image-describe:${ip}`, AI_RATE_LIMIT);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  // Check API key
  if (!env.geminiApiKey) {
    return NextResponse.json(
      { error: "AI service is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  // Parse multipart form data
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request format." }, { status: 400 });
  }

  const imageFile = formData.get("image");
  const toneRaw = formData.get("tone");

  if (!(imageFile instanceof File)) {
    return NextResponse.json({ error: "No image file provided." }, { status: 400 });
  }

  // Validate file type
  const mimeType = imageFile.type || "image/jpeg";
  if (!ACCEPTED_MIME.includes(mimeType)) {
    return NextResponse.json(
      { error: "Unsupported file type. Please upload a PNG, JPG, WEBP or GIF image." },
      { status: 400 },
    );
  }

  // Validate file size
  if (imageFile.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 10 MB." },
      { status: 400 },
    );
  }

  // Validate tone
  const VALID_TONES: Tone[] = ["descriptive", "accessibility", "seo", "social"];
  const tone: Tone =
    typeof toneRaw === "string" && VALID_TONES.includes(toneRaw as Tone)
      ? (toneRaw as Tone)
      : "descriptive";

  // Convert to base64
  const arrayBuffer = await imageFile.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  // Call Gemini Vision
  try {
    const result = await callGeminiVision(base64, mimeType, tone);
    return NextResponse.json(result);
  } catch (e) {
    console.error("[image-describe] Unexpected error:", e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
