// src/components/IndicatorCard.jsx
import { Button } from './Button';

export const IndicatorCard = ({ title, subtitle, description, image, buttonText = 'Leer más' }) => (
  <div className="group relative p-8 rounded-2xl bg-dark-800 border border-dark-700 hover:border-accent-secondary/50 transition-all duration-500">
    <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-accent-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    <div className="relative">
      {subtitle && <h4 className="text-lg font-medium mb-2 text-accent-secondary">{subtitle}</h4>}
      <h3 className="text-2xl font-bold mb-3 transition-colors">{title}</h3>
      <p className="text-text-muted mb-4">{description}</p>
      <div className="flex flex-col gap-4">
        {image && <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg" />}
        <Button variant="primary" className="w-full">{buttonText}</Button>
      </div>
    </div>
  </div>
);
