import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';

/**
 * Public layout: wraps all public pages (landing, etc.) with shared Navbar and Footer.
 * Route group (public) keeps URLs clean - e.g. / not /public.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main
        id="main-content"
        className="flex-1 pt-16 scroll-mt-20"
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
