import type { Metadata } from 'next';
import JpgToPdfClient from './client';

export const metadata: Metadata = {
  title: 'Free JPG to PDF Converter — Combine Images into PDF Online',
  description:
    'Convert multiple JPG and PNG images into a single PDF file, free and directly in your browser. Drag to reorder pages. No uploads, no server, 100% private.',
  openGraph: {
    title: 'Free JPG to PDF Converter | Cozuro Tools',
    description: 'Combine multiple images into a PDF instantly in your browser. Reorder pages, no upload required.',
    url: 'https://cozurotools.com/tools/jpg-to-pdf',
  },
  twitter: {
    title: 'Free JPG to PDF Converter | Cozuro Tools',
    description: 'Convert JPG & PNG images to PDF in your browser. Free, private, instant.',
  },
  alternates: { canonical: 'https://cozurotools.com/tools/jpg-to-pdf' },
};

export default function JpgToPdfPage() {
  return <JpgToPdfClient />;
}
