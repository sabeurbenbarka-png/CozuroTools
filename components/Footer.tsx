'use client';

import Link from 'next/link';
import { Shield } from 'lucide-react';
import { useI18n } from '@/i18n/context';

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  const tools = [
    { href: '/tools/image-compressor', label: t('tool_compressor_name') },
    { href: '/tools/webp-converter', label: t('tool_webp_name') },
  ];

  const legal = [
    { href: '/legal/privacy-policy', label: t('nav_privacy') },
    { href: '/legal/terms', label: t('nav_terms') },
    { href: '/legal/disclaimer', label: t('nav_disclaimer') },
    { href: '/legal/impressum', label: t('nav_impressum') },
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <img 
                src="/logo.png" 
                alt="Cozuro Tools Logo" 
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
              />
              <span className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Cozuro<span className="text-sky-500">Tools</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              {t('footer_desc')}
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
              <Shield className="h-3.5 w-3.5 text-emerald-500" />
              <span>{t('footer_tagline')}</span>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
              {t('footer_tools')}
            </h3>
            <ul className="space-y-2.5">
              {tools.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
              {t('footer_legal')}
            </h3>
            <ul className="space-y-2.5">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            © {year} Cozuro Tools. {t('footer_rights')}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            GDPR Compliant · No file uploads · Client-side only
          </p>
        </div>
      </div>
    </footer>
  );
}