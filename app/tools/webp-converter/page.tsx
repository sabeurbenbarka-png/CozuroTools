import type { Metadata } from 'next';
import WebpConverterClient from './client';

export const metadata: Metadata = {
  title: 'Free WEBP Converter — Convert JPG, PNG & WEBP Online',
  description:
    'Convert between JPG, PNG, and WEBP image formats for free, directly in your browser. No uploads required. Fast, private, and completely client-side.',
  openGraph: {
    title: 'Free WEBP Converter | Cozuro Tools',
    description: 'Convert image formats instantly in your browser. JPG to WEBP, PNG to WEBP, and more. No uploads.',
    url: 'https://cozurotools.com/tools/webp-converter',
  },
  twitter: {
    title: 'Free WEBP Converter | Cozuro Tools',
    description: 'Convert JPG, PNG, WEBP formats instantly in your browser. 100% private.',
  },
  alternates: {
    canonical: 'https://cozurotools.com/tools/webp-converter',
  },
};

export default function WebpConverterPage() {
  return <WebpConverterClient />;
}
