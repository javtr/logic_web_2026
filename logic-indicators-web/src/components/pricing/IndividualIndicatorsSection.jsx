// src/components/pricing/IndividualIndicatorsSection.jsx
// =============================================================================
// SECCIÓN "COMPRAR INDIVIDUALMENTE" — reutilizable en /pricing y (futuro) Home.
// =============================================================================
// Renderiza una grilla compacta de cards (1/2/3/4/5 cols responsive) con los
// productos definidos en `individualPricing.json` (namespace `individualPricing`).
//
// Estructura de cada card (compacto, sin descripción, sin carousel — el
// usuario puede hacer click en el nombre para ir al detalle del indicator):
//
//   ┌─────────────────────┐
//   │  [imagen]      [PAQ]│  ← badge "PAQUETE" solo si es bundle
//   │                     │
//   │  Footprint + Footer │ ← bundles: ambos en el título
//   │  $199               │
//   │  [ Buy Now ]        │
//   └─────────────────────┘
//
// Para bundles, el secondary va en el TÍTULO (mismo tamaño y peso que el
// primary) — antes era un subtítulo "+ Footer" en gris, que le daba
// muy poca importancia. El badge "PAQUETE" sigue marcando visualmente
// que la card contiene 2 productos antes de que el usuario lea el título.
//
// Fuente de verdad de TODO (precios, URLs, lista de productos) está en el
// JSON correspondiente. El componente no tiene valores hardcodeados —
// agregar/quitar/ocultar un producto es solo editar el JSON.
//
// Badges "Bundle" / "Paquete" se muestran solo en productos que tienen
// `secondaryIndicatorId` (es decir, los bundles).
//
// Si el array `products` está vacío (caso defensivo), se muestra el
// `emptyMessage` en lugar de una grilla vacía.
// =============================================================================

import { useLanguage } from '../../context/languageContext';
import { Button } from '../Button';
import { ZoomableImage } from '../ImageLightbox';
import { resolveImage } from '../../data/imageResolver';
import { Package } from 'lucide-react';

const ProductCard = ({ product, t, section }) => {
  // Datos del indicator primary (nombre, imageKey)
  const primaryName = t(`indicators.${product.primaryIndicatorId}.name`);
  const primaryImageKey = t(`indicators.${product.primaryIndicatorId}.imageKey`);

  // Si tiene secondary, lo concatenamos AL TÍTULO (no como subtítulo).
  // El usuario pidió que el secondary tenga la misma importancia visual
  // que el primary — antes era "+ Footer" en gris pequeño, ahora es
  // "Logic Footprint + Footer" en el mismo tamaño y peso que el título.
  // El badge "Bundle" / "Paquete" sigue marcando visualmente que es un
  // bundle (es la señal rápida, antes que el usuario lea el título).
  const isBundle = Boolean(product.secondaryIndicatorId);
  const secondaryName = isBundle
    ? t(`indicators.${product.secondaryIndicatorId}.name`)
    : null;
  const cardTitle = isBundle
    ? `${primaryName} ${section.bundleTitleAppend.replace('{secondary}', secondaryName)}`
    : primaryName;

  return (
    <article className="group relative flex flex-col bg-dark-800 border border-dark-700 hover:border-accent-secondary/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5">
      {/* Badge "Bundle" — solo si es bundle. absolute top-right de la card. */}
      {isBundle && (
        <div className="absolute top-2 right-2 z-10 inline-flex items-center gap-1 bg-accent-secondary/20 text-accent-secondary text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md">
          <Package size={10} />
          {section.bundleBadge}
        </div>
      )}

      {/* Imagen: 1 imagen estática del primary, aspect 4:3 (compacto). No
          usamos carousel acá — la idea es ser transaccional, no editorial. */}
      <div className="aspect-[4/3] w-full bg-dark-900 overflow-hidden">
        <ZoomableImage
          src={resolveImage(primaryImageKey)}
          alt={cardTitle}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Contenido: título (incluye "+ Secondary" si es bundle) + precio + botón */}
      <div className="flex flex-col flex-grow p-4 gap-3">
        <div>
          <h3 className="text-base font-bold text-text-main leading-tight">
            {cardTitle}
          </h3>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-extrabold text-text-main">
            {/* Override por producto: si el JSON define `price` en un
                product, ese gana. Si no, cae al defaultPrice global. */}
            {section.currencySymbol}{product.price ?? section.defaultPrice}
          </span>
          <span className="text-xs text-text-muted">
            / {section.defaultBillingPeriod}
          </span>
        </div>

        {/* Botón: <a> con target="_blank" para que el checkout abra en
            pestaña nueva y el usuario no pierda la nuestra. */}
        <a
          href={product.checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full mt-auto"
        >
          <Button variant="primary" className="w-full text-sm px-4 py-2">
            {section.cta}
          </Button>
        </a>
      </div>
    </article>
  );
};

export const IndividualIndicatorsSection = () => {
  const { t } = useLanguage();
  const section = t('individualPricing');
  const products = Array.isArray(section.products) ? section.products : [];

  return (
    <section className="px-6 container mx-auto">
      {/* Header centrado — mismo patrón que el resto de secciones de pricing */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-2">
          {section.title}
        </h2>
        <p className="text-text-muted text-sm md:text-base max-w-2xl mx-auto">
          {section.subtitle}
        </p>
      </div>

      {/* Empty state defensivo: si alguien deja el array vacío, no
          mostramos una sección vacía fea. */}
      {products.length === 0 ? (
        <p className="text-center text-text-muted italic">{section.emptyMessage}</p>
      ) : (
        // Grid responsive: 1 col (mobile) → 2 (sm) → 3 (md) → 4 (lg) → 5 (xl).
        // 5 cols en xl acomoda los 5 productos en una sola fila en pantallas
        // grandes, lo cual da una vista tipo "catálogo" muy limpia.
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              t={t}
              section={section}
            />
          ))}
        </div>
      )}
    </section>
  );
};
