import { NextResponse } from "next/server";

function fallbackBio(
  name: string,
  role: string,
  interests: string,
  platform: string,
): string {
  const base = `${name} | ${role} | ${interests} ✨`;
  const maxLen = platform === "instagram" || platform === "twitter" ? 160 : 300;
  return base.slice(0, maxLen);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role, interests, platform } = body as {
      name?: string;
      role?: string;
      interests?: string;
      platform?: string;
    };

    if (!name?.trim() || !role?.trim()) {
      return NextResponse.json({ bio: "" }, { status: 400 });
    }

    const validPlatforms = ["instagram", "twitter", "linkedin", "general"];
    const safePlatform = validPlatforms.includes(platform ?? "")
      ? platform!
      : "general";
    const safeInterests = interests?.trim() ?? "";

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        bio: fallbackBio(
          name.trim(),
          role.trim(),
          safeInterests,
          safePlatform,
        ),
      });
    }

    const maxChars =
      safePlatform === "instagram" || safePlatform === "twitter" ? 160 : 300;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 200,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `Write a short social media bio for the given platform. Return JSON: { "bio": string }. Max ${maxChars} characters for ${safePlatform}.`,
          },
          {
            role: "user",
            content: `Name: ${name.trim()}\nRole: ${role.trim()}\nInterests: ${safeInterests}\nPlatform: ${safePlatform}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      return NextResponse.json({
        bio: fallbackBio(
          name.trim(),
          role.trim(),
          safeInterests,
          safePlatform,
        ),
      });
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json({
        bio: fallbackBio(
          name.trim(),
          role.trim(),
          safeInterests,
          safePlatform,
        ),
      });
    }

    const parsed = JSON.parse(content);
    const bio =
      typeof parsed?.bio === "string" && parsed.bio.trim()
        ? parsed.bio.trim()
        : fallbackBio(name.trim(), role.trim(), safeInterests, safePlatform);

    return NextResponse.json({ bio });
  } catch {
    return NextResponse.json({
      bio: "Could not generate bio. Please try again.",
    });
  }
}
