// src/components/Indicators/IndicatorInfo.jsx
// Card de indicador para la página /indicators.
//
// Estructura del source order (también es el orden visual en mobile):
//   1. Título + subtítulo
//   2. Imagen
//   3. Descripción + botón
//
// En mobile se renderiza en ese orden natural (grid de 1 columna).
// En desktop (md+) se reorganiza con CSS Grid para que se vea:
//   ┌────────────────┬────────────────┐
//   │ Título         │ Descripción    │  ← fila 1
//   │ Subtítulo      │ [ Botón ]      │
//   ├────────────────┴────────────────┤  ← border-t sobre la imagen
//   │            Imagen              │  ← fila 2 (col-span-2)
//   └─────────────────────────────────┘
//
// Imagen: por defecto muestra un carousel automático con las contentImages
// del indicador (cross-fade, sin controles, pausa en hover). Si solo hay 1,
// renderiza esa imagen con lightbox. Si no hay contentImages, cae al `image`
// de cabecera (mantiene el comportamiento legacy).
//
// Accesibilidad: el orden del DOM es siempre título → imagen → descripción.
// En mobile coincide con el orden visual. En desktop el orden de lectura
// para screen readers difiere levemente del visual, pero para una card de
// listado el impacto es bajo.
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import { ZoomableImage } from '../ImageLightbox';
import { AutoCarousel } from '../AutoCarousel';

export const IndicatorInfo = ({ title, subtitle, description, image, contentImages, buttonText, slug }) => {
  // 2+ contentImages → AutoCarousel
  // 1 contentImage   → ZoomableImage simple
  // 0 contentImages  → fallback a `image` (legacy)
  const hasCarousel = Array.isArray(contentImages) && contentImages.length >= 2;
  const singleDetail = Array.isArray(contentImages) && contentImages.length === 1;

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-3xl overflow-hidden">
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-y-4
        md:gap-x-8
        p-4 md:p-8
      ">
        {/* 1. Título + subtítulo
              - mobile: fila 1 (auto-place)
              - desktop: col 1, fila 1 */}
        <div className="w-full md:col-start-1 md:row-start-1">
          <h3 className="text-3xl font-bold text-text-main">{title}</h3>
          <h4 className="text-xl font-semibold text-text-muted mt-2">{subtitle}</h4>
        </div>

        {/* 2. Imagen
              - mobile: fila 2 (auto-place)  ← orden mobile
              - desktop: fila 2, col-span-2 (full width) */}
        <div className="
          md:col-span-2
          md:row-start-2
          sm:px-4 md:px-8
          md:pt-4 md:border-t md:border-dark-700
        ">
          <div className="h-48 sm:h-64 md:h-80 w-full relative">
            {hasCarousel ? (
              <AutoCarousel
                images={contentImages}
                alt={title}
                imageClassName="w-full h-full object-cover rounded-2xl"
              />
            ) : singleDetail ? (
              <ZoomableImage
                src={contentImages[0]}
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : image ? (
              <ZoomableImage
                src={image}
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : null}
          </div>
        </div>

        {/* 3. Descripción + botón
              - mobile: fila 3 (auto-place)  ← orden mobile
              - desktop: col 2, fila 1 */}
        <div className="
          w-full
          flex flex-col items-start gap-3
          md:col-start-2 md:row-start-1
        ">
          <p className="text-lg font-medium text-text-muted">{description}</p>
          <Link to={`/indicators/${slug}`} className="inline-block w-full">
            <Button variant="primary" className="text-sm px-4 py-1.5">
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
