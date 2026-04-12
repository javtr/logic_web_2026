import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { path: '/indicators', label: t.nav.indicators },
    { path: '/resources', label: t.nav.resources },
    { path: '/pricing', label: t.nav.pricing },
    { path: '/contact', label: t.nav.contact },
  ];

  return (
    <footer className="bg-bg-secondary border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <span className="text-lg font-bold gradient-text">Logic Indicators</span>
            </div>
            <p className="text-text-secondary text-sm max-w-xs">
              {t.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-text-secondary hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.legal}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-text-secondary hover:text-cyan-400 transition-colors text-sm">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-text-secondary hover:text-cyan-400 transition-colors text-sm">
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-text-secondary hover:text-cyan-400 transition-colors text-sm">
                  {t.footer.refund}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-text-muted text-sm">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
