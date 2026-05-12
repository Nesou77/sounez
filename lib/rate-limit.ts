/**
 * Lightweight in-memory token-bucket rate limiter by IP address.
 * No external dependencies required.
 *
 * For production at scale, replace the in-memory store with Upstash Redis
 * by setting UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.
 * The interface stays the same — only the backing store changes.
 */

type Bucket = {
  tokens: number;
  lastRefill: number; // ms timestamp
};

// Global store — survives across requests in the same Node.js process.
const store = new Map<string, Bucket>();

// Clean up stale entries every 5 minutes to avoid unbounded memory growth.
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of store.entries()) {
      if (now - bucket.lastRefill > 5 * 60 * 1000) {
        store.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export type RateLimitConfig = {
  /** Maximum requests allowed in the window. */
  limit: number;
  /** Window duration in milliseconds. */
  windowMs: number;
};

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
};

/**
 * Check and consume one token for the given key.
 * Returns { allowed: true } if the request is within limits.
 */
export function checkRateLimit(
  key: string,
  config: RateLimitConfig,
): RateLimitResult {
  const now = Date.now();
  let bucket = store.get(key);

  if (!bucket || now - bucket.lastRefill >= config.windowMs) {
    // New window — full bucket
    bucket = { tokens: config.limit, lastRefill: now };
  }

  if (bucket.tokens <= 0) {
    store.set(key, bucket);
    return { allowed: false, remaining: 0 };
  }

  bucket.tokens -= 1;
  store.set(key, bucket);
  return { allowed: true, remaining: bucket.tokens };
}

/**
 * Extract the client IP from a Next.js Request.
 * Checks x-forwarded-for, x-real-ip, then falls back to "anonymous".
 */
export function getClientIp(req: Request): string {
  const headers = req.headers;
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for can be a comma-separated list; take the first
    return forwarded.split(",")[0].trim();
  }
  return headers.get("x-real-ip") ?? "anonymous";
}

// Pre-configured limiters for convenience
export const AI_RATE_LIMIT: RateLimitConfig = {
  limit: 10,
  windowMs: 60 * 1000, // 10 req / min
};

export const STUDY_NOTES_RATE_LIMIT: RateLimitConfig = {
  limit: 5,
  windowMs: 60 * 1000, // 5 req / min (higher token usage)
};
