// src/components/docs/DocsSidebar.jsx
// =============================================================================
// SIDEBAR — índice jerárquico de la documentación
// =============================================================================
// Lee DOCS_STRUCTURE, getDocsLabel y basePath del DocsContext. El
// basePath es importante para construir los links correctos: la
// sidebar renderiza links a /docs/... o /dashboard/docs/... según
// desde dónde se renderice.
// =============================================================================

import { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDocs } from '../../context/DocsContext';
import { ChevronDown } from 'lucide-react';

export const DocsSidebar = () => {
  const { structure, getDocsLabel, basePath } = useDocs();
  const location = useLocation();

  // Detectar slug activo según el basePath actual
  const activeSlug = location.pathname
    .replace(new RegExp(`^${basePath}/?`), '')
    .replace(/\/$/, '');
  const activeCategoryId = structure.find(cat =>
    cat.items.some(i => i.slug === activeSlug)
  )?.id;

  // Trackea solo las categorías que el user colapso MANUALMENTE.
  // El estado final de cada categoría se DERIVA de esto + activeCategoryId
  // (ver isCategoryCollapsed). Esto elimina el useEffect que antes
  // sincronizaba setCollapsed con activeCategoryId (anti-patron
  // 'setState in effect' que causaba re-renders extras).
  const [userCollapsed, setUserCollapsed] = useState(() => new Set());

  // Una categoría está colapsada si:
  //   - El user la colapso manualmente, Y
  //   - No es la categoría activa (la activa siempre se ve).
  const isCategoryCollapsed = useCallback((catId) => {
    if (catId === activeCategoryId) return false;
    return userCollapsed.has(catId);
  }, [userCollapsed, activeCategoryId]);

  const toggleCategory = (id) => {
    setUserCollapsed(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <nav aria-label="Documentation navigation" className="docs-sidebar">
      {structure.map((cat) => {
        const isCollapsed = isCategoryCollapsed(cat.id);
        const isActiveCategory = cat.id === activeCategoryId;

        return (
          <div key={cat.id} className="mb-6">
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
              <span>{getDocsLabel(cat.labelKey)}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}`}
              />
            </button>

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
                      to={`${basePath}/${item.slug}`}
                      className={`
                        block px-3 py-1.5 text-sm rounded-md
                        transition-colors duration-150
                        ${isActive
                          ? 'text-accent-primary font-semibold bg-accent-primary/10'
                          : 'text-text-muted hover:text-text-main hover:bg-dark-800'}
                      `}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {getDocsLabel(item.labelKey)}
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
