import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { Card, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const LANGUAGE_VISUALS: Record<string, { 
  native: string; 
  flagCode: string;
}> = {
  English:  { native: 'English',      flagCode: 'gb' },
  French:   { native: 'Français',     flagCode: 'fr' },
  German:   { native: 'Deutsch',      flagCode: 'de' },
  Hindi:    { native: 'हिन्दी',        flagCode: 'in' },
  Japanese: { native: '日本語',         flagCode: 'jp' },
  Kannada:  { native: 'ಕನ್ನಡ',         flagCode: 'in' },
  Sanskrit: { native: 'संस्कृतम्',      flagCode: 'in' },
  Telugu:   { native: 'తెలుగు',        flagCode: 'in' },
  Tamil:    { native: 'தமிழ்',         flagCode: 'in' },
  Mandarin: { native: '普通话',         flagCode: 'cn' },
};

export async function LanguagesSection() {
  const languages = await prisma.language.findMany({
    orderBy: { name: 'asc' },
  });

  if (languages.length === 0) return null;

  return (
    <section id="languages" className="py-16 md:py-24">
      <div className="container">
        <p className="text-xs font-semibold uppercase 
          tracking-widest text-csl-primary mb-2">
          Available Languages
        </p>
        <h2 className="mt-2 text-3xl font-display 
          font-bold tracking-tight text-csl-ink 
          md:text-4xl">
          Languages We Offer
        </h2>
        <p className="mt-2 text-base text-muted-foreground 
          md:text-lg leading-relaxed">
          Spoken language courses taught by community 
          volunteers. Start your journey today.
        </p>
        <div className="mt-10 grid gap-5 
          sm:grid-cols-2 lg:grid-cols-4">
          {languages.map((lang) => {
            const visual = LANGUAGE_VISUALS[lang.name];
            const flagCode = visual?.flagCode ?? 'un';
            const native = visual?.native ?? lang.name;

            return (
              <Card
                key={lang.id}
                className="rounded-2xl border border-border/60 
                  bg-white p-5 text-center shadow-sm 
                  transition-all hover:-translate-y-0.5 
                  hover:shadow-[0_14px_30px_rgba(13,92,99,0.12)]"
              >
                <div className="flex items-center 
                  justify-between">
                  <Badge variant="secondary" 
                    className="rounded-full">
                    {lang.code.toUpperCase()}
                  </Badge>
                  {/* Flag image — works on all OS */}
                  <div className="h-6 w-9 overflow-hidden 
                    rounded-sm shadow-sm">
                    <Image
                      src={`https://flagcdn.com/w40/${flagCode}.png`}
                      alt={`${lang.name} flag`}
                      width={40}
                      height={30}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="mt-4 rounded-xl 
                  bg-muted/35 p-4">
                  <p className="text-lg font-semibold 
                    text-csl-ink">
                    {native}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {lang.name}
                  </p>
                </div>
                {lang.description ? (
                  <CardDescription className="mt-4 
                    text-sm leading-relaxed text-justify">
                    {lang.description}
                  </CardDescription>
                ) : (
                  <p className="mt-4 text-sm leading-relaxed 
                    text-muted-foreground text-justify">
                    Beginner-friendly spoken practice sessions 
                    with guided community support.
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}