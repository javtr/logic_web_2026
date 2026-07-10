// src/pages/NotFound.jsx
// Página 404 mínima para "solo zona de miembros".
// Se muestra si el usuario entra a una URL que no existe
// (ej. https://tu-app.onrender.com/alguna-ruta-random).
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const NotFound = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold text-accent-green mb-4">404</h1>
      <p className="text-text-muted text-lg mb-8 max-w-md">
        {t('notFound.message') || 'La página que buscas no existe.'}
      </p>
      <Link
        to="/login"
        className="bg-accent-green text-dark-900 font-bold py-3 px-6 rounded-xl hover:brightness-110 transition-all"
      >
        {t('notFound.cta') || 'Volver al inicio de sesión'}
      </Link>
    </div>
  );
};
