// src/components/docs/DocsLayout.jsx
// =============================================================================
// LAYOUT — grid de 3 columnas (sidebar + content + TOC) + responsive
// =============================================================================
// Lee del DocsContext: getDocsLabel, findDocInStructure, getAdjacentDocs,
// basePath. Ya no importa de data/docs directamente — la página que lo
// monta (DocsPublic o DocsPrivate) provee el contexto.
//
// Estructura:
//
//   ┌────────────────────────────────────────────────────────────┐
//   │  Breadcrumb + Search                                        │
//   ├──────────┬──────────────────────────────┬───────────────┤
//   │          │                              │               │
//   │ Sidebar  │       Content                │      TOC      │
//   │ (sticky) │       (max-w-3xl)            │    (sticky)   │
//   │          │                              │               │
//   └──────────┴──────────────────────────────┴───────────────┘
//
// Responsive:
//   - lg+ (≥1024px): 3 columnas completas
//   - md (768-1023px): sidebar colapsa en <details> arriba, TOC oculto
//   - <md: solo content, sidebar en <details>, TOC oculto
// =============================================================================

import { Link } from 'react-router-dom';
import { ChevronDown, ArrowLeft, LayoutDashboard } from 'lucide-react';
import { DocsSidebar } from './DocsSidebar';
import { DocsContent } from './DocsContent';
import { DocsTOC } from './DocsTOC';
import { DocsSearch } from './DocsSearch';
import { DocsPagination } from './DocsPagination';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useDocs } from '../../context/docsContext';

export const DocsLayout = ({ doc, showHomeButton = false }) => {
  const { getDocsLabel, findDocInStructure, getAdjacentDocs, basePath } = useDocs();

  if (!doc) {
    return (
      <div className="container mx-auto px-6 py-24 text-center max-w-xl">
        <h1 className="text-3xl font-bold text-text-main mb-3">
          {getDocsLabel('docs.ui.notFound.title')}
        </h1>
        <p className="text-text-muted mb-8">
          {getDocsLabel('docs.ui.notFound.description')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={basePath}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-primary text-dark-900 font-semibold hover:brightness-110 transition-all"
          >
            {getDocsLabel('docs.ui.notFound.back')}
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-dark-700 text-text-main hover:border-dark-600 hover:bg-dark-800 transition-all"
          >
            {getDocsLabel('docs.ui.notFound.home') || 'Ir al inicio'}
          </Link>
        </div>
      </div>
    );
  }

  const { frontmatter, slug } = doc;
  const found = findDocInStructure(slug);
  const categoryLabel = found ? getDocsLabel(found.category.labelKey) : '';
  const articleLabel  = found ? getDocsLabel(found.item.labelKey)  : frontmatter.title;
  const { prev, next } = getAdjacentDocs(slug, doc.language);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Chrome de la docs privada: "Volver al inicio" + "Volver a la zona
          de miembros" + switcher de idioma. La docs pública ya tiene el
          Navbar completo con ambos. */}
      {showHomeButton && (
        <div className="flex items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-primary transition-colors group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
              {getDocsLabel('docs.ui.breadcrumb.home')}
            </Link>
            <span className="w-px h-4 bg-dark-600" aria-hidden />
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-primary transition-colors group"
            >
              <LayoutDashboard size={16} className="transition-transform group-hover:-translate-x-0.5" />
              {getDocsLabel('docs.ui.breadcrumb.dashboard')}
            </Link>
          </div>
          <LanguageSwitcher />
        </div>
      )}

      {/* Top bar: breadcrumb + search */}
      <div className="flex items-center justify-between gap-4 mb-6 md:mb-10">
        <nav aria-label="Breadcrumb" className="text-sm text-text-muted flex items-center gap-2 flex-wrap min-w-0">
          <Link to="/" className="hover:text-text-main transition-colors">
            {getDocsLabel('docs.ui.breadcrumb.home')}
          </Link>
          <span>/</span>
          <Link to={basePath} className="hover:text-text-main transition-colors">
            {getDocsLabel('docs.ui.breadcrumb.docs')}
          </Link>
          {categoryLabel && (
            <>
              <span>/</span>
              <span className="text-text-muted">{categoryLabel}</span>
            </>
          )}
          {articleLabel && (
            <>
              <span>/</span>
              <span className="text-text-main truncate">{articleLabel}</span>
            </>
          )}
        </nav>
        <DocsSearch />
      </div>

      {/* Mobile sidebar toggle (solo en <lg) */}
      <details className="lg:hidden mb-6 group">
        <summary className="docs-mobile-summary flex items-center justify-between px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-md text-sm text-text-main cursor-pointer list-none">
          <span className="font-medium">{getDocsLabel('docs.ui.tableOfContents')}</span>
          <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-2 p-2 bg-dark-800 border border-dark-700 rounded-md max-h-[60vh] overflow-y-auto">
          <DocsSidebar />
        </div>
      </details>

      {/* Grid 3 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_200px] gap-6 lg:gap-10">
        {/* Sidebar (sticky, solo lg+) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            <DocsSidebar />
          </div>
        </aside>

        {/* Content */}
        <main className="min-w-0">
          <DocsContent doc={doc} />
          <DocsPagination prev={prev} next={next} />
        </main>

        {/* TOC (sticky, solo lg+) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
            <DocsTOC key={doc?.slug} headings={doc.headings || []} />
          </div>
        </aside>
      </div>
    </div>
  );
};
