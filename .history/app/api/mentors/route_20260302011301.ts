import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


const CACHE_KEY = 'mentors:all';
const CACHE_TTL_SECONDS = 600;

export const revalidate = 600;

export async function GET() {
  try {

    const mentors = await prisma.mentor.findMany({
      orderBy: { rating: 'desc' },
      include: {
        _count: { select: { courses: true } },
      },
    });

    const payload = { mentors };

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error('GET /api/mentors error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic'