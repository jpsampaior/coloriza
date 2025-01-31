import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, "E-mail obrigatório")
  .email("Formato de e-mail inválido");

export const passwordSchema = z
  .string()
  .min(6, "Senha deve ter no mínimo 6 caracteres");
