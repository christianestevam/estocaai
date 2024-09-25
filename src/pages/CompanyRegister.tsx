import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerCompany } from '../services/companyService';
import { formatCNPJ } from '../utils/formatCNPJ'; // Importa a função de formatação

export const CompanyRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    CNPJ: '',
    name: '',
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerCompany(formData); // Faz a requisição para cadastrar a empresa
      navigate('/dashboard'); // Redireciona para o dashboard após cadastro bem-sucedido
    } catch (err) {
      setError((err as Error).message); // Exibe o erro, se houver
    }
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCNPJ = formatCNPJ(e.target.value); // Aplica a máscara
    setFormData({ ...formData, CNPJ: formattedCNPJ }); // Atualiza o estado com o CNPJ formatado
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Cadastrar Empresa</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email da Empresa
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email da Empresa"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label htmlFor="CNPJ" className="block text-sm font-medium leading-6 text-gray-900">
              CNPJ
            </label>
            <input
              id="CNPJ"
              type="text"
              placeholder="CNPJ (XX.XXX.XXX/XXXX-XX)"
              value={formData.CNPJ}
              onChange={handleCNPJChange}
              maxLength={18}
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Nome da Empresa
            </label>
            <input
              id="name"
              type="text"
              placeholder="Nome da Empresa"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
