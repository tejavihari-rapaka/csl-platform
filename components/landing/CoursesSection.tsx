'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Link from 'next/link';

type Language = {
  id: string;
  name: string;
  code?: string | null;
};

type Mentor = {
  id: string;
  name: string | null;
};

type Course = {
  id: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  level: string | null;
  duration: number | null;
  status: string;
  languageId: string;
  language: Language;
  mentor: Mentor | null;
};

type CoursesSectionProps = {
  courses: Course[];
  languages: Language[];
};

const LANGUAGE_FLAG_MAP: Record<string, string> = {
  Tamil: '🇮🇳',
  Hindi: '🇮🇳',
  English: '🇬🇧',
  French: '🇫🇷',
  Mandarin: '🇨🇳',
  Spanish: '🇪🇸',
};

function getLanguageFlag(languageName: string) {
  return LANGUAGE_FLAG_MAP[languageName] ?? '🌐';
}

function getLevelBadge(level: string | null | undefined) {
  const normalized = (level ?? '').toLowerCase();
  if (normalized.includes('beginner')) return 'Beginner';
  if (normalized.includes('intermediate')) return 'Intermediate';
  if (normalized.includes('advanced')) return 'Advanced';
  return level ?? 'All Levels';
}

export function CoursesSection({ courses, languages }: CoursesSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('all');

  const languagesWithCourses = useMemo(() => {
    const counts = new Map<string, number>();
    courses.forEach((course) => {
      counts.set(course.languageId, (counts.get(course.languageId) ?? 0) + 1);
    });
    return languages.filter((lang) => counts.get(lang.id));
  }, [courses, languages]);

  const filteredCourses = useMemo(() => {
    if (activeTab === 'all') return courses;
    return courses.filter((course) => course.languageId === activeTab);
  }, [activeTab, courses]);

  const hasCourses = courses.length > 0;

  return (
    <section className="py-16 md:py-24">
      <div id="courses" className="container">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-csl-primary mb-2">
              Our Languages
            </p>
            <h2 className="mt-2 text-3xl font-display font-bold tracking-tight text-csl-ink md:text-4xl">
              Languages &amp; Courses
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground leading-relaxed">
              Explore our volunteer-taught language programs
            </p>
          </div>
        </div>

        {hasCourses ? (
          <>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-8"
            >
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger
                  value="all"
                  className="whitespace-nowrap"
                >
                  All Courses
                </TabsTrigger>
                {languagesWithCourses.map((lang) => (
                  <TabsTrigger
                    key={lang.id}
                    value={lang.id}
                    className="whitespace-nowrap"
                  >
                    {getLanguageFlag(lang.name)} {lang.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={activeTab} className="mt-8 outline-none">
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredCourses.map((course) => {
                    const flag = getLanguageFlag(course.language.name);
                    const levelLabel = getLevelBadge(course.level);
                    const durationLabel =
                      course.duration && course.duration > 0
                        ? `${course.duration} Week${course.duration > 1 ? 's' : ''}`
                        : 'Ongoing';

                    return (
                      <Card
                        key={course.id}
                        className="group flex h-full flex-col overflow-hidden border border-border/70 bg-card/80 shadow-sm transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg"
                      >
                        <div className="relative aspect-video w-full overflow-hidden bg-muted">
                          {course.thumbnailUrl ? (
                            <Image
                              src={course.thumbnailUrl}
                              alt={course.title}
                              fill
                              sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                              Course preview coming soon
                            </div>
                          )}
                          <div className="absolute left-3 top-3 flex items-center gap-2">
                            <Badge className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-csl-ink shadow-sm">
                              <span aria-hidden>{flag}</span>
                              <span>{course.language.name}</span>
                            </Badge>
                            <Badge className="rounded-full bg-csl-primary/90 px-3 py-1 text-[11px] font-semibold text-white">
                              {levelLabel}
                            </Badge>
                          </div>
                        </div>

                        <CardHeader className="flex-1 space-y-2 pb-3">
                          <CardTitle className="line-clamp-2 text-base font-semibold md:text-lg">
                            {course.title}
                          </CardTitle>
                          {course.description && (
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                              {course.description}
                            </p>
                          )}
                        </CardHeader>

                        <CardContent className="pb-3 pt-0">
                          <p className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground md:text-sm">
                            <span>{durationLabel}</span>
                            {course.mentor?.name && (
                              <>
                                <span aria-hidden>•</span>
                                <span>Mentor: {course.mentor.name}</span>
                              </>
                            )}
                          </p>
                        </CardContent>

                        <CardFooter className="flex items-center justify-between gap-3 border-t bg-card/60 px-4 py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs md:text-sm"
                          >
                            Learn More →
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-full bg-gradient-to-r from-csl-primary to-csl-amber text-xs font-semibold text-white shadow-sm hover:from-csl-primary hover:to-csl-amber/90 md:text-sm"
                          >
                            Enrol Free
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/40 px-6 py-12 text-center md:px-10">
            <div className="mb-4 text-4xl" aria-hidden>
              📚
            </div>
            <h3 className="text-xl font-semibold text-csl-ink">
              Courses are being prepared
            </h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Our mentors are setting up new batches and learning circles. Check back soon to
              discover upcoming language programs at CSL.
            </p>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            href="/courses"
            className="text-sm font-medium text-csl-primary underline-offset-4 hover:text-csl-amber hover:underline"
          >
            See All Courses →
          </Link>
        </div>
      </div>
    </section>
  );
}

