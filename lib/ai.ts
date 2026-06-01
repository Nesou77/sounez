/**
 * Centralised Gemini AI helper.
 * All Gemini API calls go through this file - never from client components.
 *
 * Uses the Gemini REST API directly (no SDK) to avoid adding a dependency.
 * Model: process.env.GEMINI_MODEL || "gemini-2.5-flash"
 */

import { env } from "@/lib/env";

// ── Types ────────────────────────────────────────────────────────────────────

export type GeminiJsonOptions = {
  systemPrompt: string;
  userPrompt: string;
  fallback: unknown;
  maxOutputTokens?: number;
};

export type GeminiStreamOptions = {
  systemPrompt: string;
  userPrompt: string;
  fallbackText: string;
  maxOutputTokens?: number;
};

export type GeminiVisionOptions = {
  /** Text prompt describing what to do with the image. */
  prompt: string;
  imageBase64: string;
  imageMimeType: string;
  fallback: unknown;
  maxOutputTokens?: number;
};

// ── Internal helpers ─────────────────────────────────────────────────────────

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

function geminiUrl(model: string, method: "generateContent" | "streamGenerateContent"): string {
  return `${GEMINI_BASE}/${model}:${method}?key=${env.geminiApiKey}`;
}

function buildBody(
  systemPrompt: string,
  userPrompt: string,
  maxOutputTokens: number,
  jsonMode: boolean,
) {
  return {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents: [{ role: "user", parts: [{ text: userPrompt }] }],
    generationConfig: {
      maxOutputTokens,
      ...(jsonMode ? { responseMimeType: "application/json" } : {}),
    },
  };
}

function safeParseJson<T>(text: string, fallback: T): T {
  try {
    // Strip markdown fences if the model wraps the JSON anyway
    const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    return JSON.parse(cleaned) as T;
  } catch {
    return fallback;
  }
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Call Gemini and return a parsed JSON response.
 * Falls back to `options.fallback` if the API key is missing or the call fails.
 */
export async function callGeminiJson<T>(options: GeminiJsonOptions): Promise<T> {
  const { systemPrompt, userPrompt, fallback, maxOutputTokens = 800 } = options;

  if (!env.geminiApiKey) {
    return fallback as T;
  }

  try {
    const res = await fetch(geminiUrl(env.geminiModel, "generateContent"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildBody(systemPrompt, userPrompt, maxOutputTokens, true)),
    });

    if (!res.ok) {
      console.error(`[ai] Gemini error ${res.status}: ${await res.text()}`);
      return fallback as T;
    }

    const data = await res.json();
    const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    if (!text) return fallback as T;

    return safeParseJson<T>(text, fallback as T);
  } catch (e) {
    console.error("[ai] callGeminiJson failed:", e);
    return fallback as T;
  }
}

/**
 * Like callGeminiJson but returns null when the API key is missing or the call fails.
 * Use when production must not silently substitute fallback data.
 */
export async function callGeminiJsonRequired<T>(options: Omit<GeminiJsonOptions, "fallback">): Promise<T | null> {
  const { systemPrompt, userPrompt, maxOutputTokens = 800 } = options;

  if (!env.geminiApiKey) {
    return null;
  }

  try {
    const res = await fetch(geminiUrl(env.geminiModel, "generateContent"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildBody(systemPrompt, userPrompt, maxOutputTokens, true)),
    });

    if (!res.ok) {
      console.error(`[ai] Gemini error ${res.status}: ${await res.text()}`);
      return null;
    }

    const data = await res.json();
    const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    if (!text) return null;

    try {
      const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
      return JSON.parse(cleaned) as T;
    } catch {
      return null;
    }
  } catch (e) {
    console.error("[ai] callGeminiJsonRequired failed:", e);
    return null;
  }
}

/**
 * Call Gemini with a multimodal (image + text) request and return a parsed JSON response.
 * Falls back to `options.fallback` if the API key is missing or the call fails.
 * All API key access goes through env.geminiApiKey — never read process.env directly.
 */
export async function callGeminiVisionJson<T>(options: GeminiVisionOptions): Promise<T> {
  const { prompt, imageBase64, imageMimeType, fallback, maxOutputTokens = 600 } = options;

  if (!env.geminiApiKey) {
    return fallback as T;
  }

  try {
    const res = await fetch(geminiUrl(env.geminiModel, "generateContent"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { inlineData: { mimeType: imageMimeType, data: imageBase64 } },
              { text: prompt },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!res.ok) {
      console.error(`[ai] Gemini vision error ${res.status}: ${await res.text()}`);
      return fallback as T;
    }

    const data = await res.json();
    const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    if (!text) return fallback as T;

    return safeParseJson<T>(text, fallback as T);
  } catch (e) {
    console.error("[ai] callGeminiVisionJson failed:", e);
    return fallback as T;
  }
}

/**
 * Call Gemini with streaming and return a ReadableStream<Uint8Array>.
 * Falls back to streaming the fallbackText if the API key is missing or the call fails.
 */
export async function streamGeminiText(
  options: GeminiStreamOptions,
): Promise<ReadableStream<Uint8Array>> {
  const { systemPrompt, userPrompt, fallbackText, maxOutputTokens = 1200 } = options;

  const encoder = new TextEncoder();

  // Helper: stream a static string
  function staticStream(text: string): ReadableStream<Uint8Array> {
    return new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(text));
        controller.close();
      },
    });
  }

  if (!env.geminiApiKey) {
    return staticStream(fallbackText);
  }

  try {
    const res = await fetch(geminiUrl(env.geminiModel, "streamGenerateContent") + "&alt=sse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildBody(systemPrompt, userPrompt, maxOutputTokens, false)),
    });

    if (!res.ok || !res.body) {
      console.error(`[ai] Gemini stream error ${res.status}`);
      return staticStream(fallbackText);
    }

    // Transform the SSE stream into a plain text stream
    const decoder = new TextDecoder();
    const upstream = res.body;

    return new ReadableStream<Uint8Array>({
      async start(controller) {
        const reader = upstream.getReader();
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const jsonStr = line.slice(6).trim();
              if (!jsonStr || jsonStr === "[DONE]") continue;
              try {
                const chunk = JSON.parse(jsonStr);
                const text: string =
                  chunk?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
                if (text) {
                  controller.enqueue(encoder.encode(text));
                }
              } catch {
                // skip malformed SSE line
              }
            }
          }
        } catch (e) {
          console.error("[ai] stream read error:", e);
          controller.enqueue(encoder.encode("\n\n[Generation stopped unexpectedly.]"));
        } finally {
          reader.releaseLock();
          controller.close();
        }
      },
    });
  } catch (e) {
    console.error("[ai] streamGeminiText failed:", e);
    return staticStream(fallbackText);
  }
}
