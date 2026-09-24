// src/pages/Blog.jsx
import { useState, useMemo } from 'react';
import { useLanguage } from '../context/languageContext';
import { SEO } from '../components/SEO';
import { BreadcrumbJsonLd } from '../components/BreadcrumbJsonLd';
import {
  BlogCard,
  BlogFeaturedCard,
  BlogCategoryFilter,
  BlogSearch,
} from '../components/blog';
import {
  getAllPosts,
  getFeaturedPost,
  getCategories,
} from '../data/blog';
import { Newspaper, Sparkles } from 'lucide-react';

export const Blog = () => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Artículos según idioma
  const allPosts = useMemo(() => getAllPosts(language), [language]);
  const featuredPost = useMemo(() => getFeaturedPost(language), [language]);
  const categories = useMemo(() => getCategories(language), [language]);

  // Filtrado reactivo por categoría y búsqueda
  const filteredPosts = useMemo(() => {
    let posts = allPosts;

    if (activeCategory !== 'all') {
      posts = posts.filter(
        (p) =>
          p.frontmatter.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      posts = posts.filter((p) => {
        const title = p.frontmatter.title?.toLowerCase() || '';
        const desc = p.frontmatter.description?.toLowerCase() || '';
        const cat = p.frontmatter.category?.toLowerCase() || '';
        const tags =
          p.frontmatter.tags?.map((t) => t.toLowerCase()).join(' ') || '';
        return (
          title.includes(q) ||
          desc.includes(q) ||
          cat.includes(q) ||
          tags.includes(q)
        );
      });
    }

    return posts;
  }, [allPosts, activeCategory, searchQuery]);

  // Si no hay filtro ni búsqueda, el grid regular excluye el featured post para no repetirlo
  const regularGridPosts = useMemo(() => {
    if (activeCategory === 'all' && !searchQuery.trim() && featuredPost) {
      return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
    }
    return filteredPosts;
  }, [filteredPosts, activeCategory, searchQuery, featuredPost]);

  const seoTitle =
    language === 'es'
      ? 'Blog de Order Flow, Volume Profile y Futuros | Logic Indicators'
      : 'Order Flow, Volume Profile & Futures Blog | Logic Indicators';

  const seoDesc =
    language === 'es'
      ? 'Artículos, guías y estrategias de Order Flow, Market Depth, Footprint y Volume Profile para NinjaTrader 8. Aprende a operar con ventaja institucional.'
      : 'Articles, guides, and strategies on Order Flow, Market Depth, Footprint, and Volume Profile for NinjaTrader 8. Learn how to trade with institutional edge.';

  return (
    <div className="min-h-screen bg-dark-900 text-text-main pt-12 pb-24">
      <SEO title={seoTitle} description={seoDesc} type="website" />

      <BreadcrumbJsonLd
        items={[
          { name: language === 'es' ? 'Inicio' : 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]}
      />

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-accent-primary/10 text-accent-primary border border-accent-primary/20 mb-4">
            <Newspaper size={14} />
            <span>
              {language === 'es'
                ? 'CENTRO DE CONOCIMIENTO & ESTRATEGIAS'
                : 'KNOWLEDGE BASE & TRADING STRATEGIES'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
            {language === 'es' ? (
              <>
                Order Flow, Subasta y{' '}
                <span className="text-accent-primary">Microestructura</span>
              </>
            ) : (
              <>
                Order Flow, Auction Theory &{' '}
                <span className="text-accent-primary">Microstructure</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-text-muted leading-relaxed mb-8">
            {language === 'es'
              ? 'Guías paso a paso, análisis cuantitativo y desmitificación de la operativa en futuros CME con NinjaTrader 8.'
              : 'Step-by-step guides, quantitative analysis, and institutional insight for CME futures trading in NinjaTrader 8.'}
          </p>

          {/* Buscador */}
          <div className="flex justify-center">
            <BlogSearch query={searchQuery} onChangeQuery={setSearchQuery} />
          </div>
        </div>

        {/* Filtros de Categorías */}
        <div className="mb-10 flex items-center justify-between gap-4 border-b border-white/5 pb-5">
          <BlogCategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        {/* Featured Post (solo si no hay búsqueda activa y categoría es 'all') */}
        {activeCategory === 'all' && !searchQuery.trim() && featuredPost && (
          <div className="mb-14">
            <BlogFeaturedCard post={featuredPost} />
          </div>
        )}

        {/* Grid de Artículos */}
        {filteredPosts.length > 0 ? (
          <div>
            {(activeCategory !== 'all' || searchQuery.trim()) && (
              <div className="flex items-center justify-between text-xs text-text-muted mb-6">
                <span>
                  {language === 'es'
                    ? `Mostrando ${filteredPosts.length} ${
                        filteredPosts.length === 1 ? 'artículo' : 'artículos'
                      }`
                    : `Showing ${filteredPosts.length} ${
                        filteredPosts.length === 1 ? 'article' : 'articles'
                      }`}
                </span>
                {(activeCategory !== 'all' || searchQuery.trim()) && (
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchQuery('');
                    }}
                    className="text-accent-primary hover:underline cursor-pointer"
                  >
                    {language === 'es' ? 'Limpiar filtros' : 'Reset filters'}
                  </button>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularGridPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        ) : (
          /* Estado vacío si no hay resultados */
          <div className="text-center py-20 bg-dark-800/40 rounded-3xl border border-white/5 my-8">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-text-muted mb-4">
              <Newspaper size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {language === 'es'
                ? 'No se encontraron artículos'
                : 'No articles found'}
            </h3>
            <p className="text-sm text-text-muted max-w-sm mx-auto mb-5">
              {language === 'es'
                ? 'Prueba ajustando los términos de búsqueda o seleccionando otra categoría.'
                : 'Try adjusting your search terms or picking another category.'}
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-accent-primary/10 hover:bg-accent-primary text-accent-primary hover:text-dark-950 font-semibold text-xs transition-all duration-200 cursor-pointer"
            >
              {language === 'es' ? 'Ver todos los artículos' : 'View all articles'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

