// src/components/docs/DocsSearch.jsx
// =============================================================================
// SEARCH — búsqueda full-text con Fuse.js + modal
// =============================================================================
// Modal que se abre con Cmd+K / Ctrl+K (solo en la página de docs).
// Busca sobre title + description + snippet + headings de todos los
// artículos del idioma actual.
//
// Navegación por teclado:
//   ↑/↓       → mover selección
//   Enter     → ir al artículo seleccionado
//   Esc       → cerrar
// =============================================================================

import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { Search, X } from 'lucide-react';
import { getAllSlugsForSearch } from '../../data/docs';
import { useLanguage } from '../../context/LanguageContext';
import { getDocsLabel } from '../../data/docs';

export const DocsSearch = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef(null);

  // Índice Fuse.js (memoizado por idioma)
  const fuse = useMemo(() => {
    const docs = getAllSlugsForSearch(language);
    return new Fuse(docs, {
      keys: [
        { name: 'title',       weight: 0.5 },
        { name: 'description', weight: 0.3 },
        { name: 'headings',    weight: 0.15 },
        { name: 'snippet',     weight: 0.05 },
      ],
      threshold: 0.3,        // 0 = match exacto, 1 = match anything
      ignoreLocation: true,  // buscar en todo el string, no desde el inicio
      minMatchCharLength: 2,
    });
  }, [language]);

  // Resultados
  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    return fuse.search(query).slice(0, 8);
  }, [query, fuse]);

  // Atajo de teclado Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKey = (e) => {
      // Cmd+K (Mac) o Ctrl+K (Win/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      // Esc para cerrar
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  // Focus en el input al abrir
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIdx(0);
      // pequeño delay para que el modal termine de animar
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Reset selectedIdx cuando cambia query
  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIdx]) {
      e.preventDefault();
      goToResult(results[selectedIdx]);
    }
  };

  const goToResult = (result) => {
    setIsOpen(false);
    navigate(`/docs/${result.item.slug}`);
  };

  // Highlight de match en el texto (simple)
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-accent-primary/30 text-text-main rounded px-0.5">
          {text.slice(idx, idx + query.length)}
        </mark>
        {text.slice(idx + query.length)}
      </>
    );
  };

  return (
    <>
      {/* Trigger button (visible en la página de docs) */}
      <button
        onClick={() => setIsOpen(true)}
        className="docs-search-trigger inline-flex items-center gap-2 px-3 py-1.5 text-sm text-text-muted bg-dark-800 border border-dark-700 rounded-md hover:border-dark-600 hover:text-text-main transition-colors"
      >
        <Search size={14} />
        <span className="hidden sm:inline">{getDocsLabel('docs.ui.search.placeholder', language)}</span>
        <kbd className="hidden md:inline-block ml-2 px-1.5 py-0.5 text-xs text-text-muted bg-dark-900 border border-dark-700 rounded">
          ⌘K
        </kbd>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-dark-900/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-dark-800 border border-dark-700 rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-dark-700">
              <Search size={18} className="text-text-muted flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={getDocsLabel('docs.ui.search.placeholder', language)}
                className="flex-1 bg-transparent text-text-main placeholder-text-muted focus:outline-none"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-muted hover:text-text-main transition-colors"
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {query.trim().length < 2 && (
                <div className="px-4 py-8 text-center text-text-muted text-sm">
                  {getDocsLabel('docs.ui.search.shortcut', language)}
                </div>
              )}

              {query.trim().length >= 2 && results.length === 0 && (
                <div className="px-4 py-8 text-center text-text-muted text-sm">
                  {getDocsLabel('docs.ui.search.noResults', language)}
                </div>
              )}

              {results.map((result, idx) => (
                <button
                  key={result.item.slug}
                  onClick={() => goToResult(result)}
                  onMouseEnter={() => setSelectedIdx(idx)}
                  className={`
                    w-full text-left px-4 py-3 border-b border-dark-700 last:border-b-0
                    transition-colors
                    ${selectedIdx === idx
                      ? 'bg-accent-primary/10 border-l-2 border-l-accent-primary'
                      : 'hover:bg-dark-700/50 border-l-2 border-l-transparent'}
                  `}
                >
                  <div className="font-semibold text-text-main mb-1">
                    {highlightMatch(result.item.title, query)}
                  </div>
                  {result.item.description && (
                    <div className="text-sm text-text-muted line-clamp-2">
                      {highlightMatch(result.item.description, query)}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Footer con shortcuts */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-dark-700 text-xs text-text-muted">
              <div className="flex items-center gap-3">
                <span><kbd className="px-1.5 py-0.5 bg-dark-900 border border-dark-700 rounded">↑↓</kbd> navigate</span>
                <span><kbd className="px-1.5 py-0.5 bg-dark-900 border border-dark-700 rounded">↵</kbd> select</span>
                <span><kbd className="px-1.5 py-0.5 bg-dark-900 border border-dark-700 rounded">esc</kbd> close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
