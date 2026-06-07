import Navbar from '../components/Navbar';
import '../App.css';

function Home({ onNavigate, onLoginClick }) {
  return (
    <div className="home-container">
      <Navbar onLoginClick={onLoginClick} />
      
      <main className="hero-content">
        <h1 className="hero-title">
          ¿Tuviste algún problema con la infraestructura? <br />
          <span style={{ color: '#1e40af' }}>¡Reportalo ahora!</span>
        </h1>
        
        <button className="btn-report" onClick={() => onNavigate('report')}>
          Crear Reporte
        </button>
      </main>
    </div>
  );
}

export default Home;