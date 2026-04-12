import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Pricing: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">{t.nav.pricing}</h1>
        <p className="text-text-secondary">See our pricing section on the home page for detailed plans.</p>
      </div>
    </div>
  );
};

export default Pricing;
