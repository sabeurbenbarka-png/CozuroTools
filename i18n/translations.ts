export type Locale = 'en' | 'ar' | 'fr' | 'de';

export const locales: Locale[] = ['en', 'ar', 'fr', 'de'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  fr: 'Français',
  de: 'Deutsch',
};

export const rtlLocales: Locale[] = ['ar'];

export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export const translations = {
  en: {
    // Nav
    nav_home: 'Home',
    nav_tools: 'Tools',
    nav_privacy: 'Privacy Policy',
    nav_terms: 'Terms',
    nav_disclaimer: 'Disclaimer',
    nav_impressum: 'Impressum',

    // Hero
    hero_badge: 'Free Browser-Based Tools',
    hero_title: 'Powerful File Tools,',
    hero_title2: 'Zero Upload',
    hero_description:
      'Transform your images and files instantly — everything runs in your browser. Your files never leave your device.',
    hero_cta: 'Explore Tools',
    hero_stat1: '100% Free',
    hero_stat2: 'No Upload',
    hero_stat3: 'Instant Results',
    hero_stat1_sub: 'Forever',
    hero_stat2_sub: 'Privacy First',
    hero_stat3_sub: 'Client-Side',

    // Privacy Section (New Keys)
    privacy_title: 'Your Files Stay on Your Device',
    privacy_desc: 'All processing happens locally in your browser using the Web Canvas API. We never upload, store, or transmit your files to any server. Zero data collection. GDPR compliant.',
    badge_uploads: 'No uploads',
    badge_servers: 'No servers',
    badge_tracking: 'No tracking',
    badge_gdpr: 'GDPR compliant',
    badge_free: '100% free',

    // Tools section
    tools_title: 'Available Tools',
    tools_subtitle: 'Professional-grade tools that run entirely in your browser',
    tool_try: 'Try Tool',
    tool_free: 'Free',
    tool_fast: 'Instant',
    tool_private: 'Private',

    // Image Compressor
    tool_compressor_name: 'Image Compressor',
    tool_compressor_desc: 'Compress JPEG & PNG images with full quality control. Reduce file size without visible quality loss.',
    tool_compressor_long_desc: 'Compress your images directly in the browser. No uploads, no servers — your files stay 100% private.',
    compressor_upload: 'Drop your image here',
    compressor_upload_sub: 'or click to browse — JPG, PNG, WEBP up to 20MB',
    compressor_quality: 'Compression Quality',
    compressor_quality_low: 'Low',
    compressor_quality_high: 'High',
    compressor_compress: 'Compress Image',
    compressor_download: 'Download Compressed',
    compressor_original: 'Original',
    compressor_compressed: 'Compressed',
    compressor_saved: 'saved',
    compressor_processing: 'Compressing…',
    compressor_result_title: 'Compression Result',

    // WEBP Converter
    tool_webp_name: 'WEBP Converter',
    tool_webp_desc: 'Convert between JPG, PNG, and WEBP formats. Optimize for web with modern formats.',
    tool_webp_long_desc: 'Convert image formats instantly in your browser. Supports JPG, PNG, and WEBP — no server needed.',
    webp_upload: 'Drop your image here',
    webp_upload_sub: 'or click to browse — JPG, PNG, WEBP up to 20MB',
    webp_output_format: 'Output Format',
    webp_convert: 'Convert Image',
    webp_download: 'Download Converted',
    webp_processing: 'Converting…',
    webp_result_title: 'Conversion Result',
    webp_output_size: 'Output Size',

    // Common tool UI
    tool_drop_active: 'Drop your file here!',
    tool_error_type: 'Invalid file type. Please upload JPG, PNG, or WEBP.',
    tool_error_size: 'File too large. Maximum size is 20MB.',
    tool_error_process: 'Processing failed. Please try another file.',
    tool_error_empty: 'Please select a file first.',
    tool_change_file: 'Change File',
    tool_file_selected: 'File selected',

    // Footer
    footer_desc: 'Free, browser-based file and image tools. Your privacy is our priority.',
    footer_tools: 'Tools',
    footer_legal: 'Legal',
    footer_rights: 'All rights reserved.',
    footer_tagline: 'Made with care for privacy.',

    // Legal pages
    legal_privacy_title: 'Privacy Policy',
    legal_terms_title: 'Terms of Service',
    legal_disclaimer_title: 'Disclaimer',
    legal_impressum_title: 'Impressum',
    legal_last_updated: 'Last updated',

    // Dark mode
    toggle_dark: 'Dark Mode',
    toggle_light: 'Light Mode',

    // SEO
    site_name: 'Cozuro Tools',
    site_description: 'Free browser-based image and file tools. Compress images, convert formats — everything runs locally, your files never leave your device.',

    // AdSense & SEO Content
    webp_seo_title: 'Why use our free WEBP Converter?',
    webp_seo_p1: 'The WEBP format, developed by Google, has become essential for the modern web. It offers superior compression that significantly reduces the size of images (JPG or PNG) while preserving exceptional visual quality. By using our online conversion tool, you speed up your website loading time, which greatly improves your SEO and user experience.',
    webp_seo_h2: '100% Secure and Local Conversion',
    webp_seo_p2: 'Unlike other online converters, Cozuro Tools processes your files directly in your browser. No images are uploaded to an external server. Your data remains strictly private and secure on your own machine, guaranteeing total confidentiality and instant speed.',
    webp_seo_h3: 'How to convert your images to WEBP?',
    webp_seo_step1: 'Drag and drop your JPG, PNG, or WEBP files into the dedicated area above.',
    webp_seo_step2: 'The conversion process starts automatically in an instant.',
    webp_seo_step3: 'Download your new optimized image with just one click.',
    compressor_seo_title: 'Optimize your images with our Free Image Compressor',
    compressor_seo_p1: 'Large images can severely slow down your website performance and hurt your rankings on search engines. Our advanced Image Compressor tool allows you to significantly reduce the file size of your photos without losing any visible quality. It is the perfect solution for bloggers, developers, and designers looking to optimize loading speeds.',
    compressor_seo_h2: 'Complete Quality Control & Ultimate Privacy',
    compressor_seo_p2: 'With Cozuro Tools, you get a slider to customize the exact compression quality you need. Best of all, everything runs client-side. Your private photos never touch an external server, giving you full data ownership and lightning-fast browser compression.',
    compressor_seo_h3: 'Easy Steps to Compress Images',
    compressor_seo_step1: 'Upload your image using the file selection box above.',
    compressor_seo_step2: 'Adjust the compression quality slider to your preference.',
    compressor_seo_step3: 'Click Compress and download your lightweight image immediately.',
  },

  ar: {
    nav_home: 'الرئيسية',
    nav_tools: 'الأدوات',
    nav_privacy: 'سياسة الخصوصية',
    nav_terms: 'الشروط والأحكام',
    nav_disclaimer: 'إخلاء المسؤولية',
    nav_impressum: 'بيانات الناشر',

    hero_badge: 'أدوات مجانية تعمل في المتصفح',
    hero_title: 'أدوات ملفات احترافية،',
    hero_title2: 'بدون رفع',
    hero_description:
      'حوّل صورك وملفاتك فورياً — كل شيء يعمل داخل متصفحك. ملفاتك لا تغادر جهازك أبداً.',
    hero_cta: 'استكشف الأدوات',
    hero_stat1: 'مجاني 100%',
    hero_stat2: 'بدون رفع',
    hero_stat3: 'نتائج فورية',
    hero_stat1_sub: 'للأبد',
    hero_stat2_sub: 'خصوصيتك أولاً',
    hero_stat3_sub: 'يعمل محلياً',

    // Privacy Section (New Keys)
    privacy_title: 'ملفاتك تبقى على جهازك',
    privacy_desc: 'تتم جميع عمليات المعالجة محلياً في متصفحك باستخدام Web Canvas API. نحن لا نرفع ملفاتك أو نخزنها أو نرسلها إلى أي خادم. لا يوجد جمع للبيانات. متوافق مع GDPR.',
    badge_uploads: 'بدون رفع',
    badge_servers: 'بدون خوادم',
    badge_tracking: 'بدون تتبع',
    badge_gdpr: 'متوافق مع GDPR',
    badge_free: 'مجاني 100%',

    tools_title: 'الأدوات المتاحة',
    tools_subtitle: 'أدوات احترافية تعمل بالكامل داخل متصفحك',
    tool_try: 'جرّب الأداة',
    tool_free: 'مجاني',
    tool_fast: 'فوري',
    tool_private: 'خاص',

    tool_compressor_name: 'ضاغط الصور',
    tool_compressor_desc: 'اضغط صور JPEG و PNG مع تحكم كامل في الجودة. قلل حجم الملف دون فقدان الجودة.',
    tool_compressor_long_desc: 'اضغط صورك مباشرة في المتصفح. لا رفع، لا خوادم — ملفاتك تبقى خاصة 100%.',
    compressor_upload: 'أسقط صورتك هنا',
    compressor_upload_sub: 'أو انقر للتصفح — JPG، PNG، WEBP حتى 20MB',
    compressor_quality: 'جودة الضغط',
    compressor_quality_low: 'منخفضة',
    compressor_quality_high: 'عالية',
    compressor_compress: 'ضغط الصورة',
    compressor_download: 'تحميل المضغوطة',
    compressor_original: 'الأصلية',
    compressor_compressed: 'المضغوطة',
    compressor_saved: 'توفير',
    compressor_processing: 'جاري الضغط…',
    compressor_result_title: 'نتيجة الضغط',

    tool_webp_name: 'محوّل WEBP',
    tool_webp_desc: 'حوّل بين صيغ JPG و PNG و WEBP. حسّن للويب بالصيغ الحديثة.',
    tool_webp_long_desc: 'حوّل صيغ الصور فورياً في متصفحك. يدعم JPG و PNG و WEBP — لا خادم مطلوب.',
    webp_upload: 'أسقط صورتك هنا',
    webp_upload_sub: 'أو انقر للتصفح — JPG، PNG، WEBP حتى 20MB',
    webp_output_format: 'صيغة الإخراج',
    webp_convert: 'تحويل الصورة',
    webp_download: 'تحميل المحوّلة',
    webp_processing: 'جاري التحويل…',
    webp_result_title: 'نتيجة التحويل',
    webp_output_size: 'حجم الإخراج',

    tool_drop_active: 'أسقط ملفك هنا!',
    tool_error_type: 'نوع ملف غير صالح. يرجى رفع JPG أو PNG أو WEBP.',
    tool_error_size: 'الملف كبير جداً. الحجم الأقصى 20MB.',
    tool_error_process: 'فشلت المعالجة. يرجى تجربة ملف آخر.',
    tool_error_empty: 'يرجى اختيار ملف أولاً.',
    tool_change_file: 'تغيير الملف',
    tool_file_selected: 'تم اختيار الملف',

    footer_desc: 'أدوات مجانية للملفات والصور تعمل في المتصفح. خصوصيتك هي أولويتنا.',
    footer_tools: 'الأدوات',
    footer_legal: 'القانونية',
    footer_rights: 'جميع الحقوق محفوظة.',
    footer_tagline: 'صُنع باهتمام بالخصوصية.',

    legal_privacy_title: 'سياسة الخصوصية',
    legal_terms_title: 'الشروط والأحكام',
    legal_disclaimer_title: 'إخلاء المسؤولية',
    legal_impressum_title: 'بيانات الناشر',
    legal_last_updated: 'آخر تحديث',

    toggle_dark: 'الوضع الداكن',
    toggle_light: 'الوضع الفاتح',

    site_name: 'Cozuro Tools',
    site_description: 'أدوات مجانية للصور والملفات تعمل في المتصفح. اضغط الصور، حوّل الصيغ — كل شيء يعمل محلياً، ملفاتك لا تغادر جهازك.',

    webp_seo_title: 'لماذا يجب عليك استخدام محول WEBP المجاني الخاص بنا؟',
    webp_seo_p1: 'أصبح تنسيق WEBP، الذي طورته شركة Google، ضرورياً لشبكة الويب الحديثة. فهو يوفر ضغطاً فائقاً يقلل بشكل كبير من حجم الصور (JPG أو PNG) مع الحفاظ على جودة بصرية استثنائية. باستخدام أداة التحويل عبر الإنترنت، يمكنك تسريع وقت تحميل موقع الويب الخاص بك، مما يحسن بشكل كبير من أداء الـ SEO وتجربة المستخدمين.',
    webp_seo_h2: 'تحويل آمن ومحلي 100%',
    webp_seo_p2: 'على عكس المحولات الأخرى عبر الإنترنت، يقوم Cozuro Tools بمعالجة ملفاتك مباشرة في متصفحك. لا يتم رفع أي صورة إلى خادم خارجي. تظل بياناتك خاصة وآمنة تماماً على جهازك الخاص، مما يضمن السرية المطلقة وسرعة التنفيذ الفورية.',
    webp_seo_h3: 'كيفية تحويل صورك إلى WEBP؟',
    webp_seo_step1: 'قم بسحب وإسقاط ملفات JPG أو PNG أو WEBP في المنطقة المخصصة أعلاه.',
    webp_seo_step2: 'تبدأ عملية التحويل تلقائياً في لحظات.',
    webp_seo_step3: 'قم بتنزيل صورتك الجديدة المحسنة بنقرة واحدة فقط.',

    compressor_seo_title: 'حسن أداء صورك مع ضاغط الصور المجاني الخاص بنا',
    compressor_seo_p1: 'يمكن للصور ذات الحجم الكبير أن تبطئ أداء موقعك الإلكتروني وتضر بترتيبك في محركات البحث. تتيح لك أداة ضغط الصور المتقدمة تقليل حجم ملفات الصور بشكل كبير دون أي فقدان ملحوظ في الجودة، مما يجعلها الحل المثالي لأصحاب المواقع والمطورين والمصممين.',
    compressor_seo_h2: 'تحكم كامل في الجودة وخصوصية تامة',
    compressor_seo_p2: 'مع موقع Cozuro Tools، ستحصل على شريط تمرير لتحديد جودة الضغط المطلوبة بدقة. والأهم من ذلك أن المعالجة تتم بالكامل داخل متصفحك محلياً دون رفع صورك إلى خوادم خارجية، مما يضمن أماناً وحماية كاملة لبياناتك الشخصية وسرعة فائقة.',
    compressor_seo_h3: 'خطوات سهلة لضغط صورك المفضل',
    compressor_seo_step1: 'قم برفع صورتك عبر صندوق اختيار الملفات الموضح في الأعلى.',
    compressor_seo_step2: 'قم بتعديل شريط الجودة وفقاً لاحتياجاتك الخاصة.',
    compressor_seo_step3: 'انقر على زر ضغط الصورة وقم بتحميل الملف المحسن فوراً وبكل سهولة.',
  },

  fr: {
    nav_home: 'Accueil',
    nav_tools: 'Outils',
    nav_privacy: 'Politique de confidentialité',
    nav_terms: 'Conditions d\'utilisation',
    nav_disclaimer: 'Avertissement',
    nav_impressum: 'Mentions légales',

    hero_badge: 'Outils gratuits basés sur le navigateur',
    hero_title: 'Outils de fichiers puissants,',
    hero_title2: 'Zéro téléchargement',
    hero_description:
      'Transformez vos images et fichiers instantanément — tout fonctionne dans votre navigateur. Vos fichiers ne quittent jamais votre appareil.',
    hero_cta: 'Explorer les outils',
    hero_stat1: '100% gratuit',
    hero_stat2: 'Sans envoi',
    hero_stat3: 'Résultats immédiats',
    hero_stat1_sub: 'Pour toujours',
    hero_stat2_sub: 'Vie privée d\'abord',
    hero_stat3_sub: 'Côté client',

    // Privacy Section (New Keys)
    privacy_title: 'Vos fichiers restent sur votre appareil',
    privacy_desc: 'Tout le traitement se fait localement dans votre navigateur en utilisant l\'API Web Canvas. Nous ne téléchargeons, ne stockons ni ne transmettons jamais vos fichiers à aucun serveur. Aucune collecte de données. Conforme au RGPD.',
    badge_uploads: 'Sans envoi',
    badge_servers: 'Sans serveurs',
    badge_tracking: 'Sans suivi',
    badge_gdpr: 'Conforme au RGPD',
    badge_free: '100% gratuit',

    tools_title: 'Outils disponibles',
    tools_subtitle: 'Des outils professionnels qui fonctionnent entièrement dans votre navigateur',
    tool_try: 'Essayer l\'outil',
    tool_free: 'Gratuit',
    tool_fast: 'Instantané',
    tool_private: 'Privé',

    tool_compressor_name: 'Compresseur d\'image',
    tool_compressor_desc: 'Compressez des images JPEG et PNG avec un contrôle total de la qualité. Réduisez la taille sans perte visible.',
    tool_compressor_long_desc: 'Compressez vos images directement dans le navigateur. Pas d\'envoi, pas de serveur — vos fichiers restent 100% privés.',
    compressor_upload: 'Déposez votre image ici',
    compressor_upload_sub: 'ou cliquez pour parcourir — JPG, PNG, WEBP jusqu\'à 20MB',
    compressor_quality: 'Qualité de compression',
    compressor_quality_low: 'Faible',
    compressor_quality_high: 'Élevée',
    compressor_compress: 'Compresser l\'image',
    compressor_download: 'Télécharger la compressée',
    compressor_original: 'Original',
    compressor_compressed: 'Compressé',
    compressor_saved: 'économisé',
    compressor_processing: 'Compression…',
    compressor_result_title: 'Résultat de la compression',

    tool_webp_name: 'Convertisseur WEBP',
    tool_webp_desc: 'Convertissez entre les formats JPG, PNG et WEBP. Optimisez pour le web avec des formats modernes.',
    tool_webp_long_desc: 'Convertissez les formats d\'image instantanément dans votre navigateur. Prend en charge JPG, PNG et WEBP — aucun serveur requis.',
    webp_upload: 'Déposez votre image ici',
    webp_upload_sub: 'ou cliquez pour parcourir — JPG, PNG, WEBP jusqu\'à 20MB',
    webp_output_format: 'Format de sortie',
    webp_convert: 'Convertir l\'image',
    webp_download: 'Télécharger la convertie',
    webp_processing: 'Conversion…',
    webp_result_title: 'Résultat de la conversion',
    webp_output_size: 'Taille de sortie',

    tool_drop_active: 'Déposez votre fichier ici!',
    tool_error_type: 'Type de fichier invalide. Veuillez télécharger JPG, PNG ou WEBP.',
    tool_error_size: 'Fichier trop volumineux. La taille maximale est de 20MB.',
    tool_error_process: 'Échec du traitement. Veuillez essayer un autre fichier.',
    tool_error_empty: 'Veuillez d\'abord sélectionner un fichier.',
    tool_change_file: 'Changer le fichier',
    tool_file_selected: 'Fichier sélectionné',

    footer_desc: 'Outils gratuits de fichiers et d\'images basés sur le navigateur. Votre vie privée est notre priorité.',
    footer_tools: 'Outils',
    footer_legal: 'Légal',
    footer_rights: 'Tous droits réservés.',
    footer_tagline: 'Fait avec soin pour la confidentialité.',

    legal_privacy_title: 'Politique de confidentialité',
    legal_terms_title: 'Conditions d\'utilisation',
    legal_disclaimer_title: 'Avertissement',
    legal_impressum_title: 'Mentions légales',
    legal_last_updated: 'Dernière mise à jour',

    toggle_dark: 'Mode sombre',
    toggle_light: 'Mode clair',

    site_name: 'Cozuro Tools',
    site_description: 'Outils gratuits d\'images et de fichiers basés sur le navigateur. Compressez des images, convertissez des formats — tout fonctionne localement, vos fichiers ne quittent jamais votre appareil.',

    webp_seo_title: 'Pourquoi utiliser notre Convertisseur WEBP gratuit ?',
    webp_seo_p1: 'Le format WEBP, développé par Google, est devenu indispensable pour le web moderne. Il offre une compression supérieure qui réduit considérablement la taille des images (JPG ou PNG) tout en préservant une qualité visuelle exceptionnelle. En utilisant notre outil de conversion en ligne, vous accélérez le temps de chargement de votre site web, ce qui améliore grandement votre SEO et l\'expérience de vos utilisateurs.',
    webp_seo_h2: 'Une conversion 100% sécurisée et locale',
    webp_seo_p2: 'Contrairement à d\'autres convertisseurs en ligne, Cozuro Tools traite vos fichiers directement dans votre navigateur. Aucune image n\'est téléchargée sur un serveur externe. Vos données restent strictement privées et sécurisées sur votre propre machine, garantissant une confidentialité totale et une vitesse d\'exécution instantanée.',
    webp_seo_h3: 'Comment convertir vos images en WEBP ?',
    webp_seo_step1: 'Glissez-déposez vos fichiers JPG, PNG ou WEBP dans la zone dédiée ci-dessus.',
    webp_seo_step2: 'Le processus de conversion démarre automatiquement en un instant.',
    webp_seo_step3: 'Téléchargez votre nouvelle image optimisée en un seul clic.',

    compressor_seo_title: 'Optimisez vos images avec notre Compresseur d\'image gratuit',
    compressor_seo_p1: 'Les images volumineuses peuvent ralentir considérablement votre site internet et nuire à votre référencement sur les moteurs de recherche. Notre outil avancé de compression d\'image vous permet de réduire efficacement le poids de vos fichiers sans perte visible de qualité. C\'est la solution idéale pour les blogueurs, développeurs et designers afin d\'améliorer la vitesse de chargement.',
    compressor_seo_h2: 'Contrôle total de la qualité et confidentialité ultime',
    compressor_seo_p2: 'Avec Cozuro Tools, vous disposez d\'un curseur intuitif pour ajuster précisément le niveau de compression souhaité. De plus, tout s\'exécute localement dans votre navigateur. Vos photos personnelles ne sont jamais envoyées sur des serveurs tiers, garantissant une sécurité absolue et une vitesse immédiate.',
    compressor_seo_h3: 'Étapes simples pour compresser vos images',
    compressor_seo_step1: 'Ajoutez votre fichier en utilisant la zone de sélection ci-dessus.',
    compressor_seo_step2: 'Ajustez la barre de qualité selon vos besoins spécifiques.',
    compressor_seo_step3: 'Cliquez sur Compresser et téléchargez votre fichier optimisé instantanément.',
  },

  de: {
    nav_home: 'Startseite',
    nav_tools: 'Werkzeuge',
    nav_privacy: 'Datenschutzrichtlinie',
    nav_terms: 'Nutzungsbedingungen',
    nav_disclaimer: 'Haftungsausschluss',
    nav_impressum: 'Impressum',

    hero_badge: 'Kostenlose browserbasierte Tools',
    hero_title: 'Leistungsstarke Datei-Tools,',
    hero_title2: 'Kein Upload nötig',
    hero_description:
      'Transformieren Sie Ihre Bilder und Dateien sofort — alles läuft in Ihrem Browser. Ihre Dateien verlassen niemals Ihr Gerät.',
    hero_cta: 'Tools erkunden',
    hero_stat1: '100% kostenlos',
    hero_stat2: 'Kein Upload',
    hero_stat3: 'Sofortige Ergebnisse',
    hero_stat1_sub: 'Für immer',
    hero_stat2_sub: 'Datenschutz zuerst',
    hero_stat3_sub: 'Clientseitig',

    // Privacy Section (New Keys)
    privacy_title: 'Ihre Dateien bleiben auf Ihrem Gerät',
    privacy_desc: 'Die gesamte Verarbeitung erfolgt lokal in Ihrem Browser unter Verwendung der Web Canvas API. Wir laden Ihre Dateien niemals hoch, speichern sie nicht und übertragen sie nicht an einen Server. Keine Datenerfassung. DSGVO-konform.',
    badge_uploads: 'Kein Upload',
    badge_servers: 'Keine Server',
    badge_tracking: 'Kein Tracking',
    badge_gdpr: 'DSGVO-konform',
    badge_free: '100% kostenlos',

    tools_title: 'Verfügbare Tools',
    tools_subtitle: 'Professionelle Tools, die vollständig in Ihrem Browser laufen',
    tool_try: 'Tool ausprobieren',
    tool_free: 'Kostenlos',
    tool_fast: 'Sofort',
    tool_private: 'Privat',

    tool_compressor_name: 'Bildkompressor',
    tool_compressor_desc: 'Komprimieren Sie JPEG- und PNG-Bilder mit vollständiger Qualitätskontrolle. Reduzieren Sie die Dateigröße ohne sichtbaren Qualitätsverlust.',
    tool_compressor_long_desc: 'Komprimieren Sie Ihre Bilder direkt im Browser. Kein Upload, keine Server — Ihre Dateien bleiben 100% privat.',
    compressor_upload: 'Bild hier ablegen',
    compressor_upload_sub: 'oder klicken zum Durchsuchen — JPG, PNG, WEBP bis 20MB',
    compressor_quality: 'Kompressionsqualität',
    compressor_quality_low: 'Niedrig',
    compressor_quality_high: 'Hoch',
    compressor_compress: 'Bild komprimieren',
    compressor_download: 'Komprimiert herunterladen',
    compressor_original: 'Original',
    compressor_compressed: 'Komprimiert',
    compressor_saved: 'gespart',
    compressor_processing: 'Komprimierung…',
    compressor_result_title: 'Kompressionsergebnis',

    tool_webp_name: 'WEBP-Konverter',
    tool_webp_desc: 'Konvertieren Sie zwischen JPG-, PNG- und WEBP-Formaten. Optimieren Sie für das Web mit modernen Formaten.',
    tool_webp_long_desc: 'Konvertieren Sie Bildformate sofort in Ihrem Browser. Unterstützt JPG, PNG und WEBP — kein Server erforderlich.',
    webp_upload: 'Bild hier ablegen',
    webp_upload_sub: 'oder klicken zum Durchsuchen — JPG, PNG, WEBP bis 20MB',
    webp_output_format: 'Ausgabeformat',
    webp_convert: 'Bild konvertieren',
    webp_download: 'Konvertiert herunterladen',
    webp_processing: 'Konvertierung…',
    webp_result_title: 'Konvertierungsergebnis',
    webp_output_size: 'Ausgabegröße',

    tool_drop_active: 'Datei hier ablegen!',
    tool_error_type: 'Ungültiger Dateityp. Bitte laden Sie JPG, PNG oder WEBP hoch.',
    tool_error_size: 'Datei zu groß. Maximale Größe ist 20MB.',
    tool_error_process: 'Verarbeitung fehlgeschlagen. Bitte versuchen Sie eine andere Datei.',
    tool_error_empty: 'Bitte wählen Sie zuerst eine Datei aus.',
    tool_change_file: 'Datei ändern',
    tool_file_selected: 'Datei ausgewählt',

    footer_desc: 'Kostenlose browser-basierte Datei- und Bildwerkzeuge. Ihr Datenschutz hat für uns Priorität.',
    footer_tools: 'Werkzeuge',
    footer_legal: 'Rechtliches',
    footer_rights: 'Alle Rechte vorbehalten.',
    footer_tagline: 'Mit Sorgfalt für den Datenschutz gemacht.',

    legal_privacy_title: 'Datenschutzrichtlinie',
    legal_terms_title: 'Nutzungsbedingungen',
    legal_disclaimer_title: 'Haftungsausschluss',
    legal_impressum_title: 'Impressum',
    legal_last_updated: 'Zuletzt aktualisiert',

    toggle_dark: 'Dunkelmodus',
    toggle_light: 'Hellmodus',

    site_name: 'Cozuro Tools',
    site_description: 'Kostenlose browserbasierte Bild- und Dateitools. Bilder komprimieren, Formate konvertieren — alles läuft lokal, Ihre Dateien verlassen niemals Ihr Gerät.',

    webp_seo_title: 'Warum sollten Sie unseren kostenlosen WEBP-Konverter nutzen?',
    webp_seo_p1: 'Das von Google entwickelte WEBP-Format ist für das moderne Web unverzichtbar geworden. Es bietet eine hervorragende Komprimierung, die die Größe von Bildern (JPG oder PNG) erheblich reduziert und gleichzeitig eine außergewöhnliche visuelle Qualität beibehält. Durch die Nutzung unseres Online-Konvertierungstools beschleunigen Sie die Ladezeit Ihrer Website, was Ihre SEO und die Benutzererfahrung erheblich verbessert.',
    webp_seo_h2: '100% sichere und lokale Konvertierung',
    webp_seo_p2: 'Im Gegensatz zu anderen Online-Konvertern verarbeitet Cozuro Tools Ihre Dateien direkt in Ihrem Browser. Es werden keine Bilder auf einen externen Server hochgeladen. Ihre Daten bleiben auf Ihrem eigenen Rechner streng privat und sicher, was absolute Vertraulichkeit und sofortige Geschwindigkeit garantiert.',
    webp_seo_h3: 'Wie konvertiert man Bilder in WEBP?',
    webp_seo_step1: 'Ziehen Sie Ihre JPG-, PNG- oder WEBP-Dateien in den oben dafür vorgesehenen Bereich.',
    webp_seo_step2: 'Der Konvertierungsprozess startet automatisch in wenigen Augenblicken.',
    webp_seo_step3: 'Laden Sie Ihr neues, optimiertes Bild mit nur einem Klick herunter.',

    compressor_seo_title: 'Optimieren Sie Ihre Bilder mit unserem kostenlosen Bildkompressor',
    compressor_seo_p1: 'Große Bilder können die Leistung Ihrer Website erheblich beeinträchtigen und Ihr Ranking in den Suchmaschinen verschlechtern. Unser fortschrittlicher Bildkompressor ermöglicht es Ihnen, die Dateigröße Ihrer Fotos drastisch zu reduzieren, ohne dass ein sichtbarer Qualitätsverlust entsteht. Die ideale Wahl für Entwickler und Blogger.',
    compressor_seo_h2: 'Vollständige Qualitätskontrolle & Maximale Privatsphäre',
    compressor_seo_p2: 'Mit Cozuro Tools erhalten Sie einen Schieberegler, um die gewünschte Kompressionsqualität flexibel anzupassen. Das Beste daran ist, dass alles lokal in Ihrem Browser verarbeitet wird. Ihre privaten Fotos berühren niemals externe Server, was Ihnen absolute Datensicherheit und maximale Geschwindigkeit garantiert.',
    compressor_seo_h3: 'Einfache Schritte zur Bildkomprimierung',
    compressor_seo_step1: 'Laden Sie Ihr Bild über das obere Dateiauswahlfeld hoch.',
    compressor_seo_step2: 'Stellen Sie den Qualitätsregler ganz nach Ihren Wünschen ein.',
    compressor_seo_step3: 'Klicken Sie auf Komprimieren und laden Sie Ihr optimiertes Bild sofort herunter.',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function t(locale: Locale, key: TranslationKey): string {
  return (translations[locale] as Record<string, string>)[key] ?? (translations.en as Record<string, string>)[key] ?? key;
}