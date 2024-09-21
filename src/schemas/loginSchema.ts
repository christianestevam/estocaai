import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Formato de e-mail inválido'),
  password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
