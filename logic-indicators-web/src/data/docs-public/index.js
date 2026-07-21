// src/data/docs-public/index.js
// =============================================================================
// BARREL EXPORTS — documentación PÚBLICA
// =============================================================================
// Punto único de importación para todo lo relacionado a la docs pública
// (la que se renderiza en /docs/* sin necesidad de auth).
//
// A diferencia de data/docs/index.js (que es un shim de compatibilidad
// para no romper imports existentes), este es el módulo "real" nuevo.
// =============================================================================

// Estructura del sidebar público
export {
  DOCS_PUBLIC_STRUCTURE,
  findDocInPublicStructure,
  getAllPublicSlugs,
} from './structure';

// Labels i18n del sidebar público
export { DOCS_PUBLIC_LABELS, getDocsPublicLabel } from './labels';

// Parser de frontmatter + extractor de headings
export { parseFrontmatter, extractHeadings } from './frontmatter';

// Loader (acceso a los markdown públicos parseados)
export {
  getPublicDoc,
  getAllPublicDocs,
  getAllPublicSlugsForSearch,
  getAdjacentPublicDocs,
} from './loader';
