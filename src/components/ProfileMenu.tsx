import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const ProfileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Função para logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token JWT
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)} // Alterna a abertura do menu
        >
          {/* Imagem de perfil do usuário */}
          <img
            src="/images/perfil.png" // Referência à imagem dentro da pasta public
            alt="Imagem de Perfil"
            className="h-8 w-8 rounded-full mr-2" // Tamanho e bordas da imagem
          />
          Meu Perfil
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Menu suspenso */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="none">
            {/* Link para Meu Perfil */}
            <Link
              to="/meu-perfil"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)} // Fecha o menu ao clicar
            >
              Meu Perfil
            </Link>

            {/* Botão de Logout */}
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
