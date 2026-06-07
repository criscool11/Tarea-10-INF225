import { useState } from 'react';
// 1. Importamos las páginas y componentes que creamos antes
import Home from './pages/Home';
import ReportForm from './pages/ReportForm';
import './App.css'; // Asegúrate de apuntar a donde tengas tus estilos actuales

function App() {
  // 2. Este estado decide qué pantalla se renderiza ('home' o 'report')
  const [currentPage, setCurrentPage] = useState('home');
  
  // Este estado simula si el usuario inició sesión o no (puedes cambiarlo a true para probar)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    alert('Simulación: Iniciando sesión...');
    setIsLoggedIn(true);
  };

  // 3. El "enrutador" condicional
  return (
    <>
      {currentPage === 'home' && (
        <Home 
          onNavigate={setCurrentPage} 
          onLoginClick={handleLogin} 
        />
      )}
      
      {currentPage === 'report' && (
        <ReportForm 
          onNavigate={setCurrentPage} 
          onLoginClick={handleLogin}
          isLoggedIn={isLoggedIn} 
        />
      )}
    </>
  );
}

export default App;