// src/components/PrivateRoute.jsx
// =============================================================================
// GUARD PARA RUTAS PRIVADAS
// =============================================================================
// Envuelve cualquier ruta que requiera sesión iniciada. Si el usuario NO
// está autenticado, lo manda a /login con un parámetro `next` que apunta
// a la URL que quería visitar. Cuando Login.jsx termine, lee ese `next`
// y lo manda de vuelta.
//
// Uso en App.jsx:
//   <Route element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
//     <Route path="/dashboard" element={<Dashboard />} />
//     <Route path="/dashboard/docs/*" element={<DocsPrivate />} />
//   </Route>
//
// O simple:
//   <Route path="/dashboard/docs/*" element={
//     <PrivateRoute><DocsPrivate /></PrivateRoute>
//   } />
// =============================================================================

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // encodeURIComponent para preservar "/" y los query params en la URL
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?next=${next}`} replace />;
  }

  return children;
};
