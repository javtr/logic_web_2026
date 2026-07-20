// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, MonitorPlay, Mail, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-dark-700 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Columna 1: Branding */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-xl font-bold tracking-tighter text-text-main">
              LOGIC<span className="text-accent-primary">INDICATORS</span>
            </Link>
            <p className="mt-4 text-text-muted text-sm leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex gap-4 mt-6">
              {/* TODO: Reemplazar estos <button> por <a href={url} target="_blank" rel="noopener noreferrer"> */}
              {/*       cuando se conecten los links reales a Discord, YouTube y email. */}
              <button
                type="button"
                onClick={() => console.log('[Footer] Discord link not connected yet')}
                aria-label="Discord"
                className="text-text-muted hover:text-accent-secondary transition-colors"
              >
                <MessageCircle size={20} />
              </button>
              <button
                type="button"
                onClick={() => console.log('[Footer] YouTube link not connected yet')}
                aria-label="YouTube"
                className="text-text-muted hover:text-accent-secondary transition-colors"
              >
                <MonitorPlay size={20} />
              </button>
              <button
                type="button"
                onClick={() => console.log('[Footer] Email link not connected yet')}
                aria-label="Email"
                className="text-text-muted hover:text-accent-secondary transition-colors"
              >
                <Mail size={20} />
              </button>
            </div>
          </div>

          {/* Columna 2: Productos */}
          <div>
            <h4 className="text-text-main font-bold mb-6">{t('footer.products')}</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><Link to="/indicators" className="hover:text-accent-primary transition-colors">Logic Imprint</Link></li>
              <li><Link to="/indicators" className="hover:text-accent-primary transition-colors">Logic Footprint</Link></li>
              <li><Link to="/indicators" className="hover:text-accent-primary transition-colors">Logic Profile</Link></li>
            </ul>
          </div>

          {/* Columna 3: Soporte */}
          <div>
            <h4 className="text-text-main font-bold mb-6">{t('footer.support')}</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><Link to="/resources" className="hover:text-accent-primary transition-colors">{t('nav.resources')}</Link></li>
              <li><Link to="/contact" className="hover:text-accent-primary transition-colors">{t('footer.contact')}</Link></li>
              <li><Link to="/faq" className="hover:text-accent-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Columna 4: Seguridad */}
          <div>
            <h4 className="text-text-main font-bold mb-6">{t('footer.legal')}</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><a href="#" className="hover:text-text-main transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-text-main transition-colors">Terms of Service</a></li>
            </ul>
            <div className="mt-6 p-4 rounded-lg bg-dark-800 border border-dark-700 flex items-center gap-3">
              <ShieldCheck className="text-accent-primary" size={24} />
              <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">
                Secure SSL Encryption
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-dark-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>© {currentYear} Logic Indicators. All rights reserved.</p>
          <p>Handcrafted for NinjaTrader 8 traders.</p>
        </div>
      </div>
    </footer>
  );
};