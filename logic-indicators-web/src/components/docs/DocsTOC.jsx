// src/components/docs/DocsTOC.jsx
// =============================================================================
// TOC — "On this page" + scroll-spy
// =============================================================================
// Lista los h2 y h3 del artículo actual. Resalta el heading que está
// visible según el scroll, usando IntersectionObserver.
//
// Props:
//   - headings: array de { level, text, slug } calculado por
//     extractHeadings() en el loader. El slug es compatible con
//     github-slugger (que usa rehype-slug), así matchea 1:1 con
//     los IDs del DOM y los clicks siempre llevan a la sección.
//
// Por qué recibe headings por prop en vez de leer del context:
//   DocsContext expone los helpers (getDoc, getAdjacentDocs) pero
//   NO el doc actual. El doc solo lo tiene DocsLayout (por prop
//   desde DocsPrivate/DocsPublic). Mantener el flow 'prop' es
//   más simple y evita re-renders innecesarios cuando el context
//   cambia por otros motivos.
// =============================================================================

import { useEffect, useState, useRef } from 'react';
import { useDocs } from '../../context/docsContext';

export const DocsTOC = ({ headings = [] }) => {
  const { getDocsLabel } = useDocs();
  const [activeId, setActiveId] = useState(headings[0]?.slug || null);
  const observerRef = useRef(null);

  // NOTA: Antes habia un useEffect que reseteaba activeId cuando
  // cambiaba doc.slug (anti-patron de 'setState in effect').
  // Ahora ese reset se hace automaticamente porque el padre
  // (DocsLayout) pasa `key={doc?.slug}` al TOC, lo que hace que
  // React desmonte y remonte el componente cuando cambia el doc.
  // Eso resetea TODOS los useState (incluido activeId) sin necesidad
  // de un useEffect de sincronizacion.
  //
  // Tambien elimina el parametro `doc` del useDocs() porque ya no
  // se necesita (solo se usaba como dependencia del useEffect).

  // Scroll-spy: observer que resalta el heading visible según scroll
  useEffect(() => {
    if (headings.length === 0) return;

    const timeoutId = setTimeout(() => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          // Encontrar el primer heading visible
          const visibleEntries = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

          if (visibleEntries.length > 0) {
            setActiveId(visibleEntries[0].target.id);
          }
        },
        {
          // El heading se considera "visible" cuando está en el
          // 30% superior del viewport.
          rootMargin: '-20% 0% -70% 0%',
          threshold: 0,
        }
      );

      // Observar todos los headings del artículo
      const articleEl = document.querySelector('.docs-prose');
      if (!articleEl) return;

      headings.forEach((h) => {
        const el = articleEl.querySelector(`#${CSS.escape(h.slug)}`);
        if (el) observerRef.current.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [headings]);

  const handleClick = (e, slug) => {
    e.preventDefault();
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Actualizar URL con el hash (sin navegación)
      window.history.replaceState(null, '', `#${slug}`);
      setActiveId(slug);
    }
  };

  return (
    <nav aria-label="On this page" className="docs-toc">
      <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3 px-2">
        {getDocsLabel('docs.ui.onThisPage')}
      </h2>
      {headings.length === 0 ? (
        <p className="text-xs text-text-muted px-2 italic">…</p>
      ) : (
        <ul className="space-y-1 border-l border-dark-700">
          {headings.map((h) => (
            <li key={h.slug}>
              <a
                href={`#${h.slug}`}
                onClick={(e) => handleClick(e, h.slug)}
                className={`
                  block py-1 text-sm transition-colors duration-150 border-l-2 -ml-px
                  ${h.level === 3 ? 'pl-6' : 'pl-3'}
                  ${activeId === h.slug
                    ? 'border-accent-primary text-accent-primary font-medium'
                    : 'border-transparent text-text-muted hover:text-text-main'}
                `}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};
