'use client';

import { useI18n } from '@/i18n/context';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  const { t } = useI18n();

  return (
    <div className="bg-white dark:bg-slate-950 py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            {title}
          </h1>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            {t('legal_last_updated')}: {lastUpdated}
          </p>
        </header>
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-semibold prose-a:text-sky-600 dark:prose-a:text-sky-400 prose-strong:text-slate-800 dark:prose-strong:text-slate-200">
          {children}
        </div>
      </div>
    </div>
  );
}
