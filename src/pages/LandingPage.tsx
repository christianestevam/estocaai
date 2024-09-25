import React from 'react';
import { Link } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url('/images/vista-de-perto-do-armazem.jpg')`,
      }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-center">Bem-vindo ao Sistema de Gestão de Estoque</h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Gerencie seu estoque de maneira eficiente e organizada!
        </p>
        <div className="flex space-x-4 justify-center">
          <Link to="/login">
            <button className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition">
              Cadastre-se
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
