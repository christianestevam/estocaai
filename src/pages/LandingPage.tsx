import React from 'react';
import { Link } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-5xl font-bold mb-8">Bem-vindo ao Gerenciador de Estoque</h1>
      <p className="text-lg mb-4">Gerencie seu estoque de maneira simples e eficiente.</p>
      <div className="flex space-x-4">
        <Link to="/login">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md">Login</button>
        </Link>
        <Link to="/register">
          <button className="bg-green-500 text-white px-6 py-2 rounded-md">Cadastre-se</button>
        </Link>
      </div>
    </div>
  );
};
