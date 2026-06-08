import { useState } from 'react';
import Home from './pages/Home';
import ReportForm from './pages/ReportForm';
import ReportHistory from './pages/ReportHistory';
import ReportDetail from './pages/ReportDetail';
import './stylesheets/index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [reportes, setReportes] = useState([]);
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);

  const handleLogin = () => {
    alert('Simulación');
    setUser({
      nombre: 'User test',
      correo: 'User@usm.cl'
    });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const agregarReporte = (nuevoReporte) => {
    setReportes([nuevoReporte, ...reportes]);
  };

  const verDetalleReporte = (reporte) => {
    setReporteSeleccionado(reporte);
    setCurrentPage('detail');
  };

  const borrarReporte = (idParaBorrar) => {
    const confirmar = window.confirm('¿Estás seguro?');
    if (confirmar) {
      setReportes(reportes.filter(reporte => reporte.id !== idParaBorrar));
    }
  };

  return (
    <>
      {currentPage === 'home' && (
        <Home 
          onNavigate={setCurrentPage} 
          onLoginClick={handleLogin} 
          onLogoutClick={handleLogout}
          user={user} 
        />
      )}
      
      {currentPage === 'report' && (
        <ReportForm 
          onNavigate={setCurrentPage} 
          onLoginClick={handleLogin}
          onLogoutClick={handleLogout}
          isLoggedIn={!!user} 
          user={user}
          onAgregarReporte={agregarReporte}
        />
      )}

      {currentPage === 'history' && (
        <ReportHistory 
          onNavigate={setCurrentPage}
          onLoginClick={handleLogin}
          onLogoutClick={handleLogout}
          user={user}
          reportes={reportes}
          onVerDetalle={verDetalleReporte}
          onBorrarReporte={borrarReporte} 
        />
      )}

      {currentPage === 'detail' && (
        <ReportDetail 
          onNavigate={setCurrentPage}
          onLoginClick={handleLogin}
          onLogoutClick={handleLogout}
          user={user}
          reporte={reporteSeleccionado}
        />
      )}
    </>
  );
}

export default App;