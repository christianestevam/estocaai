import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CompanyRegister } from './pages/CompanyRegister';
import { Dashboard } from './pages/Dashboard';
import { RegisterItem } from './pages/RegisterItem'; // Importa a página de cadastro de item
import { RegisterStock } from './pages/RegisterStock'; // Importa a página de cadastro de estoque
import { MeuPerfil } from './pages/MeuPerfil';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/company-register" element={<CompanyRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register-item" element={<RegisterItem />} /> {/* Rota para cadastro de item */}
        <Route path="/register-stock" element={<RegisterStock />} /> {/* Rota para cadastro de estoque */}
        <Route path="/meu-perfil" element={<MeuPerfil />} />
      </Routes>
    </Router>
  );
}

export default App;
