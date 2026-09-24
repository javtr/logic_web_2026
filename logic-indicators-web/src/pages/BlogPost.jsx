// src/pages/BlogPost.jsx
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../context/languageContext';
import { SEO } from '../components/SEO';
import { BreadcrumbJsonLd } from '../components/BreadcrumbJsonLd';
import {
  ArticleJsonLd,
  BlogTOC,
  BlogShareButtons,
  BlogCTA,
  BlogCard,
} from '../components/blog';
import { getPostBySlug, getRelatedPosts } from '../data/blog';
import { ArrowLeft, Calendar, Clock, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export const BlogPost = () => {
  const { slug } = useParams();
  const { language } = useLanguage();

  const post = getPostBySlug(slug, language);

  // Si el post no existe en este idioma, redirige a /blog
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const { frontmatter, content, headings } = post;
  const { title, description, date, author, category, readTime, coverImage, tags } =
    frontmatter;

  const relatedPosts = getRelatedPosts(slug, category, language, 3);

  const formattedDate = (() => {
    try {
      const d = new Date(date);
      return d.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return date;
    }
  })();

  const pageTitle = `${title} | Logic Indicators`;
  const pageDescription = description;

  // Custom link renderer para Markdown (enlaces internos via react-router Link)
  const linkRenderer = ({ href, children, ...props }) => {
    if (!href) return <a {...props}>{children}</a>;
    if (href.startsWith('/') && !href.startsWith('//')) {
      return (
        <Link to={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-dark-900 text-text-main pt-10 pb-24">
      <SEO
        title={pageTitle}
        description={pageDescription}
        type="article"
        ogImage={coverImage}
      />
      <BreadcrumbJsonLd
        items={[
          { name: language === 'es' ? 'Inicio' : 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: title, path: `/blog/${slug}` },
        ]}
      />
      <ArticleJsonLd post={post} />

      <article className="container mx-auto px-6 max-w-5xl">
        {/* Enlace Volver */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-accent-primary transition-colors duration-200"
          >
            <ArrowLeft size={15} />
            <span>{language === 'es' ? 'Volver a todos los artículos' : 'Back to all articles'}</span>
          </Link>
        </div>

        {/* Cabecera del Artículo */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted mb-4">
            {category && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
                {category}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-accent-primary/70" />
              <time dateTime={date}>{formattedDate}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-accent-primary/70" />
              <span>
                {readTime} {language === 'es' ? 'min de lectura' : 'min read'}
              </span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-text-muted leading-relaxed mb-6 font-normal">
            {description}
          </p>

          {/* Fila de Autor + Botones de Compartir */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-primary/20 border border-accent-primary/30 flex items-center justify-center text-accent-primary font-bold text-sm">
                LI
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  {author || 'Logic Indicators Team'}
                </div>
                <div className="text-xs text-text-muted">
                  {language === 'es'
                    ? 'Investigación de Order Flow & Cuantitativa'
                    : 'Order Flow & Quantitative Research'}
                </div>
              </div>
            </div>

            <BlogShareButtons title={title} slug={slug} />
          </div>
        </header>

        {/* Imagen de Portada Principal */}
        {coverImage && (
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-white/10 mb-12 shadow-2xl bg-dark-950">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
          </div>
        )}

        {/* Layout de Contenido: Artículo + TOC lateral en desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Columna Principal de Contenido (8 columnas) */}
          <main className="lg:col-span-8 min-w-0">
            <div className="docs-prose max-w-none text-text-main leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
                components={{
                  a: linkRenderer,
                }}
              >
                {content}
              </ReactMarkdown>
            </div>

            {/* Tags al pie del artículo */}
            {tags && tags.length > 0 && (
              <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-text-muted mr-1">
                  Tags:
                </span>
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-lg bg-white/5 text-text-muted border border-white/5 hover:text-white hover:border-accent-primary/30 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Compartir al pie */}
            <div className="mt-6 flex items-center justify-between p-5 rounded-2xl bg-dark-800/40 border border-white/5">
              <span className="text-xs font-semibold text-white">
                {language === 'es'
                  ? '¿Te resultó útil este análisis? Compártelo:'
                  : 'Did you find this analysis useful? Share it:'}
              </span>
              <BlogShareButtons title={title} slug={slug} />
            </div>

            {/* CTA de Conversión */}
            <BlogCTA />
          </main>

          {/* Columna Lateral Flotante (4 columnas) */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6">
            <BlogTOC headings={headings} />

            {/* Banner de Producto Destacado en el Sidebar */}
            <div className="rounded-2xl border border-white/10 bg-dark-800/60 p-6 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-bold text-accent-primary uppercase tracking-wider mb-2">
                <Sparkles size={14} />
                <span>Logic Suite</span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">
                {language === 'es'
                  ? '9 Indicadores Profesionales de Order Flow'
                  : '9 Professional Order Flow Indicators'}
              </h4>
              <p className="text-xs text-text-muted leading-relaxed mb-4">
                {language === 'es'
                  ? 'Footprint multi-columna, mapas de calor continuos, TPO y Big Trades con tecnología Zero-Lag en NinjaTrader 8.'
                  : 'Multi-column Footprint, resting heatmaps, TPO, and Big Trades with Zero-Lag performance in NinjaTrader 8.'}
              </p>
              <Link
                to="/pricing"
                className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-accent-primary hover:bg-accent-primary/90 text-dark-950 font-bold text-xs shadow-md shadow-accent-primary/20 transition-all duration-200"
              >
                {language === 'es' ? 'Descubrir la Suite' : 'Discover the Suite'}
              </Link>
            </div>
          </aside>
        </div>

        {/* Sección de Artículos Relacionados */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-white/10">
            <h3 className="text-2xl font-extrabold text-white mb-8 tracking-tight">
              {language === 'es' ? 'Artículos Relacionados' : 'Related Articles'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relPost) => (
                <BlogCard key={relPost.slug} post={relPost} />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
};
