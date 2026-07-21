// src/data/docs/structure.js
// =============================================================================
// ESTRUCTURA DEL SIDEBAR DE LA DOCUMENTACIÓN
// =============================================================================
// Define la jerarquía de categorías y artículos que se muestra en el sidebar.
// El orden de las categorías en el array es el orden de aparición.
// El `order` dentro de cada categoría define el orden de los artículos.
//
// Convenciones:
//   - `id`         → identificador interno (no se muestra)
//   - `labelKey`   → clave i18n (ver labels.js)
//   - `slug`       → URL relativa (sin idioma), ej: "indicators/logic-footprint"
//   - `order`      → número de orden, menor = primero
//
// Para agregar una nueva categoría o artículo, agregalo al array.
// NO es necesario reiniciar nada: el sidebar y la búsqueda se regeneran solos.
// =============================================================================

export const DOCS_STRUCTURE = [
  {
    id: 'intro',
    labelKey: 'docs.category.intro',
    order: 1,
    items: [
      { slug: 'getting-started',  labelKey: 'docs.article.getting-started',  order: 1 },
      { slug: 'installation',     labelKey: 'docs.article.installation',     order: 2 },
    ],
  },
  {
    id: 'indicators',
    labelKey: 'docs.category.indicators',
    order: 2,
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
  {
    id: 'configuration',
    labelKey: 'docs.category.configuration',
    order: 3,
    items: [
      { slug: 'configuration',     labelKey: 'docs.article.configuration',     order: 1 },
    ],
  },
  {
    id: 'troubleshooting',
    labelKey: 'docs.category.troubleshooting',
    order: 4,
    items: [
      { slug: 'troubleshooting',   labelKey: 'docs.article.troubleshooting',   order: 1 },
    ],
  },
];

// Helper: dado un slug, devuelve la categoría y el item al que pertenece
export function findDocInStructure(slug) {
  for (const cat of DOCS_STRUCTURE) {
    const item = cat.items.find(i => i.slug === slug);
    if (item) return { category: cat, item };
  }
  return null;
}

// Helper: devuelve todos los slugs (para validar existencia o listar docs)
export function getAllSlugs() {
  return DOCS_STRUCTURE.flatMap(cat => cat.items.map(i => i.slug));
}
