import type { Metadata } from 'next';
import PrivacyClient from './client';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Cozuro Tools. Learn how we handle your data — spoiler: we don\'t collect any. All processing is client-side.',
  alternates: { canonical: 'https://cozurotools.com/legal/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return <PrivacyClient />;
}
