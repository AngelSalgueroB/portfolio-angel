import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Portfolio from './Portfolio';      // Tu portafolio original
import FreelanceOS from './pages/FreelanceOS'; // Tu nueva herramienta



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz: Muestra tu Portafolio */}
        <Route path="/" element={<Portfolio />} />
        
        {/* Ruta secreta: Muestra tu Sistema Operativo */}
        <Route path="/os" element={<FreelanceOS />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;