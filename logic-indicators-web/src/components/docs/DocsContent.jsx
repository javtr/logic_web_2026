// src/components/docs/DocsContent.jsx
// =============================================================================
// CONTENT — renderiza el markdown de un artículo
// =============================================================================
// Usa react-markdown + remark-gfm + rehype-slug + rehype-autolink-headings.
// Los estilos "prose" (h1, h2, p, a, table, etc.) están en src/index.css
// bajo la clase .docs-prose.
//
// Props:
//   - doc: el objeto devuelto por getDoc() — { content, frontmatter, headings, ... }
// =============================================================================

import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export const DocsContent = ({ doc }) => {
  const articleRef = useRef(null);

  // Cuando cambia el doc, scroll al top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [doc?.slug]);

  if (!doc) return null;

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
      >
        {doc.content}
      </ReactMarkdown>
    </article>
  );
};
