"use server";

import * as z from "zod";
import { signUpSchema } from "@/lib/validations/schemas";

export const register = async (values: z.infer<typeof signUpSchema>) => {
  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "Email sent" };
};
