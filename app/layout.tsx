import type { Metadata } from 'next';
import { DM_Sans, DM_Mono, Sora } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { I18nProvider } from '@/i18n/context';
import { Analytics } from '@vercel/analytics/next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const body = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const display = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
});

const mono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cozuro-tools.vercel.app'),
  title: {
    default: 'Cozuro Tools — Free Browser-Based File & Image Tools',
    template: '%s | Cozuro Tools',
  },
  description:
    'Free browser-based image and file tools. Compress images, convert formats — everything runs locally, your files never leave your device.',
  keywords: [
    'image compressor',
    'webp converter',
    'compress images online',
    'free image tools',
    'browser tools',
    'no upload required',
    'privacy first tools',
    'jpg to webp',
    'png to webp',
    'image optimizer',
  ],
  verification: {
    google: 'jQcyz_vu95qA-eW-jornb3amVn5VNh8HD_GAyc7R3pI',
  },
  authors: [{ name: 'Cozuro Tools' }],
  creator: 'Cozuro Tools',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cozuro-tools.vercel.app',
    siteName: 'Cozuro Tools',
    title: 'Cozuro Tools — Free Browser-Based File & Image Tools',
    description:
      'Compress images, convert formats — everything runs locally in your browser. Your files never leave your device.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cozuro Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cozuro Tools — Free Browser-Based File & Image Tools',
    description: 'Free browser tools for image compression and format conversion. 100% client-side, zero uploads.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="canonical" href="https://cozurotools.com" />
      </head>
      <body className={`${body.variable} ${display.variable} ${mono.variable} slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <I18nProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <Analytics />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}