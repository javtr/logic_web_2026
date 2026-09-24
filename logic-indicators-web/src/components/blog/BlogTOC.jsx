// src/components/blog/BlogTOC.jsx
import { useEffect, useState } from 'react';
import { AlignLeft } from 'lucide-react';
import { useLanguage } from '../../context/languageContext';

export const BlogTOC = ({ headings = [] }) => {
  const { language } = useLanguage();
  const [activeSlug, setActiveSlug] = useState('');

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    );

    headings.forEach(({ slug }) => {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <nav className="bg-dark-800/50 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-wider mb-4 pb-3 border-b border-white/5">
        <AlignLeft size={14} className="text-accent-primary" />
        <span>{language === 'es' ? 'En este artículo' : 'In this article'}</span>
      </div>

      <ul className="space-y-2.5 text-xs max-h-[45vh] overflow-y-auto scrollbar-thin pr-2">
        {headings.map(({ level, text, slug }) => {
          const isActive = activeSlug === slug;
          return (
            <li
              key={slug}
              className={`${level === 3 ? 'pl-3' : 'pl-0'}`}
            >
              <a
                href={`#${slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(slug);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    window.history.pushState(null, '', `#${slug}`);
                    setActiveSlug(slug);
                  }
                }}
                className={`block py-0.5 transition-all duration-200 line-clamp-1 leading-snug ${
                  isActive
                    ? 'text-accent-primary font-semibold translate-x-1'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

