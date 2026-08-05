// src/components/docs/DocsContent.jsx
// =============================================================================
// CONTENT — renderiza el markdown de un artículo
// =============================================================================
// Usa react-markdown + remark-gfm + rehype-slug + rehype-autolink-headings.
// Los estilos "prose" (h1, h2, p, a, table, etc.) están en src/index.css
// bajo la clase .docs-prose.
//
// LINKS INTERNOS:
//   El markdown hardcodea los links como /docs/... (paths "naturales"
//   pensados para la docs pública). Pero el mismo archivo se renderiza
//   en la docs privada (con basePath /dashboard/docs), donde esos
//   links deben apuntar a /dashboard/docs/... para mantener al usuario
//   dentro de la zona de miembros.
//
//   Para resolver esto sin editar el markdown a mano, le pasamos a
//   react-markdown un custom `a` component que:
//     1. Si el href es /docs/... → reescribe a `${basePath}/...`
//        (esto mantiene al usuario en su contexto actual)
//     2. Si el href es absoluto externo → <a target="_blank" rel="noopener">
//     3. Si el href es otro path interno → <Link> de react-router
//     4. Resto → <a> por defecto
//
//   Así el mismo markdown funciona tanto en /docs/ como en /dashboard/docs/.
//
// Props:
//   - doc: el objeto devuelto por getDoc() — { content, frontmatter, headings, ... }
// =============================================================================

import { useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { useDocs } from '../../context/docsContext';

// Custom link resolver: reescribe /docs/* al basePath actual
const makeLinkRenderer = (basePath) => ({ href, children, ...props }) => {
  // Sin href: anchor vacío (caso raro, pero lo manejamos)
  if (!href) {
    return <a {...props}>{children}</a>;
  }

  // Link interno hardcodeado a /docs/* → reescribir al basePath actual
  // (esto es lo que mantiene la separación pública/privada sin
  // tener dos versiones de cada archivo markdown).
  if (href.startsWith('/docs/') || href === '/docs') {
    const stripped = href.replace(/^\/docs\/?/, '');
    const newHref = stripped ? `${basePath}/${stripped}` : basePath;
    return <RouterLink to={newHref} {...props}>{children}</RouterLink>;
  }

  // URLs absolutas externas: anchor con target=_blank
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  // Otros paths internos: usar RouterLink (no full reload)
  if (href.startsWith('/')) {
    return <RouterLink to={href} {...props}>{children}</RouterLink>;
  }

  // Relativas o anclas (#sección): anchor por defecto
  return <a href={href} {...props}>{children}</a>;
};

export const DocsContent = ({ doc }) => {
  const { basePath } = useDocs();
  const articleRef = useRef(null);

  // Cuando cambia el doc, scroll al top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [doc?.slug]);

  if (!doc) return null;

  // components object se recrea en cada render (no vale la pena
  // memoizarlo para una mejora de performance casi nula)
  const components = {
    a: makeLinkRenderer(basePath),
  };

  return (
    <article ref={articleRef} className="docs-prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'append',
              properties: {
                className: ['heading-anchor'],
                ariaLabel: 'Link to section',
              },
              content: {
                type: 'text',
                value: '#',
              },
            },
          ],
        ]}
        components={components}
      >
        {doc.content}
      </ReactMarkdown>
    </article>
  );
};
