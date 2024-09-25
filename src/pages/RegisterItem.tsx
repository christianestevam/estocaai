import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Estoque {
  id: number;
  name: string;
  descricao: string;
}

export const RegisterItem: React.FC = () => {
  const [estoques, setEstoques] = useState<Estoque[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: '',
    price: '',
    estoqueId: '',
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Função para pegar o token do localStorage
  const getToken = () => localStorage.getItem('token');

  // Carrega a lista de estoques disponíveis
  useEffect(() => {
    const fetchEstoques = async () => {
      const token = getToken();
      if (!token) {
        setError('Usuário não autenticado.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/estoques', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEstoques(response.data);
      } catch (err) {
        setError('Erro ao carregar estoques.');
      }
    };
    fetchEstoques();
  }, []);

  // Converte os campos para número e envia os dados do item para o backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      setError('Usuário não autenticado.');
      return;
    }

    try {
      // Convertendo os valores para número antes de enviar a requisição
      const payload = {
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        estoqueId: Number(formData.estoqueId),
      };

      await axios.post('http://localhost:3000/admin/item', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/dashboard'); // Redireciona para o dashboard após o cadastro
    } catch (err) {
      setError('Erro ao cadastrar o item.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Cadastrar Item</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Nome do Item
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
              Descrição do Item
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
            <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
              Quantidade
            </label>
            <input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
              Preço (R$)
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label htmlFor="estoque" className="block text-sm font-medium leading-6 text-gray-900">
              Estoque Associado
            </label>
            <select
              id="estoque"
              value={formData.estoqueId}
              onChange={(e) => setFormData({ ...formData, estoqueId: e.target.value })}
              required
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
            >
              <option value="">Selecione um estoque</option>
              {estoques.map((estoque) => (
                <option key={estoque.id} value={estoque.id}>
                  {estoque.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
            >
              Cadastrar Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
