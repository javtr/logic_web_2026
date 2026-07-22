// src/components/HomeIndicatorCard.jsx
// NOTA: Este componente es EXCLUSIVO para la página de Home (suite premium).
// Es diferente a `IndicatorCard.jsx`, que se usa en la página de /indicators.
// No reutilizar fuera de Home — si necesitas una card de indicador en otra página,
// usa `IndicatorCard` o crea un componente nuevo específico para ese contexto.
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { ZoomableImage } from './ImageLightbox';

export const HomeIndicatorCard = ({
  title,
  subtitle,
  image,
  imageAlt,
  description,
  buttonText = 'Read more',
  slug,
}) => (
  <article className="group relative rounded-3xl bg-dark-800 border border-dark-700 hover:border-accent-secondary/50 transition-all duration-500 overflow-hidden hover:-translate-y-1">
    {/* Glow decorativo en hover */}
    <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-accent-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

    <div className="relative p-8 md:p-10 flex flex-col h-full">
      {/* 1. Título */}
      <h3 className="text-3xl font-bold text-text-main mb-2 transition-colors group-hover:text-accent-secondary">
        {title}
      </h3>

      {/* 2. Subtítulo */}
      {subtitle && (
        <p className="text-sm uppercase tracking-wider text-accent-secondary font-semibold mb-6">
          {subtitle}
        </p>
      )}

      {/* 3. Imagen */}
      {image && (
        <div className="overflow-hidden rounded-xl mb-6 bg-dark-900">
          <ZoomableImage
            src={image}
            alt={imageAlt || title}
            loading="lazy"
            className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* 4. Párrafo */}
      <p className="text-text-muted leading-relaxed mb-6 flex-grow">
        {description}
      </p>

      {/* 5. Botón → navega a la página de detalle del indicador */}
      <Link to={`/indicators/${slug}`} className="block w-full">
        <Button variant="primary" className="w-full">
          {buttonText}
        </Button>
      </Link>
    </div>
  </article>
);
