import { NextResponse } from "next/server";

type Idea = {
  name: string;
  tagline: string;
  description: string;
  keyFeatures: string[];
};

function fallbackIdeas(interests: string, type: string): Idea[] {
  const base = interests.trim() || "your niche";
  return [
    {
      name: `${base.split(" ")[0]}Hub`,
      tagline: `The go-to ${type} for ${base} enthusiasts`,
      description: `A ${type} platform dedicated to ${base}, helping people discover, learn and connect.`,
      keyFeatures: [
        `Curated ${base} content`,
        "Community forum",
        "Newsletter digest",
      ],
    },
    {
      name: `${base.split(" ")[0]}Lab`,
      tagline: `Experiment with ${base} ideas`,
      description: `An interactive ${type} where visitors can explore tools and resources related to ${base}.`,
      keyFeatures: ["Free tools", "Resource library", "Weekly challenges"],
    },
    {
      name: `${base.split(" ")[0]}Guide`,
      tagline: `Your complete guide to ${base}`,
      description: `A comprehensive ${type} covering everything beginners and experts need to know about ${base}.`,
      keyFeatures: ["Step-by-step tutorials", "Expert interviews", "FAQ database"],
    },
    {
      name: `${base.split(" ")[0]}Market`,
      tagline: `Buy, sell and discover ${base}`,
      description: `A ${type} marketplace connecting buyers and sellers in the ${base} space.`,
      keyFeatures: ["Listings directory", "Reviews system", "Price comparison"],
    },
  ];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { interests, type } = body as {
      interests?: string;
      type?: string;
    };

    if (!interests?.trim()) {
      return NextResponse.json({ ideas: [] }, { status: 400 });
    }

    const validTypes = ["blog", "saas", "ecommerce", "community", "tool"];
    const safeType = validTypes.includes(type ?? "") ? type! : "blog";

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        ideas: fallbackIdeas(interests.trim(), safeType),
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
        max_tokens: 800,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              'Generate 4 unique website ideas. Return JSON: { "ideas": Array<{ "name": string; "tagline": string; "description": string; "keyFeatures": string[] }> }.',
          },
          {
            role: "user",
            content: `Interests/niche: ${interests.trim()}\nWebsite type: ${safeType}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      return NextResponse.json({
        ideas: fallbackIdeas(interests.trim(), safeType),
      });
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json({
        ideas: fallbackIdeas(interests.trim(), safeType),
      });
    }

    const parsed = JSON.parse(content);
    const ideas = Array.isArray(parsed?.ideas) ? parsed.ideas : [];
    if (ideas.length === 0) {
      return NextResponse.json({
        ideas: fallbackIdeas(interests.trim(), safeType),
      });
    }

    return NextResponse.json({ ideas });
  } catch {
    return NextResponse.json({
      ideas: fallbackIdeas("your niche", "blog"),
    });
  }
}
