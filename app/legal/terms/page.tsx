import type { Metadata } from 'next';
import TermsClient from './client';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Cozuro Tools. Free browser-based image and file tools.',
  alternates: { canonical: 'https://cozurotools.com/legal/terms' },
};

export default function TermsPage() {
  return <TermsClient />;
}
