import { NextResponse } from "next/server";

const SUFFIXES = ["Hub", "Lab", "Co", "Studio", "HQ", "Works"];

function fallbackNames(industry: string, keywords: string): string[] {
  const base = keywords.trim()
    ? keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)[0] ?? industry.trim()
    : industry.trim();
  const word = base.replace(/\s+/g, "").replace(/[^a-zA-Z0-9]/g, "");
  const capitalised = word.charAt(0).toUpperCase() + word.slice(1);
  return SUFFIXES.map((s) => `${capitalised}${s}`);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { industry, keywords, style } = body as {
      industry?: string;
      keywords?: string;
      style?: string;
    };

    if (!industry?.trim()) {
      return NextResponse.json({ names: [] }, { status: 400 });
    }

    const validStyles = ["modern", "playful", "professional", "abstract"];
    const safeStyle = validStyles.includes(style ?? "") ? style! : "modern";

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        names: fallbackNames(industry.trim(), keywords ?? ""),
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
        max_tokens: 300,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              'Generate 6 creative, brandable business names. Return JSON: { "names": string[] }.',
          },
          {
            role: "user",
            content: `Industry: ${industry.trim()}\nKeywords: ${keywords?.trim() ?? ""}\nStyle: ${safeStyle}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      return NextResponse.json({
        names: fallbackNames(industry.trim(), keywords ?? ""),
      });
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json({
        names: fallbackNames(industry.trim(), keywords ?? ""),
      });
    }

    const parsed = JSON.parse(content);
    const names = Array.isArray(parsed?.names) ? parsed.names : [];
    if (names.length === 0) {
      return NextResponse.json({
        names: fallbackNames(industry.trim(), keywords ?? ""),
      });
    }

    return NextResponse.json({ names });
  } catch {
    return NextResponse.json({
      names: ["Could not generate names. Please try again."],
    });
  }
}
