import '../App.css';

function Navbar({ onLoginClick }) {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/47/Logo_UTFSM.png" 
          alt="Logo Institucional" 
          className="logo-img"
        />
      </div>
      <button className="btn-login" onClick={onLoginClick}>
        Iniciar Sesión
      </button>
    </nav>
  );
}

export default Navbar;