// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { LogOut, Package, Key, Monitor } from 'lucide-react';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [newMachineId, setNewMachineId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState({ type: '', msg: '' });

  const userEmail = localStorage.getItem('logic_user_email');

  useEffect(() => {
    if (!userEmail) {
      navigate('/login');
      return;
    }

    fetch(`https://admin.logicindicators.com/api/v1/members/portfolio/${userEmail}`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        setUserData(data);
        setNewMachineId(data.machine_id_actual || '');
        setIsLoading(false);
      })
      .catch(() => navigate('/login'));
  }, [userEmail, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', msg: 'Actualizando...' });

    try {
      const response = await fetch('https://admin.logicindicators.com/api/v1/members/machine-id', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          nuevo_machine_id: newMachineId
        })
      });

      if (response.ok) {
        setStatus({ type: 'success', msg: 'Machine ID actualizado con éxito' });
      } else {
        throw new Error('Error al actualizar');
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Hubo un problema al guardar los cambios' });
    }
  };

  if (isLoading) return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-text-muted">Cargando...</div>;

  return (
    <div className="container mx-auto py-16 px-6 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-dark-800 p-8 rounded-3xl border border-dark-700">
        <div>
          <h1 className="text-3xl font-bold text-text-main mb-1">Bienvenido, {userData.nombre}</h1>
          <p className="text-text-muted">{userData.mail}</p>
        </div>
        <button 
          onClick={() => { localStorage.removeItem('logic_user_email'); navigate('/login'); }}
          className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors font-medium"
        >
          <LogOut size={20} /> Cerrar Sesión
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Gestión de Machine ID */}
        <div className="bg-dark-800 border border-dark-700 p-8 rounded-3xl h-fit">
          <div className="flex items-center gap-3 mb-6 text-accent-blue">
            <Monitor size={24} />
            <h2 className="text-xl font-bold text-text-main">NinjaTrader ID</h2>
          </div>
          
          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">Machine ID Actual</label>
              <input
                type="text"
                value={newMachineId}
                onChange={(e) => setNewMachineId(e.target.value)}
                className="w-full bg-dark-900 border border-dark-600 text-text-main p-4 rounded-xl focus:border-accent-blue outline-none transition-all"
                placeholder="Pega tu ID aquí"
              />
            </div>

            {status.msg && (
              <p className={`text-sm font-medium ${status.type === 'success' ? 'text-green-400' : status.type === 'error' ? 'text-red-400' : 'text-text-muted'}`}>
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
          <div className="flex items-center gap-3 mb-8 text-accent-green">
            <Package size={24} />
            <h2 className="text-xl font-bold text-text-main">Tus Indicadores</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userData.productos_activos.map((prod, i) => (
              <div key={i} className="p-5 bg-dark-900 border border-dark-600 rounded-2xl flex items-center justify-between group hover:border-accent-green/50 transition-all">
                <span className="text-text-main font-semibold">{prod.nombre_producto}</span>
                <div className="h-2 w-2 rounded-full bg-accent-green shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};