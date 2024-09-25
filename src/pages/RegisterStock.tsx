import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const RegisterStock: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [empresaId, setEmpresaId] = useState<number | null>(null); // Armazena o empresaId
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Função para pegar o token do localStorage
  const getToken = () => localStorage.getItem('token');

  // Função para obter o empresaId através do endpoint get-me
  useEffect(() => {
    const fetchUserData = async () => {
      const token = getToken();
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
        // Acessa o empresaId corretamente
        const empresaId = response.data.empresa.id;
        setEmpresaId(empresaId); // Armazena o empresaId
      } catch (err) {
        setError('Erro ao carregar os dados do usuário.');
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    if (!token || !empresaId) {
      setError('Usuário não autenticado ou empresa não definida.');
      return;
    }

    try {
      // Payload que será enviado para criar o estoque
      const payload = {
        name: formData.name,
        description: formData.description,
        empresaId, // Inclui o empresaId no payload
      };

      await axios.post('http://localhost:3000/admin/estoque', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/dashboard'); // Redireciona para o dashboard após o cadastro
    } catch (err) {
      setError('Erro ao cadastrar o estoque.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Cadastrar Estoque</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Nome do Estoque
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
              Descrição do Estoque
            </label>
            <input
              id="description"
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
            >
              Cadastrar Estoque
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
