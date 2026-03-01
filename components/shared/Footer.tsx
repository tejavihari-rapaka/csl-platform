import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="font-semibold">Center for Spoken Languages</h3>
            <p className="text-sm text-muted-foreground">
              A free non-profit community language learning center. Learn languages with volunteer mentors.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-medium">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#languages" className="hover:text-foreground">Languages</Link>
              </li>
              <li>
                <Link href="/#courses" className="hover:text-foreground">Courses</Link>
              </li>
              <li>
                <Link href="/#mentors" className="hover:text-foreground">Mentors</Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-foreground">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-medium">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#faq" className="hover:text-foreground">FAQ</Link>
              </li>
              <li>
                <Link href="/#volunteer" className="hover:text-foreground">Volunteer</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-medium">Contact</h4>
            <p className="text-sm text-muted-foreground">
              contact@csl-community.org
            </p>
          </div>
        </div>
        <Separator className="my-8" />
        <p className="text-center text-sm text-muted-foreground">
          © {currentYear} Center for Spoken Languages. All rights reserved. Non-profit community initiative.
        </p>
      </div>
    </footer>
  );
}
