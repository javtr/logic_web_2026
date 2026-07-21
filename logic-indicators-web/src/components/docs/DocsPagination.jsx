// src/components/docs/DocsPagination.jsx
// =============================================================================
// PAGINATION — Previous / Next al final de cada artículo
// =============================================================================
// Lee getDocsLabel y basePath del DocsContext. El basePath es importante
// porque los links deben respetar la URL actual: /docs/... o
// /dashboard/docs/... según si la página es pública o privada.
// =============================================================================

import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDocs } from '../../context/DocsContext';

export const DocsPagination = ({ prev, next }) => {
  const { getDocsLabel, basePath } = useDocs();

  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Documentation pagination"
      className="mt-16 pt-8 border-t border-dark-700 grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {/* Previous */}
      {prev ? (
        <Link
          to={`${basePath}/${prev.slug}`}
          className="group flex flex-col p-4 rounded-lg border border-dark-700 hover:border-accent-primary bg-dark-800/50 hover:bg-dark-800 transition-all"
        >
          <span className="flex items-center gap-1 text-xs text-text-muted mb-1 group-hover:text-accent-primary transition-colors">
            <ChevronLeft size={14} />
            {getDocsLabel('docs.ui.previous')}
          </span>
          <span className="text-sm font-semibold text-text-main">
            {prev.frontmatter.title || prev.slug}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {/* Next */}
      {next ? (
        <Link
          to={`${basePath}/${next.slug}`}
          className="group flex flex-col p-4 rounded-lg border border-dark-700 hover:border-accent-primary bg-dark-800/50 hover:bg-dark-800 transition-all text-right sm:col-start-2"
        >
          <span className="flex items-center justify-end gap-1 text-xs text-text-muted mb-1 group-hover:text-accent-primary transition-colors">
            {getDocsLabel('docs.ui.next')}
            <ChevronRight size={14} />
          </span>
          <span className="text-sm font-semibold text-text-main">
            {next.frontmatter.title || next.slug}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
};
