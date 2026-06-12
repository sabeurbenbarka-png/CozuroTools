'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Locale, locales, isRTL, t as translate, TranslationKey } from './translations';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem('cozuro_locale') as Locale | null;
  if (saved && locales.includes(saved)) return saved;
  const browser = navigator.language.split('-')[0] as Locale;
  if (locales.includes(browser)) return browser;
  return 'en';
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const detected = detectBrowserLocale();
    setLocaleState(detected);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const dir = isRTL(locale) ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
  }, [locale, mounted]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('cozuro_locale', newLocale);
  };

  const tFn = (key: TranslationKey) => translate(locale, key);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: tFn, isRTL: isRTL(locale) }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}