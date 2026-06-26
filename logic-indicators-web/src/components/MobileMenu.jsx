// src/components/MobileMenu.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, BookOpen, Gift, BarChart3, MessageCircle, Tag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './Button';

export const MobileMenu = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const location = useLocation();

  // Cierre automático al cambiar de ruta
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Resetear submenú cuando se cierra
  useEffect(() => {
    if (!isOpen) {
      setResourcesOpen(false);
    }
  }, [isOpen]);

  const handleLinkClick = () => {
    onClose();
  };

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
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="md:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={t('nav.menu')}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.25 }}
            className="fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-dark-900 border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between h-20 px-6 border-b border-white/10">
              <span className="text-sm font-semibold tracking-wider text-text-muted uppercase">
                {t('nav.menu')}
              </span>
              <button
                onClick={onClose}
                aria-label={t('nav.closeMenu')}
                className="text-text-muted hover:text-text-main transition-colors p-1"
              >
                <X size={22} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="flex flex-col gap-1">
                {/* Indicadores */}
                <li>
                  <Link
                    to="/indicators"
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-muted hover:bg-dark-700 hover:text-accent-green transition-colors"
                  >
                    <BarChart3 size={18} />
                    <span className="font-medium">{t('nav.indicators')}</span>
                  </Link>
                </li>

                {/* Precios */}
                <li>
                  <Link
                    to="/pricing"
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-muted hover:bg-dark-700 hover:text-accent-green transition-colors"
                  >
                    <Tag size={18} />
                    <span className="font-medium">{t('nav.pricing')}</span>
                  </Link>
                </li>

                {/* Contacto */}
                <li>
                  <Link
                    to="/contact"
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-muted hover:bg-dark-700 hover:text-accent-green transition-colors"
                  >
                    <MessageCircle size={18} />
                    <span className="font-medium">{t('nav.contact')}</span>
                  </Link>
                </li>

                {/* Recursos (acordeón) */}
                <li>
                  <button
                    onClick={() => setResourcesOpen(!resourcesOpen)}
                    aria-expanded={resourcesOpen}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-text-muted hover:bg-dark-700 hover:text-accent-green transition-colors"
                  >
                    <span className="flex items-center gap-3 font-medium">
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
                          return (
                            <li key={link.to}>
                              <Link
                                to={link.to}
                                onClick={handleLinkClick}
                                className="flex items-center gap-3 pl-4 pr-3 py-2.5 text-sm text-text-muted hover:text-accent-green transition-colors"
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
              </ul>
            </nav>

            {/* Footer con botón login */}
            <div className="p-4 border-t border-white/10">
              <Link to="/login" onClick={handleLinkClick} className="block">
                <Button variant="secondary" className="w-full">
                  {t('nav.login')}
                </Button>
              </Link>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
