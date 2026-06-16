'use client';

import Link from 'next/link';
import { 
  ImageDown, 
  RefreshCw, 
  FileImage, 
  FileDown, 
  Images, 
  Combine,
  ArrowRight, 
  Zap, 
  Lock, 
  Gift 
} from 'lucide-react';
import { useI18n } from '@/i18n/context';
import { siteConfig } from '@/config/site';
import type { TranslationKey } from '@/i18n/translations';

const iconMap = {
  ImageDown,
  RefreshCw,
  FileImage,
  FileDown,
  Images,
  Combine,
};

export default function ToolCard({ toolId }: { toolId: string }) {
  const { t } = useI18n();
  const tool = siteConfig.tools.find((t) => t.id === toolId);
  if (!tool) return null;

  const Icon = iconMap[tool.icon as keyof typeof iconMap];
  if (!Icon) return null;

  const nameKeyMap: Record<string, TranslationKey> = {
    'image-compressor': 'tool_compressor_name',
    'webp-converter': 'tool_webp_name',
    'jpg-to-pdf': 'tool_jpg_to_pdf_name',
    'pdf-compressor': 'tool_pdf_compressor_name',
    'pdf-to-jpg': 'tool_pdf_to_jpg_name',
    'merge-pdf': 'tool_merge_pdf_name',
  };

  const descKeyMap: Record<string, TranslationKey> = {
    'image-compressor': 'tool_compressor_desc',
    'webp-converter': 'tool_webp_desc',
    'jpg-to-pdf': 'tool_jpg_to_pdf_desc',
    'pdf-compressor': 'tool_pdf_compressor_desc',
    'pdf-to-jpg': 'tool_pdf_to_jpg_desc',
    'merge-pdf': 'tool_merge_pdf_desc',
  };

  const nameKey = nameKeyMap[toolId] as TranslationKey;
  const descKey = descKeyMap[toolId] as TranslationKey;

  const badges = [
    { icon: Gift, label: t('tool_free') },
    { icon: Zap, label: t('tool_fast') },
    { icon: Lock, label: t('tool_private') },
  ];

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-lg hover:shadow-slate-900/5 dark:hover:shadow-slate-900/30 transition-all duration-300 hover:-translate-y-0.5">
      <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${tool.bgLight} ${tool.bgDark}`}>
        <Icon className={`h-6 w-6 ${tool.iconColor}`} strokeWidth={1.75} />
      </div>

      <h3 className="mb-2 font-display text-lg font-semibold text-slate-900 dark:text-white">
        {t(nameKey)}
      </h3>
      <p className="mb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
        {t(descKey)}
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {badges.map(({ icon: BadgeIcon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-700 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            <BadgeIcon className="h-3 w-3" />
            {label}
          </span>
        ))}
      </div>

      <Link
        href={tool.href}
        className={`inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${tool.color} px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-200`}
      >
        {t('tool_try')}
        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}