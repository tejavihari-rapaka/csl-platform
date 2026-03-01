import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import { redis } from '@/lib/redis';

const CACHE_KEY = 'stats:all';
const CACHE_TTL_SECONDS = 60;

export const revalidate = 60;

export async function GET() {
  try {

    const stats = await prisma.siteStats.findFirst({
      orderBy: { updatedAt: 'desc' },
    });

    const payload = {
      totalCourses: stats?.totalCourses ?? 0,
      totalMentors: stats?.totalMentors ?? 0,
      pastStudents: stats?.pastStudents ?? 0,
      enrolledStudents: stats?.enrolledStudents ?? 0,
    };


    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error('GET /api/stats error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
