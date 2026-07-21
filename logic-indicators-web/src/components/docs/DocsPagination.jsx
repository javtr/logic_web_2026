// src/components/docs/DocsPagination.jsx
// =============================================================================
// PAGINATION — Previous / Next al final de cada artículo
// =============================================================================
// Navegación al artículo previo y siguiente según el orden de la
// estructura. Si no hay (es el primero o el último), el botón se oculta.
// =============================================================================

import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getDocsLabel } from '../../data/docs';

export const DocsPagination = ({ prev, next }) => {
  const { language } = useLanguage();

  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Documentation pagination"
      className="mt-16 pt-8 border-t border-dark-700 grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {/* Previous */}
      {prev ? (
        <Link
          to={`/docs/${prev.slug}`}
          className="group flex flex-col p-4 rounded-lg border border-dark-700 hover:border-accent-primary bg-dark-800/50 hover:bg-dark-800 transition-all"
        >
          <span className="flex items-center gap-1 text-xs text-text-muted mb-1 group-hover:text-accent-primary transition-colors">
            <ChevronLeft size={14} />
            {getDocsLabel('docs.ui.previous', language)}
          </span>
          <span className="text-sm font-semibold text-text-main">
            {prev.frontmatter.title || prev.slug}
          </span>
        </Link>
      ) : (
        <div />  // espacio vacío para mantener el grid
      )}

      {/* Next */}
      {next ? (
        <Link
          to={`/docs/${next.slug}`}
          className="group flex flex-col p-4 rounded-lg border border-dark-700 hover:border-accent-primary bg-dark-800/50 hover:bg-dark-800 transition-all text-right sm:col-start-2"
        >
          <span className="flex items-center justify-end gap-1 text-xs text-text-muted mb-1 group-hover:text-accent-primary transition-colors">
            {getDocsLabel('docs.ui.next', language)}
            <ChevronRight size={14} />
          </span>
          <span className="text-sm font-semibold text-text-main">
            {next.frontmatter.title || next.slug}
          </span>
        </Link>
      ) : (
        <div />  // espacio vacío
      )}
    </nav>
  );
};
