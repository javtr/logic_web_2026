// src/pages/IndicatorPage.jsx
// Página /indicators/:slug. Resuelve el indicador por slug, extrae la data del JSON
// y se la pasa a <IndicatorDetail />.
//
// La data del indicador vive en `src/data/{en,es}/indicators.json` bajo el id correspondiente.
// Cada indicador soporta dos modos de contenido:
//   - paragraphs    (array de strings) + contentImages (array de imageKeys): layout enriquecido
//   - longDescription (string)                                            : layout legacy
// Si `paragraphs` está presente y es no vacío, se usa el layout nuevo. Si no, fallback al legacy.
import { useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getActiveIndicatorIds } from '../data';
import { resolveImage } from '../data/imageResolver';
import { IndicatorDetail } from '../components/Indicators/IndicatorDetail';

export const IndicatorPage = () => {
  const { slug } = useParams();
  const { t, language } = useLanguage();

  // Buscar el indicador activo (existe en el JSON del idioma actual) cuyo slug
  // coincide con el de la URL. Si el indicador no está activo, no se encuentra
  // y se muestra "No encontrado".
  const indicatorId = getActiveIndicatorIds(language).find(
    (id) => t(`indicators.${id}.slug`) === slug
  );

  if (!indicatorId) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center text-text-muted">
        {t('indicatorPage.notFound')}
      </div>
    );
  }

  const name = t(`indicators.${indicatorId}.name`);
  const tagline = t(`indicators.${indicatorId}.tagline`);
  const longDescription = t(`indicators.${indicatorId}.longDescription`);
  const imageKey = t(`indicators.${indicatorId}.imageKey`);

  // Layout nuevo (opcional). Si el JSON no los trae, queda array vacío y el componente
  // cae automáticamente al layout legacy con `longDescription`.
  const paragraphs = t(`indicators.${indicatorId}.paragraphs`) || [];
  // Filtramos null/undefined para que el componente no intente resolver imágenes vacías.
  // (Si el imageKey es válido, resolveImage devuelve la URL; si no, devuelve el fallback
  // sample_image, que es lo que queremos en lugar de un <img> roto.)
  const contentImages = (t(`indicators.${indicatorId}.contentImages`) || [])
    .filter(Boolean)
    .map(resolveImage);

  return (
    <IndicatorDetail
      title={name}
      subtitle={tagline}
      image={resolveImage(imageKey)}
      contentImages={contentImages}
      paragraphs={paragraphs}
      content={longDescription}
    />
  );
};
