// src/pages/Privacy.jsx
// Página /privacy — renderiza privacy.json usando el componente LegalPage
// (reutilizable con Terms).
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { LegalPage } from '../components/legal/LegalPage';

export const Privacy = () => {
  const { t } = useLanguage();
  return (
    <>
      <SEO
        title={t('seo.privacy.title')}
        description={t('seo.privacy.description')}
        type="website"
      />
      <LegalPage data={t('privacy')} />
    </>
  );
};
