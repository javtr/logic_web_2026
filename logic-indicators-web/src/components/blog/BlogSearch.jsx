// src/components/blog/BlogSearch.jsx
import { Search, X } from 'lucide-react';
import { useLanguage } from '../../context/languageContext';

export const BlogSearch = ({ query, onChangeQuery }) => {
  const { language } = useLanguage();

  const placeholder =
    language === 'es'
      ? 'Buscar por tema, setup, indicador...'
      : 'Search by topic, setup, indicator...';

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
        <Search size={16} />
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => onChangeQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2.5 bg-dark-800/80 border border-white/10 rounded-xl text-sm text-white placeholder-text-muted/60 focus:outline-none focus:border-accent-primary/60 focus:ring-1 focus:ring-accent-primary/60 transition-all duration-200"
      />

      {query && (
        <button
          onClick={() => onChangeQuery('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-white transition-colors"
          aria-label="Clear search"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
};
