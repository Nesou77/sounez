import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { callGeminiVisionJsonRequired } from "@/lib/ai";
import { checkRateLimit, getClientIp, AI_RATE_LIMIT } from "@/lib/rate-limit";

type Tone = "descriptive" | "accessibility" | "seo" | "social";

type DescribeResult = {
  altText: string;
  shortCaption: string;
  detailedDescription: string;
  seoKeywords: string;
  socialCaption: string;
};

// ── Prompt ────────────────────────────────────────────────────────────────────

function buildPrompt(tone: Tone): string {
  const toneInstructions: Record<Tone, string> = {
    descriptive:
      "Write a neutral, factual description. Cover subjects, objects, scene, colors, lighting, and composition in plain language.",
    accessibility:
      "Write concise alt text optimized for screen readers. Name the most important subject first. Stay under 125 characters. Avoid phrases like 'image of' or 'photo showing'.",
    seo:
      "Generate keyword-rich content using specific nouns from the image: subject names, colors, setting, materials, and context that users would search for.",
    social:
      "Write a conversational, engaging social media caption. Work 1-2 emojis naturally into the text. Add 3-5 relevant hashtags at the end.",
  };

  const altTextInstruction =
    tone === "accessibility"
      ? "Concise alt text for screen readers, under 125 characters. Most important subject first. No filler phrases."
      : "A specific, descriptive alt text (1-2 sentences). Describe the actual content, not just the type of image.";

  return `You are an expert image analyst. Your task is to examine the image provided and produce accurate, specific descriptions based solely on what is visible.

STRICT RULES — follow every rule without exception:
1. Describe ONLY what you can see. Do not invent, assume, or guess details that are not visible.
2. NEVER use generic filler such as: "uploaded image", "visual content", "a photo of", "this image shows", "an image depicting", "image ready for use", or any similar placeholder phrase.
3. Be specific: name exact colors, objects, clothing, text visible in the image, setting, mood, activity, and composition.
4. If you can read text in the image, include it.
5. If the image is ambiguous, describe what you can see confidently without guessing.

Return a JSON object with EXACTLY these five fields and no other keys:
{
  "altText": "${altTextInstruction}",
  "shortCaption": "A punchy one-line caption under 15 words based on the actual image content.",
  "detailedDescription": "3-5 sentences describing the subjects, colors, setting, composition, and mood visible in the image.",
  "seoKeywords": "8-12 specific, comma-separated SEO keywords drawn from the actual objects and context in the image.",
  "socialCaption": "An engaging social media caption with 1-2 emojis and 3-5 relevant hashtags at the end."
}

Tone: ${toneInstructions[tone]}

Return ONLY the JSON object. No markdown code fences. No explanation. No extra keys.`;
}

// ── Route ─────────────────────────────────────────────────────────────────────

const ACCEPTED_MIME = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const MAX_SIZE = 10 * 1024 * 1024;
const VALID_TONES: Tone[] = ["descriptive", "accessibility", "seo", "social"];

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`image-describe:${ip}`, AI_RATE_LIMIT);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  if (!env.geminiApiKey) {
    return NextResponse.json(
      { error: "Image description is temporarily unavailable. Please try again later." },
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

  const tone: Tone =
    typeof toneRaw === "string" && VALID_TONES.includes(toneRaw as Tone)
      ? (toneRaw as Tone)
      : "descriptive";

  const arrayBuffer = await imageFile.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  try {
    const raw = await callGeminiVisionJsonRequired<Partial<DescribeResult>>({
      prompt: buildPrompt(tone),
      imageBase64: base64,
      imageMimeType: mimeType,
      maxOutputTokens: 1200,
    });

    if (!raw) {
      return NextResponse.json(
        { error: "The AI could not analyse this image. Please try a different image or try again." },
        { status: 500 },
      );
    }

    const result: DescribeResult = {
      altText: raw.altText?.trim() ?? "",
      shortCaption: raw.shortCaption?.trim() ?? "",
      detailedDescription: raw.detailedDescription?.trim() ?? "",
      seoKeywords: raw.seoKeywords?.trim() ?? "",
      socialCaption: raw.socialCaption?.trim() ?? "",
    };

    // Both core fields must be present and non-empty for a valid response
    if (!result.altText || !result.detailedDescription) {
      console.error("[image-describe] Incomplete AI response:", raw);
      return NextResponse.json(
        { error: "The AI returned an incomplete response. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json(result);
  } catch (e) {
    console.error("[image-describe] Unexpected error:", e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
