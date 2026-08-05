// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/languageContext';
import { Button } from '../components/Button';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ArrowLeft, Mail, Key } from 'lucide-react';

// =============================================================================
// OPEN-REDIRECT PROTECTION
// =============================================================================
// Valida que el `next` param sea un path interno seguro.
// Sin esto, un atacante podría hacer /login?next=https://evil.com
// y el usuario sería redirigido a un sitio de phishing después de
// autenticarse. Solo aceptamos paths que empiecen con "/" pero NO con
// "//" (URL absoluta sin protocolo) ni "/\" (algunos browsers raros).
// =============================================================================
const FALLBACK_AFTER_LOGIN = '/dashboard';
const getSafeNext = (raw) => {
  if (!raw || typeof raw !== 'string') return FALLBACK_AFTER_LOGIN;
  if (!raw.startsWith('/')) return FALLBACK_AFTER_LOGIN;
  if (raw.startsWith('//')) return FALLBACK_AFTER_LOGIN;
  if (raw.startsWith('/\\')) return FALLBACK_AFTER_LOGIN;
  return raw;
};

// =============================================================================
// CONTROLES DE FRECUENCIA (frontend-only)
// =============================================================================
// Esto NO es una frontera de seguridad real — el backend (o Cloudflare
// rate limiting) es quien tiene que hacer el rate limit duro. Estos
// controles frenan el abuso casual y mejoran la UX:
//   - Cooldown de 30s entre request-otp (anti doble-click, anti spam naive)
//   - Max 5 intentos de OTP, luego 10 min de lockout (anti "pruebo y pruebo")
//   - Persistencia en localStorage para que el bloqueo sobreviva recargas
//
// Un atacante con DevTools puede saltarse todo esto (clear localStorage,
// usar otro browser, etc.). Por eso esto es defense-in-depth, no la
// primera linea de defensa.
// =============================================================================
const RESEND_COOLDOWN_SECONDS = 30;
const MAX_OTP_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 10 * 60 * 1000; // 10 minutos (intentos fallidos)
const RATE_LIMIT_LOCKOUT_MS = 60 * 1000; // 1 minuto (HTTP 429 del backend)
const ATTEMPTS_KEY = 'logic_otp_attempts';
const LOCKOUT_KEY = 'logic_otp_lockout_until';

const readAttempts = () => {
  if (typeof window === 'undefined') return 0;
  return Number(localStorage.getItem(ATTEMPTS_KEY) || 0);
};

const readLockout = () => {
  if (typeof window === 'undefined') return 0;
  return Number(localStorage.getItem(LOCKOUT_KEY) || 0);
};

export const Login = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Next param: a dónde ir después del login. Lo sanitizamos para
  // evitar open-redirect (ver getSafeNext arriba).
  const next = getSafeNext(searchParams.get('next'));

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // Paso 1: Email, Paso 2: Código OTP
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Cooldown de reenvío (entre request-otp calls)
  const [resendCooldown, setResendCooldown] = useState(0); // segundos restantes

  // Intentos fallidos de OTP y lockout (persisten en localStorage)
  const [otpAttempts, setOtpAttempts] = useState(readAttempts);
  const [otpLockoutUntil, setOtpLockoutUntil] = useState(readLockout);

  // AUTO-LOGIN: Si el usuario ya tiene token, lo enviamos a `next`
  // (o al Dashboard por defecto).
  useEffect(() => {
    const existingToken = localStorage.getItem('logic_token');
    const existingEmail = localStorage.getItem('logic_user_email');
    if (existingToken && existingEmail) {
      navigate(next, { replace: true });
    }
  }, [navigate, next]);

  // Cooldown: interval que decrementa cada segundo mientras resendCooldown > 0.
  // Se monta una sola vez al mount; el state interno decide cuando parar.
  useEffect(() => {
    const id = setInterval(() => {
      setResendCooldown((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Re-chequear lockout al montar.
  // Si el bloqueo empezo en una sesion anterior, marcamos el state. Si
  // el bloqueo ya expiro, limpiamos localStorage y el state.
  //
  // Antes: useEffect con [t] en deps se re-ejecutaba en cada cambio de
  // idioma (t() no esta memoizada en el Provider). Ahora solo se ejecuta
  // al mount. El texto del mensaje de error se calcula derivado en
  // render, asi se traduce automaticamente al cambiar idioma.
  useEffect(() => {
    const lockUntil = readLockout();
    if (lockUntil > Date.now()) {
      setOtpLockoutUntil(lockUntil);
    } else if (lockUntil > 0) {
      localStorage.removeItem(LOCKOUT_KEY);
      setOtpLockoutUntil(0);
    }
  }, []);

  const isLockedOut = otpLockoutUntil > Date.now();
  const attemptsRemaining = Math.max(0, MAX_OTP_ATTEMPTS - otpAttempts);
  const showAttemptsRemaining = step === 2 && otpAttempts > 0 && !isLockedOut;

  // =====================================================================
  // PASO 1: Solicitar el código
  // =====================================================================
  const handleRequestOTP = async (e) => {
    e?.preventDefault?.();
    if (isLockedOut) return;
    if (resendCooldown > 0) return; // defensa (boton ya deberia estar disabled)

    setIsLoading(true);
    setError('');

    // Reset de intentos al pedir un codigo nuevo: si el usuario pidio
    // uno antes, fallo N veces, y ahora pidio otro, los N anteriores
    // no cuentan contra el nuevo codigo.
    setOtpAttempts(0);
    localStorage.removeItem(ATTEMPTS_KEY);
    localStorage.removeItem(LOCKOUT_KEY);
    setOtpLockoutUntil(0);

    try {
      const response = await fetch('https://members.logicindicators.com/api/v1/members/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        // 404: el backend dice explicitamente que el email no esta
        // registrado. Mostramos mensaje i18n (no el detail en espanol
        // del backend, para no romper el locale del usuario).
        if (response.status === 404) {
          throw new Error(t('login.errors.emailNotRegistered'));
        }
        // 429: rate limit del backend (3 req/min por IP). Arrancamos
        // el cooldown local para que el usuario no siga clickeando
        // y reciba 429 cada vez.
        if (response.status === 429) {
          setResendCooldown(RESEND_COOLDOWN_SECONDS);
          throw new Error(t('login.errors.tooManyRequests'));
        }
        throw new Error(data.detail || t('login.errors.sendCodeFallback'));
      }

      setStep(2);
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // =====================================================================
  // PASO 2: Verificar el código
  // =====================================================================
  const handleVerifyOTP = async (e) => {
    e?.preventDefault?.();
    if (isLockedOut) {
      const minutes = Math.ceil((otpLockoutUntil - Date.now()) / 60000);
      setError(t('login.errors.tooManyAttempts').replace('{minutes}', String(minutes)));
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://members.logicindicators.com/api/v1/members/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, codigo: otp })
      });

      const data = await response.json();

      if (!response.ok) {
        // 429: rate limit del backend (5 req/min por IP). NO contamos
        // como intento fallido (el backend rechazo por exceso, no por
        // codigo incorrecto). Aplicamos un lockout corto (1 min) para
        // que la UI muestre el bloqueo y no permita reintentar hasta
        // que el backend resetee.
        if (response.status === 429) {
          const lockUntil = Date.now() + RATE_LIMIT_LOCKOUT_MS;
          setOtpLockoutUntil(lockUntil);
          localStorage.setItem(LOCKOUT_KEY, String(lockUntil));
          throw new Error(t('login.errors.tooManyRequests'));
        }

        // Incrementar contador de intentos fallidos
        const newAttempts = otpAttempts + 1;
        setOtpAttempts(newAttempts);
        localStorage.setItem(ATTEMPTS_KEY, String(newAttempts));

        // Si llega al maximo, bloquear
        if (newAttempts >= MAX_OTP_ATTEMPTS) {
          const lockUntil = Date.now() + LOCKOUT_DURATION_MS;
          setOtpLockoutUntil(lockUntil);
          localStorage.setItem(LOCKOUT_KEY, String(lockUntil));
          const minutes = Math.round(LOCKOUT_DURATION_MS / 60000);
          throw new Error(t('login.errors.tooManyAttempts').replace('{minutes}', String(minutes)));
        }

        throw new Error(data.detail || t('login.errors.verifyOtpFallback'));
      }

      // Exito: limpiar contadores antes de navegar
      localStorage.removeItem(ATTEMPTS_KEY);
      localStorage.removeItem(LOCKOUT_KEY);

      localStorage.setItem('logic_token', data.access_token);
      localStorage.setItem('logic_user_email', email);

      // Disparamos el evento custom para que useAuth() sincronice
      window.dispatchEvent(new Event('logic-auth-change'));

      navigate(next, { replace: true });
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
        {t('login.backToHome')}
      </Link>

      {/* Switcher de idioma — esquina superior derecha, mismo nivel
          que el boton "Volver al inicio" (top-left). Mismo componente
          que en el Dashboard y la Navbar para mantener consistencia. */}
      <div className="absolute top-8 right-8 z-10">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-text-main mb-3">{t('login.title')}</h1>
          <p className="text-text-muted">
            {step === 1
              ? t('login.subtitleEmail')
              : t('login.subtitleOtp')}
          </p>
        </div>

        <div className="bg-dark-800 border border-dark-700 p-8 rounded-2xl shadow-xl">
          {step === 1 ? (
            <form onSubmit={handleRequestOTP} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main block">{t('login.emailLabel')}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-text-muted" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={t('login.emailPlaceholder')}
                    className="w-full bg-dark-900 border border-dark-700 text-text-main text-sm rounded-lg focus:ring-1 focus:ring-accent-secondary focus:border-accent-secondary block pl-10 p-3 outline-none"
                  />
                </div>
              </div>

              {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">{error}</div>}

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading || resendCooldown > 0}
              >
                {isLoading
                  ? t('login.sendingButton')
                  : resendCooldown > 0
                    ? t('login.sendCodeCooldown').replace('{seconds}', String(resendCooldown))
                    : t('login.sendCodeButton')}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main block">{t('login.otpLabel')}</label>
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
                    disabled={isLockedOut}
                    placeholder={t('login.otpPlaceholder')}
                    className="w-full bg-dark-900 border border-dark-700 text-text-main text-xl tracking-[1em] text-center rounded-lg focus:ring-1 focus:ring-accent-secondary focus:border-accent-secondary block p-3 outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                {/* Contador de intentos restantes (solo si ya fallo al menos 1) */}
                {showAttemptsRemaining && (
                  <p className="text-xs text-text-muted text-center">
                    {t('login.otpAttemptsRemaining').replace('{n}', String(attemptsRemaining))}
                  </p>
                )}
              </div>

              {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">{error}</div>}

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading || isLockedOut}
              >
                {isLoading ? t('login.verifyingButton') : t('login.enterButton')}
              </Button>

              {/* Botones secundarios: reenviar codigo y cambiar email */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleRequestOTP}
                  disabled={isLoading || isLockedOut || resendCooldown > 0}
                  className="w-full text-sm text-accent-secondary hover:text-accent-primary transition-colors disabled:text-text-muted disabled:cursor-not-allowed"
                >
                  {resendCooldown > 0
                    ? t('login.sendCodeCooldown').replace('{seconds}', String(resendCooldown))
                    : t('login.resendCodeButton')}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setOtp('');
                    setError('');
                    setOtpAttempts(0);
                    localStorage.removeItem(ATTEMPTS_KEY);
                  }}
                  disabled={isLoading || isLockedOut}
                  className="w-full text-sm text-text-muted hover:text-text-main transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {t('login.changeEmailButton')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
