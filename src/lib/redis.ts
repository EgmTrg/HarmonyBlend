import { Redis } from "ioredis";

// undefined = not yet resolved, null = disabled (REDIS_URL not set — e.g.
// plain `npm run dev` without the Docker Redis service). Caching is a pure
// performance optimization, so its absence must never break a page.
let client: Redis | null | undefined;

function getClient(): Redis | null {
  if (client !== undefined) return client;
  const url = process.env.REDIS_URL;
  if (!url) {
    client = null;
    return client;
  }
  client = new Redis(url, { maxRetriesPerRequest: 1, lazyConnect: false });
  client.on("error", (err) => console.error("[redis] connection error", err));
  return client;
}

// Cache-aside: returns the cached value under `key` if present, otherwise
// calls `fn`, caches its result for `ttlSeconds`, and returns it. Any Redis
// failure (unreachable, timeout, ...) falls back to calling `fn` directly.
export async function cached<T>(key: string, ttlSeconds: number, fn: () => Promise<T>): Promise<T> {
  const redis = getClient();
  if (!redis) return fn();

  try {
    const raw = await redis.get(key);
    if (raw) return JSON.parse(raw) as T;
  } catch (err) {
    console.error("[redis] read failed, falling back to source", err);
  }

  const value = await fn();
  redis.set(key, JSON.stringify(value), "EX", ttlSeconds).catch((err) => {
    console.error("[redis] write failed", err);
  });
  return value;
}
