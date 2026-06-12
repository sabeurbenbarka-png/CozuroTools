'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Zap, Lock } from 'lucide-react';
import { useI18n } from '@/i18n/context';
import ToolCard from '@/components/ToolCard';
import { siteConfig } from '@/config/site';
import { type TranslationKey } from '@/i18n/translations';

export default function HomePage() {
  const { t } = useI18n();

  const stats = [
    { key: 'hero_stat1', sub: 'hero_stat1_sub', icon: Zap },
    { key: 'hero_stat2', sub: 'hero_stat2_sub', icon: Shield },
    { key: 'hero_stat3', sub: 'hero_stat3_sub', icon: Lock },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 bg-grid">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50 dark:bg-sky-950/40 px-4 py-1.5">
            <span className="text-xs font-semibold text-sky-700 dark:text-sky-300 uppercase tracking-wider">
              {t('hero_badge' as TranslationKey)}
            </span>
          </div>
          <h1 className="mb-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            {t('hero_title' as TranslationKey)}
            <br />
            <span className="bg-gradient-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent">
              {t('hero_title2' as TranslationKey)}
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            {t('hero_description' as TranslationKey)}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#tools" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-xl">
              {t('hero_cta' as TranslationKey)}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            {stats.map(({ key, sub, icon: Icon }) => (
              <div key={key} className="flex flex-col items-center py-5 px-4">
                <Icon className="mb-2 h-5 w-5 text-sky-500" />
                <span className="font-display text-base font-bold text-slate-900 dark:text-white">{t(key as TranslationKey)}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500">{t(sub as TranslationKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tools" className="bg-slate-50 dark:bg-slate-900/50 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">{t('tools_title' as TranslationKey)}</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">{t('tools_subtitle' as TranslationKey)}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {siteConfig.tools.map((tool) => (
              <ToolCard key={tool.id} toolId={tool.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 mb-6">
            <Shield className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            {t('privacy_title' as TranslationKey)}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t('privacy_desc' as TranslationKey)}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { key: 'badge_uploads' },
              { key: 'badge_servers' },
              { key: 'badge_tracking' },
              { key: 'badge_gdpr' },
              { key: 'badge_free' }
            ].map((badge) => (
              <span key={badge.key} className="rounded-full border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                ✓ {t(badge.key as TranslationKey)}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}