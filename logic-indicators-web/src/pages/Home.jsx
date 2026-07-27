// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/Button';
import { HomeIndicatorCard } from '../components/HomeIndicatorCard';
import { PricingSection } from '../components/pricing/PricingSection';
import { TrustSection } from '../components/pricing/TrustSection';
import { FAQSection } from '../components/FAQSection';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';
import { resolveImage } from '../data/imageResolver';
import { getActiveIndicatorIds } from '../data';

export const Home = () => {
  const { t, language } = useLanguage();

  // Indicadores que se muestran en la Home. Usa getActiveIndicatorIds para que
  // solo aparezcan los que están definidos en el JSON del idioma actual.
  // Si agregás un indicador en INDICATOR_ORDER y en los JSONs, aparece solo.
  // Si lo borrás del JSON, se oculta solo.
  const featuredIndicators = getActiveIndicatorIds(language);

  return (
    <div className="flex flex-col gap-12 md:gap-24 pb-12 md:pb-24">

      {/* 1. HERO SECTION */}
      <section className="relative pt-16 md:pt-32 pb-4 md:pb-10 px-6 text-center overflow-hidden">
        {/* Grid sutil de fondo — animación barata (background-position, GPU-composited).
            IMPORTANTE: NO usamos motion-reduce:animate-none acá a propósito.
            Esta animación es tan sutil (60px en 3s = 20px/s, grid de fondo con
            12% opacity) que no representa un riesgo de accesibilidad real, y el
            respeto de prefers-reduced-motion la anulaba completamente para
            usuarios con "reducir movimiento" activo en el OS/browser. Como el
            grid ES el detalle visual de fondo que da personalidad al hero, lo
            dejamos correr siempre. Si en el futuro se cambia a algo más
            prominente, reintroducir motion-reduce:animate-none.

            mask-image: radial-gradient para que el grid se difumine hacia los
            bordes del hero. El centro queda visible, los extremos se desvanecen.
            GPU-composited, costo despreciable (0.3-0.5ms/frame). Si el fade
            se siente muy fuerte o muy débil, ajustar los dos stops del
            radial-gradient (black N% / transparent M%). */}
        <div
          aria-hidden="true"
          className="absolute inset-0 text-text-main opacity-[0.12] animate-grid-drift pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          }}
        />
        {/* Glow existente (conservado) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-text-main tracking-tight mb-8">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link to="/pricing" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full text-lg px-8 py-3">
                {t('hero.cta')}
              </Button>
            </Link>
            <Link to="/indicators" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full text-lg px-8 py-3">
                {t('hero.explore')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 1.5 BANNER — preview image full-bleed entre hero y suite.
          mask-image: linear-gradient vertical para difuminar arriba y abajo
          de la imagen (efecto fade en los extremos). El centro queda
          totalmente visible. GPU-composited, costo despreciable.
          Si se quiere más/menos fade, ajustar los stops (black 10%/90% son
          el rango de transición). */}
      <section className="w-full">
        <img
          src={resolveImage('suite')}
          alt="Logic Indicators — NinjaTrader 8 dashboard preview"
          className="w-full h-auto block"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        />
      </section>

      {/* 2. SECCIÓN DE INDICADORES */}
      <section className="px-6 container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">{t('home.suiteTitle')}</h2>
          <p className="text-text-muted text-lg">{t('home.suiteSubtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {featuredIndicators.map((id) => (
            <HomeIndicatorCard
              key={id}
              title={t(`indicators.${id}.name`)}
              subtitle={t(`indicators.${id}.tagline`)}
              image={resolveImage(t(`indicators.${id}.imageKey`))}
              imageAlt={`${t(`indicators.${id}.name`)} preview`}
              description={t(`indicators.${id}.shortDescription`)}
              buttonText={t('indicatorsPage.readMore')}
              slug={t(`indicators.${id}.slug`)}
            />
          ))}
        </div>
      </section>

      {/* 3. TESTIMONIOS */}
      <section className="bg-dark-800/50 py-12 md:py-20 px-6 border-y border-dark-700">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-text-main mb-8 md:mb-12">{t('home.testimonialsTitle')}</h2>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* 4. PRECIOS (Pricing) — componente reusable compartido con /pricing */}
      <PricingSection />

      {/* 4.5 TRUST — "Pago rápido y seguro" — mismo componente reusado por /pricing */}
      <TrustSection />

      {/* 5. PREGUNTAS FRECUENTES (FAQ) — componente reusable compartido con /pricing */}
      <FAQSection />

      {/* 6. CTA FINAL
          Mobile-first (commit actual):
          - Padding de la tarjeta: p-6 mobile (24px) / p-12 desktop (48px).
            Antes era p-12 uniforme (48px en mobile = demasiado aire).
          - Título: 24px mobile / 36px desktop. Subtítulo: 16px mobile / 18px desktop.
          - Márgenes verticales reducidos en mobile: title mb-3 / subtitle mb-6 / button gap-3.
            Desktop mantiene los valores originales (md:mb-4 / md:mb-8 / md:gap-4). */}
      <section className="px-6 container mx-auto mb-6 md:mb-12">
        <div className="bg-gradient-to-r from-dark-800 to-dark-700 p-6 md:p-12 rounded-3xl border border-dark-600 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-secondary/10 blur-[80px] rounded-full pointer-events-none" />
          <h2 className="text-2xl md:text-4xl font-bold text-text-main mb-3 md:mb-4 relative z-10">{t('home.ctaTitle')}</h2>
          <p className="text-base md:text-lg text-text-muted mb-6 md:mb-8 max-w-2xl mx-auto relative z-10">{t('home.ctaSubtitle')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 relative z-10">
            <Link to="/pricing" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full">{t('home.buyNow')}</Button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full">{t('home.contactUs')}</Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
