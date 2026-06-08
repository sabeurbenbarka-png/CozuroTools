import type { Metadata } from 'next';
import ImageCompressorClient from './client';

export const metadata: Metadata = {
  title: 'Free Image Compressor — Compress JPG & PNG Online',
  description:
    'Compress JPEG and PNG images for free, directly in your browser. No uploads, no server — your files stay 100% private. Reduce file size without losing visible quality.',
  openGraph: {
    title: 'Free Image Compressor | Cozuro Tools',
    description: 'Compress images locally in your browser. No uploads. No data collection. Instant results.',
    url: 'https://cozurotools.com/tools/image-compressor',
  },
  twitter: {
    title: 'Free Image Compressor | Cozuro Tools',
    description: 'Compress images instantly in your browser. 100% private — no uploads.',
  },
  alternates: {
    canonical: 'https://cozurotools.com/tools/image-compressor',
  },
};

export default function ImageCompressorPage() {
  return <ImageCompressorClient />;
}
