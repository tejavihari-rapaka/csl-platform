// import Redis from 'ioredis';

// /**
//  * Redis client singleton for caching, sessions, and rate limiting.
//  * Uses connection URL from env for flexibility (local or managed Redis).
//  */
// const globalForRedis = globalThis as unknown as { redis: Redis | null };

// function createRedisClient(): Redis | null {
//   const url = process.env.REDIS_URL;
//   if (!url) return null;
//   return new Redis(url);
// }

// export const redis = globalForRedis.redis ?? createRedisClient();
// if (process.env.NODE_ENV !== 'production' && redis) globalForRedis.redis = redis;


// Redis is optional — app works without it
// const isRedisAvailable = !!process.env.REDIS_URL

// let redis: any = null

// if (isRedisAvailable) {
//   const { default: Redis } = await import('ioredis')
//   redis = new Redis(process.env.REDIS_URL!)
// }

// // Safe cache helper — skips Redis if not available
// export async function getCache(key: string) {
//   if (!redis) return null
//   try { return await redis.get(key) } catch { return null }
// }

// export async function setCache(key: string, value: string, ttl = 300) {
//   if (!redis) return
//   try { await redis.setex(key, ttl, value) } catch {}
// }

// export default redis


export const getCache = async (key: string) => null
export const setCache = async (key: string, value: string, ttl?: number) => {}
export default null