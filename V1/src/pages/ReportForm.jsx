import { useState } from 'react';
import Navbar from '../components/Navbar';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import '../stylesheets/ReportForm.css';

function ReportForm({ onNavigate, onLoginClick, onLogoutClick, isLoggedIn = false, user, onAgregarReporte }) {
  const [email, setEmail] = useState('');
  const [categoria, setCategoria] = useState('');
  const [ubicacionText, setUbicacionText] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const [foto, setFoto] = useState(null);

  const [posicion, setPosicion] = useState([-33.0351, -71.5946]);

  function MarcadorMapa() {
    useMapEvents({
      click(e) {
        setPosicion([e.latlng.lat, e.latlng.lng]);
      },
    });
    return <Marker position={posicion} />;
  }

  const handleFotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFoto(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const fechaActual = new Date().toLocaleDateString('es-CL');

    const nuevoReporte = {
      id: Date.now(), 
      correo: isLoggedIn ? user.correo : email,
      categoria: categoria,
      ubicacion: ubicacionText,
      fecha: fechaActual,
      estado: 'Pendiente', 
      respuesta: null,
      descripcion: descripcion,
      coordenadas: posicion,
      foto: foto ? foto.name : 'Sin foto'
    };

    onAgregarReporte(nuevoReporte);

    alert('¡Reporte enviado con éxito! Ha sido añadido al registro del sistema.');
    
    if (isLoggedIn) {
      onNavigate('history');
    } else {
      onNavigate('home');
    }
  };

  return (
    <div className="home-container">
      <Navbar onLoginClick={onLoginClick} onLogoutClick={onLogoutClick} user={user} />
      
      <main className="form-content">
        <button className="btn-back" onClick={() => onNavigate('home')}>
          ← Volver al inicio
        </button>

        <h2 className="form-title">Crear Reporte de Infraestructura</h2>
        
        <form onSubmit={handleSubmit} className="report-form">
          
          {!isLoggedIn && (
            <div className="form-group">
              <label htmlFor="email">Tu Correo Electrónico</label>
              <input 
                type="email" 
                id="email"
                required
                placeholder="ejemplo@usm.cl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="categoria">Categoría del Problema</label>
            <select id="categoria" required value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="">Selecciona una opción</option>
              <option value="salas">Salas de clases / Auditorios</option>
              <option value="banos">Baños</option>
              <option value="laboratorios">Laboratorios</option>
              <option value="patios">Patios y Áreas Comunes</option>
              <option value="Comedores">Comedores</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ubicacion">Ubicación (Piso, sala o referencia escrita)</label>
            <input 
              type="text" 
              id="ubicacion" 
              required
              placeholder="Ej: Edificio P, Piso 3, P313"
              value={ubicacionText}
              onChange={(e) => setUbicacionText(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Selecciona el punto exacto en el mapa</label>
            <span className="map-help">Toca el mapa para mover el pin al lugar del problema</span>
            <div className="map-wrapper">
              <MapContainer 
                center={posicion} 
                zoom={17} 
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                <MarcadorMapa />
              </MapContainer>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="foto">Adjuntar Foto del Problema</label>
            <div className="file-input-wrapper">
              <input 
                type="file" 
                id="foto" 
                accept="image/*" 
                onChange={handleFotoChange}
              />
            </div>
            {foto && <span className="file-selected-name">Archivo listo: {foto.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción detallada</label>
            <textarea 
              id="descripcion" 
              required
              rows="3"
              placeholder="Describa el problema a solucionar"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="btn-submit">
            Enviar Reporte
          </button>
        </form>
      </main>
    </div>
  );
}

export default ReportForm;