// src/components/Indicators/IndicatorDetail.jsx
// Página de detalle de un indicador.
//
// Estructura de la página (de arriba a abajo):
//   1. Título (h1) + Subtítulo (h2)
//   2. Imagen de cabecera
//   3. Bloques intercalados:  Párrafo 1 → Imagen → Párrafo 2 → Imagen → Párrafo 3 → Imagen → Párrafo 4
//   4. Botón "Volver a Indicadores"
//
// Contrato:
//   - paragraphs    : string[]  — array de 4 párrafos (uno por bloque)
//   - contentImages : string[]  — array de 3 srcs de imagen (sin el prefijo [0]); si está vacío o tiene
//                                  null, el slot de imagen se omite (no se renderiza <img> roto)
//   - content       : string    — LEGACY: párrafo único (longDescription). Se usa como fallback
//                                  cuando `paragraphs` está vacío o no es array. Mantener para
//                                  compat con IndicatorPage mientras se migra la data.
//   - title         : string    — usado en alt de imágenes y como h1
//   - subtitle      : string    — usado como h2 (tagline)
//   - image         : string    — src de la imagen de cabecera
import { Fragment } from 'react';
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import imgSample from '../../assets/indicators/sample_image.png';

export const IndicatorDetail = ({
  title,
  subtitle,
  image,
  contentImages = [],
  paragraphs = [],
  content = '',
}) => {
  const { t } = useLanguage();

  const hasParagraphs = Array.isArray(paragraphs) && paragraphs.length > 0;

  return (
    <section className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12 text-text-main">
      {/* 1. Título + subtítulo */}
      <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">{title}</h1>
      <h2 className="text-xl md:text-2xl text-accent-primary mb-3 md:mb-4">{subtitle}</h2>

      {/* 2. Imagen de cabecera */}
      <img
        src={image || imgSample}
        alt={title}
        className="w-full h-48 sm:h-60 md:h-72 object-cover rounded-lg mb-8 md:mb-12"
      />

      {/* 3. Bloques intercalados (P → IMG → P → IMG → P → IMG → P)
              o fallback al párrafo único legacy si no hay paragraphs. */}
      {hasParagraphs ? (
        paragraphs.map((paragraph, i) => (
          <Fragment key={i}>
            {i > 0 && contentImages[i - 1] && (
              <img
                src={contentImages[i - 1]}
                alt={`${title} - detalle ${i}`}
                className="w-full h-auto rounded-xl my-6 md:my-8"
              />
            )}
            <p className="text-base sm:text-lg leading-relaxed mb-6 md:mb-8">{paragraph}</p>
          </Fragment>
        ))
      ) : (
        <p className="text-base sm:text-lg leading-relaxed">{content}</p>
      )}

      {/* 4. Botón volver */}
      <div className="mt-6 md:mt-8">
        <Link to="/indicators" className="inline-block">
          <Button variant="outline" className="text-lg px-8 py-3">
            {t('indicatorPage.back')}
          </Button>
        </Link>
      </div>
    </section>
  );
};
