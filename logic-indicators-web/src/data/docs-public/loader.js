// src/data/docs-public/loader.js
// =============================================================================
// LOADER DE DOCUMENTOS MARKDOWN — MÓDULO PÚBLICO
// =============================================================================
// Idéntico en estructura a docs-private/loader.js, pero apunta a la carpeta
// /src/docs-public/. Carga los .md en build time (vía import.meta.glob),
// parsea el frontmatter, extrae headings y los expone por slug+idioma.
//
// Cero requests en runtime: todo el contenido viaja en el bundle inicial.
// =============================================================================

import { parseFrontmatter, extractHeadings } from './frontmatter';
import { DOCS_PUBLIC_STRUCTURE, findDocInPublicStructure } from './structure';

// Cargar todos los .md de la carpeta pública en build time.
const RAW_DOCS = import.meta.glob('/src/docs-public/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// -----------------------------------------------------------------------------
// Índice parseado: procesamos cada .md UNA vez al cargar el módulo.
// -----------------------------------------------------------------------------

const INDEX = (() => {
  const cache = {};

  for (const [path, raw] of Object.entries(RAW_DOCS)) {
    // path: '/src/docs-public/en/indicators/logic-footprint.md'
    const match = path.match(/^\/src\/docs-public\/([^/]+)\/(.+)\.md$/);
    if (!match) continue;

    const [, language, slugWithMaybeSubdir] = match;

    const { data, content } = parseFrontmatter(raw);
    const headings = extractHeadings(content);

    const slugInStructure = DOCS_PUBLIC_STRUCTURE
      .flatMap(cat => cat.items)
      .find(item => path.endsWith(`/${item.slug}.md`));

    if (!slugInStructure) {
      console.warn(`[docs-public] No se encontró slug para ${path} en DOCS_PUBLIC_STRUCTURE`);
      continue;
    }

    const key = `${language}:${slugInStructure.slug}`;
    cache[key] = {
      slug: slugInStructure.slug,
      language,
      frontmatter: data,
      content,
      headings,
    };
  }

  return cache;
})();

// -----------------------------------------------------------------------------
// API pública
// -----------------------------------------------------------------------------

/**
 * Obtiene un documento público parseado por slug e idioma.
 * @param {string} slug  ej: 'indicators/logic-footprint'
 * @param {string} language  'en' | 'es'
 * @returns {object|null}
 */
export function getPublicDoc(slug, language) {
  return INDEX[`${language}:${slug}`] || null;
}

/**
 * Devuelve todos los documentos públicos del idioma, en el orden de la
 * estructura. Útil para el overview / página de inicio de /docs.
 */
export function getAllPublicDocs(language) {
  const result = [];
  for (const cat of DOCS_PUBLIC_STRUCTURE) {
    for (const item of cat.items) {
      const doc = INDEX[`${language}:${item.slug}`];
      if (doc) result.push(doc);
    }
  }
  return result;
}

/**
 * Devuelve un índice plano para búsqueda full-text con Fuse.js.
 * Limitado a los 7 indicators públicos.
 */
export function getAllPublicSlugsForSearch(language) {
  return getAllPublicDocs(language).map(doc => ({
    slug: doc.slug,
    title: doc.frontmatter.title || doc.slug,
    description: doc.frontmatter.description || '',
    snippet: doc.content
      .replace(/^#+\s+.*$/gm, '')
      .replace(/[*_`>]/g, '')
      .replace(/\n+/g, ' ')
      .trim()
      .slice(0, 500),
    headings: doc.headings.map(h => h.text).join(' '),
  }));
}

/**
 * Encuentra el documento previo y siguiente al actual, dentro de la
 * estructura pública.
 */
export function getAdjacentPublicDocs(slug, language) {
  const flat = DOCS_PUBLIC_STRUCTURE.flatMap(cat => cat.items);
  const idx = flat.findIndex(i => i.slug === slug);
  if (idx === -1) return { prev: null, next: null };

  const prevItem = idx > 0 ? flat[idx - 1] : null;
  const nextItem = idx < flat.length - 1 ? flat[idx + 1] : null;

  return {
    prev: prevItem ? getPublicDoc(prevItem.slug, language) : null,
    next: nextItem ? getPublicDoc(nextItem.slug, language) : null,
  };
}
