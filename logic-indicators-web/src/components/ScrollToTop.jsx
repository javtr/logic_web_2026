// src/components/ScrollToTop.jsx
//
// Sube al top de la página en cada navegación de React Router.
// Por defecto scroll instantáneo. Si el URL tiene un hash (#seccion),
// intenta scrollear al elemento con ese id (smooth) — fallback a top si no existe.
//
// Uso: montar DENTRO del <Router>, ANTES de <Routes> en App.jsx.
//
//   <Router>
//     <ScrollToTop />
//     <Routes>...</Routes>
//   </Router>
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Pequeño delay para asegurar que el DOM de la nueva página esté renderizado
      const id = hash.slice(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 100);
    } else {
      // Navegación normal → scroll instantáneo al top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};
