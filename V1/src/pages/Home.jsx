import Navbar from '../components/Navbar';
import '../stylesheets/home.css';

function Home({ onNavigate, onLoginClick, onLogoutClick, user }) {
  return (
    <div className="home-container">
      <Navbar onLoginClick={onLoginClick} onLogoutClick={onLogoutClick} user={user} />
      
      <main className="hero-content">
        <h1 className="hero-title">
          ¿Tuviste algún problema con la infraestructura? <br />
          <span style={{ color: '#1e40af' }}>¡Reportalo ahora!</span>
        </h1>
        
        <div className="home-buttons-group">
          <button className="btn-report" onClick={() => onNavigate('report')}>
            Crear Reporte
          </button>

          {user && (
            <button className="btn-history" onClick={() => onNavigate('history')}>
              Ver mis Reportes
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;