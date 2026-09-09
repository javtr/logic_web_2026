// src/components/MobileMenu.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, BookOpen, Gift, BarChart3, MessageCircle, Tag, Sliders } from 'lucide-react';
import { useLanguage } from '../context/languageContext';
import { useAuth } from '../hooks/useAuth';
import { useUserName } from '../hooks/useUserName';
import { Button } from './Button';
import { LanguageSwitcher } from './LanguageSwitcher';

export const MobileMenu = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { isAuthenticated, email } = useAuth();
  const { name: userName } = useUserName();
  const location = useLocation();
  const [resourcesOpen, setResourcesOpen] = useState(false);

  // Mismo patrón que el Navbar desktop: nombre real del backend con
  // fallback al email prefix mientras useUserName hace el fetch.
  const userDisplayName =
    userName || (isAuthenticated && email ? email.split('@')[0] : '');

  // Cierre automático al cambiar de ruta
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Si la ruta actual pertenece a recursos, expandir el acordeón
  useEffect(() => {
    if (location.pathname.startsWith('/resources')) {
      setResourcesOpen(true);
    }
  }, [location.pathname]);

  // Body scroll lock + Escape
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Resetear submenú cuando se cierra (a menos que esté en una ruta de recursos)
  useEffect(() => {
    if (!isOpen && !location.pathname.startsWith('/resources')) {
      setResourcesOpen(false);
    }
  }, [isOpen, location.pathname]);

  const handleLinkClick = () => {
    onClose();
  };

  const isRouteActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname === to || location.pathname.startsWith(to);
  };

  const isResourcesActive = location.pathname.startsWith('/resources');

  const resourceLinks = [
    {
      to: '/resources/docs',
      icon: BookOpen,
      label: t('nav.resourcesDropdown.docs'),
    },
    {
      to: '/resources/free-indicators',
      icon: Gift,
      label: t('nav.resourcesDropdown.freeIndicators'),
    },
    {
      to: '/resources/presets',
      icon: Sliders,
      label: t('nav.resourcesDropdown.presets'),
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="md:hidden">
          {/* Backdrop con z-[60] para cubrir navbar sticky (z-50) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            aria-hidden="true"
          />

          {/* Drawer con z-[70] e inset-y-0 h-[100dvh] para evitar cortes con barras móviles */}
          <motion.aside
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t('nav.menu')}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.25 }}
            className="fixed inset-y-0 right-0 h-[100dvh] max-h-[100dvh] w-[85%] max-w-[320px] bg-dark-900 border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header con LanguageSwitcher integrado y botón de cerrar */}
            <div className="flex items-center justify-between h-20 px-6 border-b border-white/10 flex-shrink-0">
              <span className="text-sm font-semibold tracking-wider text-text-muted uppercase">
                {t('nav.menu')}
              </span>
              <div className="flex items-center gap-3">
                <LanguageSwitcher />
                <button
                  onClick={onClose}
                  aria-label={t('nav.closeMenu')}
                  className="text-text-muted hover:text-text-main transition-colors p-1.5 rounded-lg hover:bg-white/5 active:scale-95 min-w-[36px] min-h-[36px] flex items-center justify-center"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Links con detección de ruta activa */}
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="flex flex-col gap-1">
                {/* Indicadores */}
                <li>
                  <Link
                    to="/indicators"
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isRouteActive('/indicators')
                        ? 'bg-dark-700 text-accent-primary font-semibold'
                        : 'text-text-muted hover:bg-dark-700 hover:text-accent-primary font-medium'
                    }`}
                  >
                    <BarChart3 size={18} />
                    <span>{t('nav.indicators')}</span>
                  </Link>
                </li>

                {/* Recursos (acordeón) */}
                <li>
                  <button
                    onClick={() => setResourcesOpen(!resourcesOpen)}
                    aria-expanded={resourcesOpen}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      isResourcesActive
                        ? 'bg-dark-700/60 text-accent-primary font-semibold'
                        : 'text-text-muted hover:bg-dark-700 hover:text-accent-primary font-medium'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <BookOpen size={18} />
                      {t('nav.resources')}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {resourcesOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="overflow-hidden ml-4 mt-1 border-l border-white/10"
                      >
                        {resourceLinks.map((link) => {
                          const Icon = link.icon;
                          const active = isRouteActive(link.to);
                          return (
                            <li key={link.to}>
                              <Link
                                to={link.to}
                                onClick={handleLinkClick}
                                className={`flex items-center gap-3 pl-4 pr-3 py-2.5 text-sm rounded-md transition-colors ${
                                  active
                                    ? 'text-accent-primary font-semibold bg-white/5'
                                    : 'text-text-muted hover:text-accent-primary hover:bg-white/5'
                                }`}
                              >
                                <Icon size={15} />
                                <span>{link.label}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>

                {/* Precios */}
                <li>
                  <Link
                    to="/pricing"
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isRouteActive('/pricing')
                        ? 'bg-dark-700 text-accent-primary font-semibold'
                        : 'text-text-muted hover:bg-dark-700 hover:text-accent-primary font-medium'
                    }`}
                  >
                    <Tag size={18} />
                    <span>{t('nav.pricing')}</span>
                  </Link>
                </li>

                {/* Contacto */}
                <li>
                  <Link
                    to="/contact"
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isRouteActive('/contact')
                        ? 'bg-dark-700 text-accent-primary font-semibold'
                        : 'text-text-muted hover:bg-dark-700 hover:text-accent-primary font-medium'
                    }`}
                  >
                    <MessageCircle size={18} />
                    <span>{t('nav.contact')}</span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Footer con botón de sesión */}
            <div className="p-4 border-t border-white/10 flex-shrink-0">
              <Link
                to={isAuthenticated ? '/dashboard' : '/login'}
                onClick={handleLinkClick}
                className="block"
              >
                <Button variant="secondary" className="w-full">
                  {isAuthenticated ? (
                    <span className="flex flex-col items-center leading-tight gap-0.5">
                      <span className="text-sm">{t('nav.login')}</span>
                      <span className="text-[10px] opacity-75 truncate max-w-[200px]">
                        {userDisplayName}
                      </span>
                    </span>
                  ) : (
                    t('nav.signIn')
                  )}
                </Button>
              </Link>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
