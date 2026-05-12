import { NextResponse } from "next/server";

const FALLBACK_CAPTIONS = (topic: string, platform: string, tone: string) => {
  const toneMap: Record<string, string[]> = {
    funny: [
      `When ${topic} hits different 😂 #relatable`,
      `Nobody: … Me with ${topic}: 🤣`,
      `${topic} said what now? 😅`,
    ],
    professional: [
      `Exploring the world of ${topic}. Thoughts? 💼`,
      `${topic} — a perspective worth sharing.`,
      `Diving deeper into ${topic} today. What's your take?`,
    ],
    inspirational: [
      `${topic} reminds us that every step forward counts. ✨`,
      `Let ${topic} be your motivation today. 🌟`,
      `The journey with ${topic} is just beginning. Keep going. 💪`,
    ],
  };
  const platformSuffix =
    platform === "instagram"
      ? " #instagood #explore"
      : platform === "tiktok"
        ? " #fyp #viral"
        : "";
  const base = toneMap[tone] ?? toneMap.professional;
  return base.map((c) => c + platformSuffix);
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, platform, tone } = body as {
      topic?: string;
      platform?: string;
      tone?: string;
    };

    if (!topic?.trim()) {
      return NextResponse.json({ captions: [] }, { status: 400 });
    }

    const validPlatforms = ["instagram", "tiktok", "linkedin"];
    const validTones = ["funny", "professional", "inspirational"];
    const safePlatform = validPlatforms.includes(platform ?? "")
      ? platform!
      : "instagram";
    const safeTone = validTones.includes(tone ?? "") ? tone! : "professional";

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        captions: FALLBACK_CAPTIONS(topic.trim(), safePlatform, safeTone),
      });
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 500,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              'You are a social media expert. Return exactly 3 captions for the given topic, platform and tone. Format as JSON: { "captions": string[] }.',
          },
          {
            role: "user",
            content: `Topic: ${topic.trim()}\nPlatform: ${safePlatform}\nTone: ${safeTone}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      return NextResponse.json({
        captions: FALLBACK_CAPTIONS(topic.trim(), safePlatform, safeTone),
      });
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json({
        captions: FALLBACK_CAPTIONS(topic.trim(), safePlatform, safeTone),
      });
    }

    const parsed = JSON.parse(content);
    const captions = Array.isArray(parsed?.captions) ? parsed.captions : [];
    if (captions.length === 0) {
      return NextResponse.json({
        captions: FALLBACK_CAPTIONS(topic.trim(), safePlatform, safeTone),
      });
    }

    return NextResponse.json({ captions });
  } catch {
    return NextResponse.json({
      captions: ["Could not generate captions. Please try again."],
    });
  }
}
