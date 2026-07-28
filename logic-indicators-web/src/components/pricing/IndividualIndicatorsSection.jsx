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
//   │  [imagen]           │
//   │                     │
//   │  Footprint          │   ← nombre del primary
//   │  + Footer           │   ← solo si es bundle
//   │  $199               │
//   │  [ Buy Now ]        │
//   └─────────────────────┘
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

import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../Button';
import { ZoomableImage } from '../ImageLightbox';
import { resolveImage } from '../../data/imageResolver';
import { Package } from 'lucide-react';

const ProductCard = ({ product, t, section }) => {
  // Datos del indicator primary (nombre, imageKey)
  const primaryName = t(`indicators.${product.primaryIndicatorId}.name`);
  const primaryImageKey = t(`indicators.${product.primaryIndicatorId}.imageKey`);

  // Si tiene secondary, lo mostramos como subtítulo "+ Footer" / "+ Composite"
  const isBundle = Boolean(product.secondaryIndicatorId);
  const secondaryName = isBundle
    ? t(`indicators.${product.secondaryIndicatorId}.name`)
    : null;

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
          alt={primaryName}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Contenido: nombre + (subtitle si es bundle) + precio + botón */}
      <div className="flex flex-col flex-grow p-4 gap-3">
        <div>
          <h3 className="text-base font-bold text-text-main leading-tight">
            {primaryName}
          </h3>
          {isBundle && (
            <p className="text-xs text-text-muted mt-0.5">
              {section.bundleSubtitle.replace('{secondary}', secondaryName)}
            </p>
          )}
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-extrabold text-text-main">
            {section.currencySymbol}{section.defaultPrice}
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
