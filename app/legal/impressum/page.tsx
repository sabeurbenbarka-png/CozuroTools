import type { Metadata } from 'next';
import ImpressumClient from './client';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Legal notice (Impressum) for Cozuro Tools as required by German law (§ 5 TMG).',
  alternates: { canonical: 'https://cozurotools.com/legal/impressum' },
};

export default function ImpressumPage() {
  return <ImpressumClient />;
}
