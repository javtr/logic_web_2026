// src/data/docs-public/labels.js
// =============================================================================
// LABELS i18n DEL SIDEBAR DE DOCUMENTACIÓN — MÓDULO PÚBLICO
// =============================================================================
// La docs pública es más simple: solo tiene la categoría "Indicators"
// con los 7 indicators (sin intro, sin configuration, sin troubleshooting).
// Eso simplifica el sidebar — no hay jerarquía compleja.
//
// Mantenemos los UI strings globales (search, TOC, notFound, etc.) para
// que el componente DocsPublic.jsx pueda reusar el mismo DocsLayout.
// =============================================================================

export const DOCS_PUBLIC_LABELS = {
  en: {
    'docs.category.indicators':        'Indicators',

    'docs.article.logic-footprint':    'Logic Footprint',
    'docs.article.logic-footer':       'Logic Footer',
    'docs.article.logic-profile':      'Logic Profile',
    'docs.article.logic-composite':    'Logic Composite',
    'docs.article.logic-bigtrades':    'Logic BigTrades',
    'docs.article.logic-analytics':    'Logic Analytics',
    'docs.article.logic-algorithms':   'Logic Algorithms',
    'docs.article.logic-depth-chart':  'Logic Depth Chart',
    'docs.article.logic-depth-live':   'Logic Depth Live',

    // UI strings (compartidos con el módulo privado conceptualmente,
    // duplicados acá para no generar dependencia cruzada)
    'docs.ui.search.placeholder':      'Search documentation…',
    'docs.ui.search.noResults':        'No results found',
    'docs.ui.search.shortcut':         'Press ⌘K to search',
    'docs.ui.onThisPage':              'On this page',
    'docs.ui.tableOfContents':         'Table of contents',
    'docs.ui.previous':                'Previous',
    'docs.ui.next':                    'Next',
    'docs.ui.breadcrumb.home':         'Home',
    'docs.ui.breadcrumb.docs':         'Documentation',
    'docs.ui.notFound.title':          'Page not found',
    'docs.ui.notFound.description':    'The documentation page you are looking for does not exist.',
    'docs.ui.notFound.back':           '← Back to documentation',
    'docs.ui.notFound.home':           'Go to home',
  },
  es: {
    'docs.category.indicators':        'Indicadores',

    'docs.article.logic-footprint':    'Logic Footprint',
    'docs.article.logic-footer':       'Logic Footer',
    'docs.article.logic-profile':      'Logic Profile',
    'docs.article.logic-composite':    'Logic Composite',
    'docs.article.logic-bigtrades':    'Logic BigTrades',
    'docs.article.logic-analytics':    'Logic Analytics',
    'docs.article.logic-algorithms':   'Logic Algorithms',
    'docs.article.logic-depth-chart':  'Logic Depth Chart',
    'docs.article.logic-depth-live':   'Logic Depth Live',

    'docs.ui.search.placeholder':      'Buscar en la documentación…',
    'docs.ui.search.noResults':        'Sin resultados',
    'docs.ui.search.shortcut':         'Pulsa ⌘K para buscar',
    'docs.ui.onThisPage':              'En esta página',
    'docs.ui.tableOfContents':         'Tabla de contenidos',
    'docs.ui.previous':                'Anterior',
    'docs.ui.next':                    'Siguiente',
    'docs.ui.breadcrumb.home':         'Inicio',
    'docs.ui.breadcrumb.docs':         'Documentación',
    'docs.ui.notFound.title':          'Página no encontrada',
    'docs.ui.notFound.description':    'La página de documentación que buscas no existe.',
    'docs.ui.notFound.back':           '← Volver a documentación',
    'docs.ui.notFound.home':           'Ir al inicio',
  },
};

export function getDocsPublicLabel(key, language) {
  return DOCS_PUBLIC_LABELS[language]?.[key]
      || DOCS_PUBLIC_LABELS.en[key]
      || key;
}
