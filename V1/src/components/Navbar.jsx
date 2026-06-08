import '../stylesheets/navbar.css';

function Navbar({ onLoginClick, onLogoutClick, user, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="logo-container clickable-logo" onClick={() => onNavigate('home')}>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/47/Logo_UTFSM.png" 
          alt="Logo Institucional" 
          className="logo-img"
        />
      </div>

      <div className="navbar-actions">
        {user ? (
          <div className="user-menu">
            <span className="user-name">{user.nombre}</span>
            <button className="btn-logout" onClick={onLogoutClick}>Salir</button>
          </div>
        ) : (
          <button className="btn-login" onClick={onLoginClick}>
            Iniciar Sesión
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;