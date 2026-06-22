import { useParams } from 'react-router-dom';
import { IndicatorDetail } from '../components/Indicators/IndicatorDetail';
import indicators from '../data/indicators.js';
import { useLanguage } from '../context/LanguageContext';

export const IndicatorPage = () => {
  const { slug } = useParams();
  const { t } = useLanguage();
  const data = indicators.find((i) => i.slug === slug);
  
  if (!data) return <div>No encontrado</div>;
  
  // Get translations using the translationKey
  const translatedContent = t(`indicators.${data.translationKey}.content`);
  const translatedTitle = t(`indicators.${data.translationKey}.title`);
  const translatedSubtitle = t(`indicators.${data.translationKey}.subtitle`);
  
  return (
    <IndicatorDetail
      title={translatedTitle}
      subtitle={translatedSubtitle}
      image={data.image}
      content={translatedContent}
    />
  );
};