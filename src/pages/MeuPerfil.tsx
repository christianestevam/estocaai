import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface UserProfile {
  email: string;
  name: string;
  lastName: string;
  role: string;
  empresa: {
    CNPJ: string;
    name: string;
    email: string;
  };
}

export const MeuPerfil: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Usuário não autenticado.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/auth/get-me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        setError('Erro ao carregar os dados do perfil.');
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!profile) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Meu Perfil</h1>
        <p className="text-gray-700 mb-2">
          <strong>Nome:</strong> {profile.name} {profile.lastName}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Email:</strong> {profile.email}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Role:</strong> {profile.role}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Empresa:</strong> {profile.empresa.name}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>CNPJ:</strong> {profile.empresa.CNPJ}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Email da Empresa:</strong> {profile.empresa.email}
        </p>
      </div>
    </div>
  );
};
