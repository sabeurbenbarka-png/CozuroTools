'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Zap, Lock, ChevronDown } from 'lucide-react';
import { useI18n } from '@/i18n/context';
import ToolCard from '@/components/ToolCard';
import { siteConfig } from '@/config/site';

export default function HomePage() {
  const { t } = useI18n();

  const stats = [
    { value: t('hero_stat1'), sub: t('hero_stat1_sub'), icon: Zap },
    { value: t('hero_stat2'), sub: t('hero_stat2_sub'), icon: Shield },
    { value: t('hero_stat3'), sub: t('hero_stat3_sub'), icon: Lock },
  ];

  const privacyBadges = [
    t('home_privacy_badge_1'),
    t('home_privacy_badge_2'),
    t('home_privacy_badge_3'),
    t('home_privacy_badge_4'),
    t('home_privacy_badge_5'),
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 bg-grid">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -start-40 h-[600px] w-[600px] rounded-full bg-sky-400/10 dark:bg-sky-600/10 blur-3xl" />
          <div className="absolute -top-20 -end-20 h-[400px] w-[400px] rounded-full bg-violet-400/10 dark:bg-violet-600/10 blur-3xl" />
          <div className="absolute bottom-0 start-1/2 -translate-x-1/2 h-[300px] w-[800px] rounded-full bg-blue-400/10 dark:bg-blue-600/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50 dark:bg-sky-950/40 px-4 py-1.5 animate-fade-in">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse-soft" />
            <span className="text-xs font-semibold text-sky-700 dark:text-sky-300 uppercase tracking-wider">
              {t('hero_badge')}
            </span>
          </div>

          <h1 className="mb-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight animate-slide-up text-balance">
            {t('hero_title')}
            <br />
            <span className="bg-gradient-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent">
              {t('hero_title2')}
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-500 dark:text-slate-400 leading-relaxed animate-slide-up text-balance" style={{ animationDelay: '0.1s' }}>
            {t('hero_description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <Link
              href="#tools"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:opacity-90 transition-all duration-200"
            >
              {t('hero_cta')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {stats.map(({ value, sub, icon: Icon }) => (
              <div key={value} className="flex flex-col items-center py-5 px-4">
                <Icon className="mb-2 h-5 w-5 text-sky-500" />
                <span className="font-display text-base font-bold text-slate-900 dark:text-white">
                  {value}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">{sub}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center animate-bounce">
            <ChevronDown className="h-5 w-5 text-slate-300 dark:text-slate-700" />
          </div>
        </div>
      </section>

      <section id="tools" className="bg-slate-50 dark:bg-slate-900/50 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              {t('tools_title')}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              {t('tools_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            {t('home_privacy_title')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t('home_privacy_desc')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {privacyBadges.map((badge) => (
              <span key={badge} className="rounded-full border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                ✓ {badge}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}