// src/data/blog/loader.js
// =============================================================================
// LOADER DE ARTÍCULOS DEL BLOG — BUILD TIME VIA VITE GLOB
// =============================================================================
// Carga estática de todos los archivos markdown en /src/content/blog/**/*.md.
// Procesa el frontmatter, extrae la tabla de contenidos y los expone ordenados
// cronológicamente por idioma.
// =============================================================================

import { parseFrontmatter, extractHeadings } from './frontmatter';

// Carga todos los .md del blog en build time
const RAW_POSTS = import.meta.glob('/src/content/blog/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// Índice en memoria
const POSTS_BY_KEY = {};
const POSTS_BY_LANG = { es: [], en: [] };

for (const [path, raw] of Object.entries(RAW_POSTS)) {
  // path: '/src/content/blog/es/como-detectar-absorciones.md'
  const match = path.match(/^\/src\/content\/blog\/([^/]+)\/(.+)\.md$/);
  if (!match) continue;

  const [, language, fileSlug] = match;
  const { data, content } = parseFrontmatter(raw);
  const headings = extractHeadings(content);

  // El slug puede venir definido en el frontmatter o se deduce del nombre de archivo
  const slug = data.slug || fileSlug;

  // Cálculo aproximado de tiempo de lectura (palabras / 200 wpm)
  const wordCount = content.trim().split(/\s+/).length;
  const computedReadTime = Math.max(1, Math.ceil(wordCount / 200));
  const readTime = data.readTime || computedReadTime;

  const post = {
    slug,
    language,
    frontmatter: {
      ...data,
      slug,
      readTime,
      date: data.date || '2026-01-01',
      tags: Array.isArray(data.tags) ? data.tags : [],
    },
    content,
    headings,
  };

  const key = `${language}:${slug}`;
  POSTS_BY_KEY[key] = post;

  // Si define un alias o slug alternativo (ej. traducción en inglés o español)
  if (data.alternateSlug) {
    POSTS_BY_KEY[`${language}:${data.alternateSlug}`] = post;
  }

  if (!POSTS_BY_LANG[language]) {
    POSTS_BY_LANG[language] = [];
  }
  POSTS_BY_LANG[language].push(post);
}

// Ordenar por fecha descendente
Object.keys(POSTS_BY_LANG).forEach((lang) => {
  POSTS_BY_LANG[lang].sort((a, b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
  });
});

/**
 * Obtiene todos los posts de un idioma ordenados por fecha
 */
export function getAllPosts(language = 'es') {
  return POSTS_BY_LANG[language] || [];
}

/**
 * Obtiene un post específico por slug e idioma
 */
export function getPostBySlug(slug, language = 'es') {
  const key = `${language}:${slug}`;
  return POSTS_BY_KEY[key] || null;
}

/**
 * Obtiene el post destacado (featured) o el más reciente
 */
export function getFeaturedPost(language = 'es') {
  const posts = getAllPosts(language);
  if (posts.length === 0) return null;
  return posts.find((p) => p.frontmatter.featured) || posts[0];
}

/**
 * Obtiene todas las categorías únicas disponibles en el idioma
 */
export function getCategories(language = 'es') {
  const posts = getAllPosts(language);
  const categoriesSet = new Set();
  posts.forEach((p) => {
    if (p.frontmatter.category) {
      categoriesSet.add(p.frontmatter.category);
    }
  });
  return Array.from(categoriesSet);
}

/**
 * Obtiene artículos relacionados excluyendo el actual
 */
export function getRelatedPosts(currentSlug, category, language = 'es', limit = 3) {
  const posts = getAllPosts(language).filter((p) => p.slug !== currentSlug);
  if (!category) return posts.slice(0, limit);

  const sameCategory = posts.filter(
    (p) => p.frontmatter.category?.toLowerCase() === category?.toLowerCase()
  );
  const otherCategory = posts.filter(
    (p) => p.frontmatter.category?.toLowerCase() !== category?.toLowerCase()
  );

  return [...sameCategory, ...otherCategory].slice(0, limit);
}

/**
 * Búsqueda de artículos en memoria
 */
export function searchPosts(query, language = 'es') {
  const posts = getAllPosts(language);
  if (!query || !query.trim()) return posts;

  const q = query.toLowerCase().trim();
  return posts.filter((p) => {
    const title = p.frontmatter.title?.toLowerCase() || '';
    const desc = p.frontmatter.description?.toLowerCase() || '';
    const cat = p.frontmatter.category?.toLowerCase() || '';
    const tags = p.frontmatter.tags?.map((t) => t.toLowerCase()).join(' ') || '';
    return title.includes(q) || desc.includes(q) || cat.includes(q) || tags.includes(q);
  });
}
