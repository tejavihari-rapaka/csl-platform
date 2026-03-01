import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import { redis } from '@/lib/redis';

const CACHE_KEY = 'mentors:all';
const CACHE_TTL_SECONDS = 600;

export const revalidate = 600;

export async function GET() {
  try {
    // if (redis) {
    //   const cached = await redis.get(CACHE_KEY);
    //   if (cached) {
    //     const data = JSON.parse(cached);
    //     return NextResponse.json(data, { status: 200 });
    //   }
    // }

    const mentors = await prisma.mentor.findMany({
      orderBy: { rating: 'desc' },
      include: {
        _count: { select: { courses: true } },
      },
    });

    const payload = { mentors };

    // if (redis) {
    //   await redis.set(CACHE_KEY, JSON.stringify(payload), 'EX', CACHE_TTL_SECONDS);
    // }

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error('GET /api/mentors error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
