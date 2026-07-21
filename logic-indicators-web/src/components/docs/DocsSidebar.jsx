// src/components/docs/DocsSidebar.jsx
// =============================================================================
// SIDEBAR — índice jerárquico de la documentación
// =============================================================================
// Lee DOCS_STRUCTURE y renderiza la jerarquía de categorías / artículos.
// Las categorías son colapsables; el item activo (matching por URL) queda
// highlighted y su categoría queda expandida por defecto.
//
// Comportamiento responsive: en mobile, este componente se renderiza dentro
// de un <details> en DocsLayout (Fase 8). En desktop, es sticky en la izq.
// =============================================================================

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DOCS_STRUCTURE, getDocsLabel } from '../../data/docs';
import { useLanguage } from '../../context/LanguageContext';
import { ChevronDown } from 'lucide-react';

export const DocsSidebar = () => {
  const { language } = useLanguage();
  const location = useLocation();

  // Detectar qué categoría contiene el item activo
  const activeSlug = location.pathname.replace(/^\/docs\/?/, '').replace(/\/$/, '');
  const activeCategoryId = DOCS_STRUCTURE.find(cat =>
    cat.items.some(i => i.slug === activeSlug)
  )?.id;

  // Estado de colapsados: por defecto la categoría activa está expandida
  const [collapsed, setCollapsed] = useState(() => {
    const initial = {};
    DOCS_STRUCTURE.forEach(cat => {
      initial[cat.id] = cat.id !== activeCategoryId;
    });
    return initial;
  });

  // Si cambia el slug activo, expandir su categoría
  useEffect(() => {
    if (activeCategoryId) {
      setCollapsed(prev => ({ ...prev, [activeCategoryId]: false }));
    }
  }, [activeCategoryId]);

  const toggleCategory = (id) => {
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <nav aria-label="Documentation navigation" className="docs-sidebar">
      {DOCS_STRUCTURE.map((cat) => {
        const isCollapsed = collapsed[cat.id];
        const isActiveCategory = cat.id === activeCategoryId;

        return (
          <div key={cat.id} className="mb-6">
            {/* Category header */}
            <button
              onClick={() => toggleCategory(cat.id)}
              className={`
                w-full flex items-center justify-between
                text-left text-xs font-bold uppercase tracking-wider
                mb-2 px-2 py-1.5 rounded-md
                transition-colors
                ${isActiveCategory ? 'text-accent-primary' : 'text-text-muted hover:text-text-main'}
              `}
              aria-expanded={!isCollapsed}
            >
              <span>{getDocsLabel(cat.labelKey, language)}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}`}
              />
            </button>

            {/* Items (collapsible) */}
            <ul
              className={`
                space-y-0.5 pl-2 border-l border-dark-700
                transition-all duration-200 ease-out overflow-hidden
                ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[2000px] opacity-100'}
              `}
            >
              {cat.items.map((item) => {
                const isActive = item.slug === activeSlug;
                return (
                  <li key={item.slug}>
                    <Link
                      to={`/docs/${item.slug}`}
                      className={`
                        block px-3 py-1.5 text-sm rounded-md
                        transition-colors duration-150
                        ${isActive
                          ? 'text-accent-primary font-semibold bg-accent-primary/10'
                          : 'text-text-muted hover:text-text-main hover:bg-dark-800'}
                      `}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {getDocsLabel(item.labelKey, language)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
};
