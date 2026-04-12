import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Activity, Layers, Zap, TrendingUp, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/Button';
import Card from '../components/Card';

const Indicators: React.FC = () => {
  const { t } = useLanguage();

  const indicators = [
    {
      icon: BarChart3,
      ...t.indicators.items.logicFootprint,
      features: [
        "Real-time delta analysis",
        "Imbalance detection",
        "Volume profile integration",
        "Customizable colors",
        "Multi-timeframe support"
      ]
    },
    {
      icon: Activity,
      ...t.indicators.items.logicFooter,
      features: [
        "DOM visualization",
        "Depth analysis",
        "Order flow tracking",
        "Heat map display",
        "Configurable alerts"
      ]
    },
    {
      icon: Layers,
      ...t.indicators.items.logicProfile,
      features: [
        "Volume profile analysis",
        "Market profile TPO",
        "Value area calculation",
        "POC tracking",
        "Custom session times"
      ]
    },
    {
      icon: Zap,
      ...t.indicators.items.logicBigTrades,
      features: [
        "Large trade detection",
        "Institutional activity tracking",
        "Unusual volume alerts",
        "Historical analysis",
        "Export capabilities"
      ]
    },
    {
      icon: TrendingUp,
      ...t.indicators.items.logicAnalytics,
      features: [
        "Multi-timeframe correlation",
        "Comprehensive dashboard",
        "Performance metrics",
        "Risk analysis tools",
        "Custom reports"
      ]
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">{t.indicators.title}</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t.indicators.subtitle}
          </p>
        </motion.div>

        {/* Indicators Grid */}
        <div className="space-y-8">
          {indicators.map((indicator, index) => (
            <motion.div
              key={indicator.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left: Info */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center">
                        <indicator.icon className="w-7 h-7 text-cyan-400" />
                      </div>
                      <h2 className="text-2xl font-bold">{indicator.name}</h2>
                    </div>
                    <p className="text-text-secondary text-lg">{indicator.description}</p>
                    <Button variant="primary">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>

                  {/* Right: Features */}
                  <div className="bg-bg-tertiary/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">Key Features</h3>
                    <ul className="space-y-3">
                      {indicator.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-text-secondary">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                            <Check className="w-3 h-3 text-emerald-400" />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Ready to elevate your trading?</h2>
            <p className="text-text-secondary mb-6">
              Get access to all our premium indicators with a single subscription.
            </p>
            <Button variant="primary" size="lg">
              View Pricing
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Indicators;
