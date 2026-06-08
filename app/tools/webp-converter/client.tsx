'use client';

import { RefreshCw } from 'lucide-react';
import ToolLayout from '@/components/ToolLayout';
import WebpConverterTool from '@/components/tools/WebpConverterTool';

export default function WebpConverterClient() {
  return (
    <ToolLayout
      icon={<RefreshCw className="h-6 w-6 text-violet-600 dark:text-violet-400" strokeWidth={1.75} />}
      nameKey="tool_webp_name"
      descKey="tool_webp_long_desc"
      accentClass="bg-violet-100 dark:bg-violet-900/40"
    >
      <WebpConverterTool />
    </ToolLayout>
  );
}
