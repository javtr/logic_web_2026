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
import { Layers, Zap, Sliders } from 'lucide-react';

const ADVANTAGE_ICONS = {
  Layers,
  Zap,
  Sliders,
};

const ADVANTAGE_STYLES = [
  {
    iconBg: 'bg-accent-primary/10 text-accent-primary border-accent-primary/20',
    badge: 'bg-accent-primary/10 text-accent-primary border-accent-primary/20',
  },
  {
    iconBg: 'bg-accent-secondary/10 text-accent-secondary border-accent-secondary/20',
    badge: 'bg-accent-secondary/10 text-accent-secondary border-accent-secondary/20',
  },
  {
    iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
];

export const Indicators = () => {
  const { t, language } = useLanguage();
  const activeIndicators = getActiveIndicatorIds(language);
  const advantages = t('indicatorsPage.advantages');
  const advantageList = Array.isArray(advantages) ? advantages : [];

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

      {/* 2. IMAGEN GENERAL — full-bleed entre el hero y las ventajas */}
      <section className="w-full pb-12 md:pb-16">
        <img
          src={resolveImage(t('indicatorsPage.heroImage'))}
          alt="Logic Indicators suite overview"
          className="w-full h-auto block"
        />
      </section>

      {/* 2.5 VENTAJAS DE LA SUITE COMPLETA */}
      {advantageList.length > 0 && (
        <section className="px-6 container mx-auto pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {advantageList.map((adv, idx) => {
                const IconComponent = ADVANTAGE_ICONS[adv.icon] || Layers;
                const style = ADVANTAGE_STYLES[idx % ADVANTAGE_STYLES.length];

                return (
                  <div
                    key={adv.id || idx}
                    className="bg-dark-800/80 border border-dark-700/80 hover:border-dark-600 p-6 md:p-7 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-dark-900/50 group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-5">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center border ${style.iconBg} transition-transform group-hover:scale-105`}
                        >
                          <IconComponent size={22} />
                        </div>
                        <span
                          className={`text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full border ${style.badge}`}
                        >
                          {adv.badge}
                        </span>
                      </div>

                      <h3 className="text-lg md:text-xl font-bold text-text-main mb-3 leading-snug">
                        {adv.title}
                      </h3>

                      <p className="text-text-muted text-sm leading-relaxed">
                        {adv.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

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
              />
            );
          })}
        </div>
      </section>
    </div>
    </>
  );
};
