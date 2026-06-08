'use client';

import { useI18n } from '@/i18n/context';
import LegalLayout from '@/components/LegalLayout';
import { useEffect, useState } from 'react';

export default function PrivacyClient() {
  const { locale } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // انتظر حتى يكتمل تحميل الصفحة لتجنب خطأ الـ Hydration
  if (!mounted) return null;

  return (
    <LegalLayout 
        title={locale === 'de' ? "Datenschutzerklärung" : locale === 'ar' ? "سياسة الخصوصية" : "Privacy Policy"} 
        lastUpdated="08.06.2026"
    >
      <div className="space-y-8">
        {/* القسم 1 */}
        <div>
          <h2 className="text-xl font-bold mb-2">1. {locale === 'de' ? "Einleitung" : locale === 'ar' ? "مقدمة" : "Introduction"}</h2>
          <p>
            {locale === 'de' ? "Willkommen bei Cozuro Tools. Wir setzen uns für Ihre Privatsphäre ein. Diese Datenschutzerklärung erklärt, wie wir mit Informationen umgehen, wenn Sie unsere Website nutzen." : 
             locale === 'ar' ? "مرحباً بكم في Cozuro Tools. نحن ملتزمون بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية تعاملنا مع المعلومات عند استخدامك لموقعنا." : 
             "Welcome to Cozuro Tools. We are committed to your privacy. This privacy policy explains how we handle information when you use our website."}
          </p>
        </div>

        {/* القسم 2 */}
        <div>
          <h2 className="text-xl font-bold mb-2">2. {locale === 'de' ? "Daten, die wir nicht sammeln" : locale === 'ar' ? "بيانات لا نقوم بجمعها" : "Data we do not collect"}</h2>
          <p>
            {locale === 'de' ? "Cozuro Tools verarbeitet alle Dateien vollständig in Ihrem Browser. Ihre Bilder und Dokumente verlassen Ihr Gerät niemals. Wir sammeln keine Dateien, persönlichen Identifikationsdaten oder E-Mail-Adressen." : 
             locale === 'ar' ? "تقوم Cozuro Tools بمعالجة جميع الملفات بالكامل داخل متصفحك. صورك ومستنداتك لا تغادر جهازك أبداً. نحن لا نجمع أي ملفات، أو بيانات تعريف شخصية، أو عناوين بريد إلكتروني." : 
             "Cozuro Tools processes all files entirely in your browser. Your images and documents never leave your device. We do not collect any files, personal identification data, or email addresses."}
          </p>
        </div>

        {/* القسم 3 */}
        <div>
          <h2 className="text-xl font-bold mb-2">3. {locale === 'de' ? "Verantwortliche Stelle" : locale === 'ar' ? "المسؤول عن معالجة البيانات" : "Responsible Party"}</h2>
          <p>
            <strong>Sabeur Ben Barka</strong><br />
            Finkensiefstraße 35<br />
            52223 Stolberg, Deutschland<br />
            E-Mail: Sabeurbenbarka@gmail.com
          </p>
        </div>

        {/* القسم 4 (القانوني المضاف) */}
        <div>
          <h2 className="text-xl font-bold mb-2">4. {locale === 'de' ? "Server-Logfiles" : locale === 'ar' ? "سجلات خادم الموقع" : "Server Log Files"}</h2>
          <p>
            {locale === 'de' ? "Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Logfiles, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp, Betriebssystem, Referrer URL, Hostname, Uhrzeit der Serveranfrage und IP-Adresse. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen." : 
             locale === 'ar' ? "يقوم مزود خدمة الاستضافة بجمع وتخزين المعلومات تلقائياً في ما يسمى بسجلات الخادم، والتي ينقلها متصفحك إلينا تلقائياً. تتضمن هذه البيانات: نوع المتصفح، نظام التشغيل، عنوان URL المحيل، اسم المضيف، وقت طلب الخادم، وعنوان IP. لا يتم دمج هذه البيانات مع مصادر بيانات أخرى." : 
             "The hosting provider automatically collects and stores information in server log files, which your browser transmits to us. This includes: browser type, operating system, referrer URL, host name, time of the server request, and IP address. These data are not merged with other data sources."}
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}