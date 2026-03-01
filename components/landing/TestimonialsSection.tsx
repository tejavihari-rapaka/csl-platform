import { prisma } from '@/lib/prisma';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export async function TestimonialsSection() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isApproved: true },
    take: 6,
    orderBy: { createdAt: 'desc' },
  });

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What Students Say</h2>
        <p className="mt-2 text-muted-foreground">
          Hear from our community of language learners.
        </p>
        <div className="mt-10">
          <Carousel opts={{ align: 'start', loop: true }} className="mx-auto max-w-4xl">
            <CarouselContent>
              {testimonials.map((t) => (
                <CarouselItem key={t.id}>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={t.avatarUrl ?? undefined} />
                          <AvatarFallback>{t.studentName.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">"{t.content}"</p>
                          <p className="mt-2 font-medium">{t.studentName}</p>
                          <p className="text-sm text-muted-foreground">
                            {t.language && `${t.language} • `}★ {t.rating}/5
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
