// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './Button';
import { ResourcesDropdown } from './ResourcesDropdown';
import { MobileMenu } from './MobileMenu';
import { Globe, Menu, Tag, Gift } from 'lucide-react';

export const Navbar = () => {
  const { t, toggleLanguage, language } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cerrar el menú mobile si se redimensiona a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* bg-dark-900/95 (sin backdrop-blur): el blur-filter era uno de los
          principales responsables de saturar el GPU en mobile. Fondo casi
          opaco da el mismo look visual sin compositing pesado. */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-dark-900/95">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-tighter text-text-main">
            LOGIC<span className="text-accent-primary">INDICATORS</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-text-muted whitespace-nowrap">
            <Link to="/indicators" className="hover:text-accent-primary transition-colors">{t('nav.indicators')}</Link>
            <ResourcesDropdown />
            <Link
              to="/resources/free-indicators"
              className="hover:text-accent-primary transition-colors flex items-center gap-1"
            >
              <Gift size={14} className="text-accent-primary" />
              {t('nav.freeIndicators')}
            </Link>
            <Link to="/pricing" className="hover:text-accent-primary transition-colors flex items-center gap-1">
              <Tag size={14} className="text-accent-primary" />
              {t('nav.pricing')}
            </Link>
            <Link to="/contact" className="hover:text-accent-primary transition-colors">{t('nav.contact')}</Link>
            <button
              onClick={toggleLanguage}
              aria-label={t('nav.switchLanguage')}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-dark-700 hover:text-text-main transition-all"
            >
              <Globe size={14} />
              {language.toUpperCase()}
            </button>
            <Link to="/login">
              <Button variant="secondary">{t('nav.login')}</Button>
            </Link>
          </div>

          {/* Mobile: Language + Burger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              aria-label={t('nav.switchLanguage')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dark-700 text-text-muted hover:text-text-main transition-all text-xs font-semibold"
            >
              <Globe size={13} />
              {language.toUpperCase()}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-text-main p-1"
              aria-label={t('nav.openMenu')}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};
