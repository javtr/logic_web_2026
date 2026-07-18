// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { LogOut, Package, Monitor } from "lucide-react";

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

    // EL FIX: Añadir .then(res => res.json())
    fetch(`https://admin.logicindicators.com/api/v1/members/portfolio/${userEmail}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json(); // <--- ESTO FALTABA
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
      const response = await fetch("https://admin.logicindicators.com/api/v1/members/machine-id", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // El token ya está definido arriba
        },
        body: JSON.stringify({
          email: userEmail,
          nuevo_machine_id: newMachineId,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: "success", msg: result.message || "ID actualizado con éxito" });
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

      <div className="grid grid-cols-1 gap-8">
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
              <p className={`text-sm font-medium ${status.type === "success" ? "text-green-400" : "text-red-400"}`}>
                {status.msg}
              </p>
            )}

            <Button type="submit" variant="primary" className="w-full">
              Actualizar ID
            </Button>
          </form>
        </div>

        {/* Listado de Productos */}
        <div className="bg-dark-800 border border-dark-700 p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-8 text-accent-primary">
            <Package size={24} />
            <h2 className="text-xl font-bold text-text-main">Tus Indicadores</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userData.productos_activos && userData.productos_activos.length > 0 ? (
              userData.productos_activos.map((prod, i) => (
                <div key={i} className="p-5 bg-dark-900 border border-dark-600 rounded-2xl flex items-center justify-between group hover:border-accent-secondary/50 transition-all">
                  <span className="text-text-main font-semibold">{prod.nombre_producto}</span>
                  <a 
                    href={`https://r2.logicindicators.com/dl/${prod.codigo_producto}.zip`} 
                    className="text-xs bg-accent-secondary/20 text-accent-secondary px-4 py-2 rounded-full hover:bg-accent-secondary hover:text-white transition-all font-bold"
                  >
                    Descargar V18
                  </a>
                </div>
              ))
            ) : (
              <p className="text-text-muted col-span-2">No tienes productos activos asociados.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};