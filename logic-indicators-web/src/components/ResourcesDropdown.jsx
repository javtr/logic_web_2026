// src/components/ResourcesDropdown.jsx
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen, Gift, Sliders } from 'lucide-react';
import { useLanguage } from '../context/languageContext';

export const ResourcesDropdown = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // NOTA: Antes habia un useEffect aqui que cerraba el dropdown cuando
  // cambiaba location.pathname (re-render por navegacion). Eso es el
  // anti-patron de "setState in effect" que React moderno desaconseja.
  // Lo cerramos en el onClick de cada <Link> (abajo), que es donde
  // realmente sabemos que el usuario navega.

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Cerrar con tecla Escape
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const options = [
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
    <div className="relative" ref={dropdownRef}>
      {/* Botón trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 hover:text-accent-primary transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {t('nav.resources')}
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Menú desplegable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-3 w-56 bg-dark-800 border border-dark-700 rounded-xl shadow-2xl overflow-hidden z-50"
          >
            <div className="py-2">
              {options.map((option) => {
                const Icon = option.icon;
                return (
                  <Link
                    key={option.to}
                    to={option.to}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-text-muted hover:bg-dark-700 hover:text-accent-primary transition-colors"
                  >
                    <Icon size={16} />
                    <span>{option.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
