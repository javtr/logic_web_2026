// src/pages/Terms.jsx
// Página /terms — renderiza terms.json usando el componente LegalPage
// (reutilizable con Privacy).
import { useLanguage } from '../context/LanguageContext';
import { LegalPage } from '../components/legal/LegalPage';

export const Terms = () => {
  const { t } = useLanguage();
  return <LegalPage data={t('terms')} />;
};
