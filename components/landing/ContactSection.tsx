'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container">
        <h2 className="mt-2 text-3xl font-display font-bold tracking-tight text-csl-ink md:text-4xl">Get in Touch</h2>
        <p className="mt-2 text-muted-foreground">
          Questions about our courses? Want to volunteer as a mentor? Reach out.
        </p>
        <div className="mx-auto mt-10 max-w-md">
          {submitted ? (
            <p className="rounded-lg border bg-muted p-4 text-center text-sm text-muted-foreground">
              Thanks! We&apos;ll get back to you soon. (Demo: form submission not wired to backend.)
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="name" placeholder="Your name" required />
              <Input name="email" type="email" placeholder="Email" required />
              <Textarea name="message" placeholder="Message" rows={4} required />
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
