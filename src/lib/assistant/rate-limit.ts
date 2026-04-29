import {
  ASSISTANT_RATE_LIMIT_MAX_REQUESTS,
  ASSISTANT_RATE_LIMIT_WINDOW_SECONDS,
} from "@/lib/assistant/config";

const buckets = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, now = Date.now()) {
  const resetAt = now + ASSISTANT_RATE_LIMIT_WINDOW_SECONDS * 1000;
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      remaining: ASSISTANT_RATE_LIMIT_MAX_REQUESTS - 1,
      resetAt,
    };
  }
  if (bucket.count >= ASSISTANT_RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: bucket.resetAt };
  }
  bucket.count += 1;
  return {
    allowed: true,
    remaining: ASSISTANT_RATE_LIMIT_MAX_REQUESTS - bucket.count,
    resetAt: bucket.resetAt,
  };
}

export function resetRateLimitForTests() {
  buckets.clear();
}
