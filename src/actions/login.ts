"use server";

import * as z from "zod";
import { signInSchema } from "@/lib/validations/schemas";

export const login = async (values: z.infer<typeof signInSchema>) => {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "Email sent" };
};
