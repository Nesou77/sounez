/**
 * Centralised Gemini AI helper.
 * All Gemini API calls go through this file - never from client components.
 *
 * Uses the Gemini REST API directly (no SDK) to avoid adding a dependency.
 * Model: process.env.GEMINI_MODEL || "gemini-2.5-flash"
 */

import { env } from "@/lib/env";

// ── Types ────────────────────────────────────────────────────────────────────

export type AnthropicJsonOptions = {
  systemPrompt: string;
  userPrompt: string;
  maxOutputTokens?: number;
};

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

const ANTHROPIC_MESSAGES = "https://api.anthropic.com/v1/messages";
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

// Thinking models (e.g. gemini-2.5-flash) return an internal reasoning part
// first (thought: true) followed by the actual response part. Walk in reverse
// so we always get the real output regardless of how many thought parts exist.
function extractResponseText(data: unknown): string {
  type Part = { text?: string; thought?: boolean };
  const parts: Part[] =
    (data as { candidates?: Array<{ content?: { parts?: Part[] } }> })
      ?.candidates?.[0]?.content?.parts ?? [];
  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i];
    if (!p.thought && typeof p.text === "string" && p.text.length > 0) {
      return p.text;
    }
  }
  return "";
}

function extractFinishReason(data: unknown): string {
  return (
    (data as { candidates?: Array<{ finishReason?: string }> })
      ?.candidates?.[0]?.finishReason ?? "UNKNOWN"
  );
}

// gemini-2.5-* are thinking models; disable thinking for simple structured tasks
// so responses are faster, cheaper, and don't require multi-part parsing.
function isThinkingModel(model: string): boolean {
  return /gemini-2\.5/i.test(model);
}

function buildVisionBody(
  imageBase64: string,
  imageMimeType: string,
  prompt: string,
  maxOutputTokens: number,
  model: string,
) {
  return {
    contents: [
      {
        role: "user",
        parts: [
          // Official REST v1beta field names are snake_case for inline image data
          { inline_data: { mime_type: imageMimeType, data: imageBase64 } },
          { text: prompt },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens,
      responseMimeType: "application/json",
      // Disable thinking tokens for this simple structured-output task
      ...(isThinkingModel(model) ? { thinkingConfig: { thinkingBudget: 0 } } : {}),
    },
  };
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Call Anthropic Claude and return a parsed JSON response.
 * Returns null if the API key is missing or the call fails.
 */
export async function callAnthropicJson<T>(options: AnthropicJsonOptions): Promise<T | null> {
  const { systemPrompt, userPrompt, maxOutputTokens = 800 } = options;

  if (!env.anthropicApiKey) {
    return null;
  }

  try {
    const res = await fetch(ANTHROPIC_MESSAGES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.anthropicApiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: env.anthropicModel,
        max_tokens: maxOutputTokens,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!res.ok) {
      console.error(`[ai] Anthropic error ${res.status}: ${await res.text()}`);
      return null;
    }

    const data = await res.json();
    const text: string = (data as { content?: Array<{ type: string; text?: string }> })
      ?.content?.[0]?.text ?? "";
    if (!text) return null;

    return safeParseJson<T>(text, null as T);
  } catch (e) {
    console.error("[ai] callAnthropicJson failed:", e);
    return null;
  }
}

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
    const text = extractResponseText(data);
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
    const text = extractResponseText(data);
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
 * Like callGeminiVisionJson but returns null when the API key is missing or the call fails.
 * Use when the caller must not substitute fallback data for a failed AI vision call.
 */
export async function callGeminiVisionJsonRequired<T>(
  options: Omit<GeminiVisionOptions, "fallback">,
): Promise<T | null> {
  const { prompt, imageBase64, imageMimeType, maxOutputTokens = 1200 } = options;

  if (!env.geminiApiKey) {
    return null;
  }

  const model = env.geminiModel;

  try {
    const res = await fetch(geminiUrl(model, "generateContent"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildVisionBody(imageBase64, imageMimeType, prompt, maxOutputTokens, model)),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`[ai] Gemini vision HTTP ${res.status}: ${errorBody}`);
      return null;
    }

    const data = await res.json();

    const finishReason = extractFinishReason(data);
    if (finishReason !== "STOP") {
      console.error(`[ai] Gemini vision finishReason=${finishReason} — response may be incomplete`);
    }

    const text = extractResponseText(data);
    if (!text) {
      console.error("[ai] Gemini vision: no text in response:", JSON.stringify(data).slice(0, 600));
      return null;
    }
    console.log(`[ai] Gemini vision raw text (first 300): ${text.slice(0, 300)}`);

    try {
      const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
      return JSON.parse(cleaned) as T;
    } catch (e) {
      console.error("[ai] Gemini vision JSON parse failed:", e, "| text:", text.slice(0, 500));
      return null;
    }
  } catch (e) {
    console.error("[ai] callGeminiVisionJsonRequired failed:", e);
    return null;
  }
}

/**
 * Call Gemini with a multimodal (image + text) request and return a parsed JSON response.
 * Falls back to `options.fallback` if the API key is missing or the call fails.
 * All API key access goes through env.geminiApiKey — never read process.env directly.
 */
export async function callGeminiVisionJson<T>(options: GeminiVisionOptions): Promise<T> {
  const { prompt, imageBase64, imageMimeType, fallback, maxOutputTokens = 1200 } = options;

  if (!env.geminiApiKey) {
    return fallback as T;
  }

  const model = env.geminiModel;

  try {
    const res = await fetch(geminiUrl(model, "generateContent"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildVisionBody(imageBase64, imageMimeType, prompt, maxOutputTokens, model)),
    });

    if (!res.ok) {
      console.error(`[ai] Gemini vision HTTP ${res.status}: ${await res.text()}`);
      return fallback as T;
    }

    const data = await res.json();
    const text = extractResponseText(data);
    if (!text) {
      console.error("[ai] Gemini vision: no text in response:", JSON.stringify(data).slice(0, 600));
      return fallback as T;
    }

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
