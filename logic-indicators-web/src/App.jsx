// src/App.jsx
//
// Web pública completa + zona de miembros.
//   - La raíz "/" muestra la Home pública para que los visitantes vean el sitio.
//   - El usuario navega a /login o /dashboard desde el navbar o los CTAs.
//   - La persistencia de sesión vive en Login.jsx y Dashboard.jsx:
//       * /login     → si ya hay token, redirige a /dashboard (no re-pide código)
//       * /dashboard → si no hay token, redirige a /login
//   - El token vive en localStorage bajo la clave "logic_token".
//
// DOCUMENTACIÓN (separada en dos paths):
//   - /docs/*              → PÚBLICA (versión "media" de los 7 indicators,
//                             accesible sin auth, optimizada para SEO/marketing)
//   - /dashboard/docs/*    → PRIVADA (manual técnico completo con TODOS los
//                             parámetros, configs, best practices — solo
//                             usuarios logueados)
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { HelpWidget } from './components/HelpWidget';
import { PrivateRoute } from './components/PrivateRoute';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { IndicatorPage } from './pages/IndicatorPage';
import { DocsPublic } from './pages/DocsPublic';
import { DocsPrivate } from './pages/DocsPrivate';
import { FreeIndicators } from './pages/FreeIndicators';
import { Contact } from './pages/Contact';
import { Faq } from './pages/Faq';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { NotFound } from './pages/NotFound';

import { Indicators } from './pages/Indicators';
import { Pricing } from './pages/Pricing';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-dark-900 text-text-main font-sans">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <ScrollToTopButton />
        <HelpWidget />
        <Routes>
          {/* RUTAS PÚBLICAS (con navbar + footer) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/indicators" element={<Indicators />} />
            <Route path="/indicators/:slug" element={<IndicatorPage />} />
            <Route path="/pricing" element={<Pricing />} />
            {/* Docs PÚBLICA: /docs redirige al primer indicator, /docs/* renderiza */}
            <Route path="/docs" element={<Navigate to="/docs/indicators/logic-footprint" replace />} />
            <Route path="/docs/*" element={<DocsPublic />} />
            <Route path="/resources/docs" element={<Navigate to="/docs/indicators/logic-footprint" replace />} />
            <Route path="/resources/free-indicators" element={<FreeIndicators />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Route>

          {/* RUTAS PRIVADAS (Zona de Miembros, sin layout público) */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Docs PRIVADA: requiere token, redirige a /login si no hay */}
          <Route
            path="/dashboard/docs"
            element={
              <PrivateRoute>
                <Navigate to="/dashboard/docs/getting-started" replace />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/docs/*"
            element={
              <PrivateRoute>
                <DocsPrivate />
              </PrivateRoute>
            }
          />

          {/* Catch-all 404 (fuera de MainLayout a propósito: pantalla de error
              pelada, sin navbar/footer, para no distraer del mensaje) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
