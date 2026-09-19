// src/components/BreadcrumbJsonLd.jsx
// =============================================================================
// JSON-LD: BreadcrumbList
// =============================================================================
// Datos estructurados Schema.org para migas de pan (breadcrumbs).
// Muestra a Google la jerarquía de navegación de la página (ej. Inicio > Indicadores > Logic Footprint)
// en lugar de una URL plana en la SERP.
// =============================================================================

import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://logicindicators.com';

export const BreadcrumbJsonLd = ({ items = [] }) => {
  if (!Array.isArray(items) || items.length === 0) return null;

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path.startsWith('http') ? item.path : `${SITE_URL}${item.path}`,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </Helmet>
  );
};
