import Navbar from '../components/Navbar';
import '../stylesheets/reportHistory.css';

function ReportHistory({ onNavigate, onLoginClick, onLogoutClick, user, reportes, onVerDetalle, onBorrarReporte }) {
  
  const reportesDelUsuario = reportes.filter(
    (reporte) => reporte.correo === user?.correo
  );

  return (
    <div className="home-container">
      <Navbar onLoginClick={onLoginClick} onLogoutClick={onLogoutClick} user={user} onNavigate={onNavigate} />
      
      <main className="form-content">
        <button className="btn-back" onClick={() => onNavigate('home')}>
          Volver al inicio
        </button>

        <h2 className="form-title">Historial de Reportes</h2>
        <p className="history-subtitle">Historial de reportes enviados:</p>

        <div className="history-list">
          {reportesDelUsuario.length === 0 ? (
            <div className="no-reports-box">
              <p>Aún no has realizado ningún reporte de infraestructura.</p>
            </div>
          ) : (
            reportesDelUsuario.map((reporte) => (
              <div 
                key={reporte.id} 
                className="history-card" 
              >
                <div className="card-header">
                  <div className="card-tag-group">
                    <span className="card-tag">
                      {reporte.categoria === 'salas' && 'Salas'}
                      {reporte.categoria === 'banos' && 'Baños'}
                      {reporte.categoria === 'laboratorios' && 'Laboratorios'}
                      {reporte.categoria === 'patios' && 'Patios'}
                      {reporte.categoria === 'Comedores' && 'Comedores'}
                      {reporte.categoria === 'otros' && 'Otros'}
                    </span>
                    
                    <span className={`card-status ${reporte.estado === 'Sin respuesta' ? 'sin-respuesta' : 'respondido'}`}>
                      {reporte.estado}
                    </span>
                  </div>
                  
                  <div className="card-header-actions">
                    <button 
                      className="btn-delete-icon-report"
                      title="Eliminar reporte"
                      onClick={() => onBorrarReporte(reporte.id)}
                    >
                      <img 
                        src="https://cdn-icons-png.flaticon.com/512/860/860829.png" 
                        alt="Eliminar" 
                        className="delete-icon-img"
                      />
                    </button>
                  </div>
                </div>
                
                <div className="card-body">
                  <h4>{reporte.ubicacion}</h4>
                  <p className="card-desc">"{reporte.descripcion}"</p>
                  <div className="card-footer-info">
                    <small className="card-date">Enviado el: {reporte.fecha}</small>
                    
                    <button 
                      className="view-more-btn"
                      onClick={() => onVerDetalle(reporte)}
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default ReportHistory;