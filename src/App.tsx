// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CompanyRegister } from './pages/CompanyRegister';
import { DashboardRedirect } from './pages/DashboardRedirect';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/company-register" element={<CompanyRegister />} />
        <Route path="/dashboard" element={<DashboardRedirect />} />
      </Routes>
    </Router>
  );
}

export default App;
