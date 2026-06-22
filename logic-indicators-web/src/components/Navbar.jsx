// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './Button';
import { Globe, Menu } from 'lucide-react';

export const Navbar = () => {
  const { t, toggleLanguage, language } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-dark-900/60 backdrop-blur-md">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tighter text-text-main">
          LOGIC<span className="text-accent-green">INDICATORS</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
          <Link to="/indicators" className="hover:text-accent-green transition-colors">{t('nav.indicators')}</Link>
          <Link to="/resources" className="hover:text-accent-green transition-colors">{t('nav.resources')}</Link>
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-dark-700 hover:text-text-main transition-all"
          >
            <Globe size={14} />
            {language.toUpperCase()}
          </button>
          <Link to="/login">
            <Button variant="secondary">{t('nav.login')}</Button>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-text-main">
          <Menu />
        </button>
      </div>
    </nav>
  );
};