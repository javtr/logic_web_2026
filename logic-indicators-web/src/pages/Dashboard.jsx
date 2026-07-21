// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { LogOut, Package, Monitor, Home, BookOpen } from "lucide-react";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [newMachineId, setNewMachineId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState({ type: "", msg: "" });

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
        setNewMachineId(data.machine_id_actual || "");
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando dashboard:", err);
        navigate("/login");
      });
  }, [userEmail, token, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", msg: "Actualizando..." });

    try {
      // Nota: Ajusta la URL al nuevo dominio/puerto del microservicio de miembros
      const response = await fetch(
        "https://members.logicindicators.com/api/v1/members/machine-id",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nuevo_machine_id: newMachineId, // Ya no enviamos el email. El backend confía solo en el Token.
          }),
        },
      );

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          msg: result.message || "ID actualizado con éxito",
        });
      } else {
        throw new Error(result.detail || "Error al actualizar");
      }
    } catch (err) {
      setStatus({ type: "error", msg: err.message });
    }
  };

  if (isLoading || !userData)
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center text-text-muted">
        Cargando datos del perfil...
      </div>
    );

  return (
    <div className="container mx-auto py-16 px-6 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-dark-800 p-8 rounded-3xl border border-dark-700">
        <div>
          <h1 className="text-3xl font-bold text-text-main mb-1">
            Bienvenido, {userData.nombre}
          </h1>
          <p className="text-text-muted">{userData.mail}</p>
        </div>
        
        {/* Contenedor de Botones de Navegación */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors font-medium"
          >
            <Home size={20} /> Volver al Inicio
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("logic_user_email");
              localStorage.removeItem("logic_token");
              navigate("/login");
            }}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors font-medium"
          >
            <LogOut size={20} /> Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Documentación completa (privada, requiere auth) */}
        <div className="bg-dark-800 border border-dark-700 p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-4 text-accent-secondary">
            <BookOpen size={24} />
            <h2 className="text-xl font-bold text-text-main">
              Documentación completa
            </h2>
          </div>

          <p className="text-text-muted mb-6 leading-relaxed">
            Accedé al manual técnico detallado de cada indicator: configuración completa, parámetros, mejores prácticas y troubleshooting.
          </p>

          <Button
            variant="primary"
            onClick={() => navigate("/dashboard/docs")}
            className="w-full"
          >
            <BookOpen size={18} />
            Ir a la documentación
          </Button>
        </div>

        {/* Gestión de Machine ID */}
        <div className="bg-dark-800 border border-dark-700 p-8 rounded-3xl h-fit">
          <div className="flex items-center gap-3 mb-6 text-accent-secondary">
            <Monitor size={24} />
            <h2 className="text-xl font-bold text-text-main">NinjaTrader ID</h2>
          </div>

          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">
                Machine ID Actual
              </label>
              <input
                type="text"
                value={newMachineId}
                onChange={(e) => setNewMachineId(e.target.value)}
                className="w-full bg-dark-900 border border-dark-600 text-text-main p-4 rounded-xl focus:border-accent-secondary outline-none transition-all"
                placeholder="Pega tu ID aquí"
              />
            </div>

            {status.msg && (
              <p
                className={`text-sm font-medium ${status.type === "success" ? "text-green-400" : "text-red-400"}`}
              >
                {status.msg}
              </p>
            )}

            <Button type="submit" variant="primary" className="w-full">
              Actualizar ID
            </Button>
          </form>
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
        {/* <div className="bg-dark-800 border border-dark-700 p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-8 text-accent-green">
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

        {/* ============================================================
            Descarga única (PLACEHOLDER para pruebas)
            ------------------------------------------------------------
            Reemplaza temporalmente la lista de productos individuales.
            URL placeholder — AJUSTAR a la real antes de pasarles el link.
            ============================================================ */}
        <div className="bg-dark-800 border border-dark-700 p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-6 text-accent-green">
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
            className="inline-flex items-center justify-center gap-2 w-full bg-accent-green text-dark-900 font-bold py-4 px-6 rounded-2xl hover:brightness-110 transition-all"
          >
            <Package size={20} />
            Descargar paquete completo de indicadores
          </a>
        </div>
      </div>
    </div>
  );
};
