import { z } from "zod";
import { emailSchema, passwordSchema } from "./fields.schema";

export const signUpSchema = z
  .object({
    fullName: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    accessCode: z
      .string()
      .min(6, "Código de acesso deve ter no mínimo 6 caracteres"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const paintSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  fabricante: z.string().min(6, "O Fabricante deve ter no mínimo 6 caracteres"),
  cor: z
    .string()
    .regex(
      /^#?[0-9A-Fa-f]{6}$/,
      "A cor deve ser um código hexadecimal de 6 caracteres"
    ),
  quantidade: z.number().nonnegative("A quantidade não pode ser negativa"),
  validade: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "A validade deve estar no formato yyyy-mm-dd"
    ),
});
