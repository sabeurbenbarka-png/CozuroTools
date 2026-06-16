'use client';

import Link from 'next/link';
import { ArrowLeft, Lock, Zap, Gift, ChevronDown } from 'lucide-react';
import { useI18n } from '@/i18n/context';
import type { TranslationKey } from '@/i18n/translations';
import { useState } from 'react';

interface Step {
  number: string;
  title: string;
  description: string;
}

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ToolPageWrapperProps {
  icon: React.ReactNode;
  nameKey: TranslationKey;
  descKey: TranslationKey;
  accentClass: string;
  gradientClass: string;
  focusRingClass: string;
  children: React.ReactNode;
  steps: Step[];
  benefits: Benefit[];
  faqs: FAQ[];
}

function FAQItem({ question, answer }: FAQ) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-start hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
          {question}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4 animate-fade-in">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function ToolPageWrapper({
  icon,
  nameKey,
  descKey,
  accentClass,
  gradientClass: _gradientClass, // reserved for future use — suppresses unused-var warning
  focusRingClass,
  children,
  steps,
  benefits,
  faqs,
}: ToolPageWrapperProps) {
  const { t } = useI18n();

  return (
    <div className="bg-slate-50 dark:bg-slate-900/40">
      {/* ── TOOL HERO ── */}
      <div className={`relative overflow-hidden bg-white dark:bg-slate-950`}>
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className={`absolute -top-32 -start-32 h-[400px] w-[400px] rounded-full ${accentClass} opacity-10 blur-3xl`} />
          <div className={`absolute -top-16 -end-16 h-[300px] w-[300px] rounded-full ${accentClass} opacity-10 blur-3xl`} />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-10 md:py-12">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('nav_home')}
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            <div className={`flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl ${accentClass}`}>
              {icon}
            </div>
            <div className="flex-1">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {t(nameKey)}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                {t(descKey)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { icon: Gift, label: t('tool_free') },
                  { icon: Zap, label: t('tool_fast') },
                  { icon: Lock, label: t('tool_private') },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                    <Icon className="h-3 w-3" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TOOL INTERFACE ── */}
      <div className="py-8 md:py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm focus-within:ring-2 ${focusRingClass}`}>
            {children}
          </div>
          <p className="mt-3 text-center text-xs text-slate-400 dark:text-slate-500">
            🔒 All processing happens locally in your browser. Your files never leave your device.
          </p>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div className="py-16 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">
            {t('how_it_works')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative text-center">
                <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${accentClass} text-white font-display font-bold text-lg`}>
                  {step.number}
                </div>
                {/* connector line */}
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BENEFITS ── */}
      <div className="py-16 bg-slate-50 dark:bg-slate-900/40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">
            {t('benefits_title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <div className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-xl ${accentClass}`}>
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{benefit.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="py-16 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">
            {t('faq_title')}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} {...faq} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
