// src/data/docs/loader.js
// =============================================================================
// LOADER DE DOCUMENTOS MARKDOWN
// =============================================================================
// Carga todos los .md en /src/docs/{en,es}/ como strings en build time
// (vía import.meta.glob). Cero requests en runtime.
//
// API pública:
//   - getDoc(slug, language)        → artículo parseado
//   - getAllDocs(language)          → array de todos los artículos del idioma
//   - getAllSlugsForSearch(language)→ índice plano para Fuse.js
// =============================================================================

import { parseFrontmatter, extractHeadings } from './frontmatter';
import { DOCS_STRUCTURE } from './structure';

// Cargar todos los .md en build time. Vite resuelve los ?raw como strings.
// Formato: { '/src/docs-private/en/getting-started.md': '...contenido...', ... }
const RAW_DOCS = import.meta.glob('/src/docs-private/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// -----------------------------------------------------------------------------
// Índice parseado: procesamos cada .md UNA vez al cargar el módulo.
// Memoizamos para no re-parsear en cada getDoc().
// -----------------------------------------------------------------------------

const INDEX = (() => {
  const cache = {};

  for (const [path, raw] of Object.entries(RAW_DOCS)) {
    // path: '/src/docs-private/en/indicators/logic-footprint.md'
    const match = path.match(/^\/src\/docs-private\/([^/]+)\/(.+)\.md$/);
    if (!match) continue;

    const [, language] = match;
    // El slug en la URL puede tener subdirectorios: 'indicators/logic-footprint'
    // Pero el path puede ser 'indicators/logic-footprint' o 'logic-footprint'
    // La estructura es nuestra fuente de verdad para los slugs.

    const { data, content } = parseFrontmatter(raw);
    const headings = extractHeadings(content);

    // Encontrar el slug "canónico" desde la estructura
    // (puede tener subdir como 'indicators/logic-footprint' o no)
    const slugInStructure = DOCS_STRUCTURE
      .flatMap(cat => cat.items)
      .find(item => {
        // Buscar por título del frontmatter
        const titleSlug = (data.title || '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        return titleSlug === item.labelKey.split('.').pop() ||
               path.endsWith(`/${item.slug}.md`);
      });

    if (!slugInStructure) {
      if (import.meta.env.DEV) console.warn(`[docs] No se encontró slug para ${path} en DOCS_STRUCTURE`);
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
 * Obtiene un documento parseado por slug e idioma.
 * @param {string} slug  ej: 'getting-started' o 'indicators/logic-footprint'
 * @param {string} language  'en' | 'es'
 * @returns {object|null}  { slug, language, frontmatter, content, headings } | null
 */
export function getDoc(slug, language) {
  return INDEX[`${language}:${slug}`] || null;
}

/**
 * Devuelve todos los documentos de un idioma, en el orden definido por
 * DOCS_STRUCTURE.
 * @param {string} language
 * @returns {array}
 */
export function getAllDocs(language) {
  const result = [];
  for (const cat of DOCS_STRUCTURE) {
    for (const item of cat.items) {
      const doc = INDEX[`${language}:${item.slug}`];
      if (doc) result.push(doc);
    }
  }
  return result;
}

/**
 * Devuelve un índice plano optimizado para búsqueda full-text con Fuse.js.
 * Incluye: title, description, primeros 500 chars de content, y headings.
 * @param {string} language
 * @returns {array<{slug, title, description, snippet, headings}>}
 */
export function getAllSlugsForSearch(language) {
  return getAllDocs(language).map(doc => ({
    slug: doc.slug,
    title: doc.frontmatter.title || doc.slug,
    description: doc.frontmatter.description || '',
    snippet: doc.content
      .replace(/^#+\s+.*$/gm, '')   // quitar headings
      .replace(/[*_`>]/g, '')        // quitar formatting
      .replace(/\n+/g, ' ')          // colapsar newlines
      .trim()
      .slice(0, 500),
    headings: doc.headings.map(h => h.text).join(' '),
  }));
}

/**
 * Encuentra el documento previo y siguiente al actual, en el orden de la
 * estructura. Útil para los botones "Previous / Next" al final de cada artículo.
 * @param {string} slug
 * @param {string} language
 * @returns {{prev: object|null, next: object|null}}
 */
export function getAdjacentDocs(slug, language) {
  const flat = DOCS_STRUCTURE.flatMap(cat => cat.items);
  const idx = flat.findIndex(i => i.slug === slug);
  if (idx === -1) return { prev: null, next: null };

  const prevItem = idx > 0 ? flat[idx - 1] : null;
  const nextItem = idx < flat.length - 1 ? flat[idx + 1] : null;

  return {
    prev: prevItem ? getDoc(prevItem.slug, language) : null,
    next: nextItem ? getDoc(nextItem.slug, language) : null,
  };
}
