// src/components/blog/BlogCard.jsx
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/languageContext';

export const BlogCard = ({ post }) => {
  const { language } = useLanguage();
  const { slug, frontmatter } = post;
  const { title, description, date, category, readTime, coverImage, tags } = frontmatter;

  // Formato de fecha según idioma
  const formattedDate = (() => {
    try {
      const d = new Date(date);
      return d.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return date;
    }
  })();

  return (
    <article className="group flex flex-col bg-dark-800/70 hover:bg-dark-800 border border-white/10 hover:border-accent-primary/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-accent-primary/5">
      {/* Imagen de Portada */}
      <Link to={`/blog/${slug}`} className="relative aspect-[16/9] overflow-hidden bg-dark-950 block">
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-800 to-dark-950 text-accent-primary/40 font-mono text-sm">
            Logic Indicators
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent opacity-60" />

        {/* Badge de Categoría */}
        {category && (
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-accent-primary/20 text-accent-primary border border-accent-primary/30 backdrop-blur-md">
            {category}
          </span>
        )}
      </Link>

      {/* Contenido */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Metadatos (Fecha + Tiempo de lectura) */}
        <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
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

        {/* Título */}
        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-accent-primary transition-colors duration-200 line-clamp-2 mb-2.5">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </h3>

        {/* Descripción / Extracto */}
        <p className="text-sm text-text-muted line-clamp-3 mb-4 leading-relaxed flex-grow">
          {description}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-text-muted border border-white/5"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer Card con enlace */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
          <Link
            to={`/blog/${slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-primary group-hover:gap-2.5 transition-all duration-200"
          >
            <span>{language === 'es' ? 'Leer artículo' : 'Read article'}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
};
