// src/pages/Indicators.jsx
import { useLanguage } from '../context/LanguageContext';
import { INDICATOR_ORDER } from '../data';
import { resolveImage } from '../data/imageResolver';
import { IndicatorInfo } from '../components/Indicators/IndicatorInfo';

export const Indicators = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-dark-900">
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-text-main tracking-tight mb-4">{t('indicatorsPage.title')}</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">{t('home.suiteSubtitle')}</p>
      </section>

      <section className="px-6 container mx-auto pb-24">
        <div className="grid grid-cols-1 gap-8 max-w-7xl mx-auto">
          {INDICATOR_ORDER.map((id) => {
            const name = t(`indicators.${id}.name`);
            const tagline = t(`indicators.${id}.tagline`);
            const shortDescription = t(`indicators.${id}.shortDescription`);
            const slug = t(`indicators.${id}.slug`);
            const imageKey = t(`indicators.${id}.imageKey`);
            return (
              <IndicatorInfo
                key={id}
                title={name}
                subtitle={tagline}
                description={shortDescription}
                image={resolveImage(imageKey)}
                buttonText={t('indicatorsPage.readMore')}
                slug={slug}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};
