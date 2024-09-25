// src/services/companyService.ts
import api from './api';
import { companySchema, CompanySchema } from '../schemas/companySchema';
import { ZodError } from 'zod';

export const registerCompany = async (data: CompanySchema): Promise<void> => {
  try {
    // Valida os dados da empresa usando o schema
    companySchema.parse(data);

    // Envia os dados para a API
    const response = await api.post('/admin/empresa', data);
    console.log('Empresa cadastrada com sucesso:', response.data);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Erro de validação:', error.errors);
      throw new Error('Erro de validação nos dados da empresa');
    } else {
      console.error('Erro ao cadastrar empresa:', error);
      throw new Error('Falha no cadastro da empresa');
    }
  }
};
