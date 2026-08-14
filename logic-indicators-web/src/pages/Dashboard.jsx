// src/pages/Dashboard.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { LogOut, Package, Monitor, Home, BookOpen, Pencil, X, Check, Loader2, HelpCircle, AlertCircle, Info } from "lucide-react";
import { getDownloadUrl, getDisplayName, getProductCategory, applyUnlocks, getPrerequisites } from "../data/downloads";
import { useLanguage } from '../context/languageContext';
import { useAuth } from "../hooks/useAuth";

// Title Case para el nombre del usuario en el header.
// Robusto a inputs en cualquier caso: "juan" -> "Juan", "JUAN" -> "Juan",
// "juan perez" -> "Juan Perez", "jose maria" -> "Jose Maria".
// Usa toLowerCase() para que el resto de las letras queden en minuscula
// (CSS `capitalize` solo cambia la primera letra, no toca el resto, asi que
// "JUAN" -> "JUAN" y queda inconsistente). String(str || '') protege contra
// nombre undefined/null durante el loading.
const toTitleCase = (str) =>
  String(str || '').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

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
  // LOGICA DE PRODUCTOS — derivamos visibilidad segun la regla de negocio:
  //   - Los archivos pre-requisito (Core, Engine, ambos, o nada) NO son
  //     parte de la compra del usuario. Se muestran arriba de "Tus
  //     productos" segun la combinacion que tenga habilitada. La logica
  //     completa (reglas) vive en getPrerequisites() en downloads.js.
  //     Esta pagina solo llama el helper y renderiza el array resultante.
  //   - Los productos con categoria 'system' (LOGIC_CONFIGURATIONS,
  //     LOGIC_ENGINE) se filtran del listado de "Tus productos" para que
  //     no aparezcan duplicados. Quedan en PRODUCTS por compat historica.
  //   - Productos vencidos siguen apareciendo en "Tus productos" con el
  //     boton Renovar, y SI disparan la seccion de pre-requisitos (la
  //     logica en getPrerequisites considera cualquier producto, activo
  //     o no).
  //   - applyUnlocks(): enriquece la lista con los pares que se venden
  //     juntos (Volume Profile <-> Composite, Footprint <-> Footer).
  //     Es la primera transformacion para que el resto de la logica
  //     (filtros, visibilidad, render) trabaje sobre la lista completa.
  // ===========================================================================
  const productos = applyUnlocks(userData?.productos_activos || []);
  const esActivo = (p) => !p.fecha_expiracion || new Date(p.fecha_expiracion) > new Date();
  const activos = productos.filter(esActivo);

  const packs = activos.filter((p) => getProductCategory(p.nombre_producto) === 'pack');
  const individuales = activos.filter((p) => getProductCategory(p.nombre_producto) === 'individual');

  // Lista de pre-requisitos a mostrar (Core, Engine, ambos, o []). La
  // logica de combinacion vive en getPrerequisites() — si cambia una
  // regla, se modifica solo ahi.
  const prerequisites = getPrerequisites(productos);

  // Productos del usuario (excluyendo los del sistema, que quedan en PRODUCTS
  // por compat historica pero no se renderizan). Se listan todos
  // (activos + vencidos) — los vencidos muestran el boton Renovar.
  const productosVisibles = productos.filter(
    (p) => getProductCategory(p.nombre_producto) !== 'system',
  );

  // Empty state solo si NO hay contenido visible: ni pre-requisitos ni productos.
  const hasVisibleContent = prerequisites.length > 0 || productosVisibles.length > 0;

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
        {/*
          LAYOUT (md+):
            Columna izquierda: Tus Productos y Suscripciones (con row-span-2,
            crece hacia abajo segun la cantidad de productos del usuario).
            Columna derecha: Machine ID arriba + Documentacion abajo.
          Mobile: stack vertical en orden Products, Machine ID, Documentation.
        */}

        {/* Tus Productos y Suscripciones */}
        <div className="md:row-span-2 bg-dark-800 border border-dark-700 p-6 md:p-8 rounded-2xl md:rounded-3xl h-fit">
          <div className="flex items-center gap-3 mb-4 text-accent-primary">
            <Package size={24} />
            <h2 className="text-xl font-bold text-text-main">{t('dashboard.products.cardTitle')}</h2>
          </div>

          {!hasVisibleContent ? (
            <p className="text-text-muted text-sm">
              {t('dashboard.products.emptyState')}
            </p>
          ) : (
            <>
              {/* Sub-seccion: Pre-requisitos.
                  La lista de archivos a mostrar la decide getPrerequisites()
                  en downloads.js segun la combinacion de productos del
                  usuario. Esta UI solo renderiza lo que el helper devuelve. */}
              {prerequisites.length > 0 && (
                <div className="mb-6 p-4 md:p-5 bg-accent-secondary/5 border border-accent-secondary/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Info size={18} className="text-accent-secondary shrink-0" />
                    <h3 className="text-base md:text-lg font-bold text-text-main">
                      {t('dashboard.products.systemConfig.title')}
                    </h3>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed mb-4">
                    {t('dashboard.products.systemConfig.subtitle')}
                  </p>
                  <span className="inline-block text-xs uppercase tracking-wider font-bold text-accent-secondary bg-accent-secondary/10 border border-accent-secondary/20 px-2.5 py-1 rounded mb-4">
                    {t('dashboard.products.systemConfig.installFirstBadge')}
                  </span>
                  <ul className="space-y-3">
                    {prerequisites.map((file) => (
                      <li
                        key={file.key}
                        className="p-3 md:p-4 bg-dark-900 border border-accent-secondary/30 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-text-main font-semibold text-sm truncate mb-1">
                            {t(`dashboard.products.systemConfig.productNames.${file.key}`)}
                          </p>
                          <span className="text-xs text-accent-secondary font-medium">
                            {t('dashboard.products.systemConfig.requiredBadge')}
                          </span>
                        </div>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs bg-accent-secondary/20 text-accent-secondary px-4 py-2 rounded-full hover:bg-accent-secondary hover:text-dark-900 transition-all font-bold whitespace-nowrap text-center"
                        >
                          {t('dashboard.products.downloadButton')}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Label "Tus productos" — solo si hay productos que listar abajo
                  del Core. Separa visualmente "instala esto primero" de
                  "lo que compraste". */}
              {productosVisibles.length > 0 && (
                <h3 className="text-xs uppercase tracking-wider text-text-muted font-bold mb-3">
                  {t('dashboard.products.yourProductsLabel')}
                </h3>
              )}

              {/* Sub-seccion: Tus productos (packs + individuales, activos y vencidos).
                  Excluye productos del sistema (que tienen su propia sub-seccion). */}
              {productosVisibles.length > 0 && (
                <ul className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  {productosVisibles.map((prod, i) => {
                    const downloadUrl = getDownloadUrl(prod.nombre_producto);

                    // LÓGICA DE SUSCRIPCIONES
                    const isLifetime = !prod.fecha_expiracion;
                    const expDate = new Date(prod.fecha_expiracion);
                    const isExpired = !isLifetime && new Date() > expDate;

                    return (
                      <li
                        // Key estable por nombre_producto (+ sufijo si es un
                        // unlock sintetico de applyUnlocks). NO usamos el index
                        // porque si la lista cambia (e.g. un producto vence o
                        // se compra uno nuevo), React reusa los elementos con
                        // el mismo index y puede mostrar datos incorrectos.
                        key={`${prod.nombre_producto}-${prod._unlockedFrom || 'owned'}`}
                        className={`p-4 bg-dark-900 border ${isExpired ? 'border-red-900/50 opacity-60' : 'border-dark-600 group hover:border-accent-secondary/50'} rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors`}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-text-main font-semibold text-sm truncate mb-1">
                            {getDisplayName(prod.nombre_producto) || `${t('dashboard.products.defaultNamePrefix')}${i + 1}`}
                          </p>

                          {/* Banderas de estado visual */}
                          {isLifetime ? (
                            <span className="text-xs text-green-400 font-medium">{t('dashboard.products.lifetime')}</span>
                          ) : isExpired ? (
                            <span className="text-xs text-red-500 font-medium">{t('dashboard.products.expiredPrefix')}{expDate.toLocaleDateString(language)}</span>
                          ) : (
                            <span className="text-xs text-yellow-400 font-medium">{t('dashboard.products.validUntilPrefix')}{expDate.toLocaleDateString(language)}</span>
                          )}
                        </div>

                        {/* Botón de descarga condicional */}
                        {!isExpired && downloadUrl ? (
                          <a
                            href={downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-accent-secondary/20 text-accent-secondary px-4 py-2 rounded-full hover:bg-accent-secondary hover:text-dark-900 transition-all font-bold whitespace-nowrap text-center"
                          >
                            {t('dashboard.products.downloadButton')}
                          </a>
                        ) : isExpired ? (
                          <button disabled className="text-xs bg-dark-700 text-text-muted px-4 py-2 rounded-full cursor-not-allowed whitespace-nowrap text-center">
                            {t('dashboard.products.renewButton')}
                          </button>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          )}
        </div>

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
        <div className="bg-dark-800 border border-dark-700 p-6 md:p-8 rounded-2xl md:rounded-3xl">
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
  );
};