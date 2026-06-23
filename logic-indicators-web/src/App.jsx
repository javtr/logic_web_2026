// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { IndicatorPage } from './pages/IndicatorPage';
import { Docs } from './pages/Docs';
import { FreeIndicators } from './pages/FreeIndicators';
import { Contact } from './pages/Contact';

import { Indicators } from './pages/Indicators';

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
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/indicators" element={<Indicators />} />
            <Route path="/indicators/:slug" element={<IndicatorPage />} />
            <Route path="/resources/docs" element={<Docs />} />
            <Route path="/resources/free-indicators" element={<FreeIndicators />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          
          {/* RUTAS PRIVADAS (Zona de Miembros) */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;