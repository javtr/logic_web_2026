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
//
//   Para evitar race conditions con el render de DocsContent (que es
//   un sibling), usamos requestAnimationFrame: corre justo antes del
//   próximo paint, cuando el DOM ya está actualizado.
// =============================================================================

import { useEffect, useState, useRef } from 'react';
import { useDocs } from '../../context/DocsContext';

export const DocsTOC = () => {
  const { getDocsLabel, doc } = useDocs();
  const [headings, setHeadings] = useState([]);
  const observerRef = useRef(null);
  // activeId en ref para que el observer pueda leerlo sin re-crearse
  const activeIdRef = useRef(null);
  const [activeId, setActiveId] = useState(null);

  // Re-scan del DOM cuando cambia el doc (slug o content).
  // Usamos requestAnimationFrame para correr DESPUÉS del commit de React
  // pero ANTES del paint — el <article> ya está en el DOM en ese punto.
  useEffect(() => {
    if (!doc) {
      setHeadings([]);
      setActiveId(null);
      activeIdRef.current = null;
      return;
    }

    let raf2;
    const raf1 = requestAnimationFrame(() => {
      // Doble rAF: el primero se programa para después del commit,
      // el segundo para después de que el browser haya hecho layout.
      // Esto evita el caso donde el <article> está en el DOM pero
      // sus hijos todavía no se han hidratado.
      raf2 = requestAnimationFrame(() => {
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
          .filter((h) => h.slug);

        setHeadings(found);
        if (found[0]) {
          setActiveId(found[0].slug);
          activeIdRef.current = found[0].slug;
        } else {
          setActiveId(null);
          activeIdRef.current = null;
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [doc?.slug, doc?.content]);

  // Scroll-spy: observer que resalta el heading visible
  useEffect(() => {
    if (headings.length === 0) return;

    const timeoutId = setTimeout(() => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

          if (visibleEntries.length > 0) {
            const id = visibleEntries[0].target.id;
            setActiveId(id);
            activeIdRef.current = id;
          }
        },
        {
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

  const handleClick = (e, slug) => {
    e.preventDefault();
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${slug}`);
      setActiveId(slug);
      activeIdRef.current = slug;
    }
  };

  return (
    <nav aria-label="On this page" className="docs-toc">
      <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3 px-2">
        {getDocsLabel('docs.ui.onThisPage')}
      </h2>
      {headings.length === 0 ? (
        <p className="text-xs text-text-muted px-2 italic">
          {/* Mientras carga o si la página no tiene h2/h3 */}
          …
        </p>
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
