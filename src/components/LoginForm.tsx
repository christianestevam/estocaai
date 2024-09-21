import React, { useState } from 'react';
import { login } from '../services/authService';
import { LoginSchema } from '../schemas/loginSchema';

export const LoginForm = () => {
  const [formData, setFormData] = useState<LoginSchema>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      // Redirecionar o usuário após login bem-sucedido
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="email"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        placeholder="E-mail"
        className="border p-2 mb-4"
      />
      <input
        type="password"
        value={formData.password}
        onChange={e => setFormData({ ...formData, password: e.target.value })}
        placeholder="Senha"
        className="border p-2 mb-4"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">Login</button>
    </form>
  );
};
