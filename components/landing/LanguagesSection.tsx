import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export async function LanguagesSection() {
  const languages = await prisma.language.findMany({
    orderBy: { name: 'asc' },
  });

  if (languages.length === 0) return null;

  return (
    <section id="languages" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Languages We Offer</h2>
        <p className="mt-2 text-muted-foreground">
          Spoken language courses taught by community volunteers. Start your journey today.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {languages.map((lang) => (
            <Card key={lang.id} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{lang.name}</CardTitle>
                  <Badge variant="secondary">{lang.code.toUpperCase()}</Badge>
                </div>
                {lang.description && (
                  <CardDescription>{lang.description}</CardDescription>
                )}
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
