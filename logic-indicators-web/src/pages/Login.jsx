import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/Button';
import { ArrowLeft, Mail, Key } from 'lucide-react';

export const Login = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // Paso 1: Email, Paso 2: Código OTP
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // PASO 1: Solicitar el código al servidor
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://admin.logicindicators.com/api/v1/members/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Error al enviar el código");
      }

      setStep(2); // Avanzamos al paso del código
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // PASO 2: Verificar el código y obtener el Token JWT
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`https://admin.logicindicators.com/api/v1/members/verify-otp?email=${email}&codigo=${otp}`, {
        method: 'POST'
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Código incorrecto o expirado");
      }
      
      // Guardamos el TOKEN de seguridad y el email
      localStorage.setItem('logic_token', data.access_token);
      localStorage.setItem('logic_user_email', email);
      
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
          <p className="text-text-muted">
            {step === 1 
              ? "Ingresa tu correo para recibir un código de acceso" 
              : "Ingresa el código de 6 dígitos enviado a tu email"}
          </p>
        </div>

        <div className="bg-dark-800 border border-dark-700 p-8 rounded-2xl shadow-xl">
          {/* Si estamos en el paso 1, mostramos el form de Email */}
          {step === 1 ? (
            <form onSubmit={handleRequestOTP} className="space-y-6">
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
                    className="w-full bg-dark-900 border border-dark-700 text-text-main text-sm rounded-lg focus:ring-1 focus:ring-accent-secondary focus:border-accent-secondary block pl-10 p-3 outline-none"
                  />
                </div>
              </div>

              {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">{error}</div>}

              <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Enviar Código'}
              </Button>
            </form>
          ) : (
            /* Si estamos en el paso 2, mostramos el form de Código OTP */
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main block">Código de Verificación</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key size={18} className="text-text-muted" />
                  </div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength={6}
                    placeholder="000000"
                    className="w-full bg-dark-900 border border-dark-700 text-text-main text-xl tracking-[1em] text-center rounded-lg focus:ring-1 focus:ring-accent-secondary focus:border-accent-secondary block p-3 outline-none"
                  />
                </div>
              </div>

              {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">{error}</div>}

              <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                {isLoading ? 'Verificando...' : 'Entrar al Panel'}
              </Button>
              
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="w-full text-sm text-text-muted hover:text-text-main transition-colors"
              >
                Volver a intentar con otro correo
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};