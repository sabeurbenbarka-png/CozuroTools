'use client';

import { useI18n } from '@/i18n/context';
import LegalLayout from '@/components/LegalLayout';
import { useEffect, useState } from 'react';

export default function TermsClient() {
  const { locale } = useI18n();
  const [mounted, setMounted] = useState(false);

  // حماية الصفحة من أخطاء الـ Hydration في Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // 1. اللغة الألمانية
  if (locale === 'de') {
    return (
      <LegalLayout title="Nutzungsbedingungen" lastUpdated="08.06.2026">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">1. Geltungsbereich</h2>
            <p>Diese Nutzungsbedingungen gelten für die Nutzung dieser Website. Durch den Zugriff auf diese Website erklären Sie sich mit diesen Bedingungen einverstanden.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-2">2. Dienste von Drittanbietern</h2>
            <p>Diese Website bietet Tools und Links zu Diensten. Wir übernehmen keine Haftung für die Funktionalität oder Richtigkeit dieser externen Dienste.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">3. Haftungsbeschränkung</h2>
            <p>Die Nutzung der bereitgestellten Tools erfolgt auf eigene Gefahr. Sabeur Ben Barka haftet nicht für Schäden, die aus der Nutzung dieser Website entstehen.</p>
          </div>
        </div>
      </LegalLayout>
    );
  }

  // 2. اللغة العربية
  if (locale === 'ar') {
    return (
      <LegalLayout title="شروط الخدمة" lastUpdated="08-06-2026">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">١. نطاق التطبيق</h2>
            <p>تنطبق شروط الاستخدام هذه على استخدام هذا الموقع الإلكتروني. بدخولك إلى الموقع، فإنك توافق على هذه الشروط.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-2">٢. خدمات الطرف الثالث</h2>
            <p>يوفر هذا الموقع أدوات وروابط لخدمات خارجية. نحن لا نتحمل أي مسؤولية عن وظائف أو دقة هذه الخدمات الخارجية.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">٣. حدود المسؤولية</h2>
            <p>استخدام الأدوات المتاحة يكون على مسؤوليتك الخاصة. لا يتحمل صابر بن بركة المسؤولية عن أي أضرار تنشأ عن استخدام هذا الموقع.</p>
          </div>
        </div>
      </LegalLayout>
    );
  }

  // 3. اللغة الفرنسية (المعدلة لتظهر مثل الصورة السابقة)
  if (locale === 'fr') {
    return (
      <LegalLayout title="Conditions d'Utilisation" lastUpdated="08-06-2026">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">1. Champ d'application</h2>
            <p>Ces conditions d'utilisation s'appliquent à l'utilisation de ce site web. En accédant à ce site, vous acceptez ces conditions.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-2">2. Services tiers</h2>
            <p>Ce site fournit des outils et des liens vers des services externes. Nous déclinons toute responsabilité quant au fonctionnement ou à l'exactitude de ces services tiers.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">3. Limitation de responsabilité</h2>
            <p>L'utilisation des outils fournis se fait à vos propres risques. Sabeur Ben Barka n'est pas responsable des dommages résultant de l'utilisation de ce site.</p>
          </div>
        </div>
      </LegalLayout>
    );
  }

  // 4. اللغة الإنجليزية (الافتراضية)
  return (
    <LegalLayout title="Terms of Service" lastUpdated="2026-06-08">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">1. Scope of Application</h2>
          <p>These terms of use apply to the use of this website. By accessing this website, you agree to these terms.</p>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-2">2. Third-Party Services</h2>
          <p>This website provides tools and links to external services. We assume no liability for the functionality or correctness of these third-party services.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">3. Limitation of Liability</h2>
          <p>The use of the provided tools is at your own risk. Sabeur Ben Barka is not liable for any damages arising from the use of this website.</p>
        </div>
      </div>
    </LegalLayout>
  );
}