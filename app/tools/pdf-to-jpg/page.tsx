import type { Metadata } from 'next';
import PdfToJpgClient from './client';

export const metadata: Metadata = {
  title: 'Free PDF to JPG Converter — Extract PDF Pages as Images',
  description:
    'Convert each page of a PDF into a high-quality JPG image, directly in your browser. No uploads required. Preview pages, download individually or as a ZIP archive.',
  openGraph: {
    title: 'Free PDF to JPG Converter | Cozuro Tools',
    description: 'Extract PDF pages as JPG images in your browser. Preview, download individually or as ZIP. No upload required.',
    url: 'https://cozurotools.com/tools/pdf-to-jpg',
  },
  twitter: {
    title: 'Free PDF to JPG Converter | Cozuro Tools',
    description: 'Convert PDF pages to JPG images in your browser. Free, private, no upload.',
  },
  alternates: { canonical: 'https://cozurotools.com/tools/pdf-to-jpg' },
};

export default function PdfToJpgPage() {
  return <PdfToJpgClient />;
}
