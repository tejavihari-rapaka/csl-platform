import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const CACHE_KEY = 'courses:all';
const CACHE_TTL_SECONDS = 300;

export const revalidate = 300;

export async function GET() {
  try {

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

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error('GET /api/courses error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic'
