import type { Metadata } from 'next';
import DisclaimerClient from './client';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for Cozuro Tools. Our tools are provided as-is. We are not liable for file loss or processing errors.',
  alternates: { canonical: 'https://cozurotools.com/legal/disclaimer' },
};

export default function DisclaimerPage() {
  return <DisclaimerClient />;
}
