// src/pages/Dashboard.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { LogOut, Package, Monitor, Home, BookOpen, Pencil, X, Check, Loader2, HelpCircle, AlertCircle, Play } from "lucide-react";
import { applyUnlocks, getDisplayName } from "../data/downloads";
import { useLanguage } from '../context/languageContext';
import { useAuth } from "../hooks/useAuth";
import { InstallationWizard } from "../components/dashboard/InstallationWizard";
import { generateInstallationSteps } from "../data/installation";

// Title Case para el nombre del usuario en el header.
// Robusto a inputs en cualquier caso: "juan" -> "Juan", "JUAN" -> "Juan",
// "juan perez" -> "Juan Perez", "jose maria" -> "Jose Maria".
// Usa toLowerCase() para que el resto de las letras queden en minuscula
// (CSS `capitalize` solo cambia la primera letra, no toca el resto, asi que
// "JUAN" -> "JUAN" y queda inconsistente). String(str || '') protege contra
// nombre undefined/null durante el loading.
const toTitleCase = (str) =>
  String(str || '').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

// Icono SVG oficial de Discord
const DiscordIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

export const Dashboard = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [savedFlash, setSavedFlash] = useState(false);
  // Estado del wizard de instalación. La logica de qué pasos se muestran
  // vive en generateInstallationSteps() (src/data/installation.js) y se
  // recalcula solo cuando cambia la lista de productos del usuario.
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const inputRef = useRef(null);
  const flashTimerRef = useRef(null);

  const userEmail = localStorage.getItem("logic_user_email");
  const token = localStorage.getItem("logic_token");

  // Ref para `t`. La función t() del LanguageProvider cambia de identidad en
  // cada render (no está memoizada), por eso si la pongo en las deps del
  // useEffect del portfolio, se re-fetchea en cada cambio de idioma. Con
  // este ref, leemos la versión actual de t sin triggerear re-fetches.
  const tRef = useRef(t);

  // Sync del ref en cada render (no triggerea nada porque useRef no causa
  // re-render). Es la forma estandar de leer un valor "vivo" desde un
  // useEffect sin ponerlo en las deps.
  tRef.current = t;

  // Helper: cuando el backend rechaza el token (401), limpiamos la sesión
  // y mandamos al usuario a /login. Usamos useAuth().logout() para que
  // dispare el evento 'logic-auth-change' (mantiene sincronizado el hook
  // useAuth en otros componentes que ya estén montados).
  const handleUnauthorized = useCallback(() => {
    logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  useEffect(() => {
    if (!userEmail || !token) {
      navigate("/login");
      return;
    }

    // AbortController para cancelar el fetch si el componente se desmonta
    // o si cambia el token antes de que termine. Sin esto, si el usuario
    // cierra sesion rapido, la respuesta del portfolio viejo podria
    // pisar el estado del componente (race condition).
    const abortController = new AbortController();

    fetch(`https://members.logicindicators.com/api/v1/members/portfolio`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      signal: abortController.signal,
    })
      .then((res) => {
        // 401 = token expirado/inválido -> logout y al login.
        // Otros errores (500, 503, red) -> mensaje en pantalla, sin logout.
        if (res.status === 401) {
          handleUnauthorized();
          return null;
        }
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
      })
      .then((data) => {
        if (!data) return; // 401 path, handleUnauthorized ya redirigió
        if (import.meta.env.DEV) {
          console.log("[Dashboard] userData from /portfolio:", data);
        }
        setUserData(data);
        setDraftValue(data.machine_id_actual || "");
        setIsLoading(false);
      })
      .catch((err) => {
        // AbortError es esperado cuando el componente se desmonta o cambia
        // el token antes de que termine el fetch. No mostrar error al usuario.
        if (err.name === "AbortError") return;
        // Cualquier error no-401 (red, 500, JSON inválido) -> mostrar mensaje
        // en pantalla en vez de deslogear al usuario automáticamente.
        if (import.meta.env.DEV) {
          console.error("Error cargando dashboard:", err);
        }
        setLoadError(tRef.current("dashboard.error.loadFailed"));
        setIsLoading(false);
      });

    // Cleanup: si el componente se desmonta o las deps cambian, abortar
    // el fetch en vuelo. Evita pisar el estado con datos viejos.
    return () => abortController.abort();
  }, [userEmail, token, navigate, handleUnauthorized]);

  useEffect(() => {
    return () => {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    };
  }, []);

  const currentMachineId = userData?.machine_id_actual || "";
  const isUnchanged = draftValue === currentMachineId;

  // ===========================================================================
  // LOGICA DE PRODUCTOS + WIZARD DE INSTALACION
  //   - applyUnlocks(): enriquece la lista con los pares que se venden
  //     juntos (Volume Profile <-> Composite, Footprint <-> Footer) para
  //     que la lista del dashboard muestre ambos aunque el backend mande
  //     solo uno.
  //   - generateInstallationSteps(): produce los pasos del wizard. En el
  //     modelo simplificado siempre son 3 pasos (tutorial + pack +
  //     reiniciar NT8). La logica de QUE pack se le asigna al usuario
  //     vive en getAssignedPack() dentro de downloads.js.
  //   - En esta pagina SOLO se renderiza el CTA que abre el wizard. La
  //     descarga directa se quito para forzar el flujo guiado y reducir
  //     tickets de soporte.
  // ===========================================================================
  const productos = applyUnlocks(userData?.productos_activos || []);

  // Pasos del wizard de instalación. Se recalculan en cada render porque
  // `productos` cambia de referencia (applyUnlocks devuelve un array nuevo),
  // pero es O(n) en una lista chica — el costo es despreciable. No usamos
  // useMemo porque la dependencia cambiaría siempre de todos modos.
  // El array resultante lo consume <InstallationWizard> via prop.
  const installationSteps = generateInstallationSteps(productos);
  // Hay pasos "instalables" reales (descartando el success final) si el
  // usuario tiene al menos un producto descargable. Determina si mostramos
  // el CTA o no y el empty state.
  const hasInstallableSteps = installationSteps.some(
    (step) => step.type !== 'success',
  );

  // ===========================================================================
  // LISTA INFORMATIVA DE PRODUCTOS DEL USUARIO
  //   - Se muestra debajo del CTA, dentro de la misma card "Tus Productos".
  //   - NO son botones de descarga: solo muestran qué productos tiene el
  //     usuario licenciados y su estado (vitalicio / vigente hasta fecha /
  //     vencido).
  //   - La descarga real (del pack asignado) se hace dentro del wizard de
  //     instalación. La lista refleja lo que el backend dice que el usuario
  //     tiene activo, NO el archivo que se descarga (que es uno de los 3
  //     packs decidido por `getAssignedPack()` en downloads.js).
  //   - En el modelo actual, todos los productos del backend son licenciados
  //     (los 7 indicators + los 3 packs). No hay archivos de sistema que
  //     filtrar, `productos` se usa directo.
  // ===========================================================================
  const userProducts = productos;

  // Helper: formatea la fecha de expiracion segun el idioma actual.
  // Devuelve null si la fecha no es valida. Usamos toLocaleDateString para
  // que el formato siga la convencion del idioma (es-ES produce "31 dic 2025",
  // en-US produce "Dec 31, 2025").
  const formatExpirationDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
    const locale = language === 'es' ? 'es-ES' : 'en-US';
    return date.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Helper: determina el estado visual (label + color) de un producto.
  // - Sin fecha de expiracion -> Licencia Vitalicia (accent-secondary)
  // - Fecha pasada -> Expirado (rojo)
  // - Fecha futura -> Valido hasta (gris)
  // Si la fecha es invalida, caemos a "vitalicio" para no mostrar un
  // "Expirado" falso por un bug del backend.
  const getProductStatus = (prod) => {
    const exp = prod.fecha_expiracion;
    if (!exp) {
      return {
        label: t('dashboard.products.lifetime'),
        className: 'text-accent-secondary',
      };
    }
    const expDate = new Date(exp);
    if (isNaN(expDate.getTime())) {
      return {
        label: t('dashboard.products.lifetime'),
        className: 'text-accent-secondary',
      };
    }
    if (expDate < new Date()) {
      return {
        label: `${t('dashboard.products.expiredPrefix')}${formatExpirationDate(exp)}`,
        className: 'text-red-400',
      };
    }
    return {
      label: `${t('dashboard.products.validUntilPrefix')}${formatExpirationDate(exp)}`,
      className: 'text-text-muted',
    };
  };

  const handleStartEdit = () => {
    setStatus({ type: "", msg: "" });
    setDraftValue(currentMachineId);
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleCancel = () => {
    setDraftValue(currentMachineId);
    setStatus({ type: "", msg: "" });
    setIsEditing(false);
  };

  const handleUpdate = async (e) => {
    e?.preventDefault?.();
    if (isUnchanged || isSaving) return;
    setIsSaving(true);
    setStatus({ type: "loading", msg: t('dashboard.machineId.saving') });

    try {
      const response = await fetch(
        "https://members.logicindicators.com/api/v1/members/machine-id",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nuevo_machine_id: draftValue,
          }),
        }
      );

      // 401 = sesión expirada también acá (el token puede haber expirado
      // mientras el usuario estaba editando el form). Misma lógica que en
      // el load inicial: logout + redirect.
      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      const result = await response.json();

      if (response.ok) {
        setUserData((prev) => ({
          ...prev,
          machine_id_actual: draftValue,
        }));
        setStatus({ type: "success", msg: result.message || t('dashboard.machineId.updateSuccessFallback') });
        setIsEditing(false);
        setSavedFlash(true);
        if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
        flashTimerRef.current = setTimeout(() => setSavedFlash(false), 2500);
      } else {
        throw new Error(result.detail || t('dashboard.machineId.updateErrorFallback'));
      }
    } catch (err) {
      setStatus({ type: "error", msg: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center text-text-muted">
        {t('dashboard.loadingMessage')}
      </div>
    );
  }

  // Error de carga (red, 500, JSON inválido, etc.). Diferenciamos este
  // caso del loading para que el usuario vea un mensaje claro y pueda
  // reintentar, en vez de un loop de "loading..." infinito.
  if (loadError) {
    return (
      <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center text-center px-6 gap-4">
        <AlertCircle className="text-red-400" size={48} />
        <p className="text-text-muted text-lg max-w-md">{loadError}</p>
        <Button variant="primary" onClick={() => window.location.reload()}>
          {t('dashboard.error.retryButton')}
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 md:py-16 px-4 md:px-6 max-w-5xl">
      {/* Header del Dashboard */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 mb-8 md:mb-12 bg-dark-800 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-dark-700">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-main mb-1">
            {t('dashboard.header.welcomePrefix')}{toTitleCase(userData.nombre)}
          </h1>
          <p className="text-sm md:text-base text-text-muted">{userData.mail}</p>
        </div>

        <div className="flex items-center gap-2 md:gap-4 -mx-2 md:mx-0">
          <LanguageSwitcher />
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 md:gap-2 text-sm md:text-base text-text-muted hover:text-text-main transition-colors font-medium px-2 py-1 rounded-md"
          >
            <Home size={18} className="md:hidden" />
            <Home size={20} className="hidden md:block" />
            <span className="hidden sm:inline">{t('dashboard.header.backToHome')}</span>
            <span className="sm:hidden">{t('dashboard.header.backToHomeShort')}</span>
          </button>

          <span className="w-px h-5 bg-dark-600 hidden md:block" aria-hidden />

          <button
            onClick={() => {
              // logout() del hook limpia localStorage Y dispara el evento
              // 'logic-auth-change', asi useAuth() en otros componentes
              // (Navbar, etc.) se sincroniza inmediatamente. Si lo hicieramos
              // a mano solo con localStorage, esos componentes no se enteran.
              logout();
              navigate("/login");
            }}
            className="flex items-center gap-1.5 md:gap-2 text-sm md:text-base text-red-400 hover:text-red-300 transition-colors font-medium px-2 py-1 rounded-md"
          >
            <LogOut size={18} className="md:hidden" />
            <LogOut size={20} className="hidden md:block" />
            <span className="hidden sm:inline">{t('dashboard.header.logout')}</span>
            <span className="sm:hidden">{t('dashboard.header.logoutShort')}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* COLUMNA IZQUIERDA: Tus Productos + Comunidad Discord */}
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Tus Productos y Suscripciones */}
          <div className="bg-dark-800 border border-dark-700 p-6 md:p-8 rounded-2xl md:rounded-3xl h-fit">
            <div className="flex items-center gap-3 mb-4 text-accent-primary">
              <Package size={24} />
              <h2 className="text-xl font-bold text-text-main">{t('dashboard.products.cardTitle')}</h2>
            </div>

            {userProducts.length === 0 ? (
              <p className="text-text-muted text-sm">
                {t('dashboard.products.emptyState')}
              </p>
            ) : (
              <>
                {/* CTA principal: abre el wizard de instalación paso a paso.
                    Es la única vía de descarga. La descarga individual se
                    quitó del dashboard para forzar el flujo guiado y reducir
                    tickets de soporte. El wizard vive en
                    components/dashboard/InstallationWizard. */}
                {hasInstallableSteps && (
                  <div className="mb-6">
                    <Button
                      variant="primary"
                      onClick={() => setIsWizardOpen(true)}
                      className="w-full"
                      aria-label={t('dashboard.installation.startCta')}
                    >
                      <Play size={18} />
                      {t('dashboard.installation.startCta')}
                    </Button>
                    <p className="text-xs text-text-muted mt-2 italic text-center">
                      {t('dashboard.installation.alreadyInstalled')}
                    </p>
                  </div>
                )}

                {/* Lista informativa de productos del usuario. NO son
                    botones de descarga: solo muestran el nombre y el estado
                    (vitalicio / vigente / vencido). La descarga real ocurre
                    dentro del wizard de instalación. */}
                <div>
                  <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                    {t('dashboard.products.yourProductsLabel')}
                  </h3>
                  <div className="space-y-2">
                    {userProducts.map((prod) => {
                      const name =
                        getDisplayName(prod.nombre_producto) || prod.nombre_producto;
                      const status = getProductStatus(prod);
                      return (
                        <div
                          key={prod.nombre_producto}
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 p-3 bg-dark-900 border border-dark-700 rounded-lg"
                        >
                          <span className="text-sm font-medium text-text-main">
                            {name}
                          </span>
                          <span
                            className={`text-xs font-medium ${status.className}`}
                          >
                            {status.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Comunidad Discord */}
          <div className="bg-dark-800 border border-dark-700 p-6 md:p-8 rounded-2xl md:rounded-3xl h-fit">
            <div className="flex items-center gap-3 mb-4 text-[#5865F2]">
              <DiscordIcon size={26} />
              <h2 className="text-xl font-bold text-text-main">
                {t('dashboard.discord.cardTitle')}
              </h2>
            </div>

            <p className="text-text-muted mb-6 leading-relaxed text-sm md:text-base">
              {t('dashboard.discord.description')}
            </p>

            <a
              href={t('dashboard.discord.url')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-[#5865F2]/20 hover:shadow-[#5865F2]/30 active:scale-[0.99]"
            >
              <DiscordIcon size={20} />
              <span>{t('dashboard.discord.cta')}</span>
            </a>
          </div>
        </div>

        {/* COLUMNA DERECHA: Machine ID + Documentación */}
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Gestión de Machine ID */}
          <div className="bg-dark-800 border border-dark-700 p-6 md:p-8 rounded-2xl md:rounded-3xl h-fit">
            <div className="flex items-center justify-between gap-3 mb-6 text-accent-secondary">
              <div className="flex items-center gap-3">
                <Monitor size={24} />
                <h2 className="text-xl font-bold text-text-main">{t('dashboard.machineId.cardTitle')}</h2>
              </div>
              {savedFlash && (
                <span className="flex items-center gap-1.5 text-sm font-semibold text-accent-secondary animate-pulse">
                  <Check size={16} /> {t('dashboard.machineId.savedFlash')}
                </span>
              )}
            </div>

            {!isEditing ? (
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">
                    {t('dashboard.machineId.currentIdLabel')}
                  </label>
                  {currentMachineId ? (
                    <p
                      className="w-full bg-dark-900 border border-dark-700 text-text-main p-4 rounded-xl font-mono text-sm break-all"
                      title={currentMachineId}
                    >
                      {currentMachineId}
                    </p>
                  ) : (
                    <p className="w-full bg-dark-900 border border-dashed border-dark-700 text-text-muted p-4 rounded-xl italic text-sm">
                      {t('dashboard.machineId.noIdConfigured')}
                    </p>
                  )}
                </div>

                <Button
                  onClick={handleStartEdit}
                  variant="primary"
                  className="w-full sm:w-auto"
                >
                  <Pencil size={18} />
                  {t('dashboard.machineId.updateButton')}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleUpdate} className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">
                    {t('dashboard.machineId.newIdLabel')}
                  </label>
                  <input
                    ref={inputRef}
                    type="text"
                    value={draftValue}
                    onChange={(e) => setDraftValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isSaving}
                    className="w-full bg-dark-900 border border-dark-600 text-text-main p-4 rounded-xl focus:border-accent-secondary outline-none transition-all font-mono text-sm disabled:opacity-60"
                    placeholder={t('dashboard.machineId.newIdPlaceholder')}
                  />
                  <p className="text-xs text-text-muted mt-2">
                    {t('dashboard.machineId.saveHint')}
                  </p>
                </div>

                {status.msg && status.type !== "loading" && (
                  <p
                    className={`text-sm font-medium ${
                      status.type === "success" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {status.msg}
                  </p>
                )}

                <div className="flex flex-col-reverse sm:flex-row gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="flex-1"
                  >
                    <X size={18} />
                    {t('dashboard.machineId.cancelButton')}
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isUnchanged || isSaving}
                    className="flex-1"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        {t('dashboard.machineId.saving')}
                      </>
                    ) : (
                      <>
                        <Check size={18} />
                        {t('dashboard.machineId.saveButton')}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Documentación */}
          <div className="bg-dark-800 border border-dark-700 p-6 md:p-8 rounded-2xl md:rounded-3xl h-fit">
            <div className="flex items-center gap-3 mb-4 text-accent-secondary">
              <BookOpen size={24} />
              <h2 className="text-xl font-bold text-text-main">
                {t('dashboard.documentation.cardTitle')}
              </h2>
            </div>

            <p className="text-text-muted mb-6 leading-relaxed">
              {t('dashboard.documentation.description')}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Button
                variant="primary"
                onClick={() => navigate("/dashboard/docs")}
                className="w-full sm:w-auto"
              >
                <BookOpen size={18} />
                {t('dashboard.documentation.goToDocsButton')}
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/dashboard/docs/installation")}
                className="w-full sm:w-auto"
              >
                <BookOpen size={18} />
                {t('dashboard.documentation.installationButton')}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/faq")}
                className="w-full sm:w-auto"
              >
                <HelpCircle size={18} />
                {t('dashboard.documentation.faqButton')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Wizard de instalación. createPortal en document.body (ver el
          componente). Se monta siempre, isOpen controla visibilidad. */}
      <InstallationWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        steps={installationSteps}
        t={t}
      />
    </div>
  );
};