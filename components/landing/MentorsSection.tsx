'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Star, Users } from 'lucide-react';

type Mentor = {
  id: string;
  name: string;
  bio: string | null;
  photoUrl: string | null;
  languages: string[];
  rating: number | null;
  _count?: { courses: number };
};

type MentorsSectionProps = {
  mentors: Mentor[];
};

const LANGUAGE_RING_COLORS: Record<string, string> = {
  ta: 'ring-csl-primary',
  hi: 'ring-csl-amber',
  en: 'ring-csl-terracotta',
  fr: 'ring-csl-primary',
  zh: 'ring-csl-amber',
  es: 'ring-csl-terracotta',
};

function getRingColor(codes: string[]) {
  const code = (codes[0] ?? 'en').toLowerCase();
  return LANGUAGE_RING_COLORS[code] ?? 'ring-csl-primary';
}

function StarRating({ rating }: { rating: number }) {
  const filled = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            i <= filled ? 'fill-csl-amber text-csl-amber' : 'fill-transparent text-muted-foreground/40'
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}

function MentorCard({
  mentor,
  isExpanded,
  onHover,
}: {
  mentor: Mentor;
  isExpanded: boolean;
  onHover: (expand: boolean) => void;
}) {
  const ringColor = getRingColor(mentor.languages);
  const rating = mentor.rating ?? 0;
  const studentsLabel =
    mentor._count && mentor._count.courses >= 2
      ? '10+ Students Taught'
      : '5+ Students Taught';

  return (
    <Card
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/80 shadow-sm transition-all duration-200 ease-out',
        'hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(13,92,99,0.12)]',
        'md:snap-center md:snap-always'
      )}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <CardHeader className="flex flex-col items-center pb-3 pt-8">
        <div
          className={cn(
            'rounded-full p-1 transition-shadow duration-200',
            ringColor,
            'ring-2',
            'group-hover:ring-4 group-hover:shadow-[0_0_20px_rgba(13,92,99,0.2)]'
          )}
        >
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-background">
            {mentor.photoUrl ? (
              <Image
                src={mentor.photoUrl}
                alt={mentor.name}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            ) : (
              <Avatar className="h-full w-full">
                <AvatarFallback className="bg-csl-primary/10 text-lg font-semibold text-csl-primary">
                  {mentor.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
        <h3 className="mt-4 font-sans text-lg font-bold text-csl-ink">{mentor.name}</h3>
        <p className="text-sm text-muted-foreground">Language Mentor</p>
        <div className="mt-2">
          <StarRating rating={rating} />
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 px-6 pb-4">
        <div className="flex flex-wrap justify-center gap-1.5">
          {mentor.languages.map((code) => (
            <Badge
              key={code}
              variant="secondary"
              className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            >
              {code.toUpperCase()}
            </Badge>
          ))}
        </div>

        {mentor.bio && (
          <div className="overflow-hidden">
            <p
              className={cn(
                'text-center text-sm text-muted-foreground transition-all duration-300 ease-out',
                isExpanded ? 'max-h-[200px]' : 'max-h-[2.625rem] line-clamp-2'
              )}
            >
              {mentor.bio}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t bg-muted/30 px-6 py-3">
        <div className="flex w-full items-center justify-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4 shrink-0" aria-hidden />
          <span>{studentsLabel}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export function MentorsSection({ mentors }: MentorsSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleHover = (id: string) => (expand: boolean) => {
    setExpandedId(expand ? id : null);
  };

  return (
    <section id="mentors" className="py-16 md:py-24">
      <div className="container">
        <span className="text-xs font-semibold uppercase tracking-widest text-csl-primary">
          Meet the Team
        </span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Volunteer Mentors Who Make It Happen
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Every mentor at CSL teaches out of passion, not profit. Learn from the best in your
          community.
        </p>

        {mentors.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="w-full">
                <MentorCard
                  mentor={mentor}
                  isExpanded={expandedId === mentor.id}
                  onHover={handleHover(mentor.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/40 px-6 py-12 text-center md:px-10">
            <div className="mb-4 text-4xl" aria-hidden>
              👋
            </div>
            <h3 className="text-xl font-semibold text-csl-ink">Mentors are joining soon</h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Our volunteer mentor team is growing. Check back soon to meet the language experts
              who will guide your learning journey.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
