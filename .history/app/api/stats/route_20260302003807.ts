import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import { redis } from '@/lib/redis';

const CACHE_KEY = 'stats:all';
const CACHE_TTL_SECONDS = 60;

export const revalidate = 60;

export async function GET() {
  try {
    if (redis) {
      const cached = await redis.get(CACHE_KEY);
      if (cached) {
        const data = JSON.parse(cached);
        return NextResponse.json(data, { status: 200 });
      }
    }

    const stats = await prisma.siteStats.findFirst({
      orderBy: { updatedAt: 'desc' },
    });

    const payload = {
      totalCourses: stats?.totalCourses ?? 0,
      totalMentors: stats?.totalMentors ?? 0,
      pastStudents: stats?.pastStudents ?? 0,
      enrolledStudents: stats?.enrolledStudents ?? 0,
    };

    if (redis) {
      await redis.set(CACHE_KEY, JSON.stringify(payload), 'EX', CACHE_TTL_SECONDS);
    }

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error('GET /api/stats error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
