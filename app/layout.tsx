import type { Metadata } from 'next';
import {
  DM_Sans,
  JetBrains_Mono,
  Playfair_Display,
} from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'Center for Spoken Languages (CSL)',
    template: '%s | CSL',
  },
  description:
    'The Center for Spoken Languages (CSL) is a free, community-led language learning space in India. Learn and practice languages with volunteer mentors in a warm, inclusive environment.',
  keywords: [
    'CSL',
    'Center for Spoken Languages',
    'language learning India',
    'spoken English',
    'spoken Hindi',
    'Tamil',
    'community center',
    'free classes',
  ],
  authors: [{ name: 'Center for Spoken Languages' }],
  openGraph: {
    title: 'Center for Spoken Languages (CSL)',
    description:
      'A free, community-centered space in India to learn and practice languages with supportive mentors.',
    url: 'https://csl.community',
    siteName: 'Center for Spoken Languages',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Center for Spoken Languages (CSL)',
    description:
      'Free, community-centered language learning in India for students, families, and working professionals.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-csl-cream text-csl-ink antialiased">
        {children}
      </body>
    </html>
  );
}
