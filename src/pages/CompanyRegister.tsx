// src/pages/CompanyRegister.tsx
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
      <div className="bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Cadastrar Empresa</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email da Empresa"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="CNPJ (XX.XXX.XXX/XXXX-XX)"
            value={formData.CNPJ}
            onChange={handleCNPJChange} // Aplica a máscara ao CNPJ
            className="w-full mb-4 p-2 border rounded"
            maxLength={18} // O CNPJ formatado tem 18 caracteres
          />
          <input
            type="text"
            placeholder="Nome da Empresa"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />
          <button type="submit" className="bg-green-500 text-white w-full py-2 rounded">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};
