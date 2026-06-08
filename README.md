# 🚀 Cozuro Tools

**Production-ready SaaS file & image tools platform** — Next.js 14 · TypeScript · Tailwind CSS

> All processing happens 100% client-side. No file uploads. No backend. GDPR-compliant.

---

## ✅ Features

- 🖼️ **Image Compressor** — JPEG/PNG compression with quality control (Canvas API)
- 🔄 **WEBP Converter** — Convert between JPG, PNG, WEBP formats (Canvas API)
- 🌍 **i18n** — English, Arabic (RTL), French, German with auto-detection
- 🌙 **Dark mode** — System-aware with manual toggle
- 📱 **Fully responsive** — Mobile-first, works on all screen sizes
- 📄 **Legal pages** — Privacy Policy, Terms, Disclaimer, Impressum (GDPR-ready)
- 🗺️ **Sitemap + robots.txt** — Auto-generated for SEO
- 🔐 **Security headers** — X-Frame-Options, CSP, etc. via Vercel config
- ⚡ **Performance** — Code-split per route, lazy loading built-in

---

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

### Build for production

```bash
npm run build
# Output: /out/ folder (static export)
```

---

## 🚀 Deploy to Vercel (Recommended)

### Option A: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Option B: GitHub + Vercel Dashboard

1. Push project to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Framework: **Next.js** (auto-detected)
5. Click **Deploy**

> ⚠️ Remove `output: 'export'` from `next.config.js` if you want SSR on Vercel (recommended). Keep it for static export to Cloudflare Pages.

---

## 🌍 i18n — How It Works

### Architecture
- Translations live in `i18n/translations.ts` as typed constants
- `I18nProvider` in `i18n/context.tsx` wraps the whole app
- Language is auto-detected from browser `navigator.language`
- Selection is persisted to `localStorage` under key `cozuro_locale`
- RTL direction is applied to `document.documentElement.dir`

### Supported Locales
| Code | Language | RTL |
|------|----------|-----|
| `en` | English | ❌ |
| `ar` | Arabic | ✅ |
| `fr` | French | ❌ |
| `de` | German | ❌ |

### Adding a new language

1. Add the locale to `i18n/translations.ts`:
```ts
export const locales: Locale[] = ['en', 'ar', 'fr', 'de', 'es']; // add 'es'
export const localeNames: Record<Locale, string> = {
  // ... existing
  es: 'Español',
};
```

2. Add all translation keys to the `translations` object:
```ts
export const translations = {
  // ... existing
  es: {
    nav_home: 'Inicio',
    // ... all keys
  }
}
```

That's it — the language switcher and i18n system picks it up automatically.

---

## 🧩 Adding a New Tool

### Step 1: Create the tool component

```tsx
// components/tools/MyNewTool.tsx
'use client';
export default function MyNewTool() {
  return <div>...</div>;
}
```

### Step 2: Create the route pages

```
app/tools/my-new-tool/
  page.tsx    ← metadata + server component
  client.tsx  ← 'use client' wrapper with ToolLayout
```

```tsx
// page.tsx
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'My Tool | Cozuro Tools' };
export default function Page() { return <MyNewToolClient />; }

// client.tsx
'use client';
import ToolLayout from '@/components/ToolLayout';
import MyNewTool from '@/components/tools/MyNewTool';
export default function MyNewToolClient() {
  return (
    <ToolLayout nameKey="tool_mynew_name" descKey="tool_mynew_desc" ...>
      <MyNewTool />
    </ToolLayout>
  );
}
```

### Step 3: Register in config

```ts
// config/site.ts
tools: [
  // ...existing tools
  {
    id: 'my-new-tool',
    href: '/tools/my-new-tool',
    icon: 'SomeLucideIcon',
    color: 'from-green-500 to-emerald-600',
    // ...
  }
]
```

### Step 4: Add translations

Add `tool_mynew_name`, `tool_mynew_desc`, and any tool-specific keys to all locales in `i18n/translations.ts`.

Done — the tool card appears on the homepage automatically.

---

## 📄 Legal Pages

All legal pages are in `app/legal/`. Before going live, update `app/legal/impressum/client.tsx` with your real:
- Full name
- Street address
- Email address

The Impressum is legally required in Germany (§ 5 TMG).

---

## 🔧 Configuration

### Change domain/URL
Update all instances of `https://cozurotools.com` in:
- `app/layout.tsx` (metadataBase)
- `app/sitemap.ts`
- `app/robots.ts`
- `config/site.ts`

### Google AdSense
Add your AdSense script in `app/layout.tsx` inside `<head>`:
```tsx
<Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" strategy="lazyOnload" />
```

---

## 📁 Project Structure

```
cozuro-tools/
├── app/
│   ├── layout.tsx              ← Root layout (fonts, providers, SEO)
│   ├── page.tsx                ← Homepage (Hero + Tools grid)
│   ├── globals.css             ← Tailwind + global styles
│   ├── sitemap.ts              ← Auto sitemap.xml
│   ├── robots.ts               ← robots.txt
│   ├── not-found.tsx           ← 404 page
│   ├── tools/
│   │   ├── image-compressor/   ← Image compression tool
│   │   └── webp-converter/     ← Format conversion tool
│   └── legal/
│       ├── privacy-policy/
│       ├── terms/
│       ├── disclaimer/
│       └── impressum/
├── components/
│   ├── Navbar.tsx              ← Sticky nav with lang switcher
│   ├── Footer.tsx              ← Footer with legal links
│   ├── ToolCard.tsx            ← Homepage tool cards
│   ├── ToolLayout.tsx          ← Shared tool page wrapper
│   ├── FileDropzone.tsx        ← Shared drag-and-drop uploader
│   ├── LegalLayout.tsx         ← Shared legal page wrapper
│   └── tools/
│       ├── ImageCompressorTool.tsx
│       └── WebpConverterTool.tsx
├── i18n/
│   ├── translations.ts         ← All 4 language dictionaries
│   └── context.tsx             ← React context + locale detection
├── config/
│   └── site.ts                 ← Tool registry & site config
├── public/
│   └── favicon.svg
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json                 ← Security headers
```

---

## 🔒 Privacy & GDPR

- **Zero file uploads** — Canvas API processes everything locally
- **No personal data collection** — Only optional analytics
- **localStorage only** — For language preference
- **GDPR-compliant legal pages** — Privacy Policy mentions future AdSense
- **Security headers** — Set via `vercel.json`

---

## 📈 AdSense Readiness Checklist

- ✅ Clear, professional UI (SaaS-level quality)
- ✅ Privacy Policy with AdSense disclosure
- ✅ Terms of Service
- ✅ Disclaimer
- ✅ Impressum (Germany-compliant)
- ✅ No prohibited content
- ✅ No copyright violations
- ✅ Footer with legal links
- ✅ Sitemap for SEO
- ✅ Functional, useful free tools

---

Built with ❤️ — Production-ready from day one.
