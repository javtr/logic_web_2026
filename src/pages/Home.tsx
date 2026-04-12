import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Activity, Layers, Zap, TrendingUp, Shield, Lock, CreditCard } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/Button';
import Card from '../components/Card';
import Accordion from '../components/Accordion';
import Toggle from '../components/Toggle';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [isYearly, setIsYearly] = React.useState(false);

  const indicators = [
    { icon: BarChart3, ...t.indicators.items.logicFootprint },
    { icon: Activity, ...t.indicators.items.logicFooter },
    { icon: Layers, ...t.indicators.items.logicProfile },
    { icon: Zap, ...t.indicators.items.logicBigTrades },
    { icon: TrendingUp, ...t.indicators.items.logicAnalytics },
  ];

  const testimonials = [
    { name: "Michael T.", role: "Day Trader", text: "LogicFootprint completely changed how I view order flow. My win rate improved by 30% in just two months." },
    { name: "Sarah L.", role: "Futures Trader", text: "The best indicators I've used for NinjaTrader. Clean, accurate, and the support is incredible." },
    { name: "David R.", role: "Prop Trader", text: "Worth every penny. The lifetime deal is a no-brainer for serious traders." },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="gradient-text">{t.hero.title}</span>
              </h1>
              <p className="text-text-secondary text-lg mb-8 max-w-xl">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/pricing">
                  <Button variant="primary" size="lg">
                    {t.hero.ctaPrimary}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/indicators">
                  <Button variant="outline" size="lg">
                    {t.hero.ctaSecondary}
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-2xl p-8 border border-white/10">
                <div className="aspect-video bg-bg-secondary rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-24 h-24 text-cyan-400/50" />
                </div>
                <div className="absolute -top-4 -right-4 bg-bg-card border border-white/10 rounded-lg p-4 shadow-xl">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-sm font-medium">Live Data</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Indicators Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.indicators.title}</h2>
            <p className="text-text-secondary">{t.indicators.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {indicators.map((indicator, index) => (
              <motion.div
                key={indicator.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center mb-4">
                    <indicator.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{indicator.name}</h3>
                  <p className="text-text-secondary text-sm">{indicator.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.testimonials.title}</h2>
            <p className="text-text-secondary">{t.testimonials.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-white font-bold">
                      {testimonial.name[0]}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-text-muted text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-text-secondary italic">"{testimonial.text}"</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.pricing.title}</h2>
            <p className="text-text-secondary mb-8">{t.pricing.subtitle}</p>
            <Toggle
              leftLabel={t.pricing.toggle.yearly}
              rightLabel={t.pricing.toggle.lifetime}
              isRight={!isYearly}
              onToggle={() => setIsYearly(!isYearly)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Yearly Plan */}
            <Card className={`${isYearly ? 'border-cyan-500/50' : ''}`}>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">{t.pricing.plans.yearly.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{t.pricing.plans.yearly.price}</span>
                  <span className="text-text-muted">{t.pricing.plans.yearly.period}</span>
                </div>
                <p className="text-text-secondary mb-6">{t.pricing.plans.yearly.description}</p>
                <ul className="text-left space-y-3 mb-8">
                  {t.pricing.plans.yearly.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="secondary" className="w-full">
                  {t.pricing.plans.yearly.cta}
                </Button>
              </div>
            </Card>

            {/* Lifetime Plan */}
            <Card className={`relative ${!isYearly ? 'border-cyan-500/50 glow' : ''}`}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {t.pricing.plans.lifetime.badge}
                </span>
              </div>
              <div className="text-center pt-4">
                <h3 className="text-xl font-semibold mb-2">{t.pricing.plans.lifetime.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{t.pricing.plans.lifetime.price}</span>
                  <span className="text-text-muted">{t.pricing.plans.lifetime.period}</span>
                </div>
                <p className="text-text-secondary mb-6">{t.pricing.plans.lifetime.description}</p>
                <ul className="text-left space-y-3 mb-8">
                  {t.pricing.plans.lifetime.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="primary" className="w-full">
                  {t.pricing.plans.lifetime.cta}
                </Button>
              </div>
            </Card>
          </div>

          {/* Trust Banner */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="font-medium">{t.pricing.trust.title}</span>
            </div>
            <p className="text-text-muted text-sm mb-6">{t.pricing.trust.subtitle}</p>
            <div className="flex items-center justify-center space-x-6">
              <CreditCard className="w-8 h-8 text-text-muted" />
              <Lock className="w-8 h-8 text-text-muted" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.faq.title}</h2>
          </div>
          <Accordion items={t.faq.items} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="text-center">
              <h3 className="text-2xl font-bold mb-2">{t.cta.explore.title}</h3>
              <p className="text-text-secondary mb-6">{t.cta.explore.description}</p>
              <Link to="/indicators">
                <Button variant="outline">{t.hero.ctaSecondary}</Button>
              </Link>
            </Card>
            <Card className="text-center border-cyan-500/30">
              <h3 className="text-2xl font-bold mb-2">{t.cta.choose.title}</h3>
              <p className="text-text-secondary mb-6">{t.cta.choose.description}</p>
              <Link to="/pricing">
                <Button variant="primary">{t.hero.ctaPrimary}</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
