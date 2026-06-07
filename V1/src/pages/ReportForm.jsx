import { useState } from 'react';
import Navbar from '../components/Navbar';
import '../App.css';

function ReportForm({ onNavigate, onLoginClick, isLoggedIn = false }) {
  const [email, setEmail] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      email: isLoggedIn ? 'Usuario Autenticado' : email,
      categoria,
      ubicacion,
      descripcion
    });

    alert('¡Reporte enviado con éxito! Revisaremos la infraestructura a la brevedad.');
    onNavigate('home');
  };

  return (
    <div className="home-container">
      <Navbar onLoginClick={onLoginClick} />
      
      <main className="form-content">
        <button className="btn-back" onClick={() => onNavigate('home')}>
          ← Volver al inicio
        </button>

        <h2 className="form-title">Crear Reporte de Infraestructura</h2>
        
        <form onSubmit={handleSubmit} className="report-form">
          
          {!isLoggedIn && (
            <div className="form-group">
              <label htmlFor="email">Tu Correo Electrónico (para recibir la respuesta)</label>
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
            <select 
              id="categoria" 
              required
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Selecciona una opción</option>
              <option value="salas">Salas de clases / Auditorios</option>
              <option value="banos">Baños</option>
              <option value="laboratorios">Laboratorios</option>
              <option value="patios">Patios y Áreas Comunes</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ubicacion">Ubicación específica</label>
            <input 
              type="text" 
              id="ubicacion" 
              required
              placeholder="Ej: Edificio P, Piso 3, P313"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción detallada del daño</label>
            <textarea 
              id="descripcion" 
              required
              rows="4"
              placeholder="Descripción detallada"
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