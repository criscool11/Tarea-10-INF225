import Navbar from '../components/Navbar';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../stylesheets/reportDetail.css';

function ReportDetail({ onNavigate, onLoginClick, onLogoutClick, user, reporte }) {
  
  if (!reporte) {
    return (
      <div className="home-container">
        <main className="form-content">
          <p>Cargando información del reporte...</p>
          <button className="btn-back" onClick={() => onNavigate('history')}>Volver</button>
        </main>
      </div>
    );
  }

  return (
    <div className="home-container">
      <Navbar onLoginClick={onLoginClick} onLogoutClick={onLogoutClick} user={user} />
      
      <main className="form-content">
        <button className="btn-back" onClick={() => onNavigate('history')}>
          Volver al historial
        </button>

        <div className="detail-header">
          <h2 className="form-title">Detalle del Reporte</h2>
          <span className={`card-status ${reporte.estado === 'Sin respuesta' ? 'sin-respuesta' : 'respondido'}`}>
            {reporte.estado}
          </span>
        </div>
        
        <p className="detail-date">Enviado el {reporte.fecha} por {reporte.correo}</p>

        <div className="detail-layout-grid">
          
          <div className="detail-text-panel">
            <div className="detail-group">
              <h3>Categoría</h3>
              <p className="detail-text-value">
                {reporte.categoria === 'salas' && 'Salas de clases / Auditorios'}
                {reporte.categoria === 'banos' && 'Baños'}
                {reporte.categoria === 'laboratorios' && 'Laboratorios'}
                {reporte.categoria === 'patios' && 'Patios y Áreas Comunes'}
                {reporte.categoria === 'Comedores' && 'Comedores'}
                {reporte.categoria === 'otros' && 'Otros'}
              </p>
            </div>

            <div className="detail-group">
              <h3>Ubicación Escrita</h3>
              <p className="detail-text-value">{reporte.ubicacion}</p>
            </div>

            <div className="detail-group">
              <h3>Descripción del Incidente</h3>
              <p className="detail-description-text">{reporte.descripcion}</p>
            </div>
          </div>

          <div className="detail-media-panel">
            <div className="detail-group">
              <h3>Coordenadas Geográficas</h3>
              <div className="map-wrapper">
                <MapContainer 
                  center={reporte.coordenadas} 
                  zoom={18} 
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                  />
                  <Marker position={reporte.coordenadas} />
                </MapContainer>
              </div>
            </div>

            <div className="detail-group">
              <h3>Evidencia Fotográfica</h3>
              {reporte.fotoUrl ? (
                <div className="photo-preview-container">
                  <img 
                    src={reporte.fotoUrl} 
                    alt={`Evidencia de ${reporte.fotoNombre}`} 
                    className="real-photo-detail"
                  />
                  <p className="photo-caption">Archivo: {reporte.fotoNombre}</p>
                </div>
              ) : (
                <p className="no-photo-text">Sin foto.</p>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default ReportDetail;