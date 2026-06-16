import type { Metadata } from 'next';
import MergePdfClient from './client';

export const metadata: Metadata = {
  title: 'Free PDF Merger — Combine Multiple PDF Files Online',
  description:
    'Merge multiple PDF files into one document, directly in your browser. Drag to reorder pages before merging. No uploads, no server, 100% private and free.',
  openGraph: {
    title: 'Free PDF Merger | Cozuro Tools',
    description: 'Combine multiple PDFs into one file in your browser. Reorder before merging. No upload required.',
    url: 'https://cozurotools.com/tools/merge-pdf',
  },
  twitter: {
    title: 'Free PDF Merger | Cozuro Tools',
    description: 'Merge PDF files in your browser. Free, private, instant. No upload needed.',
  },
  alternates: { canonical: 'https://cozurotools.com/tools/merge-pdf' },
};

export default function MergePdfPage() {
  return <MergePdfClient />;
}
