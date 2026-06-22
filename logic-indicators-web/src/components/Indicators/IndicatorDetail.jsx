import { Button } from '../Button';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import imgSample from '../../assets/indicators/sample_image.png';

export const IndicatorDetail = ({ title, subtitle, image, content }) => {
  const { t } = useLanguage();
  
  return (
    <div className="max-w-3xl mx-auto text-text-main py-12">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <h2 className="text-2xl text-accent-green mb-4">{subtitle}</h2>
      <img src={image || imgSample} alt={title} className="w-full h-72 object-cover rounded-lg mb-6" />
      <p className="text-lg leading-relaxed">{content}</p>
      <Link to="/indicators" className="inline-block mt-4">
        <Button variant="outline" className="text-lg px-8 py-3">{t('indicatorPage.back')}</Button>
      </Link>
    </div>
  );
};
