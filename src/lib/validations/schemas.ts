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
