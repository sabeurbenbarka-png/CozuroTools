'use client';

import { Combine, Shield, Zap, SortAsc, Globe } from 'lucide-react';
import ToolPageWrapper from '@/components/ToolPageWrapper';
import MergePdfTool from '@/components/tools/MergePdfTool';
import { useI18n } from '@/i18n/context';

export default function MergePdfClient() {
  const { t } = useI18n();

  const steps = [
    {
      number: '1',
      title: t('merge_pdf_step1_title'),
      description: t('merge_pdf_step1_desc'),
    },
    {
      number: '2',
      title: t('merge_pdf_step2_title'),
      description: t('merge_pdf_step2_desc'),
    },
    {
      number: '3',
      title: t('merge_pdf_step3_title'),
      description: t('merge_pdf_step3_desc'),
    },
  ];

  const benefits = [
    {
      icon: <Shield className="h-5 w-5 text-white" />,
      title: t('merge_pdf_benefit1_title'),
      description: t('merge_pdf_benefit1_desc'),
    },
    {
      icon: <Zap className="h-5 w-5 text-white" />,
      title: t('merge_pdf_benefit2_title'),
      description: t('merge_pdf_benefit2_desc'),
    },
    {
      icon: <SortAsc className="h-5 w-5 text-white" />,
      title: t('merge_pdf_benefit3_title'),
      description: t('merge_pdf_benefit3_desc'),
    },
    {
      icon: <Globe className="h-5 w-5 text-white" />,
      title: t('merge_pdf_benefit4_title'),
      description: t('merge_pdf_benefit4_desc'),
    },
  ];

  const faqs = [
    { question: t('merge_pdf_faq1_q'), answer: t('merge_pdf_faq1_a') },
    { question: t('merge_pdf_faq2_q'), answer: t('merge_pdf_faq2_a') },
    { question: t('merge_pdf_faq3_q'), answer: t('merge_pdf_faq3_a') },
    { question: t('merge_pdf_faq4_q'), answer: t('merge_pdf_faq4_a') },
    { question: t('merge_pdf_faq5_q'), answer: t('merge_pdf_faq5_a') },
  ];

  return (
    <ToolPageWrapper
      icon={<Combine className="h-7 w-7 text-indigo-600 dark:text-indigo-400" strokeWidth={1.75} />}
      nameKey="tool_merge_pdf_name"
      descKey="tool_merge_pdf_long_desc"
      accentClass="bg-indigo-100 dark:bg-indigo-900/40"
      gradientClass="from-indigo-500 to-blue-700"
      focusRingClass="ring-indigo-500/20"
      steps={steps}
      benefits={benefits}
      faqs={faqs}
    >
      <MergePdfTool />
    </ToolPageWrapper>
  );
}
