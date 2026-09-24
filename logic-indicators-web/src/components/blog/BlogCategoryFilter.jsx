// src/components/blog/BlogCategoryFilter.jsx
import { useLanguage } from '../../context/languageContext';

export const BlogCategoryFilter = ({ categories = [], activeCategory = 'all', onSelectCategory }) => {
  const { language } = useLanguage();

  const allLabel = language === 'es' ? 'Todos los temas' : 'All topics';

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        onClick={() => onSelectCategory('all')}
        className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
          activeCategory === 'all'
            ? 'bg-accent-primary text-dark-950 shadow-md shadow-accent-primary/20'
            : 'bg-white/5 hover:bg-white/10 text-text-muted hover:text-white border border-white/5'
        }`}
      >
        {allLabel}
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
            activeCategory.toLowerCase() === cat.toLowerCase()
              ? 'bg-accent-primary text-dark-950 shadow-md shadow-accent-primary/20'
              : 'bg-white/5 hover:bg-white/10 text-text-muted hover:text-white border border-white/5'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
