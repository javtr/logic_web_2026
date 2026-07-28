// src/pages/FreeIndicators.jsx
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';

export const FreeIndicators = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title={t('seo.freeIndicators.title')}
        description={t('seo.freeIndicators.description')}
        type="website"
      />
      <div className="container mx-auto px-6 py-24 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-main mb-4 tracking-tight">
          {t('freeIndicators.title')}
        </h1>
        <p className="text-lg text-text-muted">
          {t('freeIndicators.subtitle')}
        </p>
      </div>

      <div className="bg-dark-800 border border-dark-700 rounded-3xl p-8 md:p-12">
        <p className="text-text-muted leading-relaxed text-base md:text-lg">
          {t('freeIndicators.content')}
        </p>
      </div>
    </div>
    </>
  );
};
