import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ProfileMenu } from '../components/ProfileMenu';
import { getMe, UserData } from '../services/getMeService'; // Importe o serviço getMe

interface Item {
  id: number;
  nome: string;
  descricao: string;
  quantidade: number;
  preco: string;
  estoqueId: number;
}

interface Estoque {
  id: number;
  name: string;
  descricao: string;
}

export const Dashboard: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [estoques, setEstoques] = useState<Estoque[]>([]);
  const [selectedEstoque, setSelectedEstoque] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  // Função para pegar o token do localStorage
  const getToken = () => localStorage.getItem('token');

  // Carregar os dados do usuário e redirecionar se não tiver empresa
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getMe();
        setUserData(data);
        if (!data.empresa) {
          // Se o usuário não tiver empresa associada, redireciona para a página de cadastro de empresa
          navigate('/company-register');
        }
      } catch (error) {
        setError('Erro ao buscar os dados do usuário.');
        navigate('/login'); // Redireciona para o login se houver erro ao buscar os dados
      }
    };
    fetchUserData();
  }, [navigate]);

  // Carregar os itens do usuário
  useEffect(() => {
    if (userData?.empresa) {
      const fetchItems = async () => {
        const token = getToken();
        if (!token) {
          setError('Usuário não autenticado.');
          return;
        }

        try {
          const response = await axios.get('http://localhost:3000/item', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setItems(response.data);
        } catch (err) {
          setError('Erro ao carregar os itens do estoque.');
        }
      };

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
          setError('Erro ao carregar os estoques.');
        }
      };

      fetchItems();
      fetchEstoques();
    }
  }, [userData]);

  // Filtrar os itens pelo estoque selecionado
  const filteredItems = selectedEstoque
    ? items.filter((item) => item.estoqueId === selectedEstoque)
    : items;

  const handleEstoqueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const estoqueId = Number(e.target.value);
    setSelectedEstoque(estoqueId === 0 ? null : estoqueId); // Se selecionar "Todos", remove o filtro
  };

  // Função para deletar item
  const handleDelete = async (itemId: number) => {
    const token = getToken();
    if (!token) {
      setError('Usuário não autenticado.');
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/admin/item/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(items.filter((item) => item.id !== itemId));
    } catch (err) {
      setError('Erro ao deletar o item.');
    }
  };

  // Obter o nome do estoque baseado no estoqueId
  const getEstoqueName = (estoqueId: number) => {
    const estoque = estoques.find((e) => e.id === estoqueId);
    return estoque ? estoque.name : 'Estoque Desconhecido';
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Header com o ProfileMenu */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard de Estoque</h1>
          <ProfileMenu /> {/* Adiciona o menu de perfil */}
        </div>

        {/* Botões de cadastro */}
        <div className="flex justify-between mb-6">
          <Link to="/register-item">
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
              Cadastrar Item
            </button>
          </Link>
          <Link to="/register-stock">
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
              Cadastrar Estoque
            </button>
          </Link>
        </div>

        {/* Filtro por Estoque */}
        <div className="mb-6">
          <label htmlFor="estoqueFilter" className="block mb-2 text-sm font-medium text-gray-700">
            Filtrar por Estoque
          </label>
          <select
            id="estoqueFilter"
            onChange={handleEstoqueChange}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="0">Todos</option>
            {estoques.map((estoque) => (
              <option key={estoque.id} value={estoque.id}>
                {estoque.name}
              </option>
            ))}
          </select>
        </div>

        {/* Exibe erro, se houver */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Lista de itens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 shadow-md">
              <h3 className="text-xl font-bold mb-2">{item.nome}</h3>
              <p className="text-gray-700 mb-1">Descrição: {item.descricao}</p>
              <p className="text-gray-700 mb-1">Quantidade: {item.quantidade}</p>
              <p className="text-gray-700 mb-1">Preço: R$ {item.preco}</p>
              <p className="text-gray-700 mb-1">Estoque: {getEstoqueName(item.estoqueId)}</p>

              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={() => console.log('Atualizar', item.id)}
                >
                  Atualizar
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(item.id)}
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
