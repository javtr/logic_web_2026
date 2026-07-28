// src/pages/DocsPublic.jsx
// =============================================================================
// PÁGINA DE DOCUMENTACIÓN — PÚBLICA (sin auth)
// =============================================================================
// Misma estructura que DocsPrivate.jsx pero con la data source PÚBLICA
// (solo los 7 indicators en versión "media") y basePath /docs.
//
// El DocsProvider inyecta el set de helpers correspondientes y el
// DocsLayout (que es genérico) se adapta automáticamente.
//
// Si el slug no existe, el DocsLayout renderiza un 404 inline.
// El redirect desde /docs → /docs/indicators/logic-footprint se hace
// en App.jsx (más limpio que manejarlo acá).
// =============================================================================

import { useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { DocsProvider, useDocs } from '../context/DocsContext';
import { DocsLayout } from '../components/docs';
import {
  DOCS_PUBLIC_STRUCTURE as DOCS_STRUCTURE,
  DOCS_PUBLIC_LABELS as DOCS_LABELS,
  getPublicDoc as getDoc,
  getAdjacentPublicDocs as getAdjacentDocs,
  getAllPublicSlugsForSearch as getAllSlugsForSearch,
  findDocInPublicStructure as findDocInStructure,
} from '../data/docs-public';

const DocsPublicInner = () => {
  const { t, language } = useLanguage();
  const { getDoc: getDocFromCtx } = useDocs();
  const params = useParams();
  // Captura el resto del path después de /docs/
  const slug = params['*'] || 'indicators/logic-footprint';
  const doc = getDocFromCtx(slug, language);

  // Meta dinámicos desde el frontmatter del .md. Si el doc no existe
  // (slug inválido), usamos el título genérico + noindex para que
  // Google no indexe URLs rotas.
  const pageTitle = doc?.frontmatter?.title
    ? `${doc.frontmatter.title} | Logic Indicators`
    : t('seo.docs.title');
  const pageDescription = doc?.frontmatter?.description || t('seo.docs.description');

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        type="article"
        noindex={!doc}
      />
      <DocsLayout doc={doc} />
    </>
  );
};

export const DocsPublic = () => {
  const { language } = useLanguage();
  return (
    <DocsProvider
      language={language}
      structure={DOCS_STRUCTURE}
      labels={DOCS_LABELS}
      getDoc={getDoc}
      getAdjacentDocs={getAdjacentDocs}
      getAllSlugsForSearch={getAllSlugsForSearch}
      findDocInStructure={findDocInStructure}
      basePath="/docs"
    >
      <DocsPublicInner />
    </DocsProvider>
  );
};
