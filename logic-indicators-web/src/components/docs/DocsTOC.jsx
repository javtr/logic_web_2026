// src/components/docs/DocsTOC.jsx
// =============================================================================
// TOC — "On this page" + scroll-spy
// =============================================================================
// Lista los h2 y h3 del artículo actual. Resalta el heading que está
// visible según el scroll, usando IntersectionObserver.
//
// Por qué leemos los headings del DOM en lugar de recibirlos por prop:
//   Antes recibíamos `headings` desde el loader (vía extractHeadings),
//   que generaba slugs con su propia lógica. Esos slugs NO siempre
//   coincidían con los IDs que pone `rehype-slug` en el DOM, así que
//   algunos clicks en el TOC llevaban a una sección que no existía.
//
//   Ahora scaneamos el DOM real con querySelector y usamos los IDs
//   que efectivamente puso react-markdown. Garantiza 1:1 que el click
//   siempre encuentra su target.
// =============================================================================

import { useEffect, useState, useRef } from 'react';
import { useDocs } from '../../context/DocsContext';

export const DocsTOC = () => {
  const { getDocsLabel, doc } = useDocs();
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const observerRef = useRef(null);

  // Re-scan del DOM cuando cambia el doc (slug o content).
  // Pequeño delay para asegurar que DocsContent (sibling anterior en el
  // tree) ya haya renderizado los headings con sus IDs.
  useEffect(() => {
    if (!doc) {
      setHeadings([]);
      setActiveId(null);
      return;
    }

    const timeoutId = setTimeout(() => {
      const articleEl = document.querySelector('.docs-prose');
      if (!articleEl) {
        setHeadings([]);
        return;
      }

      const elements = articleEl.querySelectorAll('h2, h3');
      const found = Array.from(elements)
        .map((el) => ({
          level: el.tagName === 'H3' ? 3 : 2,
          text: (el.textContent || '').replace(/[*_`]/g, '').trim(),
          slug: el.id,
        }))
        .filter((h) => h.slug); // descartar los que no tienen id

      setHeadings(found);
      setActiveId(found[0]?.slug || null);
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [doc?.slug, doc?.content]);

  // Scroll-spy: observer que resalta el heading visible
  useEffect(() => {
    if (headings.length === 0) return;

    setActiveId(headings[0]?.slug || null);

    const timeoutId = setTimeout(() => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
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

  if (headings.length === 0) return null;

  const handleClick = (e, slug) => {
    e.preventDefault();
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${slug}`);
      setActiveId(slug);
    }
  };

  return (
    <nav aria-label="On this page" className="docs-toc">
      <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3 px-2">
        {getDocsLabel('docs.ui.onThisPage')}
      </h2>
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
    </nav>
  );
};
