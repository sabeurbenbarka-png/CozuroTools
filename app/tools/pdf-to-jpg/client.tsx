'use client';

import { Images, Shield, Zap, Package, Globe } from 'lucide-react';
import ToolPageWrapper from '@/components/ToolPageWrapper';
import PdfToJpgTool from '@/components/tools/PdfToJpgTool';
import { useI18n } from '@/i18n/context';

export default function PdfToJpgClient() {
  const { t } = useI18n();

  const steps = [
    {
      number: '1',
      title: t('pdf_to_jpg_step1_title'),
      description: t('pdf_to_jpg_step1_desc'),
    },
    {
      number: '2',
      title: t('pdf_to_jpg_step2_title'),
      description: t('pdf_to_jpg_step2_desc'),
    },
    {
      number: '3',
      title: t('pdf_to_jpg_step3_title'),
      description: t('pdf_to_jpg_step3_desc'),
    },
  ];

  const benefits = [
    {
      icon: <Shield className="h-5 w-5 text-white" />,
      title: t('pdf_to_jpg_benefit1_title'),
      description: t('pdf_to_jpg_benefit1_desc'),
    },
    {
      icon: <Zap className="h-5 w-5 text-white" />,
      title: t('pdf_to_jpg_benefit2_title'),
      description: t('pdf_to_jpg_benefit2_desc'),
    },
    {
      icon: <Package className="h-5 w-5 text-white" />,
      title: t('pdf_to_jpg_benefit3_title'),
      description: t('pdf_to_jpg_benefit3_desc'),
    },
    {
      icon: <Globe className="h-5 w-5 text-white" />,
      title: t('pdf_to_jpg_benefit4_title'),
      description: t('pdf_to_jpg_benefit4_desc'),
    },
  ];

  const faqs = [
    { question: t('pdf_to_jpg_faq1_q'), answer: t('pdf_to_jpg_faq1_a') },
    { question: t('pdf_to_jpg_faq2_q'), answer: t('pdf_to_jpg_faq2_a') },
    { question: t('pdf_to_jpg_faq3_q'), answer: t('pdf_to_jpg_faq3_a') },
    { question: t('pdf_to_jpg_faq4_q'), answer: t('pdf_to_jpg_faq4_a') },
    { question: t('pdf_to_jpg_faq5_q'), answer: t('pdf_to_jpg_faq5_a') },
  ];

  return (
    <ToolPageWrapper
      icon={<Images className="h-7 w-7 text-emerald-600 dark:text-emerald-400" strokeWidth={1.75} />}
      nameKey="tool_pdf_to_jpg_name"
      descKey="tool_pdf_to_jpg_long_desc"
      accentClass="bg-emerald-100 dark:bg-emerald-900/40"
      gradientClass="from-emerald-500 to-teal-600"
      focusRingClass="ring-emerald-500/20"
      steps={steps}
      benefits={benefits}
      faqs={faqs}
    >
      <PdfToJpgTool />
    </ToolPageWrapper>
  );
}
