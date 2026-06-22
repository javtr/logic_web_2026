// src/pages/Home.jsx
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/Button';
import { IndicatorCard } from '../components/IndicatorCard';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { Accordion } from '../components/Accordion';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Home = () => {
  const { t } = useLanguage();
  const [isLifetime, setIsLifetime] = useState(true); // Estado para el Toggle de precios

  // Mapeo de preguntas para el Acordeón
  const faqItems = [
    { title: t('faq.q1'), content: t('faq.a1') },
    { title: t('faq.q2'), content: t('faq.a2') },
    { title: t('faq.q3'), content: t('faq.a3') },
  ];

  return (
    <div className="flex flex-col gap-24 pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent-green/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-text-main tracking-tight mb-8">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Button variant="primary" className="w-full sm:w-auto text-lg px-8 py-3">
              {t('hero.cta')}
            </Button>
            <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-3">
              {t('hero.explore')}
            </Button>
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN DE INDICADORES */}
      <section className="px-6 container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">{t('home.suiteTitle')}</h2>
          <p className="text-text-muted text-lg">{t('home.suiteSubtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <IndicatorCard title="Logic Imprint" badge="Pro / Flagship" description={t('home.imprintDesc')} />
          <IndicatorCard title="Logic Footprint" description={t('home.footprintDesc')} />
          <IndicatorCard title="Logic Profile" description={t('home.profileDesc')} />
        </div>
      </section>

      {/* 3. TESTIMONIOS (Diseño Simple) */}
      <section className="bg-dark-800/50 py-20 px-6 border-y border-dark-700">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-text-main mb-12">{t('home.testimonialsTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-dark-900 border border-dark-700">
              <p className="text-text-muted italic mb-6">"Since incorporating Logic Imprint into my daily routine, my understanding of absorption at key levels has completely changed. Essential tool for NT8."</p>
              <h4 className="font-bold text-text-main">- Michael R., Prop Trader</h4>
            </div>
            <div className="p-8 rounded-2xl bg-dark-900 border border-dark-700">
              <p className="text-text-muted italic mb-6">"The footprint charts are incredibly lightweight compared to others I've used. It doesn't bog down my NinjaTrader even during high volatility."</p>
              <h4 className="font-bold text-text-main">- David S., Retail Trader</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRECIOS (Pricing) */}
      <section className="px-6 container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">{t('home.pricingTitle')}</h2>
          <ToggleSwitch 
            isLifetime={isLifetime} 
            onToggle={() => setIsLifetime(!isLifetime)} 
          />
        </div>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-5xl mx-auto">
          {/* Tarjeta Plan Individual */}
          <div className="flex-1 p-8 rounded-3xl bg-dark-800 border border-dark-700 flex flex-col">
            <h3 className="text-2xl font-bold text-text-main mb-2">Single Indicator</h3>
            <p className="text-text-muted mb-6">Perfect for focused traders.</p>
            <div className="text-4xl font-extrabold text-text-main mb-8">
              {isLifetime ? "$249" : "$99"} <span className="text-lg text-text-muted font-normal">/ {isLifetime ? 'once' : 'yr'}</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow text-text-muted">
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent-blue" /> Choose one indicator</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent-blue" /> 1 Machine ID</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent-blue" /> Standard Support</li>
            </ul>
            <Button variant="outline" className="w-full">{t('home.getStarted')}</Button>
          </div>

          {/* Tarjeta Plan Suite Completa (Destacada) */}
          <div className="flex-1 p-8 rounded-3xl bg-dark-800 border-2 border-accent-green relative flex flex-col shadow-[0_0_30px_rgba(0,230,118,0.1)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-green text-dark-900 font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wider">
              {t('home.pricingBestValue')}
            </div>
            <h3 className="text-2xl font-bold text-text-main mb-2">Full Suite</h3>
            <p className="text-text-muted mb-6">All tools for institutional edge.</p>
            <div className="text-4xl font-extrabold text-text-main mb-8">
              {isLifetime ? "$699" : "$299"} <span className="text-lg text-text-muted font-normal">/ {isLifetime ? 'once' : 'yr'}</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow text-text-main">
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent-green" /> Logic Imprint Pro</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent-green" /> All current & future indicators</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent-green" /> 2 Machine IDs</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent-green" /> Priority Support</li>
            </ul>
            <Button variant="primary" className="w-full">{t('home.getStarted')}</Button>
          </div>
        </div>

        {/* Banner de Confianza */}
        <div className="mt-12 flex justify-center items-center gap-3 text-text-muted text-sm">
          <ShieldCheck size={18} className="text-accent-green" />
          <span>Safe and secure checkout via Lemon Squeezy</span>
        </div>
      </section>

      {/* 5. PREGUNTAS FRECUENTES (FAQ) */}
      <section className="px-6 container mx-auto">
        <h2 className="text-3xl font-bold text-center text-text-main mb-12">{t('home.faqTitle')}</h2>
        <Accordion items={faqItems} />
      </section>

      {/* 6. CTA FINAL */}
      <section className="px-6 container mx-auto mb-12">
        <div className="bg-gradient-to-r from-dark-800 to-dark-700 p-12 rounded-3xl border border-dark-600 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 blur-[80px] rounded-full pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4 relative z-10">{t('home.ctaTitle')}</h2>
          <p className="text-text-muted text-lg mb-8 max-w-2xl mx-auto relative z-10">{t('home.ctaSubtitle')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Button variant="primary">{t('home.choosePlan')}</Button>
            <Button variant="outline">{t('home.exploreAll')}</Button>
          </div>
        </div>
      </section>

    </div>
  );
};