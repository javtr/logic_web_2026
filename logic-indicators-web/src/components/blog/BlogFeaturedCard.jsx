// src/components/blog/BlogFeaturedCard.jsx
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/languageContext';

export const BlogFeaturedCard = ({ post }) => {
  const { language } = useLanguage();
  if (!post) return null;

  const { slug, frontmatter } = post;
  const { title, description, date, category, readTime, coverImage, author } = frontmatter;

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

  return (
    <article className="group relative rounded-3xl overflow-hidden border border-white/10 bg-dark-800/60 backdrop-blur-xl hover:border-accent-primary/40 transition-all duration-300 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
        {/* Imagen de Portada (7 cols en desktop) */}
        <Link
          to={`/blog/${slug}`}
          className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:h-[420px] overflow-hidden bg-dark-950 block"
        >
          {coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-800 to-dark-950 text-accent-primary/30 font-mono text-base">
              Logic Indicators
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-dark-900/90 via-transparent to-transparent opacity-80" />

          {/* Badge Destacado */}
          <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-accent-primary text-dark-950 shadow-lg shadow-accent-primary/20">
            <Sparkles size={13} className="animate-pulse" />
            <span>{language === 'es' ? 'DESTACADO' : 'FEATURED'}</span>
          </div>
        </Link>

        {/* Contenido (5 cols en desktop) */}
        <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-center">
          {/* Categoría y Tiempos */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted mb-4">
            {category && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
                {category}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-accent-primary/70" />
              <time dateTime={date}>{formattedDate}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-accent-primary/70" />
              <span>{readTime} min</span>
            </span>
          </div>

          {/* Título Principal */}
          <h2 className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-accent-primary transition-colors duration-200 leading-snug mb-4">
            <Link to={`/blog/${slug}`}>{title}</Link>
          </h2>

          {/* Extracto */}
          <p className="text-text-muted text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
            {description}
          </p>

          {/* Autor y CTA */}
          <div className="flex items-center justify-between pt-5 border-t border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-accent-primary/20 border border-accent-primary/30 flex items-center justify-center text-accent-primary text-xs font-bold">
                LI
              </div>
              <span className="text-xs text-text-muted font-medium">
                {author || 'Logic Indicators Team'}
              </span>
            </div>

            <Link
              to={`/blog/${slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-primary/10 hover:bg-accent-primary text-accent-primary hover:text-dark-950 font-semibold text-xs transition-all duration-200"
            >
              <span>{language === 'es' ? 'Leer artículo completo' : 'Read full article'}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

