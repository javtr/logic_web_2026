import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Indicators from './pages/Indicators';
import Resources from './pages/Resources';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Login from './pages/Login';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-bg-primary">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/indicators" element={<Indicators />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
