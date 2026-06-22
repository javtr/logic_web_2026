import { Button } from '../Button';
import { Link } from 'react-router-dom';

export const IndicatorInfo = ({ title, subtitle, description, image, buttonText, slug }) => (
  <div className="bg-dark-800 border border-dark-700 rounded-3xl overflow-hidden">
    {/* Header */}
    <div className="flex items-center justify-between p-8 pb-4 border-b border-dark-700">
      <div className="flex-shrink-0 w-1/2">
        <h3 className="text-3xl font-bold text-text-main">{title}</h3>
        <h4 className="text-xl font-semibold text-text-muted mt-2">{subtitle}</h4>
      </div>
      <div className="flex flex-col items-start w-1/2 gap-3">
        <p className="text-lg font-medium text-text-muted">{description}</p>
        <Link to={`/indicators/${slug}`} className="inline-block w-full">
            <Button variant="primary" className="text-sm px-4 py-1.5">
              {buttonText}
            </Button>
          </Link>
      </div>
    </div>

    {/* Image */}
    <div className="h-56 w-full">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
  </div>
);

