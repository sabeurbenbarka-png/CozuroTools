'use client';

import { FileDown, Shield, Zap, Info, Globe } from 'lucide-react';
import ToolPageWrapper from '@/components/ToolPageWrapper';
import PdfCompressorTool from '@/components/tools/PdfCompressorTool';
import { useI18n } from '@/i18n/context';

export default function PdfCompressorClient() {
  const { t } = useI18n();

  const steps = [
    {
      number: '1',
      title: t('pdf_comp_step1_title'),
      description: t('pdf_comp_step1_desc'),
    },
    {
      number: '2',
      title: t('pdf_comp_step2_title'),
      description: t('pdf_comp_step2_desc'),
    },
    {
      number: '3',
      title: t('pdf_comp_step3_title'),
      description: t('pdf_comp_step3_desc'),
    },
  ];

  const benefits = [
    {
      icon: <Shield className="h-5 w-5 text-white" />,
      title: t('pdf_comp_benefit1_title'),
      description: t('pdf_comp_benefit1_desc'),
    },
    {
      icon: <Zap className="h-5 w-5 text-white" />,
      title: t('pdf_comp_benefit2_title'),
      description: t('pdf_comp_benefit2_desc'),
    },
    {
      icon: <Info className="h-5 w-5 text-white" />,
      title: t('pdf_comp_benefit3_title'),
      description: t('pdf_comp_benefit3_desc'),
    },
    {
      icon: <Globe className="h-5 w-5 text-white" />,
      title: t('pdf_comp_benefit4_title'),
      description: t('pdf_comp_benefit4_desc'),
    },
  ];

  const faqs = [
    { question: t('pdf_comp_faq1_q'), answer: t('pdf_comp_faq1_a') },
    { question: t('pdf_comp_faq2_q'), answer: t('pdf_comp_faq2_a') },
    { question: t('pdf_comp_faq3_q'), answer: t('pdf_comp_faq3_a') },
    { question: t('pdf_comp_faq4_q'), answer: t('pdf_comp_faq4_a') },
    { question: t('pdf_comp_faq5_q'), answer: t('pdf_comp_faq5_a') },
  ];

  return (
    <ToolPageWrapper
      icon={<FileDown className="h-7 w-7 text-amber-600 dark:text-amber-400" strokeWidth={1.75} />}
      nameKey="tool_pdf_compressor_name"
      descKey="tool_pdf_compressor_long_desc"
      accentClass="bg-amber-100 dark:bg-amber-900/40"
      gradientClass="from-amber-500 to-orange-600"
      focusRingClass="ring-amber-500/20"
      steps={steps}
      benefits={benefits}
      faqs={faqs}
    >
      <PdfCompressorTool />
    </ToolPageWrapper>
  );
}
