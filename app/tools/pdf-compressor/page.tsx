import type { Metadata } from 'next';
import PdfCompressorClient from './client';

export const metadata: Metadata = {
  title: 'Free PDF Compressor — Reduce PDF File Size Online',
  description:
    'Compress and optimize PDF files directly in your browser — no upload required. Reduce file size for easier sharing and storage while keeping your documents private.',
  openGraph: {
    title: 'Free PDF Compressor | Cozuro Tools',
    description: 'Reduce PDF file size locally in your browser. No uploads, no servers, fully private.',
    url: 'https://cozurotools.com/tools/pdf-compressor',
  },
  twitter: {
    title: 'Free PDF Compressor | Cozuro Tools',
    description: 'Compress PDF files in your browser. Free, private, no upload needed.',
  },
  alternates: { canonical: 'https://cozurotools.com/tools/pdf-compressor' },
};

export default function PdfCompressorPage() {
  return <PdfCompressorClient />;
}
