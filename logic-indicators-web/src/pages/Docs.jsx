// src/pages/Docs.jsx
// =============================================================================
// Página de documentación.
//
// Lee el slug de la URL (soporta nested: /docs/indicators/logic-footprint),
// busca el documento parseado, y lo renderiza dentro del DocsLayout (3 columnas:
// sidebar + content + TOC).
//
// Si el slug no existe, el DocsLayout renderiza un 404 inline.
// =============================================================================

import { useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getDoc, getAdjacentDocs } from '../data/docs';
import { DocsLayout } from '../components/docs';

export const Docs = () => {
  const { language } = useLanguage();
  // useParams()['*'] captura el resto del path después de /docs/
  // ej: 'getting-started' o 'indicators/logic-footprint'
  const params = useParams();
  const slug = params['*'] || 'getting-started';

  const doc = getDoc(slug, language);
  // const adjacent = getAdjacentDocs(slug, language); // para fase 9 (prev/next)

  return <DocsLayout doc={doc} />;
};
