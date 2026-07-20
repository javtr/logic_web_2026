// src/pages/Privacy.jsx
// Página /privacy — renderiza privacy.json usando el componente LegalPage
// (reutilizable con Terms).
import { useLanguage } from '../context/LanguageContext';
import { LegalPage } from '../components/legal/LegalPage';

export const Privacy = () => {
  const { t } = useLanguage();
  return <LegalPage data={t('privacy')} />;
};
