// src/pages/RefundPolicy.jsx
// Página /refund-policy — renderiza refund.json usando el componente LegalPage.
import { useLanguage } from '../context/languageContext';
import { SEO } from '../components/SEO';
import { LegalPage } from '../components/legal/LegalPage';

export const RefundPolicy = () => {
  const { t } = useLanguage();
  return (
    <>
      <SEO
        title={t('seo.refund.title')}
        description={t('seo.refund.description')}
        type="website"
      />
      <LegalPage data={t('refund')} />
    </>
  );
};

