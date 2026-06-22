import { useLanguage } from '../context/LanguageContext';
import indicatorsData from '../data/indicators';
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
          {indicatorsData.map((ind) => {
            // Resolver traducciones usando el translationKey
            const translatedTitle = t(`indicators.${ind.translationKey}.title`);
            const translatedSubtitle = t(`indicators.${ind.translationKey}.subtitle`);
            return (
              <IndicatorInfo
                key={ind.id}
                title={translatedTitle}
                subtitle={translatedSubtitle}
                description={ind.description}
                image={ind.image}
                buttonText={t('indicatorsPage.readMore')}
                slug={ind.slug}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};
