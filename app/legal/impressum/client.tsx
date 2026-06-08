'use client';

import { useI18n } from '@/i18n/context';
import LegalLayout from '@/components/LegalLayout';
import { useEffect, useState } from 'react';

export default function ImpressumClient() {
  const { locale } = useI18n();
  const [mounted, setMounted] = useState(false);

  // حماية الصفحة من أخطاء الـ Hydration في Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // 1. اللغة الألمانية (الأساسية والقانونية)
  if (locale === 'de') {
    return (
      <LegalLayout title="Impressum" lastUpdated="08.06.2026">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Angaben gemäß § 5 TMG</h2>
            <p className="pl-4 border-l-2 border-amber-500">
              <strong>Sabeur Ben Barka</strong><br />
              Finkensiefstraße 35<br />
              52223 Stolberg, Deutschland
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-2">Kontakt</h2>
            <p><strong>E-Mail:</strong> Sabeurbenbarka@gmail.com</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p><strong>Sabeur Ben Barka</strong><br />
            Finkensiefstraße 35<br />
            52223 Stolberg, Deutschland</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Haftungsausschluss (Disclaimer)</h2>
            <h3 className="text-lg font-semibold mt-2 mb-1">Haftung für Inhalte</h3>
            <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>
          </div>
        </div>
      </LegalLayout>
    );
  }

  // 2. اللغة العربية
  if (locale === 'ar') {
    return (
      <LegalLayout title="إشعار قانوني (Impressum)" lastUpdated="08-06-2026">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">البيانات وفقاً للمادة 5 من قانون وسائل الإعلام الإلكترونية (TMG)</h2>
            <p className="pr-4 border-r-2 border-amber-500">
              <strong>صابر بن بركة</strong><br />
              شارع فينكنسيفشتراسه 35 (Finkensiefstraße 35)<br />
              52223 شتولبرغ، ألمانيا (Stolberg)
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-2">معلومات الاتصال</h2>
            <p><strong>البريد الإلكتروني:</strong> Sabeurbenbarka@gmail.com</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">المسؤول عن المحتوى وفقاً للمادة 55 الفقرة 2 من اتفاقية البث الحكومية (RStV)</h2>
            <p><strong>صابر بن بركة</strong><br />
            شارع فينكنسيفشتراسه 35<br />
            52223 شتولبرغ، ألمانيا</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">إخلاء المسؤولية</h2>
            <h3 className="text-lg font-semibold mt-2 mb-1">المسؤولية عن المحتويات</h3>
            <p>تم إعداد محتويات صفحاتنا بأقصى درجات العناية. ومع ذلك، لا يمكننا تحمل أي ضمان لدقة المحتويات أو اكتمالها أو حداثتها.</p>
          </div>
        </div>
      </LegalLayout>
    );
  }

  // 3. اللغة الفرنسية
  if (locale === 'fr') {
    return (
      <LegalLayout title="Mentions Légales (Impressum)" lastUpdated="08-06-2026">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Informations conformes à l'article 5 de la TMG</h2>
            <p className="pl-4 border-l-2 border-amber-500">
              <strong>Sabeur Ben Barka</strong><br />
              Finkensiefstraße 35<br />
              52223 Stolberg, Allemagne
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-2">Contact</h2>
            <p><strong>E-mail :</strong> Sabeurbenbarka@gmail.com</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Responsable du contenu selon l'article 55, al. 2 de la RStV</h2>
            <p><strong>Sabeur Ben Barka</strong><br />
            Finkensiefstraße 35<br />
            52223 Stolberg, Allemagne</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Avis de non-responsabilité</h2>
            <h3 className="text-lg font-semibold mt-2 mb-1">Responsabilité du contenu</h3>
            <p>Le contenu de nos pages a été créé avec le plus grand soin. Cependant, nous ne pouvons garantir l'exactitude, l'exhaustivité ou l'actualité du contenu.</p>
          </div>
        </div>
      </LegalLayout>
    );
  }

  // 4. اللغة الإنجليزية (الافتراضية)
  return (
    <LegalLayout title="Legal Notice (Impressum)" lastUpdated="2026-06-08">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Information according to Sec. 5 TMG</h2>
          <p className="pl-4 border-l-2 border-amber-500">
            <strong>Sabeur Ben Barka</strong><br />
            Finkensiefstraße 35<br />
            52223 Stolberg, Germany
          </p>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-2">Contact</h2>
          <p><strong>E-Mail:</strong> Sabeurbenbarka@gmail.com</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Accountable for content according to Sec. 55 Para. 2 RStV</h2>
          <p><strong>Sabeur Ben Barka</strong><br />
          Finkensiefstraße 35<br />
          52223 Stolberg, Germany</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Disclaimer</h2>
          <h3 className="text-lg font-semibold mt-2 mb-1">Liability for Content</h3>
          <p>The contents of our pages were created with great care. However, we cannot assume any liability for the correctness, completeness, and topicality of the contents.</p>
        </div>
      </div>
    </LegalLayout>
  );
}