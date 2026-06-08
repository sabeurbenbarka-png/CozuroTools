'use client';

import { ImageDown } from 'lucide-react';
import ToolLayout from '@/components/ToolLayout';
import ImageCompressorTool from '@/components/tools/ImageCompressorTool';

export default function ImageCompressorClient() {
  return (
    <ToolLayout
      icon={<ImageDown className="h-6 w-6 text-sky-600 dark:text-sky-400" strokeWidth={1.75} />}
      nameKey="tool_compressor_name"
      descKey="tool_compressor_long_desc"
      accentClass="bg-sky-100 dark:bg-sky-900/40"
    >
      <ImageCompressorTool />
    </ToolLayout>
  );
}
