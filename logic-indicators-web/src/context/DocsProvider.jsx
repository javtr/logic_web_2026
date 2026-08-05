// src/context/DocsProvider.jsx
// =============================================================================
// DOCS PROVIDER — solo el componente Provider
// =============================================================================
// Antes de la separación pública/privada, los 5 componentes de
// components/docs/ importaban directamente desde data/docs/. Esto los
// ataba a UNA sola fuente de datos.
//
// Con este context, cada página (DocsPublic, DocsPrivate) provee SU
// PROPIO set de helpers (loader, structure, labels) al árbol de
// componentes, y los componentes hijos leen lo que necesitan con
// useDocs() sin saber de dónde viene.
//
// Shape del value:
//   {
//     language: 'en' | 'es',
//     structure: [...],                      // jerarquía del sidebar
//     labels: { en: {...}, es: {...} },      // i18n
//     getDoc: (slug, lang) => doc | null,
//     getAdjacentDocs: (slug, lang) => {prev, next},
//     getAllSlugsForSearch: (lang) => [...],
//     findDocInStructure: (slug) => {category, item} | null,
//     basePath: '/docs' | '/dashboard/docs',  // para links internos
//   }
//
// Helper de labels:
//   getDocsLabel(key) — se calcula en useDocs() y se expone, así los
//   componentes no tienen que pasar el language a cada llamada.
// =============================================================================
import { useMemo } from 'react';
import { DocsContext } from './docsContext';

/**
 * Provider de documentación.
 *
 * Props:
 *   - language: 'en' | 'es'
 *   - structure, labels, getDoc, getAdjacentDocs, getAllSlugsForSearch,
 *     findDocInStructure, basePath  → todo el set que el contexto expone
 *   - children
 */
export const DocsProvider = ({
  language,
  structure,
  labels,
  getDoc,
  getAdjacentDocs,
  getAllSlugsForSearch,
  findDocInStructure,
  basePath = '/docs',
  children,
}) => {
  // getDocsLabel: helper que los componentes usan sin pasar el language
  const getDocsLabel = useMemo(() => {
    return (key) => {
      const langLabels = labels?.[language];
      return langLabels?.[key] || labels?.en?.[key] || key;
    };
  }, [language, labels]);

  const value = useMemo(
    () => ({
      language,
      structure,
      labels,
      getDocsLabel,
      getDoc,
      getAdjacentDocs,
      getAllSlugsForSearch,
      findDocInStructure,
      basePath,
    }),
    [
      language,
      structure,
      labels,
      getDocsLabel,
      getDoc,
      getAdjacentDocs,
      getAllSlugsForSearch,
      findDocInStructure,
      basePath,
    ]
  );

  return <DocsContext.Provider value={value}>{children}</DocsContext.Provider>;
};
