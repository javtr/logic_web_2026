// src/App.jsx
// Versión "solo zona de miembros" para la prueba con Render.
// Se ocultan todas las rutas públicas (Home, Indicadores, Pricing, etc.)
// y solo quedan: /, /login, /dashboard y un 404.
// Los componentes públicos (Home, Indicators, ...) y MainLayout (Navbar+Footer)
// NO se eliminan — solo se dejan de referenciar. Si después se quiere
// recuperar la web pública, basta con restaurar los imports y las rutas.
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';

import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { NotFound } from './pages/NotFound';

// Componente que decide a dónde enviar al usuario cuando entra a "/".
//   - Sin sesión (no hay token en localStorage) → /login
//   - Con sesión                               → /dashboard
const RootRedirect = () => {
  const hasSession = Boolean(localStorage.getItem('logic_token'));
  return <Navigate to={hasSession ? '/dashboard' : '/login'} replace />;
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Raíz: redirige según sesión */}
          <Route path="/" element={<RootRedirect />} />

          {/* Zona de miembros */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Cualquier otra URL → 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
