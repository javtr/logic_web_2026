// src/pages/Indicators.jsx
// Página /indicators. Estructura:
//   1. Hero de texto    → título + subtítulo (ambos editables desde indicatorsPage.json)
//   2. Banner full-bleed → imagen general (imageKey controlado desde indicatorsPage.json)
//   3. Grilla de tarjetas → una por cada indicador activo (filtrado por JSON)
//
// El subtítulo y la imagen son específicos de esta página (no se reutilizan de home.json)
// para que se puedan editar de forma independiente del Home.
import { useLanguage } from '../context/languageContext';
import { SEO } from '../components/SEO';
import { getActiveIndicatorIds } from '../data';
import { resolveImage } from '../data/imageResolver';
import { IndicatorInfo } from '../components/Indicators/IndicatorInfo';

export const Indicators = () => {
  const { t, language } = useLanguage();
  const activeIndicators = getActiveIndicatorIds(language);

  return (
    <>
      <SEO
        title={t('seo.indicators.title')}
        description={t('seo.indicators.description')}
        type="website"
      />
      <div className="min-h-screen bg-dark-900">
      {/* 1. HERO DE TEXTO */}
      <section className="pt-16 md:pt-32 pb-12 px-6 text-center bg-[radial-gradient(ellipse_600px_200px_at_center_top,theme(colors.accent.primary/10%)_0%,transparent_70%)]">
        <h1 className="text-4xl md:text-5xl font-bold text-text-main tracking-tight mb-4 whitespace-pre-line">
          {t('indicatorsPage.title')}
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          {t('indicatorsPage.subtitle')}
        </p>
      </section>

      {/* 2. IMAGEN GENERAL — full-bleed entre el hero y la grilla */}
      <section className="w-full pb-16">
        <img
          src={resolveImage(t('indicatorsPage.heroImage'))}
          alt="Logic Indicators suite overview"
          className="w-full h-auto block"
        />
      </section>

      {/* 3. GRILLA DE TARJETAS */}
      <section className="px-6 container mx-auto pb-24">
        <div className="grid grid-cols-1 gap-12 max-w-7xl mx-auto">
          {activeIndicators.map((id) => {
            const name = t(`indicators.${id}.name`);
            const tagline = t(`indicators.${id}.tagline`);
            const shortDescription = t(`indicators.${id}.shortDescription`);
            const slug = t(`indicators.${id}.slug`);
            const imageKey = t(`indicators.${id}.imageKey`);
            // contentImages del detail page: si hay 2+ → carousel; 1 → imagen
            // simple; 0 → fallback a `image` de cabecera.
            const contentImages = (t(`indicators.${id}.contentImages`) || [])
              .map(resolveImage)
              .filter(Boolean);
            return (
              <IndicatorInfo
                key={id}
                title={name}
                subtitle={tagline}
                description={shortDescription}
                image={resolveImage(imageKey)}
                contentImages={contentImages}
                buttonText={t('indicatorsPage.readMore')}
                slug={slug}
                pack={t(`indicators.${id}.pack`)}
              />
            );
          })}
        </div>
      </section>
    </div>
    </>
  );
};
