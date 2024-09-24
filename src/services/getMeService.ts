// src/services/getMeService.ts
import api from './api';

export interface UserData {
  id: number;
  email: string;
  name: string;
  lastName: string;
  role: string;
  empresaId: number | null;
}

// Função para obter os dados do usuário autenticado
export const getMe = async (): Promise<UserData> => {
  try {
    const response = await api.get('/auth/get-me'); // Faz uma requisição para o endpoint "/auth/get-me"
    return response.data; // Retorna os dados do usuário
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    throw new Error('Não foi possível obter os dados do usuário.');
  }
};
