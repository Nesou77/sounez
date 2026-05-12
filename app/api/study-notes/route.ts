import { NextResponse } from "next/server";

function fallbackNotes(topic: string, level: string): string {
  return `## ${topic}

### Overview
- This is a summary of **${topic}** at ${level} level.
- Review the key concepts below and expand with your own research.

### Key Points
- Define the core idea of ${topic}.
- Identify the main components or steps involved.
- Consider how ${topic} connects to related subjects.

### Key Terms
- **${topic}**: The subject of these notes.
- Review your textbook or trusted sources for precise definitions.

### Summary
Use these notes as a starting point. Always cross-check with authoritative sources.`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, level } = body as { topic?: string; level?: string };

    if (!topic?.trim()) {
      return NextResponse.json({ notes: "" }, { status: 400 });
    }

    const validLevels = ["beginner", "intermediate", "advanced"];
    const safeLevel = validLevels.includes(level ?? "") ? level! : "beginner";

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        notes: fallbackNotes(topic.trim(), safeLevel),
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
              'Create concise study notes on the topic. Use markdown with ## headings, bullet points and a key terms section. Return plain markdown string in JSON: { "notes": string }.',
          },
          {
            role: "user",
            content: `Topic: ${topic.trim()}\nLevel: ${safeLevel}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      return NextResponse.json({
        notes: fallbackNotes(topic.trim(), safeLevel),
      });
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json({
        notes: fallbackNotes(topic.trim(), safeLevel),
      });
    }

    const parsed = JSON.parse(content);
    const notes =
      typeof parsed?.notes === "string" && parsed.notes.trim()
        ? parsed.notes.trim()
        : fallbackNotes(topic.trim(), safeLevel);

    return NextResponse.json({ notes });
  } catch {
    return NextResponse.json({
      notes: "Could not generate notes. Please try again.",
    });
  }
}
