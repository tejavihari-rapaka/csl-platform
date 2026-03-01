import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden py-24 md:py-32">
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Learn Languages{' '}
            <span className="text-primary">Together</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Center for Spoken Languages (CSL) is a free non-profit community where you learn
            Tamil, Hindi, English, French, Mandarin and more with volunteer mentors. No fees, just
            passion for languages.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/#courses">Browse Courses</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/#contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
