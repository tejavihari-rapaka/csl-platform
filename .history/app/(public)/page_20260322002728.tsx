import { prisma } from '@/lib/prisma';
import { Hero } from '@/components/landing/Hero';
import { AboutSection } from '@/components/landing/AboutSection';
import { StatsSection } from '@/components/landing/StatsSection';
import { LanguagesSection } from '@/components/landing/LanguagesSection';
import { CoursesSection } from '@/components/landing/CoursesSection';
import { MentorsSection } from '@/components/landing/MentorsSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { ContactSection } from '@/components/landing/ContactSection';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [courses, languages, mentors, statsRaw] = await Promise.all([
    prisma.course.findMany({
      where: { status: 'PUBLISHED' },
      include: { language: true, mentor: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.language.findMany({
      orderBy: { name: 'asc' },
    }),
    prisma.mentor.findMany({
      orderBy: { rating: 'desc' },
    }),
    prisma.siteStats.findFirst({
      orderBy: { updatedAt: 'desc' },
    }),
  ]);

  const stats = statsRaw ?? {
    totalCourses: 0,
    totalMentors: 0,
    pastStudents: 0,
    enrolledStudents: 0,
  };

  return (
    <>
      <Hero />
      <StatsSection stats={stats} />
      <AboutSection />
      <LanguagesSection />
      <CoursesSection courses={courses} languages={languages} />
      <MentorsSection mentors={mentors} />
      <section id="gallery" className="py-16 md:py-24" aria-label="Gallery">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Community Gallery
          </h2>
          <p className="mt-2 text-muted-foreground">
            Moments from our language learning community. (Coming soon.)
          </p>
        </div>
      </section>
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}