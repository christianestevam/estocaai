import api from './api';
import { loginSchema, LoginSchema } from '../schemas/loginSchema';
import { registerSchema, RegisterSchema } from '../schemas/registerSchema';
import { ZodError } from 'zod';

export const login = async (credentials: LoginSchema): Promise<void> => {
  try {
    loginSchema.parse(credentials);

    const response = await api.post('/auth/login', credentials);

    localStorage.setItem('token', response.data.token);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Erro de validação:', error.errors);
      throw new Error('Erro de validação nos dados de login');
    } else {
      console.error('Erro na autenticação:', error);
      throw new Error('Falha na autenticação');
    }
  }
};

export const logout = (): void => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export const registerUser = async (data: RegisterSchema): Promise<void> => {
  try {
    registerSchema.parse(data);

    const response = await api.post('/auth/register', data);

    console.log('Usuário registrado com sucesso:', response.data);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Erro de validação:', error.errors);
      throw new Error('Erro de validação nos dados de registro');
    } else {
      console.error('Erro ao registrar o usuário:', error);
      throw new Error('Falha no registro do usuário');
    }
  }
};
