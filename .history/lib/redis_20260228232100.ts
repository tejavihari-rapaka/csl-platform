import Redis from 'ioredis';

/**
 * Redis client singleton for caching, sessions, and rate limiting.
 * Uses connection URL from env for flexibility (local or managed Redis).
 */
const globalForRedis = globalThis as unknown as { redis: Redis | null };

function createRedisClient(): Redis | null {
  const url = process.env.REDIS_URL;
  if (!url) return null;
  return new Redis(url);
}

export const redis = globalForRedis.redis ?? createRedisClient();
if (process.env.NODE_ENV !== 'production' && redis) globalForRedis.redis = redis;
