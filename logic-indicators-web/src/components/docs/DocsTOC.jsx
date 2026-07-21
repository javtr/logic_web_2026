// src/components/docs/DocsTOC.jsx
// =============================================================================
// TOC — "On this page" + scroll-spy
// =============================================================================
// Lista los h2 y h3 del artículo actual. Resalta el heading que está
// visible según el scroll, usando IntersectionObserver.
//
// Por qué usamos los headings del doc (no del DOM):
//   - Están disponibles inmediatamente (no después del primer render)
//   - Se puede usar para el TOC antes de que el usuario scrollee
//   - Funciona si los headings se renderizan vía componentes custom
// =============================================================================

import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getDocsLabel } from '../../data/docs';

export const DocsTOC = ({ headings }) => {
  const { language } = useLanguage();
  const [activeId, setActiveId] = useState(headings?.[0]?.slug || null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    // Reset al cambiar de artículo
    setActiveId(headings[0]?.slug || null);

    // Esperar al próximo tick para que React monte el DOM
    const timeoutId = setTimeout(() => {
      // Limpiar observer anterior
      if (observerRef.current) observerRef.current.disconnect();

      // Crear nuevo observer
      observerRef.current = new IntersectionObserver(
        (entries) => {
          // Encontrar el primer heading visible
          const visibleEntries = entries
            .filter(e => e.isIntersecting)
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

  if (!headings || headings.length === 0) return null;

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
        {getDocsLabel('docs.ui.onThisPage', language)}
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
