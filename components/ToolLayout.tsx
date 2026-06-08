'use client';

import React, { useEffect, useState } from 'react';
import { useI18n } from '@/i18n/context';

interface ToolLayoutProps {
  icon: React.ReactNode;
  nameKey: string;
  descKey: string;
  accentClass: string;
  children: React.ReactNode;
}

export default function ToolLayout({
  children,
}: ToolLayoutProps) {
  const { locale } = useI18n();
  const [currentPath, setCurrentPath] = useState('');

  // جلب الرابط الحالي للمتصفح بأمان بعد تحميل الصفحة
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  // فحص الأداة بناءً على الرابط المفتوح في المتصفح
  const isWebpTool = currentPath.includes('webp-converter');
  const isCompressorTool = currentPath.includes('image-compressor');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* محتوى الأداة الأصلي (صندوق الرفع والملفات) */}
        <main>{children}</main>

        {/* ======================================================== */}
        {/* 1. قسم النصوص الخاص بأداة محول الـ WEBP فقط */}
        {/* ======================================================== */}
        {isWebpTool && (
          <>
            {locale === 'ar' && (
              <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-10 text-slate-700 dark:text-slate-300 text-right" dir="rtl">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">لماذا يجب عليك استخدام محول WEBP المجاني الخاص بنا؟</h2>
                <p className="mb-8 leading-relaxed text-base">أصبح تنسيق WEBP، الذي طورته شركة Google، ضرورياً لشبكة الويب الحديثة. فهو يوفر ضغطاً فائقاً يقلل بشكل كبير من حجم الصور (JPG أو PNG) مع الحفاظ على جودة بصرية استثنائية. باستخدام أداة التحويل عبر الإنترنت، يمكنك تسريع وقت تحميل موقع الويب الخاص بك، مما يحسن بشكل كبير من أداء الـ SEO وتجربة المستخدمين. على عكس المحولات الأخرى عبر الإنترنت، يقوم Cozuro Tools بمعالجة ملفاتك مباشرة في متصفحك. لا يتم رفع أي صورة إلى خادم خارجي. تظل بياناتك خاصة وآمنة تماماً على جهازك الخاص، مما يضمن السرية المطلقة وسرعة التنفيذ الفورية.</p>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">كيفية تحويل صورك إلى WEBP؟</h3>
                  <ul className="space-y-3 list-decimal list-inside pr-1">
                    <li className="leading-relaxed">قم بسحب وإسقاط ملفات JPG أو PNG أو WEBP في المنطقة المخصصة أعلاه.</li>
                    <li className="leading-relaxed">تبدأ عملية التحويل تلقائياً في لحظات.</li>
                    <li className="leading-relaxed">قم بتنزيل صورتك الجديدة المحسنة بنقرة واحدة فقط.</li>
                  </ul>
                </div>
              </div>
            )}
            {locale === 'fr' && (
              <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-10 text-slate-700 dark:text-slate-300 text-left" dir="ltr">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Pourquoi utiliser notre Convertisseur WEBP gratuit ?</h2>
                <p className="mb-8 leading-relaxed text-base">Le format WEBP, développé par Google, est devenu indispensable pour le web moderne. Il offre une compression supérieure qui réduit considérablement la taille des images (JPG ou PNG) tout en préservant une qualité visuelle exceptionnelle. En utilisant notre outil de conversion en ligne, vous accélérez le temps de chargement de votre site web, ce qui améliore grandement votre SEO et l'expérience de vos utilisateurs. Contrairement à d'autres convertisseurs en ligne, Cozuro Tools traite vos fichiers directement dans votre navigateur. Aucune image n'est téléchargée sur un serveur externe. Vos données restent strictement privées et sécurisées sur votre propre machine, garantissant une confidentialité totale et une vitesse d'exécution instantanée.</p>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Comment convertir vos images en WEBP ?</h3>
                  <ul className="space-y-3 list-decimal list-inside pl-1">
                    <li className="leading-relaxed">Glissez-déposez vos fichiers JPG, PNG ou WEBP dans la zone dédiée ci-dessus.</li>
                    <li className="leading-relaxed">Le processus de conversion démarre automatiquement en un instant.</li>
                    <li className="leading-relaxed">Téléchargez votre nouvelle image optimisée en un seul clic.</li>
                  </ul>
                </div>
              </div>
            )}
            {locale === 'de' && (
              <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-10 text-slate-700 dark:text-slate-300 text-left" dir="ltr">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Warum sollten Sie unseren kostenlosen WEBP-Konverter nutzen?</h2>
                <p className="mb-8 leading-relaxed text-base">Das von Google entwickelte WEBP-Format ist für das moderne Web unverzichtbar geworden. Es bietet eine hervorragende Komprimierung, die die Größe von Bildern (JPG oder PNG) erheblich reduziert und gleichzeitig eine außergewöhnliche visuelle Qualität beibehält. Durch die Nutzung unseres Online-Konvertierungstools beschleunigen Sie die Ladezeit Ihrer Website, was Ihre SEO und die Benutzererfahrung erheblich verbessert. Im Gegensatz zu anderen Online-Konvertern verarbeitet Cozuro Tools Ihre Dateien direkt in Ihrem Browser. Es werden keine Bilder auf einen externen Server hochgeladen. Ihre Daten bleiben auf Ihrem eigenen Rechner streng privat und sicher, was absolute Vertraulichkeit und sofortige Geschwindigkeit garantiert.</p>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Wie konvertiert man Bilder in WEBP?</h3>
                  <ul className="space-y-3 list-decimal list-inside pl-1">
                    <li className="leading-relaxed">Ziehen Sie Ihre JPG-, PNG- oder WEBP-Dateien in den oben dafür vorgesehenen Bereich.</li>
                    <li className="leading-relaxed">Der Konvertierungsprozess startet automatisch in wenigen Augenblicken.</li>
                    <li className="leading-relaxed">Laden Sie Ihr neues, optimiertes Bild mit nur einem Klick herunter.</li>
                  </ul>
                </div>
              </div>
            )}
            {(locale === 'en' || (locale !== 'ar' && locale !== 'fr' && locale !== 'de')) && (
              <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-10 text-slate-700 dark:text-slate-300 text-left" dir="ltr">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why use our free WEBP Converter?</h2>
                <p className="mb-8 leading-relaxed text-base">The WEBP format, developed by Google, has become essential for the modern web. It offers superior compression that significantly reduces the size of images (JPG or PNG) while preserving exceptional visual quality. By using our online conversion tool, you speed up your website loading time, which greatly improves your SEO and user experience. Unlike other online converters, Cozuro Tools processes your files directly in your browser. No images are uploaded to an external server. Your data remains strictly private and secure on your own machine, guaranteeing total confidentiality and instant speed.</p>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">How to convert your images to WEBP?</h3>
                  <ul className="space-y-3 list-decimal list-inside pl-1">
                    <li className="leading-relaxed">Drag and drop your JPG, PNG, or WEBP files into the dedicated area above.</li>
                    <li className="leading-relaxed">The conversion process starts automatically in an instant.</li>
                    <li className="leading-relaxed">Download your new optimized image with just one click.</li>
                  </ul>
                </div>
              </div>
            )}
          </>
        )}

        {/* ======================================================== */}
        {/* 2. قسم النصوص الخاص بأداة ضاغط الصور (Image Compressor) فقط */}
        {/* ======================================================== */}
        {isCompressorTool && (
          <>
            {locale === 'ar' && (
              <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-10 text-slate-700 dark:text-slate-300 text-right" dir="rtl">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">كيف يساعدك ضاغط الصور المجاني الخاص بنا؟</h2>
                <p className="mb-8 leading-relaxed text-base">تأخذ الصور عالية الدقة مساحة تخزينية كبيرة وتتسبب في بطء تصفح المواقع. يتيح لك ضاغط الصور الذكي تقليل حجم ملفات PNG و JPG و WEBP بنسبة تصل إلى 70% أو أكثر مع الحفاظ التام على جودتها الأصلية ووضوحها البصري. تتم هذه العملية بأمان كامل ومحلياً داخل متصفحك دون رفع ملفاتك إلى أي خادم خارجي، مما يضمن سرية صورك وبياناتك الشخصية وسرعة معالجة فورية لا تعتمد على سرعة الإنترنت لديك.</p>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">خطوات ضغط الصور بسهولة:</h3>
                  <ul className="space-y-3 list-decimal list-inside pr-1">
                    <li className="leading-relaxed">قم بسحب وصورك وإفلاتها في صندوق المعالجة بالأعلى.</li>
                    <li className="leading-relaxed">يقوم النظام بضغط الصور وتقليل حجمها في أجزاء من الثانية.</li>
                    <li className="leading-relaxed">احفظ صورك المضغوطة الجديدة مباشرة على جهازك بنقرة زر واحدة.</li>
                  </ul>
                </div>
              </div>
            )}
            {locale === 'fr' && (
              <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-10 text-slate-700 dark:text-slate-300 text-left" dir="ltr">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Comment notre Compresseur d'images gratuit vous aide-t-il ?</h2>
                <p className="mb-8 leading-relaxed text-base">Les images haute résolution occupent beaucoup d'espace de stockage et ralentissent la navigation sur le web. Notre compresseur d'images intelligent vous permet de réduire la taille des fichiers PNG, JPG et WEBP jusqu'à 70% ou plus tout en préservant parfaitement leur qualité et netteté d'origine. Ce processus est effectué en toute sécurité directement dans votre navigateur, sans télécharger vos fichiers sur un serveur externe, garantissant ainsi la confidentialité de vos photos et une exécution instantanée.</p>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Étapes pour compresser vos images facilement :</h3>
                  <ul className="space-y-3 list-decimal list-inside pl-1">
                    <li className="leading-relaxed">Glissez-déposez vos photos dans la zone de traitement ci-dessus.</li>
                    <li className="leading-relaxed">Le système compresse et réduit la taille en une fraction de seconde.</li>
                    <li className="leading-relaxed">Enregistrez vos nouvelles images compressées directement sur votre machine.</li>
                  </ul>
                </div>
              </div>
            )}
            {locale === 'de' && (
              <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-10 text-slate-700 dark:text-slate-300 text-left" dir="ltr">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Wie hilft Ihnen unser kostenloser Bildkomprimierer?</h2>
                <p className="mb-8 leading-relaxed text-base">Hochauflösende Bilder beanspruchen viel Speicherplatz und verlangsamen das Laden von Webseiten. Unser intelligenter Bildkomprimierer ermöglicht es Ihnen, die Größe von PNG-, JPG- und WEBP-Dateien um bis zu 70% oder mehr zu reduzieren, während die ursprüngliche Qualität und Schärfe perfekt erhalten bleiben. Dieser Prozess läuft absolut sicher direkt in Ihrem Browser ab. Keine Dateien werden auf externe Server hochgeladen, was die Privatsphäre Ihrer Fotos schützt und eine sofortige Ausführung garantiert.</p>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Schritte zum einfachen Komprimieren Ihrer Bilder:</h3>
                  <ul className="space-y-3 list-decimal list-inside pl-1">
                    <li className="leading-relaxed">Ziehen Sie Ihre Fotos per Drag-and-Drop in den obigen Verarbeitungsbereich.</li>
                    <li className="leading-relaxed">Das System komprimiert und reduziert die Dateigröße in Sekundenbruchteilen.</li>
                    <li className="leading-relaxed">Speichern Sie Ihre neuen komprimierten Bilder mit nur einem Klick auf Ihrem Gerät.</li>
                  </ul>
                </div>
              </div>
            )}
            {(locale === 'en' || (locale !== 'ar' && locale !== 'fr' && locale !== 'de')) && (
              <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-10 text-slate-700 dark:text-slate-300 text-left" dir="ltr">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How does our free Image Compressor help you?</h2>
                <p className="mb-8 leading-relaxed text-base">High-resolution images take up a lot of storage space and slow down website performance. Our intelligent image compressor allows you to reduce the size of PNG, JPG, and WEBP files by up to 70% or more while perfectly preserving their original visual quality and clarity. This process runs completely secure right in your browser; no images are uploaded to external servers, guaranteeing absolute privacy for your photos and instant local execution.</p>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Steps to compress your images easily:</h3>
                  <ul className="space-y-3 list-decimal list-inside pl-1">
                    <li className="leading-relaxed">Drag and drop your photos into the processing zone above.</li>
                    <li className="leading-relaxed">The system compresses and reduces the file size in a fraction of a second.</li>
                    <li className="leading-relaxed">Save your new compressed images directly to your device with one click.</li>
                  </ul>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}