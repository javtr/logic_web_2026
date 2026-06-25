// src/pages/IndicatorPage.jsx
import { useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { INDICATOR_ORDER } from '../data';
import { resolveImage } from '../data/imageResolver';
import { IndicatorDetail } from '../components/Indicators/IndicatorDetail';

export const IndicatorPage = () => {
  const { slug } = useParams();
  const { t } = useLanguage();

  // Buscar el indicador cuyo slug coincide con el de la URL
  const indicatorId = INDICATOR_ORDER.find((id) => t(`indicators.${id}.slug`) === slug);

  if (!indicatorId) return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-text-muted">No encontrado</div>;

  const name = t(`indicators.${indicatorId}.name`);
  const tagline = t(`indicators.${indicatorId}.tagline`);
  const longDescription = t(`indicators.${indicatorId}.longDescription`);
  const imageKey = t(`indicators.${indicatorId}.imageKey`);

  return (
    <IndicatorDetail
      title={name}
      subtitle={tagline}
      image={resolveImage(imageKey)}
      content={longDescription}
    />
  );
};
