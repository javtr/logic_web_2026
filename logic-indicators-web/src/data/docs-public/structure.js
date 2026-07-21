// src/data/docs-public/structure.js
// =============================================================================
// ESTRUCTURA DEL SIDEBAR — DOCUMENTACIÓN PÚBLICA
// =============================================================================
// Mucho más simple que la versión privada: una sola categoría "Indicators"
// con los 7 indicators. NO hay páginas de intro, installation,
// configuration ni troubleshooting — esas son privadas.
//
// Las decisiones de producto (decididas con el usuario):
//   - Las 4 páginas no-indicators son 100% privadas
//     (getting-started, installation, configuration, troubleshooting)
//   - La docs pública existe solo para SEO + marketing + descubrimiento
//   - La docs detallada con parámetros vive detrás del login
// =============================================================================

export const DOCS_PUBLIC_STRUCTURE = [
  {
    id: 'indicators',
    labelKey: 'docs.category.indicators',
    order: 1,
    items: [
      { slug: 'indicators/logic-footprint',  labelKey: 'docs.article.logic-footprint',  order: 1 },
      { slug: 'indicators/logic-footer',    labelKey: 'docs.article.logic-footer',    order: 2 },
      { slug: 'indicators/logic-profile',   labelKey: 'docs.article.logic-profile',   order: 3 },
      { slug: 'indicators/logic-composite', labelKey: 'docs.article.logic-composite', order: 4 },
      { slug: 'indicators/logic-bigtrades', labelKey: 'docs.article.logic-bigtrades', order: 5 },
      { slug: 'indicators/logic-analytics', labelKey: 'docs.article.logic-analytics', order: 6 },
      { slug: 'indicators/logic-algorithms',labelKey: 'docs.article.logic-algorithms',order: 7 },
    ],
  },
];

// Helper: dado un slug, devuelve la categoría y el item al que pertenece
export function findDocInPublicStructure(slug) {
  for (const cat of DOCS_PUBLIC_STRUCTURE) {
    const item = cat.items.find(i => i.slug === slug);
    if (item) return { category: cat, item };
  }
  return null;
}

// Helper: devuelve todos los slugs (para validar existencia o listar docs)
export function getAllPublicSlugs() {
  return DOCS_PUBLIC_STRUCTURE.flatMap(cat => cat.items.map(i => i.slug));
}
