// src/components/docs/DocsTOC.jsx
// =============================================================================
// TOC — "On this page" + scroll-spy
// =============================================================================
// Lee getDocsLabel del DocsContext. El resto (headings, scroll-spy con
// IntersectionObserver) sigue igual.
// =============================================================================

import { useEffect, useState, useRef } from 'react';
import { useDocs } from '../../context/DocsContext';

export const DocsTOC = ({ headings }) => {
  const { getDocsLabel } = useDocs();
  const [activeId, setActiveId] = useState(headings?.[0]?.slug || null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    setActiveId(headings[0]?.slug || null);

    const timeoutId = setTimeout(() => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

          if (visibleEntries.length > 0) {
            setActiveId(visibleEntries[0].target.id);
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

  if (!headings || headings.length === 0) return null;

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
