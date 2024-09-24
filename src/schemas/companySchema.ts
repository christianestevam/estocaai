// src/schemas/companySchema.ts
import { z } from 'zod';

// Validação do CNPJ no formato "XX.XXX.XXX/XXXX-XX"
export const companySchema = z.object({
  email: z.string().email('Formato de e-mail inválido'),
  CNPJ: z
    .string()
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
      message: 'CNPJ deve seguir o formato XX.XXX.XXX/XXXX-XX',
    }),
  name: z.string().min(1, 'O nome da empresa é obrigatório'),
});

export type CompanySchema = z.infer<typeof companySchema>;
