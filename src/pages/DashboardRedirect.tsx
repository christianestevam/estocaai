// src/pages/DashboardRedirect.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../services/getMeService'; // Importa o serviço getMe

export const DashboardRedirect: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const userData = await getMe(); // Usa o serviço getMe para buscar os dados do usuário
        if (userData.empresaId === null) {
          navigate('/company-register'); // Redireciona para o cadastro de empresa se o empresaId for null
        } else {
          navigate('/dashboard'); // Redireciona para o dashboard se o empresaId estiver presente
        }
      } catch (error) {
        console.error('Erro ao verificar empresa:', error);
        navigate('/login'); // Em caso de erro, redireciona para o login
      } finally {
        setLoading(false);
      }
    };

    checkUserData();
  }, [navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Verificando informações...</div>;
  }

  return null;
};
