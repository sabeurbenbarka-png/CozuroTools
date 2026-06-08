'use client';

import { useI18n } from '@/i18n/context';
import LegalLayout from '@/components/LegalLayout';

export default function DisclaimerClient() {
  const { locale } = useI18n();

  // 1. اللغة الألمانية (الأساسية)
  if (locale === 'de') {
    return (
      <LegalLayout title="Haftungsausschluss (Disclaimer)" lastUpdated="08.06.2026">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Haftung für Inhalte</h2>
            <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-2">Haftung für Links</h2>
            <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Urheberrecht</h2>
            <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung von Sabeur Ben Barka.</p>
          </div>
        </div>
      </LegalLayout>
    );
  }

  // 2. اللغة العربية
  if (locale === 'ar') {
    return (
      <LegalLayout title="إخلاء المسؤولية (Disclaimer)" lastUpdated="08-06-2026">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">المسؤولية عن المحتويات</h2>
            <p>بصفتنا مزوداً للخدمة، فإننا مسؤولون عن محتوياتنا الخاصة على هذه الصفحات وفقاً للقوانين العامة بموجب المادة 7 الفقرة 1 من قانون وسائل الإعلام الإلكترونية (TMG). ومع ذلك، وفقاً للمواد من 8 إلى 10 من نفس القانون، لسنا ملزمين بمراقبة المعلومات الخارجية المرسلة أو المخزنة.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-2">المسؤولية عن الروابط الخارجية</h2>
            <p>يحتوي موقعنا على روابط لمواقع خارجية لأطراف ثالثة، ولا نملك أي تأثير على محتوياتها. لذلك، لا يمكننا تحمل أي مسؤولية عن هذه المحتويات الخارجية. يتحمل المزود أو المشغل المعني لتلك الصفحات المسؤولية دائماً عن محتويات المواقع المرتبطة.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">حقوق النشر والتأليف</h2>
            <p>تخضع المحتويات والأعمال التي أنشأها مشغلو هذا الموقع على هذه الصفحات لقانون حماية حقوق النشر الألماني. تتطلب أي عملية نسخ أو تعديل أو توزيع أو أي نوع من الاستغلال خارج حدود قانون حقوق النشر موافقة خطية مسبقة من صابر بن بركة.</p>
          </div>
        </div>
      </LegalLayout>
    );
  }

  // 3. اللغة الفرنسية
  if (locale === 'fr') {
    return (
      <LegalLayout title="Avis de non-responsabilité (Disclaimer)" lastUpdated="08-06-2026">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Responsabilité du contenu</h2>
            <p>En tant que prestataire de services, nous sommes responsables de notre propre contenu sur ces pages conformément aux lois générales, au titre de l'article 7, paragraphe 1 de la TMG. Selon les articles 8 à 10 de la TMG, nous ne sommes pas tenus de surveiller les informations tierces transmises ou stockées.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-2">Responsabilité des liens</h2>
            <p>Notre site contient des liens vers des sites web externes de tiers, sur le contenu desquels nous n'avons aucune influence. Par conséquent, nous ne pouvons assumer aucune responsabilité pour ces contenus externes. Le fournisseur ou l'exploitant respectif de ces pages est toujours responsable du contenu des sites liés.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Droits d'auteur</h2>
            <p>Le contenu et les œuvres créés par les exploitants du site sur ces pages sont soumis au droit d'auteur allemand. La duplication, le traitement, la distribution et tout type d'exploitation en dehors des limites du droit d'auteur nécessitent l'accord écrit de Sabeur Ben Barka.</p>
          </div>
        </div>
      </LegalLayout>
    );
  }

  // 4. اللغة الإنجليزية (الافتراضية)
  return (
    <LegalLayout title="Disclaimer" lastUpdated="2026-06-08">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Liability for Content</h2>
          <p>As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to Sec. 7 Para. 1 of the German Telemedia Act (TMG). However, according to Sec. 8 to 10 TMG, we are not obliged to monitor transmitted or stored third-party information.</p>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-2">Liability for Links</h2>
          <p>Our website contains links to external websites of third parties, whose content we have no influence over. Therefore, we cannot accept any liability for this third-party content. The respective provider or operator of the linked pages is always responsible for their content.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Copyright</h2>
          <p>The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, or any form of commercialization beyond the scope of the copyright law requires the prior written consent of Sabeur Ben Barka.</p>
        </div>
      </div>
    </LegalLayout>
  );
}