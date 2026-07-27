// src/pages/Pricing.jsx
// Página /pricing. Composición pura — toda la lógica vive en los componentes,
// todo el texto viene de pricing.json / pricingFaq.json.
//
// Componentes (todos extraídos y reusables, compartidos con Home):
//   1. <PromoBanner />       → render condicional según pricing.promotion.enabled
//   2. <PricingSection />    → toggle Yearly ⇄ Lifetime + 2 cards (highlighted via JSON)
//   3. <TrustSection />      → SSL + medios de pago
//   4. <FAQSection />        → usa namespace 'pricingFaq' (preguntas transaccionales, distintas a Home)
import { useLanguage } from '../context/LanguageContext';
import { PromoBanner } from '../components/pricing/PromoBanner';
import { PricingSection } from '../components/pricing/PricingSection';
import { TrustSection } from '../components/pricing/TrustSection';
import { FAQSection } from '../components/FAQSection';

export const Pricing = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-24 pb-24">
      <PromoBanner />

      <section className="pt-16 md:pt-32 pb-2 md:pb-8 px-6 text-center bg-[radial-gradient(ellipse_600px_200px_at_center_top,theme(colors.accent.primary/10%)_0%,transparent_70%)]">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-main mb-4">
          {t('pricing.pageTitle')}
        </h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          {t('pricing.pageSubtitle')}
        </p>
      </section>

      <PricingSection titleKey="pricing.sectionTitle" />

      <TrustSection />

      <FAQSection namespace="pricingFaq" titleKey="pricing.faqTitle" />
    </div>
  );
};