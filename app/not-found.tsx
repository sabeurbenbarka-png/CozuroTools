'use client';

import Link from 'next/link';
import { Home, Zap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-2xl shadow-sky-500/30">
        <Zap className="h-10 w-10 text-white" strokeWidth={2} />
      </div>
      <h1 className="font-display text-6xl font-bold text-slate-900 dark:text-white mb-4">404</h1>
      <p className="text-xl text-slate-500 dark:text-slate-400 mb-2">Page not found</p>
      <p className="text-slate-400 dark:text-slate-500 mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/30 hover:opacity-90 transition-all"
      >
        <Home className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
