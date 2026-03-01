import { Hero } from '@/components/landing/Hero';
import { AboutSection } from '@/components/landing/AboutSection';
import { StatsSection } from '@/components/landing/StatsSection';
import { LanguagesSection } from '@/components/landing/LanguagesSection';
import { CoursesSection } from '@/components/landing/CoursesSection';
import { MentorsSection } from '@/components/landing/MentorsSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { ContactSection } from '@/components/landing/ContactSection';

/**
 * Main landing page for CSL - aggregates all landing sections.
 */

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

async function getCoursesData() {
  const res = await fetch(`${baseUrl}/api/courses`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return { courses: [], languages: [] };
  return res.json() as Promise<{ courses: any[]; languages: any[] }>;
}

async function getMentorsData() {
  const res = await fetch(`${baseUrl}/api/mentors`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) return { mentors: [] };
  return res.json() as Promise<{ mentors: any[] }>;
}

async function getStatsData() {
  const res = await fetch(`${baseUrl}/api/stats`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    return {
      totalCourses: 0,
      totalMentors: 0,
      pastStudents: 0,
      enrolledStudents: 0,
    };
  }
  return res.json() as Promise<{
    totalCourses: number;
    totalMentors: number;
    pastStudents: number;
    enrolledStudents: number;
  }>;
}

export default async function HomePage() {
  const [{ courses, languages }, { mentors }, stats] = await Promise.all([
    getCoursesData(),
    getMentorsData(),
    getStatsData(),
  ]);

  return (
    <>
      <Hero />
      <AboutSection />
      <StatsSection stats={stats} />
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

export const dynamic = 'force-dynamic'

