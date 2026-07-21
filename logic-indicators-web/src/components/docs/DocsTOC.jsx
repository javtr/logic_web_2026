// src/components/docs/DocsTOC.jsx
// =============================================================================
// TOC — "On this page" + scroll-spy
// =============================================================================
// Lista los h2 y h3 del artículo actual. Resalta el heading que está
// visible según el scroll, usando IntersectionObserver.
//
// Props:
//   - headings: array de { level, text, slug } que viene del loader
//     (extractHeadings en frontmatter.js). El algoritmo de slugify
//     es compatible con github-slugger (que usa rehype-slug), así
//     los slugs matchean 1:1 con los IDs del DOM.
// =============================================================================

import { useEffect, useState, useRef } from 'react';
import { useDocs } from '../../context/DocsContext';

export const DocsTOC = () => {
  const { getDocsLabel, doc } = useDocs();
  const headings = doc?.headings || [];
  const [activeId, setActiveId] = useState(headings[0]?.slug || null);
  const observerRef = useRef(null);

  // Reset activeId cuando cambia el doc
  useEffect(() => {
    setActiveId(headings[0]?.slug || null);
  }, [doc?.slug]);

  // Scroll-spy: observer que resalta el heading visible
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
  }, [headings, doc?.slug]);

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
