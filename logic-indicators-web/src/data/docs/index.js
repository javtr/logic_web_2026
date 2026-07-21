// src/data/docs/index.js
// =============================================================================
// BARREL EXPORTS — documentación
// =============================================================================
// Punto único de importación para todo lo relacionado a la documentación.
// =============================================================================

// Estructura del sidebar (jerarquía de categorías/artículos)
export { DOCS_STRUCTURE, findDocInStructure, getAllSlugs } from './structure';

// Labels i18n (textos del sidebar y UI de la página de docs)
export { DOCS_LABELS, getDocsLabel } from './labels';

// Parser de frontmatter + extractor de headings
export { parseFrontmatter, extractHeadings } from './frontmatter';

// Loader (acceso a los markdown parseados)
export {
  getDoc,
  getAllDocs,
  getAllSlugsForSearch,
  getAdjacentDocs,
} from './loader';
