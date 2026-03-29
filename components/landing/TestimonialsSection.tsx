import { prisma } from '@/lib/prisma';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';

export async function TestimonialsSection() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isApproved: true },
    take: 15, // Increased since infinite scroll looks better with more items
    orderBy: { createdAt: 'desc' },
  });

  if (testimonials.length === 0) return null;

  // Transform Prisma data to match Aceternity's expected format
  const formattedTestimonials = testimonials.map((t) => ({
    quote: t.content,
    name: t.studentName,
    title: `${t.language || 'Language Learner'} • ★ ${t.rating}/5`,
  }));

  return (
    <section className="py-20 md:py-28 overflow-hidden bg-slate-50">
      <div id="testimonials" className="container mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-csl-ink md:text-5xl">
          What Students Say
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Hear from our global community of language learners and see how CSL is bridging cultures.
        </p>
      </div>

      <div className="flex flex-col antialiased items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={formattedTestimonials}
          direction="right"
          speed="slow"
          pauseOnHover={true}
          className="mt-4"
        />
      </div>
    </section>
  );
}