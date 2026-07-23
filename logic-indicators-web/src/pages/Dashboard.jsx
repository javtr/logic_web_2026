// src/pages/Dashboard.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { LogOut, Package, Monitor, Home, BookOpen, Pencil, X, Check, Loader2, HelpCircle } from "lucide-react";
import { getDownloadUrl, getDisplayName } from "../data/downloads";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [savedFlash, setSavedFlash] = useState(false);
  const inputRef = useRef(null);
  const flashTimerRef = useRef(null);

  const userEmail = localStorage.getItem("logic_user_email");
  const token = localStorage.getItem("logic_token");

  useEffect(() => {
    if (!userEmail || !token) {
      navigate("/login");
      return;
    }

    fetch(`https://members.logicindicators.com/api/v1/members/portfolio`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
      })
      .then((data) => {
        console.log("[Dashboard] userData from /portfolio:", data);
        setUserData(data);
        setDraftValue(data.machine_id_actual || "");
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando dashboard:", err);
        // Si hay un error, devolvemos al usuario al login
        navigate("/login");
      });
  }, [userEmail, token, navigate]);

  useEffect(() => {
    return () => {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    };
  }, []);

  const currentMachineId = userData?.machine_id_actual || "";
  const isUnchanged = draftValue === currentMachineId;

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
    setStatus({ type: "loading", msg: "Guardando..." });

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

      const result = await response.json();

      if (response.ok) {
        setUserData((prev) => ({
          ...prev,
          machine_id_actual: draftValue,
        }));
        setStatus({ type: "success", msg: result.message || "ID actualizado con éxito" });
        setIsEditing(false);
        setSavedFlash(true);
        if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
        flashTimerRef.current = setTimeout(() => setSavedFlash(false), 2500);
      } else {
        throw new Error(result.detail || "Error al actualizar");
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

  if (isLoading || !userData)
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center text-text-muted">
        Cargando datos del perfil...
      </div>
    );

  return (
    <div className="container mx-auto py-10 md:py-16 px-4 md:px-6 max-w-5xl">
      {/* Header del Dashboard */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 mb-8 md:mb-12 bg-dark-800 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-dark-700">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-main mb-1">
            Bienvenido, {userData.nombre}
          </h1>
          <p className="text-sm md:text-base text-text-muted">{userData.mail}</p>
        </div>

        <div className="flex items-center gap-2 md:gap-4 -mx-2 md:mx-0">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 md:gap-2 text-sm md:text-base text-text-muted hover:text-text-main transition-colors font-medium px-2 py-1 rounded-md"
          >
            <Home size={18} className="md:hidden" />
            <Home size={20} className="hidden md:block" />
            <span className="hidden sm:inline">Volver al Inicio</span>
            <span className="sm:hidden">Inicio</span>
          </button>

          <span className="w-px h-5 bg-dark-600 hidden md:block" aria-hidden />

          <button
            onClick={() => {
              localStorage.removeItem("logic_user_email");
              localStorage.removeItem("logic_token");
              navigate("/login");
            }}
            className="flex items-center gap-1.5 md:gap-2 text-sm md:text-base text-red-400 hover:text-red-300 transition-colors font-medium px-2 py-1 rounded-md"
          >
            <LogOut size={18} className="md:hidden" />
            <LogOut size={20} className="hidden md:block" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
            <span className="sm:hidden">Salir</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        
        {/* Gestión de Machine ID */}
        <div className="bg-dark-800 border border-dark-700 p-6 md:p-8 rounded-2xl md:rounded-3xl h-fit">
          <div className="flex items-center justify-between gap-3 mb-6 text-accent-secondary">
            <div className="flex items-center gap-3">
              <Monitor size={24} />
              <h2 className="text-xl font-bold text-text-main">NinjaTrader ID</h2>
            </div>
            {savedFlash && (
              <span className="flex items-center gap-1.5 text-sm font-semibold text-accent-secondary animate-pulse">
                <Check size={16} /> Guardado
              </span>
            )}
          </div>

          {!isEditing ? (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">
                  Machine ID Actual
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
                    No hay un ID configurado todavía
                  </p>
                )}
              </div>

              <Button
                onClick={handleStartEdit}
                variant="primary"
                className="w-full sm:w-auto"
              >
                <Pencil size={18} />
                Actualizar ID
              </Button>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">
                  Nuevo Machine ID
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  value={draftValue}
                  onChange={(e) => setDraftValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isSaving}
                  className="w-full bg-dark-900 border border-dark-600 text-text-main p-4 rounded-xl focus:border-accent-secondary outline-none transition-all font-mono text-sm disabled:opacity-60"
                  placeholder="Pega tu nuevo ID aquí"
                />
                <p className="text-xs text-text-muted mt-2">
                  Enter para guardar · Esc para cancelar
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
                  Cancelar
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
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Check size={18} />
                      Guardar nuevo ID
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Tus Productos y Suscripciones */}
        <div className="bg-dark-800 border border-dark-700 p-6 md:p-8 rounded-2xl md:rounded-3xl h-fit">
          <div className="flex items-center gap-3 mb-4 text-accent-primary">
            <Package size={24} />
            <h2 className="text-xl font-bold text-text-main">Tus Productos</h2>
          </div>

          {userData.productos_activos && userData.productos_activos.length > 0 ? (
            <ul className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {userData.productos_activos.map((prod, i) => {
                const downloadUrl = getDownloadUrl(prod.nombre_producto);
                
                // LÓGICA DE SUSCRIPCIONES
                const isLifetime = !prod.fecha_expiracion;
                const expDate = new Date(prod.fecha_expiracion);
                const isExpired = !isLifetime && new Date() > expDate;

                return (
                  <li
                    key={i}
                    className={`p-4 bg-dark-900 border ${isExpired ? 'border-red-900/50 opacity-60' : 'border-dark-600 group hover:border-accent-secondary/50'} rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-text-main font-semibold text-sm truncate mb-1">
                        {getDisplayName(prod.nombre_producto) || `Producto ${i + 1}`}
                      </p>
                      
                      {/* Banderas de estado visual */}
                      {isLifetime ? (
                        <span className="text-xs text-green-400 font-medium">Licencia Vitalicia</span>
                      ) : isExpired ? (
                        <span className="text-xs text-red-500 font-medium">Expirado el {expDate.toLocaleDateString()}</span>
                      ) : (
                        <span className="text-xs text-yellow-400 font-medium">Válido hasta {expDate.toLocaleDateString()}</span>
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
                        Descargar
                      </a>
                    ) : isExpired ? (
                      <button disabled className="text-xs bg-dark-700 text-text-muted px-4 py-2 rounded-full cursor-not-allowed whitespace-nowrap text-center">
                        Renovar
                      </button>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-text-muted text-sm">
              No tienes productos activos asociados.
            </p>
          )}
        </div>

        {/* Documentación */}
        <div className="md:col-span-2 bg-dark-800 border border-dark-700 p-6 md:p-8 rounded-2xl md:rounded-3xl">
          <div className="flex items-center gap-3 mb-4 text-accent-secondary">
            <BookOpen size={24} />
            <h2 className="text-xl font-bold text-text-main">
              Documentación completa
            </h2>
          </div>

          <p className="text-text-muted mb-6 leading-relaxed">
            Accedé al manual técnico detallado de cada indicator: configuración completa, parámetros, mejores prácticas y troubleshooting. ¿Recién empezás? Empezá por las instrucciones de instalación.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              variant="primary"
              onClick={() => navigate("/dashboard/docs")}
              className="w-full sm:w-auto"
            >
              <BookOpen size={18} />
              Ir a la documentación
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/dashboard/docs/installation")}
              className="w-full sm:w-auto"
            >
              <BookOpen size={18} />
              Instrucciones de instalación
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/faq")}
              className="w-full sm:w-auto"
            >
              <HelpCircle size={18} />
              Preguntas frecuentes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};