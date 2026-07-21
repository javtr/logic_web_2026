// src/data/docs/index.js
// =============================================================================
// SHIM DE COMPATIBILIDAD — documentación PRIVADA
// =============================================================================
// Antes de la separación pública/privada, toda la documentación vivía acá
// y se importaba desde `from '../data/docs'` o `from '../../data/docs'`.
//
// Para no tocar los 7 imports actuales en este commit (Docs.jsx,
// DocsSidebar, DocsLayout, etc.), este archivo re-exporta TODO lo que
// está en './docs-private'. Es la fuente de la verdad para los componentes
// que renderizan la documentación PRIVADA (la que requiere auth).
//
// En el commit 3, cuando creemos DocsPublic.jsx, ese componente importará
// directamente desde '../data/docs-public' y este shim quedará como
// atajo para la docs privada.
// =============================================================================

// Estructura del sidebar (jerarquía de categorías/artículos) — privada
export { DOCS_STRUCTURE, findDocInStructure, getAllSlugs } from '../docs-private/structure';

// Labels i18n (textos del sidebar y UI de la página de docs) — privada
export { DOCS_LABELS, getDocsLabel } from '../docs-private/labels';

// Parser de frontmatter + extractor de headings (compartido en concepto,
// duplicado físicamente para mantener los módulos aislados)
export { parseFrontmatter, extractHeadings } from '../docs-private/frontmatter';

// Loader (acceso a los markdown parseados de la carpeta privada)
export {
  getDoc,
  getAllDocs,
  getAllSlugsForSearch,
  getAdjacentDocs,
} from '../docs-private/loader';
