import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../services/getMeService'; // Assuma que você já tem um serviço para obter os dados do usuário

export const DashboardRedirect: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const userData = await getMe(); // Chama o serviço para obter os dados do usuário
        if (userData.empresa === null) {
          // Se o usuário não tiver empresa, redireciona para a página de cadastro de empresa
          navigate('/company-register');
        } else {
          // Caso o usuário tenha empresa, redireciona para o dashboard
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Erro ao verificar empresa:', error);
        navigate('/login'); // Redireciona para login em caso de erro
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
