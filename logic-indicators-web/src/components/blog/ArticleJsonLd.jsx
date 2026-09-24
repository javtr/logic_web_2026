// src/components/blog/ArticleJsonLd.jsx
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://logicindicators.com';

export const ArticleJsonLd = ({ post }) => {
  if (!post || !post.frontmatter) return null;

  const { title, description, date, author, coverImage, slug } = post.frontmatter;

  const imageUrl = coverImage?.startsWith('http')
    ? coverImage
    : `${SITE_URL}${coverImage || '/og-image.png'}`;

  const articleUrl = `${SITE_URL}/blog/${slug}`;

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: imageUrl,
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Organization',
      name: author || 'Logic Indicators Team',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Logic Indicators',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo_logic.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </Helmet>
  );
};
