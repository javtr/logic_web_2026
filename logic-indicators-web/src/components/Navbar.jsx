// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/languageContext';
import { useAuth } from '../hooks/useAuth';
import { useUserName } from '../hooks/useUserName';
import { Button } from './Button';
import { ResourcesDropdown } from './ResourcesDropdown';
import { MobileMenu } from './MobileMenu';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, Tag, Gift } from 'lucide-react';
import logoSvg from '../assets/logo_logic.svg';

export const Navbar = () => {
  const { t } = useLanguage();
  const { isAuthenticated, email } = useAuth();
  const { name: userName } = useUserName();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Identificador del usuario logueado para mostrar bajo "Zona de
  // Miembros". Prioridad: nombre real (viene del backend via
  // useUserName) > email prefix como fallback mientras carga.
  const userDisplayName =
    userName || (isAuthenticated && email ? email.split('@')[0] : '');

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
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-dark-900/60 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo (SVG) */}
          <Link to="/" aria-label={t('common.logoAria')}>
            <img
              src={logoSvg}
              alt="Logic Indicators"
              className="h-11 md:h-12 w-auto"
            />
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
            <LanguageSwitcher />
            <Link to={isAuthenticated ? '/dashboard' : '/login'}>
              <Button variant="secondary">
                {isAuthenticated ? (
                  // Sesion iniciada: "Zona de Miembros" arriba, email
                  // prefix (tipo nombre) abajo en letra mas chica y
                  // tenue. flex-col con items-center para que ambas
                  // lineas queden centradas dentro del boton.
                  <span className="flex flex-col items-center leading-tight gap-0.5">
                    <span className="text-sm">{t('nav.login')}</span>
                    <span className="text-[10px] opacity-75 truncate max-w-[140px]">
                      {userDisplayName}
                    </span>
                  </span>
                ) : (
                  // Sin sesion: solo "Iniciar sesion", texto limpio.
                  t('nav.signIn')
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile: Language + Burger */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
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
