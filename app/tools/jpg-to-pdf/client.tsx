'use client';

import { FileImage, Shield, Zap, SortAsc, Globe } from 'lucide-react';
import ToolPageWrapper from '@/components/ToolPageWrapper';
import JpgToPdfTool from '@/components/tools/JpgToPdfTool';
import { useI18n } from '@/i18n/context';

export default function JpgToPdfClient() {
  const { t } = useI18n();

  const steps = [
    {
      number: '1',
      title: t('jpg_to_pdf_step1_title'),
      description: t('jpg_to_pdf_step1_desc'),
    },
    {
      number: '2',
      title: t('jpg_to_pdf_step2_title'),
      description: t('jpg_to_pdf_step2_desc'),
    },
    {
      number: '3',
      title: t('jpg_to_pdf_step3_title'),
      description: t('jpg_to_pdf_step3_desc'),
    },
  ];

  const benefits = [
    {
      icon: <Shield className="h-5 w-5 text-white" />,
      title: t('jpg_to_pdf_benefit1_title'),
      description: t('jpg_to_pdf_benefit1_desc'),
    },
    {
      icon: <Zap className="h-5 w-5 text-white" />,
      title: t('jpg_to_pdf_benefit2_title'),
      description: t('jpg_to_pdf_benefit2_desc'),
    },
    {
      icon: <SortAsc className="h-5 w-5 text-white" />,
      title: t('jpg_to_pdf_benefit3_title'),
      description: t('jpg_to_pdf_benefit3_desc'),
    },
    {
      icon: <Globe className="h-5 w-5 text-white" />,
      title: t('jpg_to_pdf_benefit4_title'),
      description: t('jpg_to_pdf_benefit4_desc'),
    },
  ];

  const faqs = [
    { question: t('jpg_to_pdf_faq1_q'), answer: t('jpg_to_pdf_faq1_a') },
    { question: t('jpg_to_pdf_faq2_q'), answer: t('jpg_to_pdf_faq2_a') },
    { question: t('jpg_to_pdf_faq3_q'), answer: t('jpg_to_pdf_faq3_a') },
    { question: t('jpg_to_pdf_faq4_q'), answer: t('jpg_to_pdf_faq4_a') },
    { question: t('jpg_to_pdf_faq5_q'), answer: t('jpg_to_pdf_faq5_a') },
  ];

  return (
    <ToolPageWrapper
      icon={<FileImage className="h-7 w-7 text-rose-600 dark:text-rose-400" strokeWidth={1.75} />}
      nameKey="tool_jpg_to_pdf_name"
      descKey="tool_jpg_to_pdf_long_desc"
      accentClass="bg-rose-100 dark:bg-rose-900/40"
      gradientClass="from-rose-500 to-pink-600"
      focusRingClass="ring-rose-500/20"
      steps={steps}
      benefits={benefits}
      faqs={faqs}
    >
      <JpgToPdfTool />
    </ToolPageWrapper>
  );
}
