import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Portfolio from './Portfolio';      // Tu portafolio original
import FreelanceOS from './pages/FreelanceOS'; // Tu nueva herramienta
import PresentationViewer from './components/PresentationViewer'; // Tu presentación

function App() {
  // --- DETECTOR DE "JALAR PARA REFRESCAR" MANUAL ---
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      // Guardamos donde empezó el dedo
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const distance = touchEndY - touchStartY;

      // Si el usuario está al tope de la página (scrollY === 0)
      // Y arrastró hacia abajo más de 150px...
      if (window.scrollY === 0 && distance > 150) {
        // ... Recargamos la página
        window.location.reload();
      }
    };

    // Agregamos los escuchadores
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    // Limpieza
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz: Muestra tu Portafolio */}
        <Route path="/" element={<Portfolio />} />
        
        {/* Ruta secreta 1: Muestra tu Sistema Operativo */}
        <Route path="/os" element={<FreelanceOS />} />

        {/* NUEVA RUTA: Presentación de Arquitectura Empresarial (A pantalla completa) */}
        <Route 
          path="/presentacionAE" 
          element={
            <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
              <PresentationViewer />
            </div>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;