// src/pages/DocsPrivate.jsx
// =============================================================================
// PÁGINA DE DOCUMENTACIÓN — PRIVADA (requiere auth)
// =============================================================================
// Lee el slug de la URL (soporta nested: /dashboard/docs/indicators/logic-footprint),
// busca el documento parseado en el data module PRIVADO, y lo renderiza
// dentro del DocsLayout envuelto en un DocsProvider con la data source privada.
//
// Si el slug no existe, el DocsLayout renderiza un 404 inline.
//
// Acceso: solo usuarios logueados (PrivateRoute en App.jsx).
// =============================================================================

import { useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { DocsProvider, useDocs } from '../context/DocsContext';
import { DocsLayout } from '../components/docs';
import {
  DOCS_STRUCTURE,
  DOCS_LABELS,
  getDoc,
  getAdjacentDocs,
  getAllSlugsForSearch,
  findDocInStructure,
} from '../data/docs-private';

// Wrapper interno: usa useDocs() para resolver el slug con la data correcta
const DocsPrivateInner = () => {
  const { language } = useLanguage();
  const { getDoc: getDocFromCtx } = useDocs();
  const params = useParams();
  // Captura el resto del path después de /dashboard/docs/
  const slug = params['*'] || 'getting-started';
  const doc = getDocFromCtx(slug, language);
  // showHomeButton=true → la docs privada está en zona de miembros
  // (sin Navbar público), mostramos un link "Volver al inicio" arriba
  return <DocsLayout doc={doc} showHomeButton={true} />;
};

export const DocsPrivate = () => {
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
      basePath="/dashboard/docs"
    >
      <DocsPrivateInner />
    </DocsProvider>
  );
};
