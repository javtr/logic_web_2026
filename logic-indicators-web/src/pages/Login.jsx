// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/Button';
import { ArrowLeft, Mail } from 'lucide-react';

export const Login = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Usamos la URL real de producción
      const response = await fetch(`https://admin.logicindicators.com/api/v1/members/portfolio/${email}`);
      
      if (!response.ok) {
        throw new Error("No se encontró una cuenta activa con este correo.");
      }

      const data = await response.json();
      
      // Guardamos el correo para mantener la sesión en esta fase
      localStorage.setItem('logic_user_email', data.mail);
      
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col justify-center items-center relative overflow-hidden px-6">
      <Link to="/" className="absolute top-8 left-8 text-text-muted hover:text-text-main flex items-center gap-2 transition-colors">
        <ArrowLeft size={20} />
        {t('login.backToHome') || 'Volver'}
      </Link>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-text-main mb-3">Zona de Miembros</h1>
          <p className="text-text-muted">Gestiona tus indicadores y licencias</p>
        </div>

        <div className="bg-dark-800 border border-dark-700 p-8 rounded-2xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-main block">Correo Electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-text-muted" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="ejemplo@correo.com"
                  className="w-full bg-dark-900 border border-dark-700 text-text-main text-sm rounded-lg focus:ring-1 focus:ring-accent-blue focus:border-accent-blue block pl-10 p-3 outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
              {isLoading ? 'Verificando...' : 'Entrar al Panel'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};