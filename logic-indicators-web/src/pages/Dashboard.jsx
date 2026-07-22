// src/pages/Dashboard.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { LogOut, Package, Monitor, Home, BookOpen, Pencil, X, Check, Loader2, Download } from "lucide-react";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Estado del bloque Machine ID:
  // - isEditing: false = muestra el ID actual como texto + botón 'Actualizar ID'
  //             true  = input editable + botones 'Guardar' / 'Cancelar'
  // - draftValue: el valor del input mientras se está editando
  // - isSaving: true mientras la llamada PUT al backend está en vuelo
  // - status: { type: 'success'|'error'|'loading', msg: string } para feedback
  // - savedFlash: true por 2s después de un guardado exitoso (muestra '✓ Guardado')
  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [savedFlash, setSavedFlash] = useState(false);
  const inputRef = useRef(null);
  const flashTimerRef = useRef(null);

  const userEmail = localStorage.getItem("logic_user_email");
  const token = localStorage.getItem("logic_token"); // Obtenemos el token aquí para usarlo en todo el componente

  useEffect(() => {
    if (!userEmail || !token) {
      navigate("/login");
      return;
    }

    // EL FIX DE SEGURIDAD: El email ya no viaja en la URL (Evita el IDOR).
    // Nota: Ajusta el puerto a 8004 o el dominio de tu proxy inverso
    fetch(`https://members.logicindicators.com/api/v1/members/portfolio`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        setDraftValue(data.machine_id_actual || "");
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando dashboard:", err);
        navigate("/login");
      });
  }, [userEmail, token, navigate]);

  // Limpieza del flash timer al desmontar
  useEffect(() => {
    return () => {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    };
  }, []);

  // ========== Handlers de Machine ID ==========

  const currentMachineId = userData?.machine_id_actual || "";
  const isUnchanged = draftValue === currentMachineId;

  const handleStartEdit = () => {
    setStatus({ type: "", msg: "" });
    setDraftValue(currentMachineId);
    setIsEditing(true);
    // Autofocus + select all del input (el siguiente tick)
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleCancel = () => {
    setDraftValue(currentMachineId);
    setStatus({ type: "", msg: "" });
    setIsEditing(false);
  };

  const handleUpdate = async (e) => {
    e?.preventDefault?.();
    if (isUnchanged || isSaving) return; // guard
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
        },
      );

      const result = await response.json();

      if (response.ok) {
        // Actualizamos el userData local con el nuevo ID para que el
        // modo idle muestre el valor guardado, no el viejo.
        setUserData((prev) => ({
          ...prev,
          machine_id_actual: draftValue,
        }));
        setStatus({ type: "success", msg: result.message || "ID actualizado con éxito" });
        setIsEditing(false);
        setSavedFlash(true);
        // Limpiar el timer anterior si existe, después programar el nuevo
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
    // Enter se maneja nativo por el form (onSubmit)
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

        {/* Botones de navegación — en mobile a la derecha del nombre,
            en desktop agrupados a la derecha con separador */}
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

      {/* Grid de cards: 1 col en mobile, 2 col en desktop
          Layout:
            ┌────────────┬────────────┐
            │ Machine ID │ Indicadores│
            ├────────────┴────────────┤
            │ Documentación (full)     │
            │ [Ir a docs][Instalación]│
            └──────────────────────────┘ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Gestión de Machine ID — posición: top-left */}
        <div className="bg-dark-800 border border-dark-700 p-6 md:p-8 rounded-2xl md:rounded-3xl">
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
            // ========== Modo IDLE: muestra el ID como texto plano ==========
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
            // ========== Modo EDITING: input + Guardar / Cancelar ==========
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

        {/* Descarga única (PLACEHOLDER) — top-right */}
        <div className="bg-dark-800 border border-dark-700 p-6 md:p-8 rounded-2xl md:rounded-3xl">
          <div className="flex items-center gap-3 mb-4 text-accent-primary">
            <Package size={24} />
            <h2 className="text-xl font-bold text-text-main">Tus Indicadores</h2>
          </div>

          <p className="text-text-muted mb-6 leading-relaxed">
            Durante esta prueba, todos los indicadores se entregan en un único archivo ZIP.
          </p>

          <a
            href="https://pub-dae211f37c2b49448acb81600156089f.r2.dev/LOF_Suite_Beta_04.zip"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-accent-primary text-dark-900 font-bold py-3 md:py-3.5 px-5 md:px-6 rounded-xl md:rounded-2xl hover:brightness-110 transition-all"
          >
            <Package size={20} />
            Descargar paquete completo
          </a>
        </div>

        {/* Documentación completa (privada, requiere auth) — full-width, bottom */}
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

          <div className="flex flex-col sm:flex-row gap-3">
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
              <Download size={18} />
              Instrucciones de instalación
            </Button>
          </div>
        </div>

        {/* ============================================================
            Listado de Productos — DESHABILITADO TEMPORALMENTE
            ------------------------------------------------------------
            Esta sección muestra los productos activos del usuario con su
            botón de descarga individual desde R2. YA FUNCIONA en producción:
              - Consume userData.productos_activos (viene del backend).
              - Descarga desde https://r2.logicindicators.com/dl/<codigo>.zip
              - Estilos y UX ya probados.

            ESTÁ COMENTADA porque durante la prueba actual los usuarios
            reciben TODOS los indicadores en un único archivo ZIP, no por
            producto individual.

            CUANDO TERMINEN LAS PRUEBAS - restaurar:
              1. Borrar el bloque "Descarga única (PLACEHOLDER)" de abajo.
              2. Descomentar este bloque (quitar las marcas de comentario).
              3. Verificar que los estilos del grid md:grid-cols-2 siguen OK.
            ============================================================ */}
        {/* <div className="bg-dark-800 border border-dark-700 p-8 rounded-3xl md:col-span-2">
          <div className="flex items-center gap-3 mb-8 text-accent-primary">
            <Package size={24} />
            <h2 className="text-xl font-bold text-text-main">
              Tus Indicadores
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userData.productos_activos &&
            userData.productos_activos.length > 0 ? (
              userData.productos_activos.map((prod, i) => (
                <div
                  key={i}
                  className="p-5 bg-dark-900 border border-dark-600 rounded-2xl flex items-center justify-between group hover:border-accent-secondary/50 transition-all"
                >
                  <span className="text-text-main font-semibold">
                    {prod.nombre_producto}
                  </span>
                  <a
                    href={`https://r2.logicindicators.com/dl/${prod.codigo_producto}.zip`}
                    className="text-xs bg-accent-secondary/20 text-accent-secondary px-4 py-2 rounded-full hover:bg-accent-secondary hover:text-white transition-all font-bold"
                  >
                    Descargar V18
                  </a>
                </div>
              ))
            ) : (
              <p className="text-text-muted col-span-2">
                No tienes productos activos asociados.
              </p>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};
