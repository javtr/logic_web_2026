// src/pages/Terms.jsx
// Página /terms — renderiza terms.json usando el componente LegalPage
// (reutilizable con Privacy).
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { LegalPage } from '../components/legal/LegalPage';

export const Terms = () => {
  const { t } = useLanguage();
  return (
    <>
      <SEO
        title={t('seo.terms.title')}
        description={t('seo.terms.description')}
        type="website"
      />
      <LegalPage data={t('terms')} />
    </>
  );
};
