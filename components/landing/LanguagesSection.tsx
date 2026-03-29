import { prisma } from '@/lib/prisma';
import { Card, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const LANGUAGE_VISUALS: Record<string, { flag: string; native: string }> = {
  Hindi: { flag: '🇮🇳', native: 'हिन्दी' },
  Sanskrit: { flag: '🇮🇳', native: 'संस्कृतम्' },
  Kannada: { flag: '🇮🇳', native: 'ಕನ್ನಡ' },
  Telugu: { flag: '🇮🇳', native: 'తెలుగు' },
  Tamil: { flag: '🇮🇳', native: 'தமிழ்' },
  Mandarin: { flag: '🇨🇳', native: '普通话' }, 
  English: { flag: '🇬🇧', native: 'English' },
  French: { flag: '🇫🇷', native: 'Français' },
  German: { flag: '🇩🇪', native: 'Deutsch' },
  Japanese: { flag: '🇯🇵', native: '日本語' },
};

export async function LanguagesSection() {
  const languages = await prisma.language.findMany({
    orderBy: { name: 'asc' },
  });

  if (languages.length === 0) return null;

  return (
    <section id="languages" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight text-csl-ink md:text-4xl">Languages We Offer</h2>
        <p className="mt-2 text-base text-muted-foreground md:text-lg">
          Spoken language courses taught by community volunteers. Start your journey today.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {languages.map((lang) => (
            <Card
              key={lang.id}
              className="rounded-2xl border border-border/60 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(13,92,99,0.12)]"
            >
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="rounded-full">
                  {lang.code.toUpperCase()}
                </Badge>
                <span className="text-2xl" role="img" aria-hidden>
                  {LANGUAGE_VISUALS[lang.name]?.flag ?? '🌐'}
                </span>
              </div>
              <div className="mt-4 rounded-xl bg-muted/35 p-4">
                <p className="text-lg font-semibold text-csl-ink">
                  {LANGUAGE_VISUALS[lang.name]?.native ?? lang.name}
                </p>
                <p className="text-sm text-muted-foreground">{lang.name}</p>
              </div>
              {lang.description && (
                <CardDescription className="mt-4 text-sm leading-relaxed">
                  {lang.description}
                </CardDescription>
              )}
              {!lang.description && (
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Beginner-friendly spoken practice sessions with guided community support.
                </p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
