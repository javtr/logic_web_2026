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

      <section className="relative overflow-hidden pt-16 md:pt-32 pb-2 md:pb-8 px-6 text-center">
        {/* Glow decorativo de fondo para que el header no se vea tan plano. */}
        {/* Sigue el mismo patron que el hero de Home: blob con accent-primary */}
        {/* en 10% opacidad, blur fuerte, detras del contenido (relative z-10). */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-accent-primary/10 blur-[100px] rounded-full pointer-events-none"
        />
        <h1 className="relative z-10 text-4xl md:text-5xl font-extrabold text-text-main mb-4">
          {t('pricing.pageTitle')}
        </h1>
        <p className="relative z-10 text-text-muted text-lg max-w-2xl mx-auto">
          {t('pricing.pageSubtitle')}
        </p>
      </section>

      <PricingSection titleKey="pricing.sectionTitle" />

      <TrustSection />

      <FAQSection namespace="pricingFaq" titleKey="pricing.faqTitle" />
    </div>
  );
};