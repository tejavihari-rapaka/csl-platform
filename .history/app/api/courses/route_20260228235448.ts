import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';

const CACHE_KEY = 'courses:all';
const CACHE_TTL_SECONDS = 300;

export const revalidate = 300;

export async function GET() {
  try {
    if (redis) {
      const cached = await redis.get(CACHE_KEY);
      if (cached) {
        const data = JSON.parse(cached);
        return NextResponse.json(data, { status: 200 });
      }
    }

    const courses = await prisma.course.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        language: true,
        mentor: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const languages = await prisma.language.findMany({
      orderBy: { name: 'asc' },
    });

    const payload = { courses, languages };

    if (redis) {
      await redis.set(CACHE_KEY, JSON.stringify(payload), 'EX', CACHE_TTL_SECONDS);
    }

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error('GET /api/courses error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

