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
//
// CODE SPLITTING (C11 audit):
//   - Home se queda eagerly loaded (es la LCP, debe estar lista ASAP).
//   - El resto va en chunks lazy que se descargan al navegar.
//   - Un <Suspense> global con PageLoader cubre todas las rutas lazy.
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageProvider';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { HelpWidget } from './components/HelpWidget';
import { PrivateRoute } from './components/PrivateRoute';
import { PageLoader } from './components/PageLoader';

// Eager: la Home es la LCP y debe estar en el bundle inicial.
import { Home } from './pages/Home';

// Lazy: el resto. Cada página se descarga bajo demanda al navegar.
const Login = lazy(() => import('./pages/Login').then((m) => ({ default: m.Login })));
const Dashboard = lazy(() => import('./pages/Dashboard').then((m) => ({ default: m.Dashboard })));
const IndicatorPage = lazy(() => import('./pages/IndicatorPage').then((m) => ({ default: m.IndicatorPage })));
const DocsPublic = lazy(() => import('./pages/DocsPublic').then((m) => ({ default: m.DocsPublic })));
const DocsPrivate = lazy(() => import('./pages/DocsPrivate').then((m) => ({ default: m.DocsPrivate })));
const FreeIndicators = lazy(() => import('./pages/FreeIndicators').then((m) => ({ default: m.FreeIndicators })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const Faq = lazy(() => import('./pages/Faq').then((m) => ({ default: m.Faq })));
const Privacy = lazy(() => import('./pages/Privacy').then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/Terms').then((m) => ({ default: m.Terms })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));
const Indicators = lazy(() => import('./pages/Indicators').then((m) => ({ default: m.Indicators })));
const Pricing = lazy(() => import('./pages/Pricing').then((m) => ({ default: m.Pricing })));

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
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </Router>
    </LanguageProvider>
  );
}

export default App;
