// src/components/blog/BlogCTA.jsx
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/languageContext';

export const BlogCTA = () => {
  const { language } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-accent-primary/30 bg-gradient-to-br from-dark-800 via-dark-850 to-dark-900 p-8 md:p-10 my-12 shadow-2xl">
      {/* Glow decorativo de fondo */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-accent-primary/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-accent-primary/20 text-accent-primary border border-accent-primary/30 mb-4">
          <Sparkles size={13} />
          <span>
            {language === 'es'
              ? 'Potencia tu lectura de mercado'
              : 'Supercharge your market reading'}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 tracking-tight">
          {language === 'es'
            ? '¿Listo para operar con datos institucionales reales en NinjaTrader 8?'
            : 'Ready to trade with real institutional data in NinjaTrader 8?'}
        </h3>

        <p className="text-sm md:text-base text-text-muted leading-relaxed mb-6">
          {language === 'es'
            ? 'Deja de adivinar en velas tradicionales. Con la suite de Logic Indicators tendrás Footprint multi-columna, mapas térmicos de liquidez y detección de Big Trades a 60 FPS estables.'
            : 'Stop guessing on plain candlestick charts. With the Logic Indicators suite, you get multi-column Footprint, resting liquidity heatmaps, and institutional Big Trades detection at stable 60 FPS.'}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-primary hover:bg-accent-primary/90 text-dark-950 font-bold text-sm shadow-lg shadow-accent-primary/20 transition-all duration-200"
          >
            <span>{language === 'es' ? 'Ver Planes y Licencias' : 'View Plans & Licensing'}</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            to="/resources/free-indicators"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 transition-all duration-200"
          >
            <ShieldCheck size={16} className="text-accent-primary" />
            <span>{language === 'es' ? 'Descargar indicadores gratuitos' : 'Download free indicators'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

