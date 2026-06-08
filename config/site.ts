export const siteConfig = {
  name: 'Cozuro Tools',
  url: 'https://cozurotools.com',
  description:
    'Free browser-based image and file tools. Compress images, convert formats — everything runs locally, your files never leave your device.',
  twitterHandle: '@cozurotools',
  tools: [
    {
      id: 'image-compressor',
      href: '/tools/image-compressor',
      icon: 'ImageDown',
      color: 'from-sky-500 to-blue-600',
      bgLight: 'bg-sky-50',
      bgDark: 'dark:bg-sky-950/30',
      iconColor: 'text-sky-600 dark:text-sky-400',
    },
    {
      id: 'webp-converter',
      href: '/tools/webp-converter',
      icon: 'RefreshCw',
      color: 'from-violet-500 to-purple-600',
      bgLight: 'bg-violet-50',
      bgDark: 'dark:bg-violet-950/30',
      iconColor: 'text-violet-600 dark:text-violet-400',
    },
  ],
} as const;

export type ToolId = (typeof siteConfig.tools)[number]['id'];
