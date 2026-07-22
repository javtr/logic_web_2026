// src/data/docs/labels.js
// =============================================================================
// LABELS i18n DEL SIDEBAR DE DOCUMENTACIÓN
// =============================================================================
// Mantenemos los labels del sidebar separados de la estructura porque la
// estructura es la misma en ambos idiomas (mismo orden, mismo slug), solo
// cambian los textos.
//
// Sigue el mismo patrón que el resto de la app: las claves i18n (labelKey)
// referencian entradas en src/data/{en,es}/<archivo>.json.
// =============================================================================

export const DOCS_LABELS = {
  en: {
    'docs.category.intro':             'Introduction',
    'docs.category.indicators':        'Indicators',
    'docs.category.configuration':     'Configuration',
    'docs.category.troubleshooting':   'Troubleshooting',

    'docs.article.getting-started':    'Getting Started',
    'docs.article.installation':       'Installation',
    'docs.article.logic-footprint':    'Logic Footprint',
    'docs.article.logic-footer':       'Logic Footer',
    'docs.article.logic-profile':      'Volume Profile',
    'docs.article.logic-composite':    'Logic Composite',
    'docs.article.logic-bigtrades':    'Logic BigTrades',
    'docs.article.logic-analytics':    'Logic Analytics',
    'docs.article.logic-algorithms':   'Algorithms',
    'docs.article.configuration':      'General Settings',
    'docs.article.troubleshooting':    'Troubleshooting',

    // UI strings (no en sidebar, pero útiles para la página de docs)
    'docs.ui.search.placeholder':      'Search documentation…',
    'docs.ui.search.noResults':        'No results found',
    'docs.ui.search.shortcut':         'Press ⌘K to search',
    'docs.ui.onThisPage':              'On this page',
    'docs.ui.tableOfContents':         'Table of contents',
    'docs.ui.previous':                'Previous',
    'docs.ui.next':                    'Next',
    'docs.ui.breadcrumb.home':         'Home',
    'docs.ui.breadcrumb.docs':         'Documentation',
    'docs.ui.breadcrumb.dashboard':    'Members area',
    'docs.ui.notFound.title':          'Page not found',
    'docs.ui.notFound.description':    'The documentation page you are looking for does not exist.',
    'docs.ui.notFound.back':           '← Back to documentation',
    'docs.ui.notFound.home':           'Go to home',
  },
  es: {
    'docs.category.intro':             'Introducción',
    'docs.category.indicators':        'Indicadores',
    'docs.category.configuration':     'Configuración',
    'docs.category.troubleshooting':   'Solución de problemas',

    'docs.article.getting-started':    'Primeros pasos',
    'docs.article.installation':       'Instalación',
    'docs.article.logic-footprint':    'Logic Footprint',
    'docs.article.logic-footer':       'Logic Footer',
    'docs.article.logic-profile':      'Volume Profile',
    'docs.article.logic-composite':    'Logic Composite',
    'docs.article.logic-bigtrades':    'Logic BigTrades',
    'docs.article.logic-analytics':    'Logic Analytics',
    'docs.article.logic-algorithms':   'Algorithms',
    'docs.article.configuration':      'Configuración general',
    'docs.article.troubleshooting':    'Solución de problemas',

    'docs.ui.search.placeholder':      'Buscar en la documentación…',
    'docs.ui.search.noResults':        'Sin resultados',
    'docs.ui.search.shortcut':         'Pulsa ⌘K para buscar',
    'docs.ui.onThisPage':              'En esta página',
    'docs.ui.tableOfContents':         'Tabla de contenidos',
    'docs.ui.previous':                'Anterior',
    'docs.ui.next':                    'Siguiente',
    'docs.ui.breadcrumb.home':         'Inicio',
    'docs.ui.breadcrumb.docs':         'Documentación',
    'docs.ui.breadcrumb.dashboard':    'Zona de miembros',
    'docs.ui.notFound.title':          'Página no encontrada',
    'docs.ui.notFound.description':    'La página de documentación que buscas no existe.',
    'docs.ui.notFound.back':           '← Volver a documentación',
    'docs.ui.notFound.home':           'Ir al inicio',
  },
};

// Helper: obtiene un label por clave e idioma
export function getDocsLabel(key, language) {
  return DOCS_LABELS[language]?.[key] || DOCS_LABELS.en[key] || key;
}
